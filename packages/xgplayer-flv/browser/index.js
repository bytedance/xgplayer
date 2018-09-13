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
/*!*************************!*\
  !*** external "Player" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["Player"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvY29uY2F0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9jb25jYXQtdHlwZWQtYXJyYXkvbGliL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9kL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L2Z1bmN0aW9uL25vb3AuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vc2hpbS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLXZhbHVlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtdmFsdWUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9ub2RlX21vZHVsZXMvZXZlbnQtZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvRmx2LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9jb25zdGFudHMvY29uZmlnLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9jb25zdGFudHMvbWV0YUZpZWxkcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvY29uc3RhbnRzL3R5cGVzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9kZWxzL01lZGlhSW5mby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9kZWxzL01lZGlhU2FtcGxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9tb2RlbHMvTWVkaWFTZWdtZW50LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9tb2RlbHMvTWVkaWFTZWdtZW50TGlzdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9kZWxzL1N0b3JlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9tb2RlbHMvVGFnLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9tb2RlbHMvZXJyb3IuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL0ZsdlBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvTVNFLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9wYXJzZS9NYWluUGFyc2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9wYXJzZS9TUFNQYXJzZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL1RyYW5zQ29kZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL2RlbXV4L0F1ZGlvRGVtdXhlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvZGVtdXgvRGVtdXhlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvZGVtdXgvTWV0YURlbXV4ZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL2RlbXV4L1RhZ0RlbXV4ZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL2RlbXV4L1ZpZGVvRGVtdXhlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvcmVtdXgvRm1wNC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvcmVtdXgvTXA0cmVtdXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL3JlbXV4L1JlbXV4ZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3Rhc2tzL0xpdmVUYXNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy90YXNrcy9Wb2RUYXNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy90YXNrcy9sb2FkZXJzL0ZldGNoTG9hZGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy90YXNrcy9sb2FkZXJzL1hIUkxvYWRlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvdXRpbHMvRGF0YVZpZXc0UmVhZC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvdXRpbHMvRXhwR29sb21iLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy91dGlscy9Mb2cuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3V0aWxzL09ic2VydmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy91dGlscy9VVEY4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy91dGlscy9mdW5jVXRpbHMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3V0aWxzL3NuaWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3dyaXRlL0J1ZmZlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvZXh0ZXJuYWwgXCJQbGF5ZXJcIiJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImRlZmF1bHQiLCJSZXN1bHRDb25zdHJ1Y3RvciIsInRvdGFsTGVuZ3RoIiwiX2xlbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFycmF5cyIsIkFycmF5IiwiX2tleSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24iLCJfZGlkSXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvckVycm9yIiwidW5kZWZpbmVkIiwiX2l0ZXJhdG9yIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfc3RlcCIsIm5leHQiLCJkb25lIiwiYXJyIiwiZXJyIiwicmV0dXJuIiwicmVzdWx0Iiwib2Zmc2V0IiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIiLCJfZGlkSXRlcmF0b3JFcnJvcjIiLCJfaXRlcmF0b3JFcnJvcjIiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiX2FyciIsInNldCIsIl9jb25jYXQiLCJyZXF1aXJlIiwiX2NvbmNhdDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsIm1vZHVsZSIsImFzc2lnbiIsIm5vcm1hbGl6ZU9wdHMiLCJpc0NhbGxhYmxlIiwiY29udGFpbnMiLCJkIiwiZHNjciIsImMiLCJlIiwidyIsIm9wdGlvbnMiLCJkZXNjIiwiY2FsbCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsImdzIiwiZ2V0IiwiZm9vIiwiYmFyIiwidHJ6eSIsImtleXMiLCJtYXgiLCJNYXRoIiwiZGVzdCIsInNyYyIsImVycm9yIiwiaSIsImtleSIsImZvckVhY2giLCJfdW5kZWZpbmVkIiwidmFsIiwiaXNWYWx1ZSIsIm9iamVjdCIsInByb3RvdHlwZSIsImNyZWF0ZSIsInByb2Nlc3MiLCJvcHRzMSIsImZuIiwiVHlwZUVycm9yIiwiU3RyaW5nIiwic3RyIiwiaW5kZXhPZiIsInNlYXJjaFN0cmluZyIsImNhbGxhYmxlIiwiYXBwbHkiLCJGdW5jdGlvbiIsImRlZmluZVByb3BlcnRpZXMiLCJoYXNPd25Qcm9wZXJ0eSIsImRlc2NyaXB0b3IiLCJvbiIsIm9uY2UiLCJvZmYiLCJlbWl0IiwibWV0aG9kcyIsImRlc2NyaXB0b3JzIiwiYmFzZSIsInR5cGUiLCJsaXN0ZW5lciIsImRhdGEiLCJfX2VlX18iLCJwdXNoIiwic2VsZiIsIl9fZWVPbmNlTGlzdGVuZXJfXyIsImxpc3RlbmVycyIsImNhbmRpZGF0ZSIsInNwbGljZSIsImwiLCJhcmdzIiwic2xpY2UiLCJvIiwiRmx2IiwicGxheWVyIiwiX3BsYXllciIsIl9vcHRpb25zIiwiZmx2UGxheWVyIiwiTWFpblBhcnNlciIsIm1zZSIsIk1TRSIsImlzU2Vla2luZyIsImlzRGF0YUxvYWRpbmciLCJ0ZW1wQ3VycmVudFRpbWUiLCJ0ZW1wRmx2UGxheWVyIiwiaXNDaGFuZ2luZ1NyYyIsImluaXRQbGF5ZXJFdmVudHMiLCJpbml0Rmx2UGxheWVyRXZlbnRzIiwiaW5pdE1zZUV2ZW50cyIsInN0YXJ0TG9hZERhdGEiLCJoYW5kbGVTZWVraW5nIiwiYnVmZmVyZWQiLCJjdXJyZW50VGltZSIsImlzQnVmZmVyZWQiLCJsZW4iLCJzdGFydCIsImVuZCIsIlZvZFRhc2siLCJjbGVhciIsImlzU2Vla2FibGUiLCJzZWVrIiwiaXNMaXZlIiwiaGFuZGxlVGltZVVwZGF0ZSIsImlzTWVkaWFJbmZvUmVhZHkiLCJwcm9ncmVzc0NoZWNrZXIiLCJpc0VuZGVkIiwiX3JlcGxheSIsImRlc3Ryb3kiLCJfbXNlIiwicmVwbGF5IiwiaXNTb3VyY2VPcGVuIiwiYXBwZW5kQnVmZmVyIiwiZnR5cF9tb292IiwiYnVmZmVyIiwic2V0VGltZW91dCIsInBsYXkiLCJwZW5kaW5nRnJhZ21lbnRzIiwiaGFzUGVuZGluZ0ZyYWdtZW50cyIsImZyYWdtZW50Iiwic2hpZnQiLCJ1bnNoaWZ0IiwidmlkZW8iLCJ1cmwiLCJzd2l0Y2hVUkwiLCJjb25maWciLCJpc1RlbXBQbGF5ZXIiLCJoYW5kbGVNZWRpYUZyYWdtZW50IiwidW5iaW5kRmx2UGxheWVyRXZlbnRzIiwiaGFuZGxlU2Vla0VuZCIsImhhbmRsZUVycm9yIiwiaGFuZGxlRnR5cE1vb3YiLCJmdHlwTW9vdiIsIm9uU291cmNlT3BlbiIsImxvYWRTZWdtZW50cyIsInByZWxvYWRUaW1lIiwibWluQ2FjaGVkVGltZSIsInJhbmdlIiwiZ2V0QnVmZmVyZWRSYW5nZSIsInZpZGVvRHVyYXRpb24iLCJ2aWRlb1RpbWVTY2FsZSIsInRoZW4iLCJmbHYiLCJlbmRPZlN0cmVhbSIsInBhdXNlIiwiZ2V0RGVmYXVsdENvbmYiLCJhdXRvQ2xlYW5Tb3VyY2VCdWZmZXIiLCJhdXRvQ2xlYW5NYXhCYWNrVGltZSIsImNvcnMiLCJmaWVsZHMiLCJuYW1lIiwiQm9vbGVhbiIsInBhcnNlciIsInRhcmdldCIsIm9yaWdpbiIsIm1lZGlhSW5mbyIsImR1cmF0aW9uIiwiaGFzQXVkaW8iLCJoYXNWaWRlbyIsIk51bWJlciIsImF1ZGlvRGF0YVJhdGUiLCJhdWRpb2RhdGFyYXRlIiwidmlkZW9EYXRhUmF0ZSIsInZpZGVvZGF0YXJhdGUiLCJ3aWR0aCIsImhlaWdodCIsInN0YXRlIiwiZmxvb3IiLCJ0aW1lU2NhbGUiLCJvblR5cGVFcnIiLCJmcHNOdW0iLCJmcmFtZXJhdGUiLCJmcHMiLCJyZWZlckZyYW1lUmF0ZSIsImZpeGVkIiwiZnBzRGVuIiwia2V5ZnJhbWVzIiwiaGFzS2V5ZnJhbWVzIiwiX3BhcnNlS2V5ZnJhbWVzIiwiTWV0YVR5cGVzIiwiTlVNQkVSIiwiQk9PTEVBTiIsIlNUUklORyIsIk9CSkVDVCIsIk1JWF9BUlJBWSIsIk9CSkVDVF9FTkQiLCJTVFJJQ1RfQVJSQVkiLCJEQVRFIiwiTE9ORV9TVFJJTkciLCJFdmVudFR5cGVzIiwiREFUQV9SRUFEWSIsIk1FVEFfREFUQV9SRUFEWSIsIlRSQUNLX01FVEFfUkVBRFkiLCJNRURJQV9JTkZPX1JFQURZIiwiTUVUQV9FTkRfUE9TSVRJT04iLCJFUlJPUiIsInNvdW5kUmF0ZVR5cGVzIiwiQXVkaW9PYmplY3RUeXBlcyIsInNhbXBsaW5nRnJlcXVlbmN5VHlwZXMiLCJicm93c2VyVHlwZXMiLCJJRSIsIkZJUkVfRk9YIiwiQ0hST01FIiwiT1BFUkEiLCJTQUZBUkkiLCJtcDNWZXJzaW9ucyIsIlYyNSIsIlJFU0VSVkVEIiwiVjIwIiwiVjEwIiwiYXVkaW9TYW1wbGVSYXRlIiwibXAzQml0UmF0ZSIsIkxheWVyMSIsIkxheWVyMiIsIkxheWVyMyIsIkZsdlBsYXllciIsIl9fZmx2X18iLCJpbml0Iiwic3RhcnRzV2l0aCIsImxvYWQiLCJhdXRvcGxheSIsImNyZWF0ZUluc3RhbmNlIiwiUGxheWVyIiwidXRpbCIsImFkZENsYXNzIiwicm9vdCIsImxpdmUiLCJjcmVhdGVEb20iLCJjb250cm9scyIsImFwcGVuZENoaWxkIiwiaW5pdGVkIiwiTWVkaWFJbmZvIiwiX2RlZmF1bHQiLCJtaW1lVHlwZSIsImNvZGVjIiwiYXVkaW9Db2RlYyIsInZpZGVvQ29kZWMiLCJhdWRpb0NoYW5uZWxDb3VudCIsImF1ZGlvQ29uZmlnIiwicHJvZmlsZSIsImxldmVsIiwiY2hyb21hRm9ybWF0IiwicGl4ZWxSYXRpbyIsIl9tZXRhRGF0YSIsInNlZ21lbnRzIiwiaW5pdERhdGEiLCJlbnRyaWVzIiwiayIsInYiLCJpc1ZpZGVvSW5mb0ZpbGxlZCIsImlzQXVkaW9JbmZvRmlsbGVkIiwibm90TnVsbEZpZWxkcyIsIk1lZGlhU2FtcGxlIiwiaW5mbyIsImdldERlZmF1bHRJbmYiLCJ0b1N0cmluZyIsInNhbXBsZSIsImR0cyIsInB0cyIsInBvc2l0aW9uIiwiaXNSQVAiLCJvcmlnaW5EdHMiLCJNZWRpYVNlZ21lbnQiLCJzdGFydER0cyIsImVuZER0cyIsInN0YXJ0UHRzIiwiZW5kUHRzIiwib3JpZ2luU3RhcnREdHMiLCJvcmlnaW5FbmREdHMiLCJyYW5kb21BY2Nlc3NQb2ludHMiLCJmaXJzdFNhbXBsZSIsImxhc3RTYW1wbGUiLCJNZWRpYVNlZ21lbnRMaXN0IiwiX3R5cGUiLCJfbGlzdCIsIl9sYXN0QXBwZW5kTG9jYXRpb24iLCJiZWdpbkR0cyIsImxpc3QiLCJsYXN0IiwibWlkIiwibGJvdW5kIiwidWJvdW5kIiwiaWR4IiwiX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIiwic2VnbWVudCIsImxhc3RBcHBlbmRJZHgiLCJpbnNlcnRJZHgiLCJnZXRMYXN0U2VnbWVudEJlZm9yZSIsInNlZ21lbnRJZHgiLCJTdG9yZSIsImlzTGUiLCJzbmlmZmVyIiwiX2hhc0F1ZGlvIiwiX2hhc1ZpZGVvIiwiX21lZGlhSW5mbyIsIl92aWRlb1RyYWNrIiwiaWQiLCJzYW1wbGVzIiwiX2F1ZGlvVHJhY2siLCJfdmlkZW9NZXRhRGF0YSIsIl9hdWRpb01ldGFEYXRhIiwiX2F1ZGlvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZCIsIl92aWRlb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQiLCJ0YWdzIiwidGltZVN0YW1wQmFzZSIsImhhc1ZpZGVvRmxhZ092ZXJyaWRlZCIsImhhc0F1ZGlvRmxhZ092ZXJyaWRlZCIsImR1cmF0aW9uT3ZlcnJpZGVkIiwibmFsdUxlbmd0aFNpemUiLCJfcmVmZXJGcmFtZVJhdGUiLCJtZXRhRW5kUG9zaXRpb24iLCJfaXNJbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkIiwiYmluZCIsInBvcyIsIkZsdlRhZyIsInRhZ1R5cGUiLCJib2R5U2l6ZSIsInRhZ1NpemUiLCJUaW1lc3RhbXAiLCJTdHJlYW1JRCIsImJvZHkiLCJ0aW1lIiwicG9wIiwiam9pbiIsInBhcnNlSW50IiwiRXJyb3JUeXBlcyIsIm5ldHdvcmsiLCJjb2RlIiwibXNnIiwicmVtYXJrIiwicGFyc2UiLCJmb3JtYXQiLCJkZWNvZGVyIiwicnVudGltZSIsInRpbWVvdXQiLCJvdGhlciIsIkVycm9ycyIsIm5ldHdvcmtTdGF0ZSIsInJlYWR5U3RhdGUiLCJjdXJyZW50U3JjIiwiZW5kZWQiLCJlcnJkIiwibGluZSIsImhhbmRsZSIsInZlcnNpb24iLCJyIiwicGxheWVyVmVyc2lvbiIsImVycm9yVHlwZSIsImRvbWFpbiIsImRvY3VtZW50IiwiZXgiLCJGbHZQYXJzZXIiLCJzdG9yZSIsIkNMQVNTX05BTUUiLCJjb25zdHJ1Y3RvciIsInRlbXBfdThhIiwiZGF0YUxlbiIsInN0b3AiLCJpbmRleCIsImZpbGVQb3NpdGlvbiIsImZpcnN0RmxhZyIsImZsdlU4YSIsInRlbXBVOGEiLCJwYXJzZURhdGEiLCJpc0ZsdkhlYWQiLCJwYXJzZUhlYWQiLCJyZWFkRGF0YSIsInU4YUxlbmd0aCIsInRhZyIsIlRhZyIsInVucmVhZExlbmd0aCIsIlN0cmFtSWQiLCJnZXRCb2R5U2l6ZSIsIl9zdG9yZSIsInNpemVBcnIiLCJCdWZmZXIiLCJyZWFkQXNJbnQiLCJtYXRjaCIsImZsYWciLCJfaW5kZXgiLCJmaXJzdFRocmVlQ2hhcnMiLCJmcm9tQ2hhckNvZGUiLCJEZW11eGVyIiwiY291bnQiLCJjb2RlY3MiLCJtZWRpYVNvdXJjZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiaGFuZGxlU291cmNlT3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJzb3VyY2VCdWZmZXIiLCJhZGRTb3VyY2VCdWZmZXIiLCJ1cGRhdGluZyIsIkVycm9yIiwicmVtb3ZlIiwiaXNUeXBlU3VwcG9ydGVkIiwiTk9PUCIsIl9jb25maWciLCJfdGVtcEJhc2VUaW1lIiwiZmx2UGFyc2VyIiwidGFnRGVtdXhlciIsIlRhZ0RlbXV4ZXIiLCJtcDRyZW11eGVyIiwiTXA0UmVtdXhlciIsImJ1ZmZlcktleWZyYW1lcyIsIlNldCIsIk1FVEFfQ0hVTktfU0laRSIsInBvdyIsIkNIVU5LX1NJWkUiLCJfaXNOZXdTZWdtZW50c0Fycml2YWwiLCJsb2FkVGFzayIsIl9wZW5kaW5nRnJhZ21lbnRzIiwiX3BlbmRpbmdSZW1vdmVSYW5nZSIsImVycl9jbnQiLCJyZXF1ZXN0Q29uZmlnIiwibW9kZSIsImluaXRFdmVudEJpbmQiLCJpbml0TWV0YSIsImluaXRMaXZlU3RyZWFtIiwiTGl2ZVRhc2siLCJydW4iLCJsb2FkTGl2ZURhdGEiLCJ3cml0ZSIsIlVpbnQ4QXJyYXkiLCJzZXRGbHYiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsIlJlc29sdmVyIiwicmVzb2x2ZUNodW5rIiwidGltZVN0YW1wIiwibG9hZERhdGEiLCJsb2FkTWV0YURhdGEiLCJjYXRjaCIsImNoYW5nZVJhbmdlIiwiX3JhbmdlIiwiZ2V0TmV4dFJhbmdlRW5kIiwiUHJvbWlzZSIsInJlc29sdmUiLCJfbG9hZFNlZ21lbnRzRGF0YSIsInRpbWVzIiwiZmlsZVBvc2l0aW9ucyIsImV4cGVjdEVuZCIsImxlZnQiLCJyaWdodCIsInByb21pc2UiLCJhcnJheUJ1ZmYiLCJiYXNlVGltZSIsImdldFRpbWUiLCJfdGltZXN0YW1wQmFzZSIsInJlc29sdmVUYWdzIiwiaXNQYXJzaW5nIiwiYXVkaW9UcmFjayIsInZpZGVvVHJhY2siLCJyZW11eCIsIm1ldGEiLCJvbk1ldGFEYXRhUmVhZHkiLCJuZXdGcmFnIiwiYWRkIiwicmFwIiwiRlRZUF9NT09WIiwib25NZWRpYUluZm9SZWFkeSIsImhhbmRsZURhdGFSZWFkeSIsImhhbmRsZU1lZGlhSW5mb1JlYWR5IiwiaGFuZGxlTWV0YURhdGFSZWFkeSIsInNldEV2ZW50QmluZCIsImhhbmRsZU5ld01lZGlhRnJhZ21lbnQiLCJjbGVhckJ1ZmZlciIsImNhbmNlbCIsInNlZWtTdGFydCIsInN0YXJ0RmlsZVBvcyIsImVuZEZpbGVQb3MiLCJtaW4iLCJnZXRFbmRGaWxlUG9zIiwibG8iLCJoaSIsIm5leHRUaW1lIiwiTUFYX1NBRkVfSU5URUdFUiIsImV2ZXJ5IiwiY2xlYXJUYWdzIiwic2V0Rmx2Rmlyc3QiLCJzZXRGbHZVc3VhbGx5IiwiaXNDb21wbGV0ZSIsIlRyYW5zQ29kZXIiLCJTUFNQYXJzZXIiLCJwcm9maWxlSWRjIiwibGV2ZWxJZGMiLCJ0b0ZpeGVkIiwiY2hyb21hIiwib3JpZ2luQXJyIiwicmJzcCIsIl9lYnNwMnJic3AiLCJzdHJlYW0iLCJFeHBHb2xvbWIiLCJzcHNDb25maWciLCJyZWFkU1BTIiwicHJvZmlsZVN0cmluZyIsImdldFByb2ZpbGVTdHIiLCJsZXZlbFN0cmluZyIsImdldExldmVsU3RyIiwiY2hyb21hRm9ybWF0U3RyaW5nIiwiZ2V0Q2hyb21hRm9ybWF0U3RyIiwib3JpZ2luTGVuIiwiYnl0ZUxlbmd0aCIsImRpc3QiLCJkaXN0U2l6ZSIsIl9vYnNlcnZlciIsIm9ic2VydmVyIiwiZmx1c2giLCJlcnJvckRldGFpbCIsImVycm9yVG9FbWl0IiwiQXVkaW9EZW11eGVyIiwiY3VycmVudFRhZyIsInJlYWRPZmZzZXQiLCJhdWRpb01ldGFEYXRhIiwidHJhY2siLCJpbml0QXVkaW9NZXRhIiwiZHYiLCJEYXRhVmlldzRSZWFkIiwic291bmQiLCJnZXRVaW50OCIsInNvdW5kRm9ybWF0SWR4Iiwic291bmRSYXRlIiwic291bmRUeXBlIiwiY2hhbm5lbENvdW50IiwiYWFjSW5mbyIsIl9wYXJzZUFBQ0F1ZGlvIiwiYWFjRGF0YSIsInNhbXBsZUZyZXEiLCJwYWNrZXRUeXBlIiwic2FtcGxlUmF0ZSIsIm1hbmlmZXN0Q29kZWMiLCJyZWZTYW1wbGVEdXJhdGlvbiIsImhhc0luaXRpYWxNZXRhRGlzcGF0Y2hlZCIsIm1pIiwicmVwbGFjZSIsImFhY1NhbXBsZSIsInVuaXQiLCJyZXNldFN0YXR1cyIsImFhY0FycmF5IiwiX3BhcnNlQUFDQXVkaW9TcGVjaWZpY0NvbmZpZyIsImdldEFuZE51bSIsInJlc3VsdE9iaiIsInNhbXBsaW5nRnJlcXVlbmN5IiwiZXh0QXVkaW9PYmplY3RUeXBlIiwiZXh0QXVkaW9TYW1wbGluZ0lkeCIsIlVJbnQwIiwiVUludDEiLCJ0ZW1wQXVkaW9PYmplY3RUeXBlIiwiYXVkaW9PYmplY3RUeXBlIiwic2FtcGxpbmdJZHgiLCJlbWl0RXJyb3IiLCJkaXNwYXRjaCIsIlVJbnQyIiwiYnJvd3NlciIsIm9zIiwiaXNBbmRyb2lkIiwiZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCIsImV4dGVuc2lvblNhbXBsaW5nSWR4IiwiZGF0YVNpemUiLCJwcmVmaXgiLCJwYXlsb2FkIiwiTG9nIiwid2FybiIsIk1ldGFEZW11eGVyIiwic2l6ZSIsIm1ldGFEYXRhIiwicGFyc2VWYWx1ZSIsIkRhdGFWaWV3Iiwic3RyTGVuIiwiZ2V0VWludDE2IiwiVVRGOCIsImRlY29kZSIsInRzIiwiZ2V0RmxvYXQ2NCIsInRpbWVPZmZzZXQiLCJnZXRJbnQxNiIsIkRhdGUiLCJwYXJzZVN0cmluZyIsImlzT2JqRW5kIiwiZ2V0VWludDMyIiwiQXJyYXlCdWZmZXIiLCJkYXRhVmlldyIsImJvb2xOdW0iLCJvYmpFbmRTaXplIiwiYW1mT2JqIiwicGFyc2VPYmplY3QiLCJpc09iamVjdEVuZCIsIm1hcmsiLCJhbWZWYXIiLCJtYXJrZXIiLCJhcnJMZW5ndGgiLCJzY3JpcHQiLCJkYXRlIiwicGFyc2VEYXRlIiwibG9uZ1N0ciIsInBhcnNlTG9uZ1N0cmluZyIsIm5hdGl2ZUhhc1Byb3AiLCJUYWdkZW11eCIsIl9tZXRhRGVtdXhlciIsIl92aWRlb0RlbXV4ZXIiLCJWaWRlb0RlbXV4ZXIiLCJfYXVkaW9EZW11eGVyIiwiX2ZpcnN0UGFyc2UiLCJfZGF0YU9mZnNldCIsInJlc29sdmVUYWciLCJfcmVzb2x2ZUF1ZGlvVGFnIiwiX3Jlc29sdmVWaWRlb1RhZyIsIl9yZXNvbHZlTWV0YVRhZyIsInMiLCJoYXNNZXRhRGF0YSIsIkxvZ2dlciIsIm9uTWV0YURhdGEiLCJtZXRhRmllbGRzIiwiZmllbGQiLCJtZXRhT2JqIiwiX2luaXRNZXRhRGF0YSIsImZpbGVwb3NpdGlvbnMiLCJ2aWRlb01ldGFEYXRhIiwiZmlyc3RVSTgiLCJmcmFtZVR5cGUiLCJjb2RlY0lkIiwiX3BhcnNlQVZDUGFja2V0IiwicGFja2FnZVR5cGUiLCJjcHNUaW1lIiwiX3BhcnNlQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQiLCJfcGFyc2VBVkNWaWRlb0RhdGEiLCJhdmNjIiwidGltZXNjYWxlIiwiYXZjUHJvZmlsZSIsImdldFVpbnQiLCJzcHNMZW5ndGgiLCJoYW5kbGVyIiwic3BzIiwicGFyc2VTUFMiLCJjb2RlY1NpemUiLCJwcmVzZW50U2l6ZSIsImZyYW1lUmF0ZSIsInJlZkZyYW1lcyIsImJpdERlcHRoIiwicHJlc2VudFdpZHRoIiwicHJlc2VudEhlaWdodCIsImNvZGVjQXJyIiwic3ViYXJyYXkiLCJjb2RlY1N0ciIsImoiLCJoZXgiLCJwYWRTdGFydCIsInBwcyIsInBwc0NvdW50IiwicHBzU2l6ZSIsIm5hbHVMaXN0IiwibmFsdUxlblNpemUiLCJpc0tleWZyYW1lIiwidGVtcFJlYWRPZmZzZXQiLCJuYWx1U2l6ZSIsImdldFVpbnQyNCIsInVuaXRUeXBlIiwibmFsdVVuaXQiLCJ2aWRlb1NhbXBsZSIsInVuaXRzIiwiY3BzIiwibnVtIiwiRk1QNCIsIndyaXRlVWludDMyIiwiY29udGVudCIsImluaXRCb3giLCJtdmhkIiwidHJhazEiLCJ2aWRlb1RyYWsiLCJ0cmFrMiIsImF1ZGlvVHJhayIsIm12ZXgiLCJpdGVtIiwiYnl0ZXMiLCJ0a2hkIiwibWRpYSIsInNhbXBsZXJhdGUiLCJtZWRpYVRpbWUiLCJtZGhkIiwiaGRsciIsIm1pbmYiLCJleHRlbnNpb24iLCJ2bWhkIiwic21oZCIsImRpbmYiLCJzdGJsIiwiZHJlZiIsInN0c2QiLCJzdHRzIiwic3RzYyIsInN0c3oiLCJzdGNvIiwibXA0YSIsImF2YzEiLCJlc2RzIiwiY29uZmlnbGVuIiwiY29uY2F0IiwiaFNwYWNpbmciLCJ2U3BhY2luZyIsImF2Y2NCdWZmZXIiLCJidHJ0IiwicGFzcCIsIm1laGQiLCJ0cmV4IiwibWZoZCIsInRyYWYiLCJzZXF1ZW5jZSIsInRmaGQiLCJ0ZmR0Iiwic2R0cCIsInRydW4iLCJzZHRwTGVuZ3RoIiwic2FtcGxlQ291bnQiLCJ3cml0ZU9mZnNldCIsInRydW5Cb3giLCJtZGF0Qm94IiwiY2hhckNvZGVBdCIsIl9kdHNCYXNlIiwiX2lzRHRzQmFzZUluaXRlZCIsIl92aWRlb01ldGEiLCJfYXVkaW9NZXRhIiwiX2F1ZGlvTmV4dER0cyIsIl92aWRlb05leHREdHMiLCJfdmlkZW9TZWdtZW50TGlzdCIsIl9hdWRpb1NlZ21lbnRMaXN0IiwiX2ZpbGxTaWxlbmNlRnJhbWUiLCJfZHRzQmFzZUluaXRlZCIsImNhbGNEdHNCYXNlIiwiX3JlbXV4VmlkZW8iLCJfcmVtdXhBdWRpbyIsImZ0eXAiLCJtb292IiwiYXVkaW9CYXNlIiwiSW5maW5pdHkiLCJ2aWRlb0Jhc2UiLCJkdHNDb3JyZWN0aW9uIiwiZmlyc3REdHMiLCJsYXN0RHRzIiwiZmlyc3RQdHMiLCJsYXN0UHRzIiwibXA0U2FtcGxlcyIsInZpZGVvU2VnbWVudCIsImF2Y1NhbXBsZSIsImxhc3RTZWdtZW50IiwiZ2FwIiwibGFzdEdhcCIsIl91bml0cyIsIm1kYXRTYW1wbGUiLCJzYW1wbGVEdXJhdGlvbiIsIm5leHREdHMiLCJhZGRSQVAiLCJmaXJzdCIsIm1vb2ZNZGF0IiwibW9vZiIsIm1kYXQiLCJhcHBlbmQiLCJzaWxlbnREdXJhdGlvbiIsImlzRmlyc3REdHNJbml0ZWQiLCJuZWVkU2lsZW50RnJhbWUiLCJpc0VtcHR5IiwiZ2V0TGFzdFNhbXBsZUJlZm9yZSIsInNpbGVudEZyYW1lIiwiaW5pdFNpbGVudEF1ZGlvIiwibXA0U2FtcGxlIiwiY3RzIiwiYXVkaW9TZWdtZW50IiwiZ2V0U2lsZW50RnJhbWUiLCJSZW11eGVyIiwiX2hlYWRlcnMiLCJIZWFkZXJzIiwiaGVhZGVycyIsIm1ldGhvZCIsImNhY2hlIiwicmVxdWVzdCIsIlJlcXVlc3QiLCJjYWxsYmFjayIsInJlYWRlciIsInJlYWQiLCJmZXRjaCIsInJlcyIsImdldFJlYWRlciIsIkxvYWRDbHMiLCJGZXRjaExvYWRlciIsIlhIUkxvYWRlciIsImxvYWRlciIsImlzQ2FuY2VsZWQiLCJxdWV1ZSIsInVwZGF0ZSIsImZpbHRlciIsIlF1ZXVlIiwic2VuZGVkIiwid2FpdCIsImxpbWl0IiwiY29tcGxldGUiLCJpc1N0b3BwZWQiLCJub3ciLCJSYW5nZSIsInN0YXR1cyIsIm9rIiwicmVqZWN0Iiwic3RhdHVzVGV4dCIsImFycmF5QnVmZmVyIiwiX3Byb21pc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJyZXNwb25zZVR5cGUiLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25hYm9ydCIsIm9ubG9hZCIsInJlc3BvbnNlIiwib25lcnJvciIsIl94aHIiLCJzZW5kIiwiYWJvcnQiLCJjb250ZXh0IiwiX2R2IiwiX2NvbnRleHQiLCJpbml0UHJveHkiLCJpc0hpZ2giLCJyZWFkU2l6ZSIsIm51bVRvQW5kIiwiYmVnaW4iLCJieXRlc0F2YWlsYWJsZSIsIndvcmQiLCJiaXRzQXZhaWxhYmxlIiwid29ya2luZ0J5dGVzIiwiYXZhaWxhYmxlQnl0ZXMiLCJza2lwQnl0ZXMiLCJsb2FkV29yZCIsImJpdHMiLCJ2YWx1IiwicmVhZEJpdHMiLCJsZWFkaW5nWmVyb0NvdW50Iiwic2tpcExaIiwic2tpcEJpdHMiLCJjbHoiLCJyZWFkVUVHIiwibGFzdFNjYWxlIiwibmV4dFNjYWxlIiwiZGVsdGFTY2FsZSIsInJlYWRFRyIsImZyYW1lQ3JvcExlZnRPZmZzZXQiLCJmcmFtZUNyb3BSaWdodE9mZnNldCIsImZyYW1lQ3JvcFRvcE9mZnNldCIsImZyYW1lQ3JvcEJvdHRvbU9mZnNldCIsImNvZGVjV2lkdGgiLCJjb2RlY0hlaWdodCIsIm51bVJlZkZyYW1lc0luUGljT3JkZXJDbnRDeWNsZSIsInBpY1dpZHRoSW5NYnNNaW51czEiLCJwaWNIZWlnaHRJbk1hcFVuaXRzTWludXMxIiwiZnJhbWVNYnNPbmx5RmxhZyIsInNjYWxpbmdMaXN0Q291bnQiLCJyZWFkVUJ5dGUiLCJyZWFkQm9vbGVhbiIsInNraXBFRyIsInNraXBVRUciLCJza2lwU2NhbGluZ0xpc3QiLCJjaHJvbWFGb3JtYXRJZGMiLCJjaHJvbWFGb3JtYXRzIiwiYml0RGVwdGhMdW1hIiwicHJvZmlsZUlkY3MiLCJpbmNsdWRlcyIsInBpY09yZGVyQ250VHlwZSIsImZwc0ZpeGVkIiwiYXNwZWN0UmF0aW9JZGMiLCJudW1Vbml0SW5UaWNrIiwiY3JvcFVuaXRYIiwiY3JvcFVuaXRZIiwic3ViV2MiLCJzdWJIYyIsInBpeGVsU2NhbGUiLCJjZWlsIiwibmF0aXZlU2xpY2UiLCJPYnNlcnZlciIsImZuSWQiLCJfbGlzdGVuZXJJZE1hcCIsIl9saXN0ZW5lcnMiLCJfZ2V0TGlzdGVuZXJzQnlLZXkiLCJfZ2V0TGlzdGVuZXJCeUlkIiwiX3RoaXMiLCJvbmNlRnVuYyIsInVpbnQ4YXJyYXkiLCJvdXQiLCJpbnB1dCIsIl9jaGVja0NvbnRpbnVhdGlvbiIsInVjczQiLCJjaGVja0xlbmd0aCIsImFycmF5IiwiZGVib3VuY2UiLCJmdW5jIiwiaW1tZWRpYXRlIiwiZGVib3VuY2VkIiwiY2xlYXJUaW1lb3V0IiwiY2FsbE5vdyIsImNhY2hlV3JhcHBlciIsInJlZHVjZSIsInByZSIsImN1ciIsImxlIiwiYnVmIiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiZGV2aWNlIiwiaXNQYyIsImlzVGFibGV0IiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsInJlZyIsImllIiwiZmlyZm94IiwiY2hyb21lIiwib3BlcmEiLCJzYWZhcmkiLCJ0ZXN0IiwiaXNXaW5kb3dzUGhvbmUiLCJpc1N5bWJpYW4iLCJpc0ZpcmVGb3giLCJpc1Bob25lIiwidGVtcCIsInBhZFN0YXJ0NEhleCIsImhleE51bSIsImhleFN0ciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBRCxRQUFRRSxPQUFSLEdBQWtCLFVBQVVDLGlCQUFWLEVBQTZCO0FBQzdDLE1BQUlDLGNBQWMsQ0FBbEI7O0FBRUEsT0FBSyxJQUFJQyxPQUFPQyxVQUFVQyxNQUFyQixFQUE2QkMsU0FBU0MsTUFBTUosT0FBTyxDQUFQLEdBQVdBLE9BQU8sQ0FBbEIsR0FBc0IsQ0FBNUIsQ0FBdEMsRUFBc0VLLE9BQU8sQ0FBbEYsRUFBcUZBLE9BQU9MLElBQTVGLEVBQWtHSyxNQUFsRyxFQUEwRztBQUN4R0YsV0FBT0Us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Q0FBZSxnQkFBUTtBQUNuQixvQkFBSW1vQixJQUFKLEVBQVU7QUFDTiwwQkFBS2pqQixNQUFMLEdBQWMsZ0NBQU91VCxVQUFQLEVBQW1CLE1BQUt2VCxNQUF4QixFQUFnQ2lqQixJQUFoQyxDQUFkO0FBQ0gsaUJBRkQsTUFFTztBQUNIOUQsa0NBQU94a0IsS0FBUCxDQUFhc29CLElBQWI7QUFDSDtBQUNKLGFBTkQ7QUFPSDs7O29DQUNtQnRzQixLLEVBQU87QUFDdkIsbUJBQU8sSUFBSTRjLFVBQUosQ0FBZSxDQUNsQjVjLFNBQVMsRUFEUyxFQUVqQkEsU0FBUyxFQUFWLEdBQWdCLElBRkUsRUFHakJBLFNBQVMsQ0FBVixHQUFlLElBSEcsRUFJbEJBLFFBQVEsSUFKVSxDQUFmLENBQVA7QUFNSDs7O2tDQUNpQm9CLEcsRUFBSztBQUNuQixnQkFBSTI2QixPQUFPLEVBQVg7QUFDQSxxQkFBU0MsWUFBVCxDQUF1QkMsTUFBdkIsRUFBK0I7QUFDM0Isb0JBQUlDLFNBQVNELE9BQU8vcEIsUUFBUCxDQUFnQixFQUFoQixDQUFiO0FBQ0EsdUJBQU9ncUIsT0FBT3RSLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsR0FBbkIsQ0FBUDtBQUNIO0FBQ0R4cEIsZ0JBQUkrQyxPQUFKLENBQVksZUFBTztBQUNmNDNCLHdCQUFRQyxhQUFhclEsR0FBYixDQUFSO0FBQ0gsYUFGRDtBQUdBLG1CQUFPcFYsU0FBU3dsQixJQUFULEVBQWUsRUFBZixDQUFQO0FBQ0g7Ozs7OztrQkFHVXJpQixNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDZixhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKFJlc3VsdENvbnN0cnVjdG9yKSB7XG4gIHZhciB0b3RhbExlbmd0aCA9IDA7XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFycmF5cyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcnJheXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGFyciA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICB0b3RhbExlbmd0aCArPSBhcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IFJlc3VsdENvbnN0cnVjdG9yKHRvdGFsTGVuZ3RoKTtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBhcnJheXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgIHZhciBfYXJyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICByZXN1bHQuc2V0KF9hcnIsIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gX2Fyci5sZW5ndGg7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY29uY2F0ID0gcmVxdWlyZSgnLi9jb25jYXQnKTtcblxudmFyIF9jb25jYXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uY2F0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uY2F0Mi5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiAgICAgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9hc3NpZ24nKVxuICAsIG5vcm1hbGl6ZU9wdHMgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucycpXG4gICwgaXNDYWxsYWJsZSAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlJylcbiAgLCBjb250YWlucyAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucycpXG5cbiAgLCBkO1xuXG5kID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHNjciwgdmFsdWUvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCB3LCBvcHRpb25zLCBkZXNjO1xuXHRpZiAoKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB8fCAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSkge1xuXHRcdG9wdGlvbnMgPSB2YWx1ZTtcblx0XHR2YWx1ZSA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHcgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdFx0dyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ3cnKTtcblx0fVxuXG5cdGRlc2MgPSB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlLCB3cml0YWJsZTogdyB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuZC5ncyA9IGZ1bmN0aW9uIChkc2NyLCBnZXQsIHNldC8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IGdldDtcblx0XHRnZXQgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbM107XG5cdH1cblx0aWYgKGdldCA9PSBudWxsKSB7XG5cdFx0Z2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKGdldCkpIHtcblx0XHRvcHRpb25zID0gZ2V0O1xuXHRcdGdldCA9IHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmIChzZXQgPT0gbnVsbCkge1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShzZXQpKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdH1cblxuXHRkZXNjID0geyBnZXQ6IGdldCwgc2V0OiBzZXQsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHktZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge307XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpXG5cdD8gT2JqZWN0LmFzc2lnblxuXHQ6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduLCBvYmo7XG5cdGlmICh0eXBlb2YgYXNzaWduICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0b2JqID0geyBmb286IFwicmF6XCIgfTtcblx0YXNzaWduKG9iaiwgeyBiYXI6IFwiZHdhXCIgfSwgeyB0cnp5OiBcInRyenlcIiB9KTtcblx0cmV0dXJuIChvYmouZm9vICsgb2JqLmJhciArIG9iai50cnp5KSA9PT0gXCJyYXpkd2F0cnp5XCI7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrZXlzICA9IHJlcXVpcmUoXCIuLi9rZXlzXCIpXG4gICwgdmFsdWUgPSByZXF1aXJlKFwiLi4vdmFsaWQtdmFsdWVcIilcbiAgLCBtYXggICA9IE1hdGgubWF4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkZXN0LCBzcmMgLyosIOKApnNyY24qLykge1xuXHR2YXIgZXJyb3IsIGksIGxlbmd0aCA9IG1heChhcmd1bWVudHMubGVuZ3RoLCAyKSwgYXNzaWduO1xuXHRkZXN0ID0gT2JqZWN0KHZhbHVlKGRlc3QpKTtcblx0YXNzaWduID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdHRyeSB7XG5cdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGU7XG5cdFx0fVxuXHR9O1xuXHRmb3IgKGkgPSAxOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRzcmMgPSBhcmd1bWVudHNbaV07XG5cdFx0a2V5cyhzcmMpLmZvckVhY2goYXNzaWduKTtcblx0fVxuXHRpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkgdGhyb3cgZXJyb3I7XG5cdHJldHVybiBkZXN0O1xufTtcbiIsIi8vIERlcHJlY2F0ZWRcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuIHJldHVybiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCI7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdW5kZWZpbmVkID0gcmVxdWlyZShcIi4uL2Z1bmN0aW9uL25vb3BcIikoKTsgLy8gU3VwcG9ydCBFUzMgZW5naW5lc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiByZXR1cm4gKHZhbCAhPT0gX3VuZGVmaW5lZCkgJiYgKHZhbCAhPT0gbnVsbCk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKSA/IE9iamVjdC5rZXlzIDogcmVxdWlyZShcIi4vc2hpbVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRPYmplY3Qua2V5cyhcInByaW1pdGl2ZVwiKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuLi9pcy12YWx1ZVwiKTtcblxudmFyIGtleXMgPSBPYmplY3Qua2V5cztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBrZXlzKGlzVmFsdWUob2JqZWN0KSA/IE9iamVjdChvYmplY3QpIDogb2JqZWN0KTsgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuL2lzLXZhbHVlXCIpO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG52YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChzcmMsIG9iaikge1xuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBzcmMpIG9ialtrZXldID0gc3JjW2tleV07XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdHMxIC8qLCDigKZvcHRpb25zKi8pIHtcblx0dmFyIHJlc3VsdCA9IGNyZWF0ZShudWxsKTtcblx0Zm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRpZiAoIWlzVmFsdWUob3B0aW9ucykpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihmbiArIFwiIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuXHRyZXR1cm4gZm47XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1ZhbHVlID0gcmVxdWlyZShcIi4vaXMtdmFsdWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICghaXNWYWx1ZSh2YWx1ZSkpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlIG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKVxuXHQ/IFN0cmluZy5wcm90b3R5cGUuY29udGFpbnNcblx0OiByZXF1aXJlKFwiLi9zaGltXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHIgPSBcInJhemR3YXRyenlcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2Ygc3RyLmNvbnRhaW5zICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIChzdHIuY29udGFpbnMoXCJkd2FcIikgPT09IHRydWUpICYmIChzdHIuY29udGFpbnMoXCJmb29cIikgPT09IGZhbHNlKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCBjYWxsYWJsZSA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L3ZhbGlkLWNhbGxhYmxlJylcblxuICAsIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LCBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGxcbiAgLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICAsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIGRlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH1cblxuICAsIG9uLCBvbmNlLCBvZmYsIGVtaXQsIG1ldGhvZHMsIGRlc2NyaXB0b3JzLCBiYXNlO1xuXG5vbiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgZGF0YTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkge1xuXHRcdGRhdGEgPSBkZXNjcmlwdG9yLnZhbHVlID0gY3JlYXRlKG51bGwpO1xuXHRcdGRlZmluZVByb3BlcnR5KHRoaXMsICdfX2VlX18nLCBkZXNjcmlwdG9yKTtcblx0XHRkZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRkYXRhID0gdGhpcy5fX2VlX187XG5cdH1cblx0aWYgKCFkYXRhW3R5cGVdKSBkYXRhW3R5cGVdID0gbGlzdGVuZXI7XG5cdGVsc2UgaWYgKHR5cGVvZiBkYXRhW3R5cGVdID09PSAnb2JqZWN0JykgZGF0YVt0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblx0ZWxzZSBkYXRhW3R5cGVdID0gW2RhdGFbdHlwZV0sIGxpc3RlbmVyXTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbm9uY2UgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIG9uY2UsIHNlbGY7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXHRzZWxmID0gdGhpcztcblx0b24uY2FsbCh0aGlzLCB0eXBlLCBvbmNlID0gZnVuY3Rpb24gKCkge1xuXHRcdG9mZi5jYWxsKHNlbGYsIHR5cGUsIG9uY2UpO1xuXHRcdGFwcGx5LmNhbGwobGlzdGVuZXIsIHRoaXMsIGFyZ3VtZW50cyk7XG5cdH0pO1xuXG5cdG9uY2UuX19lZU9uY2VMaXN0ZW5lcl9fID0gbGlzdGVuZXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhLCBsaXN0ZW5lcnMsIGNhbmRpZGF0ZSwgaTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuIHRoaXM7XG5cdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0aWYgKCFkYXRhW3R5cGVdKSByZXR1cm4gdGhpcztcblx0bGlzdGVuZXJzID0gZGF0YVt0eXBlXTtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRmb3IgKGkgPSAwOyAoY2FuZGlkYXRlID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRpZiAoKGNhbmRpZGF0ZSA9PT0gbGlzdGVuZXIpIHx8XG5cdFx0XHRcdFx0KGNhbmRpZGF0ZS5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0XHRpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMikgZGF0YVt0eXBlXSA9IGxpc3RlbmVyc1tpID8gMCA6IDFdO1xuXHRcdFx0XHRlbHNlIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmICgobGlzdGVuZXJzID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0KGxpc3RlbmVycy5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0ZGVsZXRlIGRhdGFbdHlwZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5lbWl0ID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dmFyIGksIGwsIGxpc3RlbmVyLCBsaXN0ZW5lcnMsIGFyZ3M7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuO1xuXHRsaXN0ZW5lcnMgPSB0aGlzLl9fZWVfX1t0eXBlXTtcblx0aWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcblx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuXHRcdGZvciAoaSA9IDA7IChsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXSk7ICsraSkge1xuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJncyk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdGNhc2UgMTpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdFx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdFx0XHRhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdH1cblx0XHRcdGFwcGx5LmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH1cbn07XG5cbm1ldGhvZHMgPSB7XG5cdG9uOiBvbixcblx0b25jZTogb25jZSxcblx0b2ZmOiBvZmYsXG5cdGVtaXQ6IGVtaXRcbn07XG5cbmRlc2NyaXB0b3JzID0ge1xuXHRvbjogZChvbiksXG5cdG9uY2U6IGQob25jZSksXG5cdG9mZjogZChvZmYpLFxuXHRlbWl0OiBkKGVtaXQpXG59O1xuXG5iYXNlID0gZGVmaW5lUHJvcGVydGllcyh7fSwgZGVzY3JpcHRvcnMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmdW5jdGlvbiAobykge1xuXHRyZXR1cm4gKG8gPT0gbnVsbCkgPyBjcmVhdGUoYmFzZSkgOiBkZWZpbmVQcm9wZXJ0aWVzKE9iamVjdChvKSwgZGVzY3JpcHRvcnMpO1xufTtcbmV4cG9ydHMubWV0aG9kcyA9IG1ldGhvZHM7XG4iLCIvKipcbiAqIEBhdXRob3IgZnV5dWhhb1xuICovXG5pbXBvcnQgTWFpblBhcnNlciBmcm9tICcuL3BhcnNlL01haW5QYXJzZXInXG5pbXBvcnQgTVNFIGZyb20gJy4vcGFyc2UvTVNFJ1xuaW1wb3J0IFZvZFRhc2sgZnJvbSAnLi90YXNrcy9Wb2RUYXNrJ1xuaW1wb3J0IGdldERlZmF1bHRDb25mIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZydcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHYge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucywgcGxheWVyKSB7XG4gICAgdGhpcy5fcGxheWVyID0gcGxheWVyXG4gICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGdldERlZmF1bHRDb25mKCksIG9wdGlvbnMpXG4gICAgdGhpcy5mbHZQbGF5ZXIgPSBuZXcgTWFpblBhcnNlcih0aGlzLl9vcHRpb25zLCBwbGF5ZXIpXG4gICAgdGhpcy5tc2UgPSBuZXcgTVNFKClcbiAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgdGhpcy5pc0RhdGFMb2FkaW5nID0gZmFsc2VcbiAgICB0aGlzLnRlbXBDdXJyZW50VGltZSA9IDBcbiAgICB0aGlzLnRlbXBGbHZQbGF5ZXIgPSBudWxsXG4gICAgdGhpcy5pc0NoYW5naW5nU3JjID0gZmFsc2VcbiAgICB0aGlzLmluaXRQbGF5ZXJFdmVudHMocGxheWVyLCB0aGlzLl9vcHRpb25zKVxuICAgIHRoaXMuaW5pdEZsdlBsYXllckV2ZW50cyh0aGlzLmZsdlBsYXllciwgdGhpcy5tc2UpXG4gICAgdGhpcy5pbml0TXNlRXZlbnRzKHRoaXMubXNlLCB0aGlzLmZsdlBsYXllcilcbiAgfVxuXG4gIGxvYWQgKCkge1xuICAgIHRoaXMuZmx2UGxheWVyLnN0YXJ0TG9hZERhdGEoKVxuICB9XG5cbiAgaW5pdFBsYXllckV2ZW50cyAocGxheWVyLCBvcHRpb25zKSB7XG4gICAgY29uc3QgeyBtc2UgfSA9IHRoaXNcbiAgICBwbGF5ZXIubXNlID0gbXNlXG4gICAgdGhpcy5oYW5kbGVTZWVraW5nID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNDaGFuZ2luZ1NyYykge1xuICAgICAgICB0aGlzLmlzQ2hhbmdpbmdTcmMgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgYnVmZmVyZWQsIGN1cnJlbnRUaW1lIH0gPSBwbGF5ZXJcbiAgICAgIGxldCBpc0J1ZmZlcmVkID0gZmFsc2VcbiAgICAgIGlmIChidWZmZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJ1ZmZlcmVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRUaW1lID4gYnVmZmVyZWQuc3RhcnQoaSkgJiYgY3VycmVudFRpbWUgPCBidWZmZXJlZC5lbmQoaSkpIHtcbiAgICAgICAgICAgIGlzQnVmZmVyZWQgPSB0cnVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzQnVmZmVyZWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBWb2RUYXNrLmNsZWFyKClcbiAgICAgIGlmICghdGhpcy5pc1NlZWthYmxlKSB7XG4gICAgICAgIHRoaXMuX3BsYXllci5jdXJyZW50VGltZSA9IHRoaXMudGVtcEN1cnJlbnRUaW1lXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5mbHZQbGF5ZXIuc2VlayhwbGF5ZXIuY3VycmVudFRpbWUpXG4gICAgICB0aGlzLmlzU2Vla2luZyA9IHRydWVcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmlzTGl2ZSkge1xuICAgICAgcGxheWVyLm9uKCdzZWVraW5nJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZVNlZWtpbmcoKVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVUaW1lVXBkYXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy50ZW1wQ3VycmVudFRpbWUgPSBwbGF5ZXIuY3VycmVudFRpbWVcbiAgICAgIGlmICghdGhpcy5pc1NlZWtpbmcgJiYgdGhpcy5mbHZQbGF5ZXIuaXNNZWRpYUluZm9SZWFkeSAmJiAhdGhpcy50ZW1wRmx2UGxheWVyKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDaGVja2VyKHBsYXllcilcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNFbmRlZChwbGF5ZXIsIHRoaXMuZmx2UGxheWVyKVxuICAgIH1cbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCAoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZVRpbWVVcGRhdGUoKVxuICAgIH0pXG4gICAgcGxheWVyLl9yZXBsYXkgPSAoKSA9PiB7XG4gICAgICBwbGF5ZXIubXNlLmRlc3Ryb3koKVxuICAgICAgVm9kVGFzay5jbGVhcigpXG4gICAgICBjb25zdCBfbXNlID0gbmV3IE1TRSgpXG4gICAgICB0aGlzLmZsdlBsYXllci5yZXBsYXkoKVxuXG4gICAgICBtc2Uub24oJ3NvdXJjZW9wZW4nLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmx2UGxheWVyLmlzU291cmNlT3BlbiA9IHRydWVcbiAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcih0aGlzLmZsdlBsYXllci5mdHlwX21vb3YuYnVmZmVyKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBwbGF5ZXIucGxheSgpXG4gICAgICAgIH0sIDApXG4gICAgICAgIG1zZS5vbigndXBkYXRlZW5kJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtwZW5kaW5nRnJhZ21lbnRzLCBoYXNQZW5kaW5nRnJhZ21lbnRzfSA9IHRoaXMuZmx2UGxheWVyXG4gICAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSBmYWxzZVxuICAgICAgICAgIGlmIChoYXNQZW5kaW5nRnJhZ21lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudCA9IHBlbmRpbmdGcmFnbWVudHMuc2hpZnQoKVxuICAgICAgICAgICAgaWYgKCFtc2UuYXBwZW5kQnVmZmVyKGZyYWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgIHBlbmRpbmdGcmFnbWVudHMudW5zaGlmdChmcmFnbWVudClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBsYXllci5lbWl0KCdjYWNoZXVwZGF0ZScsIHBsYXllcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgbXNlLm9uKCdlcnJvcicsIChlKSA9PiB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlcnJvcicsIGUpXG4gICAgICB9KVxuXG4gICAgICBwbGF5ZXIubXNlID0gbXNlXG4gICAgICBwbGF5ZXIudmlkZW8uc3JjID0gdGhpcy5tc2UudXJsXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHBsYXllci5zd2l0Y2hVUkwgPSAodXJsKSA9PiB7XG4gICAgICB0aGlzLl9vcHRpb25zLnVybCA9IHVybFxuICAgICAgLy8gdGhpcy5mbHZQbGF5ZXIudW5iaW5kRXZlbnRzKClcblxuICAgICAgaWYgKCFwbGF5ZXIuY29uZmlnLmlzTGl2ZSkge1xuICAgICAgICBWb2RUYXNrLmNsZWFyKClcbiAgICAgICAgY29uc3QgdGVtcEZsdlBsYXllciA9IHRoaXMudGVtcEZsdlBsYXllciA9IG5ldyBNYWluUGFyc2VyKHRoaXMuX29wdGlvbnMsIHBsYXllcilcblxuICAgICAgICB0ZW1wRmx2UGxheWVyLmlzU291cmNlT3BlbiA9IHRydWVcbiAgICAgICAgdGVtcEZsdlBsYXllci5pc1RlbXBQbGF5ZXIgPSB0cnVlXG4gICAgICAgIHRoaXMuaW5pdEZsdlBsYXllckV2ZW50cyh0ZW1wRmx2UGxheWVyLCBtc2UpXG4gICAgICAgIHRlbXBGbHZQbGF5ZXIuaGFuZGxlTWVkaWFGcmFnbWVudCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy51bmJpbmRGbHZQbGF5ZXJFdmVudHModGhpcy5mbHZQbGF5ZXIpXG4gICAgICAgICAgdGhpcy5mbHZQbGF5ZXIuZGVzdHJveSgpXG4gICAgICAgICAgdGhpcy5mbHZQbGF5ZXIgPSB0ZW1wRmx2UGxheWVyXG4gICAgICAgICAgdGhpcy50ZW1wRmx2UGxheWVyID0gbnVsbFxuXG4gICAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcih0ZW1wRmx2UGxheWVyLmZ0eXBfbW9vdilcbiAgICAgICAgICB0ZW1wRmx2UGxheWVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSAoZnJhZ21lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBtc2UuYXBwZW5kQnVmZmVyKGZyYWdtZW50LmRhdGEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRlbXBGbHZQbGF5ZXIuc3RhcnRMb2FkRGF0YSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHVuYmluZEZsdlBsYXllckV2ZW50cyAoZmx2UGxheWVyKSB7XG4gICAgZmx2UGxheWVyLmhhbmRsZVNlZWtFbmQgPSAoKSA9PiBudWxsXG4gICAgZmx2UGxheWVyLmhhbmRsZUVycm9yID0gKCkgPT4gbnVsbFxuICAgIGZsdlBsYXllci5oYW5kbGVNZWRpYUZyYWdtZW50ID0gKCkgPT4gbnVsbFxuICB9XG4gIGluaXRGbHZQbGF5ZXJFdmVudHMgKGZsdlBsYXllciwgbXNlKSB7XG4gICAgY29uc3QgaGFuZGxlRnR5cE1vb3YgPSAoZnR5cE1vb3YpID0+IHtcbiAgICAgIGlmIChmbHZQbGF5ZXIuaXNTb3VyY2VPcGVuICYmICF0aGlzLnRlbXBGbHZQbGF5ZXIpIHtcbiAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcihmdHlwTW9vdi5idWZmZXIpXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzQ2hhbmdpbmdTcmMpIHtcbiAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSB0cnVlXG4gICAgICAgIGZsdlBsYXllci5zZWVrKHRoaXMuX3BsYXllci5jdXJyZW50VGltZSlcbiAgICAgIH1cbiAgICB9XG4gICAgZmx2UGxheWVyLm9uY2UoJ3JlYWR5JywgaGFuZGxlRnR5cE1vb3YpXG4gICAgZmx2UGxheWVyLmhhbmRsZVNlZWtFbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgfVxuICAgIGZsdlBsYXllci5oYW5kbGVFcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBlKVxuICAgIH1cbiAgICBpZiAoIXRoaXMudGVtcEZsdlBsYXllcikge1xuICAgICAgZmx2UGxheWVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSAoZnJhZ21lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcEZsdlBsYXllciA/IGZhbHNlIDogbXNlLmFwcGVuZEJ1ZmZlcihmcmFnbWVudC5kYXRhKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRNc2VFdmVudHMgKG1zZSkge1xuICAgIG1zZS5vbignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgZSlcbiAgICB9KVxuICAgIGNvbnN0IG9uU291cmNlT3BlbiA9ICgpID0+IHtcbiAgICAgIHRoaXMuZmx2UGxheWVyLmlzU291cmNlT3BlbiA9IHRydWVcbiAgICAgIGlmICh0aGlzLmZsdlBsYXllci5mdHlwX21vb3YgIT09IG51bGwpIHtcbiAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcih0aGlzLmZsdlBsYXllci5mdHlwX21vb3YuYnVmZmVyKVxuICAgICAgfVxuXG4gICAgICBtc2Uub24oJ3VwZGF0ZWVuZCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBwZW5kaW5nRnJhZ21lbnRzLCBoYXNQZW5kaW5nRnJhZ21lbnRzIH0gPSB0aGlzLmZsdlBsYXllclxuXG4gICAgICAgIGlmIChoYXNQZW5kaW5nRnJhZ21lbnRzKSB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBwZW5kaW5nRnJhZ21lbnRzLnNoaWZ0KClcbiAgICAgICAgICBpZiAoIW1zZS5hcHBlbmRCdWZmZXIoZnJhZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgIHBlbmRpbmdGcmFnbWVudHMudW5zaGlmdChmcmFnbWVudClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2NhY2hldXBkYXRlJywgdGhpcy5fcGxheWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgbXNlLm9uKCdzb3VyY2VvcGVuJywgb25Tb3VyY2VPcGVuKVxuICB9XG5cbiAgbG9hZERhdGEgKGN1cnJlbnRUaW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZmx2UGxheWVyLmxvYWRTZWdtZW50cyh0cnVlLCBjdXJyZW50VGltZSwgdGhpcy5fb3B0aW9ucy5wcmVsb2FkVGltZSlcbiAgfVxuXG4gIHByb2dyZXNzQ2hlY2tlciAocGxheWVyKSB7XG4gICAgY29uc3QgeyBtaW5DYWNoZWRUaW1lLCBwcmVsb2FkVGltZSB9ID0gdGhpcy5fb3B0aW9uc1xuICAgIGNvbnN0IHJhbmdlID0gcGxheWVyLmdldEJ1ZmZlcmVkUmFuZ2UoKVxuICAgIGlmICh0aGlzLmZsdlBsYXllci52aWRlb0R1cmF0aW9uIC0gcmFuZ2VbMV0gKiB0aGlzLmZsdlBsYXllci52aWRlb1RpbWVTY2FsZSA8IDAuMSAqIHRoaXMuZmx2UGxheWVyLnZpZGVvVGltZVNjYWxlKSB7IHJldHVybiB9XG4gICAgaWYgKHJhbmdlWzFdIC0gcGxheWVyLmN1cnJlbnRUaW1lIDwgbWluQ2FjaGVkVGltZSAmJiAhdGhpcy5pc0RhdGFMb2FkaW5nKSB7XG4gICAgICB0aGlzLmlzRGF0YUxvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZsdlBsYXllci5sb2FkU2VnbWVudHModHJ1ZSwgcGxheWVyLmN1cnJlbnRUaW1lLCBwcmVsb2FkVGltZSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNEYXRhTG9hZGluZyA9IGZhbHNlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBjbGVhclBsYXllckNhY2hlICgpIHtcbiAgICBjb25zdCByYW5nZSA9IHRoaXMuX3BsYXllci5nZXRCdWZmZXJlZFJhbmdlKClcbiAgICBpZiAocmFuZ2UubGVuZ3RoID09PSAyKSB7XG4gICAgICAvLyB0aGlzLm1zZS5yZW1vdmVCdWZmZXIocmFuZ2VbMF0sIHJhbmdlWzFdKVxuICAgIH1cbiAgfVxuICBpc0VuZGVkIChwbGF5ZXIsIGZsdikge1xuICAgIGlmIChmbHYudmlkZW9EdXJhdGlvbiAtIHBsYXllci5jdXJyZW50VGltZSAqIGZsdi52aWRlb1RpbWVTY2FsZSA8IDIgKiBmbHYudmlkZW9UaW1lU2NhbGUpIHtcbiAgICAgIGNvbnN0IHJhbmdlID0gcGxheWVyLmdldEJ1ZmZlcmVkUmFuZ2UoKVxuICAgICAgaWYgKHBsYXllci5jdXJyZW50VGltZSAtIHJhbmdlWzFdIDwgMC4xKSB7XG4gICAgICAgIHRoaXMubXNlLmVuZE9mU3RyZWFtKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgVm9kVGFzay5jbGVhcigpXG4gICAgdGhpcy5fb3B0aW9ucyA9IHt9XG4gICAgdGhpcy5tc2UgPSBudWxsXG4gICAgdGhpcy5pc1NlZWtpbmcgPSBmYWxzZVxuICAgIHRoaXMuaXNEYXRhTG9hZGluZyA9IGZhbHNlXG4gICAgdGhpcy50ZW1wQ3VycmVudFRpbWUgPSAwXG4gICAgdGhpcy50ZW1wRmx2UGxheWVyID0gbnVsbFxuICAgIHRoaXMuaXNDaGFuZ2luZ1NyYyA9IGZhbHNlXG4gICAgdGhpcy5oYW5kbGVUaW1lVXBkYXRlID0gKCkgPT4ge31cbiAgICB0aGlzLmhhbmRsZVNlZWtpbmcgPSAoKSA9PiB7fVxuICAgIHRoaXMuZmx2UGxheWVyLmRlc3Ryb3koKVxuICAgIHRoaXMuX3BsYXllci5wYXVzZSgpXG4gIH1cbiAgZ2V0IGlzU2Vla2FibGUgKCkge1xuICAgIHJldHVybiB0aGlzLmZsdlBsYXllci5pc1NlZWthYmxlXG4gIH1cbn1cbiIsImNvbnN0IGdldERlZmF1bHRDb25mID0gKCkgPT4gKHtcbiAgcHJlbG9hZFRpbWU6IDMwLFxuICBtaW5DYWNoZWRUaW1lOiA1LFxuICBhdXRvQ2xlYW5Tb3VyY2VCdWZmZXI6IHRydWUsXG4gIGF1dG9DbGVhbk1heEJhY2tUaW1lOiAzMCxcbiAgaXNMaXZlOiBmYWxzZSxcbiAgY29yczogdHJ1ZVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZ2V0RGVmYXVsdENvbmZcbiIsImNvbnN0IGZpZWxkcyA9IFt7XG4gIG5hbWU6ICdkdXJhdGlvbicsXG4gIHR5cGU6IEJvb2xlYW4sXG4gIHBhcnNlciAodGFyZ2V0LCBvcmlnaW4pIHtcbiAgICB0YXJnZXQubWVkaWFJbmZvLmR1cmF0aW9uID0gb3JpZ2luLmR1cmF0aW9uXG4gIH1cbn0sIHtcbiAgbmFtZTogJ2hhc0F1ZGlvJyxcbiAgdHlwZTogQm9vbGVhbixcbiAgcGFyc2VyICh0YXJnZXQsIG9yaWdpbikge1xuICAgIHRhcmdldC5tZWRpYUluZm8uaGFzQXVkaW8gPSBvcmlnaW4uaGFzQXVkaW9cbiAgfVxufSwge1xuICBuYW1lOiAnaGFzVmlkZW8nLFxuICB0eXBlOiBCb29sZWFuLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5oYXNWaWRlbyA9IG9yaWdpbi5oYXNWaWRlb1xuICB9XG59LCB7XG4gIG5hbWU6ICdhdWRpb2RhdGFyYXRlJyxcbiAgdHlwZTogTnVtYmVyLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5hdWRpb0RhdGFSYXRlID0gb3JpZ2luLmF1ZGlvZGF0YXJhdGVcbiAgfVxufSwge1xuICBuYW1lOiAndmlkZW9kYXRhcmF0ZScsXG4gIHR5cGU6IE51bWJlcixcbiAgcGFyc2VyICh0YXJnZXQsIG9yaWdpbikge1xuICAgIHRhcmdldC5tZWRpYUluZm8udmlkZW9EYXRhUmF0ZSA9IG9yaWdpbi52aWRlb2RhdGFyYXRlXG4gIH1cbn0sIHtcbiAgbmFtZTogJ3dpZHRoJyxcbiAgdHlwZTogTnVtYmVyLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby53aWR0aCA9IG9yaWdpbi53aWR0aFxuICB9XG59LCB7XG4gIG5hbWU6ICdoZWlnaHQnLFxuICB0eXBlOiBOdW1iZXIsXG4gIHBhcnNlciAodGFyZ2V0LCBvcmlnaW4pIHtcbiAgICB0YXJnZXQubWVkaWFJbmZvLmhlaWdodCA9IG9yaWdpbi5oZWlnaHRcbiAgfVxufSwge1xuICBuYW1lOiAnZHVyYXRpb24nLFxuICB0eXBlOiBOdW1iZXIsXG4gIHBhcnNlciAodGFyZ2V0LCBvcmlnaW4pIHtcbiAgICBpZiAoIXRhcmdldC5zdGF0ZS5kdXJhdGlvbikge1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmZsb29yKG9yaWdpbi5kdXJhdGlvbiAqIHRhcmdldC5zdGF0ZS50aW1lU2NhbGUpXG4gICAgICB0YXJnZXQuc3RhdGUuZHVyYXRpb24gPSB0YXJnZXQubWVkaWFJbmZvLmR1cmF0aW9uID0gZHVyYXRpb25cbiAgICB9XG4gIH0sXG4gIG9uVHlwZUVyciAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5kdXJhdGlvbiA9IDBcbiAgfVxufSwge1xuICBuYW1lOiAnZnJhbWVyYXRlJyxcbiAgdHlwZTogTnVtYmVyLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgY29uc3QgZnBzTnVtID0gTWF0aC5mbG9vcihvcmlnaW4uZnJhbWVyYXRlICogMTAwMClcbiAgICBpZiAoZnBzTnVtID4gMCkge1xuICAgICAgY29uc3QgZnBzID0gZnBzTnVtIC8gMTAwMFxuICAgICAgY29uc3QgeyByZWZlckZyYW1lUmF0ZSwgbWVkaWFJbmZvIH0gPSB0YXJnZXRcbiAgICAgIHJlZmVyRnJhbWVSYXRlLmZpeGVkID0gdHJ1ZVxuICAgICAgcmVmZXJGcmFtZVJhdGUuZnBzID0gZnBzXG4gICAgICByZWZlckZyYW1lUmF0ZS5mcHNOdW0gPSBmcHNOdW1cbiAgICAgIHJlZmVyRnJhbWVSYXRlLmZwc0RlbiA9IDEwMDBcbiAgICAgIG1lZGlhSW5mby5mcHMgPSBmcHNcbiAgICB9XG4gIH1cbn0sIHtcbiAgbmFtZTogJ2tleWZyYW1lcycsXG4gIHR5cGU6IE9iamVjdCxcbiAgcGFyc2VyICh0YXJnZXQsIG9yaWdpbikge1xuICAgIGNvbnN0IHsga2V5ZnJhbWVzIH0gPSBvcmlnaW5cbiAgICB0YXJnZXQubWVkaWFJbmZvLmhhc0tleWZyYW1lcyA9ICEha2V5ZnJhbWVzXG4gICAgaWYgKGtleWZyYW1lcykge1xuICAgICAgdGFyZ2V0Lm1lZGlhSW5mby5rZXlmcmFtZXMgPSB0aGlzLl9wYXJzZUtleWZyYW1lcyhrZXlmcmFtZXMpXG4gICAgfVxuICAgIG9yaWdpbi5rZXlmcmFtZXMgPSBudWxsXG4gIH0sXG4gIG9uVHlwZUVyciAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5oYXNLZXlmcmFtZXMgPSBmYWxzZVxuICB9XG59XVxuZXhwb3J0IGRlZmF1bHQgZmllbGRzXG4iLCJleHBvcnQgY29uc3QgTWV0YVR5cGVzID0ge1xuICBOVU1CRVI6IDAsXG4gIEJPT0xFQU46IDEsXG4gIFNUUklORzogMixcbiAgT0JKRUNUOiAzLFxuICBNSVhfQVJSQVk6IDgsXG4gIE9CSkVDVF9FTkQ6IDksXG4gIFNUUklDVF9BUlJBWTogMTAsXG4gIERBVEU6IDExLFxuICBMT05FX1NUUklORzogMTJcbn1cblxuZXhwb3J0IGNvbnN0IEV2ZW50VHlwZXMgPSB7XG4gIERBVEFfUkVBRFk6ICdkYXRhX3JlYWR5JyxcbiAgTUVUQV9EQVRBX1JFQURZOiAnbWV0YV9kYXRhX3JlYWR5JyxcbiAgVFJBQ0tfTUVUQV9SRUFEWTogJ3RyYWNrX21ldGFfcmVhZHknLFxuICBNRURJQV9JTkZPX1JFQURZOiAnbWVkaWFfaW5mb19yZWFkeScsXG4gIE1FVEFfRU5EX1BPU0lUSU9OOiAnbWV0YV9lbmRfcG9zaXRpb24nLFxuICBFUlJPUjogJ2Vycm9yJ1xufVxuXG5leHBvcnQgY29uc3Qgc291bmRSYXRlVHlwZXMgPSBbXG4gIDU1MDAsXG4gIDExMDAwLFxuICAyMjAwMCxcbiAgNDQwMFxuXVxuXG5leHBvcnQgY29uc3QgQXVkaW9PYmplY3RUeXBlcyA9IHtcbiAgMDogJ051bGwnLFxuICAxOiAnQUFDIE1haW4nLFxuICAyOiAnQUFDIExDJyxcbiAgMzogJ0FBQyBTU1IoU2NhbGFibGUgU2FtcGxlIFJhdGUpJyxcbiAgNDogJ0FBQyBMVFAoTG9uZyBUZXJtIFByZWRpY3Rpb24pJyxcbiAgNTogJ0hFLUFBQyAvIFNCUihTcGVjdHJhbCBCYW5kIFJlcGxpY2F0aW9uKScsXG4gIDY6ICdBQUMgU2NhbGFibGUnXG59XG5cbmV4cG9ydCBjb25zdCBzYW1wbGluZ0ZyZXF1ZW5jeVR5cGVzID0gW1xuICA5NjAwMCwgODgyMDAsXG4gIDY0MDAwLCA0ODAwMCxcbiAgNDQxMDAsIDMyMDAwLFxuICAyNDAwMCwgMjIwNTAsXG4gIDE2MDAwLCAxMjAwMCxcbiAgMTEwMjUsIDgwMDBcbl1cblxuZXhwb3J0IGNvbnN0IGJyb3dzZXJUeXBlcyA9IHtcbiAgSUU6ICdpZScsXG4gIEZJUkVfRk9YOiAnZmlyZWZveCcsXG4gIENIUk9NRTogJ2Nocm9tZScsXG4gIE9QRVJBOiAnb3BlcmEnLFxuICBTQUZBUkk6ICdzYWZhcmknXG59XG5cbmV4cG9ydCBjb25zdCBtcDNWZXJzaW9ucyA9IHtcbiAgVjI1OiAwLFxuICBSRVNFUlZFRDogMSxcbiAgVjIwOiAyLFxuICBWMTA6IDNcbn1cblxuZXhwb3J0IGNvbnN0IGF1ZGlvU2FtcGxlUmF0ZSA9IHtcbiAgVjEwOiBbNDQxMDAsIDQ4MDAwLCAzMjAwMCwgMF0sXG4gIFYyMDogWzIyMDUwLCAyNDAwMCwgMTYwMDAsIDBdLFxuICBWMjU6IFsxMTAyNSwgMTIwMDAsIDgwMDAsIDBdXG59XG5cbmV4cG9ydCBjb25zdCBtcDNCaXRSYXRlID0ge1xuICBMYXllcjE6IFswLCAzMiwgNjQsIDk2LCAxMjgsIDE2MCwgMTkyLCAyMjQsIDI1NiwgMjg4LCAzMjAsIDM1MiwgMzg0LCA0MTYsIDQ0OCwgLTFdLFxuICBMYXllcjI6IFswLCAzMiwgNDgsIDU2LCA2NCwgODAsIDk2LCAxMTIsIDEyOCwgMTYwLCAxOTIsIDIyNCwgMjU2LCAzMjAsIDM4NCwgLTFdLFxuICBMYXllcjM6IFswLCAzMiwgNDAsIDQ4LCA1NiwgNjQsIDgwLCA5NiwgMTEyLCAxMjgsIDE2MCwgMTkyLCAyMjQsIDI1NiwgMzIwLCAtMV1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5pbXBvcnQgVm9kVGFzayBmcm9tICcuL3Rhc2tzL1ZvZFRhc2snXG5pbXBvcnQgRmx2IGZyb20gJy4vRmx2J1xuXG5jbGFzcyBGbHZQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLl9fZmx2X18gPSBudWxsXG4gICAgdGhpcy5pbml0KG9wdGlvbnMpXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NyYycsIHtcbiAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLnN0YXJ0c1dpdGgoJ2Jsb2I6JykpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zLnVybCA9IHZhbFxuICAgICAgICB0aGlzLl9fZmx2X18uZGVzdHJveSgpXG4gICAgICAgIHRoaXMuX19mbHZfXyA9IG5ldyBGbHYodGhpcy5fb3B0aW9ucywgdGhpcylcbiAgICAgICAgdGhpcy5fX2Zsdl9fLmxvYWQoKVxuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHRoaXMuX19mbHZfXy5tc2UudXJsXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucGxheSgpXG4gICAgICAgIH0sIDApXG4gICAgICB9LFxuICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zLnVybFxuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG5cbiAgICBpZiAob3B0aW9ucy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5zdGFydCgpXG4gICAgfVxuICB9XG5cbiAgaW5pdCAob3B0aW9ucykge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXNcbiAgICBjb25zdCB7IGlzTGl2ZSB9ID0gb3B0aW9uc1xuICAgIHBsYXllci5fX2Zsdl9fID0gbmV3IEZsdihvcHRpb25zLCBwbGF5ZXIpXG4gICAgcGxheWVyLm9uY2UoJ2NvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgcGxheWVyLmNyZWF0ZUluc3RhbmNlKHBsYXllci5fX2Zsdl9fKVxuICAgIH0pXG4gICAgcGxheWVyLm9uKCdwYXVzZScsICgpID0+IHtcbiAgICAgICFpc0xpdmUgJiYgVm9kVGFzay5jbGVhcigpXG4gICAgfSlcbiAgICB0aGlzLm9uY2UoJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICBWb2RUYXNrLmNsZWFyKClcbiAgICAgIHBsYXllci5fX2Zsdl9fLmRlc3Ryb3koKVxuICAgICAgcGxheWVyLl9fZmx2X18ubXNlID0gbnVsbFxuICAgICAgcGxheWVyLnZpZGVvLnNyYyA9ICcnXG4gICAgICBwbGF5ZXIuX19mbHZfXyA9IG51bGxcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlSW5zdGFuY2UgKGZsdikge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXNcbiAgICBpZiAodGhpcy5fb3B0aW9ucy5pc0xpdmUpIHtcbiAgICAgIFBsYXllci51dGlsLmFkZENsYXNzKHBsYXllci5yb290LCAneGdwbGF5ZXItaXMtbGl2ZScpXG4gICAgICBjb25zdCBsaXZlID0gUGxheWVyLnV0aWwuY3JlYXRlRG9tKCd4Zy1saXZlJywgJ+ato+WcqOebtOaSrScsIHt9LCAneGdwbGF5ZXItbGl2ZScpXG4gICAgICBwbGF5ZXIuY29udHJvbHMuYXBwZW5kQ2hpbGQobGl2ZSlcbiAgICB9XG4gICAgZmx2LmxvYWQoKVxuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBmbHZQbGF5ZXIgPSB0aGlzLl9fZmx2X19cbiAgICBzdXBlci5zdGFydChmbHZQbGF5ZXIubXNlLnVybClcbiAgICB0aGlzLnNyYyA9IGZsdlBsYXllci5tc2UudXJsXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGdldCBpbml0ZWQgKCkge1xuICAgIHJldHVybiB0aGlzLl9fZmx2X18gIT09IHVuZGVmaW5lZFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmx2UGxheWVyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYUluZm8ge1xuICAgIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgICAgIGNvbnN0IF9kZWZhdWx0ID0ge1xuICAgICAgICAgICAgbWltZVR5cGU6IG51bGwsXG4gICAgICAgICAgICBjb2RlYzogJycsXG4gICAgICAgICAgICBkdXJhdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGhhc0F1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgIGhhc1ZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgIGF1ZGlvQ29kZWM6IG51bGwsXG4gICAgICAgICAgICB2aWRlb0NvZGVjOiBudWxsLFxuXG4gICAgICAgICAgICB2aWRlb0RhdGFSYXRlOiBudWxsLFxuICAgICAgICAgICAgYXVkaW9EYXRhUmF0ZTogbnVsbCxcbiAgICAgICAgICAgIGF1ZGlvU2FtcGxlUmF0ZTogbnVsbCxcbiAgICAgICAgICAgIGF1ZGlvQ2hhbm5lbENvdW50OiBudWxsLFxuICAgICAgICAgICAgYXVkaW9Db25maWc6IG51bGwsXG5cbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgZnBzOiBudWxsLFxuICAgICAgICAgICAgcHJvZmlsZTogbnVsbCxcbiAgICAgICAgICAgIGxldmVsOiBudWxsLFxuICAgICAgICAgICAgY2hyb21hRm9ybWF0OiBudWxsLFxuXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBbXSxcblxuICAgICAgICAgICAgX21ldGFEYXRhOiBudWxsLFxuICAgICAgICAgICAgc2VnbWVudHM6IFtdLFxuICAgICAgICAgICAgaGFzS2V5ZnJhbWVzOiBudWxsLFxuICAgICAgICAgICAga2V5ZnJhbWVzOiBbXSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBpbml0RGF0YSA9ICBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgZGF0YSk7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGluaXREYXRhKS5mb3JFYWNoKChbaywgdl0pPT4ge1xuICAgICAgICAgICAgdGhpc1trXSA9IHY7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGdldCBpc0NvbXBsZXRlICgpIHtcbiAgICAgICAgY29uc3QgeyBtaW1lVHlwZSwgZHVyYXRpb24sIGhhc0tleWZyYW1lcyB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG1pbWVUeXBlICE9PSBudWxsXG4gICAgICAgICAgICAmJiBkdXJhdGlvbiAhPT0gbnVsbFxuICAgICAgICAgICAgJiYgaGFzS2V5ZnJhbWVzICE9PSBudWxsXG4gICAgICAgICAgICAmJiB0aGlzLmlzVmlkZW9JbmZvRmlsbGVkXG4gICAgICAgICAgICAmJiB0aGlzLmlzQXVkaW9JbmZvRmlsbGVkO1xuICAgIH1cbiAgICBnZXQgaXNBdWRpb0luZm9GaWxsZWQgKCkge1xuICAgICAgICBjb25zdCB7IGhhc0F1ZGlvLFxuICAgICAgICAgICAgYXVkaW9Db2RlYyxcbiAgICAgICAgICAgIGF1ZGlvU2FtcGxlUmF0ZSxcbiAgICAgICAgICAgIGF1ZGlvQ2hhbm5lbENvdW50LFxuICAgICAgICB9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gISEoIWhhc0F1ZGlvIHx8IChoYXNBdWRpbyAmJiBhdWRpb0NvZGVjICYmIGF1ZGlvU2FtcGxlUmF0ZSAmJiBhdWRpb0NoYW5uZWxDb3VudCkpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlzVmlkZW9JbmZvRmlsbGVkICgpIHtcbiAgICAgICAgY29uc3Qgbm90TnVsbEZpZWxkcyA9IFtcbiAgICAgICAgICAgICd2aWRlb0NvZGVjJyxcbiAgICAgICAgICAgICd3aWR0aCcsXG4gICAgICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgICAgICdmcHMnLFxuICAgICAgICAgICAgJ3Byb2ZpbGUnLFxuICAgICAgICAgICAgJ2xldmVsJyxcbiAgICAgICAgICAgICdjaHJvbWFGb3JtYXQnLFxuICAgICAgICBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbm90TnVsbEZpZWxkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXNbbm90TnVsbEZpZWxkc1tpXV0gPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5oYXNWaWRlbztcbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNhbXBsZSB7XG4gICAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICAgICAgbGV0IF9kZWZhdWx0ID0gTWVkaWFTYW1wbGUuZ2V0RGVmYXVsdEluZigpO1xuXG4gICAgICAgIGlmICghaW5mbyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5mbykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gX2RlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKTtcblxuICAgICAgICBPYmplY3QuZW50cmllcyhzYW1wbGUpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgICAgICAgdGhpc1trXSA9IHY7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGdldERlZmF1bHRJbmYgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZHRzOiBudWxsLFxuICAgICAgICAgICAgcHRzOiBudWxsLFxuICAgICAgICAgICAgZHVyYXRpb246IG51bGwsXG4gICAgICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGlzUkFQOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgICAgICAgb3JpZ2luRHRzOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxufVxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5zdGFydER0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZER0cyA9IC0xO1xuICAgICAgICB0aGlzLnN0YXJ0UHRzID0gLTE7XG4gICAgICAgIHRoaXMuZW5kUHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luU3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5vcmlnaW5FbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5maXJzdFNhbXBsZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdFNhbXBsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgYWRkUkFQIChzYW1wbGUpIHtcbiAgICAgICAgc2FtcGxlLmlzUkFQID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMucHVzaChzYW1wbGUpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnRMaXN0IHtcblxuICAgIGNvbnN0cnVjdG9yICh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9saXN0ID0gW107XG4gICAgICAgIHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbiA9IC0xOyAvLyBjYWNoZWQgbGFzdCBpbnNlcnQgbG9jYXRpb25cbiAgICB9XG5cbiAgICBnZXQgdHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNFbXB0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0yO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgbWlkID0gMDtcbiAgICAgICAgbGV0IGxib3VuZCA9IDA7XG4gICAgICAgIGxldCB1Ym91bmQgPSBsYXN0O1xuXG4gICAgICAgIGxldCBpZHggPSAwO1xuXG4gICAgICAgIGlmIChiZWdpbkR0cyA8IGxpc3RbMF0ub3JpZ2luRHRzKSB7XG4gICAgICAgICAgICBpZHggPSAtMTtcbiAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAobGJvdW5kIDw9IHVib3VuZCkge1xuICAgICAgICAgICAgbWlkID0gbGJvdW5kICsgTWF0aC5mbG9vcigodWJvdW5kIC0gbGJvdW5kKSAvIDIpO1xuICAgICAgICAgICAgaWYgKG1pZCA9PT0gbGFzdCB8fCAoYmVnaW5EdHMgPiBsaXN0W21pZF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICAgICAgICAgJiYgKGJlZ2luRHRzIDwgbGlzdFttaWQgKyAxXS5vcmlnaW5EdHMpKSkge1xuICAgICAgICAgICAgICAgIGlkeCA9IG1pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdFttaWRdLm9yaWdpbkR0cyA8IGJlZ2luRHRzKSB7XG4gICAgICAgICAgICAgICAgbGJvdW5kID0gbWlkICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWJvdW5kID0gbWlkIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cblxuICAgIF9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIChiZWdpbkR0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpICsgMTtcbiAgICB9XG5cbiAgICBhcHBlbmQgKHNlZ21lbnQpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9saXN0O1xuICAgICAgICBsZXQgbGFzdEFwcGVuZElkeCA9IHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbjtcbiAgICAgICAgbGV0IGluc2VydElkeCA9IDA7XG5cbiAgICAgICAgaWYgKGxhc3RBcHBlbmRJZHggIT09IC0xICYmIGxhc3RBcHBlbmRJZHggPCBsaXN0Lmxlbmd0aFxuICAgICAgICAgICAgJiYgc2VnbWVudC5vcmlnaW5TdGFydER0cyA+PSBsaXN0W2xhc3RBcHBlbmRJZHhdLmxhc3RTYW1wbGUub3JpZ2luRHRzXG4gICAgICAgICAgICAmJiAoKGxhc3RBcHBlbmRJZHggPT09IGxpc3QubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICB8fCAobGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzIDwgbGlzdFtsYXN0QXBwZW5kSWR4ICsgMV0ub3JpZ2luU3RhcnREdHMpKSkge1xuICAgICAgICAgICAgaW5zZXJ0SWR4ID0gbGFzdEFwcGVuZElkeCArIDE7IC8vIHVzZSBjYWNoZWQgbG9jYXRpb24gaWR4XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoc2VnbWVudC5vcmlnaW5TdGFydER0cykgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gaW5zZXJ0SWR4O1xuICAgICAgICB0aGlzLl9saXN0LnNwbGljZShpbnNlcnRJZHgsIDAsIHNlZ21lbnQpO1xuICAgIH1cblxuICAgIGdldExhc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W2lkeF07XG4gICAgICAgIH0gZWxzZSB7IC8vIC0xXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RTYW1wbGVCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5nZXRMYXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChzZWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VnbWVudC5sYXN0U2FtcGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXN0UkFQQmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgc2VnbWVudElkeCA9IHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgbGV0IHJhbmRvbUFjY2Vzc1BvaW50cyA9IHRoaXMuX2xpc3Rbc2VnbWVudElkeF0ucmFuZG9tQWNjZXNzUG9pbnRzO1xuICAgICAgICB3aGlsZSAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA9PT0gMCAmJiBzZWdtZW50SWR4ID4gMCkge1xuICAgICAgICAgICAgc2VnbWVudElkeC0tO1xuICAgICAgICAgICAgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tQWNjZXNzUG9pbnRzW3JhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IE1lZGlhSW5mbyBmcm9tICcuL01lZGlhSW5mbydcbmltcG9ydCBzbmlmZmVyIGZyb20gJy4uL3V0aWxzL3NuaWZmZXInXG5jbGFzcyBTdG9yZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcblxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzTGU6IHNuaWZmZXIuaXNMZSxcbiAgICAgIF9oYXNBdWRpbzogZmFsc2UsXG4gICAgICBfaGFzVmlkZW86IGZhbHNlLFxuICAgICAgX21lZGlhSW5mbzogbmV3IE1lZGlhSW5mbygpLFxuICAgICAgX21ldGFEYXRhOiBudWxsLFxuICAgICAgX3ZpZGVvVHJhY2s6IHt0eXBlOiAndmlkZW8nLCBpZDogMSwgc2FtcGxlczogW10sIGxlbmd0aDogMH0sXG4gICAgICBfYXVkaW9UcmFjazoge3R5cGU6ICdhdWRpbycsIGlkOiAyLCBzYW1wbGVzOiBbXSwgbGVuZ3RoOiAwfSxcbiAgICAgIF92aWRlb01ldGFEYXRhOiBudWxsLFxuICAgICAgX2F1ZGlvTWV0YURhdGE6IG51bGwsXG4gICAgICBfYXVkaW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkOiBmYWxzZSxcbiAgICAgIF92aWRlb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQ6IGZhbHNlLFxuICAgICAgdGFnczogW10sXG4gICAgICB0aW1lU3RhbXBCYXNlOiAwLFxuICAgICAgaGFzVmlkZW9GbGFnT3ZlcnJpZGVkOiBmYWxzZSxcbiAgICAgIGhhc0F1ZGlvRmxhZ092ZXJyaWRlZDogZmFsc2UsXG4gICAgICB0aW1lU2NhbGU6IDEwMDAsXG4gICAgICBkdXJhdGlvbjogMCxcbiAgICAgIGlzTGl2ZTogZmFsc2UsXG4gICAgICBkdXJhdGlvbk92ZXJyaWRlZDogZmFsc2UsXG4gICAgICBuYWx1TGVuZ3RoU2l6ZTogNCxcbiAgICAgIF9yZWZlckZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyMy45NzYsXG4gICAgICAgIGZwc051bTogMjM5NzYsXG4gICAgICAgIGZwc0RlbjogMTAwMFxuICAgICAgfSxcbiAgICAgIG1ldGFFbmRQb3NpdGlvbjogLTFcbiAgICB9XG5cbiAgICB0aGlzLm1ldGhvZHMgPSB7XG4gICAgICBfaXNJbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBfaGFzQXVkaW8sXG4gICAgICAgICAgX2hhc1ZpZGVvLFxuICAgICAgICAgIF9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQsXG4gICAgICAgICAgX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgICAgICB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICBpZiAoX2hhc0F1ZGlvICYmIF9oYXNWaWRlbykgeyAvLyBib3RoIGF1ZGlvICYgdmlkZW9cbiAgICAgICAgICByZXR1cm4gX2F1ZGlvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZCAmJiBfdmlkZW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkXG4gICAgICAgIH1cbiAgICAgICAgaWYgKF9oYXNBdWRpbyAmJiAhX2hhc1ZpZGVvKSB7IC8vIGF1ZGlvIG9ubHlcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYXVkaW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFfaGFzQXVkaW8gJiYgX2hhc1ZpZGVvKSB7IC8vIHZpZGVvIG9ubHlcbiAgICAgICAgICByZXR1cm4gX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgY2xlYXJUYWdzICgpIHtcbiAgICB0aGlzLnN0YXRlLnRhZ3MgPSBbXVxuICB9XG4gIGdldCByZWZlckZyYW1lUmF0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX3JlZmVyRnJhbWVSYXRlXG4gIH1cblxuICBzZXQgcmVmZXJGcmFtZVJhdGUgKHZhbCkge1xuICAgIHRoaXMuc3RhdGUuX3JlZmVyRnJhbWVSYXRlID0gdmFsXG4gIH1cblxuICBzZXQgbWVkaWFJbmZvIChtZWRpYUluZm8pIHtcbiAgICB0aGlzLnN0YXRlLl9tZWRpYUluZm8gPSBtZWRpYUluZm9cbiAgfVxuXG4gIGdldCBtZWRpYUluZm8gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZWRpYUluZm9cbiAgfVxuXG4gIGdldCBtZXRhRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX21ldGFEYXRhXG4gIH1cblxuICBnZXQgaGFzTWV0YURhdGEgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZXRhRGF0YSAhPT0gbnVsbFxuICB9XG5cbiAgc2V0IG1ldGFEYXRhICh2KSB7XG4gICAgdGhpcy5zdGF0ZS5fbWV0YURhdGEgPSB2XG4gIH1cblxuICBzZXQgYXVkaW9UcmFjayAodmFsKSB7XG4gICAgdGhpcy5zdGF0ZS5fYXVkaW9UcmFjayA9IHZhbFxuICB9XG5cbiAgZ2V0IGF1ZGlvVHJhY2sgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9hdWRpb1RyYWNrXG4gIH1cblxuICBzZXQgdmlkZW9UcmFjayAodmFsKSB7XG4gICAgdGhpcy5zdGF0ZS5fdmlkZW9UcmFjayA9IHZhbFxuICB9XG5cbiAgZ2V0IHZpZGVvVHJhY2sgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl92aWRlb1RyYWNrXG4gIH1cblxuICBzZXQgaGFzQXVkaW8gKHZhbCkge1xuICAgIHRoaXMuc3RhdGUuX2hhc0F1ZGlvID0gdmFsXG4gICAgdGhpcy5zdGF0ZS5fbWVkaWFJbmZvLmhhc0F1ZGlvID0gdmFsXG4gIH1cblxuICBnZXQgaGFzQXVkaW8gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9oYXNBdWRpb1xuICB9XG5cbiAgc2V0IGhhc1ZpZGVvICh2YWwpIHtcbiAgICB0aGlzLnN0YXRlLl9oYXNWaWRlbyA9IHZhbFxuICAgIHRoaXMuc3RhdGUuX21lZGlhSW5mby5oYXNWaWRlbyA9IHZhbFxuICB9XG5cbiAgZ2V0IGhhc1ZpZGVvICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5faGFzVmlkZW9cbiAgfVxuXG4gIHNldCB2aWRlb01ldGFEYXRhICh2YWwpIHtcbiAgICB0aGlzLnN0YXRlLl92aWRlb01ldGFEYXRhID0gdmFsXG4gIH1cblxuICBnZXQgdmlkZW9NZXRhRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX3ZpZGVvTWV0YURhdGFcbiAgfVxuXG4gIHNldCBhdWRpb01ldGFEYXRhICh2YWwpIHtcbiAgICB0aGlzLnN0YXRlLl9hdWRpb01ldGFEYXRhID0gdmFsXG4gIH1cblxuICBnZXQgYXVkaW9NZXRhRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX2F1ZGlvTWV0YURhdGFcbiAgfVxuXG4gIGdldCBrZXlmcmFtZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZWRpYUluZm8ua2V5ZnJhbWVzXG4gIH1cbiAgZ2V0IGlzU2Vla2FibGUgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZWRpYUluZm8uaGFzS2V5ZnJhbWVzXG4gIH1cblxuICBnZXQgaXNMZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNMZVxuICB9XG4gIGdldCBoYXNJbml0aWFsTWV0YURpc3BhdGNoZWQgKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIF9oYXNBdWRpbyxcbiAgICAgIF9oYXNWaWRlbyxcbiAgICAgIF9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQsXG4gICAgICBfdmlkZW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkXG4gICAgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAoX2hhc0F1ZGlvICYmIF9oYXNWaWRlbykge1xuICAgICAgcmV0dXJuIF9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQgJiYgX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgIH1cbiAgICBpZiAoX2hhc0F1ZGlvICYmICFfaGFzVmlkZW8pIHtcbiAgICAgIHJldHVybiB0aGlzLl9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWRcbiAgICB9XG4gICAgaWYgKCFfaGFzQXVkaW8gJiYgX2hhc1ZpZGVvKSB7XG4gICAgICByZXR1cm4gX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldCB2aWRlb1RpbWVTY2FsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUudGltZVNjYWxlXG4gIH1cblxuICBnZXQgbWV0YUVuZFBvc2l0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tZXRhRW5kUG9zaXRpb25cbiAgfVxuXG4gIHNldCBtZXRhRW5kUG9zaXRpb24gKHBvcykge1xuICAgIHRoaXMuc3RhdGUubWV0YUVuZFBvc2l0aW9uID0gcG9zXG4gIH1cblxuICBnZXQgaXNMaXZlICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pc0xpdmVcbiAgfVxuXG4gIHNldCBpc0xpdmUgKHZhbCkge1xuICAgIHRoaXMuc3RhdGUuaXNMaXZlID0gdmFsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmVcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsdlRhZyB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLnRhZ1R5cGUgPSAtMTtcbiAgICAgICAgdGhpcy5ib2R5U2l6ZSA9IC0xO1xuICAgICAgICB0aGlzLnRhZ1NpemUgPSAtMTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IC0xO1xuICAgICAgICB0aGlzLlRpbWVzdGFtcCA9IC0xO1xuICAgICAgICB0aGlzLlN0cmVhbUlEID0gLTE7XG4gICAgICAgIHRoaXMuYm9keSA9IC0xO1xuICAgICAgICB0aGlzLnRpbWUgPSAtMTtcbiAgICAgICAgdGhpcy5hcnIgPSBbXTtcbiAgICB9XG5cbiAgICBnZXRUaW1lICgpIHtcbiAgICAgICAgdGhpcy5hcnIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlRpbWVzdGFtcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5hcnIucHVzaCgodGhpcy5UaW1lc3RhbXBbaV0udG9TdHJpbmcoMTYpLmxlbmd0aCA9PT0gMSA/ICcwJyArIHRoaXMuVGltZXN0YW1wW2ldLnRvU3RyaW5nKDE2KSA6IHRoaXMuVGltZXN0YW1wW2ldLnRvU3RyaW5nKDE2KSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJyLnBvcCgpO1xuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5hcnIuam9pbignJyk7XG4gICAgICAgIHRoaXMudGltZSA9IHBhcnNlSW50KHRpbWUsIDE2KTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRpbWUsIDE2KTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuY29uc3QgRXJyb3JUeXBlcyA9IHtcbiAgbmV0d29yazoge1xuICAgIGNvZGU6IDEsXG4gICAgbXNnOiAn6KeG6aKR5LiL6L296ZSZ6K+vJyxcbiAgICByZW1hcms6ICflj6ropoHop4bpopHkuIvovb3plJnor6/lsLHkvb/nlKjmraTnsbvlnovvvIzml6DorrrmmK92aWRlb+acrOi6q+eahOi2heaXtui/mOaYr3hocueahOWIhuauteivt+axgui2heaXtuaIluiAhei1hOa6kOS4jeWtmOWcqCdcbiAgfSxcbiAgbXNlOiB7XG4gICAgY29kZTogMixcbiAgICBtc2c6ICfmtYHov73liqDplJnor68nLFxuICAgIHJlbWFyazogJ+i/veWKoOa1geeahOaXtuWAmeWmguaenOexu+Wei+S4jeWvueOAgeaXoOazleiiq+ato+ehruino+eggeWImeS8muinpuWPkeatpOexu+mUmeivrydcbiAgfSxcbiAgcGFyc2U6IHtcbiAgICBjb2RlOiAzLFxuICAgIG1zZzogJ+ino+aekOmUmeivrycsXG4gICAgcmVtYXJrOiAnbXA044CBaGxz44CBZmx25oiR5Lus6YO95piv5L2/55SoanPov5vooYzmoLzlvI/op6PmnpDvvIzlpoLmnpzop6PmnpDlpLHotKXliJnkvJrop6blj5HmraTnsbvplJnor68nXG4gIH0sXG4gIGZvcm1hdDoge1xuICAgIGNvZGU6IDQsXG4gICAgbXNnOiAn5qC85byP6ZSZ6K+vJyxcbiAgICByZW1hcms6ICflpoLmnpzmtY/op4jlmajkuI3mlK/mjIHnmoTmoLzlvI/lr7zoh7Tmkq3mlL7plJnor68nXG4gIH0sXG4gIGRlY29kZXI6IHtcbiAgICBjb2RlOiA1LFxuICAgIG1zZzogJ+ino+eggemUmeivrycsXG4gICAgcmVtYXJrOiAn5rWP6KeI5Zmo6Kej56CB5byC5bi45Lya5oqb5Ye65q2k57G75Z6L6ZSZ6K+vJ1xuICB9LFxuICBydW50aW1lOiB7XG4gICAgY29kZTogNixcbiAgICBtc2c6ICfor63ms5XplJnor68nLFxuICAgIHJlbWFyazogJ+aSreaUvuWZqOivreazlemUmeivrydcbiAgfSxcbiAgdGltZW91dDoge1xuICAgIGNvZGU6IDcsXG4gICAgbXNnOiAn5pKt5pS+6LaF5pe2JyxcbiAgICByZW1hcms6ICfmkq3mlL7ov4fnqIvkuK3ml6Dms5XmraPluLjor7fmsYLkuIvkuIDkuKrliIbmrrXlr7zoh7Tmkq3mlL7kuK3mlq0nXG4gIH0sXG4gIG90aGVyOiB7XG4gICAgY29kZTogOCxcbiAgICBtc2c6ICflhbbku5bplJnor68nLFxuICAgIHJlbWFyazogJ+S4jeWPr+efpeeahOmUmeivr+aIluiiq+W/veeVpeeahOmUmeivr+exu+WeiydcbiAgfVxufVxuXG5jbGFzcyBFcnJvcnMge1xuICBjb25zdHJ1Y3RvciAodHlwZSwgY3VycmVudFRpbWUsIGR1cmF0aW9uLCBuZXR3b3JrU3RhdGUsIHJlYWR5U3RhdGUsIHNyYywgY3VycmVudFNyYyxcbiAgICBlbmRlZCwgZXJyZCA9IHtsaW5lOiAnJywgaGFuZGxlOiAnJywgbXNnOiAnJywgdmVyc2lvbjogJyd9KSB7XG4gICAgbGV0IHIgPSB7fVxuICAgIHIucGxheWVyVmVyc2lvbiA9IHZlcnNpb24gLy8g5pKt5pS+5Zmo54mI5pysXG4gICAgci5lcnJvclR5cGUgPSB0eXBlXG4gICAgci5kb21haW4gPSBkb2N1bWVudC5kb21haW4gLy8gZG9tYWluXG4gICAgci5kdXJhdGlvbiA9IGR1cmF0aW9uIC8vIOinhumikeaXtumVv1xuICAgIHIuY3VycmVudFRpbWUgPSBjdXJyZW50VGltZVxuICAgIHIubmV0d29ya1N0YXRlID0gbmV0d29ya1N0YXRlXG4gICAgci5yZWFkeVN0YXRlID0gcmVhZHlTdGF0ZVxuICAgIHIuY3VycmVudFNyYyA9IGN1cnJlbnRTcmNcbiAgICByLnNyYyA9IHNyY1xuICAgIHIuZW5kZWQgPSBlbmRlZFxuICAgIHIuZXJyZCA9IGVycmQgLy8g6ZSZ6K+v6K+m5oOFXG4gICAgci5leCA9IChFcnJvclR5cGVzW3R5cGVdIHx8IHt9KS5tc2cgLy8g6KGl5YWF5L+h5oGvXG4gICAgcmV0dXJuIHJcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvcnNcbiIsImltcG9ydCBEZW11eGVyIGZyb20gJy4vZGVtdXgvRGVtdXhlcidcbmltcG9ydCBCdWZmZXIgZnJvbSAnLi4vd3JpdGUvQnVmZmVyJ1xuaW1wb3J0IFRhZyBmcm9tICcuLi9tb2RlbHMvVGFnJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHZQYXJzZXIgZXh0ZW5kcyBEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgc3VwZXIoc3RvcmUpXG4gICAgdGhpcy5DTEFTU19OQU1FID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgdGhpcy50ZW1wX3U4YSA9IG51bGxcbiAgICB0aGlzLmRhdGFMZW4gPSAwXG4gICAgdGhpcy5zdG9wID0gZmFsc2VcbiAgICB0aGlzLmluZGV4ID0gMCAvLyByZWNvcmQgdGhlIHBvc2l0aW9uIGluIHNpbmdsZSByb3VuZFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMuZmlsZVBvc2l0aW9uID0gMCAvLyByZWNvcmQgY3VycmVudCBmaWxlIHBvc2l0aW9uXG4gICAgdGhpcy5maXJzdEZsYWcgPSB0cnVlXG4gIH1cblxuICBzZWVrICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMudGVtcF91OGEgPSBudWxsXG4gICAgdGhpcy5kYXRhTGVuID0gMFxuICAgIHRoaXMuc3RvcCA9IGZhbHNlXG4gICAgdGhpcy5pbmRleCA9IDAgLy8gcmVjb3JkIHRoZSBwb3NpdGlvbiBpbiBzaW5nbGUgcm91bmRcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLmZpbGVQb3NpdGlvbiA9IDBcbiAgfVxuXG4gIHNldEZsdiAoZmx2VThhKSB7XG4gICAgdGhpcy5zdG9wID0gZmFsc2VcbiAgICB0aGlzLmluZGV4ID0gMFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIGNvbnN0IHRlbXBVOGEgPSB0aGlzLnRlbXBfdThhID0gZmx2VThhXG4gICAgdGhpcy5kYXRhTGVuID0gdGhpcy50ZW1wX3U4YS5sZW5ndGhcblxuICAgIGlmICghdGhpcy5maXJzdEZsYWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlRGF0YSgpXG4gICAgfSBlbHNlIGlmICh0ZW1wVThhLmxlbmd0aCA+IDEzICYmIEZsdlBhcnNlci5pc0ZsdkhlYWQodGVtcFU4YSkpIHtcbiAgICAgIHRoaXMucGFyc2VIZWFkKClcbiAgICAgIHRoaXMucmVhZERhdGEoOSkgLy8g6Lez6L+H5aS06YOoXG4gICAgICB0aGlzLnJlYWREYXRhKDQpIC8vIOi3s+i/h+S4i+S4gOS4quiusOW9leWktOmDqHNpemXnmoQgaW50MzJcbiAgICAgIHRoaXMucGFyc2VEYXRhKClcbiAgICAgIHRoaXMuZmlyc3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuZmlsZVBvc2l0aW9uICs9IHRoaXMub2Zmc2V0XG4gICAgICByZXR1cm4gdGhpcy5vZmZzZXRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0XG4gICAgfVxuICB9XG5cbiAgcGFyc2VEYXRhICgpIHtcbiAgICBjb25zdCB7bGVuZ3RoOiB1OGFMZW5ndGh9ID0gdGhpcy50ZW1wX3U4YVxuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdThhTGVuZ3RoICYmICF0aGlzLnN0b3ApIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5pbmRleFxuICAgICAgY29uc3QgdGFnID0gbmV3IFRhZygpXG4gICAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPj0gMTEpIHtcbiAgICAgICAgLy8g5Y+v5Lul6K+75Ye65aS06YOo5L+h5oGvXG4gICAgICAgIHRhZy5wb3NpdGlvbiA9IHRoaXMuZmlsZVBvc2l0aW9uICsgdGhpcy5vZmZzZXRcbiAgICAgICAgdGFnLnRhZ1R5cGUgPSB0aGlzLnJlYWREYXRhKDEpWzBdXG4gICAgICAgIHRhZy5ib2R5U2l6ZSA9IHRoaXMucmVhZERhdGEoMylcbiAgICAgICAgdGFnLlRpbWVzdGFtcCA9IHRoaXMucmVhZERhdGEoNClcbiAgICAgICAgdGFnLlN0cmFtSWQgPSB0aGlzLnJlYWREYXRhKDMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0b3AgPSB0cnVlXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPj0gdGhpcy5nZXRCb2R5U2l6ZSh0YWcuYm9keVNpemUpICsgNCkge1xuICAgICAgICB0YWcuYm9keSA9IHRoaXMucmVhZERhdGEodGhpcy5nZXRCb2R5U2l6ZSh0YWcuYm9keVNpemUpKVxuICAgICAgICB0YWcudGFnU2l6ZSA9IHRoaXMucmVhZERhdGEoNClcbiAgICAgICAgY29uc3Qge3RhZ3MsIF9oYXNWaWRlbywgX2hhc0F1ZGlvfSA9IHRoaXMuX3N0b3JlLnN0YXRlXG4gICAgICAgIHN3aXRjaCAodGFnLnRhZ1R5cGUpIHtcbiAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBfaGFzVmlkZW8gJiYgdGFncy5wdXNoKHRhZylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgX2hhc0F1ZGlvICYmIHRhZ3MucHVzaCh0YWcpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTg6XG4gICAgICAgICAgICB0YWdzLnB1c2godGFnKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9wID0gdHJ1ZVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMuaW5kZXhcbiAgICB9XG4gICAgdGhpcy5maWxlUG9zaXRpb24gKz0gdGhpcy5vZmZzZXRcbiAgICB0aGlzLnRlbXBfdThhID0gbnVsbFxuICAgIHJldHVybiB0aGlzLm9mZnNldFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBzaXplQXJyXG4gICAqIEByZXR1cm5cbiAgICovXG4gIGdldEJvZHlTaXplIChzaXplQXJyKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5yZWFkQXNJbnQoc2l6ZUFycilcbiAgfVxuXG4gIHBhcnNlSGVhZCAoKSB7XG4gICAgY29uc3Qge3RlbXBfdThhOiB0ZW1wVThhLCBfc3RvcmV9ID0gdGhpc1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIG1hdGNoOiBmYWxzZVxuICAgIH1cbiAgICBpZiAodGVtcFU4YVszXSAhPT0gMSkge1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgICBjb25zdCBmbGFnID0gdGVtcFU4YVs0XVxuICAgIGNvbnN0IGhhc0F1ZGlvID0gKChmbGFnICYgNCkgPj4+IDIpICE9PSAwXG4gICAgY29uc3QgaGFzVmlkZW8gPSAoZmxhZyAmIDEpICE9PSAwXG5cbiAgICBpZiAoIWhhc0F1ZGlvICYmICFoYXNWaWRlbykge1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIF9zdG9yZS5oYXNBdWRpbyA9IGhhc0F1ZGlvXG4gICAgX3N0b3JlLmhhc1ZpZGVvID0gaGFzVmlkZW9cbiAgfVxuXG4gIHJlYWREYXRhIChsZW5ndGgpIHtcbiAgICBjb25zdCBfaW5kZXggPSB0aGlzLmluZGV4XG4gICAgdGhpcy5pbmRleCArPSBsZW5ndGhcbiAgICByZXR1cm4gdGhpcy50ZW1wX3U4YS5zbGljZShfaW5kZXgsIF9pbmRleCArIGxlbmd0aClcbiAgfVxuXG4gIGdldCB1bnJlYWRMZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFMZW4gLSB0aGlzLmluZGV4XG4gIH1cblxuICBzdGF0aWMgaXNGbHZIZWFkICh0ZW1wVThhKSB7XG4gICAgbGV0IGZpcnN0VGhyZWVDaGFycyA9IFt0ZW1wVThhWzBdLCB0ZW1wVThhWzFdLCB0ZW1wVThhWzJdXVxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgZmlyc3RUaHJlZUNoYXJzKSA9PT0gJ0ZMVidcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudC1lbWl0dGVyJ1xubGV0IGNvdW50ID0gMFxuY2xhc3MgTVNFIHtcbiAgY29uc3RydWN0b3IgKGNvZGVjcyA9ICd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNjQwMDFFLCBtcDRhLjQwLjVcIicpIHtcbiAgICB0aGlzLmNvdW50ID0gY291bnQrK1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIEV2ZW50RW1pdHRlcih0aGlzKVxuICAgIHRoaXMuY29kZWNzID0gY29kZWNzXG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG5ldyB3aW5kb3cuTWVkaWFTb3VyY2UoKVxuICAgIHRoaXMudXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5tZWRpYVNvdXJjZSlcblxuICAgIHRoaXMuaGFuZGxlU291cmNlT3BlbiA9IHRoaXMub25Tb3VyY2VPcGVuLmJpbmQodGhpcylcbiAgICB0aGlzLm1lZGlhU291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdXJjZW9wZW4nLCB0aGlzLmhhbmRsZVNvdXJjZU9wZW4pXG5cbiAgICB0aGlzLm1lZGlhU291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdXJjZWNsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5lbWl0KCdzb3VyY2VjbG9zZScpXG4gICAgfSlcbiAgfVxuXG4gIG9uU291cmNlT3BlbiAoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICBzZWxmLnNvdXJjZUJ1ZmZlciA9IHNlbGYubWVkaWFTb3VyY2UuYWRkU291cmNlQnVmZmVyKHNlbGYuY29kZWNzKVxuICAgIHNlbGYuc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCB7XG4gICAgICAgIHR5cGU6ICdzb3VyY2VCdWZmZXInLFxuICAgICAgICBlcnJvcjogZVxuICAgICAgfSlcbiAgICB9KVxuICAgIHNlbGYuc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBzZWxmLmVtaXQoJ3VwZGF0ZWVuZCcpXG4gICAgfSlcbiAgICBzZWxmLmVtaXQoJ3NvdXJjZW9wZW4nKVxuICAgIHNlbGYuc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCB7XG4gICAgICAgIHR5cGU6ICdtZWRpYVNvdXJjZScsXG4gICAgICAgIGVycm9yOiBlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgZ2V0IHN0YXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYVNvdXJjZS5yZWFkeVN0YXRlXG4gIH1cblxuICBnZXQgZHVyYXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1lZGlhU291cmNlLmR1cmF0aW9uXG4gIH1cblxuICBzZXQgZHVyYXRpb24gKHZhbHVlKSB7XG4gICAgdGhpcy5tZWRpYVNvdXJjZS5kdXJhdGlvbiA9IHZhbHVlXG4gIH1cblxuICBhcHBlbmRCdWZmZXIgKGJ1ZmZlcikge1xuICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlclxuICAgIGlmIChzb3VyY2VCdWZmZXIudXBkYXRpbmcgPT09IGZhbHNlICYmIHRoaXMuc3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgc291cmNlQnVmZmVyLmFwcGVuZEJ1ZmZlcihidWZmZXIpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIHtcbiAgICAgICAgICB0eXBlOiAnc291cmNlQnVmZmVyJyxcbiAgICAgICAgICBlcnJvcjogbmV3IEVycm9yKCdtZWRpYVNvdXJjZSBpcyBub3QgYXR0YWNoZWQgdG8gdmlkZW8gb3IgbWVkaWFTb3VyY2UgaXMgY2xvc2VkJylcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gJ2VuZGVkJykge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywge1xuICAgICAgICAgIHR5cGU6ICdzb3VyY2VCdWZmZXInLFxuICAgICAgICAgIGVycm9yOiBuZXcgRXJyb3IoJ21lZGlhU291cmNlIGlzIGNsb3NlZCcpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc291cmNlQnVmZmVyLnVwZGF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KCd3YXJuJywge1xuICAgICAgICAgICAgdHlwZTogJ3NvdXJjZUJ1ZmZlcicsXG4gICAgICAgICAgICBlcnJvcjogbmV3IEVycm9yKCdtZWRpYVNvdXJjZSBpcyBidXN5JylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIC8vIHRoaXMubWVkaWFTb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMuaGFuZGxlU291cmNlT3BlbilcbiAgICB0aGlzLl9fZWVfXyA9IHt9XG4gICAgLy8gdGhpcy5tZWRpYVNvdXJjZSA9IG51bGxcbiAgICAvLyB0aGlzLmVuZE9mU3RyZWFtKClcbiAgfVxuICByZW1vdmVCdWZmZXIgKHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLnNvdXJjZUJ1ZmZlci5yZW1vdmUoc3RhcnQsIGVuZClcbiAgfVxuXG4gIGVuZE9mU3RyZWFtICgpIHtcbiAgICBpZiAodGhpcy5tZWRpYVNvdXJjZS5yZWFkeVN0YXRlID09PSAnb3BlbicpIHtcbiAgICAgIHRoaXMubWVkaWFTb3VyY2UuZW5kT2ZTdHJlYW0oKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpc1N1cHBvcnRlZCAoY29kZWNzKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSAmJiB3aW5kb3cuTWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKGNvZGVjcylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNU0VcbiIsImltcG9ydCBNcDRSZW11eGVyIGZyb20gJy4vcmVtdXgvTXA0cmVtdXgnXG5pbXBvcnQgRmx2UGFyc2VyIGZyb20gJy4vRmx2UGFyc2VyJ1xuaW1wb3J0IFRhZ0RlbXV4ZXIgZnJvbSAnLi9kZW11eC9UYWdEZW11eGVyJ1xuaW1wb3J0IFN0b3JlIGZyb20gJy4uL21vZGVscy9TdG9yZSdcbmltcG9ydCBWb2RUYXNrIGZyb20gJy4uL3Rhc2tzL1ZvZFRhc2snXG5pbXBvcnQgTGl2ZVRhc2sgZnJvbSAnLi4vdGFza3MvTGl2ZVRhc2snXG5pbXBvcnQgQnVmZmVyIGZyb20gJy4uL3dyaXRlL0J1ZmZlcidcbmltcG9ydCBUcmFuc0NvZGVyIGZyb20gJy4vVHJhbnNDb2RlcidcblxuY29uc3QgTk9PUCA9ICgpID0+IHt9XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluUGFyc2VyIGV4dGVuZHMgVHJhbnNDb2RlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcsIHBsYXllcikge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLkNMQVNTX05BTUUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWdcbiAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLl90ZW1wQmFzZVRpbWUgPSAwXG4gICAgdGhpcy5maXJzdEZsYWcgPSB0cnVlXG4gICAgdGhpcy5fc3RvcmUgPSBuZXcgU3RvcmUoKVxuICAgIHRoaXMuX3N0b3JlLmlzTGl2ZSA9IGNvbmZpZy5pc0xpdmUgfHwgZmFsc2VcbiAgICB0aGlzLl9zdG9yZS5wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLmZsdlBhcnNlciA9IG5ldyBGbHZQYXJzZXIodGhpcy5fc3RvcmUpXG4gICAgdGhpcy50YWdEZW11eGVyID0gbmV3IFRhZ0RlbXV4ZXIodGhpcy5fc3RvcmUpXG4gICAgdGhpcy5tcDRyZW11eGVyID0gbmV3IE1wNFJlbXV4ZXIodGhpcy5fc3RvcmUpXG4gICAgdGhpcy5idWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICB0aGlzLmJ1ZmZlcktleWZyYW1lcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMuTUVUQV9DSFVOS19TSVpFID0gTWF0aC5wb3coMTAsIDYpXG4gICAgdGhpcy5DSFVOS19TSVpFID0gTWF0aC5wb3coMTAsIDYpXG4gICAgdGhpcy5mdHlwX21vb3YgPSBudWxsXG4gICAgdGhpcy5pc1NvdXJjZU9wZW4gPSBmYWxzZVxuICAgIHRoaXMuX2lzTmV3U2VnbWVudHNBcnJpdmFsID0gZmFsc2VcbiAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgdGhpcy5sb2FkVGFzayA9IG51bGxcbiAgICB0aGlzLnJhbmdlID0ge1xuICAgICAgc3RhcnQ6IC0xLFxuICAgICAgZW5kOiAtMVxuICAgIH1cbiAgICB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzID0gW11cbiAgICB0aGlzLl9wZW5kaW5nUmVtb3ZlUmFuZ2UgPSBbXVxuICAgIHRoaXMuZXJyX2NudCA9IDBcbiAgICB0aGlzLnJlcXVlc3RDb25maWcgPSB7XG4gICAgICBtb2RlOiB0aGlzLl9jb25maWcuY29ycyA/ICdjb3JzJyA6ICdzYW1lLW9yaWdpbidcbiAgICB9XG4gICAgdGhpcy5pbml0RXZlbnRCaW5kKClcbiAgfVxuXG4gIHN0YXJ0TG9hZERhdGEgKCkge1xuICAgIGlmICghdGhpcy5fY29uZmlnLmlzTGl2ZSkge1xuICAgICAgdGhpcy5pbml0TWV0YSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdExpdmVTdHJlYW0oKVxuICAgIH1cbiAgfVxuXG4gIGluaXRMaXZlU3RyZWFtICgpIHtcbiAgICBuZXcgTGl2ZVRhc2sodGhpcy5fY29uZmlnLnVybCwgdGhpcy5yZXF1ZXN0Q29uZmlnKS5ydW4odGhpcy5sb2FkTGl2ZURhdGEuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGxvYWRMaXZlRGF0YSAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmVtaXQoJ2xpdmUtZW5kJylcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpXG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5zZXRGbHYodGhpcy5idWZmZXIuYnVmZmVyKVxuICAgICAgdGhpcy5idWZmZXIuYnVmZmVyID0gdGhpcy5idWZmZXIuYnVmZmVyLnNsaWNlKG9mZnNldClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRNZXRhICgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IFJlc29sdmVyID0ge1xuICAgICAgcmVzb2x2ZUNodW5rICh7dGltZVN0YW1wLCBidWZmZXJ9KSB7XG4gICAgICAgIGlmICh0aW1lU3RhbXAgIT09IHNlbGYubG9hZFRhc2sudGltZVN0YW1wKSByZXR1cm5cbiAgICAgICAgc2VsZi5lcnJfY250ID0gMFxuICAgICAgICBzZWxmLmJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShidWZmZXIpKVxuICAgICAgICBsZXQgb2Zmc2V0ID0gc2VsZi5zZXRGbHYoc2VsZi5idWZmZXIuYnVmZmVyKVxuICAgICAgICBzZWxmLmJ1ZmZlci5idWZmZXIgPSBzZWxmLmJ1ZmZlci5idWZmZXIuc2xpY2Uob2Zmc2V0KVxuICAgICAgICBpZiAoIXNlbGYuaXNNZWRpYUluZm9SZWFkeSkge1xuICAgICAgICAgIHNlbGYuaW5pdE1ldGEoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICBzdGFydDogdGhpcy5yYW5nZS5lbmQgKyAxLFxuICAgICAgZW5kOiB0aGlzLnJhbmdlLmVuZCArIHRoaXMuTUVUQV9DSFVOS19TSVpFXG4gICAgfVxuICAgIGNvbnN0IGxvYWREYXRhID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZE1ldGFEYXRhKHRoaXMucmFuZ2Uuc3RhcnQsIHRoaXMucmFuZ2UuZW5kKS50aGVuKFJlc29sdmVyLnJlc29sdmVDaHVuaykuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgaWYgKHRoaXMuZXJyX2NudCA+PSAzKSB7XG4gICAgICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgZSlcbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXJyX2NudCArPSAxXG4gICAgICAgIGxvYWREYXRhKClcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBsb2FkRGF0YSgpXG4gIH1cblxuICBsb2FkU2VnbWVudHMgKGNoYW5nZVJhbmdlLCBjdXJyZW50VGltZSA9IDAsIHByZWxvYWRUaW1lKSB7XG4gICAgdGhpcy5faXNOZXdTZWdtZW50c0Fycml2YWwgPSBmYWxzZVxuICAgIGNvbnN0IHJlc29sdmVDaHVuayA9ICh7dGltZVN0YW1wLCBidWZmZXJ9KSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1RlbXBQbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5pc1RlbXBQbGF5ZXIgPSBmYWxzZVxuICAgICAgfVxuICAgICAgaWYgKHRpbWVTdGFtcCAhPT0gdGhpcy5sb2FkVGFzay50aW1lU3RhbXApIHJldHVyblxuICAgICAgdGhpcy5lcnJfY250ID0gMFxuICAgICAgdGhpcy5idWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSlcbiAgICAgIGlmICh0aGlzLmlzU2Vla2luZykge1xuICAgICAgICB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzID0gW11cbiAgICAgIH1cbiAgICAgIGxldCBvZmZzZXQgPSB0aGlzLnNldEZsdih0aGlzLmJ1ZmZlci5idWZmZXIpXG4gICAgICB0aGlzLmJ1ZmZlci5idWZmZXIgPSB0aGlzLmJ1ZmZlci5idWZmZXIuc2xpY2Uob2Zmc2V0KVxuICAgICAgaWYgKCF0aGlzLl9pc05ld1NlZ21lbnRzQXJyaXZhbCkge1xuICAgICAgICB0aGlzLmxvYWRTZWdtZW50cyh0cnVlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlUmFuZ2UpIHtcbiAgICAgIGxldCBfcmFuZ2UgPSB0aGlzLnJhbmdlXG5cbiAgICAgIGlmICh0aGlzLmdldE5leHRSYW5nZUVuZChjdXJyZW50VGltZSwgcHJlbG9hZFRpbWUpIDw9IF9yYW5nZS5lbmQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICAgIHN0YXJ0OiB0aGlzLnJhbmdlLmVuZCArIDEsXG4gICAgICAgIGVuZDogY3VycmVudFRpbWUgPT09IHVuZGVmaW5lZCA/IHRoaXMucmFuZ2UuZW5kICsgdGhpcy5DSFVOS19TSVpFIC0gMSA6IHRoaXMuZ2V0TmV4dFJhbmdlRW5kKGN1cnJlbnRUaW1lLCBwcmVsb2FkVGltZSkgLSAxXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnJhbmdlLnN0YXJ0ID49IHRoaXMucmFuZ2UuZW5kIHx8ICF0aGlzLnJhbmdlLmVuZCkge1xuICAgICAgICB0aGlzLnJhbmdlID0gX3JhbmdlXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0b3ApIHJldHVyblxuICAgICAgcmV0dXJuIHRoaXMuX2xvYWRTZWdtZW50c0RhdGEodGhpcy5yYW5nZS5zdGFydCwgdGhpcy5yYW5nZS5lbmQpLnRoZW4ocmVzb2x2ZUNodW5rKS5jYXRjaChlID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZXJyX2NudCA+PSAzKSB7XG4gICAgICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgJ+WKoOi9veinhumikeWksei0pScpXG4gICAgICAgICAgdGhpcy5kZXN0cm95KClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVycl9jbnQgKz0gMVxuICAgICAgICBsb2FkRGF0YSgpXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gbG9hZERhdGEoKVxuICB9XG5cbiAgZ2V0TmV4dFJhbmdlRW5kIChzdGFydCwgcHJlbG9hZFRpbWUpIHtcbiAgICBjb25zdCB7a2V5ZnJhbWVzOiB7dGltZXMsIGZpbGVQb3NpdGlvbnN9LCB2aWRlb1RpbWVTY2FsZX0gPSB0aGlzLl9zdG9yZVxuICAgIGlmICghdGltZXMgfHwgIWZpbGVQb3NpdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnJhbmdlLmVuZCArIHRoaXMuQ0hVTktfU0laRVxuICAgIH1cbiAgICBzdGFydCAqPSB2aWRlb1RpbWVTY2FsZVxuXG4gICAgbGV0IGV4cGVjdEVuZCA9IHN0YXJ0ICsgKHByZWxvYWRUaW1lICogdmlkZW9UaW1lU2NhbGUpXG4gICAgaWYgKGV4cGVjdEVuZCA+IHRpbWVzW3RpbWVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICByZXR1cm4gZmlsZVBvc2l0aW9uc1tmaWxlUG9zaXRpb25zLmxlbmd0aCAtIDFdXG4gICAgfVxuICAgIGxldCBsZWZ0ID0gMFxuICAgIGxldCByaWdodCA9IHRpbWVzLmxlbmd0aCAtIDFcbiAgICBsZXQgaW5kZXhcblxuICAgIHdoaWxlIChsZWZ0IDw9IHJpZ2h0KSB7XG4gICAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigocmlnaHQgKyBsZWZ0KSAvIDIpXG4gICAgICBpZiAodGltZXNbbWlkXSA8PSBleHBlY3RFbmQgJiYgZXhwZWN0RW5kIDw9IHRpbWVzW21pZCArIDFdKSB7XG4gICAgICAgIGluZGV4ID0gbWlkICsgMVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmIChsZWZ0ID09PSByaWdodCkge1xuICAgICAgICBpbmRleCA9IG1pZFxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmIChleHBlY3RFbmQgPCB0aW1lc1ttaWRdKSB7XG4gICAgICAgIHJpZ2h0ID0gbWlkIC0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVmdCA9IG1pZCArIDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXggPyBmaWxlUG9zaXRpb25zW2luZGV4XSA6IHVuZGVmaW5lZFxuICB9XG5cbiAgX2xvYWRTZWdtZW50c0RhdGEgKHN0YXJ0ID0gMCwgZW5kID0gc3RhcnQgKyB0aGlzLkNIVU5LX1NJWkUpIHtcbiAgICB0aGlzLmxvYWRUYXNrID0gbmV3IFZvZFRhc2sodGhpcy5fY29uZmlnLnVybCwgW3N0YXJ0LCBlbmRdLCB0aGlzLnJlcXVlc3RDb25maWcpXG4gICAgcmV0dXJuIHRoaXMubG9hZFRhc2sucHJvbWlzZVxuICB9XG5cbiAgbG9hZE1ldGFEYXRhIChzdGFydCA9IDAsIGVuZCA9IHN0YXJ0ICsgdGhpcy5NRVRBX0NIVU5LX1NJWkUpIHtcbiAgICB0aGlzLmxvYWRUYXNrID0gbmV3IFZvZFRhc2sodGhpcy5fY29uZmlnLnVybCwgW3N0YXJ0LCBlbmRdLCB0aGlzLnJlcXVlc3RDb25maWcpXG4gICAgcmV0dXJuIHRoaXMubG9hZFRhc2sucHJvbWlzZVxuICB9XG5cbiAgc2V0Rmx2Rmlyc3QgKGFycmF5QnVmZiwgYmFzZVRpbWUpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmZsdlBhcnNlci5zZXRGbHYobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmKSlcbiAgICBjb25zdCB7dGFnc30gPSB0aGlzLl9zdG9yZS5zdGF0ZVxuXG4gICAgaWYgKHRhZ3MubGVuZ3RoKSB7XG4gICAgICBpZiAodGFnc1swXS50YWdUeXBlICE9PSAxOCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZsdiBmaWxlIHdpdGhvdXQgbWV0YWRhdGEgdGFnJylcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3RlbXBCYXNlVGltZSAhPT0gMCAmJiB0aGlzLl90ZW1wQmFzZVRpbWUgPT09IHRhZ3NbMF0uZ2V0VGltZSgpKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLnN0YXRlLl90aW1lc3RhbXBCYXNlID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnRhZ0RlbXV4ZXIucmVzb2x2ZVRhZ3ModGFncylcbiAgICB9XG5cbiAgICB0aGlzLmZpcnN0RmxhZyA9IGZhbHNlXG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgc2V0Rmx2VXN1YWxseSAoYXJyYXlCdWZmLCBiYXNlVGltZSkge1xuICAgIHRoaXMuaXNQYXJzaW5nID0gdHJ1ZVxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuZmx2UGFyc2VyLnNldEZsdihuZXcgVWludDhBcnJheShhcnJheUJ1ZmYpKVxuICAgIGNvbnN0IHt0YWdzfSA9IHRoaXMuX3N0b3JlLnN0YXRlXG4gICAgaWYgKHRhZ3MubGVuZ3RoKSB7XG4gICAgICB0aGlzLnRhZ0RlbXV4ZXIucmVzb2x2ZVRhZ3ModGFncylcbiAgICB9XG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgaGFuZGxlRGF0YVJlYWR5IChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgdGhpcy5tcDRyZW11eGVyLnJlbXV4KGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spXG4gIH1cblxuICBoYW5kbGVNZXRhRGF0YVJlYWR5ICh0eXBlLCBtZXRhKSB7XG4gICAgdGhpcy5tcDRyZW11eGVyLm9uTWV0YURhdGFSZWFkeSh0eXBlLCBtZXRhKVxuICB9XG5cbiAgaGFuZGxlRXJyb3IgKGUpIHtcbiAgICB0aGlzLmVycm9yKGUpXG4gIH1cblxuICBoYW5kbGVOZXdNZWRpYUZyYWdtZW50IChuZXdGcmFnKSB7XG4gICAgdGhpcy5faXNOZXdTZWdtZW50c0Fycml2YWwgPSB0cnVlXG4gICAgdGhpcy5fcGVuZGluZ0ZyYWdtZW50cy5wdXNoKG5ld0ZyYWcpXG4gICAgY29uc3Qge3JhbmRvbUFjY2Vzc1BvaW50c30gPSBuZXdGcmFnLmZyYWdtZW50XG4gICAgaWYgKHJhbmRvbUFjY2Vzc1BvaW50cyAmJiByYW5kb21BY2Nlc3NQb2ludHMubGVuZ3RoKSB7XG4gICAgICByYW5kb21BY2Nlc3NQb2ludHMuZm9yRWFjaChyYXAgPT4ge1xuICAgICAgICB0aGlzLmJ1ZmZlcktleWZyYW1lcy5hZGQocmFwLmR0cylcbiAgICAgIH0pXG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NvdXJjZU9wZW4pIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5fcGVuZGluZ0ZyYWdtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGZyYWdtZW50ID0gdGhpcy5fcGVuZGluZ0ZyYWdtZW50cy5zaGlmdCgpXG4gICAgICBpZiAoIXRoaXMuaGFuZGxlTWVkaWFGcmFnbWVudChmcmFnbWVudCkpIHtcbiAgICAgICAgdGhpcy5fcGVuZGluZ0ZyYWdtZW50cy51bnNoaWZ0KGZyYWdtZW50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYW5kbGVTZWVrRW5kKClcbiAgICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2NhY2hldXBkYXRlJywgdGhpcy5fcGxheWVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1lZGlhSW5mb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICBjb25zdCBGVFlQX01PT1YgPSB0aGlzLm1wNHJlbXV4ZXIub25NZWRpYUluZm9SZWFkeShtZWRpYUluZm8pXG4gICAgaWYgKCF0aGlzLmZ0eXBfbW9vdikge1xuICAgICAgdGhpcy5mdHlwX21vb3YgPSBGVFlQX01PT1ZcbiAgICAgIHRoaXMuZW1pdCgncmVhZHknLCBGVFlQX01PT1YpXG4gICAgfVxuICB9XG5cbiAgaW5pdEV2ZW50QmluZCAoKSB7XG4gICAgdGhpcy50YWdEZW11eGVyLmhhbmRsZURhdGFSZWFkeSA9IHRoaXMuaGFuZGxlRGF0YVJlYWR5LmJpbmQodGhpcylcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuaGFuZGxlTWVkaWFJbmZvUmVhZHkgPSB0aGlzLmhhbmRsZU1lZGlhSW5mb1JlYWR5LmJpbmQodGhpcylcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuaGFuZGxlTWV0YURhdGFSZWFkeSA9IHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeS5iaW5kKHRoaXMpXG4gICAgdGhpcy50YWdEZW11eGVyLnNldEV2ZW50QmluZCgpXG4gICAgdGhpcy5tcDRyZW11eGVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSB0aGlzLmhhbmRsZU5ld01lZGlhRnJhZ21lbnQuYmluZCh0aGlzKVxuICB9XG5cbiAgcmVwbGF5ICgpIHtcbiAgICB0aGlzLmlzU291cmNlT3BlbiA9IGZhbHNlXG4gICAgdGhpcy5yYW5nZSA9IHtcbiAgICAgIHN0YXJ0OiB0aGlzLl9zdG9yZS5tZXRhRW5kUG9zaXRpb24sXG4gICAgICBlbmQ6IHRoaXMuZ2V0TmV4dFJhbmdlRW5kKDAsIHRoaXMuX2NvbmZpZy5wcmVsb2FkVGltZSkgLSAxXG4gICAgfVxuICAgIHRoaXMubXA0cmVtdXhlci5zZWVrKClcbiAgICB0aGlzLmZsdlBhcnNlci5zZWVrKClcbiAgICB0aGlzLmNsZWFyQnVmZmVyKClcbiAgICB0aGlzLmxvYWRTZWdtZW50cyhmYWxzZSlcbiAgfVxuXG4gIGNsZWFyQnVmZmVyICgpIHtcbiAgICB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzID0gW11cbiAgICB0aGlzLl9wZW5kaW5nUmVtb3ZlUmFuZ2UgPSBbXVxuICB9XG4gIHVuYmluZEV2ZW50cyAoKSB7XG4gICAgdGhpcy50YWdEZW11eGVyLmhhbmRsZURhdGFSZWFkeSA9IE5PT1BcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuaGFuZGxlTWVkaWFJbmZvUmVhZHkgPSBOT09QXG4gICAgdGhpcy50YWdEZW11eGVyLmhhbmRsZU1ldGFEYXRhUmVhZHkgPSBOT09QXG4gICAgdGhpcy50YWdEZW11eGVyLnNldEV2ZW50QmluZCgpXG4gICAgdGhpcy5tcDRyZW11eGVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSBOT09QXG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5tcDRyZW11eGVyLmRlc3Ryb3koKVxuICAgIHRoaXMuZmx2UGFyc2VyLmRlc3Ryb3koKVxuICAgIHRoaXMudGFnRGVtdXhlci5kZXN0cm95KClcbiAgICB0aGlzLm1wNHJlbXV4ZXIgPSBudWxsXG4gICAgdGhpcy5mbHZQYXJzZXIgPSBudWxsXG4gICAgdGhpcy50YWdEZW11eGVyID0gbnVsbFxuICAgIHRoaXMubG9hZFNlZ21lbnRzID0gKCkgPT4gbnVsbFxuICAgIHRoaXMuX3N0b3JlID0gbnVsbFxuICAgIHRoaXMuY2xlYXJCdWZmZXIoKVxuICAgIHRoaXMuc3RvcCA9IHRydWVcbiAgfVxuXG4gIHNlZWsgKHRhcmdldCkge1xuICAgIHRoaXMubG9hZFRhc2suY2FuY2VsKClcbiAgICBjb25zdCB7a2V5ZnJhbWVzID0ge30sIHZpZGVvVGltZVNjYWxlfSA9IHRoaXMuX3N0b3JlXG4gICAgbGV0IHNlZWtTdGFydCA9IHRhcmdldCAqIHZpZGVvVGltZVNjYWxlXG4gICAgbGV0IHN0YXJ0RmlsZVBvc1xuICAgIGxldCBlbmRGaWxlUG9zXG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5taW4oa2V5ZnJhbWVzLmZpbGVQb3NpdGlvbnMubGVuZ3RoLCBrZXlmcmFtZXMudGltZXMubGVuZ3RoKVxuICAgIGxldCB7cHJlbG9hZFRpbWV9ID0gdGhpcy5fY29uZmlnXG5cbiAgICBmdW5jdGlvbiBnZXRFbmRGaWxlUG9zICh0aW1lLCBpZHgpIHtcbiAgICAgIGlmIChpZHggPT09IGtleWZyYW1lcy50aW1lcy5sZW5ndGgpIHtcbiAgICAgICAgZW5kRmlsZVBvcyA9IGlkeFxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lIDw9IHByZWxvYWRUaW1lICYmIHByZWxvYWRUaW1lIDw9IGtleWZyYW1lcy50aW1lc1tpZHggKyAxXSkge1xuICAgICAgICBlbmRGaWxlUG9zID0gaWR4XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAvLyDpnIDopoHlpITnkIZFT0bnmoTmg4XlhrVcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgbGV0IGxvID0gMFxuICAgIGxldCBoaSA9IGxlbmd0aCAtIDJcbiAgICB3aGlsZSAobG8gPD0gaGkpIHtcbiAgICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChsbyArIGhpKSAvIDIpXG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBrZXlmcmFtZXMudGltZXNbbWlkXVxuICAgICAgbGV0IG5leHRUaW1lID0ga2V5ZnJhbWVzLnRpbWVzW21pZCArIDFdID8ga2V5ZnJhbWVzLnRpbWVzW21pZCArIDFdIDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgICAgIGlmICgoY3VycmVudFRpbWUgPD0gc2Vla1N0YXJ0ICYmIHNlZWtTdGFydCA8PSBuZXh0VGltZSkgfHwgbG8gPT09IGhpKSB7XG4gICAgICAgIHN0YXJ0RmlsZVBvcyA9IG1pZFxuICAgICAgICBwcmVsb2FkVGltZSA9IHByZWxvYWRUaW1lICogdmlkZW9UaW1lU2NhbGUgKyBzZWVrU3RhcnRcbiAgICAgICAga2V5ZnJhbWVzLnRpbWVzLmV2ZXJ5KGdldEVuZEZpbGVQb3MpXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2UgaWYgKHNlZWtTdGFydCA8IGN1cnJlbnRUaW1lKSB7XG4gICAgICAgIGhpID0gbWlkIC0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG8gPSBtaWQgKyAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzU2Vla2luZykge1xuICAgICAgdGhpcy5pc1NlZWtpbmcgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0b3JlLmNsZWFyVGFncygpXG4gICAgfVxuICAgIHRoaXMuX3BlbmRpbmdGcmFnbWVudHMgPSBbXVxuICAgIHRoaXMubXA0cmVtdXhlci5zZWVrKClcbiAgICB0aGlzLmZsdlBhcnNlci5zZWVrKClcbiAgICBWb2RUYXNrLmNsZWFyKClcbiAgICBjb25zdCBfcmFuZ2UgPSB0aGlzLnJhbmdlXG4gICAgaWYgKGtleWZyYW1lcy5maWxlUG9zaXRpb25zW3N0YXJ0RmlsZVBvc10gPCBfcmFuZ2UuZW5kKSB7XG4gICAgICBzdGFydEZpbGVQb3MgKz0gMVxuICAgICAgZW5kRmlsZVBvcyArPSAxXG4gICAgfVxuICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICBzdGFydDoga2V5ZnJhbWVzLmZpbGVQb3NpdGlvbnNbc3RhcnRGaWxlUG9zXSxcbiAgICAgIGVuZDoga2V5ZnJhbWVzLmZpbGVQb3NpdGlvbnNbZW5kRmlsZVBvc10gLSAxIHx8ICcnXG4gICAgfVxuICAgIHRoaXMuYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgdGhpcy5sb2FkU2VnbWVudHMoZmFsc2UpXG4gIH1cblxuICBnZXQgc2V0Rmx2ICgpIHtcbiAgICByZXR1cm4gdGhpcy5maXJzdEZsYWcgPyB0aGlzLnNldEZsdkZpcnN0IDogdGhpcy5zZXRGbHZVc3VhbGx5XG4gIH1cblxuICBnZXQgaXNNZWRpYUluZm9SZWFkeSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlLm1lZGlhSW5mby5pc0NvbXBsZXRlXG4gIH1cblxuICBnZXQgdmlkZW9EdXJhdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlLm1lZGlhSW5mby5kdXJhdGlvblxuICB9XG5cbiAgZ2V0IGhhc1BlbmRpbmdGcmFnbWVudHMgKCkge1xuICAgIHJldHVybiAhIXRoaXMuX3BlbmRpbmdGcmFnbWVudHMubGVuZ3RoXG4gIH1cblxuICBnZXQgcGVuZGluZ0ZyYWdtZW50cyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlbmRpbmdGcmFnbWVudHNcbiAgfVxuXG4gIGdldCB2aWRlb1RpbWVTY2FsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlLnZpZGVvVGltZVNjYWxlXG4gIH1cblxuICBnZXQgaGFzUGVuZGluZ1JlbW92ZVJhbmdlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlbmRpbmdSZW1vdmVSYW5nZS5sZW5ndGhcbiAgfVxuXG4gIGdldCBwZW5kaW5nUmVtb3ZlUmFuZ2VzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ1JlbW92ZVJhbmdlXG4gIH1cblxuICBnZXQgaXNTZWVrYWJsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlLmlzU2Vla2FibGVcbiAgfVxufVxuIiwiaW1wb3J0IEV4cEdvbG9tYiBmcm9tICAnLi4vdXRpbHMvRXhwR29sb21iJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNQU1BhcnNlciB7XG4gICAgc3RhdGljIGdldFByb2ZpbGVTdHIgKHByb2ZpbGVJZGMpIHtcbiAgICAgICAgc3dpdGNoIChwcm9maWxlSWRjKSB7XG4gICAgICAgICAgICBjYXNlIDY2OlxuICAgICAgICAgICAgICAgIHJldHVybiAnQmFzZWxpbmUnO1xuICAgICAgICAgICAgY2FzZSA3NzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ01haW4nO1xuICAgICAgICAgICAgY2FzZSA4ODpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0V4dGVuZGVkJztcbiAgICAgICAgICAgIGNhc2UgMTAwOlxuICAgICAgICAgICAgICAgIHJldHVybiAnSGlnaCc7XG4gICAgICAgICAgICBjYXNlIDExMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0hpZ2gxMCc7XG4gICAgICAgICAgICBjYXNlIDEyMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0hpZ2g0MjInO1xuICAgICAgICAgICAgY2FzZSAyNDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdIaWdoNDQ0JztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdVbmtub3duJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRMZXZlbFN0ciAobGV2ZWxJZGMpIHtcbiAgICAgICAgcmV0dXJuIChsZXZlbElkYyAvIDEwKS50b0ZpeGVkKDEpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRDaHJvbWFGb3JtYXRTdHIgKGNocm9tYSkge1xuICAgICAgICBzd2l0Y2ggKGNocm9tYSkge1xuICAgICAgICAgICAgY2FzZSA0MjA6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc0OjI6MCc7XG4gICAgICAgICAgICBjYXNlIDQyMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzQ6MjoyJztcbiAgICAgICAgICAgIGNhc2UgNDQ0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnNDo0OjQnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1Vua25vd24nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVhZCBTUFNcbiAgICAgKiBAcGFyYW0gb3JpZ2luQXJyXG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlU1BTIChvcmlnaW5BcnIpIHtcblxuICAgICAgICBsZXQgcmJzcCA9IFNQU1BhcnNlci5fZWJzcDJyYnNwKG9yaWdpbkFycik7XG5cbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IEV4cEdvbG9tYihyYnNwKTtcbiAgICAgICAgY29uc3Qgc3BzQ29uZmlnID0gc3RyZWFtLnJlYWRTUFMoKTtcbiAgICAgICAgY29uc3QgeyBjaHJvbWFGb3JtYXQsIGxldmVsSWRjLCBwcm9maWxlSWRjIH0gPSBzcHNDb25maWc7XG4gICAgICAgIHNwc0NvbmZpZy5wcm9maWxlU3RyaW5nID0gU1BTUGFyc2VyLmdldFByb2ZpbGVTdHIocHJvZmlsZUlkYyk7XG4gICAgICAgIHNwc0NvbmZpZy5sZXZlbFN0cmluZyA9IFNQU1BhcnNlci5nZXRMZXZlbFN0cihsZXZlbElkYyk7XG4gICAgICAgIHNwc0NvbmZpZy5jaHJvbWFGb3JtYXRTdHJpbmcgPSBTUFNQYXJzZXIuZ2V0Q2hyb21hRm9ybWF0U3RyKGNocm9tYUZvcm1hdCk7XG5cbiAgICAgICAgcmV0dXJuIHNwc0NvbmZpZztcblxuICAgIH1cblxuICAgIC8vXG4gICAgc3RhdGljIF9lYnNwMnJic3AgKG9yaWdpbkFycikge1xuICAgICAgICBjb25zdCBvcmlnaW5MZW4gPSAgb3JpZ2luQXJyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGNvbnN0IGRpc3QgPSBuZXcgVWludDhBcnJheShvcmlnaW5BcnIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIGxldCBkaXN0U2l6ZSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG9yaWdpbkxlbjsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+IDIgJiYgb3JpZ2luQXJyW2ldID09PSAzICYmIG9yaWdpbkFycltpIC0gMV0gPT09IDAgJiYgb3JpZ2luQXJyW2kgLSAyXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzdFtkaXN0U2l6ZSsrXSA9IG9yaWdpbkFycltpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShkaXN0LmJ1ZmZlciwgMCwgZGlzdFNpemUpO1xuICAgIH1cbn0iLCJpbXBvcnQgb2JzZXJ2ZXIgZnJvbSAnLi4vdXRpbHMvT2JzZXJ2ZXInXG5pbXBvcnQgRXJyb3JzIGZyb20gJy4uL21vZGVscy9lcnJvcidcblxuLyoqXG4gKiDovaznoIHlmajln7rnsbtcbiAqL1xuY2xhc3MgVHJhbnNDb2RlciB7XG4gIGNvbnN0cnVjdG9yIChzdG9yZSkge1xuICAgIGlmIChzdG9yZSkge1xuICAgICAgdGhpcy5fc3RvcmUgPSBzdG9yZVxuICAgIH1cbiAgICB0aGlzLl9vYnNlcnZlciA9IG9ic2VydmVyXG4gICAgdGhpcy5vbiA9IG9ic2VydmVyLm9uLmJpbmQob2JzZXJ2ZXIpXG4gICAgdGhpcy5lbWl0ID0gb2JzZXJ2ZXIuZW1pdC5iaW5kKG9ic2VydmVyKVxuICAgIHRoaXMub2ZmID0gb2JzZXJ2ZXIub2ZmLmJpbmQob2JzZXJ2ZXIpXG4gICAgdGhpcy5mbHVzaCA9IG9ic2VydmVyLmZsdXNoLmJpbmQob2JzZXJ2ZXIpXG4gICAgdGhpcy5vbmNlID0gb2JzZXJ2ZXIub25jZS5iaW5kKG9ic2VydmVyKVxuICB9XG4gIGVtaXRFcnJvciAodHlwZSwgZXJyb3JEZXRhaWwgPSB7bGluZTogJycsIGhhbmRsZTogJycsIG1zZzogJycsIHZlcnNpb246ICcnfSkge1xuICAgIGNvbnN0IHsgcGxheWVyLCBzdGF0ZSB9ID0gdGhpcy5fc3RvcmVcbiAgICBpZiAocGxheWVyKSB7XG4gICAgICBjb25zdCBlcnJvclRvRW1pdCA9IG5ldyBFcnJvcnModHlwZSwgcGxheWVyLmN1cnJlbnRUaW1lLCBzdGF0ZS5kdXJhdGlvbiwgJycsIHRydWUsIHBsYXllci5jb25maWcudXJsLCBwbGF5ZXIuY29uZmlnLnVybCwgcGxheWVyLmVuZGVkLCBlcnJvckRldGFpbClcbiAgICAgIHBsYXllci5lbWl0KCdlcnJvcicsIGVycm9yVG9FbWl0KVxuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVHJhbnNDb2RlclxuIiwiLy8gcmVmcmVuY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS92aWRlby1kZXYvaGxzLmpzL2Jsb2IvbWFzdGVyL3NyYy9kZW11eC9hZHRzLmpzXG5pbXBvcnQgRGVtdXhlciBmcm9tICcuL0RlbXV4ZXInXG5pbXBvcnQgRGF0YVZpZXc0UmVhZCBmcm9tICcuLi8uLi91dGlscy9EYXRhVmlldzRSZWFkJ1xuLy8gaW1wb3J0IHsgbXAzVmVyc2lvbnMsIG1wM0JpdFJhdGUsIGF1ZGlvU2FtcGxlUmF0ZSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQge1xuICBzb3VuZFJhdGVUeXBlcyxcbiAgc2FtcGxpbmdGcmVxdWVuY3lUeXBlcyxcbiAgRXZlbnRUeXBlcyxcbiAgYnJvd3NlclR5cGVzXG59IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcydcbmltcG9ydCBzbmlmZmVyIGZyb20gJy4uLy4uL3V0aWxzL3NuaWZmZXInXG5pbXBvcnQgQnVmZmVyIGZyb20gJy4uLy4uL3dyaXRlL0J1ZmZlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvRGVtdXhlciBleHRlbmRzIERlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoc3RvcmUpIHtcbiAgICBzdXBlcihzdG9yZSlcbiAgICB0aGlzLkNMQVNTX05BTUUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSBudWxsXG4gICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSAwXG4gICAgdGhpcy5fc3RvcmUuYXVkaW9NZXRhRGF0YSA9IG51bGxcbiAgICB0aGlzLmhhbmRsZURhdGFSZWFkeSA9ICgpID0+IHt9XG4gICAgdGhpcy5oYW5kbGVNZXRhRGF0YVJlYWR5ID0gKCkgPT4ge31cbiAgICB0aGlzLmhhbmRsZU1lZGlhSW5mb1JlYWR5ID0gKCkgPT4ge31cbiAgfVxuICByZXNvbHZlICh0YWcpIHtcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSAwXG4gICAgY29uc3QgeyBfc3RvcmU6IHN0b3JlIH0gPSB0aGlzXG4gICAgY29uc3QgeyBhdWRpb1RyYWNrOiB0cmFjayB9ID0gc3RvcmVcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSB0YWdcbiAgICB0aGlzLmRhdGEgPSB0YWcuYm9keVxuICAgIGxldCB7XG4gICAgICBhdWRpb01ldGFEYXRhOiBtZXRhXG4gICAgfSA9IHN0b3JlXG5cbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIG1ldGEgPSBzdG9yZS5hdWRpb01ldGFEYXRhID0ge31cbiAgICAgIHN0b3JlLmF1ZGlvTWV0YURhdGEgPSB0aGlzLmluaXRBdWRpb01ldGEobWV0YSlcbiAgICB9XG5cbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldzRSZWFkKHRhZy5ib2R5LmJ1ZmZlciwgdGhpcylcblxuICAgIGNvbnN0IHNvdW5kID0gZHYuZ2V0VWludDgoKVxuXG4gICAgY29uc3Qgc291bmRGb3JtYXRJZHggPSBzb3VuZCA+Pj4gNCAvLyAgVUludDRcbiAgICBjb25zdCBzb3VuZFJhdGUgPSAoc291bmQgJiAxMikgPj4+IDIgLy8gIFVJbnQyXG4gICAgLy8gY29uc3Qgc291bmRTaXplID0gKHNvdW5kICYgMikgPj4+IDEgLy8gICBVSW50MVxuICAgIGNvbnN0IHNvdW5kVHlwZSA9IChzb3VuZCAlIDEpIC8vIFVJbnQxXG5cbiAgICBtZXRhLmF1ZGlvU2FtcGxlUmF0ZSA9IHNvdW5kUmF0ZVR5cGVzW3NvdW5kUmF0ZV1cbiAgICBtZXRhLmNoYW5uZWxDb3VudCA9IHNvdW5kVHlwZSA9PT0gMCA/IDEgOiAyXG5cbiAgICBpZiAoc291bmRGb3JtYXRJZHggIT09IDEwICYmIHNvdW5kRm9ybWF0SWR4ICE9PSAyKSB7XG4gICAgICB0aGlzLmVycm9yKCdvbmx5IHN1cHBvcnQgQUFDIEF1ZGlvIGZvcm1hdCBzbyBmYXInKVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChzb3VuZEZvcm1hdElkeCA9PT0gMTApIHsgLy8gQUFDXG4gICAgICBjb25zdCBhYWNJbmZvID0gdGhpcy5fcGFyc2VBQUNBdWRpbygpXG4gICAgICBpZiAoIWFhY0luZm8pIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZGF0YTogYWFjRGF0YSwgZGF0YTogeyBzYW1wbGVGcmVxIH0gfSA9IGFhY0luZm9cbiAgICAgIGlmIChhYWNJbmZvLnBhY2tldFR5cGUgPT09IDApIHsgLy8gQUFDIHNlcXVlbmNlIGhlYWRlclxuICAgICAgICBtZXRhLnNhbXBsZVJhdGUgPSBzYW1wbGVGcmVxXG4gICAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gYWFjRGF0YS5jaGFubmVsQ291bnRcbiAgICAgICAgbWV0YS5jb2RlYyA9IGFhY0RhdGEuY29kZWNcbiAgICAgICAgbWV0YS5tYW5pZmVzdENvZGVjID0gYWFjRGF0YS5tYW5pZmVzdENvZGVjXG4gICAgICAgIG1ldGEuY29uZmlnID0gYWFjRGF0YS5jb25maWdcbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IDEwMjQgLyBzYW1wbGVGcmVxICogbWV0YS50aW1lU2NhbGVcbiAgICAgICAgaWYgKHN0b3JlLmhhc0luaXRpYWxNZXRhRGlzcGF0Y2hlZCkge1xuICAgICAgICAgIGlmIChzdG9yZS52aWRlb1RyYWNrLmxlbmd0aCB8fCBzdG9yZS5hdWRpb1RyYWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVEYXRhUmVhZHkoc3RvcmUudmlkZW9UcmFjaywgc3RvcmUuYXVkaW9UcmFjaylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RvcmUuc3RhdGUuX2F1ZGlvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZCA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeSgnYXVkaW8nLCBtZXRhKVxuXG4gICAgICAgIGNvbnN0IHsgbWVkaWFJbmZvOiBtaSB9ID0gc3RvcmVcbiAgICAgICAgbWkuYXVkaW9Db2RlYyA9IG1ldGEuY29kZWNcbiAgICAgICAgbWkuYXVkaW9TYW1wbGVSYXRlID0gbWV0YS5zYW1wbGVSYXRlXG4gICAgICAgIG1pLmF1ZGlvQ2hhbm5lbENvdW50ID0gbWV0YS5jaGFubmVsQ291bnRcbiAgICAgICAgbWkuYXVkaW9Db25maWcgPSBtZXRhLmNvbmZpZ1xuICAgICAgICBpZiAobWkuaGFzVmlkZW8pIHtcbiAgICAgICAgICBpZiAobWkudmlkZW9Db2RlYykge1xuICAgICAgICAgICAgbWkubWltZVR5cGUgPSBgdmlkZW8veC1mbHY7IGNvZGVjcz1cIiR7bWkudmlkZW9Db2RlY30sJHttaS5hdWRpb0NvZGVjfVwiYFxuICAgICAgICAgICAgbWkuY29kZWMgPSBtaS5taW1lVHlwZS5yZXBsYWNlKCd4LWZsdicsICdtcDQnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtaS5taW1lVHlwZSA9IGB2aWRlby94LWZsdjsgY29kZWNzPVwiJHttaS5hdWRpb0NvZGVjfVwiYFxuICAgICAgICAgIG1pLmNvZGVjID0gbWkubWltZVR5cGUucmVwbGFjZSgneC1mbHYnLCAnbXA0JylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaS5pc0NvbXBsZXRlKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVNZWRpYUluZm9SZWFkeShtaSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYWNJbmZvLnBhY2tldFR5cGUgPT09IDEpIHsgLy8gQUFDIHJhdyBmcmFtZSBkYXRhXG4gICAgICAgIGxldCBkdHMgPSBzdG9yZS5zdGF0ZS50aW1lU3RhbXBCYXNlICsgdGhpcy5jdXJyZW50VGFnLmdldFRpbWUoKVxuICAgICAgICBsZXQgYWFjU2FtcGxlID0geyB1bml0OiBhYWNJbmZvLmRhdGEsIGxlbmd0aDogYWFjSW5mby5kYXRhLmJ5dGVMZW5ndGgsIGR0czogZHRzLCBwdHM6IGR0cyB9XG4gICAgICAgIHRyYWNrLnNhbXBsZXMucHVzaChhYWNTYW1wbGUpXG4gICAgICAgIHRyYWNrLmxlbmd0aCArPSBhYWNJbmZvLmRhdGEubGVuZ3RoXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldFN0YXR1cygpXG4gIH1cblxuICBfcGFyc2VBQUNBdWRpbyAoKSB7XG4gICAgaWYgKHRoaXMudW5yZWFkTGVuZ3RoIDw9IDEpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBhYWNEYXRhID0ge31cbiAgICBsZXQgYWFjQXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLmRhdGEuYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHRoaXMudW5yZWFkTGVuZ3RoKVxuICAgIGNvbnN0IHBhY2tldFR5cGUgPSBhYWNBcnJheVswXVxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgYWFjRGF0YS5wYWNrZXRUeXBlID0gcGFja2V0VHlwZVxuICAgIGlmICghcGFja2V0VHlwZSkge1xuICAgICAgY29uc3QgeyBwb3NpdGlvbiwgdGFnU2l6ZSB9ID0gdGhpcy5jdXJyZW50VGFnXG4gICAgICB0aGlzLl9zdG9yZS5tZXRhRW5kUG9zaXRpb24gPSBwb3NpdGlvbiArIEJ1ZmZlci5yZWFkQXNJbnQodGFnU2l6ZSkgKyA0XG4gICAgICBhYWNEYXRhLmRhdGEgPSB0aGlzLl9wYXJzZUFBQ0F1ZGlvU3BlY2lmaWNDb25maWcoKSAvLyBBQUMgU2VxdWVuY2UgaGVhZGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIGFhY0RhdGEuZGF0YSA9IGFhY0FycmF5LnNsaWNlKDEpXG4gICAgfVxuXG4gICAgcmV0dXJuIGFhY0RhdGFcbiAgfVxuICBfcGFyc2VBQUNBdWRpb1NwZWNpZmljQ29uZmlnICgpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldzRSZWFkKHRoaXMuZGF0YS5idWZmZXIsIHRoaXMpXG4gICAgY29uc3QgeyBnZXRBbmROdW0gfSA9IERhdGFWaWV3NFJlYWRcblxuICAgIGxldCByZXN1bHRPYmogPSB7XG4gICAgICBzYW1wbGluZ0ZyZXF1ZW5jeTogbnVsbCxcbiAgICAgIGV4dEF1ZGlvT2JqZWN0VHlwZTogbnVsbCxcbiAgICAgIGV4dEF1ZGlvU2FtcGxpbmdJZHg6IG51bGxcbiAgICB9XG4gICAgbGV0IGNvbmZpZyA9IHt9XG4gICAgY29uc3QgVUludDAgPSBkdi5nZXRVaW50OCgpXG4gICAgY29uc3QgVUludDEgPSBkdi5nZXRVaW50OCgpXG5cbiAgICBsZXQgdGVtcEF1ZGlvT2JqZWN0VHlwZVxuICAgIGxldCBhdWRpb09iamVjdFR5cGUgPSB0ZW1wQXVkaW9PYmplY3RUeXBlID0gVUludDAgPj4+IDMgLy8gVUludDVcbiAgICBsZXQgc2FtcGxpbmdJZHggPSAoKFVJbnQwICYgZ2V0QW5kTnVtKDUsIDcpKSA8PCAxKSB8IChVSW50MSA+Pj4gNykgLy8gVUludDRcbiAgICBpZiAoc2FtcGxpbmdJZHggPCAwIHx8IHNhbXBsaW5nSWR4ID4gc2FtcGxpbmdGcmVxdWVuY3lUeXBlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW1pdEVycm9yKCdkZWNvZGVyJywge1xuICAgICAgICBsaW5lOiAnMTQxJyxcbiAgICAgICAgaGFuZGxlOiAnX3BhcnNlQUFDQXVkaW9TcGVjaWZpY0NvbmZpZycsXG4gICAgICAgIG1zZzogYGludmFsaWQgc2FtcGxpbmdGcmVxdWVuY3lJbmRleCAke3NhbXBsaW5nSWR4fWBcbiAgICAgIH0pXG4gICAgICB0aGlzLmRpc3BhdGNoKEV2ZW50VHlwZXMuRVJST1IsIGBlcnJvciBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4OiAke3NhbXBsaW5nSWR4fWApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZXN1bHRPYmouc2FtcGxpbmdGcmVxdWVuY3kgPSBzYW1wbGluZ0ZyZXF1ZW5jeVR5cGVzW3NhbXBsaW5nSWR4XVxuXG4gICAgbGV0IGNoYW5uZWxDb3VudCA9IHJlc3VsdE9iai5jaGFubmVsQ291bnQgPSAoVUludDEgJiBnZXRBbmROdW0oMSwgNCkpID4+PiAzXG4gICAgaWYgKGNoYW5uZWxDb3VudCA8IDAgfHwgY2hhbm5lbENvdW50ID4gNykge1xuICAgICAgdGhpcy5lbWl0RXJyb3IoJ2RlY29kZXInLCB7XG4gICAgICAgIGxpbmU6ICcxNTQnLFxuICAgICAgICBoYW5kbGU6ICdfcGFyc2VBQUNBdWRpb1NwZWNpZmljQ29uZmlnJyxcbiAgICAgICAgbXNnOiBgaW52YWxpZCBBdWRpbyBDaGFubmVsIENvdW50OiAke2NoYW5uZWxDb3VudH1gXG4gICAgICB9KVxuICAgICAgdGhpcy5kaXNwYXRjaChFdmVudFR5cGVzLkVSUk9SLCBgZXJyb3IgQXVkaW8gQ2hhbm5lbCBDb3VudDogJHtjaGFubmVsQ291bnR9YClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChhdWRpb09iamVjdFR5cGUgPT09IDUpIHsgLy8gSEUtQUFDXG4gICAgICBjb25zdCBVSW50MiA9IGR2LmdldFVpbnQ4KClcbiAgICAgIHJlc3VsdE9iai5leHRBdWRpb1NhbXBsaW5nSWR4ID0gKChVSW50MSAmIGdldEFuZE51bSg1LCA3KSkgPDwgMSkgfCBVSW50MiA+Pj4gN1xuICAgICAgcmVzdWx0T2JqLmV4dEF1ZGlvT2JqZWN0VHlwZSA9IChVSW50MiAmIGdldEFuZE51bSgxLCA1KSkgPj4+IDJcbiAgICB9XG5cbiAgICBpZiAoc25pZmZlci5icm93c2VyID09PSBicm93c2VyVHlwZXMuRklSRV9GT1gpIHtcbiAgICAgIGlmIChzYW1wbGluZ0lkeCA+PSA2KSB7XG4gICAgICAgIC8vIEhFLUFBQyB1c2VzIFNCUiwgaGlnaCBmcmVxdWVuY2llcyBhcmUgY29uc3RydWN0ZWQgZnJvbSBsb3cgZnJlcXVlbmNpZXNcbiAgICAgICAgYXVkaW9PYmplY3RUeXBlID0gNVxuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoNClcbiAgICAgICAgcmVzdWx0T2JqLmV4dEF1ZGlvU2FtcGxpbmdJZHggPSBzYW1wbGluZ0lkeCAtIDNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDJcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpXG4gICAgICAgIHJlc3VsdE9iai5leHRBdWRpb1NhbXBsaW5nSWR4ID0gc2FtcGxpbmdJZHhcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNuaWZmZXIub3MuaXNBbmRyb2lkKSB7XG4gICAgICAvLyBBbmRyb2lkIDogYWx3YXlzIHVzZSBBQUNcbiAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDJcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKVxuICAgICAgcmVzdWx0T2JqLmV4dEF1ZGlvU2FtcGxpbmdJZHggPSBzYW1wbGluZ0lkeFxuICAgIH0gZWxzZSB7XG4gICAgICAvKiAgZm9yIG90aGVyIGJyb3dzZXJzIChDaHJvbWUvVml2YWxkaS9PcGVyYSAuLi4pXG4gICAgICAgICAgICAgICAgYWx3YXlzIGZvcmNlIGF1ZGlvIHR5cGUgdG8gYmUgSEUtQUFDIFNCUiwgYXMgc29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCBhdWRpbyBjb2RlYyBzd2l0Y2ggcHJvcGVybHkgKGxpa2UgQ2hyb21lIC4uLilcbiAgICAgICAgICAgICovXG4gICAgICBhdWRpb09iamVjdFR5cGUgPSA1XG4gICAgICByZXN1bHRPYmouZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSWR4XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoNClcblxuICAgICAgaWYgKHNhbXBsaW5nSWR4ID49IDYpIHtcbiAgICAgICAgcmVzdWx0T2JqLmV4dGVuc2lvblNhbXBsaW5nSWR4ID0gc2FtcGxpbmdJZHggLSAzXG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgICBhdWRpb09iamVjdFR5cGUgPSAyXG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKVxuICAgICAgICByZXN1bHRPYmouZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSWR4XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnWzBdID0gYXVkaW9PYmplY3RUeXBlIDw8IDNcbiAgICBjb25maWdbMF0gfD0gKHNhbXBsaW5nSWR4ICYgMHgwRSkgPj4gMVxuICAgIGNvbmZpZ1sxXSB8PSAoc2FtcGxpbmdJZHggJiAweDAxKSA8PCA3XG4gICAgY29uZmlnWzFdIHw9IGNoYW5uZWxDb3VudCA8PCAzXG4gICAgaWYgKGF1ZGlvT2JqZWN0VHlwZSA9PT0gNSkge1xuICAgICAgY29uZmlnWzFdIHw9IChyZXN1bHRPYmouZXh0QXVkaW9TYW1wbGluZ0lkeCAmIDB4MEUpID4+IDFcbiAgICAgIGNvbmZpZ1syXSA9IChyZXN1bHRPYmouZXh0ZW5zaW9uU2FtcGxpbmdJZHggJiAweDAxKSA8PCA3XG4gICAgICAvLyBhZHRzT2JqZWN0VHlwZSAoZm9yY2UgdG8gMiwgY2hyb21lIGlzIGNoZWNraW5nIHRoYXQgb2JqZWN0IHR5cGUgaXMgbGVzcyB0aGFuIDUgPz8/XG4gICAgICAvLyAgICBodHRwczovL2Nocm9taXVtLmdvb2dsZXNvdXJjZS5jb20vY2hyb21pdW0vc3JjLmdpdC8rL21hc3Rlci9tZWRpYS9mb3JtYXRzL21wNC9hYWMuY2NcbiAgICAgIGNvbmZpZ1syXSB8PSAyIDw8IDJcbiAgICAgIGNvbmZpZ1szXSA9IDBcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnLFxuICAgICAgc2FtcGxlRnJlcTogcmVzdWx0T2JqLnNhbXBsaW5nRnJlcXVlbmN5LFxuICAgICAgY2hhbm5lbENvdW50LFxuICAgICAgY29kZWM6IGBtcDRhLjQwLiR7YXVkaW9PYmplY3RUeXBlfWAsXG4gICAgICBtYW5pZmVzdENvZGVjOiBgbXA0YS40MC4ke3RlbXBBdWRpb09iamVjdFR5cGV9YFxuICAgIH1cbiAgfVxuXG4gIGluaXRBdWRpb01ldGEgKG1ldGEpIHtcbiAgICBjb25zdCB7IHN0YXRlLCBhdWRpb1RyYWNrOiB0cmFjayB9ID0gdGhpcy5fc3RvcmVcblxuICAgIG1ldGEuZHVyYXRpb24gPSBzdGF0ZS5kdXJhdGlvblxuICAgIG1ldGEudGltZVNjYWxlID0gc3RhdGUudGltZVNjYWxlXG4gICAgbWV0YS50eXBlID0gJ2F1ZGlvJ1xuICAgIG1ldGEuaWQgPSB0cmFjay5pZFxuXG4gICAgcmV0dXJuIG1ldGFcbiAgfVxuXG4gIHJlc2V0U3RhdHVzICgpIHtcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSBudWxsXG4gICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSAwXG4gIH1cbiAgZ2V0IGRhdGFTaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aFxuICB9XG5cbiAgZ2V0IHVucmVhZExlbmd0aCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNpemUgLSB0aGlzLnJlYWRPZmZzZXRcbiAgfVxufVxuIiwiaW1wb3J0IExvZyBmcm9tICcuLi8uLi91dGlscy9Mb2cnXG5pbXBvcnQgVHJhbnNDb2RlciBmcm9tICcuLi9UcmFuc0NvZGVyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVtdXhlciBleHRlbmRzIFRyYW5zQ29kZXIge1xuICBkaXNwYXRjaCAodHlwZSwgLi4ucGF5bG9hZCkge1xuICAgIGNvbnN0IHByZWZpeCA9ICdkZW11eGVyXydcbiAgICB0aGlzLl9vYnNlcnZlci5lbWl0KGAke3ByZWZpeH0ke3R5cGV9YCwgLi4ucGF5bG9hZClcbiAgfVxuICBlcnJvciAobWVzc2FnZSkge1xuICAgIGNvbnN0IHsgQ0xBU1NfTkFNRSA9ICdEZW11eGVyJyB9ID0gdGhpc1xuICAgIExvZy5lcnJvcihgWyR7Q0xBU1NfTkFNRX0gZXJyb3JdIGAsIG1lc3NhZ2UpXG4gIH1cblxuICBpbmZvIChtZXNzYWdlKSB7XG4gICAgY29uc3QgeyBDTEFTU19OQU1FID0gJ0RlbXV4ZXInIH0gPSB0aGlzXG4gICAgTG9nLmluZm8oYFske0NMQVNTX05BTUV9IGluZm9dIGAsIG1lc3NhZ2UpXG4gIH1cblxuICBsb2cgKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IENMQVNTX05BTUUgPSAnRGVtdXhlcicgfSA9IHRoaXNcbiAgICBMb2cubG9nKGBbJHtDTEFTU19OQU1FfSBsb2ddIGAsIG1lc3NhZ2UpXG4gIH1cblxuICB3YXJuIChtZXNzYWdlKSB7XG4gICAgY29uc3QgeyBDTEFTU19OQU1FID0gJ0RlbXV4ZXInIH0gPSB0aGlzXG4gICAgTG9nLndhcm4oYFske0NMQVNTX05BTUV9IHdhcm5dIGAsIG1lc3NhZ2UpXG4gIH1cbn1cbiIsImltcG9ydCB7IE1ldGFUeXBlcyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgVVRGOCBmcm9tICcuLi8uLi91dGlscy9VVEY4JztcbmltcG9ydCBEZW11eGVyIGZyb20gJy4vRGVtdXhlcic7XG5cbi8qKlxuICogbWV0YeS/oeaBr+ino+aekFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXRhRGVtdXhlciBleHRlbmRzIERlbXV4ZXIge1xuICAgIGNvbnN0cnVjdG9yIChzdG9yZSkge1xuICAgICAgICBzdXBlcihzdG9yZSk7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgfVxuICAgIGdldCBpc0xlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlLmlzTGU7XG4gICAgfVxuICAgIHJlc29sdmUgKG1ldGEsIHNpemUpIHtcbiAgICAgICAgaWYgKHNpemUgPCAzKSB7XG4gICAgICAgICAgICB0aHJvdyAnbm90IGVub3VnaCBkYXRhIGZvciBtZXRhaW5mbyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWV0YURhdGEgPSB7fTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUobWV0YSwgc2l6ZSAtIG5hbWUuYm9keVNpemUpO1xuICAgICAgICBtZXRhRGF0YVtuYW1lLmRhdGFdID0gdmFsdWUuZGF0YTtcblxuICAgICAgICB0aGlzLnJlc2V0U3RhdHVzKCk7XG4gICAgICAgIHJldHVybiBtZXRhRGF0YTtcbiAgICB9XG5cbiAgICByZXNldFN0YXR1cyAoKSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgfVxuXG4gICAgcGFyc2VTdHJpbmcgKGJ1ZmZlcikge1xuICAgICAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCk7XG4gICAgICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQxNigwLCAhdGhpcy5pc0xlKTtcbiAgICAgICAgbGV0IHN0ciA9ICcnO1xuICAgICAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0ciA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaXplID0gc3RyTGVuICsgMjtcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHNpemU7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBzdHIsXG4gICAgICAgICAgICBib2R5U2l6ZTogc3RyTGVuICsgMixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwYXJzZURhdGUgKGJ1ZmZlciwgc2l6ZSkge1xuICAgICAgICBjb25zdCB7IGlzTGUgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBzaXplKTtcbiAgICAgICAgbGV0IHRzID0gZHYuZ2V0RmxvYXQ2NCgwLCAhaXNMZSk7XG4gICAgICAgIGNvbnN0IHRpbWVPZmZzZXQgPSBkdi5nZXRJbnQxNig4LCAhaXNMZSk7XG4gICAgICAgIHRzICs9IHRpbWVPZmZzZXQgKiA2MCAqIDEwMDA7XG5cbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDEwO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogbmV3IERhdGUodHMpLFxuICAgICAgICAgICAgYm9keVNpemU6IDEwLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHBhcnNlT2JqZWN0IChidWZmZXIsIHNpemUpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyLCBzaXplKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZS5kYXRhLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZS5kYXRhLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHlTaXplOiBuYW1lLmJvZHlTaXplICsgdmFsdWUuYm9keVNpemUsXG4gICAgICAgICAgICBpc09iakVuZDogdmFsdWUuaXNPYmpFbmQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcGFyc2VMb25nU3RyaW5nIChidWZmZXIpIHtcbiAgICAgICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQpO1xuICAgICAgICBjb25zdCBzdHJMZW4gPSBkdi5nZXRVaW50MzIoMCwgIXRoaXMuaXNMZSk7XG4gICAgICAgIGxldCBzdHIgPSAnJztcbiAgICAgICAgaWYgKHN0ckxlbiA+IDApIHtcbiAgICAgICAgICAgIHN0ciA9IFVURjguZGVjb2RlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0ICsgMiwgc3RyTGVuKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHIgPSAnJztcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zdCBzaXplID0gc3RyTGVuICsgNDtcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHN0ckxlbiArIDQ7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBzdHIsXG4gICAgICAgICAgICBib2R5U2l6ZTogc3RyTGVuICsgNCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDop6PmnpBtZXRh5Lit55qE5Y+Y6YePXG4gICAgICovXG4gICAgcGFyc2VWYWx1ZSAoZGF0YSwgc2l6ZSkge1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKCk7XG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIGJ1ZmZlciA9IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidWZmZXIgPSBkYXRhLmJ1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGlzTGUgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIE5VTUJFUixcbiAgICAgICAgICAgIEJPT0xFQU4sXG4gICAgICAgICAgICBTVFJJTkcsXG4gICAgICAgICAgICBPQkpFQ1QsXG4gICAgICAgICAgICBNSVhfQVJSQVksXG4gICAgICAgICAgICBPQkpFQ1RfRU5ELFxuICAgICAgICAgICAgU1RSSUNUX0FSUkFZLFxuICAgICAgICAgICAgREFURSxcbiAgICAgICAgICAgIExPTkVfU1RSSU5HLFxuICAgICAgICB9ID0gTWV0YVR5cGVzO1xuICAgICAgICBjb25zdCBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCwgc2l6ZSk7XG4gICAgICAgIGxldCBpc09iakVuZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB0eXBlID0gZGF0YVZpZXcuZ2V0VWludDgoMCk7XG4gICAgICAgIGxldCBvZmZzZXQgPSAxO1xuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMTtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTlVNQkVSOiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhVmlldy5nZXRGbG9hdDY0KDEsICFpc0xlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gODtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gODtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQk9PTEVBTjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvb2xOdW0gPSBkYXRhVmlldy5nZXRVaW50OCgxKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICEhYm9vbE51bTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU1RSSU5HOiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RyID0gdGhpcy5wYXJzZVN0cmluZyhidWZmZXIpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc3RyLmRhdGE7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IHN0ci5ib2R5U2l6ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgT0JKRUNUOiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB7fTtcbiAgICAgICAgICAgICAgICBsZXQgb2JqRW5kU2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQzMihzaXplIC0gNCwgIWlzTGUpICYgMHgwMEZGRkZGRikge1xuICAgICAgICAgICAgICAgICAgICBvYmpFbmRTaXplID0gMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yZWFkT2Zmc2V0ICs9IG9mZnNldCAtIDE7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldCA8IHNpemUgLSA0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW1mT2JqID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFtZk9iai5pc09iamVjdEVuZCkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVthbWZPYmouZGF0YS5uYW1lXSA9IGFtZk9iai5kYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gYW1mT2JqLmJvZHlTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcmsgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmsgPT09IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIE1JWF9BUlJBWToge1xuICAgICAgICAgICAgICAgIHZhbHVlID0ge307XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwO1xuICAgICAgICAgICAgICAgIGlmICgoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSA9PT0gOSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpFbmRTaXplID0gMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW1mVmFyID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFtZlZhci5pc09iamVjdEVuZCkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVthbWZWYXIuZGF0YS5uYW1lXSA9IGFtZlZhci5kYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gYW1mVmFyLmJvZHlTaXplO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPD0gc2l6ZSAtIDMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya2VyID0gZGF0YVZpZXcuZ2V0VWludDMyKG9mZnNldCAtIDEsICFpc0xlKSAmIDB4MDBGRkZGRkY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXIgPT09IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgT0JKRUNUX0VORDoge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpc09iakVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgU1RSSUNUX0FSUkFZOiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJMZW5ndGggPSBkYXRhVmlldy5nZXRVaW50MzIoMSwgIWlzTGUpO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSA0O1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA0O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaChzY3JpcHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSBzY3JpcHQuYm9keVNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIERBVEU6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5wYXJzZURhdGUoYnVmZmVyLCBzaXplIC0gMSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRlLmRhdGE7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGRhdGUuYm9keVNpemU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgTE9ORV9TVFJJTkc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb25nU3RyID0gdGhpcy5wYXJzZUxvbmdTdHJpbmcoYnVmZmVyLCBzaXplIC0gMSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBsb25nU3RyLmRhdGE7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGxvbmdTdHIuYm9keVNpemU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBzaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICAgICAgYm9keVNpemU6IG9mZnNldCxcbiAgICAgICAgICAgIGlzT2JqRW5kOiBpc09iakVuZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cblxuIiwiaW1wb3J0IERlbXV4ZXIgZnJvbSAnLi9EZW11eGVyJ1xuaW1wb3J0IE1ldGFEZW11eGVyIGZyb20gJy4vTWV0YURlbXV4ZXInXG5pbXBvcnQgVmlkZW9EZW11eGVyIGZyb20gJy4vVmlkZW9EZW11eGVyJ1xuaW1wb3J0IEF1ZGlvRGVtdXhlciBmcm9tICcuL0F1ZGlvRGVtdXhlcidcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi4vLi4vdXRpbHMvTG9nJ1xuaW1wb3J0IG1ldGFGaWVsZHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL21ldGFGaWVsZHMnXG5cbmNvbnN0IG5hdGl2ZUhhc1Byb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhZ2RlbXV4IGV4dGVuZHMgRGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yIChzdG9yZSkge1xuICAgIHN1cGVyKHN0b3JlKVxuICAgIHRoaXMuQ0xBU1NfTkFNRSA9IHRoaXMuY29uc3RydWN0b3IubmFtZVxuICAgIHRoaXMuX21ldGFEZW11eGVyID0gbmV3IE1ldGFEZW11eGVyKHN0b3JlKVxuICAgIHRoaXMuX3ZpZGVvRGVtdXhlciA9IG5ldyBWaWRlb0RlbXV4ZXIoc3RvcmUpXG4gICAgdGhpcy5fYXVkaW9EZW11eGVyID0gbmV3IEF1ZGlvRGVtdXhlcihzdG9yZSlcbiAgICB0aGlzLl9maXJzdFBhcnNlID0gdHJ1ZVxuICAgIHRoaXMuX2RhdGFPZmZzZXQgPSAwXG4gICAgdGhpcy5oYW5kbGVNZWRpYUluZm9SZWFkeSA9ICgpID0+IHt9XG4gICAgdGhpcy5oYW5kbGVEYXRhUmVhZHkgPSAoKSA9PiB7fVxuICAgIHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeSA9ICgpID0+IHt9XG4gIH1cbiAgc2V0RXZlbnRCaW5kICgpIHtcbiAgICB0aGlzLl92aWRlb0RlbXV4ZXIuaGFuZGxlRGF0YVJlYWR5ID0gdGhpcy5oYW5kbGVEYXRhUmVhZHlcbiAgICB0aGlzLl92aWRlb0RlbXV4ZXIuaGFuZGxlTWV0YURhdGFSZWFkeSA9IHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeVxuICAgIHRoaXMuX3ZpZGVvRGVtdXhlci5oYW5kbGVNZWRpYUluZm9SZWFkeSA9IHRoaXMuaGFuZGxlTWVkaWFJbmZvUmVhZHlcbiAgICB0aGlzLl9hdWRpb0RlbXV4ZXIuaGFuZGxlRGF0YVJlYWR5ID0gdGhpcy5oYW5kbGVEYXRhUmVhZHlcbiAgICB0aGlzLl9hdWRpb0RlbXV4ZXIuaGFuZGxlTWV0YURhdGFSZWFkeSA9IHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeVxuICAgIHRoaXMuX2F1ZGlvRGVtdXhlci5oYW5kbGVNZWRpYUluZm9SZWFkeSA9IHRoaXMuaGFuZGxlTWVkaWFJbmZvUmVhZHlcbiAgfVxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9tZXRhRGVtdXhlciA9IG51bGxcbiAgICB0aGlzLl92aWRlb0RlbXV4ZXIgPSBudWxsXG4gICAgdGhpcy5fYXVkaW9EZW11eGVyID0gbnVsbFxuICB9XG5cbiAgcmVzb2x2ZVRhZ3MgKCkge1xuICAgIGNvbnN0IHt0YWdzfSA9IHRoaXMuX3N0b3JlLnN0YXRlXG5cbiAgICBjb25zdCB7X3N0b3JlOiBzdG9yZX0gPSB0aGlzXG4gICAgY29uc3Qge3ZpZGVvVHJhY2ssIGF1ZGlvVHJhY2t9ID0gc3RvcmVcblxuICAgIHRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICB0aGlzLnJlc29sdmVUYWcodGFnKVxuICAgIH0pXG5cbiAgICBpZiAodGhpcy5fc3RvcmUuaGFzSW5pdGlhbE1ldGFEaXNwYXRjaGVkKSB7XG4gICAgICBpZiAodmlkZW9UcmFjay5sZW5ndGggfHwgYXVkaW9UcmFjay5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVEYXRhUmVhZHkoYXVkaW9UcmFjaywgdmlkZW9UcmFjaylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9zdG9yZS5zdGF0ZS50YWdzID0gW11cbiAgfVxuXG4gIHJlc29sdmVUYWcgKHRhZykge1xuICAgIHN3aXRjaCAoU3RyaW5nKHRhZy50YWdUeXBlKSkge1xuICAgICAgY2FzZSAnOCc6IC8vIGF1ZGlvXG4gICAgICAgIHRoaXMuX3Jlc29sdmVBdWRpb1RhZyh0YWcpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICc5JzogLy8gdmlkZW9cbiAgICAgICAgdGhpcy5fcmVzb2x2ZVZpZGVvVGFnKHRhZylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJzE4JzogLy8gbWV0YWRhdGFcbiAgICAgICAgdGhpcy5fcmVzb2x2ZU1ldGFUYWcodGFnKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIF9yZXNvbHZlQXVkaW9UYWcgKHRhZykge1xuICAgIGlmICh0YWcuYm9keVNpemUgPD0gMSkge1xuICAgICAgdGhpcy53YXJuKCdOb3QgZW5vdWdoIGRhdGEgZm9yIGF1ZGlvIHRhZyBib2R5JylcbiAgICB9XG4gICAgdGhpcy5fYXVkaW9EZW11eGVyLnJlc29sdmUodGFnKVxuICB9XG5cbiAgX3Jlc29sdmVWaWRlb1RhZyAodGFnKSB7XG4gICAgaWYgKHRhZy5ib2R5U2l6ZSA8PSAxKSB7XG4gICAgICB0aGlzLmVycm9yKCdOb3QgZW5vdWdoIGRhdGEgZm9yIHZpZGVvIHRhZyBib2R5JylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7X2hhc1ZpZGVvLCBoYXNWaWRlb0ZsYWdPdmVycmlkZWR9ID0gdGhpc1xuICAgIGlmIChoYXNWaWRlb0ZsYWdPdmVycmlkZWQgJiYgIV9oYXNWaWRlbykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fdmlkZW9EZW11eGVyLnJlc29sdmUodGFnKVxuICB9XG5cbiAgX2luaXRNZXRhRGF0YSAobWV0YURhdGEpIHtcbiAgICBjb25zdCB7X3N0b3JlOiBzfSA9IHRoaXNcbiAgICBpZiAobmF0aXZlSGFzUHJvcC5jYWxsKG1ldGFEYXRhLCAnb25NZXRhRGF0YScpKSB7XG4gICAgICBpZiAocy5oYXNNZXRhRGF0YSkge1xuICAgICAgICBMb2dnZXIubG9nKGBbJHt0aGlzLkNMQVNTX05BTUV9XWAsICdmb3VuZCBhbm90aGVyIG1ldGEgdGFnJylcbiAgICAgIH1cbiAgICAgIHMubWV0YURhdGEgPSBtZXRhRGF0YVxuICAgICAgY29uc3Qgb25NZXRhRGF0YSA9IG1ldGFEYXRhLm9uTWV0YURhdGFcblxuICAgICAgbWV0YUZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgY29uc3Qge25hbWUsIHR5cGUsIHBhcnNlciwgb25UeXBlRXJyfSA9IGZpZWxkXG4gICAgICAgIGlmIChPYmplY3Qob25NZXRhRGF0YVtuYW1lXSkgaW5zdGFuY2VvZiB0eXBlKSB7XG4gICAgICAgICAgcGFyc2VyLmNhbGwodGhpcywgcywgb25NZXRhRGF0YSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAob25UeXBlRXJyICYmIG9uVHlwZUVyciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBvblR5cGVFcnIocywgb25NZXRhRGF0YSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuX3N0b3JlLm1lZGlhSW5mby5fbWV0YURhdGEgPSBtZXRhRGF0YVxuICAgICAgLy8g5ZCM5q2l5Yiw5YWx5Lqrc3RvcmVcbiAgICAgIGlmICh0aGlzLl9zdG9yZS5tZWRpYUluZm8uaXNDb21wbGV0ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZU1lZGlhSW5mb1JlYWR5KHRoaXMuX3N0b3JlLm1lZGlhSW5mbylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfcmVzb2x2ZU1ldGFUYWcgKHRhZykge1xuICAgIGNvbnN0IHtib2R5fSA9IHRhZ1xuICAgIGNvbnN0IG1ldGFPYmogPSB0aGlzLl9tZXRhRGVtdXhlci5yZXNvbHZlKGJvZHksIGJvZHkubGVuZ3RoKVxuICAgIHRoaXMuX2luaXRNZXRhRGF0YShtZXRhT2JqKVxuICB9XG5cbiAgX3BhcnNlS2V5ZnJhbWVzIChrZXlmcmFtZXMpIHtcbiAgICBsZXQgdGltZXMgPSBbXVxuICAgIGxldCBmaWxlUG9zaXRpb25zID0gW11cbiAgICBjb25zdCB7dmlkZW9UaW1lU2NhbGUsIHN0YXRlfSA9IHRoaXMuX3N0b3JlXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBrZXlmcmFtZXMudGltZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRpbWVzW3RpbWVzLmxlbmd0aF0gPSBzdGF0ZS50aW1lU3RhbXBCYXNlICsgTWF0aC5mbG9vcihrZXlmcmFtZXMudGltZXNbaV0gKiB2aWRlb1RpbWVTY2FsZSlcbiAgICAgIGZpbGVQb3NpdGlvbnNbZmlsZVBvc2l0aW9ucy5sZW5ndGhdID0ga2V5ZnJhbWVzLmZpbGVwb3NpdGlvbnNbaV1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGltZXMsXG4gICAgICBmaWxlUG9zaXRpb25zXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRGVtdXhlciBmcm9tICcuL0RlbXV4ZXInXG5pbXBvcnQgU1BTUGFyc2VyIGZyb20gJy4uL1NQU1BhcnNlcidcbmltcG9ydCBEYXRhVmlldzRSZWFkIGZyb20gJy4uLy4uL3V0aWxzL0RhdGFWaWV3NFJlYWQnXG5pbXBvcnQgeyBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJ1xuaW1wb3J0IEJ1ZmZlciBmcm9tICcuLi8uLi93cml0ZS9CdWZmZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb0RlbXV4ZXIgZXh0ZW5kcyBEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgc3VwZXIoc3RvcmUpXG4gICAgdGhpcy5DTEFTU19OQU1FID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gMFxuICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KDApXG4gICAgdGhpcy5jdXJyZW50VGFnID0gbnVsbFxuICAgIHRoaXMuX3N0b3JlLnZpZGVvTWV0YURhdGEgPSBudWxsXG4gIH1cblxuICByZXNldFN0YXR1cyAoKSB7XG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gMFxuICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KDApXG4gICAgdGhpcy5jdXJyZW50VGFnID0gbnVsbFxuICB9XG5cbiAgcmVzb2x2ZSAodGFnKSB7XG4gICAgdGhpcy5kYXRhID0gdGFnLmJvZHlcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSB0YWdcbiAgICBjb25zdCBmaXJzdFVJOCA9IHRoaXMucmVhZERhdGEoMSlbMF1cbiAgICBjb25zdCBmcmFtZVR5cGUgPSAoZmlyc3RVSTggJiAweEYwKSA+Pj4gNFxuICAgIGNvbnN0IGNvZGVjSWQgPSBmaXJzdFVJOCAmIDB4MEZcbiAgICBpZiAoY29kZWNJZCAhPT0gNykge1xuICAgICAgLyoqIDE6IEpQRUdcbiAgICAgICAgICAgICogMjogSDI2M1xuICAgICAgICAgICAgKiAzOiBTY3JlZW4gdmlkZW9cbiAgICAgICAgICAgICogNDogT24yIFZQNlxuICAgICAgICAgICAgKiA1OiBPbjIgVlA2XG4gICAgICAgICAgICAqIDY6IFNjcmVlbiB2aWRlb3ZlcnNpb24gMlxuICAgICAgICAgICAgKiA3OiBBVkNcbiAgICAgICAgICAgICovXG4gICAgICB0aGlzLmVycm9yKGB1bnN1cHBvcnRlZCBjb2RlY0lkOiAke2NvZGVjSWR9YClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLl9wYXJzZUFWQ1BhY2tldChmcmFtZVR5cGUpXG5cbiAgICB0aGlzLnJlc2V0U3RhdHVzKClcbiAgfVxuXG4gIF9wYXJzZUFWQ1BhY2tldCAoZnJhbWVUeXBlKSB7XG4gICAgaWYgKHRoaXMudW5yZWFkTGVuZ3RoIDwgNCkge1xuICAgICAgdGhpcy5lcnJvcignSW52YWxpZCBBdmMgVGFnJylcbiAgICB9XG4gICAgY29uc3QgaXNMZSA9IHRoaXMuX3N0b3JlLmlzTGVcbiAgICBjb25zdCB7IGJ1ZmZlciB9ID0gdGhpcy5kYXRhXG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHRoaXMudW5yZWFkTGVuZ3RoKVxuICAgIGNvbnN0IHBhY2thZ2VUeXBlID0gZHYuZ2V0VWludDgoMClcblxuICAgIGxldCBjcHNUaW1lID0gZHYuZ2V0VWludDMyKDAsICFpc0xlKSAmIDB4MDBGRkZGRkZcbiAgICBjcHNUaW1lID0gKGNwc1RpbWUgPDwgOCkgPj4gOFxuICAgIHRoaXMucmVhZE9mZnNldCArPSA0XG5cbiAgICBzd2l0Y2ggKHBhY2thZ2VUeXBlKSB7XG4gICAgICBjYXNlIDA6IHtcbiAgICAgICAgY29uc3QgeyBwb3NpdGlvbiwgdGFnU2l6ZSB9ID0gdGhpcy5jdXJyZW50VGFnXG5cbiAgICAgICAgdGhpcy5fc3RvcmUubWV0YUVuZFBvc2l0aW9uID0gcG9zaXRpb24gKyBCdWZmZXIucmVhZEFzSW50KHRhZ1NpemUpICsgNCAvLyDnvJPlrZhzY3JpcHRUYWfnu5PmnZ/nmoTkvY3nva7vvIxyZXBsYXnkvb/nlKhcbiAgICAgICAgdGhpcy5fcGFyc2VBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZCgpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIDE6IHtcbiAgICAgICAgdGhpcy5fcGFyc2VBVkNWaWRlb0RhdGEoZnJhbWVUeXBlLCBjcHNUaW1lKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAyOiB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIC8vIOaKpemUmVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9wYXJzZUFWQ0RlY29kZXJDb25maWd1cmF0aW9uUmVjb3JkICgpIHtcbiAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPCA3KSB7XG4gICAgICB0aGlzLmVycm9yKCdJbnZhbGlkIEFWQ0RlY29kZXJDb25maWd1cmF0aW9uUmVjb3JkLCBsYWNrIG9mIGRhdGEhJylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHsgbWVkaWFJbmZvOiBtaSB9ID0gdGhpcy5fc3RvcmVcbiAgICAvLyBzdGFzaCBvZmZzZXQmdW5yZWFkU2l6ZSBiZWZvcmUgcGFyc2luZyBzcHMmcHBzXG4gICAgLy8gY29uc3QgdGVtcE9mZnNldCA9IHRoaXMucmVhZE9mZnNldFxuICAgIC8vIGNvbnN0IHRlbXBVbnJlYWRMZW5ndGggPSB0aGlzLnVucmVhZExlbmd0aFxuXG4gICAgY29uc3QgeyBfc3RvcmU6IHN0b3JlIH0gPSB0aGlzXG4gICAgbGV0IG1ldGEgPSB0aGlzLl9zdG9yZS52aWRlb01ldGFEYXRhXG4gICAgbGV0IHRyYWNrID0gdGhpcy5fc3RvcmUudmlkZW9UcmFja1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3NFJlYWQodGhpcy5kYXRhLmJ1ZmZlciwgdGhpcylcbiAgICBpZiAobWV0YSkge1xuICAgICAgaWYgKG1ldGEuYXZjYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZXJyb3IoJ2ZvdW5kIGFub3RoZXIgQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQhJylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFzdG9yZS5zdGF0ZS5faGFzVmlkZW8gJiYgIXN0b3JlLnN0YXRlLmhhc1ZpZGVvRmxhZ092ZXJyaWRlZCkge1xuICAgICAgICBzdG9yZS5zdGF0ZS5faGFzVmlkZW8gPSB0cnVlXG4gICAgICAgIHN0b3JlLl9tZWRpYUluZm8uaGFzVmlkZW8gPSB0cnVlXG4gICAgICB9XG4gICAgICBtZXRhID0gc3RvcmUudmlkZW9NZXRhRGF0YSA9IHt9XG4gICAgICBtZXRhLnR5cGUgPSAndmlkZW8nXG4gICAgICBtZXRhLmlkID0gdHJhY2suaWRcbiAgICAgIG1ldGEudGltZVNjYWxlID0gc3RvcmUudmlkZW9UaW1lU2NhbGVcbiAgICAgIG1ldGEuZHVyYXRpb24gPSBzdG9yZS5zdGF0ZS5kdXJhdGlvblxuICAgICAgbWkudGltZXNjYWxlID0gc3RvcmUudmlkZW9UaW1lU2NhbGVcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJzaW9uID0gZHYuZ2V0VWludDgoKVxuICAgIGNvbnN0IGF2Y1Byb2ZpbGUgPSBkdi5nZXRVaW50OCgpXG4gICAgZHYuZ2V0VWludDgoKVxuICAgIGR2LmdldFVpbnQ4KClcbiAgICBpZiAodmVyc2lvbiAhPT0gMSB8fCBhdmNQcm9maWxlID09PSAwKSB7XG4gICAgICAvLyDlpITnkIbplJnor69cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG5hbHVMZW5ndGhTaXplID0gc3RvcmUuc3RhdGUubmFsdUxlbmd0aFNpemUgPSBkdi5nZXRVaW50KDIsIHRoaXMucmVhZE9mZnNldCwgZmFsc2UpICsgMVxuICAgIGlmIChuYWx1TGVuZ3RoU2l6ZSAhPT0gMyAmJiBuYWx1TGVuZ3RoU2l6ZSAhPT0gNCkge1xuICAgICAgLy8g5aSE55CG6ZSZ6K+vXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBzcHNMZW5ndGggPSBkdi5nZXRVaW50KDUsIG51bGwsIGZhbHNlKVxuICAgIGlmIChzcHNMZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZW1pdEVycm9yKCdkZWNvZGVyJywge1xuICAgICAgICBsaW5lOiAxMjgsXG4gICAgICAgIGhhbmRsZXI6ICdfcGFyc2VBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZCcsXG4gICAgICAgIG1zZzogJ25vIHNwcyBpbiB0aGlzIHZpZGVvJ1xuICAgICAgfSlcbiAgICAgIC8vIOWkhOeQhumUmeivr1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChzcHNMZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmVtaXRFcnJvcignZGVjb2RlcicsIHtcbiAgICAgICAgbGluZTogMTMyLFxuICAgICAgICBoYW5kbGVyOiAnX3BhcnNlQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQnLFxuICAgICAgICBtc2c6ICdzcHNMZW5ndGggPiAxJ1xuICAgICAgfSlcbiAgICAgIHRoaXMud2FybignQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQ6IHNwc0xlbmd0aCA+IDEnKVxuICAgIH1cbiAgICBsZXQgc3BzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcHNMZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGVuID0gZHYuZ2V0VWludDE2KClcblxuICAgICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgc3BzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5kYXRhLmJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBsZW4pXG4gICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gbGVuXG4gICAgICBjb25zdCBzcHNDb25maWcgPSBTUFNQYXJzZXIucGFyc2VTUFMoc3BzKVxuXG4gICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvZGVjU2l6ZSxcbiAgICAgICAgcHJlc2VudFNpemUsXG4gICAgICAgIHByb2ZpbGVTdHJpbmcsXG4gICAgICAgIGxldmVsU3RyaW5nLFxuICAgICAgICBjaHJvbWFGb3JtYXQsXG4gICAgICAgIHBpeGVsUmF0aW8sXG4gICAgICAgIGZyYW1lUmF0ZSxcbiAgICAgICAgcmVmRnJhbWVzLFxuICAgICAgICBiaXREZXB0aFxuICAgICAgfSA9IHNwc0NvbmZpZ1xuXG4gICAgICBtZXRhLndpZHRoID0gY29kZWNTaXplLndpZHRoXG4gICAgICBtZXRhLmhlaWdodCA9IGNvZGVjU2l6ZS5oZWlnaHRcbiAgICAgIG1ldGEucHJlc2VudFdpZHRoID0gcHJlc2VudFNpemUud2lkdGhcbiAgICAgIG1ldGEucHJlc2VudEhlaWdodCA9IHByZXNlbnRTaXplLmhlaWdodFxuXG4gICAgICBtZXRhLnByb2ZpbGUgPSBwcm9maWxlU3RyaW5nXG4gICAgICBtZXRhLmxldmVsID0gbGV2ZWxTdHJpbmdcbiAgICAgIC8vIG1ldGEucHJvZmlsZUNvbXBhdGliaWxpdHkgPSBwcm9maWxlQ29tcGF0aWJpbGl0eTtcbiAgICAgIC8vIG1ldGEubmFsdUxlbmd0aFNpemUgPSBuYWx1TGVuZ3RoU2l6ZTtcblxuICAgICAgbWV0YS5iaXREZXB0aCA9IGJpdERlcHRoXG4gICAgICBtZXRhLmNocm9tYUZvcm1hdCA9IGNocm9tYUZvcm1hdFxuICAgICAgbWV0YS5waXhlbFJhdGlvID0gcGl4ZWxSYXRpb1xuICAgICAgbWV0YS5mcmFtZVJhdGUgPSBmcmFtZVJhdGVcblxuICAgICAgaWYgKCFmcmFtZVJhdGUuZml4ZWQgfHxcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGUuZnBzTnVtID09PSAwIHx8XG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlLmZwc0RlbiA9PT0gMCkge1xuICAgICAgICBtZXRhLmZyYW1lUmF0ZSA9IHN0b3JlLnJlZmVyRnJhbWVSYXRlXG4gICAgICB9XG5cbiAgICAgIGxldCB7IGZwc0RlbiwgZnBzTnVtIH0gPSBtZXRhLmZyYW1lUmF0ZVxuICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IG1ldGEudGltZVNjYWxlICogKGZwc0RlbiAvIGZwc051bSlcblxuICAgICAgbGV0IGNvZGVjQXJyID0gc3BzLnN1YmFycmF5KDEsIDQpXG4gICAgICBsZXQgY29kZWNTdHIgPSAnYXZjMS4nXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICBsZXQgaGV4ID0gY29kZWNBcnJbal0udG9TdHJpbmcoMTYpXG4gICAgICAgIGhleCA9IGhleC5wYWRTdGFydCgyLCAnMCcpXG4gICAgICAgIGNvZGVjU3RyICs9IGhleFxuICAgICAgfVxuXG4gICAgICBtZXRhLmNvZGVjID0gY29kZWNTdHJcblxuICAgICAgY29uc3QgeyBtZWRpYUluZm86IG1pIH0gPSB0aGlzLl9zdG9yZVxuICAgICAgbWkud2lkdGggPSBtZXRhLndpZHRoXG4gICAgICBtaS5oZWlnaHQgPSBtZXRhLmhlaWdodFxuICAgICAgbWkuZnBzID0gbWV0YS5mcmFtZVJhdGUuZnBzXG4gICAgICBtaS5wcm9maWxlID0gbWV0YS5wcm9maWxlXG4gICAgICBtaS5sZXZlbCA9IG1ldGEubGV2ZWxcbiAgICAgIG1pLnJlZkZyYW1lcyA9IHJlZkZyYW1lc1xuICAgICAgbWkucGl4ZWxSYXRpbyA9IHBpeGVsUmF0aW9cbiAgICAgIG1pLnZpZGVvQ29kZWMgPSBjb2RlY1N0clxuICAgICAgbWkuY2hyb21hRm9ybWF0ID0gY2hyb21hRm9ybWF0XG4gICAgICBpZiAobWkuaGFzQXVkaW8pIHtcbiAgICAgICAgaWYgKG1pLmF1ZGlvQ29kZWMpIHtcbiAgICAgICAgICBtaS5taW1lVHlwZSA9IGB2aWRlby94LWZsdjsgY29kZWNzPVwiJHttaS52aWRlb0NvZGVjfSwke21pLmF1ZGlvQ29kZWN9XCJgXG4gICAgICAgICAgbWkuY29kZWMgPSBtaS5taW1lVHlwZS5yZXBsYWNlKCd4LWZsdicsICdtcDQnKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtaS5taW1lVHlwZSA9IGB2aWRlby94LWZsdjsgY29kZWNzPVwiJHttaS52aWRlb0NvZGVjfVwiYFxuICAgICAgICBtaS5jb2RlYyA9IG1pLm1pbWVUeXBlLnJlcGxhY2UoJ3gtZmx2JywgJ21wNCcpXG4gICAgICB9XG5cbiAgICAgIGlmIChtaS5pc0NvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlTWVkaWFJbmZvUmVhZHkobWkpXG4gICAgICB9XG4gICAgfVxuICAgIGxldCBwcHNcbiAgICBjb25zdCBwcHNDb3VudCA9IGR2LmdldFVpbnQ4KClcbiAgICBpZiAoIXBwc0NvdW50KSB7XG4gICAgICB0aGlzLmVtaXRFcnJvcignZGVjb2RlcicsIHtcbiAgICAgICAgbGluZTogMjI3LFxuICAgICAgICBoYW5kbGVyOiAnX3BhcnNlQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQnLFxuICAgICAgICBtc2c6ICdubyBwcHMgaW4gdGhpcyB2aWRlbydcbiAgICAgIH0pXG4gICAgICB0aGlzLmRpc3BhdGNoKEV2ZW50VHlwZXMuRVJST1IsICdubyBwcHMgaW4gdGhpcyB2aWRlbycpXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKHBwc0NvdW50ID4gMSkge1xuICAgICAgdGhpcy53YXJuKGBBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZCBoYXMgcHBzQ291bnQ6ICR7cHBzQ291bnR9YClcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBwc0NvdW50OyBpKyspIHtcbiAgICAgIGxldCBwcHNTaXplID0gZHYuZ2V0VWludDE2KClcblxuICAgICAgaWYgKCFwcHNTaXplKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHBwcyA9IG5ldyBVaW50OEFycmF5KHRoaXMuZGF0YS5idWZmZXIsIHRoaXMucmVhZE9mZnNldCwgcHBzU2l6ZSlcbiAgICAgIHRoaXMucmVhZE9mZnNldCArPSBwcHNTaXplXG4gICAgfVxuXG4gICAgbWkuc3BzID0gbWV0YS5zcHMgPSBzcHNcbiAgICBtaS5wcHMgPSBtZXRhLnBwcyA9IHBwc1xuICAgIGlmIChzdG9yZS5oYXNJbml0aWFsTWV0YURpc3BhdGNoZWQpIHtcbiAgICAgIGlmIChzdG9yZS52aWRlb1RyYWNrLmxlbmd0aCB8fCBzdG9yZS5hdWRpb1RyYWNrLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmhhbmRsZURhdGFSZWFkeShzdG9yZS52aWRlb1RyYWNrLCBzdG9yZS5hdWRpb1RyYWNrKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdG9yZS5zdGF0ZS5fdmlkZW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkID0gdHJ1ZVxuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeSgndmlkZW8nLCBtZXRhKVxuICB9XG5cbiAgX3BhcnNlQVZDVmlkZW9EYXRhIChmcmFtZVR5cGUsIGNwc1RpbWUpIHtcbiAgICBsZXQgZHYgPSBuZXcgRGF0YVZpZXc0UmVhZCh0aGlzLmRhdGEuYnVmZmVyLCB0aGlzKVxuXG4gICAgbGV0IG5hbHVMaXN0ID0gW11cbiAgICBsZXQgZGF0YUxlbiA9IDBcbiAgICBjb25zdCB7IG5hbHVMZW5ndGhTaXplOiBuYWx1TGVuU2l6ZSB9ID0gdGhpcy5fc3RvcmUuc3RhdGVcbiAgICBsZXQgdHMgPSB0aGlzLl9zdG9yZS5zdGF0ZS50aW1lU3RhbXBCYXNlICsgdGhpcy5jdXJyZW50VGFnLmdldFRpbWUoKVxuICAgIGxldCBpc0tleWZyYW1lID0gKGZyYW1lVHlwZSA9PT0gMSlcbiAgICB3aGlsZSAodGhpcy51bnJlYWRMZW5ndGggPiAwKSB7XG4gICAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPCA0KSB7XG4gICAgICAgIHRoaXMud2Fybignbm90IGVub3VnaCBkYXRhIGZvciBwYXJzaW5nIEFWQycpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjb25zdCB0ZW1wUmVhZE9mZnNldCA9IHRoaXMucmVhZE9mZnNldFxuICAgICAgbGV0IG5hbHVTaXplID0gbmFsdUxlblNpemUgPT09IDQgPyBkdi5nZXRVaW50MzIoKSA6IGR2LmdldFVpbnQyNCgpXG4gICAgICBpZiAobmFsdVNpemUgPiB0aGlzLnVucmVhZExlbmd0aCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IHVuaXRUeXBlID0gZHYuZ2V0VWludCg1LCB0aGlzLnJlYWRPZmZzZXQsIGZhbHNlKVxuXG4gICAgICBpZiAodW5pdFR5cGUgPT09IDUpIHtcbiAgICAgICAgaXNLZXlmcmFtZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLmRhdGEuYnVmZmVyLCB0ZW1wUmVhZE9mZnNldCwgbmFsdUxlblNpemUgKyBuYWx1U2l6ZSlcbiAgICAgIHRoaXMucmVhZE9mZnNldCA9IHRlbXBSZWFkT2Zmc2V0ICsgbmFsdUxlblNpemUgKyBuYWx1U2l6ZVxuICAgICAgY29uc3QgbmFsdVVuaXQgPSB7XG4gICAgICAgIHR5cGU6IHVuaXRUeXBlLFxuICAgICAgICBkYXRhXG4gICAgICB9XG4gICAgICBuYWx1TGlzdC5wdXNoKG5hbHVVbml0KVxuICAgICAgZGF0YUxlbiArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgICB9XG4gICAgZHYgPSBudWxsXG4gICAgaWYgKG5hbHVMaXN0Lmxlbmd0aCkge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrIH0gPSB0aGlzLl9zdG9yZVxuICAgICAgY29uc3QgdmlkZW9TYW1wbGUgPSB7XG4gICAgICAgIHVuaXRzOiBuYWx1TGlzdCxcbiAgICAgICAgbGVuZ3RoOiBkYXRhTGVuLFxuICAgICAgICBkdHM6IHRzLFxuICAgICAgICBjcHM6IGNwc1RpbWUsXG4gICAgICAgIHB0czogKHRzICsgY3BzVGltZSksXG4gICAgICAgIGlzS2V5ZnJhbWUsXG4gICAgICAgIHBvc2l0aW9uOiBpc0tleWZyYW1lID8gdGhpcy5jdXJyZW50VGFnLnBvc2l0aW9uIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICB2aWRlb1RyYWNrLnNhbXBsZXMucHVzaCh2aWRlb1NhbXBsZSlcbiAgICAgIHZpZGVvVHJhY2subGVuZ3RoICs9IGRhdGFMZW5cbiAgICB9XG4gIH1cblxuICByZWFkRGF0YSAobnVtKSB7XG4gICAgY29uc3QgeyBkYXRhLCByZWFkT2Zmc2V0IH0gPSB0aGlzXG4gICAgaWYgKHRoaXMuZGF0YVNpemUgPiByZWFkT2Zmc2V0ICsgbnVtKSB7XG4gICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gbnVtXG4gICAgICByZXR1cm4gZGF0YS5zbGljZShyZWFkT2Zmc2V0LCBudW0pXG4gICAgfVxuICAgIHJldHVybiBbXVxuICB9XG5cbiAgZ2V0IGRhdGFTaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aFxuICB9XG4gIGdldCB1bnJlYWRMZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFTaXplIC0gdGhpcy5yZWFkT2Zmc2V0XG4gIH1cbn1cbiIsImltcG9ydCBCdWZmZXIgZnJvbSAnLi4vLi4vd3JpdGUvQnVmZmVyJztcbi8vIGNvbnN0IFVJTlQzMl9NQVggPSBNYXRoLnBvdygyLCAzMikgLSAxO1xuaW1wb3J0IHsgY2FjaGVXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvZnVuY1V0aWxzJztcbmNsYXNzIEZNUDQge1xuICAgIHN0YXRpYyBzaXplICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQnVmZmVyLndyaXRlVWludDMyKHZhbHVlKTtcbiAgICB9XG4gICAgc3RhdGljIGluaXRCb3ggKHNpemUsIG5hbWUsIC4uLmNvbnRlbnQpIHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gbmV3IEJ1ZmZlcigpO1xuICAgICAgICBidWZmZXIud3JpdGUoRk1QNC5zaXplKHNpemUpLCBGTVA0LnR5cGUobmFtZSksIC4uLmNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlcjtcbiAgICB9XG4gICAgc3RhdGljIGV4dGVuc2lvbiAodmVyc2lvbiwgZmxhZykge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgdmVyc2lvbixcbiAgICAgICAgICAgIChmbGFnID4+IDE2KSAmIDB4ZmYsXG4gICAgICAgICAgICAoZmxhZyA+PiA4KSAmIDB4ZmYsXG4gICAgICAgICAgICBmbGFnICYgMHhmZixcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHN0YXRpYyBmdHlwICgpIHtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveCgyNCwgJ2Z0eXAnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tLFxuICAgICAgICAgICAgMHgwLCAweDAsIDB4MDAsIDB4MDEsIC8vIG1pbm9yX3ZlcnNpb246IDB4MDFcbiAgICAgICAgICAgIDB4NjksIDB4NzMsIDB4NkYsIDB4NkQsIC8vIGlzb21cbiAgICAgICAgICAgIDB4NjEsIDB4NzYsIDB4NjMsIDB4MzEsIC8vIGF2YzFcbiAgICAgICAgXSkpO1xuICAgIH1cbiAgICBzdGF0aWMgbW9vdiAoZGF0YSkge1xuICAgICAgICBsZXQgc2l6ZSA9IDg7XG4gICAgICAgIGxldCBtdmhkID0gRk1QNC5tdmhkKGRhdGEuZHVyYXRpb24sIGRhdGEudGltZXNjYWxlKTtcbiAgICAgICAgbGV0IHRyYWsxID0gRk1QNC52aWRlb1RyYWsoZGF0YSk7XG4gICAgICAgIGxldCB0cmFrMiA9IEZNUDQuYXVkaW9UcmFrKGRhdGEpO1xuICAgICAgICBsZXQgbXZleCA9IEZNUDQubXZleChkYXRhLmR1cmF0aW9uLCBkYXRhLnRpbWVzY2FsZSk7XG4gICAgICAgIFttdmhkLCB0cmFrMSwgdHJhazIsIG12ZXhdLmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KHNpemUsICdtb292JywgbXZoZCwgdHJhazEsIHRyYWsyLCBtdmV4KTtcbiAgICB9XG4gICAgc3RhdGljIG12aGQgKGR1cmF0aW9uLCB0aW1lU2NhbGUpIHtcbiAgICAgICAgbGV0IHRpbWVzY2FsZSA9IHRpbWVTY2FsZSB8fCAxMDAwO1xuICAgICAgICAvLyBkdXJhdGlvbiAqPSB0aW1lc2NhbGU7XG4gICAgICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAgICAgMeS9jeeahGJveOeJiOacrCsz5L2NZmxhZ3MgICBib3jniYjmnKzvvIww5oiWMe+8jOS4gOiIrOS4ujDjgILvvIjku6XkuIvlrZfoioLmlbDlnYfmjIl2ZXJzaW9uPTDvvIlcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWUgICAg5Yib5bu65pe26Ze0ICDvvIjnm7jlr7nkuo5VVEPml7bpl7QxOTA0LTAxLTAx6Zu254K555qE56eS5pWw77yJXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb25fdGltZSAgIOS/ruaUueaXtumXtFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIHRpbWVzY2FsZTogNCBieXRlc+aWh+S7tuWqkuS9k+WcqDHnp5Lml7bpl7TlhoXnmoTliLvluqblgLzvvIzlj6/ku6XnkIbop6PkuLox56eS6ZW/5bqmXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICh0aW1lc2NhbGUgPj4+IDI0KSAmIDB4RkYsXG4gICAgICAgICAgICAodGltZXNjYWxlID4+PiAxNikgJiAweEZGLFxuICAgICAgICAgICAgKHRpbWVzY2FsZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAgICAgKHRpbWVzY2FsZSkgJiAweEZGLFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGR1cmF0aW9uOiA0IGJ5dGVz6K+ldHJhY2vnmoTml7bpl7Tplb/luqbvvIznlKhkdXJhdGlvbuWSjHRpbWUgc2NhbGXlgLzlj6/ku6XorqHnrpd0cmFja+aXtumVv++8jOavlOWmgmF1ZGlvIHRyYWNr55qEdGltZSBzY2FsZSA9IDgwMDAsXG4gICAgICAgICAgICAgKiBkdXJhdGlvbiA9IDU2MDEyOO+8jOaXtumVv+S4ujcwLjAxNu+8jHZpZGVvIHRyYWNr55qEdGltZSBzY2FsZSA9IDYwMCwgZHVyYXRpb24gPSA0MjAwMO+8jOaXtumVv+S4ujcwXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAgICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyBQcmVmZXJyZWQgcmF0ZTogMS4wICAg5o6o6I2Q5pKt5pS+6YCf546H77yM6auYMTbkvY3lkozkvY4xNuS9jeWIhuWIq+S4uuWwj+aVsOeCueaVtOaVsOmDqOWIhuWSjOWwj+aVsOmDqOWIhu+8jOWNs1sxNi4xNl0g5qC85byP77yM6K+l5YC85Li6MS4w77yIMHgwMDAxMDAwMO+8ieihqOekuuato+W4uOWJjeWQkeaSreaUvlxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcmVmZXJyZWRWb2x1bWUoMS4wLCAyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKVxuICAgICAgICAgICAgICog5LiOcmF0Zeexu+S8vO+8jFs4LjhdIOagvOW8j++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAweDAxLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gIHJlc2VydmVkOiA0ICsgNCBieXRlc+S/neeVmeS9jVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1ICAg57q/5oCn5Luj5pWwXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4NDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIHByZV9kZWZpbmVkIDYgKiA0IGJ5dGVzLS0tLVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZS1kZWZpbmVkIOS/neeVmeS9jVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIHByZV9kZWZpbmVkIDYgKiA0IGJ5dGVzLS0tLVxuICAgICAgICAgICAgMHhGRiwgMHhGRiwgMHhGRiwgMHhGRiwgLy8gbmV4dF90cmFja19JRCDkuIvkuIDkuKp0cmFja+S9v+eUqOeahGlk5Y+3XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDggKyBieXRlcy5sZW5ndGgsICdtdmhkJywgbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKTtcbiAgICB9XG4gICAgc3RhdGljIHZpZGVvVHJhayAoZGF0YSkge1xuICAgICAgICBsZXQgc2l6ZSA9IDg7XG4gICAgICAgIGxldCB0a2hkID0gRk1QNC50a2hkKHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICAgICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlLFxuICAgICAgICAgICAgd2lkdGg6IGRhdGEud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGRhdGEuaGVpZ2h0LFxuICAgICAgICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBtZGlhID0gRk1QNC5tZGlhKHtcbiAgICAgICAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICAgICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlLFxuICAgICAgICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICAgICAgICBzcHM6IGRhdGEuc3BzLFxuICAgICAgICAgICAgcHBzOiBkYXRhLnBwcyxcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IGRhdGEucGl4ZWxSYXRpbyxcbiAgICAgICAgICAgIHdpZHRoOiBkYXRhLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBkYXRhLmhlaWdodCxcbiAgICAgICAgfSk7XG4gICAgICAgIFt0a2hkLCBtZGlhXS5mb3JFYWNoKGl0ZW09PntcbiAgICAgICAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpO1xuICAgIH1cbiAgICBzdGF0aWMgYXVkaW9UcmFrIChkYXRhKSB7XG4gICAgICAgIGxldCBzaXplID0gODtcbiAgICAgICAgbGV0IHRraGQgPSBGTVA0LnRraGQoe1xuICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgICAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUsXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbWRpYSA9IEZNUDQubWRpYSh7XG4gICAgICAgICAgICB0eXBlOiAnYXVkaW8nLFxuICAgICAgICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgICAgICAgY2hhbm5lbENvdW50OiBkYXRhLmF1ZGlvQ2hhbm5lbENvdW50LFxuICAgICAgICAgICAgc2FtcGxlcmF0ZTogZGF0YS5hdWRpb1NhbXBsZVJhdGUsXG4gICAgICAgICAgICBjb25maWc6IGRhdGEuYXVkaW9Db25maWcsXG4gICAgICAgIH0pO1xuICAgICAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goc2l6ZSwgJ3RyYWsnLCB0a2hkLCBtZGlhKTtcbiAgICB9XG4gICAgc3RhdGljIHRraGQgKGRhdGEpIHtcbiAgICAgICAgbGV0IGlkID0gZGF0YS5pZCxcbiAgICAgICAgICAgIGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvbixcbiAgICAgICAgICAgIHdpZHRoID0gZGF0YS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgICAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDcsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAx5L2N54mI5pysIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8ieaMieS9jeaIluaTjeS9nOe7k+aenOWAvO+8jOmihOWumuS5ieWmguS4i++8mlxuICAgICAgICAgICAgLy8gMHgwMDAwMDEgdHJhY2tfZW5hYmxlZO+8jOWQpuWImeivpXRyYWNr5LiN6KKr5pKt5pS+77ybXG4gICAgICAgICAgICAvLyAweDAwMDAwMiB0cmFja19pbl9tb3ZpZe+8jOihqOekuuivpXRyYWNr5Zyo5pKt5pS+5Lit6KKr5byV55So77ybXG4gICAgICAgICAgICAvLyAweDAwMDAwNCB0cmFja19pbl9wcmV2aWV377yM6KGo56S66K+ldHJhY2vlnKjpooTop4jml7booqvlvJXnlKjjgIJcbiAgICAgICAgICAgIC8vIOS4gOiIrOivpeWAvOS4ujfvvIwxKzIrNCDlpoLmnpzkuIDkuKrlqpLkvZPmiYDmnIl0cmFja+Wdh+acquiuvue9rnRyYWNrX2luX21vdmll5ZKMdHJhY2tfaW5fcHJldmlld++8jOWwhuiiq+eQhuino+S4uuaJgOaciXRyYWNr5Z2H6K6+572u5LqG6L+Z5Lik6aG577yb5a+55LqOaGludCB0cmFja++8jOivpeWAvOS4ujBcbiAgICAgICAgICAgIC8vIGhpbnQgdHJhY2sg6L+Z5Liq54m55q6K55qEdHJhY2vlubbkuI3ljIXlkKvlqpLkvZPmlbDmja7vvIzogIzmmK/ljIXlkKvkuobkuIDkupvlsIblhbbku5bmlbDmja50cmFja+aJk+WMheaIkOa1geWqkuS9k+eahOaMh+ekuuS/oeaBr+OAglxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZeWIm+W7uuaXtumXtO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbiB0aW1lIOS/ruaUueaXtumXtFxuICAgICAgICAgICAgKGlkID4+PiAyNCkgJiAweEZGLCAvLyB0cmFja19JRDogNCBieXRlcyBpZOWPt++8jOS4jeiDvemHjeWkjeS4lOS4jeiDveS4ujBcbiAgICAgICAgICAgIChpZCA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgICAgIChpZCA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAgICAgKGlkKSAmIDB4RkYsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogMiAqIDQgYnl0ZXMgICAg5L+d55WZ5L2NXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbGF5ZXIoMmJ5dGVzKSArIGFsdGVybmF0ZV9ncm91cCgyYnl0ZXMpICDop4bpopHlsYLvvIzpu5jorqTkuLow77yM5YC85bCP55qE5Zyo5LiK5bGCLnRyYWNr5YiG57uE5L+h5oGv77yM6buY6K6k5Li6MOihqOekuuivpXRyYWNr5pyq5LiO5YW25LuWdHJhY2vmnInnvqTnu4TlhbPns7tcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZvbHVtZSgyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKSAgICBbOC44XSDmoLzlvI/vvIzlpoLmnpzkuLrpn7PpopF0cmFja++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj++8m+WQpuWImeS4ujAgICAr5L+d55WZ5L2NXG4gICAgICAgICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1XG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgICAgICAgICh3aWR0aCA+Pj4gOCkgJiAweEZGLCAvLyAvL+WuveW6plxuICAgICAgICAgICAgKHdpZHRoKSAmIDB4RkYsXG4gICAgICAgICAgICAweDAwLCAweDAwLFxuICAgICAgICAgICAgKGhlaWdodCA+Pj4gOCkgJiAweEZGLCAvLyDpq5jluqZcbiAgICAgICAgICAgIChoZWlnaHQpICYgMHhGRixcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0a2hkJywgY29udGVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBlZHRzIChkYXRhKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCksIGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvbiwgbWVkaWFUaW1lID0gZGF0YS5tZWRpYVRpbWU7XG4gICAgICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoMzYpLCBGTVA0LnR5cGUoJ2VkdHMnKSk7XG4gICAgICAgIC8vIGVsc3RcbiAgICAgICAgYnVmZmVyLndyaXRlKEZNUDQuc2l6ZSgyOCksIEZNUDQudHlwZSgnZWxzdCcpKTtcbiAgICAgICAgYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5IGNvdW50XG4gICAgICAgICAgICAoZHVyYXRpb24gPj4gMjQpICYgMHhmZiwgKGR1cmF0aW9uID4+IDE2KSAmIDB4ZmYsIChkdXJhdGlvbiA+PiA4KSAmIDB4ZmYsIGR1cmF0aW9uICYgMHhmZixcbiAgICAgICAgICAgIChtZWRpYVRpbWUgPj4gMjQpICYgMHhmZiwgKG1lZGlhVGltZSA+PiAxNikgJiAweGZmLCAobWVkaWFUaW1lID4+IDgpICYgMHhmZiwgbWVkaWFUaW1lICYgMHhmZixcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIG1lZGlhIHJhdGVcbiAgICAgICAgXSkpO1xuICAgICAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlcjtcbiAgICB9XG4gICAgc3RhdGljIG1kaWEgKGRhdGEpIHtcbiAgICAgICAgbGV0IHNpemUgPSA4O1xuICAgICAgICBsZXQgbWRoZCA9IEZNUDQubWRoZChkYXRhLnRpbWVzY2FsZSwgZGF0YS5kdXJhdGlvbik7XG4gICAgICAgIGxldCBoZGxyID0gRk1QNC5oZGxyKGRhdGEudHlwZSk7XG4gICAgICAgIGxldCBtaW5mID0gRk1QNC5taW5mKGRhdGEpO1xuICAgICAgICBbbWRoZCwgaGRsciwgbWluZl0uZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goc2l6ZSwgJ21kaWEnLCBtZGhkLCBoZGxyLCBtaW5mKTtcbiAgICB9XG4gICAgc3RhdGljIG1kaGQgKHRpbWVzY2FsZSwgZHVyYXRpb24pIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1lICAgIOWIm+W7uuaXtumXtFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uX3RpbWXkv67mlLnml7bpl7RcbiAgICAgICAgICAgICh0aW1lc2NhbGUgPj4+IDI0KSAmIDB4RkYsIC8vIHRpbWVzY2FsZTogNCBieXRlcyAgICDmlofku7blqpLkvZPlnKgx56eS5pe26Ze05YaF55qE5Yi75bqm5YC877yM5Y+v5Lul55CG6Kej5Li6MeenkumVv+W6plxuICAgICAgICAgICAgKHRpbWVzY2FsZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgICAgICh0aW1lc2NhbGUgPj4+IDgpICYgMHhGRixcbiAgICAgICAgICAgICh0aW1lc2NhbGUpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgIHRyYWNr55qE5pe26Ze06ZW/5bqmXG4gICAgICAgICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgICAgICAgMHg1NSwgMHhDNCwgLy8gbGFuZ3VhZ2U6IHVuZCAodW5kZXRlcm1pbmVkKSDlqpLkvZPor63oqIDnoIHjgILmnIDpq5jkvY3kuLow77yM5ZCO6Z2iMTXkvY3kuLoz5Liq5a2X56ym77yI6KeBSVNPIDYzOS0yL1TmoIflh4bkuK3lrprkuYnvvIlcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkID0gMFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveCgxMiArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ21kaGQnLCBGTVA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBoZGxyICh0eXBlKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgICAgICAgMHg3NiwgMHg2OSwgMHg2NCwgMHg2NSwgLy8gaGFuZGxlcl90eXBlOiAndmlkZSdcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgICAgIDB4NTYsIDB4NjksIDB4NjQsIDB4NjUsXG4gICAgICAgICAgICAweDZmLCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMCwgLy8gbmFtZTogJ1ZpZGVvSGFuZGxlcidcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgIHZhbHVlLnNwbGljZSg4LCA0LCAuLi5bMHg3MywgMHg2ZiwgMHg3NSwgMHg2ZV0pO1xuICAgICAgICAgICAgdmFsdWUuc3BsaWNlKDI0LCAxMywgLi4uWzB4NTMsIDB4NmYsIDB4NzUsIDB4NmUsXG4gICAgICAgICAgICAgICAgMHg2NCwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgICAgICAgICAgICAweDY0LCAweDZjLCAweDY1LCAweDcyLCAweDAwXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveCg4ICsgdmFsdWUubGVuZ3RoLCAnaGRscicsIG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XG4gICAgfVxuICAgIHN0YXRpYyBtaW5mIChkYXRhKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCksIHNpemUgPSA4O1xuICAgICAgICBsZXQgdm1oZCA9IGRhdGEudHlwZSA9PT0gJ3ZpZGVvJyA/IEZNUDQudm1oZCgpIDogRk1QNC5zbWhkKCk7XG4gICAgICAgIGxldCBkaW5mID0gRk1QNC5kaW5mKCk7XG4gICAgICAgIGxldCBzdGJsID0gRk1QNC5zdGJsKGRhdGEpO1xuICAgICAgICBbdm1oZCwgZGluZiwgc3RibF0uZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goc2l6ZSwgJ21pbmYnLCB2bWhkLCBkaW5mLCBzdGJsKTtcbiAgICB9XG4gICAgc3RhdGljIHZtaGQgKCkge1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDIwLCAndm1oZCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGZsYWdzXG4gICAgICAgICAgICAweDAwLCAweDAwLCAvLyBncmFwaGljc21vZGVcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgLy8gb3Bjb2xvclxuICAgICAgICBdKSk7XG4gICAgfVxuICAgIHN0YXRpYyBzbWhkICgpIHtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveCgxNiwgJ3NtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgICAgICAgMHgwMCwgMHgwMCwgLy8gYmFsYW5jZVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgXSkpO1xuICAgIH1cbiAgICBzdGF0aWMgZGluZiAoKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCk7XG4gICAgICAgIGxldCBkcmVmID0gWzB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5X2NvdW50XG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDBjLCAvLyBlbnRyeV9zaXplXG4gICAgICAgICAgICAweDc1LCAweDcyLCAweDZjLCAweDIwLCAvLyAndXJsJyB0eXBlXG4gICAgICAgICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5X2ZsYWdzXG4gICAgICAgIF07XG4gICAgICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoMzYpLCBGTVA0LnR5cGUoJ2RpbmYnKSwgRk1QNC5zaXplKDI4KSwgRk1QNC50eXBlKCdkcmVmJyksIG5ldyBVaW50OEFycmF5KGRyZWYpKTtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5idWZmZXI7XG4gICAgfVxuICAgIHN0YXRpYyBzdGJsIChkYXRhKSB7XG4gICAgICAgIGxldCBzaXplID0gODtcbiAgICAgICAgbGV0IHN0c2QgPSBGTVA0LnN0c2QoZGF0YSk7XG4gICAgICAgIGxldCBzdHRzID0gRk1QNC5zdHRzKCk7XG4gICAgICAgIGxldCBzdHNjID0gRk1QNC5zdHNjKCk7XG4gICAgICAgIGxldCBzdHN6ID0gRk1QNC5zdHN6KCk7XG4gICAgICAgIGxldCBzdGNvID0gRk1QNC5zdGNvKCk7XG4gICAgICAgIFtzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvXS5mb3JFYWNoKGl0ZW09PntcbiAgICAgICAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveChzaXplLCAnc3RibCcsIHN0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y28pO1xuICAgIH1cbiAgICBzdGF0aWMgc3RzZCAoZGF0YSkge1xuICAgICAgICBsZXQgY29udGVudDtcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgLy8gaWYgKCFkYXRhLmlzQUFDICYmIGRhdGEuY29kZWMgPT09ICdtcDQnKSB7XG4gICAgICAgICAgICAvLyAgICAgY29udGVudCA9IEZNUDQubXAzKGRhdGEpO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyDmlK/mjIFtcDRhXG4gICAgICAgICAgICBjb250ZW50ID0gRk1QNC5tcDRhKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGVudCA9IEZNUDQuYXZjMShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2ICsgY29udGVudC5ieXRlTGVuZ3RoLCAnc3RzZCcsIEZNUDQuZXh0ZW5zaW9uKDAsIDApLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwMCwgMHgwMV0pLCBjb250ZW50KTtcbiAgICB9XG4gICAgc3RhdGljIG1wNGEgKGRhdGEpIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKTtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgICAgIDB4MDAsIDB4MDEsIC8vIGRhdGFfcmVmZXJlbmNlX2luZGV4XG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgICAgIDB4MDAsIGRhdGEuY2hhbm5lbENvdW50LCAvLyBjaGFubmVsY291bnRcbiAgICAgICAgICAgIDB4MDAsIDB4MTAsIC8vIHNhbXBsZVNpemU6MTZiaXRzXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDJcbiAgICAgICAgICAgIChkYXRhLnNhbXBsZXJhdGUgPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgZGF0YS5zYW1wbGVyYXRlICYgMHhmZiwgLy9cbiAgICAgICAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAgIF0pO1xuICAgICAgICBsZXQgZXNkcyA9IEZNUDQuZXNkcyhkYXRhLmNvbmZpZyk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCArIGVzZHMuYnl0ZUxlbmd0aCwgJ21wNGEnLCBjb250ZW50LCBlc2RzKTtcbiAgICB9XG4gICAgc3RhdGljIGVzZHMgKGNvbmZpZyA9IFs0MywgMTQ2LCA4LCAwXSkge1xuICAgICAgICBjb25zdCBjb25maWdsZW4gPSBjb25maWcubGVuZ3RoO1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpO1xuICAgICAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcblxuICAgICAgICAgICAgMHgwMywgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgICAgICAgICAweDE3ICsgY29uZmlnbGVuLCAvLyBsZW5ndGhcbiAgICAgICAgICAgIDB4MDAsIDB4MDEsIC8vIGVzX2lkXG4gICAgICAgICAgICAweDAwLCAvLyBzdHJlYW1fcHJpb3JpdHlcblxuICAgICAgICAgICAgMHgwNCwgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgICAgICAgICAweDBmICsgY29uZmlnbGVuLCAvLyBsZW5ndGhcbiAgICAgICAgICAgIDB4NDAsIC8vIGNvZGVjIDogbXBlZzRfYXVkaW9cbiAgICAgICAgICAgIDB4MTUsIC8vIHN0cmVhbV90eXBlXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBidWZmZXJfc2l6ZVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbWF4Qml0cmF0ZVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gYXZnQml0cmF0ZVxuXG4gICAgICAgICAgICAweDA1LCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgICAgXS5jb25jYXQoW2NvbmZpZ2xlbl0pLmNvbmNhdChjb25maWcpLmNvbmNhdChbMHgwNiwgMHgwMSwgMHgwMl0pKTtcbiAgICAgICAgYnVmZmVyLndyaXRlKEZNUDQuc2l6ZSg4ICsgY29udGVudC5ieXRlTGVuZ3RoKSwgRk1QNC50eXBlKCdlc2RzJyksIGNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlcjtcbiAgICB9XG4gICAgc3RhdGljIGF2YzEgKGRhdGEpIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKSwgc2l6ZSA9IDQwOy8vIDgoYXZjMSkrOChhdmNjKSs4KGJ0cnQpKzE2KHBhc3ApXG4gICAgICAgIGxldCBzcHMgPSBkYXRhLnNwcywgcHBzID0gZGF0YS5wcHMsIHdpZHRoID0gZGF0YS53aWR0aCwgaGVpZ2h0ID0gZGF0YS5oZWlnaHQsIGhTcGFjaW5nID0gZGF0YS5waXhlbFJhdGlvWzBdLCB2U3BhY2luZyA9IGRhdGEucGl4ZWxSYXRpb1sxXTtcbiAgICAgICAgbGV0IGF2Y2NCdWZmZXIgPSBuZXcgQnVmZmVyKCk7XG4gICAgICAgIGF2Y2NCdWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMSwgLy8gdmVyc2lvblxuICAgICAgICAgICAgc3BzWzFdLCAvLyBwcm9maWxlXG4gICAgICAgICAgICBzcHNbMl0sIC8vIHByb2ZpbGUgY29tcGF0aWJsZVxuICAgICAgICAgICAgc3BzWzNdLCAvLyBsZXZlbFxuICAgICAgICAgICAgMHhmYyB8IDMsXG4gICAgICAgICAgICAweEUwIHwgMSwgLy8g55uu5YmN5Y+q5aSE55CG5LiA5Liqc3BzXG4gICAgICAgIF0uY29uY2F0KFtzcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgc3BzLmxlbmd0aCAmIDB4ZmZdKSkpO1xuICAgICAgICBhdmNjQnVmZmVyLndyaXRlKHNwcywgbmV3IFVpbnQ4QXJyYXkoWzEsIHBwcy5sZW5ndGggPj4+IDggJiAweGZmLCBwcHMubGVuZ3RoICYgMHhmZl0pLCBwcHMpO1xuXG4gICAgICAgIGxldCBhdmNjID0gYXZjY0J1ZmZlci5idWZmZXI7XG4gICAgICAgIGxldCBhdmMxID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAgICAgICAweDAwLCAweDAxLCAvLyBkYXRhX3JlZmVyZW5jZV9pbmRleFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAgICAgICAod2lkdGggPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgd2lkdGggJiAweGZmLCAvLyB3aWR0aFxuICAgICAgICAgICAgKGhlaWdodCA+PiA4KSAmIDB4ZmYsXG4gICAgICAgICAgICBoZWlnaHQgJiAweGZmLCAvLyBoZWlnaHRcbiAgICAgICAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIGhvcml6cmVzb2x1dGlvblxuICAgICAgICAgICAgMHgwMCwgMHg0OCwgMHgwMCwgMHgwMCwgLy8gdmVydHJlc29sdXRpb25cbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAgICAgICAweDAwLCAweDAxLCAvLyBmcmFtZV9jb3VudFxuICAgICAgICAgICAgMHgxMixcbiAgICAgICAgICAgIDB4NjQsIDB4NjEsIDB4NjksIDB4NkMsIC8vIGRhaWx5bW90aW9uL2hscy5qc1xuICAgICAgICAgICAgMHg3OSwgMHg2RCwgMHg2RiwgMHg3NCxcbiAgICAgICAgICAgIDB4NjksIDB4NkYsIDB4NkUsIDB4MkYsXG4gICAgICAgICAgICAweDY4LCAweDZDLCAweDczLCAweDJFLFxuICAgICAgICAgICAgMHg2QSwgMHg3MywgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY29tcHJlc3Nvcm5hbWVcbiAgICAgICAgICAgIDB4MDAsIDB4MTgsIC8vIGRlcHRoID0gMjRcbiAgICAgICAgICAgIDB4MTEsIDB4MTFdKTsgLy8gcHJlX2RlZmluZWQgPSAtMVxuICAgICAgICBsZXQgYnRydCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIDB4MWMsIDB4OWMsIDB4ODAsIC8vIGJ1ZmZlclNpemVEQlxuICAgICAgICAgICAgMHgwMCwgMHgyZCwgMHhjNiwgMHhjMCwgLy8gbWF4Qml0cmF0ZVxuICAgICAgICAgICAgMHgwMCwgMHgyZCwgMHhjNiwgMHhjMCwgLy8gYXZnQml0cmF0ZVxuICAgICAgICBdKTtcbiAgICAgICAgbGV0IHBhc3AgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAoaFNwYWNpbmcgPj4gMjQpLCAvLyBoU3BhY2luZ1xuICAgICAgICAgICAgKGhTcGFjaW5nID4+IDE2KSAmIDB4ZmYsXG4gICAgICAgICAgICAoaFNwYWNpbmcgPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgaFNwYWNpbmcgJiAweGZmLFxuICAgICAgICAgICAgKHZTcGFjaW5nID4+IDI0KSwgLy8gdlNwYWNpbmdcbiAgICAgICAgICAgICh2U3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgICAgICAgKHZTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgICAgICAgIHZTcGFjaW5nICYgMHhmZixcbiAgICAgICAgXSk7XG5cbiAgICAgICAgYnVmZmVyLndyaXRlKFxuICAgICAgICAgICAgRk1QNC5zaXplKHNpemUgKyBhdmMxLmJ5dGVMZW5ndGggKyBhdmNjLmJ5dGVMZW5ndGggKyBidHJ0LmJ5dGVMZW5ndGgpLCBGTVA0LnR5cGUoJ2F2YzEnKSwgYXZjMSxcbiAgICAgICAgICAgIEZNUDQuc2l6ZSg4ICsgYXZjYy5ieXRlTGVuZ3RoKSwgRk1QNC50eXBlKCdhdmNDJyksIGF2Y2MsXG4gICAgICAgICAgICBGTVA0LnNpemUoMjApLCBGTVA0LnR5cGUoJ2J0cnQnKSwgYnRydCxcbiAgICAgICAgICAgIEZNUDQuc2l6ZSgxNiksIEZNUDQudHlwZSgncGFzcCcpLCBwYXNwXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBidWZmZXIuYnVmZmVyO1xuICAgIH1cbiAgICBzdGF0aWMgc3R0cyAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGVudHJ5X2NvdW50XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAnc3R0cycsIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgc3RzYyAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGVudHJ5X2NvdW50XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAnc3RzYycsIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgc3RjbyAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGVudHJ5X2NvdW50XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAnc3RjbycsIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgc3RzeiAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHNhbXBsZV9zaXplXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBzYW1wbGVfY291bnRcbiAgICAgICAgXSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goMjAsICdzdHN6JywgY29udGVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBtdmV4IChkdXJhdGlvbikge1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpO1xuICAgICAgICBsZXQgbWVoZCA9IEJ1ZmZlci53cml0ZVVpbnQzMihkdXJhdGlvbik7XG4gICAgICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoODgpLCBGTVA0LnR5cGUoJ212ZXgnKSwgRk1QNC5zaXplKDE2KSwgRk1QNC50eXBlKCdtZWhkJyksIEZNUDQuZXh0ZW5zaW9uKDAsIDApLCBtZWhkLCBGTVA0LnRyZXgoMSksIEZNUDQudHJleCgyKSk7XG4gICAgICAgIHJldHVybiBidWZmZXIuYnVmZmVyO1xuICAgIH1cbiAgICBzdGF0aWMgdHJleCAoaWQpIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAgICAgICAoaWQgPj4gMjQpLFxuICAgICAgICAgICAgKGlkID4+IDE2KSAmIDB4ZmYsXG4gICAgICAgICAgICAoaWQgPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgKGlkICYgMHhmZiksIC8vIHRyYWNrX0lEXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBkZWZhdWx0X3NhbXBsZV9kZXNjcmlwdGlvbl9pbmRleFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfZHVyYXRpb25cbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGRlZmF1bHRfc2FtcGxlX3NpemVcbiAgICAgICAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDEsIC8vIGRlZmF1bHRfc2FtcGxlX2ZsYWdzXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0cmV4JywgY29udGVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBtb29mIChkYXRhKSB7XG4gICAgICAgIGxldCBzaXplID0gODtcbiAgICAgICAgbGV0IG1maGQgPSBGTVA0Lm1maGQoKTtcbiAgICAgICAgbGV0IHRyYWYgPSBGTVA0LnRyYWYoZGF0YSk7XG4gICAgICAgIFttZmhkLCB0cmFmXS5mb3JFYWNoKGl0ZW09PntcbiAgICAgICAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveChzaXplLCAnbW9vZicsIG1maGQsIHRyYWYpO1xuICAgIH1cbiAgICBzdGF0aWMgbWZoZCAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKEZNUDQuc2VxdWVuY2UpO1xuICAgICAgICBGTVA0LnNlcXVlbmNlICs9IDE7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goMTYsICdtZmhkJywgRk1QNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgdHJhZiAoZGF0YSkge1xuICAgICAgICBsZXQgc2l6ZSA9IDg7XG4gICAgICAgIGxldCB0ZmhkID0gRk1QNC50ZmhkKGRhdGEuaWQpO1xuICAgICAgICBsZXQgdGZkdCA9IEZNUDQudGZkdChkYXRhLnRpbWUpO1xuICAgICAgICBsZXQgc2R0cCA9IEZNUDQuc2R0cChkYXRhKTtcbiAgICAgICAgbGV0IHRydW4gPSBGTVA0LnRydW4oZGF0YSwgc2R0cC5ieXRlTGVuZ3RoKTtcbiAgICAgICAgW3RmaGQsIHRmZHQsIHNkdHAsIHRydW5dLmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KHNpemUsICd0cmFmJywgdGZoZCwgdGZkdCwgc2R0cCwgdHJ1bik7XG4gICAgfVxuICAgIHN0YXRpYyB0ZmhkIChpZCkge1xuICAgICAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihpZCk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goMTYsICd0ZmhkJywgRk1QNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgdGZkdCAodGltZSkge1xuICAgICAgICAvLyBsZXQgdXBwZXIgPSBNYXRoLmZsb29yKHRpbWUgLyAoVUlOVDMyX01BWCArIDEpKSxcbiAgICAgICAgLy8gICAgIGxvd2VyID0gTWF0aC5mbG9vcih0aW1lICUgKFVJTlQzMl9NQVggKyAxKSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goMTYsICd0ZmR0JywgRk1QNC5leHRlbnNpb24oMCwgMCksIEJ1ZmZlci53cml0ZVVpbnQzMih0aW1lKSk7XG4gICAgfVxuICAgIHN0YXRpYyB0cnVuIChkYXRhLCBzZHRwTGVuZ3RoKSB7XG4gICAgICAgIC8vIGxldCBpZCA9IGRhdGEuaWQ7XG4gICAgICAgIC8vIGxldCBjZWlsID0gaWQgPT09IDEgPyAxNiA6IDEyO1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpO1xuICAgICAgICBsZXQgc2FtcGxlQ291bnQgPSBCdWZmZXIud3JpdGVVaW50MzIoZGF0YS5zYW1wbGVzLmxlbmd0aCk7XG4gICAgICAgIC8vIG1kYXQtaGVhZGVyIDhcbiAgICAgICAgLy8gbW9vZi1oZWFkZXIgOFxuICAgICAgICAvLyBtZmhkIDE2XG4gICAgICAgIC8vIHRyYWYtaGVhZGVyIDhcbiAgICAgICAgLy8gdGhoZCAxNlxuICAgICAgICAvLyB0ZmR0IDIwXG4gICAgICAgIC8vIHRydW4taGVhZGVyIDEyXG4gICAgICAgIC8vIHNhbXBsZUNvdW50IDRcbiAgICAgICAgLy8gZGF0YS1vZmZzZXQgNFxuICAgICAgICAvLyBzYW1wbGVzLmxlbmd0aFxuICAgICAgICBsZXQgb2Zmc2V0ID0gQnVmZmVyLndyaXRlVWludDMyKDggKyA4ICsgMTYgKyA4ICsgMTYgKyAxNiArIDEyICsgNCArIDQgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGggKyBzZHRwTGVuZ3RoKTtcbiAgICAgICAgYnVmZmVyLndyaXRlKEZNUDQuc2l6ZSgyMCArIDE2ICogZGF0YS5zYW1wbGVzLmxlbmd0aCksIEZNUDQudHlwZSgndHJ1bicpLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwRiwgMHgwMV0pLCBzYW1wbGVDb3VudCwgb2Zmc2V0KTtcblxuICAgICAgICBsZXQgc2l6ZSA9IGJ1ZmZlci5idWZmZXIuYnl0ZUxlbmd0aCwgd3JpdGVPZmZzZXQgPSAwO1xuICAgICAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBzaXplICs9IDE2O1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdHJ1bkJveCA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuXG4gICAgICAgIHRydW5Cb3guc2V0KGJ1ZmZlci5idWZmZXIsIDApO1xuICAgICAgICB3cml0ZU9mZnNldCArPSBidWZmZXIuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKChpdGVtKT0+e1xuXG5cbiAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMihpdGVtLmR1cmF0aW9uKSwgd3JpdGVPZmZzZXQpO1xuICAgICAgICAgICAgd3JpdGVPZmZzZXQgKz0gNDtcbiAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMihpdGVtLnNpemUpLCB3cml0ZU9mZnNldCk7XG4gICAgICAgICAgICB3cml0ZU9mZnNldCArPSA0O1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5pZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMihpdGVtLmlzS2V5ZnJhbWUgPyAweDAyMDAwMDAwIDogMHgwMTAxMDAwMCksIHdyaXRlT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB3cml0ZU9mZnNldCArPSA0O1xuICAgICAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMihpdGVtLmNwcyksIHdyaXRlT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB3cml0ZU9mZnNldCArPSA0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnVuQm94LnNldChCdWZmZXIud3JpdGVVaW50MzIoMHgwMTAwMDAwMCksIHdyaXRlT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB3cml0ZU9mZnNldCArPSA0O1xuICAgICAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMigwKSwgd3JpdGVPZmZzZXQpO1xuICAgICAgICAgICAgICAgIHdyaXRlT2Zmc2V0ICs9IDQ7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYnVmZmVyLndyaXRlKEJ1ZmZlci53cml0ZVVpbnQzMigwKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1bkJveDtcbiAgICB9XG4gICAgc3RhdGljIHNkdHAgKGRhdGEpIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKTtcbiAgICAgICAgYnVmZmVyLndyaXRlKEZNUDQuc2l6ZSgxMiArIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGTVA0LnR5cGUoJ3NkdHAnKSwgRk1QNC5leHRlbnNpb24oMCwgMCkpO1xuICAgICAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoZGF0YS5pZCA9PT0gMSA/IFtpdGVtLmtleSA/IDMyIDogMTZdIDogWzE2XSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5idWZmZXI7XG4gICAgfVxuICAgIHN0YXRpYyBtZGF0IChkYXRhKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCksIHNpemUgPSA4O1xuICAgICAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBzaXplICs9IGl0ZW0uc2l6ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoc2l6ZSksIEZNUDQudHlwZSgnbWRhdCcpKTtcbiAgICAgICAgbGV0IG1kYXRCb3ggPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgIG1kYXRCb3guc2V0KGJ1ZmZlci5idWZmZXIsIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCArPSA4O1xuICAgICAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBpdGVtLmJ1ZmZlci5mb3JFYWNoKCh1bml0KSA9PiB7XG4gICAgICAgICAgICAgICAgbWRhdEJveC5zZXQodW5pdC5kYXRhLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSB1bml0LmRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgICAgICAvLyBidWZmZXIud3JpdGUodW5pdC5kYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1kYXRCb3g7XG4gICAgfVxufVxuRk1QNC50eXBlID0gY2FjaGVXcmFwcGVyKChuYW1lKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtuYW1lLmNoYXJDb2RlQXQoMCksIG5hbWUuY2hhckNvZGVBdCgxKSwgbmFtZS5jaGFyQ29kZUF0KDIpLCBuYW1lLmNoYXJDb2RlQXQoMyldKTtcbn0pO1xuRk1QNC5zZXF1ZW5jZSA9IDE7XG5cbmV4cG9ydCBkZWZhdWx0IEZNUDQ7XG4iLCJpbXBvcnQgTWVkaWFTZWdtZW50TGlzdCBmcm9tICcuLi8uLi9tb2RlbHMvTWVkaWFTZWdtZW50TGlzdCdcbmltcG9ydCBNZWRpYVNlZ21lbnQgZnJvbSAnLi4vLi4vbW9kZWxzL01lZGlhU2VnbWVudCdcbmltcG9ydCBNZWRpYVNhbXBsZSBmcm9tICcuLi8uLi9tb2RlbHMvTWVkaWFTYW1wbGUnXG5pbXBvcnQgc25pZmZlciBmcm9tICcuLi8uLi91dGlscy9zbmlmZmVyJ1xuaW1wb3J0IEJ1ZmZlciBmcm9tICcuLi8uLi93cml0ZS9CdWZmZXInXG5pbXBvcnQgRk1QNCBmcm9tICcuL0ZtcDQnXG5pbXBvcnQgUmVtdXhlciBmcm9tICcuL1JlbXV4ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1wNFJlbXV4ZXIgZXh0ZW5kcyBSZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgc3VwZXIoc3RvcmUpXG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICAgIHRoaXMuX3ZpZGVvTWV0YSA9IG51bGxcbiAgICB0aGlzLl9hdWRpb01ldGEgPSBudWxsXG4gICAgdGhpcy5fYXVkaW9OZXh0RHRzID0gbnVsbFxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IG51bGxcbiAgICB0aGlzLl92aWRlb1NlZ21lbnRMaXN0ID0gbmV3IE1lZGlhU2VnbWVudExpc3QoJ3ZpZGVvJylcbiAgICB0aGlzLl9hdWRpb1NlZ21lbnRMaXN0ID0gbmV3IE1lZGlhU2VnbWVudExpc3QoJ2F1ZGlvJylcbiAgICBjb25zdCB7YnJvd3Nlcn0gPSBzbmlmZmVyXG4gICAgdGhpcy5fZmlsbFNpbGVuY2VGcmFtZSA9IGJyb3dzZXIgPT09ICdpZSdcbiAgICB0aGlzLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSAoKSA9PiB7fVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IC0xXG4gICAgdGhpcy5fZHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gICAgdGhpcy5fYXVkaW9NZXRhID0gbnVsbFxuICAgIHRoaXMuX3ZpZGVvTWV0YSA9IG51bGxcbiAgICB0aGlzLl92aWRlb05leHREdHMgPSBudWxsXG4gICAgdGhpcy5fYXVkaW9OZXh0RHRzID0gbnVsbFxuICAgIHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuY2xlYXIoKVxuICAgIHRoaXMuX2F1ZGlvU2VnbWVudExpc3QuY2xlYXIoKVxuICAgIHRoaXMuX3ZpZGVvU2VnbWVudExpc3QgPSBudWxsXG4gICAgdGhpcy5fYXVkaW9TZWdtZW50TGlzdCA9IG51bGxcbiAgfVxuXG4gIHJlbXV4IChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgIXRoaXMuX2lzRHRzQmFzZUluaXRlZCAmJiB0aGlzLmNhbGNEdHNCYXNlKGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spXG5cbiAgICB0aGlzLl9yZW11eFZpZGVvKHZpZGVvVHJhY2spXG4gICAgdGhpcy5fcmVtdXhBdWRpbyhhdWRpb1RyYWNrKVxuICB9XG5cbiAgc2VlayAoKSB7XG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbnVsbFxuICAgIHRoaXMuX2F1ZGlvTmV4dER0cyA9IG51bGxcbiAgICB0aGlzLl92aWRlb1NlZ21lbnRMaXN0LmNsZWFyKClcbiAgICB0aGlzLl9hdWRpb1NlZ21lbnRMaXN0LmNsZWFyKClcbiAgfVxuXG4gIG9uTWV0YURhdGFSZWFkeSAodHlwZSwgbWV0YSkge1xuICAgIHRoaXNbYF8ke3R5cGV9TWV0YWBdID0gbWV0YVxuICB9XG5cbiAgb25NZWRpYUluZm9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgbGV0IGZ0eXBNb292ID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGZ0eXAgPSBGTVA0LmZ0eXAoKVxuICAgIGxldCBtb292ID0gRk1QNC5tb292KG1lZGlhSW5mbylcbiAgICBmdHlwTW9vdi53cml0ZShmdHlwLCBtb292KVxuICAgIHJldHVybiBmdHlwTW9vdi5idWZmZXJcbiAgfVxuXG4gIGNhbGNEdHNCYXNlIChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgbGV0IGF1ZGlvQmFzZSA9IEluZmluaXR5XG4gICAgbGV0IHZpZGVvQmFzZSA9IEluZmluaXR5XG4gICAgaWYgKGF1ZGlvVHJhY2suc2FtcGxlcyAmJiBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBhdWRpb0Jhc2UgPSBhdWRpb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuICAgIGlmICh2aWRlb1RyYWNrLnNhbXBsZXMgJiYgdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdmlkZW9CYXNlID0gdmlkZW9UcmFjay5zYW1wbGVzWzBdLmR0c1xuICAgIH1cblxuICAgIHRoaXMuX2R0c0Jhc2UgPSBNYXRoLm1pbihhdWRpb0Jhc2UsIHZpZGVvQmFzZSlcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSB0cnVlXG4gIH1cblxuICBfcmVtdXhWaWRlbyAodmlkZW9UcmFjaykge1xuICAgIGlmICghdGhpcy5fdmlkZW9NZXRhKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgdHJhY2sgPSB2aWRlb1RyYWNrXG4gICAgaWYgKCF2aWRlb1RyYWNrLnNhbXBsZXMgfHwgIXZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQge3NhbXBsZXN9ID0gdHJhY2tcbiAgICBsZXQgZHRzQ29ycmVjdGlvblxuICAgIGxldCBmaXJzdER0cyA9IC0xXG4gICAgbGV0IGxhc3REdHMgPSAtMVxuICAgIGxldCBmaXJzdFB0cyA9IC0xXG4gICAgbGV0IGxhc3RQdHMgPSAtMVxuXG4gICAgY29uc3QgbXA0U2FtcGxlcyA9IFtdXG4gICAgY29uc3QgbWRhdEJveCA9IHtcbiAgICAgIHNhbXBsZXM6IFtdXG4gICAgfVxuICAgIGNvbnN0IHZpZGVvU2VnbWVudCA9IG5ldyBNZWRpYVNlZ21lbnQoKVxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXZjU2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpXG4gICAgICBjb25zdCB7aXNLZXlmcmFtZSwgY3BzfSA9IGF2Y1NhbXBsZVxuICAgICAgbGV0IGR0cyA9IGF2Y1NhbXBsZS5kdHMgLSB0aGlzLl9kdHNCYXNlXG5cbiAgICAgIGlmIChkdHNDb3JyZWN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlb05leHREdHMpIHtcbiAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuZ2V0TGFzdFNlZ21lbnRCZWZvcmUoZHRzKVxuICAgICAgICAgIGlmIChsYXN0U2VnbWVudCkge1xuICAgICAgICAgICAgbGV0IGdhcFxuICAgICAgICAgICAgY29uc3Qge2xhc3REdHMsIGdhcDogbGFzdEdhcH0gPSBsYXN0U2VnbWVudFxuICAgICAgICAgICAgZ2FwID0gZHRzIC0gKGxhc3REdHMgKyBsYXN0R2FwKSA+IDMgPyBkdHMgLSAobGFzdER0cyArIGxhc3RHYXApIDogMFxuICAgICAgICAgICAgZHRzQ29ycmVjdGlvbiA9IGR0cyAtIChsYXN0RHRzICsgZ2FwKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkdHNDb3JyZWN0aW9uID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkdHNDb3JyZWN0aW9uID0gZHRzIC0gdGhpcy5fdmlkZW9OZXh0RHRzID49IDEwMDAgPyAwIDogZHRzIC0gdGhpcy5fdmlkZW9OZXh0RHRzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IG9yaWdpbkR0cyA9IGR0c1xuICAgICAgZHRzIC09IGR0c0NvcnJlY3Rpb25cbiAgICAgIGNvbnN0IHB0cyA9IGR0cyArIGNwc1xuXG4gICAgICBpZiAoZmlyc3REdHMgPT09IC0xKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICAgIGZpcnN0UHRzID0gcHRzXG4gICAgICB9XG4gICAgICBsZXQgX3VuaXRzID0gW11cbiAgICAgIHdoaWxlIChhdmNTYW1wbGUudW5pdHMubGVuZ3RoKSB7XG4gICAgICAgIGxldCBtZGF0U2FtcGxlID0ge1xuICAgICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgICAgc2l6ZTogMFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVuaXQgPSBhdmNTYW1wbGUudW5pdHMuc2hpZnQoKVxuICAgICAgICBfdW5pdHMucHVzaCh1bml0KVxuICAgICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKHVuaXQpXG4gICAgICAgIG1kYXRTYW1wbGUuc2l6ZSArPSB1bml0LmRhdGEuYnl0ZUxlbmd0aFxuXG4gICAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG4gICAgICB9XG5cbiAgICAgIGxldCBzYW1wbGVEdXJhdGlvbiA9IDBcblxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dER0cyA9IHNhbXBsZXNbMF0uZHRzIC0gdGhpcy5fZHRzQmFzZSAtIGR0c0NvcnJlY3Rpb25cbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBuZXh0RHRzIC0gZHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGggPj0gMSkgeyAvLyBsYXN0ZXN0IHNhbXBsZSwgdXNlIHNlY29uZCBsYXN0IGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV0uZHVyYXRpb25cbiAgICAgICAgfSBlbHNlIHsgLy8gdGhlIG9ubHkgb25lIHNhbXBsZSwgdXNlIHJlZmVyZW5jZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5fdmlkZW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzS2V5ZnJhbWUpIHtcbiAgICAgICAgY29uc3QgcmFwID0gbmV3IE1lZGlhU2FtcGxlKHtcbiAgICAgICAgICBkdHMsXG4gICAgICAgICAgcHRzLFxuICAgICAgICAgIGR1cmF0aW9uOiBzYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICBvcmlnaW5EdHM6IGF2Y1NhbXBsZS5kdHMsXG4gICAgICAgICAgcG9zaXRpb246IGF2Y1NhbXBsZS5wb3NpdGlvbixcbiAgICAgICAgICBpc1JBUDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICB2aWRlb1NlZ21lbnQuYWRkUkFQKHJhcClcbiAgICAgIH1cblxuICAgICAgbXA0U2FtcGxlcy5wdXNoKHtcbiAgICAgICAgZHRzLFxuICAgICAgICBjcHMsXG4gICAgICAgIHB0cyxcbiAgICAgICAgdW5pdHM6IF91bml0cyxcbiAgICAgICAgc2l6ZTogYXZjU2FtcGxlLmxlbmd0aCxcbiAgICAgICAgaXNLZXlmcmFtZSxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBvcmlnaW5EdHNcbiAgICAgIH0pXG4gICAgfVxuICAgIGNvbnN0IGZpcnN0ID0gbXA0U2FtcGxlc1swXVxuICAgIGNvbnN0IGxhc3QgPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV1cbiAgICBsYXN0RHRzID0gbGFzdC5kdHMgKyBsYXN0LmR1cmF0aW9uXG4gICAgbGFzdFB0cyA9IGxhc3QucHRzICsgbGFzdC5kdXJhdGlvblxuXG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbGFzdER0c1xuXG4gICAgdmlkZW9TZWdtZW50LnN0YXJ0RHRzID0gZmlyc3REdHNcbiAgICB2aWRlb1NlZ21lbnQuZW5kRHRzID0gbGFzdER0c1xuICAgIHZpZGVvU2VnbWVudC5zdGFydFB0cyA9IGZpcnN0UHRzXG4gICAgdmlkZW9TZWdtZW50LmVuZFB0cyA9IGxhc3RQdHNcbiAgICB2aWRlb1NlZ21lbnQub3JpZ2luU3RhcnREdHMgPSBmaXJzdC5vcmlnaW5EdHNcbiAgICB2aWRlb1NlZ21lbnQub3JpZ2luRW5kRHRzID0gbGFzdC5vcmlnaW5EdHMgKyBsYXN0LmR1cmF0aW9uXG4gICAgdmlkZW9TZWdtZW50LmdhcCA9IGR0c0NvcnJlY3Rpb25cbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IG5ldyBNZWRpYVNhbXBsZSh7XG4gICAgICBkdHM6IGZpcnN0LmR0cyxcbiAgICAgIHB0czogZmlyc3QucHRzLFxuICAgICAgZHVyYXRpb246IGZpcnN0LmR1cmF0aW9uLFxuICAgICAgaXNLZXlmcmFtZTogZmlyc3QuaXNLZXlmcmFtZSxcbiAgICAgIG9yaWdpbkR0czogZmlyc3Qub3JpZ2luRHRzXG4gICAgfSlcbiAgICBjb25zdCBsYXN0U2FtcGxlID0gbmV3IE1lZGlhU2FtcGxlKHtcbiAgICAgIGR0czogbGFzdC5kdHMsXG4gICAgICBwdHM6IGxhc3QucHRzLFxuICAgICAgZHVyYXRpb246IGxhc3QuZHVyYXRpb24sXG4gICAgICBpc0tleWZyYW1lOiBsYXN0LmlzS2V5ZnJhbWUsXG4gICAgICBvcmlnaW5EdHM6IGxhc3Qub3JpZ2luRHRzXG4gICAgfSlcbiAgICB2aWRlb1NlZ21lbnQuZmlyc3RTYW1wbGUgPSBmaXJzdFNhbXBsZVxuICAgIHZpZGVvU2VnbWVudC5sYXN0U2FtcGxlID0gbGFzdFNhbXBsZVxuICAgIGxldCBtb29mTWRhdCA9IG5ldyBCdWZmZXIoKVxuXG4gICAgdHJhY2suc2FtcGxlcyA9IG1wNFNhbXBsZXNcbiAgICB0cmFjay50aW1lID0gZmlyc3REdHNcbiAgICBjb25zdCBtb29mID0gRk1QNC5tb29mKHRyYWNrKVxuICAgIGNvbnN0IG1kYXQgPSBGTVA0Lm1kYXQobWRhdEJveClcbiAgICBtb29mTWRhdC53cml0ZShtb29mLCBtZGF0KVxuXG4gICAgaWYgKCF0aGlzLl9zdG9yZS5pc0xpdmUpIHtcbiAgICAgIHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuYXBwZW5kKHZpZGVvU2VnbWVudClcbiAgICB9XG5cbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG5cbiAgICB0aGlzLmhhbmRsZU1lZGlhRnJhZ21lbnQoe1xuICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgIGRhdGE6IG1vb2ZNZGF0LmJ1ZmZlci5idWZmZXIsXG4gICAgICBzYW1wbGVDb3VudDogbXA0U2FtcGxlcy5sZW5ndGgsXG4gICAgICBmcmFnbWVudDogdmlkZW9TZWdtZW50XG4gICAgfSlcbiAgfVxuXG4gIF9yZW11eEF1ZGlvICh0cmFjaykge1xuICAgIGlmICghdGhpcy5fYXVkaW9NZXRhKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qge3NhbXBsZXN9ID0gdHJhY2tcbiAgICBsZXQgZHRzQ29ycmVjdGlvblxuICAgIGxldCBmaXJzdER0cyA9IC0xXG4gICAgbGV0IGxhc3REdHMgPSAtMVxuICAgIC8vIGxldCBmaXJzdFB0cyA9IC0xXG4gICAgLy8gbGV0IGxhc3RQdHMgPSAtMVxuICAgIGxldCBzaWxlbnREdXJhdGlvblxuICAgIGxldCBtcDRTYW1wbGVzID0gW11cblxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cbiAgICBpZiAoIXNhbXBsZXMgfHwgIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IGlzRmlyc3REdHNJbml0ZWQgPSBmYWxzZVxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuICAgICAgY29uc3Qge3VuaXR9ID0gc2FtcGxlXG4gICAgICBsZXQgZHRzID0gc2FtcGxlLmR0cyAtIHRoaXMuX2R0c0Jhc2VcblxuICAgICAgbGV0IG5lZWRTaWxlbnRGcmFtZSA9IGZhbHNlXG4gICAgICBpZiAoZHRzQ29ycmVjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghdGhpcy5fYXVkaW9OZXh0RHRzKSB7XG4gICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLl9hdWRpb1NlZ21lbnRMaXN0LmdldExhc3RTZWdtZW50QmVmb3JlKGR0cylcbiAgICAgICAgICBpZiAobGFzdFNlZ21lbnQpIHtcbiAgICAgICAgICAgIGxldCBnYXBcbiAgICAgICAgICAgIGNvbnN0IHtsYXN0RHRzLCBnYXA6IGxhc3RHYXB9ID0gbGFzdFNlZ21lbnRcbiAgICAgICAgICAgIGdhcCA9IGR0cyAtIChsYXN0RHRzICsgbGFzdEdhcCkgPiAzID8gZHRzIC0gKGxhc3REdHMgKyBsYXN0R2FwKSA6IDBcbiAgICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSBkdHMgLSAobGFzdER0cyArIGdhcClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmVlZFNpbGVudEZyYW1lID0gdGhpcy5fZmlsbFNpbGVuY2VGcmFtZSAmJiAhdGhpcy5fdmlkZW9TZWdtZW50TGlzdC5pc0VtcHR5KClcbiAgICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSBkdHMgLSB0aGlzLl9hdWRpb05leHREdHMgPj0gMTAwMCA/IDAgOiBkdHMgLSB0aGlzLl9hdWRpb05leHREdHNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3Qgb3JpZ2luRHRzID0gZHRzXG4gICAgICBkdHMgLT0gZHRzQ29ycmVjdGlvblxuXG4gICAgICBpZiAobmVlZFNpbGVudEZyYW1lKSB7XG4gICAgICAgIGNvbnN0IHZpZGVvU2VnbWVudCA9IHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuZ2V0TGFzdFNhbXBsZUJlZm9yZShvcmlnaW5EdHMpXG5cbiAgICAgICAgaWYgKHZpZGVvU2VnbWVudCAmJiB2aWRlb1NlZ21lbnQuc3RhcnREdHMgPCBkdHMpIHtcbiAgICAgICAgICBzaWxlbnREdXJhdGlvbiA9IGR0cyAtIHZpZGVvU2VnbWVudC5zdGFydER0c1xuICAgICAgICAgIGR0cyA9IHZpZGVvU2VnbWVudC5zdGFydER0c1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5lZWRTaWxlbnRGcmFtZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0ZpcnN0RHRzSW5pdGVkKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICAgIGlzRmlyc3REdHNJbml0ZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkU2lsZW50RnJhbWUpIHtcbiAgICAgICAgc2FtcGxlcy51bnNoaWZ0KHNhbXBsZSlcbiAgICAgICAgY29uc3Qgc2lsZW50RnJhbWUgPSB0aGlzLmluaXRTaWxlbnRBdWRpbyhkdHMsIHNpbGVudER1cmF0aW9uKVxuICAgICAgICBtcDRTYW1wbGVzLnB1c2goc2lsZW50RnJhbWUpXG5cbiAgICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgICAgYnVmZmVyOiBbXSxcbiAgICAgICAgICBzaXplOiAwXG4gICAgICAgIH1cbiAgICAgICAgbWRhdFNhbXBsZS5idWZmZXIucHVzaCh7XG4gICAgICAgICAgZGF0YTogc2lsZW50RnJhbWUudW5pdFxuICAgICAgICB9KVxuICAgICAgICBtZGF0U2FtcGxlLnNpemUgKz0gc2lsZW50RnJhbWUudW5pdC5ieXRlTGVuZ3RoXG5cbiAgICAgICAgbWRhdEJveC5zYW1wbGVzLnB1c2gobWRhdFNhbXBsZSlcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuXG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBuZXh0RHRzID0gc2FtcGxlc1swXS5kdHMgLSB0aGlzLl9kdHNCYXNlIC0gZHRzQ29ycmVjdGlvblxuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIHVzZSBzZWNvbmQgbGFzdCBzYW1wbGUgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5fYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgbXA0U2FtcGxlID0ge1xuICAgICAgICBkdHMsXG4gICAgICAgIHB0czogZHRzLFxuICAgICAgICBjdHM6IDAsXG4gICAgICAgIHNpemU6IHVuaXQuYnl0ZUxlbmd0aCxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBvcmlnaW5EdHNcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRTYW1wbGUuYnVmZmVyLnB1c2goe1xuICAgICAgICBkYXRhOiB1bml0XG4gICAgICB9KVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IHVuaXQuYnl0ZUxlbmd0aFxuXG4gICAgICBtZGF0Qm94LnNhbXBsZXMucHVzaChtZGF0U2FtcGxlKVxuXG4gICAgICBtcDRTYW1wbGVzLnB1c2gobXA0U2FtcGxlKVxuICAgIH1cblxuICAgIGNvbnN0IGxhc3QgPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV1cbiAgICBsYXN0RHRzID0gbGFzdC5kdHMgKyBsYXN0LmR1cmF0aW9uXG5cbiAgICB0aGlzLl9hdWRpb05leHREdHMgPSBsYXN0RHRzXG5cbiAgICBjb25zdCBhdWRpb1NlZ21lbnQgPSBuZXcgTWVkaWFTZWdtZW50KClcbiAgICBhdWRpb1NlZ21lbnQuc3RhcnREdHMgPSBmaXJzdER0c1xuICAgIGF1ZGlvU2VnbWVudC5lbmREdHMgPSBsYXN0RHRzXG4gICAgYXVkaW9TZWdtZW50LnN0YXJ0UHRzID0gZmlyc3REdHNcbiAgICBhdWRpb1NlZ21lbnQuZW5kUHRzID0gbGFzdER0c1xuICAgIGF1ZGlvU2VnbWVudC5vcmlnaW5TdGFydER0cyA9IG1wNFNhbXBsZXNbMF0ub3JpZ2luRHRzXG4gICAgYXVkaW9TZWdtZW50Lm9yaWdpbkVuZER0cyA9IGxhc3Qub3JpZ2luRHRzICsgbGFzdC5kdXJhdGlvblxuICAgIGF1ZGlvU2VnbWVudC5nYXAgPSBkdHNDb3JyZWN0aW9uXG4gICAgYXVkaW9TZWdtZW50LmZpcnN0U2FtcGxlID0gbmV3IE1lZGlhU2FtcGxlKHtcbiAgICAgIGR0czogbXA0U2FtcGxlc1swXS5kdHMsXG4gICAgICBwdHM6IG1wNFNhbXBsZXNbMF0ucHRzLFxuICAgICAgZHVyYXRpb246IG1wNFNhbXBsZXNbMF0uZHVyYXRpb24sXG4gICAgICBvcmlnaW5EdHM6IG1wNFNhbXBsZXNbMF0ub3JpZ2luRHRzXG4gICAgfSlcbiAgICBhdWRpb1NlZ21lbnQubGFzdFNhbXBsZSA9IG5ldyBNZWRpYVNhbXBsZSh7XG4gICAgICBkdHM6IGxhc3QuZHRzLFxuICAgICAgcHRzOiBsYXN0LnB0cyxcbiAgICAgIGR1cmF0aW9uOiBsYXN0LmR1cmF0aW9uLFxuICAgICAgb3JpZ2luRHRzOiBsYXN0Lm9yaWdpbkR0c1xuICAgIH0pXG5cbiAgICB0cmFjay5zYW1wbGVzID0gbXA0U2FtcGxlc1xuICAgIGNvbnN0IG1vb2ZNZGF0ID0gbmV3IEJ1ZmZlcigpXG4gICAgdHJhY2sudGltZSA9IGZpcnN0RHRzXG4gICAgY29uc3QgbW9vZiA9IEZNUDQubW9vZih0cmFjaywgZmlyc3REdHMpXG4gICAgY29uc3QgbWRhdCA9IEZNUDQubWRhdChtZGF0Qm94KVxuICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICBpZiAoIXRoaXMuX3N0b3JlLmlzTGl2ZSkge1xuICAgICAgdGhpcy5fYXVkaW9TZWdtZW50TGlzdC5hcHBlbmQoYXVkaW9TZWdtZW50KVxuICAgIH1cbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG4gICAgdGhpcy5oYW5kbGVNZWRpYUZyYWdtZW50KHtcbiAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICBkYXRhOiBtb29mTWRhdC5idWZmZXIuYnVmZmVyLFxuICAgICAgc2FtcGxlQ291bnQ6IG1wNFNhbXBsZXMubGVuZ3RoLFxuICAgICAgZnJhZ21lbnQ6IGF1ZGlvU2VnbWVudFxuICAgIH0pXG4gIH1cblxuICBpbml0U2lsZW50QXVkaW8gKGR0cywgZHVyYXRpb24pIHtcbiAgICBjb25zdCB1bml0ID0gTXA0UmVtdXhlci5nZXRTaWxlbnRGcmFtZSh0aGlzLl9hdWRpb01ldGEuY2hhbm5lbENvdW50KVxuICAgIHJldHVybiB7XG4gICAgICBkdHMsXG4gICAgICBwdHM6IGR0cyxcbiAgICAgIGNwczogMCxcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgdW5pdCxcbiAgICAgIHNpemU6IHVuaXQuYnl0ZUxlbmd0aCxcbiAgICAgIG9yaWdpbkR0czogZHRzXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFNpbGVudEZyYW1lIChjaGFubmVsQ291bnQpIHtcbiAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4OGVdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA0KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODAsIDB4MmMsIDB4ODAsIDB4MDgsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA1KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MDAsIDB4YjIsIDB4MDAsIDB4MjAsIDB4MDgsIDB4ZTBdKVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJpbXBvcnQgTG9nIGZyb20gJy4uLy4uL3V0aWxzL0xvZydcbmltcG9ydCBUcmFuc0NvZGVyIGZyb20gJy4uL1RyYW5zQ29kZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW11eGVyIGV4dGVuZHMgVHJhbnNDb2RlciB7XG4gIGRpc3BhdGNoICh0eXBlLCAuLi5wYXlsb2FkKSB7XG4gICAgY29uc3QgcHJlZml4ID0gJ3JlbXV4ZXJfJ1xuICAgIHRoaXMuX29ic2VydmVyLmVtaXQoYCR7cHJlZml4fSR7dHlwZX1gLCAuLi5wYXlsb2FkKVxuICB9XG4gIGVycm9yIChtZXNzYWdlKSB7XG4gICAgY29uc3QgeyBDTEFTU19OQU1FID0gJ1JlbXV4ZXInIH0gPSB0aGlzXG4gICAgTG9nLmVycm9yKGBbJHtDTEFTU19OQU1FfSBlcnJvcl0gYCwgbWVzc2FnZSlcbiAgfVxuXG4gIGluZm8gKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IENMQVNTX05BTUUgPSAnUmVtdXhlcicgfSA9IHRoaXNcbiAgICBMb2cuaW5mbyhgWyR7Q0xBU1NfTkFNRX0gaW5mb10gYCwgbWVzc2FnZSlcbiAgfVxuXG4gIGxvZyAobWVzc2FnZSkge1xuICAgIGNvbnN0IHsgQ0xBU1NfTkFNRSA9ICdSZW11eGVyJyB9ID0gdGhpc1xuICAgIExvZy5sb2coYFske0NMQVNTX05BTUV9IGxvZ10gYCwgbWVzc2FnZSlcbiAgfVxuXG4gIHdhcm4gKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IENMQVNTX05BTUUgPSAnUmVtdXhlcicgfSA9IHRoaXNcbiAgICBMb2cud2FybihgWyR7Q0xBU1NfTkFNRX0gd2Fybl0gYCwgbWVzc2FnZSlcbiAgfVxufVxuIiwiY2xhc3MgTGl2ZVRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IF9oZWFkZXJzID0gbmV3IHdpbmRvdy5IZWFkZXJzKCk7XG4gICAgICAgIGNvbnN0IF9jb25maWcgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiBPYmplY3QuYXNzaWduKHt9LCBfaGVhZGVycyksXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgY2FjaGU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCBPYmplY3QuYXNzaWduKHt9LCBfY29uZmlnLCBjb25maWcpKTtcbiAgICB9XG5cbiAgICBydW4gKGNhbGxiYWNrKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZSAocmVhZGVyKSB7XG4gICAgICAgICAgICByZWFkZXIucmVhZCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQuZG9uZSA/IHVuZGVmaW5lZCA6IHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZWFkZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2godGhpcy5yZXF1ZXN0KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWFkZXIgPSByZXMuYm9keS5nZXRSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVhZGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpdmVUYXNrOyIsImltcG9ydCBYSFJMb2FkZXIgZnJvbSAnLi9sb2FkZXJzL1hIUkxvYWRlcidcbmltcG9ydCBGZXRjaExvYWRlciBmcm9tICcuL2xvYWRlcnMvRmV0Y2hMb2FkZXInXG5jb25zdCBMb2FkQ2xzID0gKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgaWYgKHdpbmRvdy5mZXRjaCkge1xuICAgIHJldHVybiBGZXRjaExvYWRlclxuICB9XG4gIHJldHVybiBYSFJMb2FkZXJcbn0pKHdpbmRvdylcbmNsYXNzIFZvZFRhc2sge1xuICBjb25zdHJ1Y3RvciAodXJsLCByYW5nZSwgaGVhZGVycykge1xuICAgIHRoaXMudXJsID0gdXJsXG4gICAgdGhpcy5yYW5nZSA9IHJhbmdlXG4gICAgdGhpcy5pZCA9IHJhbmdlLmpvaW4oJy0nKVxuICAgIHRoaXMub24gPSBmYWxzZVxuICAgIHRoaXMubG9hZGVyID0gbmV3IExvYWRDbHModXJsLCByYW5nZSwgaGVhZGVycylcbiAgICB0aGlzLmlzQ2FuY2VsZWQgPSBmYWxzZVxuICAgIFZvZFRhc2sucXVldWUucHVzaCh0aGlzKVxuICAgIFZvZFRhc2sudXBkYXRlKClcbiAgfVxuXG4gIGNhbmNlbCAoKSB7XG4gICAgdGhpcy5pc0NhbmNlbGVkID0gdHJ1ZVxuICAgIHRoaXMubG9hZGVyLmNhbmNlbCgpXG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlIChsb2FkZXIpIHtcbiAgICBWb2RUYXNrLnF1ZXVlLmZpbHRlcigoaXRlbSwgaWR4KSA9PiB7XG4gICAgICBpZiAoaXRlbS51cmwgPT09IGxvYWRlci51cmwgJiYgaXRlbS5pZCA9PT0gbG9hZGVyLmlkKSB7XG4gICAgICAgIFZvZFRhc2sucXVldWUuc3BsaWNlKGlkeCwgMSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgVm9kVGFzay51cGRhdGUoKVxuICB9XG5cbiAgc3RhdGljIHVwZGF0ZSAoKSB7XG4gICAgbGV0IFF1ZXVlID0gVm9kVGFzay5xdWV1ZVxuICAgIGxldCBzZW5kZWQgPSBRdWV1ZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ub24pXG4gICAgbGV0IHdhaXQgPSBRdWV1ZS5maWx0ZXIoaXRlbSA9PiAhaXRlbS5vbilcbiAgICBsZXQgbWF4ID0gVm9kVGFzay5saW1pdCAtIHNlbmRlZC5sZW5ndGhcbiAgICB3YWl0LmZvckVhY2goKGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgaWYgKGlkeCA8IG1heCkge1xuICAgICAgICBpdGVtLnJ1bigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJ1biAoKSB7XG4gICAgaWYgKHRoaXMubG9hZGVyLnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgIHRoaXMub24gPSB0cnVlXG4gICAgICB0aGlzLmxvYWRlci5ydW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICBWb2RUYXNrLnJlbW92ZSgpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsZWFyICgpIHtcbiAgICBWb2RUYXNrLnF1ZXVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoIWl0ZW0ubG9hZGVyLmNvbXBsZXRlKSB7XG4gICAgICAgIGl0ZW0uY2FuY2VsKClcbiAgICAgIH1cbiAgICB9KVxuICAgIFZvZFRhc2sucXVldWUubGVuZ3RoID0gMFxuICB9XG5cbiAgZ2V0IHByb21pc2UgKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRlci5wcm9taXNlXG4gIH1cbiAgZ2V0IHRpbWVTdGFtcCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZGVyLnRpbWVTdGFtcFxuICB9XG59XG5cblZvZFRhc2sucXVldWUgPSBbXVxuVm9kVGFzay5saW1pdCA9IDJcbndpbmRvdy5Wb2RUYXNrID0gVm9kVGFza1xuXG5leHBvcnQgZGVmYXVsdCBWb2RUYXNrXG4iLCJpbXBvcnQgVm9kVGFzayBmcm9tICcuLi9Wb2RUYXNrJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmV0Y2hMb2FkZXIge1xuICBjb25zdHJ1Y3RvciAodXJsLCByYW5nZSwgY29uZmlnID0ge30pIHtcbiAgICB0aGlzLnVybCA9IHVybFxuICAgIHRoaXMub24gPSBmYWxzZVxuICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZVxuICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2VcbiAgICB0aGlzLnRpbWVTdGFtcCA9IERhdGUubm93KClcbiAgICBjb25zdCBfY29uZmlnID0ge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBSYW5nZTogYGJ5dGVzPSR7cmFuZ2VbMF19LSR7cmFuZ2VbMV19YFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjYWNoZTogJ2RlZmF1bHQnLFxuICAgICAgbW9kZTogJ2NvcnMnXG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5vbiA9IHRydWVcbiAgICAgIHJldHVybiB3aW5kb3cuZmV0Y2godXJsLCBPYmplY3QuYXNzaWduKHt9LCBfY29uZmlnLCBjb25maWcpKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzID4gMjk5IHx8IHJlcy5zdGF0dXMgPCAyMDAgfHwgIXJlcy5vaykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUgPSB0cnVlXG4gICAgICAgICAgVm9kVGFzay5yZW1vdmUodGhpcylcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGB1cmwgJHtyZXMuc3RhdHVzfSAke3Jlcy5zdGF0dXNUZXh0fWApKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKVxuICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmFycmF5QnVmZmVyKCkpLnRoZW4oYnVmZmVyID0+IHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IHRydWVcbiAgICAgICAgdGhpcy5ieXRlTGVuZ3RoID0gYnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAgICAgVm9kVGFzay5yZW1vdmUodGhpcylcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSByZXR1cm4ge31cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgdGltZVN0YW1wOiB0aGlzLnRpbWVTdGFtcFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJ1biAoKSB7XG4gICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMucmVxdWVzdCgpXG4gIH1cblxuICBnZXQgcmVhZHlTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIGNhbmNlbCAoKSB7XG4gICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlXG4gIH1cblxuICBnZXQgcHJvbWlzZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMub24gPyB0aGlzLl9wcm9taXNlIDogdGhpcy5yZXF1ZXN0KClcbiAgfVxufVxuIiwiaW1wb3J0IFZvZFRhc2sgZnJvbSAnLi4vVm9kVGFzayc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBYSFJMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yICh1cmwsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHVybCk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignUmFuZ2UnLCBgYnl0ZXM9JHtyYW5nZVswXX0tJHtyYW5nZVsxXX1gKTtcbiAgICAgICAgeGhyLm9uYWJvcnQgPSAoKSA9PiB7XG4gICAgICAgICAgICBWb2RUYXNrLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCB8fCB4aHIuc3RhdHVzID09PSAyMDYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBWb2RUYXNrLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIub25lcnJvciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIFZvZFRhc2sucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5feGhyID0geGhyO1xuICAgIH1cblxuICAgIGdldCBwcm9taXNlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0IHJlYWR5U3RhdGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feGhyLnJlYWR5U3RhdGU7XG4gICAgfVxuXG4gICAgcnVuICgpIHtcbiAgICAgICAgdGhpcy5feGhyLnNlbmQoKTtcbiAgICB9XG5cbiAgICBjYW5jZWwgKCkge1xuICAgICAgICB0aGlzLl94aHIuYWJvcnQoKTtcbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhVmlldzRSZWFkIHtcbiAgICBjb25zdHJ1Y3RvciAoYnVmZmVyLCBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2R2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmluaXRQcm94eSgpO1xuICAgIH1cblxuICAgIGluaXRQcm94eSAoKSB7XG4gICAgICAgIGNvbnN0IHNpemVBcnIgPSBbOCwgMTYsIDMyXTtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgX3N0b3JlIH0gPSB0aGlzLl9jb250ZXh0O1xuICAgICAgICBzaXplQXJyLmZvckVhY2goc2l6ZSA9PiB7XG4gICAgICAgICAgICB0aGlzW2BnZXRVaW50JHtzaXplfWBdID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICAgICAgICAgIGlmICghb2Zmc2V0KSB7IG9mZnNldCA9IHNlbGYuX2NvbnRleHQucmVhZE9mZnNldDsgfVxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPT09IHNlbGYuX2NvbnRleHQucmVhZE9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9jb250ZXh0LnJlYWRPZmZzZXQgKz0gc2l6ZSAvIDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLl9kdltgZ2V0VWludCR7c2l6ZX1gXShvZmZzZXQsICFfc3RvcmUuaXNMZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmmL7lvI/lo7DmmI7kuIDkuKrmr5TlhbblroPkvY3mlbDmm7TluLjnlKjor7vlj5YyNOS9jeaVtOaVsOaWueazlVxuICAgICAgICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAgICAgICAqIEBwYXJhbSBpc0hpZ2hcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZ2V0VWludDI0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRVaW50KDI0LCBvZmZzZXQsIGZhbHNlKTsgLy8g5Lya6K+75Y+WVWludDMyLOWBmiBhbmQg5pON5L2c5LmL5ZCO5Zue6YCA5LiA5L2N44CCXG4gICAgICAgICAgICBzZWxmLl9jb250ZXh0LnJlYWRPZmZzZXQgLT0gMTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5nZXRVaW50ID0gZnVuY3Rpb24gKHNpemUsIG9mZnNldCwgaXNIaWdoID0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNpemUgPiAzMikge1xuICAgICAgICAgICAgICAgIHRocm93ICdub3Qgc3VwcG9ydGVkIHJlYWQgc2l6ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVhZFNpemUgPSAzMjtcbiAgICAgICAgICAgIGlmICghdGhpc1tgZ2V0VWludCR7c2l6ZX1gXSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzaXplQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXplIDwgc2l6ZUFycltpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZFNpemUgPSBzaXplQXJyW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG51bVRvQW5kID0gaXNIaWdoID8gRGF0YVZpZXc0UmVhZC5nZXRBbmROdW0oMCwgc2l6ZSAtIDEsIHJlYWRTaXplKSA6IERhdGFWaWV3NFJlYWQuZ2V0QW5kTnVtKHJlYWRTaXplIC0gc2l6ZSwgcmVhZFNpemUgLSAxLCByZWFkU2l6ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGZbYGdldFVpbnQke3JlYWRTaXplfWBdKG9mZnNldCwgIV9zdG9yZS5pc0xlKSAmIG51bVRvQW5kO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmW2BnZXRVaW50JHtyZWFkU2l6ZX1gXShvZmZzZXQsICFfc3RvcmUuaXNMZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEFuZE51bSAoYmVnaW4sIGVuZCwgc2l6ZSA9IDgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGxldCBpbmRleCA9IC0tc2l6ZTtcbiAgICAgICAgd2hpbGUgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gZW5kIHx8IGluZGV4IDwgYmVnaW4pIHtcbiAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gTWF0aC5wb3coMiwgc2l6ZSAtIGluZGV4KTtcbiAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59IiwiaW1wb3J0IExvZ2dlciBmcm9tICcuL0xvZyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBHb2xvbWIge1xuICAgIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIC8vIHRoZSBudW1iZXIgb2YgYnl0ZXMgbGVmdCB0byBleGFtaW5lIGluIHRoaXMuZGF0YVxuICAgICAgICB0aGlzLmJ5dGVzQXZhaWxhYmxlID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICAvLyB0aGUgY3VycmVudCB3b3JkIGJlaW5nIGV4YW1pbmVkXG4gICAgICAgIHRoaXMud29yZCA9IDA7IC8vIDp1aW50XG4gICAgICAgIC8vIHRoZSBudW1iZXIgb2YgYml0cyBsZWZ0IHRvIGV4YW1pbmUgaW4gdGhlIGN1cnJlbnQgd29yZFxuICAgICAgICB0aGlzLmJpdHNBdmFpbGFibGUgPSAwOyAvLyA6dWludFxuICAgIH1cbiAgICAvLyAoKTp2b2lkXG4gICAgbG9hZFdvcmQgKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIGJ5dGVzQXZhaWxhYmxlID0gdGhpcy5ieXRlc0F2YWlsYWJsZSxcbiAgICAgICAgICAgIHBvc2l0aW9uID0gZGF0YS5ieXRlTGVuZ3RoIC0gYnl0ZXNBdmFpbGFibGUsXG4gICAgICAgICAgICB3b3JraW5nQnl0ZXMgPSBuZXcgVWludDhBcnJheSg0KSxcbiAgICAgICAgICAgIGF2YWlsYWJsZUJ5dGVzID0gTWF0aC5taW4oNCwgYnl0ZXNBdmFpbGFibGUpO1xuICAgICAgICBpZiAoYXZhaWxhYmxlQnl0ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gYnl0ZXMgYXZhaWxhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgd29ya2luZ0J5dGVzLnNldChkYXRhLnN1YmFycmF5KHBvc2l0aW9uLCBwb3NpdGlvbiArIGF2YWlsYWJsZUJ5dGVzKSk7XG4gICAgICAgIHRoaXMud29yZCA9IG5ldyBEYXRhVmlldyh3b3JraW5nQnl0ZXMuYnVmZmVyKS5nZXRVaW50MzIoMCk7XG4gICAgICAgIC8vIHRyYWNrIHRoZSBhbW91bnQgb2YgdGhpcy5kYXRhIHRoYXQgaGFzIGJlZW4gcHJvY2Vzc2VkXG4gICAgICAgIHRoaXMuYml0c0F2YWlsYWJsZSA9IGF2YWlsYWJsZUJ5dGVzICogODtcbiAgICAgICAgdGhpcy5ieXRlc0F2YWlsYWJsZSAtPSBhdmFpbGFibGVCeXRlcztcbiAgICB9XG5cbiAgICAvLyAoY291bnQ6aW50KTp2b2lkXG4gICAgc2tpcEJpdHMgKGNvdW50KSB7XG4gICAgICAgIHZhciBza2lwQnl0ZXM7IC8vIDppbnRcbiAgICAgICAgaWYgKHRoaXMuYml0c0F2YWlsYWJsZSA+IGNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLndvcmQgPDw9IGNvdW50O1xuICAgICAgICAgICAgdGhpcy5iaXRzQXZhaWxhYmxlIC09IGNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnQgLT0gdGhpcy5iaXRzQXZhaWxhYmxlO1xuICAgICAgICAgICAgc2tpcEJ5dGVzID0gY291bnQgPj4gMztcbiAgICAgICAgICAgIGNvdW50IC09IChza2lwQnl0ZXMgPj4gMyk7XG4gICAgICAgICAgICB0aGlzLmJ5dGVzQXZhaWxhYmxlIC09IHNraXBCeXRlcztcbiAgICAgICAgICAgIHRoaXMubG9hZFdvcmQoKTtcbiAgICAgICAgICAgIHRoaXMud29yZCA8PD0gY291bnQ7XG4gICAgICAgICAgICB0aGlzLmJpdHNBdmFpbGFibGUgLT0gY291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNraXBCeXRlcztcbiAgICB9XG5cbiAgICAvLyAoc2l6ZTppbnQpOnVpbnRcbiAgICByZWFkQml0cyAoc2l6ZSkge1xuICAgICAgICBsZXQgYml0cyA9IE1hdGgubWluKHRoaXMuYml0c0F2YWlsYWJsZSwgc2l6ZSksIC8vIDp1aW50XG4gICAgICAgICAgICB2YWx1ID0gdGhpcy53b3JkID4+PiAoMzIgLSBiaXRzKTsgLy8gOnVpbnRcbiAgICAgICAgaWYgKHNpemUgPiAzMikge1xuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKCdDYW5ub3QgcmVhZCBtb3JlIHRoYW4gMzIgYml0cyBhdCBhIHRpbWUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJpdHNBdmFpbGFibGUgLT0gYml0cztcbiAgICAgICAgaWYgKHRoaXMuYml0c0F2YWlsYWJsZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMud29yZCA8PD0gYml0cztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJ5dGVzQXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkV29yZCgpO1xuICAgICAgICB9XG4gICAgICAgIGJpdHMgPSBzaXplIC0gYml0cztcbiAgICAgICAgaWYgKGJpdHMgPiAwICYmIHRoaXMuYml0c0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHUgPDwgYml0cyB8IHRoaXMucmVhZEJpdHMoYml0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vICgpOnVpbnRcbiAgICBza2lwTFogKCkge1xuICAgICAgICB2YXIgbGVhZGluZ1plcm9Db3VudDsgLy8gOnVpbnRcbiAgICAgICAgZm9yIChsZWFkaW5nWmVyb0NvdW50ID0gMDsgbGVhZGluZ1plcm9Db3VudCA8IHRoaXMuYml0c0F2YWlsYWJsZTsgKytsZWFkaW5nWmVyb0NvdW50KSB7XG4gICAgICAgICAgICBpZiAoMCAhPT0gKHRoaXMud29yZCAmICgweDgwMDAwMDAwID4+PiBsZWFkaW5nWmVyb0NvdW50KSkpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgYml0IG9mIHdvcmtpbmcgd29yZCBpcyAxXG4gICAgICAgICAgICAgICAgdGhpcy53b3JkIDw8PSBsZWFkaW5nWmVyb0NvdW50O1xuICAgICAgICAgICAgICAgIHRoaXMuYml0c0F2YWlsYWJsZSAtPSBsZWFkaW5nWmVyb0NvdW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBsZWFkaW5nWmVyb0NvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHdlIGV4aGF1c3RlZCB3b3JkIGFuZCBzdGlsbCBoYXZlIG5vdCBmb3VuZCBhIDFcbiAgICAgICAgdGhpcy5sb2FkV29yZCgpO1xuICAgICAgICByZXR1cm4gbGVhZGluZ1plcm9Db3VudCArIHRoaXMuc2tpcExaKCk7XG4gICAgfVxuXG4gICAgLy8gKCk6dm9pZFxuICAgIHNraXBVRUcgKCkge1xuICAgICAgICB0aGlzLnNraXBCaXRzKDEgKyB0aGlzLnNraXBMWigpKTtcbiAgICB9XG5cbiAgICAvLyAoKTp2b2lkXG4gICAgc2tpcEVHICgpIHtcbiAgICAgICAgdGhpcy5za2lwQml0cygxICsgdGhpcy5za2lwTFooKSk7XG4gICAgfVxuXG4gICAgLy8gKCk6dWludFxuICAgIHJlYWRVRUcgKCkge1xuICAgICAgICB2YXIgY2x6ID0gdGhpcy5za2lwTFooKTsgLy8gOnVpbnRcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoY2x6ICsgMSkgLSAxO1xuICAgIH1cblxuICAgIC8vICgpOmludFxuICAgIHJlYWRFRyAoKSB7XG4gICAgICAgIHZhciB2YWx1ID0gdGhpcy5yZWFkVUVHKCk7IC8vIDppbnRcbiAgICAgICAgaWYgKDB4MDEgJiB2YWx1KSB7XG4gICAgICAgICAgICAvLyB0aGUgbnVtYmVyIGlzIG9kZCBpZiB0aGUgbG93IG9yZGVyIGJpdCBpcyBzZXRcbiAgICAgICAgICAgIHJldHVybiAoMSArIHZhbHUpID4+PiAxOyAvLyBhZGQgMSB0byBtYWtlIGl0IGV2ZW4sIGFuZCBkaXZpZGUgYnkgMlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xICogKHZhbHUgPj4+IDEpOyAvLyBkaXZpZGUgYnkgdHdvIHRoZW4gbWFrZSBpdCBuZWdhdGl2ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU29tZSBjb252ZW5pZW5jZSBmdW5jdGlvbnNcbiAgICAvLyA6Qm9vbGVhblxuICAgIHJlYWRCb29sZWFuICgpIHtcbiAgICAgICAgcmV0dXJuIDEgPT09IHRoaXMucmVhZEJpdHMoMSk7XG4gICAgfVxuXG4gICAgLy8gKCk6aW50XG4gICAgcmVhZFVCeXRlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoOCk7XG4gICAgfVxuXG4gICAgLy8gKCk6aW50XG4gICAgcmVhZFVTaG9ydCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDE2KTtcbiAgICB9XG4gICAgLy8gKCk6aW50XG4gICAgcmVhZFVJbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkQml0cygzMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWR2YW5jZSB0aGUgRXhwR29sb21iIGRlY29kZXIgcGFzdCBhIHNjYWxpbmcgbGlzdC4gVGhlIHNjYWxpbmdcbiAgICAgKiBsaXN0IGlzIG9wdGlvbmFsbHkgdHJhbnNtaXR0ZWQgYXMgcGFydCBvZiBhIHNlcXVlbmNlIHBhcmFtZXRlclxuICAgICAqIHNldCBhbmQgaXMgbm90IHJlbGV2YW50IHRvIHRyYW5zbXV4aW5nLlxuICAgICAqIEBwYXJhbSBjb3VudCB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVudHJpZXMgaW4gdGhpcyBzY2FsaW5nIGxpc3RcbiAgICAgKiBAc2VlIFJlY29tbWVuZGF0aW9uIElUVS1UIEguMjY0LCBTZWN0aW9uIDcuMy4yLjEuMS4xXG4gICAgICovXG4gICAgc2tpcFNjYWxpbmdMaXN0IChjb3VudCkge1xuICAgICAgICB2YXIgbGFzdFNjYWxlID0gOCxcbiAgICAgICAgICAgIG5leHRTY2FsZSA9IDgsXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgZGVsdGFTY2FsZTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgICAgIGlmIChuZXh0U2NhbGUgIT09IDApIHtcbiAgICAgICAgICAgICAgICBkZWx0YVNjYWxlID0gdGhpcy5yZWFkRUcoKTtcbiAgICAgICAgICAgICAgICBuZXh0U2NhbGUgPSAobGFzdFNjYWxlICsgZGVsdGFTY2FsZSArIDI1NikgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0U2NhbGUgPSAobmV4dFNjYWxlID09PSAwKVxuICAgICAgICAgICAgICAgID8gbGFzdFNjYWxlXG4gICAgICAgICAgICAgICAgOiBuZXh0U2NhbGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGEgc2VxdWVuY2UgcGFyYW1ldGVyIHNldCBhbmQgcmV0dXJuIHNvbWUgaW50ZXJlc3RpbmcgdmlkZW9cbiAgICAgKiBwcm9wZXJ0aWVzLiBBIHNlcXVlbmNlIHBhcmFtZXRlciBzZXQgaXMgdGhlIEgyNjQgbWV0YWRhdGEgdGhhdFxuICAgICAqIGRlc2NyaWJlcyB0aGUgcHJvcGVydGllcyBvZiB1cGNvbWluZyB2aWRlbyBmcmFtZXMuXG4gICAgICogQHBhcmFtIGRhdGEge1VpbnQ4QXJyYXl9IHRoZSBieXRlcyBvZiBhIHNlcXVlbmNlIHBhcmFtZXRlciBzZXRcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IGFuIG9iamVjdCB3aXRoIGNvbmZpZ3VyYXRpb24gcGFyc2VkIGZyb20gdGhlXG4gICAgICogc2VxdWVuY2UgcGFyYW1ldGVyIHNldCwgaW5jbHVkaW5nIHRoZSBkaW1lbnNpb25zIG9mIHRoZVxuICAgICAqIGFzc29jaWF0ZWQgdmlkZW8gZnJhbWVzLlxuICAgICAqL1xuICAgIHJlYWRTUFMgKCkge1xuICAgICAgICB2YXIgZnJhbWVDcm9wTGVmdE9mZnNldCA9IDAsXG4gICAgICAgICAgICBmcmFtZUNyb3BSaWdodE9mZnNldCA9IDAsXG4gICAgICAgICAgICBmcmFtZUNyb3BUb3BPZmZzZXQgPSAwLFxuICAgICAgICAgICAgZnJhbWVDcm9wQm90dG9tT2Zmc2V0ID0gMCxcbiAgICAgICAgICAgIHByb2ZpbGVJZGMsXG4gICAgICAgICAgICAvLyBwcm9maWxlQ29tcGF0LFxuICAgICAgICAgICAgbGV2ZWxJZGMsXG4gICAgICAgICAgICBjb2RlY1dpZHRoLFxuICAgICAgICAgICAgY29kZWNIZWlnaHQsXG4gICAgICAgICAgICBwcmVzZW50V2lkdGgsXG4gICAgICAgICAgICBudW1SZWZGcmFtZXNJblBpY09yZGVyQ250Q3ljbGUsXG4gICAgICAgICAgICBwaWNXaWR0aEluTWJzTWludXMxLFxuICAgICAgICAgICAgcGljSGVpZ2h0SW5NYXBVbml0c01pbnVzMSxcbiAgICAgICAgICAgIGZyYW1lTWJzT25seUZsYWcsXG4gICAgICAgICAgICBzY2FsaW5nTGlzdENvdW50LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHJlYWRVQnl0ZSA9IHRoaXMucmVhZFVCeXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZWFkQml0cyA9IHRoaXMucmVhZEJpdHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlYWRVRUcgPSB0aGlzLnJlYWRVRUcuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlYWRCb29sZWFuID0gdGhpcy5yZWFkQm9vbGVhbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgc2tpcEJpdHMgPSB0aGlzLnNraXBCaXRzLmJpbmQodGhpcyksXG4gICAgICAgICAgICBza2lwRUcgPSB0aGlzLnNraXBFRy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgc2tpcFVFRyA9IHRoaXMuc2tpcFVFRy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgc2tpcFNjYWxpbmdMaXN0ID0gdGhpcy5za2lwU2NhbGluZ0xpc3QuYmluZCh0aGlzKTtcblxuICAgICAgICByZWFkVUJ5dGUoKTtcbiAgICAgICAgcHJvZmlsZUlkYyA9IHJlYWRVQnl0ZSgpOyAvLyBwcm9maWxlX2lkY1xuICAgICAgICByZWFkQml0cyg1KTsgLy8gcHJvZmlsZUNvbXBhdCBjb25zdHJhaW50X3NldFswLTRdX2ZsYWcsIHUoNSlcbiAgICAgICAgc2tpcEJpdHMoMyk7IC8vIHJlc2VydmVkX3plcm9fM2JpdHMgdSgzKSxcbiAgICAgICAgbGV2ZWxJZGMgPSByZWFkVUJ5dGUoKTsgLy8gbGV2ZWxfaWRjIHUoOClcbiAgICAgICAgc2tpcFVFRygpOyAvLyBzZXFfcGFyYW1ldGVyX3NldF9pZFxuICAgICAgICBsZXQgY2hyb21hRm9ybWF0SWRjID0gMTtcbiAgICAgICAgbGV0IGNocm9tYUZvcm1hdCA9IDQyMDtcbiAgICAgICAgbGV0IGNocm9tYUZvcm1hdHMgPSBbMCwgNDIwLCA0MjIsIDQ0NF07XG4gICAgICAgIGxldCBiaXREZXB0aEx1bWEgPSA4O1xuICAgICAgICBjb25zdCBwcm9maWxlSWRjcyA9IFsxMDAsIDExMCwgMTIyLCAyNDQsIDQ0LCA4MywgODYsIDExOCwgMTI4XTtcbiAgICAgICAgLy8gc29tZSBwcm9maWxlcyBoYXZlIG1vcmUgb3B0aW9uYWwgZGF0YSB3ZSBkb24ndCBuZWVkXG4gICAgICAgIGlmIChwcm9maWxlSWRjcy5pbmNsdWRlcyhwcm9maWxlSWRjKSkge1xuICAgICAgICAgICAgY2hyb21hRm9ybWF0SWRjID0gcmVhZFVFRygpO1xuICAgICAgICAgICAgaWYgKGNocm9tYUZvcm1hdElkYyA9PT0gMykge1xuICAgICAgICAgICAgICAgIHNraXBCaXRzKDEpOyAvLyBzZXBhcmF0ZV9jb2xvdXJfcGxhbmVfZmxhZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNocm9tYUZvcm1hdElkYyA8PSAzKSB7XG4gICAgICAgICAgICAgICAgY2hyb21hRm9ybWF0ID0gY2hyb21hRm9ybWF0c1tjaHJvbWFGb3JtYXRJZGNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYml0RGVwdGhMdW1hID0gcmVhZFVFRygpICsgODsgLy8gYml0X2RlcHRoX2x1bWFfbWludXM4XG4gICAgICAgICAgICBza2lwVUVHKCk7IC8vIGJpdF9kZXB0aF9jaHJvbWFfbWludXM4XG4gICAgICAgICAgICBza2lwQml0cygxKTsgLy8gcXBwcmltZV95X3plcm9fdHJhbnNmb3JtX2J5cGFzc19mbGFnXG4gICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBzZXFfc2NhbGluZ19tYXRyaXhfcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgc2NhbGluZ0xpc3RDb3VudCA9IChjaHJvbWFGb3JtYXRJZGMgIT09IDMpXG4gICAgICAgICAgICAgICAgICAgID8gOFxuICAgICAgICAgICAgICAgICAgICA6IDEyO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzY2FsaW5nTGlzdENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWRCb29sZWFuKCkpIHsgLy8gc2VxX3NjYWxpbmdfbGlzdF9wcmVzZW50X2ZsYWdbIGkgXVxuICAgICAgICAgICAgICAgICAgICAgICAgaSA8IDYgPyBza2lwU2NhbGluZ0xpc3QoMTYpIDogc2tpcFNjYWxpbmdMaXN0KDY0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBza2lwVUVHKCk7IC8vIGxvZzJfbWF4X2ZyYW1lX251bV9taW51czRcbiAgICAgICAgdmFyIHBpY09yZGVyQ250VHlwZSA9IHJlYWRVRUcoKTtcbiAgICAgICAgaWYgKHBpY09yZGVyQ250VHlwZSA9PT0gMCkge1xuICAgICAgICAgICAgcmVhZFVFRygpOyAvLyBsb2cyX21heF9waWNfb3JkZXJfY250X2xzYl9taW51czRcbiAgICAgICAgfSBlbHNlIGlmIChwaWNPcmRlckNudFR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgIHNraXBCaXRzKDEpOyAvLyBkZWx0YV9waWNfb3JkZXJfYWx3YXlzX3plcm9fZmxhZ1xuICAgICAgICAgICAgc2tpcEVHKCk7IC8vIG9mZnNldF9mb3Jfbm9uX3JlZl9waWNcbiAgICAgICAgICAgIHNraXBFRygpOyAvLyBvZmZzZXRfZm9yX3RvcF90b19ib3R0b21fZmllbGRcbiAgICAgICAgICAgIG51bVJlZkZyYW1lc0luUGljT3JkZXJDbnRDeWNsZSA9IHJlYWRVRUcoKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1SZWZGcmFtZXNJblBpY09yZGVyQ250Q3ljbGU7IGkrKykge1xuICAgICAgICAgICAgICAgIHNraXBFRygpOyAvLyBvZmZzZXRfZm9yX3JlZl9mcmFtZVsgaSBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlZkZyYW1lcyA9IHJlYWRVRUcoKTsgLy8gbWF4X251bV9yZWZfZnJhbWVzXG4gICAgICAgIHNraXBCaXRzKDEpOyAvLyBnYXBzX2luX2ZyYW1lX251bV92YWx1ZV9hbGxvd2VkX2ZsYWdcbiAgICAgICAgcGljV2lkdGhJbk1ic01pbnVzMSA9IHJlYWRVRUcoKTtcbiAgICAgICAgcGljSGVpZ2h0SW5NYXBVbml0c01pbnVzMSA9IHJlYWRVRUcoKTtcbiAgICAgICAgZnJhbWVNYnNPbmx5RmxhZyA9IHJlYWRCaXRzKDEpO1xuICAgICAgICBpZiAoZnJhbWVNYnNPbmx5RmxhZyA9PT0gMCkge1xuICAgICAgICAgICAgc2tpcEJpdHMoMSk7IC8vIG1iX2FkYXB0aXZlX2ZyYW1lX2ZpZWxkX2ZsYWdcbiAgICAgICAgfVxuICAgICAgICBza2lwQml0cygxKTsgLy8gZGlyZWN0Xzh4OF9pbmZlcmVuY2VfZmxhZ1xuICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBmcmFtZV9jcm9wcGluZ19mbGFnXG4gICAgICAgICAgICBmcmFtZUNyb3BMZWZ0T2Zmc2V0ID0gcmVhZFVFRygpO1xuICAgICAgICAgICAgZnJhbWVDcm9wUmlnaHRPZmZzZXQgPSByZWFkVUVHKCk7XG4gICAgICAgICAgICBmcmFtZUNyb3BUb3BPZmZzZXQgPSByZWFkVUVHKCk7XG4gICAgICAgICAgICBmcmFtZUNyb3BCb3R0b21PZmZzZXQgPSByZWFkVUVHKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZyYW1lUmF0ZSA9IHtcbiAgICAgICAgICAgIGZwczogMCxcbiAgICAgICAgICAgIGZwc0ZpeGVkOiB0cnVlLFxuICAgICAgICAgICAgZnBzTnVtOiAwLFxuICAgICAgICAgICAgZnBzRGVuOiAwLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgcGl4ZWxSYXRpbyA9IFsxLCAxXTtcbiAgICAgICAgaWYgKHJlYWRCb29sZWFuKCkpIHtcbiAgICAgICAgICAgIC8vIHZ1aV9wYXJhbWV0ZXJzX3ByZXNlbnRfZmxhZ1xuICAgICAgICAgICAgaWYgKHJlYWRCb29sZWFuKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBhc3BlY3RfcmF0aW9faW5mb19wcmVzZW50X2ZsYWdcbiAgICAgICAgICAgICAgICBjb25zdCBhc3BlY3RSYXRpb0lkYyA9IHJlYWRVQnl0ZSgpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXNwZWN0UmF0aW9JZGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFsxLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzEyLCAxMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFsxMCwgMTFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMTYsIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzQwLCAzM107XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFsyNCwgMTFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMjAsIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzMyLCAxMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFs4MCwgMzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzE4LCAxMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMTUsIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFs2NCwgMzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzE2MCwgOTldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzQsIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTY6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzIsIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjU1OlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRVQnl0ZSgpIDw8IDggfCByZWFkVUJ5dGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkVUJ5dGUoKSA8PCA4IHwgcmVhZFVCeXRlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBvdmVyc2Nhbl9pbmZvX3ByZXNlbnRfZmxhZ1xuICAgICAgICAgICAgICAgIHJlYWRCb29sZWFuKCk7IC8vIG92ZXJzY2FuX2FwcHJvcHJpYXRlX2ZsYWdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWFkQm9vbGVhbigpKSB7IC8vIHZpZGVvX3NpZ25hbF90eXBlX3ByZXNlbnRfZmxhZ1xuICAgICAgICAgICAgICAgIHJlYWRCaXRzKDQpOyAvLyB2aWRlb19mb3JtYXQgJiB2aWRlb19mdWxsX3JhbmdlX2ZsYWdcbiAgICAgICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBjb2xvdXJfZGVzY3JpcHRpb25fcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgICAgIHJlYWRCaXRzKDI0KTsgLy8gY29sb3VyX3ByaW1hcmllcyAmIHRyYW5zZmVyX2NoYXJhY3RlcmlzdGljcyAmIG1hdHJpeF9jb2VmZmljaWVudHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBjaHJvbWFfbG9jX2luZm9fcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgcmVhZFVFRygpOyAvLyBjaHJvbWFfc2FtcGxlX2xvY190eXBlX3RvcF9maWVsZFxuICAgICAgICAgICAgICAgIHJlYWRVRUcoKTsgLy8gY2hyb21hX3NhbXBsZV9sb2NfdHlwZV9ib3R0b21fZmllbGRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlYWRCb29sZWFuKCkpIHsgLy8gdGltaW5nX2luZm9fcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgY29uc3QgbnVtVW5pdEluVGljayA9IChyZWFkQml0cygzMikpO1xuICAgICAgICAgICAgICAgIGZyYW1lUmF0ZS5mcHNOdW0gPSAocmVhZEJpdHMoMzIpKTtcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGUuZml4ZWQgPSB0aGlzLnJlYWRCb29sZWFuKCk7XG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlLmZwc0RlbiA9IG51bVVuaXRJblRpY2sgKiAyO1xuICAgICAgICAgICAgICAgIGZyYW1lUmF0ZS5mcHMgPSBmcmFtZVJhdGUuZnBzTnVtIC8gZnJhbWVSYXRlLmZwc0RlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjcm9wVW5pdFggPSAwLCBjcm9wVW5pdFkgPSAwO1xuICAgICAgICAgICAgaWYgKGNocm9tYUZvcm1hdElkYyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNyb3BVbml0WCA9IDE7XG4gICAgICAgICAgICAgICAgY3JvcFVuaXRYID0gMiAtIGZyYW1lTWJzT25seUZsYWc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzdWJXYyA9IGNocm9tYUZvcm1hdElkYyA9PT0gMyA/IDEgOiAyO1xuICAgICAgICAgICAgICAgIGxldCBzdWJIYyA9IGNocm9tYUZvcm1hdElkYyA9PT0gMSA/IDIgOiAxO1xuICAgICAgICAgICAgICAgIGNyb3BVbml0WCA9IHN1YldjO1xuICAgICAgICAgICAgICAgIGNyb3BVbml0WSA9IHN1YkhjICogKDIgLSBmcmFtZU1ic09ubHlGbGFnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29kZWNXaWR0aCA9IChwaWNXaWR0aEluTWJzTWludXMxICsgMSkgKiAxNjtcbiAgICAgICAgICAgIGNvZGVjSGVpZ2h0ID0gKDIgLSBmcmFtZU1ic09ubHlGbGFnKSAqICgocGljSGVpZ2h0SW5NYXBVbml0c01pbnVzMSArIDEpICogMTYpO1xuXG4gICAgICAgICAgICBjb2RlY1dpZHRoIC09IChmcmFtZUNyb3BMZWZ0T2Zmc2V0ICsgZnJhbWVDcm9wUmlnaHRPZmZzZXQpICogY3JvcFVuaXRYO1xuICAgICAgICAgICAgY29kZWNIZWlnaHQgLT0gKGZyYW1lQ3JvcFRvcE9mZnNldCArIGZyYW1lQ3JvcEJvdHRvbU9mZnNldCkgKiBjcm9wVW5pdFk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBpeGVsU2NhbGUgPSBwaXhlbFJhdGlvWzBdID09PSAxIHx8IHBpeGVsUmF0aW9bMV0gPT09IDFcbiAgICAgICAgICAgICAgICA/IDFcbiAgICAgICAgICAgICAgICA6IHBpeGVsUmF0aW9bMF0gLyBwaXhlbFJhdGlvWzFdO1xuXG4gICAgICAgICAgICBwcmVzZW50V2lkdGggPSBwaXhlbFNjYWxlICogY29kZWNXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvZmlsZUlkYyxcbiAgICAgICAgICAgIGxldmVsSWRjLFxuICAgICAgICAgICAgcmVmRnJhbWVzLFxuICAgICAgICAgICAgY2hyb21hRm9ybWF0LFxuICAgICAgICAgICAgYml0RGVwdGg6IGJpdERlcHRoTHVtYSxcbiAgICAgICAgICAgIGZyYW1lUmF0ZSxcbiAgICAgICAgICAgIGNvZGVjU2l6ZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBjb2RlY1dpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogY29kZWNIZWlnaHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJlc2VudFNpemU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogcHJlc2VudFdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogY29kZWNIZWlnaHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGg6IE1hdGguY2VpbCgoKChwaWNXaWR0aEluTWJzTWludXMxICsgMSkgKiAxNikgLSBmcmFtZUNyb3BMZWZ0T2Zmc2V0ICogMiAtIGZyYW1lQ3JvcFJpZ2h0T2Zmc2V0ICogMikpLFxuICAgICAgICAgICAgaGVpZ2h0OiAoKDIgLSBmcmFtZU1ic09ubHlGbGFnKSAqIChwaWNIZWlnaHRJbk1hcFVuaXRzTWludXMxICsgMSkgKiAxNikgLSAoKFxuICAgICAgICAgICAgICAgIGZyYW1lTWJzT25seUZsYWdcbiAgICAgICAgICAgICAgICAgICAgPyAyXG4gICAgICAgICAgICAgICAgICAgIDogNCkgKiAoZnJhbWVDcm9wVG9wT2Zmc2V0ICsgZnJhbWVDcm9wQm90dG9tT2Zmc2V0KSksXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBwaXhlbFJhdGlvLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlYWRTbGljZVR5cGUgKCkge1xuICAgICAgICAvLyBza2lwIE5BTHUgdHlwZVxuICAgICAgICB0aGlzLnJlYWRVQnl0ZSgpO1xuICAgICAgICAvLyBkaXNjYXJkIGZpcnN0X21iX2luX3NsaWNlXG4gICAgICAgIHRoaXMucmVhZFVFRygpO1xuICAgICAgICAvLyByZXR1cm4gc2xpY2VfdHlwZVxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkVUVHKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIHtcbiAgICBzdGF0aWMgbG9nICguLi5hcmdzKSB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZy5hcHBseSh3aW5kb3csIGFyZ3MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbmZvICguLi5hcmdzKSB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmluZm8uYXBwbHkod2luZG93LCBhcmdzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IgKC4uLmFyZ3MpIHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUuZXJyb3IuYXBwbHkod2luZG93LCBhcmdzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgd2FybiAoLi4uYXJncykge1xuICAgICAgICB3aW5kb3cuY29uc29sZS53YXJuLmFwcGx5KHdpbmRvdywgYXJncyk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAYXV0aG9yIGZ1eXVoYW9cbiAqL1xuXG5jb25zdCBuYXRpdmVTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5jbGFzcyBPYnNlcnZlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmZuSWQgPSAxXG4gICAgdGhpcy5fbGlzdGVuZXJJZE1hcCA9IHt9XG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge31cbiAgfVxuICBvbiAoa2V5LCBmbikge1xuICAgIGNvbnN0IGZuSWQgPSB0aGlzLmZuSWQrK1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVyc0J5S2V5KGtleSlcbiAgICB0aGlzLl9saXN0ZW5lcklkTWFwW2ZuSWRdID0gZm5cbiAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcnMudW5zaGlmdChmbklkKVxuICAgICAgcmV0dXJuIGZuSWRcbiAgICB9XG4gICAgdGhpcy5fbGlzdGVuZXJzW2tleV0gPSBbZm5JZF1cbiAgICByZXR1cm4gZm5JZFxuICB9XG4gIGVtaXQgKGtleSkge1xuICAgIGNvbnN0IGFyZ3MgPSBuYXRpdmVTbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9nZXRMaXN0ZW5lcnNCeUtleShrZXkpIHx8IFtdXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgZm4gPSB0aGlzLl9nZXRMaXN0ZW5lckJ5SWQobGlzdGVuZXJzW2ldKVxuICAgICAgZm4gJiYgZm4uYXBwbHkobnVsbCwgYXJncylcbiAgICB9XG4gIH1cbiAgb25jZSAoa2V5LCBmbikge1xuICAgIGNvbnN0IGZuSWQgPSB0aGlzLmZuSWQrK1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVyc0J5S2V5KGtleSlcbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcblxuICAgIGZ1bmN0aW9uIG9uY2VGdW5jICgpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBuYXRpdmVTbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgICBfdGhpcy5vZmYoa2V5LCBmbklkKVxuICAgIH1cbiAgICB0aGlzLl9saXN0ZW5lcklkTWFwW2ZuSWRdID0gb25jZUZ1bmNcbiAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcnMudW5zaGlmdChmbklkKVxuICAgICAgcmV0dXJuIGZuSWRcbiAgICB9XG4gICAgdGhpcy5fbGlzdGVuZXJzW2tleV0gPSBbZm5JZF1cbiAgICByZXR1cm4gZm5JZFxuICB9XG4gIG9mZiAoa2V5LCBmbklkKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZ2V0TGlzdGVuZXJzQnlLZXkoa2V5KVxuICAgIGNvbnN0IGZuID0gdGhpcy5fZ2V0TGlzdGVuZXJCeUlkKGZuSWQpXG4gICAgaWYgKCFmbiB8fCAhbGlzdGVuZXJzIHx8IGxpc3RlbmVycy5pbmRleE9mKGZuSWQpIDwgMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcklkTWFwW2ZuSWRdXG4gICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNba2V5XVxuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0ZW5lcnNbbGlzdGVuZXJzLmluZGV4T2YoZm5JZCldID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG4gIF9nZXRMaXN0ZW5lcnNCeUtleSAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1trZXldXG4gIH1cbiAgX2dldExpc3RlbmVyQnlJZCAoZm5JZCkge1xuICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcklkTWFwW2ZuSWRdXG4gIH1cbiAgZmx1c2ggKGtleSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVyc0J5S2V5KGtleSlcbiAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbklkID0+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVySWRNYXBbZm5JZF1cbiAgICAgIH0pXG4gICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW2tleV1cbiAgICB9XG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbnVsbFxuICAgIHRoaXMuX2xpc3RlbmVySWRNYXAgPSBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IE9ic2VydmVyKClcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG5jbGFzcyBVVEY4IHtcbiAgICBzdGF0aWMgZGVjb2RlKHVpbnQ4YXJyYXkpIHtcbiAgICAgICAgY29uc3Qgb3V0ID0gW107XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdWludDhhcnJheTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCBsZW5ndGggPSB1aW50OGFycmF5Lmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGlucHV0W2ldIDwgMHg4MCkge1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaW5wdXRbaV0pKTtcbiAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhDMCkge1xuICAgICAgICAgICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhFMCkge1xuICAgICAgICAgICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4MUYpIDw8IDYgfCAoaW5wdXRbaSArIDFdICYgMHgzRik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1Y3M0ID49IDB4ODApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodWNzNCAmIDB4RkZGRikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhGMCkge1xuICAgICAgICAgICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4RikgPDwgMTIgfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgNiB8IGlucHV0W2kgKyAyXSAmIDB4M0Y7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1Y3M0ID49IDB4ODAwICYmICh1Y3M0ICYgMHhGODAwKSAhPT0gMHhEODAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHVjczQgJiAweEZGRkYpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4RjgpIHtcbiAgICAgICAgICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1Y3M0ID0gKGlucHV0W2ldICYgMHg3KSA8PCAxOCB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCAxMiB8XG4gICAgICAgICAgICAgICAgICAgICAgICAoaW5wdXRbaSArIDJdICYgMHgzRikgPDwgNiB8IChpbnB1dFtpICsgM10gJiAweDNGKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVjczQgPiAweDEwMDAwICYmIHVjczQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdWNzNCAtPSAweDEwMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodWNzNCA+Pj4gMTApIHwgMHhEODAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ICYgMHgzRkYpIHwgMHhEQzAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSk7XG4gICAgICAgICAgICArK2k7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfY2hlY2tDb250aW51YXRpb24odWludDhhcnJheSwgc3RhcnQsIGNoZWNrTGVuZ3RoKSB7XG4gICAgICAgIGxldCBhcnJheSA9IHVpbnQ4YXJyYXk7XG4gICAgICAgIGlmIChzdGFydCArIGNoZWNrTGVuZ3RoIDwgYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICB3aGlsZSAoY2hlY2tMZW5ndGgtLSkge1xuICAgICAgICAgICAgICAgIGlmICgoYXJyYXlbKytzdGFydF0gJiAweEMwKSAhPT0gMHg4MClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVURjg7IiwiZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlIChmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuXG5cbiAgICB2YXIgZGVib3VuY2VkID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHsgY2xlYXJUaW1lb3V0KHRpbWVvdXQpOyB9XG4gICAgICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgIHZhciBjYWxsTm93ID0gIXRpbWVvdXQ7XG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jLCB3YWl0KTtcbiAgICAgICAgICAgIGlmIChjYWxsTm93KSB7IHJlc3VsdCA9IGZ1bmMoKTsgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuYywgd2FpdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICBkZWJvdW5jZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGVib3VuY2VkO1xuXG59XG5cbmV4cG9ydCBjb25zdCBjYWNoZVdyYXBwZXIgPSAoZm4pID0+IHtcblxuICAgIGNvbnN0IGNhY2hlID0ge307XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGFyZ3MucmVkdWNlKChwcmUsIGN1cikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke3ByZX1fJHtjdXJ9YDtcbiAgICAgICAgfSwgJycpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBmbiguLi5hcmdzKTtcbiAgICAgICAgaWYgKGNhY2hlW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZVtrZXldID0gcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG59OyIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMik7XG4gICAgKG5ldyBEYXRhVmlldyhidWYpKS5zZXRJbnQxNigwLCAyNTYsIHRydWUpIC8vIGxpdHRsZS1lbmRpYW4gd3JpdGVcbiAgICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5jb25zdCBzbmlmZmVyID0ge1xuICAgIGdldCBkZXZpY2UgKCkge1xuICAgICAgICBsZXQgciA9IHNuaWZmZXIub3M7XG4gICAgICAgIHJldHVybiByLmlzUGMgPyAncGMnIDogci5pc1RhYmxldCA/ICd0YWJsZXQnIDogJ21vYmlsZSc7XG4gICAgfSxcbiAgICBnZXQgYnJvd3NlciAoKSB7XG4gICAgICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IHJlZyA9IHtcbiAgICAgICAgICAgIGllOiAvcnY6KFtcXGQuXSspXFwpIGxpa2UgZ2Vja28vLFxuICAgICAgICAgICAgZmlyZm94OiAvZmlyZWZveFxcLyhbXFxkLl0rKS8sXG4gICAgICAgICAgICBjaHJvbWU6IC9jaHJvbWVcXC8oW1xcZC5dKykvLFxuICAgICAgICAgICAgb3BlcmE6IC9vcGVyYS4oW1xcZC5dKykvLFxuICAgICAgICAgICAgc2FmYXJpOiAvdmVyc2lvblxcLyhbXFxkLl0rKS4qc2FmYXJpLyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChPYmplY3Qua2V5cyhyZWcpLmZpbHRlcihrZXkgPT4gcmVnW2tleV0udGVzdCh1YSkpKVswXTtcbiAgICB9LFxuICAgIGdldCBvcyAoKSB7XG4gICAgICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgICBpc1dpbmRvd3NQaG9uZSA9IC8oPzpXaW5kb3dzIFBob25lKS8udGVzdCh1YSksXG4gICAgICAgICAgICBpc1N5bWJpYW4gPSAvKD86U3ltYmlhbk9TKS8udGVzdCh1YSkgfHwgaXNXaW5kb3dzUGhvbmUsXG4gICAgICAgICAgICBpc0FuZHJvaWQgPSAvKD86QW5kcm9pZCkvLnRlc3QodWEpLFxuICAgICAgICAgICAgaXNGaXJlRm94ID0gLyg/OkZpcmVmb3gpLy50ZXN0KHVhKSxcbiAgICAgICAgICAgIGlzVGFibGV0ID0gLyg/OmlQYWR8UGxheUJvb2spLy50ZXN0KHVhKSB8fCAoaXNBbmRyb2lkICYmICEvKD86TW9iaWxlKS8udGVzdCh1YSkpIHx8IChpc0ZpcmVGb3ggJiYgLyg/OlRhYmxldCkvLnRlc3QodWEpKSxcbiAgICAgICAgICAgIGlzUGhvbmUgPSAvKD86aVBob25lKS8udGVzdCh1YSkgJiYgIWlzVGFibGV0LFxuICAgICAgICAgICAgaXNQYyA9ICFpc1Bob25lICYmICFpc0FuZHJvaWQgJiYgIWlzU3ltYmlhbjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzVGFibGV0LFxuICAgICAgICAgICAgaXNQaG9uZSxcbiAgICAgICAgICAgIGlzQW5kcm9pZCxcbiAgICAgICAgICAgIGlzUGMsXG4gICAgICAgICAgICBpc1N5bWJpYW4sXG4gICAgICAgICAgICBpc1dpbmRvd3NQaG9uZSxcbiAgICAgICAgICAgIGlzRmlyZUZveCxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldCBpc0xlKCkge1xuICAgICAgICByZXR1cm4gbGVcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbmlmZmVyO1xuIiwiaW1wb3J0IENvbmNhdCBmcm9tICdjb25jYXQtdHlwZWQtYXJyYXknO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi91dGlscy9Mb2cnO1xuY2xhc3MgQnVmZmVyIHtcbiAgICBjb25zdHJ1Y3RvciAoYnVmZmVyKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyIHx8IG5ldyBVaW50OEFycmF5KDApO1xuICAgIH1cbiAgICB3cml0ZSAoLi4uYnVmZmVyKSB7XG4gICAgICAgIGJ1ZmZlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IENvbmNhdChVaW50OEFycmF5LCB0aGlzLmJ1ZmZlciwgaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIHZhbHVlID4+IDI0LFxuICAgICAgICAgICAgKHZhbHVlID4+IDE2KSAmIDB4ZmYsXG4gICAgICAgICAgICAodmFsdWUgPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgdmFsdWUgJiAweGZmLFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgc3RhdGljIHJlYWRBc0ludCAoYXJyKSB7XG4gICAgICAgIGxldCB0ZW1wID0gJyc7XG4gICAgICAgIGZ1bmN0aW9uIHBhZFN0YXJ0NEhleCAoaGV4TnVtKSB7XG4gICAgICAgICAgICBsZXQgaGV4U3RyID0gaGV4TnVtLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIHJldHVybiBoZXhTdHIucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgfVxuICAgICAgICBhcnIuZm9yRWFjaChudW0gPT4ge1xuICAgICAgICAgICAgdGVtcCArPSBwYWRTdGFydDRIZXgobnVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0ZW1wLCAxNik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXI7XG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiUGxheWVyXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=