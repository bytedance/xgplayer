(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xgplayer"));
	else if(typeof define === 'function' && define.amd)
		define(["xgplayer"], factory);
	else if(typeof exports === 'object')
		exports["xgplayer-m4a"] = factory(require("xgplayer"));
	else
		root["xgplayer-m4a"] = factory(root["xgplayer"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__13__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _error = __webpack_require__(7);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box = function () {
  function Box() {
    _classCallCheck(this, Box);

    this.headSize = 8;
    this.size = 0;
    this.type = '';
    this.subBox = [];
    this.start = -1;
  }

  _createClass(Box, [{
    key: 'readHeader',
    value: function readHeader(stream) {
      this.start = stream.position;
      this.size = stream.readUint32();
      this.type = String.fromCharCode(stream.readUint8(), stream.readUint8(), stream.readUint8(), stream.readUint8());
      if (this.size === 1) {
        this.size = stream.readUint64();
      } else if (this.size === 0) {
        if (this.type !== 'mdat') {
          throw new _error2.default('parse', '', { line: 19, handle: '[Box] readHeader', msg: 'parse mp4 mdat box failed' });
        }
      }
      if (this.type === 'uuid') {
        var uuid = [];
        for (var i = 0; i < 16; i++) {
          uuid.push(stream.readUint8());
        }
      }
    }
  }, {
    key: 'readBody',
    value: function readBody(stream) {
      var end = this.size - stream.position + this.start;
      var type = this.type;
      this.data = stream.buffer.slice(stream.position, stream.position + end);
      stream.position += this.data.byteLength;
      var parser = void 0;
      if (Box.containerBox.find(function (item) {
        return item === type;
      })) {
        parser = Box.containerParser;
      } else {
        parser = Box[type];
      }
      if (parser && parser instanceof Function) {
        parser.call(this);
      }
    }
  }, {
    key: 'read',
    value: function read(stream) {
      this.readHeader(stream);
      this.readBody(stream);
    }
  }], [{
    key: 'containerParser',
    value: function containerParser() {
      var stream = new _stream2.default(this.data);
      var size = stream.buffer.byteLength;
      var self = this;
      while (stream.position < size) {
        var box = new Box();
        box.readHeader(stream);
        self.subBox.push(box);
        box.readBody(stream);
      }
      delete self.data;
      stream = null;
    }
  }]);

  return Box;
}();

Box.containerBox = ['moov', 'trak', 'edts', 'mdia', 'minf', 'dinf', 'stbl', 'mvex', 'moof', 'traf', 'mfra'];

exports.default = Box;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _error = __webpack_require__(7);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stream = function () {
  function Stream(buffer) {
    _classCallCheck(this, Stream);

    if (buffer instanceof ArrayBuffer) {
      this.buffer = buffer;
      this.dataview = new DataView(buffer);
      this.dataview.position = 0;
    } else {
      throw new _error2.default('parse', '', { line: 9, handle: '[Stream] constructor', msg: 'data is valid' });
    }
  }

  _createClass(Stream, [{
    key: 'skip',
    value: function skip(count) {
      var loop = Math.floor(count / 4);
      var last = count % 4;
      for (var i = 0; i < loop; i++) {
        Stream.readByte(this.dataview, 4);
      }
      if (last > 0) {
        Stream.readByte(this.dataview, last);
      }
    }

    /**
       * [readByte 从DataView中读取数据]
       * @param  {DataView} buffer [DataView实例]
       * @param  {Number} size   [读取字节数]
       * @return {Number}        [整数]
       */

  }, {
    key: 'readUint8',
    value: function readUint8() {
      return Stream.readByte(this.dataview, 1);
    }
  }, {
    key: 'readUint16',
    value: function readUint16() {
      return Stream.readByte(this.dataview, 2);
    }
  }, {
    key: 'readUint32',
    value: function readUint32() {
      return Stream.readByte(this.dataview, 4);
    }
  }, {
    key: 'readUint64',
    value: function readUint64() {
      return Stream.readByte(this.dataview, 8);
    }
  }, {
    key: 'readInt8',
    value: function readInt8() {
      return Stream.readByte(this.dataview, 1, true);
    }
  }, {
    key: 'readInt16',
    value: function readInt16() {
      return Stream.readByte(this.dataview, 2, true);
    }
  }, {
    key: 'readInt32',
    value: function readInt32() {
      return Stream.readByte(this.dataview, 4, true);
    }
  }, {
    key: 'position',
    set: function set(value) {
      this.dataview.position = value;
    },
    get: function get() {
      return this.dataview.position;
    }
  }], [{
    key: 'readByte',
    value: function readByte(buffer, size, sign) {
      var res = void 0;
      switch (size) {
        case 1:
          if (sign) {
            res = buffer.getInt8(buffer.position);
          } else {
            res = buffer.getUint8(buffer.position);
          }
          break;
        case 2:
          if (sign) {
            res = buffer.getInt16(buffer.position);
          } else {
            res = buffer.getUint16(buffer.position);
          }
          break;
        case 3:
          if (sign) {
            throw 'not supported for readByte 3';
          } else {
            res = buffer.getUint8(buffer.position) << 16;
            res |= buffer.getUint8(buffer.position + 1) << 8;
            res |= buffer.getUint8(buffer.position + 2);
          }
          break;
        case 4:
          if (sign) {
            res = buffer.getInt32(buffer.position);
          } else {
            res = buffer.getUint32(buffer.position);
          }
          break;
        case 8:
          if (sign) {
            throw new _error2.default('parse', '', { line: 73, handle: '[Stream] readByte', msg: 'not supported for readBody 8' });
          } else {
            res = buffer.getUint32(buffer.position) << 32;
            res |= buffer.getUint32(buffer.position + 4);
          }
          break;
        default:
          res = '';
      }
      buffer.position += size;
      return res;
    }
  }]);

  return Stream;
}();

exports.default = Stream;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var store = __webpack_require__(40)('wks');
var uid = __webpack_require__(20);
var _Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(6);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayer = __webpack_require__(13);

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _package = __webpack_require__(80);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Errors = function (_Player$Errors) {
  _inherits(_Errors, _Player$Errors);

  function _Errors(type, vid) {
    var errd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var url = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    _classCallCheck(this, _Errors);

    errd.version = _package.version;

    var _this = _possibleConstructorReturn(this, (_Errors.__proto__ || Object.getPrototypeOf(_Errors)).call(this, type, vid, errd));

    _this.url = url;
    return _this;
  }

  return _Errors;
}(_xgplayer2.default.Errors);

exports.default = _Errors;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// optional / simple context binding
var aFunction = __webpack_require__(9);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(23)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(41);
var toPrimitive = __webpack_require__(42);
var dP = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var d = __webpack_require__(63),
    callable = __webpack_require__(77),
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(70)(); // Support ES3 engines

module.exports = function (val) {
  return val !== _undefined && val !== null;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UTC = function () {
  function UTC() {
    _classCallCheck(this, UTC);

    var time = new Date();
    time.setFullYear(1904);
    time.setMonth(0);
    time.setDate(1);
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    this.time = time;
  }

  _createClass(UTC, [{
    key: "setTime",
    value: function setTime(value) {
      this.time.setTime(this.time.getTime() + value * 1);
      return this.time.toLocaleString();
    }
  }]);

  return UTC;
}();

exports.default = UTC;
module.exports = exports["default"];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _concatTypedArray = __webpack_require__(34);

var _concatTypedArray2 = _interopRequireDefault(_concatTypedArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = function () {
  function Buffer() {
    _classCallCheck(this, Buffer);

    this.buffer = new Uint8Array(0);
  }

  _createClass(Buffer, [{
    key: 'write',
    value: function write() {
      var self = this;

      for (var _len = arguments.length, buffer = Array(_len), _key = 0; _key < _len; _key++) {
        buffer[_key] = arguments[_key];
      }

      buffer.forEach(function (item) {
        if (item) {
          self.buffer = (0, _concatTypedArray2.default)(Uint8Array, self.buffer, item);
        } else {
          window.console.error(item);
        }
      });
    }
  }], [{
    key: 'writeUint32',
    value: function writeUint32(value) {
      return new Uint8Array([value >> 24, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff]);
    }
  }]);

  return Buffer;
}();

exports.default = Buffer;
module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = false;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(11);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? cof(O)
  // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var core = __webpack_require__(4);
var hide = __webpack_require__(22);
var redefine = __webpack_require__(25);
var ctx = __webpack_require__(8);
var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(12);
var createDesc = __webpack_require__(43);
module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(6);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var hide = __webpack_require__(22);
var has = __webpack_require__(26);
var SRC = __webpack_require__(20)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(4).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.15 ToLength
var toInteger = __webpack_require__(29);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(8);
var invoke = __webpack_require__(50);
var html = __webpack_require__(51);
var cel = __webpack_require__(24);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function run() {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function listener(event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) {
      args.push(arguments[i++]);
    }queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(11)(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(ctx(run, id, 1));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(ctx(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function defer(id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function defer(id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function defer(id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)

var aFunction = __webpack_require__(9);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _concat = __webpack_require__(81);

var _concat2 = _interopRequireDefault(_concat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = _concat2.default;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _buffer = __webpack_require__(17);

var _buffer2 = _interopRequireDefault(_buffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UINT32_MAX = Math.pow(2, 32) - 1;

var FMP4 = function () {
  function FMP4() {
    _classCallCheck(this, FMP4);
  }

  _createClass(FMP4, null, [{
    key: 'type',
    value: function type(name) {
      return new Uint8Array([name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)]);
    }
  }, {
    key: 'size',
    value: function size(value) {
      return _buffer2.default.writeUint32(value);
    }
  }, {
    key: 'extension',
    value: function extension(version, flag) {
      return new Uint8Array([version, flag >> 16 & 0xff, flag >> 8 & 0xff, flag & 0xff]);
    }
  }, {
    key: 'ftyp',
    value: function ftyp() {
      var buffer = new _buffer2.default();
      buffer.write(FMP4.size(28), FMP4.type('ftyp'), new Uint8Array([0x69, 0x73, 0x6F, 0x35, // iso5,
      0x00, 0x00, 0x00, 0x01, // minor_version: 0x00
      0x4D, 0x34, 0x41, 0x20, // M4A,
      0x69, 0x73, 0x6F, 0x35, // iso5,
      0x64, 0x61, 0x73, 0x68 // dash
      ]));
      return buffer.buffer;
    }
  }, {
    key: 'moov',
    value: function moov(data) {
      var buffer = new _buffer2.default();var size = 8;

      var mvhd = FMP4.mvhd(data.duration, data.timeScale);
      var trak = FMP4.audioTrak(data);
      var mvex = FMP4.mvex(data.duration, data.timeScale);
      var udtaBuffer = new _buffer2.default();
      var bytes = new Uint8Array([0x00, 0x00, 0x00, 0x55, 0x75, 0x64, 0x74, 0x61, 0x00, 0x00, 0x00, 0x4D, 0x6D, 0x65, 0x74, 0x61, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x21, 0x68, 0x64, 0x6C, 0x72, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6D, 0x64, 0x69, 0x72, 0x61, 0x70, 0x70, 0x6C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x69, 0x6C, 0x73, 0x74, 0x00, 0x00, 0x00, 0x0C, 0x2D, 0x2D, 0x2D, 0x2D, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x2D, 0x2D, 0x2D, 0x2D, 0x00, 0x00, 0x00, 0x00]);
      udtaBuffer.write(new Uint8Array(bytes));
      var udta = udtaBuffer.buffer;
      [mvhd, trak, mvex, udta].forEach(function (item) {
        size += item.byteLength;
      });
      buffer.write(FMP4.size(size), FMP4.type('moov'), mvhd, mvex, trak, udta);
      return buffer.buffer;
    }
  }, {
    key: 'mvhd',
    value: function mvhd(duration, timeScale) {
      var buffer = new _buffer2.default();
      duration *= timeScale;
      duration = 0;
      var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
      var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
      var bytes = new Uint8Array([0x01, // version 1
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
      timeScale >> 24 & 0xff, timeScale >> 16 & 0xff, timeScale >> 8 & 0xff, timeScale & 0xff, // timeScale
      upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x00, 0x01, 0x00, 0x00, // 1.0 rate
      0x01, 0x00, // 1.0 volume
      0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
      0xff, 0xff, 0xff, 0xff // next_track_ID
      ]);
      buffer.write(FMP4.size(8 + bytes.length), FMP4.type('mvhd'), new Uint8Array(bytes));
      return buffer.buffer;
    }
  }, {
    key: 'audioTrak',
    value: function audioTrak(data) {
      var buffer = new _buffer2.default();var size = 8;
      var tkhd = FMP4.tkhd({
        id: 1,
        duration: data.audioDuration,
        timeScale: data.audioTimeScale,
        width: 0,
        height: 0,
        type: 'audio'
      });
      var mdia = FMP4.mdia({
        type: 'audio',
        timeScale: data.audioTimeScale,
        duration: data.audioDuration,
        channelCount: data.channelCount,
        sampleRate: data.sampleRate,
        audioConfig: data.audioConfig
      });
      var udtaBuffer = new _buffer2.default();
      var bytes = new Uint8Array([0x00, 0x00, 0x00, 0x2C, 0x6C, 0x75, 0x64, 0x74, 0x00, 0x00, 0x00, 0x24, 0x74, 0x6C, 0x6F, 0x75, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x48, 0x54, 0x84, 0x23, 0x05, 0x01, 0x72, 0x23, 0x03, 0x72, 0x13, 0x04, 0x7D, 0x13, 0x05, 0x73, 0x13, 0x06, 0x04, 0x13]);
      udtaBuffer.write(FMP4.size(52), FMP4.type('udta'), new Uint8Array(bytes));
      var udta = udtaBuffer.buffer;
      [tkhd, mdia, udta].forEach(function (item) {
        size += item.byteLength;
      });
      buffer.write(FMP4.size(size), FMP4.type('trak'), tkhd, mdia, udta);
      return buffer.buffer;
    }
  }, {
    key: 'tkhd',
    value: function tkhd(data) {
      var buffer = new _buffer2.default();
      var id = data.id;
      var duration = data.duration * data.timeScale;
      duration = 0;
      var width = 0;

      var height = 0;

      var type = data.type;

      var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));

      var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
      var content = new Uint8Array([0x01, // version 1
      0x00, 0x00, 0x07, // flags
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
      id >> 24 & 0xff, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff, // track_ID
      0x00, 0x00, 0x00, 0x00, // reserved
      upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, // layer
      0x00, type === 'video' ? 0x01 : 0x00, // alternate_group
      type === 'audio' ? 0x01 : 0x00, 0x00, // non-audio track volume
      0x00, 0x00, // reserved
      0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
      width >> 8 & 0xff, width & 0xff, 0x00, 0x00, // width
      height >> 8 & 0xff, height & 0xff, 0x00, 0x00 // height
      ]);
      buffer.write(FMP4.size(8 + content.byteLength), FMP4.type('tkhd'), content);
      return buffer.buffer;
    }
  }, {
    key: 'edts',
    value: function edts(data) {
      var buffer = new _buffer2.default();var duration = data.duration;var mediaTime = data.mediaTime;
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
      var buffer = new _buffer2.default();var size = 8;
      var mdhd = FMP4.mdhd(data.timeScale);
      var hdlr = FMP4.hdlr(data.type);
      var minf = FMP4.minf(data);
      [mdhd, hdlr, minf].forEach(function (item) {
        size += item.byteLength;
      });
      buffer.write(FMP4.size(size), FMP4.type('mdia'), mdhd, hdlr, minf);
      return buffer.buffer;
    }
  }, {
    key: 'mdhd',
    value: function mdhd(timeScale) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var buffer = new _buffer2.default();
      duration *= timeScale;
      var upperWordDuration = Math.floor(duration / (UINT32_MAX + 1));
      var lowerWordDuration = Math.floor(duration % (UINT32_MAX + 1));
      var content = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, // creation_time
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, // modification_time
      timeScale >> 24 & 0xff, timeScale >> 16 & 0xff, timeScale >> 8 & 0xff, timeScale & 0xff, upperWordDuration >> 24, upperWordDuration >> 16 & 0xff, upperWordDuration >> 8 & 0xff, upperWordDuration & 0xff, lowerWordDuration >> 24, lowerWordDuration >> 16 & 0xff, lowerWordDuration >> 8 & 0xff, lowerWordDuration & 0xff, 0x55, 0xc4, // 'und' language
      0x00, 0x00]);
      buffer.write(FMP4.size(12 + content.byteLength), FMP4.type('mdhd'), FMP4.extension(1, 0), content);
      return buffer.buffer;
    }
  }, {
    key: 'hdlr',
    value: function hdlr(type) {
      var buffer = new _buffer2.default();
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
      buffer.write(FMP4.size(8 + value.length), FMP4.type('hdlr'), new Uint8Array(value));
      return buffer.buffer;
    }
  }, {
    key: 'minf',
    value: function minf(data) {
      var buffer = new _buffer2.default();var size = 8;
      var vmhd = data.type === 'video' ? FMP4.vmhd() : FMP4.smhd();
      var dinf = FMP4.dinf();
      var stbl = FMP4.stbl(data);
      [vmhd, dinf, stbl].forEach(function (item) {
        size += item.byteLength;
      });
      buffer.write(FMP4.size(size), FMP4.type('minf'), vmhd, dinf, stbl);
      return buffer.buffer;
    }
  }, {
    key: 'vmhd',
    value: function vmhd() {
      var buffer = new _buffer2.default();
      buffer.write(FMP4.size(20), FMP4.type('vmhd'), new Uint8Array([0x00, // version
      0x00, 0x00, 0x01, // flags
      0x00, 0x00, // graphicsmode
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
      ]));
      return buffer.buffer;
    }
  }, {
    key: 'smhd',
    value: function smhd() {
      var buffer = new _buffer2.default();
      buffer.write(FMP4.size(16), FMP4.type('smhd'), new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, // balance
      0x00, 0x00 // reserved
      ]));
      return buffer.buffer;
    }
  }, {
    key: 'dinf',
    value: function dinf() {
      var buffer = new _buffer2.default();
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
      var buffer = new _buffer2.default();var size = 8;
      var stsd = FMP4.stsd(data);
      var stts = FMP4.stts();
      var stsc = FMP4.stsc();
      var stsz = FMP4.stsz();
      var stco = FMP4.stco();
      [stsd, stts, stsc, stsz, stco].forEach(function (item) {
        size += item.byteLength;
      });
      buffer.write(FMP4.size(size), FMP4.type('stbl'), stsd, stts, stsc, stsz, stco);
      return buffer.buffer;
    }
  }, {
    key: 'stsd',
    value: function stsd(data) {
      var buffer = new _buffer2.default();var content = void 0;
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
      buffer.write(FMP4.size(16 + content.byteLength), FMP4.type('stsd'), FMP4.extension(0, 0), new Uint8Array([0x00, 0x00, 0x00, 0x01]), content);
      return buffer.buffer;
    }
  }, {
    key: 'mp4a',
    value: function mp4a(data) {
      var buffer = new _buffer2.default();
      var content = new Uint8Array([0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
      0x00, data.channelCount, // channelcount
      0x00, 0x10, // sampleSize:16bits
      0x00, 0x00, 0x00, 0x00, // reserved2
      data.sampleRate >> 8 & 0xff, data.sampleRate & 0xff, //
      0x00, 0x00]);
      var esds = FMP4.esds(data.audioConfig);
      buffer.write(FMP4.size(8 + content.byteLength + esds.byteLength), FMP4.type('mp4a'), content, esds);
      return buffer.buffer;
    }
  }, {
    key: 'esds',
    value: function esds() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [43, 146, 8, 0];

      var configlen = config.length;
      var buffer = new _buffer2.default();
      var content = new Uint8Array([0x00, // version 0
      0x00, 0x00, 0x00, // flags

      0x03, // descriptor_type
      0x17 + configlen, // length
      0x00, 0x00, // es_id
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
      var buffer = new _buffer2.default();var size = 40; // 8(avc1)+8(avcc)+8(btrt)+16(pasp)
      var sps = data.sps;var pps = data.pps;var width = data.width;var height = data.height;var hSpacing = data.pixelRatio[0];var vSpacing = data.pixelRatio[1];
      var avcc = new Uint8Array([0x01, // version
      sps[1], // profile
      sps[2], // profile compatible
      sps[3], // level
      0xfc | 3, 0xE0 | 1 // 目前只处理一个sps
      ].concat([sps.length >>> 8 & 0xff, sps.length & 0xff]).concat(sps).concat(1).concat([pps.length >>> 8 & 0xff, pps.length & 0xff]).concat(pps));
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
      var buffer = new _buffer2.default();
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      buffer.write(FMP4.size(16), FMP4.type('stts'), content);
      return buffer.buffer;
    }
  }, {
    key: 'stsc',
    value: function stsc() {
      var buffer = new _buffer2.default();
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      buffer.write(FMP4.size(16), FMP4.type('stsc'), content);
      return buffer.buffer;
    }
  }, {
    key: 'stco',
    value: function stco() {
      var buffer = new _buffer2.default();
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      buffer.write(FMP4.size(16), FMP4.type('stco'), content);
      return buffer.buffer;
    }
  }, {
    key: 'stsz',
    value: function stsz() {
      var buffer = new _buffer2.default();
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // sample_size
      0x00, 0x00, 0x00, 0x00 // sample_count
      ]);
      buffer.write(FMP4.size(20), FMP4.type('stsz'), content);
      return buffer.buffer;
    }
  }, {
    key: 'mvex',
    value: function mvex(duration, timeScale) {
      var buffer = new _buffer2.default();var size = 8;
      var mehd = FMP4.mehd(duration * timeScale);
      var trex = FMP4.trex(1);
      var trep = FMP4.trep(1);

      [mehd, trex, trep].forEach(function (item) {
        size += item.byteLength;
      });
      buffer.write(FMP4.size(size), FMP4.type('mvex'), mehd, trex, trep);
      return buffer.buffer;
    }
  }, {
    key: 'mehd',
    value: function mehd(duration) {
      var buffer = new _buffer2.default();
      var content = new Uint8Array([duration >> 24, duration >> 16 & 0xff, duration >> 8 & 0xff, duration & 0xff]);
      buffer.write(FMP4.size(16), FMP4.type('mehd'), FMP4.extension(0, 0), content);
      return buffer.buffer;
    }
  }, {
    key: 'trex',
    value: function trex(id) {
      var buffer = new _buffer2.default();
      var content = new Uint8Array([0x00, // version 0
      0x00, 0x00, 0x00, // flags
      id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff, // track_ID
      0x00, 0x00, 0x00, 0x01, // default_sample_description_index
      0x00, 0x00, 0x04, 0x00, // default_sample_duration
      0x00, 0x00, 0x00, 0x00, // default_sample_size
      0x00, 0x1e, 0x84, 0x80 // default_sample_flags
      ]);
      buffer.write(FMP4.size(8 + content.byteLength), FMP4.type('trex'), content);
      return buffer.buffer;
    }
  }, {
    key: 'trep',
    value: function trep(id) {
      var buffer = new _buffer2.default();
      var content = new Uint8Array([id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff]);
      buffer.write(FMP4.size(16), FMP4.type('trep'), FMP4.extension(0, 0), content);
      return buffer.buffer;
    }
  }, {
    key: 'moof',
    value: function moof(data) {
      var buffer = new _buffer2.default();var size = 8;
      var mfhd = FMP4.mfhd();
      var traf = FMP4.traf(data);
      [mfhd, traf].forEach(function (item) {
        size += item.byteLength;
      });
      buffer.write(FMP4.size(size), FMP4.type('moof'), mfhd, traf);
      return buffer.buffer;
    }
  }, {
    key: 'mfhd',
    value: function mfhd() {
      var buffer = new _buffer2.default();
      var content = _buffer2.default.writeUint32(FMP4.sequence);
      FMP4.sequence += 1;
      buffer.write(FMP4.size(16), FMP4.type('mfhd'), FMP4.extension(0, 0), content);
      return buffer.buffer;
    }
  }, {
    key: 'traf',
    value: function traf(data) {
      var buffer = new _buffer2.default();var size = 8;
      var tfhd = FMP4.tfhd(1);
      var tfdt = FMP4.tfdt(data.time);
      var trun = FMP4.trun(data);
      [tfhd, tfdt, trun].forEach(function (item) {
        size += item.byteLength;
      });
      buffer.write(FMP4.size(size), FMP4.type('traf'), tfhd, tfdt, trun);
      return buffer.buffer;
    }
  }, {
    key: 'tfhd',
    value: function tfhd(id) {
      var buffer = new _buffer2.default();
      var content = _buffer2.default.writeUint32(id);
      buffer.write(FMP4.size(16), FMP4.type('tfhd'), FMP4.extension(0, 131072), content);
      return buffer.buffer;
    }
  }, {
    key: 'tfdt',
    value: function tfdt(time) {
      var buffer = new _buffer2.default();
      var content = new Uint8Array([time >> 24, time >> 16 & 0xff, time >> 8 & 0xff, time & 0xff]);
      buffer.write(FMP4.size(16), FMP4.type('tfdt'), FMP4.extension(0, 0), content);
      return buffer.buffer;
    }
  }, {
    key: 'trun',
    value: function trun(data) {
      var buffer = new _buffer2.default();
      var sampleCount = _buffer2.default.writeUint32(data.samples.length);
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
      var offset = _buffer2.default.writeUint32(92 + 4 * data.samples.length);
      buffer.write(FMP4.size(20 + 4 * data.samples.length), FMP4.type('trun'), FMP4.extension(0, 513), sampleCount, offset);
      data.samples.forEach(function (item, idx) {
        buffer.write(_buffer2.default.writeUint32(item.size));
      });
      return buffer.buffer;
    }
  }, {
    key: 'mdat',
    value: function mdat(data) {
      var buffer = new _buffer2.default();var size = 8;
      data.samples.forEach(function (item) {
        size += item.size;
      });
      buffer.write(FMP4.size(size), FMP4.type('mdat'));
      data.samples.forEach(function (item) {
        buffer.write(item.buffer);
      });
      return buffer.buffer;
    }
  }]);

  return FMP4;
}();

FMP4.sequence = 1;

exports.default = FMP4;
module.exports = exports['default'];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(14);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _error = __webpack_require__(7);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function () {
  function Task(url, range, callback) {
    _classCallCheck(this, Task);

    (0, _eventEmitter2.default)(this);
    this.url = url;
    this.range = range;
    this.id = range.join('-');
    this.on = false;
    var xhr = new window.XMLHttpRequest();
    xhr.target = this;
    xhr.responseType = 'arraybuffer';
    xhr.open('get', url);
    xhr.setRequestHeader('Range', 'bytes=' + range[0] + '-' + range[1]);
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 206) {
        if (callback && callback instanceof Function) {
          callback(xhr.response);
        }
      }
      xhr.target.remove();
    };
    xhr.onerror = function (e) {
      xhr.target.emit('error', new _error2.default('network', '', { line: 25, handle: '[Task] constructor', msg: e.message, url: url }));
      xhr.target.remove();
    };
    xhr.onabort = function () {
      xhr.target.remove();
    };
    this.xhr = xhr;
    Task.queue.push(this);
    this.update();
  }

  _createClass(Task, [{
    key: 'cancel',
    value: function cancel() {
      this.xhr.abort();
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this = this;

      Task.queue.filter(function (item, idx) {
        if (item.url === _this.url && item.id === _this.id) {
          Task.queue.splice(idx, 1);
          return true;
        } else {
          return false;
        }
      });
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      var Queue = Task.queue;
      var sended = Queue.filter(function (item) {
        return item.on;
      });
      var wait = Queue.filter(function (item) {
        return !item.on;
      });
      var max = Task.limit - sended.length;
      wait.forEach(function (item, idx) {
        if (idx < max) {
          item.run();
        }
      });
    }
  }, {
    key: 'run',
    value: function run() {
      if (this.xhr.readyState === 1) {
        this.on = true;
        this.xhr.send();
      } else {
        this.remove();
      }
    }
  }], [{
    key: 'clear',
    value: function clear() {
      Task.queue.forEach(function (item) {
        if (item.on) {
          item.cancel();
        }
      });
      Task.queue.length = 0;
    }
  }]);

  return Task;
}();

Task.queue = [];
Task.limit = 2;
window.Task = Task;

exports.default = Task;
module.exports = exports['default'];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(38);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(39);

__webpack_require__(59);

var _xgplayer = __webpack_require__(13);

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _mp = __webpack_require__(62);

var _mp2 = _interopRequireDefault(_mp);

var _mse = __webpack_require__(125);

var _mse2 = _interopRequireDefault(_mse);

var _task = __webpack_require__(36);

var _task2 = _interopRequireDefault(_task);

var _buffer = __webpack_require__(17);

var _buffer2 = _interopRequireDefault(_buffer);

var _mp3 = __webpack_require__(35);

var _mp4 = _interopRequireDefault(_mp3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEnded = function isEnded(player, mp4) {
  if (mp4.meta.endTime - player.currentTime < 2) {
    var range = player.getBufferedRange();
    if (player.currentTime - range[1] < 0.1) {
      player.mse.endOfStream();
    }
  }
};

var errorHandle = function errorHandle(player, err) {
  err.vid = player.config.vid;
  err.url = player.src;
  if (err.errd && _typeof(err.errd) === 'object') {
    if (player.mp4) {
      err.errd.url = player.mp4.url;
      err.url = player.mp4.url;
      player.mp4.canDownload = false;
    }
  }
  player.emit('DATA_REPORT', err);
  if (err.errt === 'network' && player.config._backupURL) {
    player.src = player.config._backupURL;
  } else {
    player.src = player.config._mainURL;
  }
  player.switchURL = null;
  player._replay = null;
};

var m4aplayer = function m4aplayer() {
  var player = this;var sniffer = _xgplayer2.default.sniffer;var util = _xgplayer2.default.util;
  var Errors = _xgplayer2.default.Errors;var mainURL = void 0;var backupURL = void 0;
  var preloadTime = player.config.preloadTime || 15;
  var waiterTimer = void 0;
  _xgplayer2.default.m4a = true;
  player.hasEnded = false;
  var list = util.typeOf(player.config.url) === 'Array' ? player.config.url : [{
    src: player.config.url,
    name: player.config.name,
    vid: player.config.vid,
    poster: player.config.poster
  }];
  var url = list[0].src;
  var name = list[0].name;
  var vid = list[0].vid;
  var poster = list[0].poster;
  var rule = player.config.pluginRule || function () {
    return true;
  };
  if (!url) {
    player.emit('error', new Errors('other', player.config.vid));
    return;
  }
  if (util.typeOf(url) === 'String') {
    mainURL = url;
  } else if (util.typeOf(url) === 'Array' && url.length) {
    mainURL = url[0].src;
    backupURL = url[1].src;
  }
  player.config._mainURL = mainURL;
  player.config._backupURL = backupURL;
  var loadData = function loadData() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : player.currentTime;
    var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var nextOrder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (player.timer) {
      clearTimeout(player.timer);
    }
    time = Math.max(time, player.currentTime);
    player.timer = setTimeout(function () {
      player.mp4.seek(time, order, nextOrder).then(function (buffer) {
        if (buffer) {
          var mse = player.mse;
          mse.updating = true;
          mse.appendBuffer(buffer);
          mse.once('updateend', function () {
            mse.updating = false;
          });
        }
      }, function () {
        if (i < 10) {
          setTimeout(function () {
            loadData(i + 1);
          }, 2000);
        }
      });
    }, 50);
  };
  var init = function init(url) {
    var replaying = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var mp4 = new _mp2.default(url);
    mp4.reqTimeLength = player.config.reqTimeLength || 5;
    var mse = void 0;
    return new Promise(function (resolve, reject) {
      mp4.once('mdatReady', function () {
        mse = new _mse2.default();
        if (replaying) {
          mse.replaying = true;
        }
        mse.on('sourceopen', function () {
          mse.appendBuffer(mp4.packMeta(mp4.meta));
          mse.once('updateend', loadData.bind(player));
        });
        mse.on('error', function (e) {
          reject(e);
        });
        resolve([mp4, mse]);
      });
      mp4.on('error', function (e) {
        reject(e);
      });
    });
  };
  if (['chrome', 'firfox', 'safari'].some(function (item) {
    return item === sniffer.browser;
  }) && _mse2.default.isSupported('audio/mp4; codecs="mp4a.40.5"')) {
    var _start = player.start;
    if (!rule.call(player)) {
      return false;
    }
    Object.defineProperty(player, 'src', {
      get: function get() {
        return player.currentSrc;
      },
      set: function set(url) {
        player.config.url = url;
        if (!player.paused) {
          player.pause();
          player.once('pause', function () {
            player.start(url);
          });
          player.once('canplay', function () {
            player.play();
          });
        } else {
          player.start(url);
        }
        player.once('canplay', function () {
          player.currentTime = 0;
        });
      },

      configurable: true
    });
    player.start = function () {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mainURL;

      init(url).then(function (result) {
        var mp4 = result[0];var mse = result[1];
        _start.call(player, mse.url);
        player.mp4 = mp4;
        player.mse = mse;
        mp4.on('error', function (err) {
          errorHandle(player, err);
        });
      }, function (err) {
        _start.call(player, url);
        errorHandle(player, err);
      });
      player.once('canplay', function () {
        // safari decoder time offset
        if (sniffer.browser === 'safari' && player.buffered) {
          var start = player.buffered.start(0);
          player.currentTime = start + 0.1;
        }
      });
    };
    player.cut = function () {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments[1];

      var segment = new _buffer2.default();
      return new Promise(function (resolve, reject) {
        var mp4 = new _mp2.default(url);
        mp4.once('mdatReady', function () {
          if (!end || end <= start) {
            end = start + 15;
          }
          if (end > mp4.meta.audioDuration) {
            start = mp4.meta.audioDuration - (end - start);
            end = mp4.meta.audioDuration;
          }
          mp4.reqTimeLength = end - start;
          mp4.cut = true;
          mp4.seek(start).then(function (buffer) {
            if (buffer) {
              var meta = _xgplayer2.default.util.deepCopy({
                duration: mp4.reqTimeLength,
                audioDuration: mp4.reqTimeLength,
                endTime: mp4.reqTimeLength
              }, mp4.meta);
              meta.duration = mp4.reqTimeLength;
              meta.audioDuration = mp4.reqTimeLength;
              meta.endTime = mp4.reqTimeLength;
              segment.write(mp4.packMeta(meta), buffer);
              resolve(new Blob([segment.buffer], { type: 'audio/mp4; codecs="mp4a.40.5"' }));
            }
          });
        });
        mp4.on('error', function (e) {
          reject(e);
        });
      });
    };

    player.switchURL = function (url) {
      var mp5 = new _mp2.default(url);
      var mp4 = player.mp4;
      mp5.on('mdatReady', function () {
        var timeRange = mp4.timeRage;var curTime = player.currentTime;
        timeRange = mp4.timeRage;
        var start = timeRange.find(function (item) {
          return item[0] - curTime > 2;
        })[0];
        var end = player.getBufferedRange()[1];
        if (end - start > 0 && sniffer.browser !== 'safari') {
          player.mse.removeBuffer(start, end);
        }
        player.mp4 = mp5;
        player.mse.appendBuffer(mp5.packMeta(mp5.meta));
      });
      mp5.on('error', function (err) {
        errorHandle(player, err);
      });
    };
    player.on('timeupdate', function () {
      var mse = player.mse;var mp4 = player.mp4;
      if (mse && !mse.updating && mp4.canDownload) {
        var timeRage = mp4.timeRage;
        var range = player.getBufferedRange();var cacheMaxTime = player.currentTime + preloadTime;
        if (range[1] - cacheMaxTime > 0) {
          return;
        }
        timeRage.every(function (item, idx) {
          if (range[1] === 0) {
            loadData(5);
            return false;
          } else {
            if (item[0].time >= range[1] && !mp4.bufferCache.has(idx)) {
              loadData(0, item[0].time, item[0].order, item[1].order);
            } else {
              return true;
            }
          }
        });
        isEnded(player, mp4); // hack for older webkit
      }
    });

    player.on('seeking', function () {
      var buffered = player.buffered;var hasBuffered = false;var curTime = player.currentTime;
      _task2.default.clear();
      var timeRage = player.mp4.timeRage;
      if (buffered.length) {
        for (var i = 0, len = buffered.length; i < len; i++) {
          if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
            hasBuffered = true;
            break;
          }
        }
        if (!hasBuffered) {
          timeRage.every(function (item, idx) {
            if (item[0].time <= curTime && item[1].time > curTime) {
              loadData(0, item[0].time, item[0].order, item[1].order);
              return false;
            } else {
              return true;
            }
          });
        }
      } else {
        timeRage.every(function (item, idx) {
          if (item[0].time <= curTime && item[1].time > curTime) {
            loadData(0, item[0].time, item[0].order, item[1].order);
            return false;
          } else {
            return true;
          }
        });
      }
    });

    player.on('pause', function () {
      _task2.default.clear();
    });

    player.on('playing', function () {
      if (waiterTimer) {
        clearTimeout(waiterTimer);
      }
    });

    player.on('waiting', function () {
      var buffered = player.buffered;var hasBuffered = false;var curTime = player.currentTime;
      _task2.default.clear();
      var timeRage = player.mp4.timeRage;
      if (buffered.length) {
        for (var i = 0, len = buffered.length; i < len; i++) {
          if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
            hasBuffered = true;
            break;
          }
        }
        if (!hasBuffered) {
          timeRage.every(function (item, idx) {
            if (item[0].time <= curTime && item[1].time > curTime) {
              loadData(0, item[0].time, item[0].order, item[1].order);
              return false;
            } else {
              return true;
            }
          });
        }
      } else {
        timeRage.every(function (item, idx) {
          if (item[0].time <= curTime && item[1].time > curTime) {
            loadData(0, item[0].time, item[0].order, item[1].order);
            return false;
          } else {
            return true;
          }
        });
      }
    });

    player.once('destroy', function () {
      _task2.default.clear();
      if (player.timer) {
        clearTimeout(player.timer);
      }
    });

    // let playBtn = util.findDom(player.root, '.xgplayer-play');
    // ['click', 'touchstart'].forEach(item => {
    //   playBtn.addEventListener(item, function (e) {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     if (player.hasEnded) {
    //       player.hasEnded = false
    //       Task.clear()
    //       player.mp4.bufferCache.clear()
    //       // player.currentTime = 0
    //       init(player.mp4.url, true).then((result) => {
    //         let mp4 = result[0]; let mse = result[1]
    //         player.src = mse.url
    //         player.mp4 = mp4
    //         player.mse = mse
    //         player.mse.replaying = true
    //         player.currentTime = 0
    //         player.video.play().then(() => {
    //
    //           // player.pause()
    //           // player.currentTime = 0
    //         })
    //       }, err => {
    //         errorHandle(player, err)
    //       })
    //     }
    //   })
    // })

    player.on('change', function (nextItem) {
      player.newMusic(nextItem.src);
      name = '' + nextItem.name;
      vid = '' + nextItem.vid;
      poster = '' + nextItem.poster;
    });

    player.newMusic = function (url) {
      _task2.default.clear();
      player.mp4.bufferCache.clear();
      init(url, true).then(function (result) {
        var mp4 = result[0];var mse = result[1];
        player.src = mse.url;
        player.mp4 = mp4;
        player.mse = mse;
        player.mse.replaying = true;
        player.currentTime = 0;
        setTimeout(function () {
          player.video.play();
        }, 60);
      }, function (err) {
        errorHandle(player, err);
      });
    };

    player.on('ended', function () {
      player.hasEnded = true;
      if (player.config.offline) {
        var mdatCache = new _buffer2.default();
        mdatCache.write(_mp4.default.size(player.mp4.mdatBox.size), _mp4.default.type('mdat'));
        player.mp4.mdatCache.sort(function (a, b) {
          return a.start - b.start;
        });
        var end = player.mp4.mdatCache[0].start - 1;
        player.mp4.mdatCache.forEach(function (item, index) {
          if (item.start === end + 1) {
            mdatCache.write(item.buffer);
            end = item.end;
          }
        });
        if (end !== player.mp4.mdatCache[player.mp4.mdatCache.length - 1].end) {
          return;
        }
        var m4aCache = new _buffer2.default();
        if (player.mp4.freeBuffer) {
          m4aCache.write(new Uint8Array(player.mp4.ftypBuffer), new Uint8Array(player.mp4.moovBuffer), new Uint8Array(player.mp4.freeBuffer), mdatCache.buffer);
        } else {
          m4aCache.write(new Uint8Array(player.mp4.ftypBuffer), new Uint8Array(player.mp4.moovBuffer), mdatCache.buffer);
        }
        var offlineVid = vid || name;
        player.database.openDB(function () {
          player.database.addData(player.database.myDB.ojstore.name, [{ vid: offlineVid, blob: new Blob([m4aCache.buffer], { type: 'audio/mp4; codecs="mp4a.40.5"' }) }]);
          setTimeout(function () {
            player.database.closeDB();
          }, 5000);
        });
      }
    });
  }
};

_xgplayer2.default.install('m4aplayer', m4aplayer);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(18);
var global = __webpack_require__(2);
var ctx = __webpack_require__(8);
var classof = __webpack_require__(19);
var $export = __webpack_require__(21);
var isObject = __webpack_require__(6);
var aFunction = __webpack_require__(9);
var anInstance = __webpack_require__(44);
var forOf = __webpack_require__(45);
var speciesConstructor = __webpack_require__(49);
var task = __webpack_require__(30).set;
var microtask = __webpack_require__(52)();
var newPromiseCapabilityModule = __webpack_require__(31);
var perform = __webpack_require__(53);
var userAgent = __webpack_require__(32);
var promiseResolve = __webpack_require__(54);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function empty() {/* empty */};
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise
    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) {/* empty */}
}();

// helpers
var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function notify(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function onUnhandled(promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function isUnhandled(promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function $resolve(value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions
    this._a = undefined; // <- checked in isUnhandled reactions
    this._s = 0; // <- state
    this._d = false; // <- done
    this._v = undefined; // <- value
    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false; // <- notify
  };
  Internal.prototype = __webpack_require__(55)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(56)($Promise, PROMISE);
__webpack_require__(57)(PROMISE);
Wrapper = __webpack_require__(4)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(58)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = __webpack_require__(4);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(18) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = !__webpack_require__(10) && !__webpack_require__(23)(function () {
  return Object.defineProperty(__webpack_require__(24)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(8);
var call = __webpack_require__(46);
var isArrayIter = __webpack_require__(47);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(28);
var getIterFn = __webpack_require__(48);
var BREAK = {};
var RETURN = {};
var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () {
    return iterable;
  } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
_exports.BREAK = BREAK;
_exports.RETURN = RETURN;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// check on default Array iterator
var Iterators = __webpack_require__(27);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(19);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(27);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(9);
var SPECIES = __webpack_require__(3)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
                  var un = that === undefined;
                  switch (args.length) {
                                    case 0:
                                                      return un ? fn() : fn.call(that);
                                    case 1:
                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
                                    case 2:
                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                    case 3:
                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                    case 4:
                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                  }return fn.apply(that, args);
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var macrotask = __webpack_require__(30).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(11)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();else last = undefined;
        throw e;
      }
    }last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function notify() {
      process.nextTick(flush);
    };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function notify() {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function notify() {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    }last = task;
  };
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(5);
var isObject = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(31);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(25);
module.exports = function (target, src, safe) {
  for (var key in src) {
    redefine(target, key, src[key], safe);
  }return target;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var def = __webpack_require__(12).f;
var has = __webpack_require__(26);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var dP = __webpack_require__(12);
var DESCRIPTORS = __webpack_require__(10);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(21);
var $pad = __webpack_require__(60);
var userAgent = __webpack_require__(32);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(28);
var repeat = __webpack_require__(61);
var defined = __webpack_require__(33);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(29);
var defined = __webpack_require__(33);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (; n > 0; (n >>>= 1) && (str += str)) {
    if (n & 1) res += str;
  }return res;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(14);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _deepmerge = __webpack_require__(78);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _parse = __webpack_require__(79);

var _parse2 = _interopRequireDefault(_parse);

var _buffer = __webpack_require__(17);

var _buffer2 = _interopRequireDefault(_buffer);

var _mp = __webpack_require__(35);

var _mp2 = _interopRequireDefault(_mp);

var _task = __webpack_require__(36);

var _task2 = _interopRequireDefault(_task);

var _download = __webpack_require__(123);

var _download2 = _interopRequireDefault(_download);

var _util = __webpack_require__(124);

var _util2 = _interopRequireDefault(_util);

var _xgplayer = __webpack_require__(13);

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _error = __webpack_require__(7);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MP4 = function () {
  /**
     * [constructor 构造函数]
     * @param {String} url                      [视频地址]
     * @param {Number} [chunk_size=Math.pow(25, 4)]           [请求的数据块大小，对于长视频设置的较大些可以避免二次请求]
     */
  function MP4(url) {
    var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1024;

    _classCallCheck(this, MP4);

    (0, _eventEmitter2.default)(this);
    this.url = url;
    this.CHUNK_SIZE = chunkSize;
    this.reqTimeLength = 5;
    this.init(url);
    this.once('mdatReady', this.moovParse.bind(this));
    this.cache = new _buffer2.default();
    this.bufferCache = new Set();
    this.mdatCache = [];
    this.timeRage = [];
    this.canDownload = true;
    this.cut = false;
  }

  /**
     * [getData 根据字节区间下载二进制数据]
     * @param  {Number} [start=0]  [起始字节]
     * @param  {Number} [end=start + this.CHUNK_SIZE] [截止字节]
     */


  _createClass(MP4, [{
    key: 'getData',
    value: function getData() {
      var _this = this;

      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start + this.CHUNK_SIZE;

      var self = this;
      return new Promise(function (resolve, reject) {
        var task = new _task2.default(_this.url, [start, end], resolve);
        task.once('error', function (err) {
          self.emit('error', err);
        });
      });
    }

    /**
       * [moovParse 解析视频信息]
       * @return {[type]} [description]
       */

  }, {
    key: 'moovParse',
    value: function moovParse() {
      var self = this;
      var moov = this.moovBox;
      var mvhd = _util2.default.findBox(moov, 'mvhd');
      var traks = _util2.default.findBox(moov, 'trak');
      var audioTrak = void 0;
      var audioCodec = void 0;
      var audioTimeScale = void 0;
      var channelCount = void 0,
          sampleRate = void 0,
          decoderConfig = void 0;
      if (_xgplayer2.default.util.typeOf(traks) !== 'Array') {
        traks = [traks];
      }
      traks.forEach(function (trak) {
        var hdlr = _util2.default.findBox(trak, 'hdlr');
        var mdhd = _util2.default.findBox(trak, 'mdhd');
        if (!hdlr || !mdhd) {
          self.emit('error', new _error2.default('parse', '', { line: 72, handle: '[MP4] moovParse', url: self.url }));
          return;
        }
        var stsd = _util2.default.findBox(trak, 'stsd');
        var codecBox = stsd.subBox[0];
        if (hdlr.handleType === 'soun') {
          audioTrak = trak;
          var esds = _util2.default.findBox(trak, 'esds');
          var mp4a = _util2.default.findBox(trak, 'mp4a');
          var ESDescriptor = _util2.default.findBox(trak, 5);
          audioTimeScale = mdhd.timescale;
          if (esds) {
            audioCodec = codecBox.type + '.' + _util2.default.toHex(esds.subBox[0].subBox[0].typeID) + ('.' + esds.subBox[0].subBox[0].subBox[0].type);
          } else {
            audioCodec = '' + codecBox.type;
          }
          if (ESDescriptor && ESDescriptor.EScode) {
            decoderConfig = ESDescriptor.EScode.map(function (item) {
              return Number('0x' + item);
            });
          }
          if (mp4a) {
            channelCount = mp4a.channelCount;
            sampleRate = mp4a.sampleRate;
          }
        }
      });
      this.audioTrak = (0, _deepmerge2.default)({}, audioTrak);
      var mdat = this._boxes.find(function (item) {
        return item.type === 'mdat';
      });
      var audioDuration = parseFloat(_util2.default.seekTrakDuration(audioTrak, audioTimeScale));
      this.mdatStart = mdat.start;
      this.sampleCount = _util2.default.sampleCount(_util2.default.findBox(this.audioTrak, 'stts').entry);

      var audioFrame = void 0,
          audioNextFrame = void 0;
      var stts = _util2.default.findBox(this.audioTrak, 'stts').entry;
      for (var i = 0; i < audioDuration; i += this.reqTimeLength) {
        audioFrame = _util2.default.seekOrderSampleByTime(stts, audioTimeScale, i);
        if (i + this.reqTimeLength < audioDuration) {
          audioNextFrame = _util2.default.seekOrderSampleByTime(stts, audioTimeScale, i + this.reqTimeLength);
          this.timeRage.push([{ time: audioFrame.startTime, order: audioFrame.order }, { time: audioNextFrame.startTime, order: audioNextFrame.order }]);
        } else {
          this.timeRage.push([{ time: audioFrame.startTime, order: audioFrame.order }, { time: audioDuration, order: this.sampleCount - 1 }]);
        }
      }
      // console.log('this.timeRage')
      // console.log(this.timeRage)
      this.meta = {
        audioCodec: audioCodec,
        createTime: mvhd.createTime,
        modifyTime: mvhd.modifyTime,
        duration: mvhd.duration / mvhd.timeScale,
        timeScale: mvhd.timeScale,
        audioDuration: audioDuration,
        audioTimeScale: audioTimeScale,
        endTime: audioDuration,
        channelCount: channelCount,
        sampleRate: sampleRate,
        audioConfig: decoderConfig
      };
    }

    /**
       * [init 实例的初始化，主要是获取视频的MOOV元信息]
       */

  }, {
    key: 'init',
    value: function init() {
      var self = this;
      self.getData().then(function (resFir) {
        var parsedFir = void 0;
        var mdatStart = 0;

        var mdat = void 0,
            moov = void 0,
            ftyp = void 0;

        var boxes = void 0;
        try {
          parsedFir = new _parse2.default(resFir);
        } catch (e) {
          self.emit('error', e.type ? e : new _error2.default('parse', '', { line: 176, handle: '[MP4] init', msg: e.message }));
          return false;
        }
        self._boxes = boxes = parsedFir.boxes;
        boxes.every(function (item) {
          mdatStart += item.size;
          if (item.type === 'ftyp') {
            ftyp = item;
            self.ftypBox = ftyp;
            self.ftypBuffer = resFir.slice(0, ftyp.size);
            return true;
          }
          return true;
        });
        if (!mdat) {
          var nextBox = parsedFir.nextBox;
          if (nextBox) {
            if (nextBox.type === 'moov' || nextBox.type === 'free') {
              self.getData(mdatStart, mdatStart + nextBox.size + 1024).then(function (resSec) {
                var parsedSec = new _parse2.default(resSec);
                self._boxes = self._boxes.concat(parsedSec.boxes);
                parsedSec.boxes.every(function (item) {
                  if (item.type === 'moov') {
                    mdatStart += item.size;
                    moov = item;
                    self.moovBox = moov;
                    self.moovBuffer = resSec.slice(0, moov.size);
                    return true;
                  } else if (item.type === 'mdat') {
                    mdat = item;
                    mdat.start = mdatStart;
                    mdatStart += item.size;
                    self.mdatBox = mdat;
                    self.emit('mdatReady', moov);
                    return false;
                  } else {
                    mdatStart += item.size;
                    return true;
                  }
                });
                if (!mdat) {
                  var nextBoxSec = parsedSec.nextBox;
                  if (nextBoxSec) {
                    if (nextBoxSec.type === 'free') {
                      self.getData(mdatStart, mdatStart + nextBoxSec.size + 1024).then(function (resThi) {
                        var parsedThi = new _parse2.default(resThi);
                        self._boxes = self._boxes.concat(parsedThi.boxes);
                        parsedThi.boxes.every(function (item) {
                          if (item.type === 'mdat') {
                            mdat = item;
                            mdat.start = mdatStart;
                            self.mdatBox = mdat;
                            self.emit('mdatReady', moov);
                            return false;
                          } else if (item.type === 'free') {
                            self.freeBuffer = resThi.slice(0, item.size);
                            mdatStart += item.size;
                            return true;
                          } else {
                            mdatStart += item.size;
                            return true;
                          }
                        });
                        if (!mdat) {
                          self.emit('error', new _error2.default('parse', '', { line: 207, handle: '[MP4] init', msg: 'not find mdat box' }));
                        }
                      }).catch(function () {
                        self.emit('error', new _error2.default('network', '', { line: 210, handle: '[MP4] getData', msg: 'getData failed' }));
                      });
                    } else {
                      self.emit('error', new _error2.default('parse', '', { line: 213, handle: '[MP4] init', msg: 'not find mdat box' }));
                    }
                  } else {
                    self.emit('error', new _error2.default('parse', '', { line: 216, handle: '[MP4] init', msg: 'not find mdat box' }));
                  }
                }
              }).catch(function () {
                self.emit('error', new _error2.default('network', '', { line: 220, handle: '[MP4] getData', msg: 'getData failed' }));
              });
            } else {
              self.emit('error', new _error2.default('parse', '', { line: 223, handle: '[MP4] init', msg: 'not find mdat box' }));
            }
          } else {
            self.emit('error', new _error2.default('parse', '', { line: 226, handle: '[MP4] init', msg: 'not find mdat box' }));
          }
        }
      }).catch(function () {
        self.emit('error', new _error2.default('network', '', { line: 230, handle: '[MP4] getData', msg: 'getData failed' }));
      });
    }
  }, {
    key: 'getSamplesByOrders',
    value: function getSamplesByOrders() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'audio';
      var start = arguments[1];
      var end = arguments[2];

      var trak = this.audioTrak;
      var stsc = _util2.default.findBox(trak, 'stsc'); // chunk~samples
      var stsz = _util2.default.findBox(trak, 'stsz'); // sample-size
      var stts = _util2.default.findBox(trak, 'stts'); // sample-time
      var stco = _util2.default.findBox(trak, 'stco'); // chunk-offset
      var ctts = _util2.default.findBox(trak, 'ctts'); // offset-compositime
      var mdatStart = this.mdatStart;
      var samples = [];
      end = end !== undefined ? end : stsz.entries.length;
      if (start instanceof Array) {
        start.forEach(function (item, idx) {
          samples.push({
            idx: item,
            size: stsz.entries[item],
            time: _util2.default.seekSampleTime(stts, ctts, item),
            offset: _util2.default.seekSampleOffset(stsc, stco, stsz, item, mdatStart)
          });
        });
      } else if (end !== 0) {
        for (var i = start; i < end; i++) {
          samples.push({
            idx: i,
            size: stsz.entries[i],
            time: _util2.default.seekSampleTime(stts, ctts, i),
            offset: _util2.default.seekSampleOffset(stsc, stco, stsz, i, mdatStart)
          });
        }
      } else {
        samples = {
          idx: start,
          size: stsz.entries[start],
          time: _util2.default.seekSampleTime(stts, ctts, start),
          offset: _util2.default.seekSampleOffset(stsc, stco, stsz, start, mdatStart)
        };
      }
      return samples;
    }
  }, {
    key: 'packMeta',
    value: function packMeta(meta) {
      if (!meta) {
        return;
      }
      var buffer = new _buffer2.default();
      buffer.write(_mp2.default.ftyp());
      buffer.write(_mp2.default.moov(meta));
      this.cache.write(buffer.buffer);
      return buffer.buffer;
    }
  }, {
    key: 'seek',
    value: function seek(time) {
      var audioIndexOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var audioNextIndexOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var audioStts = _util2.default.findBox(this.audioTrak, 'stts').entry;
      if (!audioIndexOrder) {
        audioIndexOrder = _util2.default.seekOrderSampleByTime(audioStts, this.meta.audioTimeScale, time).order;
      }
      if (!audioNextIndexOrder) {
        if (time + this.reqTimeLength < this.meta.audioDuration) {
          audioNextIndexOrder = _util2.default.seekOrderSampleByTime(audioStts, this.meta.audioTimeScale, time + this.reqTimeLength).order;
        }
      }
      if (this.bufferCache.has(audioIndexOrder)) {
        return Promise.resolve(null);
      } else {
        return this.loadFragment(audioIndexOrder, audioNextIndexOrder);
      }
    }
  }, {
    key: 'loadFragment',
    value: function loadFragment(audioIndexOrder, audioNextIndexOrder) {
      var _this2 = this;

      var start = void 0,
          end = void 0;
      var self = this;
      var audioFrame = this.getSamplesByOrders('audio', audioIndexOrder, 0);
      start = audioFrame.offset;
      var audioNextFrame = void 0;
      if (audioNextIndexOrder) {
        audioNextFrame = this.getSamplesByOrders('audio', audioNextIndexOrder, 0);
        end = audioNextFrame.offset - 1;
      } else {
        audioNextFrame = this.getSamplesByOrders('audio', this.sampleCount - 1, 0);
        end = audioNextFrame.offset + audioNextFrame.size - 1;
      }
      // console.log('start order')
      // console.log(audioIndexOrder)
      // console.log('start')
      // console.log(start + self.mdatStart)
      // console.log('end order')
      // console.log(audioNextIndexOrder)
      // console.log('end')
      // console.log(self.mdatStart + end)
      if (window.isNaN(start) || end !== undefined && window.isNaN(end)) {
        self.emit('error', new _error2.default('parse', '', { line: 366, handle: '[MP4] loadFragment', url: self.url }));
        return false;
      }
      return this.getData(start + self.mdatStart, end ? self.mdatStart + end : '').then(function (dat) {
        if (end) {
          _this2.mdatCache.push({
            start: start + self.mdatStart,
            end: self.mdatStart + end,
            buffer: new Uint8Array(dat)
          });
        }
        return self.createFragment(new Uint8Array(dat), start, audioIndexOrder, audioNextIndexOrder);
      });
    }
  }, {
    key: 'addFragment',
    value: function addFragment(data) {
      var buffer = new _buffer2.default();
      buffer.write(_mp2.default.moof(data));
      buffer.write(_mp2.default.mdat(data));
      this.cache.write(buffer.buffer);
      return buffer.buffer;
    }
  }, {
    key: 'createFragment',
    value: function createFragment(mdatData, start, audioIndexOrder, audioNextIndexOrder) {
      var resBuffers = [];
      this.bufferCache.add(audioIndexOrder);
      var _samples = this.getSamplesByOrders('audio', audioIndexOrder, audioNextIndexOrder);
      var samples = _samples.map(function (item, idx) {
        return {
          size: item.size,
          duration: item.time.duration,
          offset: item.time.offset,
          buffer: new Uint8Array(mdatData.slice(item.offset - start, item.offset - start + item.size)),
          key: idx === 0
        };
      });
      resBuffers.push(this.addFragment({ id: 2, time: this.cut ? 0 : _samples[0].time.time, firstFlags: 0x00, flags: 0x701, samples: samples }));
      var bufferSize = 0;
      resBuffers.every(function (item) {
        bufferSize += item.byteLength;
        return true;
      });
      var buffer = new Uint8Array(bufferSize);

      var offset = 0;
      resBuffers.every(function (item) {
        buffer.set(item, offset);
        offset += item.byteLength;
        return true;
      });
      return Promise.resolve(buffer);
    }
  }, {
    key: 'download',
    value: function download() {
      // new Download('fmp4.mp4', this.cache.buffer)
    }
  }]);

  return MP4;
}();

exports.default = MP4;
module.exports = exports['default'];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(64),
    normalizeOpts = __webpack_require__(72),
    isCallable = __webpack_require__(73),
    contains = __webpack_require__(74),
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(65)() ? Object.assign : __webpack_require__(66);

/***/ }),
/* 65 */
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(67),
    value = __webpack_require__(71),
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(68)() ? Object.keys : __webpack_require__(69);

/***/ }),
/* 68 */
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(15);

var keys = Object.keys;

module.exports = function (object) {
  return keys(isValue(object) ? Object(object) : object);
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function

module.exports = function () {};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(15);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(15);

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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
  return typeof obj === "function";
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(75)() ? String.prototype.contains : __webpack_require__(76);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
	return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function (element) {
		return cloneUnlessOtherwiseSpecified(element, options);
	});
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		Object.keys(target).forEach(function (key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	Object.keys(source).forEach(function (key) {
		if (!options.isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		} else {
			destination[key] = deepmerge(target[key], source[key], options);
		}
	});
	return destination;
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options);
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options);
	} else {
		return mergeObject(target, source, options);
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array');
	}

	return array.reduce(function (prev, next) {
		return deepmerge(prev, next, options);
	}, {});
};

var deepmerge_1 = deepmerge;

exports.default = deepmerge_1;
module.exports = exports['default'];

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _concatTypedArray = __webpack_require__(34);

var _concatTypedArray2 = _interopRequireDefault(_concatTypedArray);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _vmhd = __webpack_require__(82);

var _vmhd2 = _interopRequireDefault(_vmhd);

var _url = __webpack_require__(83);

var _url2 = _interopRequireDefault(_url);

var _udta = __webpack_require__(84);

var _udta2 = _interopRequireDefault(_udta);

var _trun = __webpack_require__(85);

var _trun2 = _interopRequireDefault(_trun);

var _traf = __webpack_require__(86);

var _traf2 = _interopRequireDefault(_traf);

var _tkhd = __webpack_require__(87);

var _tkhd2 = _interopRequireDefault(_tkhd);

var _tfhd = __webpack_require__(88);

var _tfhd2 = _interopRequireDefault(_tfhd);

var _stz = __webpack_require__(89);

var _stz2 = _interopRequireDefault(_stz);

var _stts = __webpack_require__(90);

var _stts2 = _interopRequireDefault(_stts);

var _stsz = __webpack_require__(91);

var _stsz2 = _interopRequireDefault(_stsz);

var _stss = __webpack_require__(92);

var _stss2 = _interopRequireDefault(_stss);

var _stsh = __webpack_require__(93);

var _stsh2 = _interopRequireDefault(_stsh);

var _stsd = __webpack_require__(94);

var _stsd2 = _interopRequireDefault(_stsd);

var _stsc = __webpack_require__(95);

var _stsc2 = _interopRequireDefault(_stsc);

var _stco = __webpack_require__(96);

var _stco2 = _interopRequireDefault(_stco);

var _smhd = __webpack_require__(97);

var _smhd2 = _interopRequireDefault(_smhd);

var _SLConfigDescriptor = __webpack_require__(98);

var _SLConfigDescriptor2 = _interopRequireDefault(_SLConfigDescriptor);

var _sdtp = __webpack_require__(99);

var _sdtp2 = _interopRequireDefault(_sdtp);

var _sbgp = __webpack_require__(100);

var _sbgp2 = _interopRequireDefault(_sbgp);

var _pasp = __webpack_require__(101);

var _pasp2 = _interopRequireDefault(_pasp);

var _nmhd = __webpack_require__(102);

var _nmhd2 = _interopRequireDefault(_nmhd);

var _mvhd = __webpack_require__(103);

var _mvhd2 = _interopRequireDefault(_mvhd);

var _MP4ESDescrTag = __webpack_require__(104);

var _MP4ESDescrTag2 = _interopRequireDefault(_MP4ESDescrTag);

var _MP4DecSpecificDescrTag = __webpack_require__(105);

var _MP4DecSpecificDescrTag2 = _interopRequireDefault(_MP4DecSpecificDescrTag);

var _MP4DecConfigDescrTag = __webpack_require__(106);

var _MP4DecConfigDescrTag2 = _interopRequireDefault(_MP4DecConfigDescrTag);

var _mp4a = __webpack_require__(107);

var _mp4a2 = _interopRequireDefault(_mp4a);

var _mfhd = __webpack_require__(108);

var _mfhd2 = _interopRequireDefault(_mfhd);

var _mdhd = __webpack_require__(109);

var _mdhd2 = _interopRequireDefault(_mdhd);

var _mdat = __webpack_require__(110);

var _mdat2 = _interopRequireDefault(_mdat);

var _iods = __webpack_require__(111);

var _iods2 = _interopRequireDefault(_iods);

var _hmhd = __webpack_require__(112);

var _hmhd2 = _interopRequireDefault(_hmhd);

var _hdlr = __webpack_require__(113);

var _hdlr2 = _interopRequireDefault(_hdlr);

var _ftyp = __webpack_require__(114);

var _ftyp2 = _interopRequireDefault(_ftyp);

var _esds = __webpack_require__(115);

var _esds2 = _interopRequireDefault(_esds);

var _elst = __webpack_require__(116);

var _elst2 = _interopRequireDefault(_elst);

var _dref = __webpack_require__(117);

var _dref2 = _interopRequireDefault(_dref);

var _ctts = __webpack_require__(118);

var _ctts2 = _interopRequireDefault(_ctts);

var _co = __webpack_require__(119);

var _co2 = _interopRequireDefault(_co);

var _btrt = __webpack_require__(120);

var _btrt2 = _interopRequireDefault(_btrt);

var _avcC = __webpack_require__(121);

var _avcC2 = _interopRequireDefault(_avcC);

var _avc = __webpack_require__(122);

var _avc2 = _interopRequireDefault(_avc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubBox = {};

function _buildTree(v, p, a) {
  var o = v;
  p.map(function (_, i) {
    o[_] = i == p.length - 1 ? a : o[_] || {};
    o = o[_];
  });
}

_buildTree(SubBox, ['box', 'avc1'], _avc2.default);

_buildTree(SubBox, ['box', 'avcC'], _avcC2.default);

_buildTree(SubBox, ['box', 'btrt'], _btrt2.default);

_buildTree(SubBox, ['box', 'co64'], _co2.default);

_buildTree(SubBox, ['box', 'ctts'], _ctts2.default);

_buildTree(SubBox, ['box', 'dref'], _dref2.default);

_buildTree(SubBox, ['box', 'elst'], _elst2.default);

_buildTree(SubBox, ['box', 'esds'], _esds2.default);

_buildTree(SubBox, ['box', 'ftyp'], _ftyp2.default);

_buildTree(SubBox, ['box', 'hdlr'], _hdlr2.default);

_buildTree(SubBox, ['box', 'hmhd'], _hmhd2.default);

_buildTree(SubBox, ['box', 'iods'], _iods2.default);

_buildTree(SubBox, ['box', 'mdat'], _mdat2.default);

_buildTree(SubBox, ['box', 'mdhd'], _mdhd2.default);

_buildTree(SubBox, ['box', 'mfhd'], _mfhd2.default);

_buildTree(SubBox, ['box', 'mp4a'], _mp4a2.default);

_buildTree(SubBox, ['box', 'MP4DecConfigDescrTag'], _MP4DecConfigDescrTag2.default);

_buildTree(SubBox, ['box', 'MP4DecSpecificDescrTag'], _MP4DecSpecificDescrTag2.default);

_buildTree(SubBox, ['box', 'MP4ESDescrTag'], _MP4ESDescrTag2.default);

_buildTree(SubBox, ['box', 'mvhd'], _mvhd2.default);

_buildTree(SubBox, ['box', 'nmhd'], _nmhd2.default);

_buildTree(SubBox, ['box', 'pasp'], _pasp2.default);

_buildTree(SubBox, ['box', 'sbgp'], _sbgp2.default);

_buildTree(SubBox, ['box', 'sdtp'], _sdtp2.default);

_buildTree(SubBox, ['box', 'SLConfigDescriptor'], _SLConfigDescriptor2.default);

_buildTree(SubBox, ['box', 'smhd'], _smhd2.default);

_buildTree(SubBox, ['box', 'stco'], _stco2.default);

_buildTree(SubBox, ['box', 'stsc'], _stsc2.default);

_buildTree(SubBox, ['box', 'stsd'], _stsd2.default);

_buildTree(SubBox, ['box', 'stsh'], _stsh2.default);

_buildTree(SubBox, ['box', 'stss'], _stss2.default);

_buildTree(SubBox, ['box', 'stsz'], _stsz2.default);

_buildTree(SubBox, ['box', 'stts'], _stts2.default);

_buildTree(SubBox, ['box', 'stz2'], _stz2.default);

_buildTree(SubBox, ['box', 'tfhd'], _tfhd2.default);

_buildTree(SubBox, ['box', 'tkhd'], _tkhd2.default);

_buildTree(SubBox, ['box', 'traf'], _traf2.default);

_buildTree(SubBox, ['box', 'trun'], _trun2.default);

_buildTree(SubBox, ['box', 'udta'], _udta2.default);

_buildTree(SubBox, ['box', 'url'], _url2.default);

_buildTree(SubBox, ['box', 'vmhd'], _vmhd2.default);

var Parse = function Parse(buffer) {
  _classCallCheck(this, Parse);

  this.buffer = null;
  this.boxes = [];
  this.nextBox = null;
  this.start = 0;
  var self = this;
  if (self.buffer) {
    (0, _concatTypedArray2.default)(Uint8Array, self.buffer, buffer);
  } else {
    self.buffer = buffer;
  }
  var bufferLength = buffer.byteLength;
  buffer.position = 0;
  var stream = new _stream2.default(buffer);
  while (bufferLength - stream.position >= 8) {
    var box = new _box2.default();
    box.readHeader(stream);
    if (box.size - 8 <= bufferLength - stream.position) {
      box.readBody(stream);
      self.boxes.push(box);
    } else {
      if (box.type === 'mdat') {
        box.readBody(stream);
        self.boxes.push(box);
      } else {
        self.nextBox = box;
        stream.position -= 8;
        break;
      }
    }
  }
  self.buffer = new Uint8Array(self.buffer.slice(stream.position));
};

exports.default = Parse;
module.exports = exports['default'];

/***/ }),
/* 80 */
/***/ (function(module) {

module.exports = {"name":"xgplayer-m4a","version":"1.1.3","description":"xgplayer plugin for m4a transform to fmp4","main":"./dist/index.js","scripts":{"prepare":"npm run build","build":"webpack --progress --display-chunks -p","watch":"webpack --progress --display-chunks -p --watch"},"repository":{"type":"git","url":"git@github.com:bytedance/xgplayer.git"},"babel":{"presets":["es2015"],"plugins":["add-module-exports","babel-plugin-bulk-import"]},"keywords":["mp4","fmp4","player","audio"],"author":"yinguohui@bytedance.com","license":"MIT","dependencies":{"babel-loader":"^7.1.4","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-bulk-import":"^1.0.2","babel-preset-es2015":"^6.24.1","concat-typed-array":"^1.0.2","deepmerge":"^2.0.1","event-emitter":"^0.3.5","import-local":"^2.0.0","json-loader":"^0.5.7","webpack":"^4.11.0"},"peerDependency":{"xgplayer":"^0.1.0"},"devDependencies":{"babel-core":"^6.26.3"}};

/***/ }),
/* 81 */
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.vmhd = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = [stream.readUint8(), stream.readUint8(), stream.readUint8()];
  this.graphicsmode = stream.readUint16();
  this.opcolor = [stream.readUint16(), stream.readUint16(), stream.readUint16()];
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default['url '] = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = [stream.readUint8(), stream.readUint8(), stream.readUint8()];
  var location = [];var length = stream.buffer.byteLength;
  while (stream.position < length) {
    location.push(stream.readUint8());
  }
  this.location = location;
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.udta = function () {
  delete this.subBox;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _date = __webpack_require__(16);

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.tkhd = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3, 0);
  if (this.version === 1) {
    this.create = stream.readUint64();
    this.modify = stream.readUint64();
    this.createTime = new _date2.default().setTime(this.create * 1000);
    this.modifyTime = new _date2.default().setTime(this.modify * 1000);
    this.trackID = stream.readUint32();
    this.reserverd = stream.readUint32();
    this.duration = stream.readUint64();
  } else {
    this.create = stream.readUint32();
    this.modify = stream.readUint32();
    this.createTime = new _date2.default().setTime(this.create * 1000);
    this.modifyTime = new _date2.default().setTime(this.modify * 1000);
    this.trackID = stream.readUint32();
    this.reserverd = stream.readUint32();
    this.duration = stream.readUint32();
  }
  stream.readUint64();
  this.layer = stream.readInt16();
  this.alternate_group = stream.readInt16();
  this.volume = stream.readInt16() >> 8;
  stream.readUint16();
  // 视频转换矩阵
  var matrix = [];
  for (var i = 0; i < 9; i++) {
    matrix.push(stream.readUint16() + '.' + stream.readUint16());
  }
  this.matrix = matrix;
  this.width = stream.readUint16() + '.' + stream.readUint16();
  this.height = stream.readUint16() + '.' + stream.readUint16();
  delete this.data;
  delete this.subBox;
  stream = null;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.stts = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  this.count = stream.readUint32();
  var entry = [];
  for (var i = 0, count = this.count; i < count; i++) {
    entry.push({
      sampleCount: stream.readUint32(),
      sampleDuration: stream.readUint32()
    });
  }
  this.entry = entry;
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.stsz = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  this.sampleSize = stream.readUint32();
  this.count = stream.readUint32();
  var entries = [];
  this.entries = entries;
  for (var i = 0, count = this.count; i < count; i++) {
    entries.push(stream.readUint32());
  }
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.stss = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  this.count = stream.readUint32();
  var entries = [];
  this.entries = entries;
  for (var i = 0, count = this.count; i < count; i++) {
    entries.push(stream.readUint32());
  }
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.stsd = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  this.entryCount = stream.readUint32();
  var box = new _box2.default();
  box.readHeader(stream);
  this.subBox.push(box);
  box.readBody(stream);
  delete this.data;
  stream = null;
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.stsc = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  this.count = stream.readUint32();
  var entries = [];
  this.entries = entries;
  for (var i = 0, count = this.count; i < count; i++) {
    entries.push({
      first_chunk: stream.readUint32(),
      samples_per_chunk: stream.readUint32(),
      sample_desc_index: stream.readUint32()
    });
  }
  for (var _i = 0, _count = this.count, entry, preEntry; _i < _count - 1; _i++) {
    entry = entries[_i];
    preEntry = entries[_i - 1];
    entry.chunk_count = entries[_i + 1].first_chunk - entry.first_chunk;
    entry.first_sample = _i === 0 ? 1 : preEntry.first_sample + preEntry.chunk_count * preEntry.samples_per_chunk;
  }
  if (this.count === 1) {
    var _entry = entries[0];
    _entry.first_sample = 1;
    _entry.chunk_count = 0;
  } else if (this.count > 1) {
    var last = entries[this.count - 1];var pre = entries[this.count - 2];
    last.first_sample = pre.first_sample + pre.chunk_count * pre.samples_per_chunk;
    last.chunk_count = 0;
  }
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.stco = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  this.count = stream.readUint32();
  var entries = [];
  this.entries = entries;
  for (var i = 0, count = this.count; i < count; i++) {
    entries.push(stream.readUint32());
  }
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.smhd = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  this.balance = stream.readInt8() + '.' + stream.readInt8();
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.SLConfigDescriptor = function (stream) {
  var box = new _box2.default();
  var size = void 0;
  box.type = stream.readUint8();
  size = stream.readUint8();
  if (size === 0x80) {
    box.extend = true;
    stream.skip(2);
    size = stream.readUint8() + 5;
  } else {
    size += 2;
  }
  box.size = size;
  box.SL = stream.readUint8();
  delete box.subBox;
  return box;
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.pasp = function () {
  var stream = new _stream2.default(this.data);
  this.content = stream.buffer.slice(0, this.size - 8);
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _date = __webpack_require__(16);

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.mvhd = function () {
  var stream = new _stream2.default(this.data);

  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  this.create = stream.readUint32();
  this.modify = stream.readUint32();
  this.createTime = new _date2.default().setTime(this.create * 1000);
  this.modifyTime = new _date2.default().setTime(this.modify * 1000);
  this.timeScale = stream.readUint32();
  this.duration = stream.readUint32();
  this.rate = stream.readUint16() + '.' + stream.readUint16();
  this.volume = stream.readUint8() + '.' + stream.readUint8();
  // 越过保留的10字节
  _stream2.default.readByte(stream.dataview, 8);
  _stream2.default.readByte(stream.dataview, 2);
  // 视频转换矩阵
  var matrix = [];
  for (var i = 0; i < 9; i++) {
    matrix.push(stream.readUint16() + '.' + stream.readUint16());
  }
  this.matrix = matrix;
  _stream2.default.readByte(stream.dataview, 24);
  this.nextTrackID = stream.readUint32();
  delete this.subBox;
  delete this.data;
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.MP4ESDescrTag = function (stream) {
  var box = new _box2.default();
  var size = void 0;
  box.type = stream.readUint8();
  size = stream.readUint8();
  if (size === 0x80) {
    box.extend = true;
    stream.skip(2);
    size = stream.readUint8() + 5;
  } else {
    size += 2;
  }
  box.size = size;
  box.esID = stream.readUint16();
  box.priority = stream.readUint8();
  box.subBox.push(_box2.default.MP4DecConfigDescrTag(stream));
  box.subBox.push(_box2.default.SLConfigDescriptor(stream));
  return box;
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.MP4DecSpecificDescrTag = function (stream) {
  var box = new _box2.default();
  var size = void 0,
      dataSize = void 0;
  box.type = stream.readUint8();
  size = stream.readUint8();
  if (size === 0x80) {
    box.extend = true;
    stream.skip(2);
    size = stream.readUint8() + 5;
    dataSize = size - 5;
  } else {
    dataSize = size;
    size += 2;
  }
  box.size = size;
  var EScode = [];
  for (var i = 0; i < dataSize; i++) {
    EScode.push(Number(stream.readUint8()).toString(16).padStart(2, '0'));
  }
  box.EScode = EScode;
  delete box.subBox;
  return box;
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.MP4DecConfigDescrTag = function (stream) {
  var box = new _box2.default();
  var size = void 0;
  box.type = stream.readUint8();
  size = stream.readUint8();
  if (size === 0x80) {
    box.extend = true;
    stream.skip(2);
    size = stream.readUint8() + 5;
  } else {
    size += 2;
  }
  box.size = size;
  box.typeID = stream.readUint8();
  // 6 bits stream type,1 bit upstream flag,1 bit reserved flag
  box.streamUint = stream.readUint8();
  box.bufferSize = _stream2.default.readByte(stream.dataview, 3);
  box.maximum = stream.readUint32();
  box.average = stream.readUint32();
  box.subBox.push(_box2.default.MP4DecSpecificDescrTag(stream));
  return box;
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.mp4a = function () {
  var stream = new _stream2.default(this.data);
  stream.skip(6);
  this.dataReferenceIndex = stream.readUint16();
  stream.skip(8);
  this.channelCount = stream.readUint16();
  this.sampleSize = stream.readUint16();
  stream.skip(4);
  this.sampleRate = stream.readUint32() / 65536;
  var box = new _box2.default();
  box.readHeader(stream);
  this.subBox.push(box);
  box.readBody(stream);
  delete this.data;
  stream = null;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

var _date = __webpack_require__(16);

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.mdhd = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  if (this.version === 1) {
    this.create = stream.readUint64();
    this.modify = stream.readUint64();
    this.createTime = new _date2.default().setTime(this.create * 1000);
    this.modifyTime = new _date2.default().setTime(this.modify * 1000);
    this.timescale = stream.readUint32();
    this.duration = stream.readUint64();
  } else {
    this.create = stream.readUint32();
    this.modify = stream.readUint32();
    this.createTime = new _date2.default().setTime(this.create * 1000);
    this.modifyTime = new _date2.default().setTime(this.modify * 1000);
    this.timescale = stream.readUint32();
    this.duration = stream.readUint32();
  }
  this.language = stream.readUint16();
  stream.readUint16();
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.mdat = function () {
  delete this.subBox;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.iods = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  var content = [];
  var length = stream.buffer.byteLength;
  while (stream.position < length) {
    content.push(stream.readUint8());
  }
  this.content = content;
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.hdlr = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  stream.skip(4);
  this.handleType = '' + String.fromCharCode(stream.readUint8()) + String.fromCharCode(stream.readUint8()) + String.fromCharCode(stream.readUint8()) + String.fromCharCode(stream.readUint8());
  stream.skip(12);
  var name = [];
  while (stream.position < this.size - 8) {
    name.push(String.fromCharCode(stream.readUint8()));
  }
  this.name = name.join('');
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.ftyp = function () {
  var stream = new _stream2.default(this.data);
  this.major_brand = String.fromCharCode(stream.readUint8(), stream.readUint8(), stream.readUint8(), stream.readUint8());
  this.minor_version = stream.readUint32();
  var compatibleBrands = [];
  for (var i = 0, len = Math.floor((stream.buffer.byteLength - 8) / 4); i < len; i++) {
    compatibleBrands.push(String.fromCharCode(stream.readUint8(), stream.readUint8(), stream.readUint8(), stream.readUint8()));
  }
  this.compatible_brands = compatibleBrands;
  stream = null;
  delete this.subBox;
  delete this.data;
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.esds = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  var box = _box2.default.MP4ESDescrTag(stream);
  this.subBox.push(box);
  delete this.data;
  stream = null;
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.elst = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  var entries = [];
  var entry_count = stream.readUint32();
  this.entries = entries;
  for (var i = 0; i < entry_count; i++) {
    var entry = {};
    entries.push(entry);
    if (this.version === 1) {
      entry.segment_duration = stream.readUint64();
      entry.media_time = stream.readUint64();
    } else {
      entry.segment_duration = stream.readUint32();
      entry.media_time = stream.readInt32();
    }
    entry.media_rate_integer = stream.readInt16();
    entry.media_rate_fraction = stream.readInt16();
  }
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.dref = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  var entryCount = stream.readUint32();
  this.entryCount = entryCount;
  var self = this;
  // 暂时不支持离散视频，视频的部分内容由url指定
  for (var i = 0; i < entryCount; i++) {
    var box = new _box2.default();
    self.subBox.push(box);
    box.read(stream);
  }
  delete this.data;
  stream = null;
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.ctts = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);

  this.entryCount = stream.readUint32();
  var entry = [];
  this.entry = entry;
  for (var i = 0, count = this.entryCount; i < count; i++) {
    entry.push({
      count: stream.readUint32(),
      offset: stream.readUint32()
    });
  }
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.co64 = function () {
  var stream = new _stream2.default(this.data);
  this.version = stream.readUint8();
  this.flag = _stream2.default.readByte(stream.dataview, 3);
  this.count = stream.readUint32();
  var entries = [];
  this.entries = entries;
  for (var i = 0, count = this.count; i < count; i++) {
    entries.push(stream.readUint64());
  }
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.btrt = function () {
  var stream = new _stream2.default(this.data);
  this.bufferSizeDB = stream.readUint32();
  this.maxBitrate = stream.readUint32();
  this.avgBitrate = stream.readUint32();
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.avcC = function () {
  var stream = new _stream2.default(this.data);
  this.configVersion = stream.readUint8();
  this.profile = stream.readUint8();
  this.profileCompatibility = stream.readUint8();
  this.AVCLevelIndication = stream.readUint8();
  this.lengthSizeMinusOne = (stream.readUint8() & 3) + 1;
  this.numOfSequenceParameterSets = stream.readUint8() & 31;
  var sequenceLength = stream.readUint16();
  this.sequenceLength = sequenceLength;
  var sequence = [];
  for (var i = 0; i < sequenceLength; i++) {
    sequence.push(Number(stream.readUint8()).toString(16));
  }
  this.ppsCount = stream.readUint8();
  var ppsLength = stream.readUint16();
  this.ppsLength = ppsLength;
  var pps = [];
  for (var _i = 0; _i < ppsLength; _i++) {
    pps.push(Number(stream.readUint8()).toString(16));
  }
  this.pps = pps;
  this.sequence = sequence;
  var last = [];var dataviewLength = stream.dataview.byteLength;
  while (stream.position < dataviewLength) {
    last.push(stream.readUint8());
  }
  this.last = last;
  delete this.subBox;
  delete this.data;
  stream = null;
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _box = __webpack_require__(0);

var _box2 = _interopRequireDefault(_box);

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_box2.default.avc1 = function () {
  var stream = new _stream2.default(this.data);
  var self = this;
  stream.skip(6);
  this.dataReferenceIndex = stream.readUint16();
  stream.skip(16);
  this.width = stream.readUint16();
  this.height = stream.readUint16();
  this.horizresolution = stream.readUint32();
  this.vertresolution = stream.readUint32();
  stream.skip(4);
  this.frameCount = stream.readUint16();
  stream.skip(1);
  for (var i = 0; i < 31; i++) {
    String.fromCharCode(stream.readUint8());
  }
  this.depth = stream.readUint16();
  stream.skip(2);
  while (stream.position < stream.buffer.byteLength) {
    var box = new _box2.default();
    box.readHeader(stream);
    self.subBox.push(box);
    box.readBody(stream);
  }
  delete this.data;
  stream = null;
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Download = function Download(filename, content) {
  _classCallCheck(this, Download);

  var aLink = document.createElement('a');
  var blob = new Blob([content]);
  var evt = document.createEvent('MouseEvents');
  evt.initEvent('click', false, false);
  aLink.download = filename;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(evt);
};

exports.default = Download;
module.exports = exports['default'];

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var util = {};

/**
 * [使用递归查询指定type的box]
 * var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
 * @param  {Object} root [JSON对象]
 * @param  {String} type [box的类型]
 * @return {Object}      [box]
 */
util.findBox = function (root, type) {
  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (root.type !== type) {
    if (root && root.subBox) {
      var box = root.subBox.filter(function (item) {
        return item.type === type;
      });
      if (box.length) {
        box.forEach(function (item) {
          return result.push(item);
        });
      } else {
        root.subBox.forEach(function (item) {
          return util.findBox(item, type, result);
        });
      }
    }
  } else {
    result.push(root);
  }
  result = [].concat(result);
  return result.length > 1 ? result : result[0];
};

util.padStart = function (str, length, pad) {
  var charstr = String(pad);var len = length >> 0;var maxlen = Math.ceil(len / charstr.length);
  var chars = [];var r = String(str);
  while (maxlen--) {
    chars.push(charstr);
  }
  return chars.join('').substring(0, len - r.length) + r;
};

/**
 * [十进制转十六进制]
 * @param  {Number} value [要转换的十进制数字]
 * @return {String}       [十六进制]
 */
util.toHex = function () {
  var hex = [];

  for (var _len = arguments.length, value = Array(_len), _key = 0; _key < _len; _key++) {
    value[_key] = arguments[_key];
  }

  value.forEach(function (item) {
    hex.push(util.padStart(Number(item).toString(16), 2, 0));
  });
  return hex;
};

/**
 * [求和计算]
 * @param  {[type]} rst [description]
 * @return {[type]}     [description]
 */
util.sum = function () {
  var count = 0;

  for (var _len2 = arguments.length, rst = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    rst[_key2] = arguments[_key2];
  }

  rst.forEach(function (item) {
    count += item;
  });
  return count;
};

/**
 * [计算音视频数据在Mdat中的偏移量]
 * @param  {Array} stsc         [块偏移量]
 * @param  {Number} sample_order [帧次序]
 * @return {Object}              [块的位置和当前帧的偏移数]
 */
util.stscOffset = function (stsc, sample_order) {
  var chunk_index = void 0;var samples_offset = '';
  var chunk_start = stsc.entries.filter(function (item) {
    return item.first_sample <= sample_order && sample_order < item.first_sample + item.chunk_count * item.samples_per_chunk;
  })[0];
  if (!chunk_start) {
    var last_chunk = stsc.entries.pop();
    stsc.entries.push(last_chunk);
    var chunk_offset = Math.floor((sample_order - last_chunk.first_sample) / last_chunk.samples_per_chunk);
    var last_chunk_index = last_chunk.first_chunk + chunk_offset;
    var last_chunk_first_sample = last_chunk.first_sample + last_chunk.samples_per_chunk * chunk_offset;
    return {
      chunk_index: last_chunk_index,
      samples_offset: [last_chunk_first_sample, sample_order]
    };
  } else {
    var _chunk_offset = Math.floor((sample_order - chunk_start.first_sample) / chunk_start.samples_per_chunk);
    var chunk_offset_sample = chunk_start.first_sample + _chunk_offset * chunk_start.samples_per_chunk;
    chunk_index = chunk_start.first_chunk + _chunk_offset;
    samples_offset = [chunk_offset_sample, sample_order];
    return {
      chunk_index: chunk_index,
      samples_offset: samples_offset
    };
  }
};

util.seekSampleOffset = function (stsc, stco, stsz, order, mdatStart) {
  var chunkOffset = util.stscOffset(stsc, order + 1);
  var result = stco.entries[chunkOffset.chunk_index - 1] + util.sum.apply(null, stsz.entries.slice(chunkOffset.samples_offset[0] - 1, chunkOffset.samples_offset[1] - 1)) - mdatStart;
  if (result === undefined) {
    throw 'result=' + result + ',stco.length=' + stco.entries.length + ',sum=' + util.sum.apply(null, stsz.entries.slice(0, order));
  } else if (result < 0) {
    throw 'result=' + result + ',stco.length=' + stco.entries.length + ',sum=' + util.sum.apply(null, stsz.entries.slice(0, order));
  }
  return result;
};

util.seekSampleTime = function (stts, ctts, order) {
  var time = void 0;var duration = void 0;var count = 0;var startTime = 0;var offset = 0;
  stts.entry.every(function (item) {
    duration = item.sampleDuration;
    if (order < count + item.sampleCount) {
      time = startTime + (order - count) * item.sampleDuration;
      return false;
    } else {
      count += item.sampleCount;
      startTime += item.sampleCount * duration;
      return true;
    }
  });
  if (ctts) {
    var ct = 0;
    ctts.entry.every(function (item) {
      ct += item.count;
      if (order < ct) {
        offset = item.offset;
        return false;
      } else {
        return true;
      }
    });
  }
  if (!time) {
    time = startTime + (order - count) * duration;
  }
  return { time: time, duration: duration, offset: offset };
};

util.seekOrderSampleByTime = function (stts, timeScale, time) {
  var startTime = 0;var order = 0;var count = 0;var itemDuration = void 0;var sampleDuration = void 0;
  stts.every(function (item, idx) {
    itemDuration = item.sampleCount * item.sampleDuration / timeScale;
    if (time <= startTime + itemDuration) {
      order = count + Math.ceil((time - startTime) * timeScale / item.sampleDuration);
      startTime = startTime + Math.ceil((time - startTime) * timeScale / item.sampleDuration) * item.sampleDuration / timeScale;
      sampleDuration = item.sampleCount;
      return false;
    } else {
      startTime += itemDuration;
      count += item.sampleCount;
      return true;
    }
  });
  return { order: order, startTime: startTime, sampleDuration: sampleDuration };
};

util.sampleCount = function (stts) {
  var count = 0;
  stts.forEach(function (item, idx) {
    count += item.sampleCount;
  });
  return count;
};

util.seekTrakDuration = function (trak, timeScale) {
  var stts = util.findBox(trak, 'stts');var duration = 0;
  stts.entry.forEach(function (item) {
    duration += item.sampleCount * item.sampleDuration;
  });
  return Number(duration / timeScale).toFixed(4);
};

exports.default = util;
module.exports = exports['default'];

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(14);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _error = __webpack_require__(7);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MSE = function () {
  function MSE() {
    var codecs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'audio/mp4; codecs="mp4a.40.5"';

    _classCallCheck(this, MSE);

    var self = this;
    (0, _eventEmitter2.default)(this);
    this.codecs = codecs;
    this.replaying = false;
    this.mediaSource = new window.MediaSource();
    this.url = window.URL.createObjectURL(this.mediaSource);
    this.queue = [];
    this.updating = false;
    this.mediaSource.addEventListener('sourceopen', function () {
      self.sourceBuffer = self.mediaSource.addSourceBuffer(self.codecs);
      self.sourceBuffer.addEventListener('error', function (e) {
        self.emit('error', new _error2.default('mse', '', { line: 16, handle: '[MSE] constructor sourceopen', msg: e.message }));
      });
      self.sourceBuffer.addEventListener('updateend', function (e) {
        self.emit('updateend');
        var buffer = self.queue.shift();
        if (buffer) {
          self.sourceBuffer.appendBuffer(buffer);
        }
      });
      self.emit('sourceopen');
    });
    this.mediaSource.addEventListener('sourceclose', function () {
      self.emit('sourceclose');
    });
  }

  _createClass(MSE, [{
    key: 'appendBuffer',
    value: function appendBuffer(buffer) {
      var sourceBuffer = this.sourceBuffer;
      if (sourceBuffer.updating === false && this.state === 'open') {
        sourceBuffer.appendBuffer(buffer);
        return true;
      } else {
        this.queue.push(buffer);
        return false;
      }
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
      if (this.replaying) {
        return 'open';
      } else {
        return this.mediaSource.readyState;
      }
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
module.exports = exports['default'];

/***/ })
/******/ ]);
});