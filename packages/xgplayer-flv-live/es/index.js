import Player from 'xgplayer';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.10' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () {
      return 7;
    } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () {
      return 7;
    } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _library = false;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core.inspectSource = function (it) {
  return _functionToString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
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

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var TYPED = _uid('typed_array');
var VIEW = _uid('view');
var ABV = !!(_global.ArrayBuffer && _global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

while (i < l) {
  if (Typed = _global[TypedArrayConstructors[i++]]) {
    _hide(Typed.prototype, TYPED, true);
    _hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

var _typed = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

var _redefineAll = function (target, src, safe) {
  for (var key in src) _redefine(target, key, src[key], safe);
  return target;
};

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

// https://tc39.github.io/ecma262/#sec-toindex


var _toIndex = function (it) {
  if (it === undefined) return 0;
  var number = _toInteger(it);
  var length = _toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    }return !IS_INCLUDES && -1;
  };
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$1
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

var _arrayFill = function fill(value /* , start = 0, end = @length */) {
  var O = _toObject(this);
  var length = _toLength(O.length);
  var aLen = arguments.length;
  var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var _typedBuffer = createCommonjsModule(function (module, exports) {












var gOPN = _objectGopn.f;
var dP = _objectDp.f;


var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = _global[ARRAY_BUFFER];
var $DataView = _global[DATA_VIEW];
var Math = _global.Math;
var RangeError = _global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = _global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = _descriptors ? '_b' : BUFFER;
var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  }return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () {
      return this[internal];
    } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = _toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = _toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!_typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = _toIndex(length);
    this._b = _arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    _anInstance(this, $DataView, DATA_VIEW);
    _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = _toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (_descriptors) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  _redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!_fails(function () {
    $ArrayBuffer(1);
  }) || !_fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || _fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      _anInstance(this, $ArrayBuffer);
      return new BaseBuffer(_toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
_setToStringTag($ArrayBuffer, ARRAY_BUFFER);
_setToStringTag($DataView, DATA_VIEW);
_hide($DataView[PROTOTYPE], _typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES = _wks('species');
var _speciesConstructor = function (O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

var SPECIES$1 = _wks('species');

var _setSpecies = function (KEY) {
  var C = _global[KEY];
  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function () {
      return this;
    }
  });
};

var ArrayBuffer$1 = _global.ArrayBuffer;

var $ArrayBuffer = _typedBuffer.ArrayBuffer;
var $DataView = _typedBuffer.DataView;
var $isView = _typed.ABV && ArrayBuffer$1.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW$1 = _typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

_export(_export.G + _export.W + _export.F * (ArrayBuffer$1 !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

_export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
  }
});

_export(_export.P + _export.U + _export.F * _fails(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix
    var len = _anObject(this).byteLength;
    var first = _toAbsoluteIndex(start, len);
    var fin = _toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    }return result;
  }
});

_setSpecies(ARRAY_BUFFER);

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
  // builtinTag case
  : ARG ? _cof(O)
  // ES3 arguments fallback
  : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var _iterators = {};

// check on default Array iterator

var ITERATOR = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR] === it);
};

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () {/* empty */};
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

var ITERATOR$1 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || _iterators[_classof(it)];
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var SPECIES$2 = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES$2];
      if (C === null) C = undefined;
    }
  }return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (; length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res; // map
        else if (res) switch (TYPE) {
            case 3:
              return true; // some
            case 5:
              return val; // find
            case 6:
              return index; // findIndex
            case 2:
              result.push(val); // filter
          } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto$1 = Array.prototype;
if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto$1[UNSCOPABLES][key] = true;
};

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () {
  return this;
});

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR$2 = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () {
  return this;
};

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR$2] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if ( typeof IteratorPrototype[ITERATOR$2] != 'function') _hide(IteratorPrototype, ITERATOR$2, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if ( (BUGGY || VALUES_BUG || !proto[ITERATOR$2])) {
    _hide(proto, ITERATOR$2, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR$3] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

var _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = _toObject(this);
  var len = _toLength(O.length);
  var to = _toAbsoluteIndex(target, len);
  var from = _toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];else delete O[to];
    to += inc;
    from += inc;
  }return O;
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$3 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) {/* empty */}
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$3
};

var _typedArray = createCommonjsModule(function (module) {

if (_descriptors) {
  var LIBRARY = _library;
  var global = _global;
  var fails = _fails;
  var $export = _export;
  var $typed = _typed;
  var $buffer = _typedBuffer;
  var ctx = _ctx;
  var anInstance = _anInstance;
  var propertyDesc = _propertyDesc;
  var hide = _hide;
  var redefineAll = _redefineAll;
  var toInteger = _toInteger;
  var toLength = _toLength;
  var toIndex = _toIndex;
  var toAbsoluteIndex = _toAbsoluteIndex;
  var toPrimitive = _toPrimitive;
  var has = _has;
  var classof = _classof;
  var isObject = _isObject;
  var toObject = _toObject;
  var isArrayIter = _isArrayIter;
  var create = _objectCreate;
  var getPrototypeOf = _objectGpo;
  var gOPN = _objectGopn.f;
  var getIterFn = core_getIteratorMethod;
  var uid = _uid;
  var wks = _wks;
  var createArrayMethod = _arrayMethods;
  var createArrayIncludes = _arrayIncludes;
  var speciesConstructor = _speciesConstructor;
  var ArrayIterators = es6_array_iterator;
  var Iterators = _iterators;
  var $iterDetect = _iterDetect;
  var setSpecies = _setSpecies;
  var arrayFill = _arrayFill;
  var arrayCopyWithin = _arrayCopyWithin;
  var $DP = _objectDp;
  var $GOPD = _objectGopd;
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    }return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () {
        return this._d[internal];
      } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      }O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of() /* ...items */{
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
    arrayToLocaleString.call(new Uint8Array(1));
  });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) {
      // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) {
      // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) {
      // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) {
      // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) {
      // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      }return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target) && target[TYPED_ARRAY] && typeof key != 'symbol' && key in target && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
      target[key] = desc.value;
      return target;
    }return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () {
    arrayToString.call({});
  })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () {/* noop */},
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () {
      return this[TYPED_ARRAY];
    }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () {
          return NAME;
        }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () {
      Base.of.call(TypedArray, 1);
    }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () {/* empty */};
});

_typedArray('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

_typedArray('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () {
    return iterable;
  } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
      i: 'O' + ++id, // object ID
      w: {} // weak collections IDs
    } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
    // return object ID
  }return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
    // return hash weak collections IDs
  }return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var _validateCollection = function (it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$1 = _objectDp.f;









var fastKey = _meta.fastKey;

var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined; // first entry
      that._l = undefined; // last entry
      that[SIZE] = 0; // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$1(C.prototype, 'size', {
      get: function () {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
      // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key, // <- key
        v: value, // <- value
        p: prev = that._l, // <- previous entry
        n: undefined, // <- next entry
        r: false // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    }return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target
      this._k = kind; // kind
      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      }
      // return step by kind
      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }
    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};

var setPrototypeOf = _setProto.set;
var _inheritIfRequired = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  }return that;
};

var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    _redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);return this;
    });
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = _fails(function () {
      instance.has(1);
    });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = _iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        _anInstance(target, C, NAME);
        var that = _inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = _collection(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

var SET = 'Set';

// 23.2 Set Objects
var es6_set = _collection(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
  }
}, _collectionStrong);

var f$4 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$4
};

// 19.1.2.1 Object.assign(target, source, ...)







var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
    }
  }return T;
} : $assign;

var getWeak = _meta.getWeak;







var arrayFind = _arrayMethods(5);
var arrayFindIndex = _arrayMethods(6);
var id$1 = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

var _collectionWeak = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = id$1++; // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!_isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
        return data && _has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!_isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
        return data && _has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(_anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

var es6_weakMap = createCommonjsModule(function (module) {


var each = _arrayMethods(0);






var NATIVE_WEAK_MAP = _validateCollection;
var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
var WEAK_MAP = 'WeakMap';
var getWeak = _meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = _collectionWeak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (_isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
  _objectAssign(InternalMap.prototype, methods);
  _meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    _redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (_isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
        // store all the rest on native weakmap
      }return method.call(this, a, b);
    });
  });
}
});

var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
_collection(WEAK_SET, function (get) {
  return function WeakSet() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
  }
}, _collectionWeak, false, true);

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)



var rApply = (_global.Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
_export(_export.S + _export.F * !_fails(function () {
  rApply(function () {/* empty */});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = _aFunction(target);
    var L = _anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
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

var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }return factories[len](F, args);
};

var _bind = Function.bind || function bind(that /* , ...args */) {
  var fn = _aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function () /* args... */{
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
  };
  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







var rConstruct = (_global.Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = _fails(function () {
  function F() {/* empty */}
  return !(rConstruct(function () {/* empty */}, [], F) instanceof F);
});
var ARGS_BUG = !_fails(function () {
  rConstruct(function () {/* empty */});
});

_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    _aFunction(Target);
    _anObject(args);
    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();
        case 1:
          return new Target(args[0]);
        case 2:
          return new Target(args[0], args[1]);
        case 3:
          return new Target(args[0], args[1], args[2]);
        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (_bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return _isObject(result) ? result : instance;
  }
});

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)





// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
_export(_export.S + _export.F * _fails(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(_objectDp.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    _anObject(target);
    propertyKey = _toPrimitive(propertyKey, true);
    _anObject(attributes);
    try {
      _objectDp.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

// 26.1.4 Reflect.deleteProperty(target, propertyKey)

var gOPD$1 = _objectGopd.f;


_export(_export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD$1(_anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

// 26.1.6 Reflect.get(target, propertyKey [, receiver])







function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (_anObject(target) === receiver) return target[propertyKey];
  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
}

_export(_export.S, 'Reflect', { get: get });

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)




_export(_export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return _objectGopd.f(_anObject(target), propertyKey);
  }
});

// 26.1.8 Reflect.getPrototypeOf(target)




_export(_export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return _objectGpo(_anObject(target));
  }
});

// 26.1.9 Reflect.has(target, propertyKey)


_export(_export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

// 26.1.10 Reflect.isExtensible(target)


var $isExtensible = Object.isExtensible;

_export(_export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    _anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

// all object keys, includes non-enumerable and symbols



var Reflect$1 = _global.Reflect;
var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
  var keys = _objectGopn.f(_anObject(it));
  var getSymbols = _objectGops.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

// 26.1.11 Reflect.ownKeys(target)


_export(_export.S, 'Reflect', { ownKeys: _ownKeys });

// 26.1.12 Reflect.preventExtensions(target)


var $preventExtensions = Object.preventExtensions;

_export(_export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    _anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])









function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = _objectGopd.f(_anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (_isObject(proto = _objectGpo(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = _propertyDesc(0);
  }
  if (_has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !_isObject(receiver)) return false;
    if (existingDescriptor = _objectGopd.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      _objectDp.f(receiver, propertyKey, existingDescriptor);
    } else _objectDp.f(receiver, propertyKey, _propertyDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

_export(_export.S, 'Reflect', { set: set });

// 26.1.14 Reflect.setPrototypeOf(target, proto)



if (_setProto) _export(_export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    _setProto.check(target, proto);
    try {
      _setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

var process = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process) == 'process') {
    defer = function (id) {
      process.nextTick(_ctx(run, id, 1));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(_ctx(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
    defer = function (id) {
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function (id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};

var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$1 = _global.process;
var Promise$1 = _global.Promise;
var isNode = _cof(process$1) == 'process';

var _microtask = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process$1.domain)) parent.exit();
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
    notify = function () {
      process$1.nextTick(flush);
    };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise$1.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
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

// 25.4.1.5 NewPromiseCapability(C)



function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

var f$5 = function (C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
	f: f$5
};

var _perform = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

var navigator$1 = _global.navigator;

var _userAgent = navigator$1 && navigator$1.userAgent || '';

var _promiseResolve = function (C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var task = _task.set;
var microtask = _microtask();




var PROMISE = 'Promise';
var TypeError$1 = _global.TypeError;
var process$2 = _global.process;
var versions = process$2 && process$2.versions;
var v8 = versions && versions.v8 || '';
var $Promise = _global[PROMISE];
var isNode$1 = _classof(process$2) == 'process';
var empty = function () {/* empty */};
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise
    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0 && _userAgent.indexOf('Chrome/66') === -1;
  } catch (e) {/* empty */}
}();

// helpers
var isThenable = function (it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
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
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(_global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = _perform(function () {
        if (isNode$1) {
          process$2.emit('unhandledRejection', value, promise);
        } else if (handler = _global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = _global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    }promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(_global, function () {
    var handler;
    if (isNode$1) {
      process$2.emit('rejectionHandled', promise);
    } else if (handler = _global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
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
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
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
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode$1 ? process$2.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * ( !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve( this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = _perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      _forOf(iterable, false, function (promise) {
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
    var result = _perform(function () {
      _forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

var f$6 = _wks;

var _wksExt = {
	f: f$6
};

var defineProperty = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol =  _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  }return result;
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$7 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
	f: f$7
};

// ECMAScript 6 symbols shim






var META = _meta.KEY;





















var gOPD$2 = _objectGopd.f;
var dP$2 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE$1 = typeof $Symbol == 'function' && !!_objectGops.f;
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$2({}, 'a', {
    get: function () {
      return dP$2(this, 'a', { value: 7 }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$2(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$2(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$2(ObjectProto$1, key, protoDesc);
} : dP$2;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$2(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    }return setSymbolDesc(it, key, D);
  }return dP$2(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$2(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  }return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  }return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE$1) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

for (var es6Symbols =
// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) _wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () {
    setter = true;
  },
  useSimple: function () {
    setter = false;
  }
});

_export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = _fails(function () {
  _objectGops.f(1);
});

_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return _objectGops.f(_toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () {
    fn(1);
  }), 'Object', exp);
};

// 19.1.2.5 Object.freeze(O)

var meta = _meta.onFreeze;

_objectSap('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
  };
});

// 19.1.2.17 Object.seal(O)

var meta$1 = _meta.onFreeze;

_objectSap('seal', function ($seal) {
  return function seal(it) {
    return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
  };
});

// 19.1.2.15 Object.preventExtensions(O)

var meta$2 = _meta.onFreeze;

_objectSap('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
  };
});

// 19.1.2.12 Object.isFrozen(O)


_objectSap('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

// 19.1.2.13 Object.isSealed(O)


_objectSap('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

// 19.1.2.11 Object.isExtensible(O)


_objectSap('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

var $getOwnPropertyDescriptor$1 = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
  };
});

// 19.1.2.9 Object.getPrototypeOf(O)



_objectSap('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

// 19.1.2.7 Object.getOwnPropertyNames(O)
_objectSap('getOwnPropertyNames', function () {
  return _objectGopnExt.f;
});

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

// 7.2.9 SameValue(x, y)
var _sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

// 19.1.3.10 Object.is(value1, value2)

_export(_export.S, 'Object', { is: _sameValue });

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var dP$3 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || _descriptors && dP$3(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

_export(_export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = _toIobject(callSite.raw);
    var len = _toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    }return res.join('');
  }
});

var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) {
    // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
    }return res.join('');
  }
});

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var $at = _stringAt(false);
_export(_export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

var _stringRepeat = function repeat(count) {
  var str = String(_defined(this));
  var res = '';
  var n = _toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

_export(_export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: _stringRepeat
});

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) {/* empty */}
  }return true;
};

var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = _stringContext(this, searchString, STARTS_WITH);
    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});

var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

_export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = _stringContext(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = _toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
  }
});

var INCLUDES = 'includes';

_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~_stringContext(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// 21.2.5.3 get RegExp.prototype.flags


var _flags = function () {
  var that = _anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

// 21.2.5.3 get RegExp.prototype.flags()
if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _flags
});

var at = _stringAt(true);

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
var _advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

var builtinExec = RegExp.prototype.exec;

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var _regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (_classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
}();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var _regexpExec = patchedExec;

_export({
  target: 'RegExp',
  proto: true,
  forced: _regexpExec !== /./.exec
}, {
  exec: _regexpExec
});

var SPECIES$3 = _wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () {
    return originalExec.apply(this, arguments);
  };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
}();

var _fixReWks = function (KEY, length, exec) {
  var SYMBOL = _wks(KEY);

  var DELEGATES_TO_SYMBOL = !_fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () {
      return 7;
    };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () {
      execCalled = true;return null;
    };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$3] = function () {
        return re;
      };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(_defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === _regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var strfn = fns[0];
    var rxfn = fns[1];

    _redefine(String.prototype, KEY, strfn);
    _hide(RegExp.prototype, SYMBOL, length == 2
    // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return rxfn.call(string, this, arg);
    }
    // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return rxfn.call(string, this);
    });
  }
};

// @@match logic
_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
  // `String.prototype.match` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  },
  // `RegExp.prototype[@@match]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative($match, regexp, this);
    if (res.done) return res.value;
    var rx = _anObject(regexp);
    var S = String(this);
    if (!rx.global) return _regexpExecAbstract(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;
    while ((result = _regexpExecAbstract(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
      n++;
    }
    return n === 0 ? null : A;
  }];
});

var max$1 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
  // `String.prototype.replace` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
  },
  // `RegExp.prototype[@@replace]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    var res = maybeCallNative($replace, regexp, this, replaceValue);
    if (res.done) return res.value;

    var rx = _anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;
    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }
    var results = [];
    while (true) {
      var result = _regexpExecAbstract(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
    }
    var accumulatedResult = '';
    var nextSourcePosition = 0;
    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max$1(min$2(_toInteger(result.index), S.length), 0);
      var captures = [];
      // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
      var namedCaptures = result.groups;
      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }
      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }
    return accumulatedResult + S.slice(nextSourcePosition);
  }];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = _toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$':
          return '$';
        case '&':
          return matched;
        case '`':
          return str.slice(0, position);
        case "'":
          return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX$1 = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !_fails(function () {
  RegExp(MAX_UINT32, 'y');
});

// @@split logic
_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = _regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX$1];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
    // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
  // `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = defined(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  },
  // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
    if (res.done) return res.value;

    var rx = _anObject(regexp);
    var S = String(this);
    var C = _speciesConstructor(rx, RegExp);

    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g');

    // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.
    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];
    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;
      var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
      var e;
      if (z === null || (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = _advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;
        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }
        q = p = e;
      }
    }
    A.push(S.slice(p));
    return A;
  }];
});

// @@search logic
_fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
  // `String.prototype.search` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.search
  function search(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  },
  // `RegExp.prototype[@@search]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
  function (regexp) {
    var res = maybeCallNative($search, regexp, this);
    if (res.done) return res.value;
    var rx = _anObject(regexp);
    var S = String(this);
    var previousLastIndex = rx.lastIndex;
    if (!_sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
    var result = _regexpExecAbstract(rx, S);
    if (!_sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
    return result === null ? -1 : result.index;
  }];
});

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else object[index] = value;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) {
  Array.from(iter);
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

// WebKit Array.of isn't generic
_export(_export.S + _export.F * _fails(function () {
  function F() {/* empty */}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of() /* ...args */{
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) _createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


_export(_export.P, 'Array', { copyWithin: _arrayCopyWithin });

_addToUnscopables('copyWithin');

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)


var $find = _arrayMethods(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
_export(_export.P + _export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)


var $find$1 = _arrayMethods(6);
var KEY$1 = 'findIndex';
var forced$1 = true;
// Shouldn't skip holes
if (KEY$1 in []) Array(1)[KEY$1](function () {
  forced$1 = false;
});
_export(_export.P + _export.F * forced$1, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY$1);

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


_export(_export.P, 'Array', { fill: _arrayFill });

_addToUnscopables('fill');

// 20.1.2.2 Number.isFinite(number)

var _isFinite = _global.isFinite;

_export(_export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

// 20.1.2.3 Number.isInteger(number)

var floor$2 = Math.floor;
var _isInteger = function isInteger(it) {
  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
};

// 20.1.2.3 Number.isInteger(number)


_export(_export.S, 'Number', { isInteger: _isInteger });

// 20.1.2.5 Number.isSafeInteger(number)


var abs = Math.abs;

_export(_export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

// 20.1.2.4 Number.isNaN(number)


_export(_export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

// 20.1.2.1 Number.EPSILON


_export(_export.S, 'Number', { EPSILON: Math.pow(2, -52) });

// 20.1.2.10 Number.MIN_SAFE_INTEGER


_export(_export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

// 20.1.2.6 Number.MAX_SAFE_INTEGER


_export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

// 20.2.2.20 Math.log1p(x)
var _mathLog1p = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

// 20.2.2.3 Math.acosh(x)


var sqrt = Math.sqrt;
var $acosh = Math.acosh;

_export(_export.S + _export.F * !($acosh
// V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
&& Math.floor($acosh(Number.MAX_VALUE)) == 710
// Tor Browser bug: Math.acosh(Infinity) -> NaN
&& $acosh(Infinity) == Infinity), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

// 20.2.2.5 Math.asinh(x)

var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
_export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

// 20.2.2.7 Math.atanh(x)

var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
_export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

// 20.2.2.28 Math.sign(x)
var _mathSign = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

// 20.2.2.9 Math.cbrt(x)



_export(_export.S, 'Math', {
  cbrt: function cbrt(x) {
    return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

// 20.2.2.11 Math.clz32(x)


_export(_export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

// 20.2.2.12 Math.cosh(x)

var exp = Math.exp;

_export(_export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
var _mathExpm1 = !$expm1
// Old FF bug
|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
// Tor Browser bug
|| $expm1(-2e-17) != -2e-17 ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

// 20.2.2.14 Math.expm1(x)



_export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', { expm1: _mathExpm1 });

// 20.2.2.16 Math.fround(x)

var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

var _mathFround = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = _mathSign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

// 20.2.2.16 Math.fround(x)


_export(_export.S, 'Math', { fround: _mathFround });

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])

var abs$1 = Math.abs;

_export(_export.S, 'Math', {
  hypot: function hypot(value1, value2) {
    // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs$1(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

// 20.2.2.18 Math.imul(x, y)

var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
_export(_export.S + _export.F * _fails(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

// 20.2.2.20 Math.log1p(x)


_export(_export.S, 'Math', { log1p: _mathLog1p });

// 20.2.2.21 Math.log10(x)


_export(_export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

// 20.2.2.22 Math.log2(x)


_export(_export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

// 20.2.2.28 Math.sign(x)


_export(_export.S, 'Math', { sign: _mathSign });

// 20.2.2.30 Math.sinh(x)


var exp$1 = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
_export(_export.S + _export.F * _fails(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1 ? (_mathExpm1(x) - _mathExpm1(-x)) / 2 : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
  }
});

// 20.2.2.33 Math.tanh(x)


var exp$2 = Math.exp;

_export(_export.S, 'Math', {
  tanh: function tanh(x) {
    var a = _mathExpm1(x = +x);
    var b = _mathExpm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
  }
});

// 20.2.2.34 Math.trunc(x)


_export(_export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

// https://github.com/tc39/Array.prototype.includes


var $includes = _arrayIncludes(true);

_export(_export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes');

var isEnum$1 = _objectPie.f;
var _objectToArray = function (isEntries) {
  return function (it) {
    var O = _toIobject(it);
    var keys = _objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!_descriptors || isEnum$1.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

// https://github.com/tc39/proposal-object-values-entries

var $values = _objectToArray(false);

_export(_export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

// https://github.com/tc39/proposal-object-values-entries

var $entries = _objectToArray(true);

_export(_export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

// https://github.com/tc39/proposal-object-getownpropertydescriptors






_export(_export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = _toIobject(object);
    var getDesc = _objectGopd.f;
    var keys = _ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) _createProperty(result, key, desc);
    }
    return result;
  }
});

// https://github.com/tc39/proposal-string-pad-start-end




var _stringPad = function (that, maxLength, fillString, left) {
  var S = String(_defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = _toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

// https://github.com/tc39/proposal-string-pad-start-end





// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

_export(_export.P + _export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

// https://github.com/tc39/proposal-string-pad-start-end





// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

_export(_export.P + _export.F * WEBKIT_BUG$1, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

// ie9- setTimeout & setInterval additional parameters fix



var slice = [].slice;
var MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check
var wrap$1 = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
_export(_export.G + _export.B + _export.F * MSIE, {
  setTimeout: wrap$1(_global.setTimeout),
  setInterval: wrap$1(_global.setInterval)
});

_export(_export.G + _export.B, {
  setImmediate: _task.set,
  clearImmediate: _task.clear
});

var ITERATOR$4 = _wks('iterator');
var TO_STRING_TAG = _wks('toStringTag');
var ArrayValues = _iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i$1 = 0; i$1 < collections.length; i$1++) {
  var NAME$1 = collections[i$1];
  var explicit = DOMIterables[NAME$1];
  var Collection = _global[NAME$1];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR$4]) _hide(proto, ITERATOR$4, ArrayValues);
    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME$1);
    _iterators[NAME$1] = ArrayValues;
    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
  }
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!function (global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime =  module.exports ;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function () {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };
}(
// In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function () {
  return this;
}() || Function("return this")());
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

var isObjectFilled = function isObjectFilled(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null) {
        return false;
      }
    }
  }
  return true;
};

var MediaInfo = function () {
  function MediaInfo() {
    _classCallCheck(this, MediaInfo);

    this.mimeType = null;
    this.duration = null;

    this.hasVideo = null;
    this.video = {
      codec: null,
      width: null,
      height: null,
      profile: null,
      level: null,
      frameRate: {
        fixed: true,
        fps: 25,
        fps_num: 25000,
        fps_den: 1000
      },
      chromaFormat: null,
      parRatio: {
        width: 1,
        height: 1
      }
    };

    this.hasAudio = null;

    this.audio = {
      codec: null,
      sampleRate: null,
      sampleRateIndex: null,
      channelCount: null
    };
  }

  _createClass(MediaInfo, [{
    key: "isComplete",
    value: function isComplete() {
      return MediaInfo.isBaseInfoReady(this) && MediaInfo.isVideoReady(this) && MediaInfo.isAudioReady(this);
    }
  }], [{
    key: "isBaseInfoReady",
    value: function isBaseInfoReady(mediaInfo) {
      return isObjectFilled(mediaInfo);
    }
  }, {
    key: "isVideoReady",
    value: function isVideoReady(mediaInfo) {
      if (!mediaInfo.hasVideo) {
        return true;
      }

      return isObjectFilled(mediaInfo.video);
    }
  }, {
    key: "isAudioReady",
    value: function isAudioReady(mediaInfo) {
      if (!mediaInfo.hasAudio) {
        return true;
      }

      return isObjectFilled(mediaInfo.video);
    }
  }]);

  return MediaInfo;
}();

var domain;

// This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).
function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

function EventEmitter() {
  EventEmitter.init.call(this);
}

// nodejs oddity
// require('events') === require('events').EventEmitter
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function () {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    if (domain.active && !(this instanceof domain.Domain)) ;
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn) handler.call(self);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn) handler.call(self, arg1);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn) handler.call(self, arg1, arg2);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn) handler.call(self, arg1, arg2, arg3);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn) handler.apply(self, args);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = type === 'error';

  events = this._events;
  if (events) doError = doError && events.error == null;else if (!doError) return false;

  domain = this.domain;

  // If there is no 'error' event listener then throw.
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er) er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler) return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++) args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }

  return target;
}
function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;

  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');

  events = this._events;
  if (!events) return this;

  list = events[type];
  if (!list) return this;

  if (list === listener || list.listener && list.listener === listener) {
    if (--this._eventsCount === 0) this._events = new EventHandlers();else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list[0] = undefined;
      if (--this._eventsCount === 0) {
        this._events = new EventHandlers();
        return this;
      } else {
        delete events[type];
      }
    } else {
      spliceOne(list, position);
    }

    if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events;

  events = this._events;
  if (!events) return this;

  // not listening for removeListener, no need to emit
  if (!events.removeListener) {
    if (arguments.length === 0) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    } else if (events[type]) {
      if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    for (var i = 0, key; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = new EventHandlers();
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    do {
      this.removeListener(type, listeners[listeners.length - 1]);
    } while (listeners[0]);
  }

  return this;
};

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events) ret = [];else {
    evlistener = events[type];
    if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];
  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--) copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get$1 = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

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

var _createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var DIRECT_EMIT_FLAG = '__TO__';

var Context = function () {
  function Context() {
    var allowedEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck$1(this, Context);

    this._emitter = new EventEmitter();
    this._instanceMap = {}; // 所有的解码流程实例
    this._clsMap = {}; // 构造函数的map
    this._inited = false;
    this.mediaInfo = new MediaInfo();
    this.allowedEvents = allowedEvents;
    this._hooks = {}; // 注册在事件前/后的钩子，例如 before('DEMUX_COMPLETE')
    this._emitCounter = {};
  }

  /**
   * 从上下文中获取解码流程实例，如果没有实例，构造一个
   * @param tag
   * @param args
   * @returns {*}
   */

  _createClass$1(Context, [{
    key: 'getInstance',
    value: function getInstance(tag) {
      var instance = this._instanceMap[tag];
      if (instance) {
        return instance;
      } else {
        // throw new Error(`${tag}实例尚未初始化`)
        return null;
      }
    }

    /**
     * 初始化具体实例
     * @param tag
     * @param args
     */

  }, {
    key: 'initInstance',
    value: function initInstance(tag) {
      if (this._clsMap[tag]) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var newInstance = new (Function.prototype.bind.apply(this._clsMap[tag], [null].concat(args)))();
        this._instanceMap[tag] = newInstance;
        if (newInstance.init) {
          newInstance.init(); // TODO: lifecircle
        }
        return newInstance;
      } else {
        throw new Error(tag + "\u672A\u5728context\u4E2D\u6CE8\u518C");
      }
    }

    /**
     * 避免大量的initInstance调用，初始化所有的组件
     * @param config
     */

  }, {
    key: 'init',
    value: function init(config) {
      if (this._inited) {
        return;
      }
      for (var tag in this._clsMap) {
        // if not inited, init an instance
        if (this._clsMap.hasOwnProperty(tag) && !this._instanceMap[tag]) {
          this.initInstance(tag, config);
        }
      }
      this._inited = true;
    }

    /**
     * 注册一个上下文流程，提供安全的事件发送机制
     * @param tag
     * @param cls
     */

  }, {
    key: 'registry',
    value: function registry(tag, cls) {
      var _this2 = this;

      var emitter = this._emitter;
      var checkMessageName = this._isMessageNameValid.bind(this);
      var self = this;
      var enhanced = function (_cls) {
        _inherits(enhanced, _cls);

        function enhanced(a, b, c) {
          _classCallCheck$1(this, enhanced);

          var _this = _possibleConstructorReturn(this, (enhanced.__proto__ || Object.getPrototypeOf(enhanced)).call(this, a, b, c));

          _this.listeners = {};
          _this.onceListeners = {};
          _this.TAG = tag;
          _this._context = self;
          return _this;
        }

        _createClass$1(enhanced, [{
          key: 'on',
          value: function on(messageName, callback) {
            checkMessageName(messageName);

            if (this.listeners[messageName]) {
              this.listeners[messageName].push(callback);
            } else {
              this.listeners[messageName] = [callback];
            }

            emitter.on('' + messageName + DIRECT_EMIT_FLAG + tag, callback); // 建立定向通信监听
            return emitter.on(messageName, callback);
          }

          /**
           * 在某个事件触发前执行
           * @param messageName
           * @param callback
           */

        }, {
          key: 'before',
          value: function before(messageName, callback) {
            checkMessageName(messageName);
            if (self._hooks[messageName]) {
              self._hooks[messageName].push(callback);
            } else {
              self._hooks[messageName] = [callback];
            }
          }
        }, {
          key: 'once',
          value: function once(messageName, callback) {
            checkMessageName(messageName);

            if (this.onceListeners[messageName]) {
              this.onceListeners[messageName].push(callback);
            } else {
              this.onceListeners[messageName] = [callback];
            }

            emitter.once('' + messageName + DIRECT_EMIT_FLAG + tag, callback);
            return emitter.once(messageName, callback);
          }
        }, {
          key: 'emit',
          value: function emit(messageName) {
            checkMessageName(messageName);
            if (self._emitCounter[messageName]) {
              self._emitCounter[messageName] += 1;
              if (self._emitCounter[messageName] % 1000 === 0) {
                var a = 'con';
                var b = 'sole';
                if (window.console) {
                  window[a + b].warn('invoke: ', messageName);
                  window.localStorage.setItem('xgplayer_invoke_' + messageName, self._emitCounter[messageName]);
                }
              }
            } else {
              self._emitCounter[messageName] = 1;
            }

            var beforeList = self._hooks ? self._hooks[messageName] : null;

            if (beforeList) {
              for (var i = 0, len = beforeList.length; i < len; i++) {
                var callback = beforeList[i];
                callback();
              }
            }

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            return emitter.emit.apply(emitter, [messageName].concat(args));
          }

          /**
           * 定向发送给某个组件单例的消息
           * @param messageName
           * @param args
           */

        }, {
          key: 'emitTo',
          value: function emitTo(tag, messageName) {
            checkMessageName(messageName);

            for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
              args[_key3 - 2] = arguments[_key3];
            }

            return emitter.emit.apply(emitter, ['' + messageName + DIRECT_EMIT_FLAG + tag].concat(args));
          }
        }, {
          key: 'off',
          value: function off(messageName, callback) {
            checkMessageName(messageName);
            return emitter.off(messageName, callback);
          }
        }, {
          key: 'removeListeners',
          value: function removeListeners() {
            var hasOwn = Object.prototype.hasOwnProperty.bind(this.listeners);

            for (var messageName in this.listeners) {
              if (hasOwn(messageName)) {
                var callbacks = this.listeners[messageName] || [];
                for (var i = 0; i < callbacks.length; i++) {
                  var callback = callbacks[i];
                  emitter.off(messageName, callback);
                  emitter.off('' + messageName + DIRECT_EMIT_FLAG + tag, callback);
                }
              }
            }

            for (var _messageName in this.onceListeners) {
              if (hasOwn(_messageName)) {
                var _callbacks = this.onceListeners[_messageName] || [];
                for (var _i = 0; _i < _callbacks.length; _i++) {
                  var _callback = _callbacks[_i];
                  emitter.off(_messageName, _callback);
                  emitter.off('' + _messageName + DIRECT_EMIT_FLAG + tag, _callback);
                }
              }
            }
          }

          /**
           * 在组件销毁时，默认将它注册的事件全部卸载，确保不会造成内存泄漏
           */

        }, {
          key: 'destroy',
          value: function destroy() {
            // step1 unlisten events
            this.removeListeners();
            this.listeners = {};

            // step2 release from context
            delete self._instanceMap[tag];
            if (_get(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this)) {
              return _get(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this).call(this);
            }
          }
        }]);

        return enhanced;
      }(cls);
      this._clsMap[tag] = enhanced;

      /**
       * get instance immediately
       * e.g const instance = context.registry(tag, Cls)(config)
       * */
      return function () {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _this2.initInstance.apply(_this2, [tag].concat(args));
      };
    }

    /**
     * 对存在的实例进行
     */

  }, {
    key: 'destroyInstances',
    value: function destroyInstances() {
      var _this3 = this;

      Object.keys(this._instanceMap).forEach(function (tag) {
        if (_this3._instanceMap[tag].destroy) {
          _this3._instanceMap[tag].destroy();
        }
      });
    }

    /**
     * 编解码流程无需关注事件的解绑
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this._emitter = null;
      this.allowedEvents = [];
      this._clsMap = null;
      this._context = null;
      this._hooks = null;
      this._emitCounter = {};
      this.destroyInstances();
    }

    /**
     * 对信道进行收拢
     * @param messageName
     * @private
     */

  }, {
    key: '_isMessageNameValid',
    value: function _isMessageNameValid(messageName) {
      if (!this.allowedEvents.indexOf(messageName) < 0) {
        throw new Error('unregistered message name: ' + messageName);
      }
    }
  }]);

  return Context;
}();

var LOADER_EVENTS = {
  LADER_START: 'LOADER_START',
  LOADER_DATALOADED: 'LOADER_DATALOADED',
  LOADER_COMPLETE: 'LOADER_COMPLETE',
  LOADER_ERROR: 'LOADER_ERROR'
};

var DEMUX_EVENTS = {
  DEMUX_START: 'DEMUX_START',
  DEMUX_COMPLETE: 'DEMUX_COMPLETE',
  DEMUX_ERROR: 'DEMUX_ERROR',
  METADATA_PARSED: 'METADATA_PARSED',
  VIDEO_METADATA_CHANGE: 'VIDEO_METADATA_CHANGE',
  AUDIO_METADATA_CHANGE: 'AUDIO_METADATA_CHANGE',
  MEDIA_INFO: 'MEDIA_INFO'
};

var REMUX_EVENTS = {
  REMUX_METADATA: 'REMUX_METADATA',
  REMUX_MEDIA: 'REMUX_MEDIA',
  MEDIA_SEGMENT: 'MEDIA_SEGMENT',
  REMUX_ERROR: 'REMUX_ERROR',
  INIT_SEGMENT: 'INIT_SEGMENT',
  DETECT_CHANGE_STREAM: 'DETECT_CHANGE_STREAM',
  RANDOM_ACCESS_POINT: 'RANDOM_ACCESS_POINT'
};

var MSE_EVENTS = {
  SOURCE_UPDATE_END: 'SOURCE_UPDATE_END'

  // hls专有events
};var HLS_EVENTS = {
  RETRY_TIME_EXCEEDED: 'RETRY_TIME_EXCEEDED'
};

var CRYTO_EVENTS = {
  START_DECRYPT: 'START_DECRYPT',
  DECRYPTED: 'DECRYPTED'
};
var ALLEVENTS = Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS, MSE_EVENTS, HLS_EVENTS);

var FlvAllowedEvents = [];
var HlsAllowedEvents = [];

for (var key$1 in ALLEVENTS) {
  if (ALLEVENTS.hasOwnProperty(key$1)) {
    FlvAllowedEvents.push(ALLEVENTS[key$1]);
  }
}

for (var _key in ALLEVENTS) {
  if (ALLEVENTS.hasOwnProperty(_key)) {
    HlsAllowedEvents.push(ALLEVENTS[_key]);
  }
}

var _EVENTS = {
  ALLEVENTS: ALLEVENTS,
  HLS_EVENTS: HLS_EVENTS,
  REMUX_EVENTS: REMUX_EVENTS,
  DEMUX_EVENTS: DEMUX_EVENTS,
  MSE_EVENTS: MSE_EVENTS,
  LOADER_EVENTS: LOADER_EVENTS,
  FlvAllowedEvents: FlvAllowedEvents,
  HlsAllowedEvents: HlsAllowedEvents,
  CRYTO_EVENTS: CRYTO_EVENTS
};

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
    var ua = navigator.userAgent;
    var isWindowsPhone = /(?:Windows Phone)/.test(ua);
    var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    var isAndroid = /(?:Android)/.test(ua);
    var isFireFox = /(?:Firefox)/.test(ua);
    var isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua);
    var isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    var isPc = !isPhone && !isAndroid && !isSymbian;
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

var le$1 = function () {
  var buf = new ArrayBuffer(2);
  new DataView(buf).setInt16(0, 256, true); // little-endian write
  return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
}();

var _createClass$2 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var UTF8 = function () {
  function UTF8() {
    _classCallCheck$2(this, UTF8);
  }

  _createClass$2(UTF8, null, [{
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
        } else if (input[i] < 0xC0) ; else if (input[i] < 0xE0) {
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
          if ((array[++start] & 0xC0) !== 0x80) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    }
  }]);

  return UTF8;
}();

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass$3 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var MediaSample = function () {
  function MediaSample(info) {
    var _this = this;

    _classCallCheck$3(this, MediaSample);

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

  _createClass$3(MediaSample, null, [{
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

var _createClass$4 = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck$4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var MediaSegment = function () {
    function MediaSegment() {
        _classCallCheck$4(this, MediaSegment);

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

    _createClass$4(MediaSegment, [{
        key: "addRAP",
        value: function addRAP(sample) {
            sample.isRAP = true;
            this.randomAccessPoints.push(sample);
        }
    }]);

    return MediaSegment;
}();

var _createClass$5 = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck$5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var MediaSegmentList = function () {
    function MediaSegmentList(type) {
        _classCallCheck$5(this, MediaSegmentList);

        this._type = type;
        this._list = [];
        this._lastAppendLocation = -1; // cached last insert location
    }

    _createClass$5(MediaSegmentList, [{
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

var _createClass$6 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var AudioTrackMeta = function () {
  function AudioTrackMeta(meta) {
    _classCallCheck$6(this, AudioTrackMeta);

    var _default = {
      sampleRate: 48000,
      channelCount: 2,
      codec: 'mp4a.40.2',
      config: [41, 401, 136, 0],
      duration: 0,
      id: 2,
      refSampleDuration: 21,
      sampleRateIndex: 3,
      timescale: 1000,
      type: 'audio'
    };
    if (meta) {
      return Object.assign({}, _default, meta);
    }
    return _default;
  }

  _createClass$6(AudioTrackMeta, [{
    key: 'destroy',
    value: function destroy() {
      this.init = null;
    }
  }]);

  return AudioTrackMeta;
}();

var VideoTrackMeta = function () {
  function VideoTrackMeta(meta) {
    _classCallCheck$6(this, VideoTrackMeta);

    var _default = {
      avcc: null,
      sps: new Uint8Array(0),
      pps: new Uint8Array(0),
      chromaFormat: 420,
      codec: 'avc1.640020',
      codecHeight: 720,
      codecWidth: 1280,
      duration: 0,
      frameRate: {
        fixed: true,
        fps: 25,
        fps_num: 25000,
        fps_den: 1000
      },
      id: 1,
      level: '3.2',
      presentHeight: 720,
      presentWidth: 1280,
      profile: 'High',
      refSampleDuration: 40,
      parRatio: {
        height: 1,
        width: 1
      },
      timescale: 1000,
      type: 'video'
    };

    if (meta) {
      return Object.assign({}, _default, meta);
    }
    return _default;
  }

  _createClass$6(VideoTrackMeta, [{
    key: 'destroy',
    value: function destroy() {
      this.init = null;
      this.sps = null;
      this.pps = null;
    }
  }]);

  return VideoTrackMeta;
}();

var _createClass$7 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var AudioTrackSample = function () {
  function AudioTrackSample(info) {
    _classCallCheck$7(this, AudioTrackSample);

    var _default = AudioTrackSample.getDefault();
    if (!info) {
      return _default;
    }
    var sample = Object.assign({}, _default, info);

    return sample;
  }

  _createClass$7(AudioTrackSample, null, [{
    key: "getDefault",
    value: function getDefault() {
      return {
        dts: null,
        pts: null,
        data: new Uint8Array()
      };
    }
  }]);

  return AudioTrackSample;
}();

var VideoTrackSample = function () {
  function VideoTrackSample(info) {
    _classCallCheck$7(this, VideoTrackSample);

    var _default = VideoTrackSample.getDefault();

    if (!info) {
      return _default;
    }
    var sample = Object.assign({}, _default, info);

    return sample;
  }

  _createClass$7(VideoTrackSample, null, [{
    key: "getDefault",
    value: function getDefault() {
      return {
        dts: null,
        pts: null,
        isKeyframe: false, // is Random access point
        originDts: null,
        data: new Uint8Array()
      };
    }
  }]);

  return VideoTrackSample;
}();

var _createClass$8 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var MSE = function () {
  function MSE(configs) {
    _classCallCheck$8(this, MSE);

    this.configs = Object.assign({}, configs);
    this.container = this.configs.container;
    this.mediaSource = null;
    this.sourceBuffers = {};
    this.preloadTime = this.configs.preloadTime || 1;
    this.onSourceOpen = this.onSourceOpen.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onUpdateEnd = this.onUpdateEnd.bind(this);
    this.onWaiting = this.onWaiting.bind(this);
  }

  _createClass$8(MSE, [{
    key: 'init',
    value: function init() {
      // eslint-disable-next-line no-undef
      this.mediaSource = new self.MediaSource();
      this.mediaSource.addEventListener('sourceopen', this.onSourceOpen);
      this.container.src = URL.createObjectURL(this.mediaSource);
      this.url = this.container.src;
      this.container.addEventListener('timeupdate', this.onTimeUpdate);
      this.container.addEventListener('waiting', this.onWaiting);
    }
  }, {
    key: 'onTimeUpdate',
    value: function onTimeUpdate() {
      this.emit('TIME_UPDATE', this.container);
    }
  }, {
    key: 'onWaiting',
    value: function onWaiting() {
      this.emit('WAITING', this.container);
    }
  }, {
    key: 'onSourceOpen',
    value: function onSourceOpen() {
      this.addSourceBuffers();
    }
  }, {
    key: 'onUpdateEnd',
    value: function onUpdateEnd() {
      this.emit('SOURCE_UPDATE_END');
      this.doAppend();
    }
  }, {
    key: 'addSourceBuffers',
    value: function addSourceBuffers() {
      if (this.mediaSource.readyState !== 'open') {
        return;
      }
      var sources = this._context.getInstance('PRE_SOURCE_BUFFER');
      var tracks = this._context.getInstance('TRACKS');
      var track = void 0;

      sources = sources.sources;
      var add = false;
      for (var i = 0, k = Object.keys(sources).length; i < k; i++) {
        var type = Object.keys(sources)[i];
        if (type === 'audio') {
          track = tracks.audioTrack;
        } else if (type === 'video') {
          track = tracks.videoTrack;
          // return;
        }
        if (track) {
          var dur = type === 'audio' ? 21 : 40;
          if (track.meta && track.meta.refSampleDuration) dur = track.meta.refSampleDuration;
          if (sources[type].data.length >= this.preloadTime / dur) {
            add = true;
          }
        }
      }

      if (add) {
        if (Object.keys(this.sourceBuffers).length > 0) {
          return;
        }
        for (var _i = 0, _k = Object.keys(sources).length; _i < _k; _i++) {
          var _type = Object.keys(sources)[_i];
          var source = sources[_type];
          var mime = _type === 'video' ? 'video/mp4;codecs=' + source.mimetype : 'audio/mp4;codecs=' + source.mimetype;
          var sourceBuffer = this.mediaSource.addSourceBuffer(mime);
          this.sourceBuffers[_type] = sourceBuffer;
          sourceBuffer.addEventListener('updateend', this.onUpdateEnd);
          this.doAppend();
        }
      }
    }
  }, {
    key: 'doAppend',
    value: function doAppend() {
      var sources = this._context.getInstance('PRE_SOURCE_BUFFER');
      if (sources) {
        for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          var type = Object.keys(this.sourceBuffers)[i];
          var sourceBuffer = this.sourceBuffers[type];
          if (!sourceBuffer.updating) {
            var source = sources.sources[type];
            if (source && !source.inited) {
              // console.log('append initial segment')
              sourceBuffer.appendBuffer(source.init.buffer.buffer);
              source.inited = true;
            } else if (source) {
              var data = source.data.shift();
              if (data) {
                sourceBuffer.appendBuffer(data.buffer.buffer);
              }
            }
          }
        }
      }
    }
  }, {
    key: 'endOfStream',
    value: function endOfStream() {
      var _mediaSource = this.mediaSource,
          readyState = _mediaSource.readyState,
          activeSourceBuffers = _mediaSource.activeSourceBuffers;

      if (readyState === 'open' && activeSourceBuffers.length === 0) {
        try {
          this.mediaSource.endOfStream();
        } catch (e) {
          // log
        }
      }
    }
  }, {
    key: 'remove',
    value: function remove(end) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
        var buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
        if (!buffer.updating) {

          // console.log('remove', start, end)
          buffer.remove(start, end);
        }
      }
    }
  }, {
    key: 'removeBuffers',
    value: function removeBuffers() {
      var _this = this;

      var taskList = [];

      var _loop = function _loop(i) {
        var buffer = _this.sourceBuffers[Object.keys(_this.sourceBuffers)[i]];
        buffer.removeEventListener('updateend', _this.onUpdateEnd);

        var task = void 0;
        if (buffer.updating) {
          task = new Promise(function (resolve) {
            var doCleanBuffer = function doCleanBuffer() {
              var retryTime = 3;

              var clean = function clean() {
                if (!buffer.updating) {
                  MSE.clearBuffer(buffer);
                  buffer.addEventListener('updateend', function () {
                    resolve();
                  });
                } else if (retryTime > 0) {
                  setTimeout(clean, 200);
                  retryTime--;
                } else {
                  resolve();
                }
              };

              setTimeout(clean, 200);
              buffer.removeEventListener('updateend', doCleanBuffer);
            };
            buffer.addEventListener('updateend', doCleanBuffer);
          });
        } else {
          task = new Promise(function (resolve) {
            MSE.clearBuffer(buffer);
            buffer.addEventListener('updateend', function () {
              resolve();
            });
          });

          // task = Promise.resolve()
        }

        taskList.push(task);
      };

      for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
        _loop(i);
      }

      return Promise.all(taskList);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this2 = this;

      return this.removeBuffers().then(function () {
        for (var i = 0; i < Object.keys(_this2.sourceBuffers).length; i++) {
          var _buffer = _this2.sourceBuffers[Object.keys(_this2.sourceBuffers)[i]];
          _this2.mediaSource.removeSourceBuffer(_buffer);
          delete _this2.sourceBuffers[Object.keys(_this2.sourceBuffers)[i]];
        }

        _this2.container.removeEventListener('timeupdate', _this2.onTimeUpdate);
        _this2.container.removeEventListener('waiting', _this2.onWaiting);
        _this2.mediaSource.removeEventListener('sourceopen', _this2.onSourceOpen);

        _this2.endOfStream();
        window.URL.revokeObjectURL(_this2.url);

        _this2.url = null;
        _this2.configs = {};
        _this2.container = null;
        _this2.mediaSource = null;
        _this2.sourceBuffers = {};
        _this2.preloadTime = 1;
      });
    }
  }], [{
    key: 'clearBuffer',
    value: function clearBuffer(buffer) {
      var buffered = buffer.buffered;
      var bEnd = 0.1;
      for (var i = 0, len = buffered.length; i < len; i++) {
        bEnd = buffered.end(i);
      }
      try {
        buffer.remove(0, bEnd);
      } catch (e) {
        // DO NOTHING
      }
    }
  }]);

  return MSE;
}();

var _createClass$9 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$9(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Stream = function () {
  function Stream(buffer) {
    _classCallCheck$9(this, Stream);

    if (buffer instanceof ArrayBuffer) {
      this.buffer = buffer;
      this.dataview = new DataView(buffer);
      this.dataview.position = 0;
    } else {
      throw new Error('data is invalid');
    }
  }

  _createClass$9(Stream, [{
    key: 'back',
    value: function back(count) {
      this.position -= count;
    }
  }, {
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
    key: 'readUint24',
    value: function readUint24() {
      return Stream.readByte(this.dataview, 3);
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
    key: 'writeUint32',
    value: function writeUint32(value) {
      return new Uint8Array([value >>> 24 & 0xff, value >>> 16 & 0xff, value >>> 8 & 0xff, value & 0xff]);
    }
  }, {
    key: 'length',
    get: function get() {
      return this.buffer.byteLength;
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
            throw new Error('not supported for readByte 3');
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
            throw new Error('not supported for readBody 8');
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

var concat = createCommonjsModule(function (module, exports) {

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
});

unwrapExports(concat);

var lib = createCommonjsModule(function (module) {



var _concat2 = _interopRequireDefault(concat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = _concat2.default;
});

var Concat = unwrapExports(lib);

var _createClass$a = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$a(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Buffer = function () {
  function Buffer(buffer) {
    _classCallCheck$a(this, Buffer);

    this.buffer = buffer || new Uint8Array(0);
  }

  _createClass$a(Buffer, [{
    key: 'write',
    value: function write() {
      var _this = this;

      for (var _len = arguments.length, buffer = Array(_len), _key = 0; _key < _len; _key++) {
        buffer[_key] = arguments[_key];
      }

      buffer.forEach(function (item) {
        _this.buffer = Concat(Uint8Array, _this.buffer, item);
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

var _createClass$b = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck$b(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var CRYTO_EVENTS$1 = _EVENTS.CRYTO_EVENTS;

var Crypto = function () {
    function Crypto(config) {
        _classCallCheck$b(this, Crypto);

        this.inputBuffer = config.inputbuffer;
        this.outputBuffer = config.outputbuffer;
        this.key = config.key;
        this.iv = config.iv;
        this.method = config.method;

        this.crypto = window.crypto || window.msCrypto;
    }

    _createClass$b(Crypto, [{
        key: 'init',
        value: function init() {
            this.on(CRYTO_EVENTS$1.START_DECRYPT, this.decript.bind(this));
        }
    }, {
        key: 'decript',
        value: function decript() {
            var _this = this;

            if (!this.aeskey) {
                var sbkey = this.crypto.subtle.importKey('raw', this.key.buffer, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
                sbkey.then(function (key) {
                    _this.aeskey = key;
                    _this.decriptData();
                });
            } else {
                this.decriptData();
            }
        }
    }, {
        key: 'decriptData',
        value: function decriptData() {
            var _this2 = this;

            var inputbuffer = this._context.getInstance(this.inputBuffer);
            var outputbuffer = this._context.getInstance(this.outputBuffer);
            var data = inputbuffer.shift();
            if (data) {
                this.crypto.subtle.decrypt({ name: 'AES-CBC', iv: this.iv.buffer }, this.aeskey, data).then(function (res) {
                    outputbuffer.push(new Uint8Array(res));
                    _this2.emit(CRYTO_EVENTS$1.DECRYPTED);
                    _this2.decriptData(data);
                });
            }
        }
    }]);

    return Crypto;
}();

var Context$1 = Context;
var EVENTS = _EVENTS;
var sniffer$1 = sniffer;
var isLe = le$1;
var UTF8$1 = UTF8;
var MediaSegmentList$1 = MediaSegmentList;
var AudioTrackMeta$1 = AudioTrackMeta;
var VideoTrackMeta$1 = VideoTrackMeta;
var AudioTrackSample$1 = AudioTrackSample;
var VideoTrackSample$1 = VideoTrackSample;
var Mse = MSE;
var Stream$1 = Stream;
var Buffer$1 = Buffer;

var _createClass$c = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$c(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// const UINT32_MAX = Math.pow(2, 32) - 1;

var Fmp4 = function () {
  function Fmp4() {
    _classCallCheck$c(this, Fmp4);
  }

  _createClass$c(Fmp4, null, [{
    key: 'size',
    value: function size(value) {
      return Buffer$1.writeUint32(value);
    }
  }, {
    key: 'initBox',
    value: function initBox(size, name) {
      var buffer = new Buffer$1();

      for (var _len = arguments.length, content = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        content[_key - 2] = arguments[_key];
      }

      buffer.write.apply(buffer, [Fmp4.size(size), Fmp4.type(name)].concat(content));
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
      return Fmp4.initBox(24, 'ftyp', new Uint8Array([0x69, 0x73, 0x6F, 0x6D, // isom,
      0x0, 0x0, 0x00, 0x01, // minor_version: 0x01
      0x69, 0x73, 0x6F, 0x6D, // isom
      0x61, 0x76, 0x63, 0x31 // avc1
      ]));
    }
  }, {
    key: 'moov',
    value: function moov(_ref) {
      var type = _ref.type,
          meta = _ref.meta;

      var size = 8;
      var mvhd = Fmp4.mvhd(meta.duration, meta.timescale);
      var trak = void 0;

      if (type === 'video') {
        trak = Fmp4.videoTrak(meta);
      } else {
        trak = Fmp4.audioTrak(meta);
      }

      var mvex = Fmp4.mvex(meta.duration, meta.timescale || 1000, meta.id);
      [mvhd, trak, mvex].forEach(function (item) {
        size += item.byteLength;
      });
      return Fmp4.initBox(size, 'moov', mvhd, trak, mvex);
    }
  }, {
    key: 'mvhd',
    value: function mvhd(duration) {
      var timescale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

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
      return Fmp4.initBox(8 + bytes.length, 'mvhd', new Uint8Array(bytes));
    }
  }, {
    key: 'videoTrak',
    value: function videoTrak(data) {
      var size = 8;

      var tkhd = Fmp4.tkhd({
        id: 1,
        duration: data.duration,
        timescale: data.timescale || 1000,
        width: data.presentWidth,
        height: data.presentHeight,
        type: 'video'
      });
      var mdia = Fmp4.mdia({
        type: 'video',
        timescale: data.timescale || 1000,
        duration: data.duration,
        avcc: data.avcc,
        parRatio: data.parRatio,
        width: data.presentWidth,
        height: data.presentHeight
      });
      [tkhd, mdia].forEach(function (item) {
        size += item.byteLength;
      });
      return Fmp4.initBox(size, 'trak', tkhd, mdia);
    }
  }, {
    key: 'audioTrak',
    value: function audioTrak(data) {
      var size = 8;
      var tkhd = Fmp4.tkhd({
        id: 2,
        duration: data.duration,
        timescale: data.timescale || 1000,
        width: 0,
        height: 0,
        type: 'audio'
      });
      var mdia = Fmp4.mdia({
        type: 'audio',
        timescale: data.timescale || 1000,
        duration: data.duration,
        channelCount: data.channelCount,
        samplerate: data.sampleRate,
        config: data.config
      });
      [tkhd, mdia].forEach(function (item) {
        size += item.byteLength;
      });
      return Fmp4.initBox(size, 'trak', tkhd, mdia);
    }
  }, {
    key: 'tkhd',
    value: function tkhd(data) {
      var id = data.id;
      var duration = data.duration;
      var width = data.width;
      var height = data.height;
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
      return Fmp4.initBox(8 + content.byteLength, 'tkhd', content);
    }
  }, {
    key: 'edts',
    value: function edts(data) {
      var buffer = new Buffer$1();
      var duration = data.duration;
      var mediaTime = data.mediaTime;
      buffer.write(Fmp4.size(36), Fmp4.type('edts'));
      // elst
      buffer.write(Fmp4.size(28), Fmp4.type('elst'));
      buffer.write(new Uint8Array([0x00, 0x00, 0x00, 0x01, // entry count
      duration >> 24 & 0xff, duration >> 16 & 0xff, duration >> 8 & 0xff, duration & 0xff, mediaTime >> 24 & 0xff, mediaTime >> 16 & 0xff, mediaTime >> 8 & 0xff, mediaTime & 0xff, 0x00, 0x00, 0x00, 0x01 // media rate
      ]));
      return buffer.buffer;
    }
  }, {
    key: 'mdia',
    value: function mdia(data) {
      var size = 8;
      var mdhd = Fmp4.mdhd(data.timescale, data.duration);
      var hdlr = Fmp4.hdlr(data.type);
      var minf = Fmp4.minf(data);
      [mdhd, hdlr, minf].forEach(function (item) {
        size += item.byteLength;
      });
      return Fmp4.initBox(size, 'mdia', mdhd, hdlr, minf);
    }
  }, {
    key: 'mdhd',
    value: function mdhd() {
      var timescale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var duration = arguments[1];

      var content = new Uint8Array([0x00, 0x00, 0x00, 0x00, // creation_time    创建时间
      0x00, 0x00, 0x00, 0x00, // modification_time修改时间
      timescale >>> 24 & 0xFF, // timescale: 4 bytes    文件媒体在1秒时间内的刻度值，可以理解为1秒长度
      timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes  track的时间长度
      duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x55, 0xC4, // language: und (undetermined) 媒体语言码。最高位为0，后面15位为3个字符（见ISO 639-2/T标准中定义）
      0x00, 0x00 // pre_defined = 0
      ]);
      return Fmp4.initBox(12 + content.byteLength, 'mdhd', Fmp4.extension(0, 0), content);
    }
  }, {
    key: 'hdlr',
    value: function hdlr(type) {
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
      return Fmp4.initBox(8 + value.length, 'hdlr', new Uint8Array(value));
    }
  }, {
    key: 'minf',
    value: function minf(data) {
      var size = 8;
      var vmhd = data.type === 'video' ? Fmp4.vmhd() : Fmp4.smhd();
      var dinf = Fmp4.dinf();
      var stbl = Fmp4.stbl(data);
      [vmhd, dinf, stbl].forEach(function (item) {
        size += item.byteLength;
      });
      return Fmp4.initBox(size, 'minf', vmhd, dinf, stbl);
    }
  }, {
    key: 'vmhd',
    value: function vmhd() {
      return Fmp4.initBox(20, 'vmhd', new Uint8Array([0x00, // version
      0x00, 0x00, 0x01, // flags
      0x00, 0x00, // graphicsmode
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
      ]));
    }
  }, {
    key: 'smhd',
    value: function smhd() {
      return Fmp4.initBox(16, 'smhd', new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, // balance
      0x00, 0x00 // reserved
      ]));
    }
  }, {
    key: 'dinf',
    value: function dinf() {
      var buffer = new Buffer$1();
      var dref = [0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01, // entry_count
      0x00, 0x00, 0x00, 0x0c, // entry_size
      0x75, 0x72, 0x6c, 0x20, // 'url' type
      0x00, // version 0
      0x00, 0x00, 0x01 // entry_flags
      ];
      buffer.write(Fmp4.size(36), Fmp4.type('dinf'), Fmp4.size(28), Fmp4.type('dref'), new Uint8Array(dref));
      return buffer.buffer;
    }
  }, {
    key: 'stbl',
    value: function stbl(data) {
      var size = 8;
      var stsd = Fmp4.stsd(data);
      var stts = Fmp4.stts();
      var stsc = Fmp4.stsc();
      var stsz = Fmp4.stsz();
      var stco = Fmp4.stco();
      [stsd, stts, stsc, stsz, stco].forEach(function (item) {
        size += item.byteLength;
      });
      return Fmp4.initBox(size, 'stbl', stsd, stts, stsc, stsz, stco);
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
        content = Fmp4.mp4a(data);
      } else {
        content = Fmp4.avc1(data);
      }
      return Fmp4.initBox(16 + content.byteLength, 'stsd', Fmp4.extension(0, 0), new Uint8Array([0x00, 0x00, 0x00, 0x01]), content);
    }
  }, {
    key: 'mp4a',
    value: function mp4a(data) {
      var content = new Uint8Array([0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
      0x00, data.channelCount, // channelcount
      0x00, 0x10, // sampleSize:16bits
      0x00, 0x00, 0x00, 0x00, // reserved2
      data.samplerate >> 8 & 0xff, data.samplerate & 0xff, //
      0x00, 0x00]);
      var esds = Fmp4.esds(data.config);
      return Fmp4.initBox(8 + content.byteLength + esds.byteLength, 'mp4a', content, esds);
    }
  }, {
    key: 'esds',
    value: function esds() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [43, 146, 8, 0];

      var configlen = config.length;
      var buffer = new Buffer$1();
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
      buffer.write(Fmp4.size(8 + content.byteLength), Fmp4.type('esds'), content);
      return buffer.buffer;
    }
  }, {
    key: 'avc1',
    value: function avc1(data) {
      var buffer = new Buffer$1();
      var size = 40; // 8(avc1)+8(avcc)+8(btrt)+16(pasp)
      // let sps = data.sps
      // let pps = data.pps
      var width = data.width;
      var height = data.height;
      var hSpacing = data.parRatio.height;
      var vSpacing = data.parRatio.width;
      // let avccBuffer = new Buffer()
      // avccBuffer.write(new Uint8Array([
      //   0x01, // version
      //   sps[1], // profile
      //   sps[2], // profile compatible
      //   sps[3], // level
      //   0xfc | 3,
      //   0xE0 | 1 // 目前只处理一个sps
      // ].concat([sps.length >>> 8 & 0xff, sps.length & 0xff])))
      // avccBuffer.write(sps, new Uint8Array([1, pps.length >>> 8 & 0xff, pps.length & 0xff]), pps)

      var avcc = data.avcc;
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

      buffer.write(Fmp4.size(size + avc1.byteLength + avcc.byteLength + btrt.byteLength), Fmp4.type('avc1'), avc1, Fmp4.size(8 + avcc.byteLength), Fmp4.type('avcC'), avcc, Fmp4.size(20), Fmp4.type('btrt'), btrt, Fmp4.size(16), Fmp4.type('pasp'), pasp);
      return buffer.buffer;
    }
  }, {
    key: 'stts',
    value: function stts() {
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      return Fmp4.initBox(16, 'stts', content);
    }
  }, {
    key: 'stsc',
    value: function stsc() {
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      return Fmp4.initBox(16, 'stsc', content);
    }
  }, {
    key: 'stco',
    value: function stco() {
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      return Fmp4.initBox(16, 'stco', content);
    }
  }, {
    key: 'stsz',
    value: function stsz() {
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // sample_size
      0x00, 0x00, 0x00, 0x00 // sample_count
      ]);
      return Fmp4.initBox(20, 'stsz', content);
    }
  }, {
    key: 'mvex',
    value: function mvex(duration) {
      var trackID = arguments[2];

      var buffer = new Buffer$1();
      var mehd = Buffer$1.writeUint32(duration);
      buffer.write(Fmp4.size(56), Fmp4.type('mvex'), Fmp4.size(16), Fmp4.type('mehd'), Fmp4.extension(0, 0), mehd, Fmp4.trex(trackID));
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
      return Fmp4.initBox(8 + content.byteLength, 'trex', content);
    }
  }, {
    key: 'moof',
    value: function moof(data) {
      var size = 8;
      var mfhd = Fmp4.mfhd();
      var traf = Fmp4.traf(data);
      [mfhd, traf].forEach(function (item) {
        size += item.byteLength;
      });
      return Fmp4.initBox(size, 'moof', mfhd, traf);
    }
  }, {
    key: 'mfhd',
    value: function mfhd() {
      var content = Buffer$1.writeUint32(Fmp4.sequence);
      Fmp4.sequence += 1;
      return Fmp4.initBox(16, 'mfhd', Fmp4.extension(0, 0), content);
    }
  }, {
    key: 'traf',
    value: function traf(data) {
      var size = 8;
      var tfhd = Fmp4.tfhd(data.id);
      var tfdt = Fmp4.tfdt(data.time);
      var sdtp = Fmp4.sdtp(data);
      var trun = Fmp4.trun(data, sdtp.byteLength);

      [tfhd, tfdt, trun, sdtp].forEach(function (item) {
        size += item.byteLength;
      });
      return Fmp4.initBox(size, 'traf', tfhd, tfdt, trun, sdtp);
    }
  }, {
    key: 'tfhd',
    value: function tfhd(id) {
      var content = Buffer$1.writeUint32(id);
      return Fmp4.initBox(16, 'tfhd', Fmp4.extension(0, 0), content);
    }
  }, {
    key: 'tfdt',
    value: function tfdt(time) {
      // let upper = Math.floor(time / (UINT32_MAX + 1)),
      //     lower = Math.floor(time % (UINT32_MAX + 1));
      return Fmp4.initBox(16, 'tfdt', Fmp4.extension(0, 0), Buffer$1.writeUint32(time));
    }
  }, {
    key: 'trun',
    value: function trun(data, sdtpLength) {
      // let id = data.id;
      // let ceil = id === 1 ? 16 : 12;
      var buffer = new Buffer$1();
      var sampleCount = Buffer$1.writeUint32(data.samples.length);
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
      var offset = Buffer$1.writeUint32(8 + 8 + 16 + 8 + 16 + 16 + 12 + 4 + 4 + 16 * data.samples.length + sdtpLength);
      buffer.write(Fmp4.size(20 + 16 * data.samples.length), Fmp4.type('trun'), new Uint8Array([0x00, 0x00, 0x0F, 0x01]), sampleCount, offset);

      // let size = buffer.buffer.byteLength
      // let writeOffset = 0
      // data.samples.forEach(() => {
      //   size += 16
      // })
      //
      // let trunBox = new Uint8Array(size)

      // trunBox.set(buffer.buffer, 0)

      data.samples.forEach(function (item) {
        var flags = item.flags;
        // console.log(item.type, item.dts, item.duration)

        buffer.write(new Uint8Array([item.duration >>> 24 & 0xFF, // sample_duration
        item.duration >>> 16 & 0xFF, item.duration >>> 8 & 0xFF, item.duration & 0xFF, item.size >>> 24 & 0xFF, // sample_size
        item.size >>> 16 & 0xFF, item.size >>> 8 & 0xFF, item.size & 0xFF, flags.isLeading << 2 | flags.dependsOn, // sample_flags
        flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.isNonSync, 0x00, 0x00, // sample_degradation_priority
        item.cts >>> 24 & 0xFF, // sample_composition_time_offset
        item.cts >>> 16 & 0xFF, item.cts >>> 8 & 0xFF, item.cts & 0xFF]));
        // writeOffset += 16
        // buffer.write(Buffer.writeUint32(0));
      });
      return buffer.buffer;
    }
  }, {
    key: 'sdtp',
    value: function sdtp(data) {
      var buffer = new Buffer$1();
      buffer.write(Fmp4.size(12 + data.samples.length), Fmp4.type('sdtp'), Fmp4.extension(0, 0));
      data.samples.forEach(function (item) {
        var flags = item.flags;
        var num = flags.isLeading << 6 | // is_leading: 2 (bit)
        flags.dependsOn << 4 | // sample_depends_on
        flags.isDependedOn << 2 | // sample_is_depended_on
        flags.hasRedundancy; // sample_has_redundancy

        buffer.write(new Uint8Array([num]));
      });
      return buffer.buffer;
    }
  }, {
    key: 'mdat',
    value: function mdat(data) {
      var buffer = new Buffer$1();
      var size = 8;
      data.samples.forEach(function (item) {
        size += item.size;
      });
      buffer.write(Fmp4.size(size), Fmp4.type('mdat'));
      var mdatBox = new Uint8Array(size);
      var offset = 0;
      mdatBox.set(buffer.buffer, offset);
      offset += 8;
      data.samples.forEach(function (item) {
        item.buffer.forEach(function (unit) {
          mdatBox.set(unit, offset);
          offset += unit.byteLength;
          // buffer.write(unit.data);
        });
      });
      return mdatBox;
    }
  }]);

  return Fmp4;
}();

Fmp4.type = function (name) {
  return new Uint8Array([name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)]);
};
Fmp4.sequence = 1;

var _createClass$d = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$d(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var REMUX_EVENTS$1 = EVENTS.REMUX_EVENTS;

var Mp4Remuxer = function () {
  function Mp4Remuxer() {
    _classCallCheck$d(this, Mp4Remuxer);

    this._dtsBase = 0;
    this._isDtsBaseInited = false;
    this._audioNextDts = null;
    this._videoNextDts = null;
    this._videoSegmentList = new MediaSegmentList$1('video');
    this._audioSegmentList = new MediaSegmentList$1('audio');
    var browser = sniffer$1.browser;

    this._fillSilenceFrame = browser === 'ie';

    this.isFirstVideo = true;
    this.isFirstAudio = true;

    this.videoAllDuration = 0;
    this.audioAllDuration = 0;
  }

  _createClass$d(Mp4Remuxer, [{
    key: 'init',
    value: function init() {
      this.on(REMUX_EVENTS$1.REMUX_MEDIA, this.remux.bind(this));
      this.on(REMUX_EVENTS$1.REMUX_METADATA, this.onMetaDataReady.bind(this));
      this.on(REMUX_EVENTS$1.DETECT_CHANGE_STREAM, this.resetDtsBase.bind(this));
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._dtsBase = -1;
      this._dtsBaseInited = false;
      this._videoNextDts = null;
      this._audioNextDts = null;
      this._videoSegmentList.clear();
      this._audioSegmentList.clear();
      this._videoSegmentList = null;
      this._audioSegmentList = null;
    }
  }, {
    key: 'remux',
    value: function remux() {
      var _context$getInstance = this._context.getInstance('TRACKS'),
          audioTrack = _context$getInstance.audioTrack,
          videoTrack = _context$getInstance.videoTrack;

      !this._isDtsBaseInited && this.calcDtsBase(audioTrack, videoTrack);

      this._remuxVideo(videoTrack);
      this._remuxAudio(audioTrack);
    }
  }, {
    key: 'resetDtsBase',
    value: function resetDtsBase() {
      // for hls 中途切换 meta后seek
      this._dtsBase = 0;
      this._dtsBaseInited = false;
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
    value: function onMetaDataReady(type) {
      var track = void 0;

      if (type === 'audio') {
        var _context$getInstance2 = this._context.getInstance('TRACKS'),
            audioTrack = _context$getInstance2.audioTrack;

        track = audioTrack;
      } else {
        var _context$getInstance3 = this._context.getInstance('TRACKS'),
            videoTrack = _context$getInstance3.videoTrack;

        track = videoTrack;
      }

      var presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
      var source = presourcebuffer.getSource(type);
      if (!source) {
        source = presourcebuffer.createSource(type);
      }

      source.mimetype = track.meta.codec;
      source.init = this.remuxInitSegment(type, track.meta);
      // source.inited = false;

      // this.resetDtsBase()
      this.emit(REMUX_EVENTS$1.INIT_SEGMENT, type);
    }
  }, {
    key: 'remuxInitSegment',
    value: function remuxInitSegment(type, meta) {
      var initSegment = new Buffer$1();
      var ftyp = Fmp4.ftyp();
      var moov = Fmp4.moov({ type: type, meta: meta });

      initSegment.write(ftyp, moov);
      return initSegment;
    }
  }, {
    key: 'calcDtsBase',
    value: function calcDtsBase(audioTrack, videoTrack) {
      if (!audioTrack && videoTrack.samples.length) {
        return videoTrack.samples[0].dts;
      }

      if (!audioTrack.samples.length && !videoTrack.samples.length) {
        return;
      }

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
      var track = videoTrack || {};

      if (!videoTrack.samples || !videoTrack.samples.length) {
        return;
      }

      var samples = track.samples;

      var firstDts = -1;

      var initSegment = null;
      var mp4Samples = [];
      var mdatBox = {
        samples: []
      };

      var maxLoop = 10000;
      while (samples.length && maxLoop-- > 0) {
        // console.log('mark2')
        var avcSample = samples.shift();

        var isKeyframe = avcSample.isKeyframe,
            options = avcSample.options;

        if (!this.isFirstAudio && options && options.meta) {
          initSegment = this.remuxInitSegment('video', options.meta);
          options.meta = null;
          samples.unshift(avcSample);
          if (!options.isContinue) {
            this.resetDtsBase();
          }
          break;
        }

        var dts = avcSample.dts - this._dtsBase;

        if (firstDts === -1) {
          firstDts = dts;
        }

        var cts = void 0;
        var pts = void 0;
        if (avcSample.pts !== undefined) {
          pts = avcSample.pts - this._dtsBase;
          cts = pts - dts;
        }
        if (avcSample.cts !== undefined) {
          pts = avcSample.cts + dts;
          cts = avcSample.cts;
        }

        var mdatSample = {
          buffer: [],
          size: 0
        };
        mdatBox.samples.push(mdatSample);
        mdatSample.buffer.push(avcSample.data);
        mdatSample.size += avcSample.data.byteLength;

        var sampleDuration = 0;
        if (avcSample.duration) {
          sampleDuration = avcSample.duration;
        } else if (samples.length >= 1) {
          var nextDts = samples[0].dts - this._dtsBase;
          sampleDuration = nextDts - dts;
        } else {
          if (mp4Samples.length >= 1) {
            // lastest sample, use second last duration
            sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
          } else {
            // the only one sample, use reference duration
            sampleDuration = this.videoMeta.refSampleDuration;
          }
        }
        this.videoAllDuration += sampleDuration;
        // console.log(`video dts ${dts}`, `pts ${pts}`, isKeyframe, `duration ${sampleDuration}`)
        mp4Samples.push({
          dts: dts,
          cts: cts,
          pts: pts,
          data: avcSample.data,
          size: avcSample.data.byteLength,
          isKeyframe: isKeyframe,
          duration: sampleDuration,
          flags: {
            isLeading: 0,
            dependsOn: isKeyframe ? 2 : 1,
            isDependedOn: isKeyframe ? 1 : 0,
            hasRedundancy: 0,
            isNonSync: isKeyframe ? 0 : 1
          },
          originDts: dts,
          type: 'video'
        });

        if (isKeyframe) {
          this.emit(REMUX_EVENTS$1.RANDOM_ACCESS_POINT, pts);
        }
      }

      var moofMdat = new Buffer$1();
      if (mp4Samples.length) {
        var moof = Fmp4.moof({
          id: track.meta.id,
          time: firstDts,
          samples: mp4Samples
        });
        var mdat = Fmp4.mdat(mdatBox);
        moofMdat.write(moof, mdat);

        this.writeToSource('video', moofMdat);
      }

      if (initSegment) {
        this.writeToSource('video', initSegment);

        if (samples.length) {
          // second part of stream change
          track.samples = samples;
          return this._remuxVideo(track);
        }
      }

      this.isFirstVideo = false;
      this.emit(REMUX_EVENTS$1.MEDIA_SEGMENT, 'video');

      var lastSample = mp4Samples[mp4Samples.length - 1];
      this._videoNextDts = lastSample.dts + lastSample.duration;
      track.samples = [];
      track.length = 0;
    }
  }, {
    key: '_remuxAudio',
    value: function _remuxAudio(track) {
      var _ref = track || {},
          samples = _ref.samples;

      var firstDts = -1;
      var mp4Samples = [];

      var initSegment = null;
      var mdatBox = {
        samples: []
      };
      if (!samples || !samples.length) {
        return;
      }

      var maxLoop = 10000;
      var isFirstDtsInited = false;
      while (samples.length && maxLoop-- > 0) {
        // console.log('mark3')
        var sample = samples.shift();
        var data = sample.data,
            options = sample.options;

        if (!this.isFirstAudio && options && options.meta) {
          initSegment = this.remuxInitSegment('audio', options.meta);
          options.meta = null;
          samples.unshift(sample);
          if (!options.isContinue) {
            this.resetDtsBase();
          }
          break;
        }

        var dts = sample.dts - this._dtsBase;
        var originDts = dts;
        if (!isFirstDtsInited) {
          firstDts = dts;
          isFirstDtsInited = true;
        }

        var sampleDuration = 0;
        if (sample.duration) {
          sampleDuration = sample.duration;
        } else if (this.audioMeta.refSampleDurationFixed) {
          sampleDuration = this.audioMeta.refSampleDurationFixed;
        } else if (samples.length >= 1) {
          var nextDts = samples[0].dts - this._dtsBase;
          sampleDuration = nextDts - dts;
        } else {
          if (mp4Samples.length >= 1) {
            // use second last sample duration
            sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
          } else {
            // the only one sample, use reference sample duration
            sampleDuration = this.audioMeta.refSampleDuration;
          }
        }

        // console.log(`audio dts ${dts}`, `pts ${dts}`, `duration ${sampleDuration}`)
        this.audioAllDuration += sampleDuration;
        var mp4Sample = {
          dts: dts,
          pts: dts,
          cts: 0,
          size: data.byteLength,
          duration: sample.duration ? sample.duration : sampleDuration,
          flags: {
            isLeading: 0,
            dependsOn: 2,
            isDependedOn: 1,
            hasRedundancy: 0,
            isNonSync: 0
          },
          isKeyframe: true,
          originDts: originDts,
          type: 'audio'
        };

        var mdatSample = {
          buffer: [],
          size: 0
        };
        mdatSample.buffer.push(data);
        mdatSample.size += data.byteLength;

        mdatBox.samples.push(mdatSample);

        mp4Samples.push(mp4Sample);
      }

      var moofMdat = new Buffer$1();

      if (mp4Samples.length) {
        var moof = Fmp4.moof({
          id: track.meta.id,
          time: firstDts,
          samples: mp4Samples
        });
        var mdat = Fmp4.mdat(mdatBox);
        moofMdat.write(moof, mdat);

        this.writeToSource('audio', moofMdat);
      }

      if (initSegment) {
        this.writeToSource('audio', initSegment);
        if (samples.length) {
          // second part of stream change
          track.samples = samples;
          return this._remuxAudio(track);
        }
      }

      this.isFirstAudio = false;
      this.emit(REMUX_EVENTS$1.MEDIA_SEGMENT, 'audio', moofMdat);

      var lastSample = mp4Samples[mp4Samples.length - 1];
      this._videoNextDts = lastSample.dts + lastSample.duration;
      track.samples = [];
      track.length = 0;
    }
  }, {
    key: 'writeToSource',
    value: function writeToSource(type, buffer) {
      var presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
      var source = presourcebuffer.getSource(type);
      if (!source) {
        source = presourcebuffer.createSource(type);
      }

      source.data.push(buffer);
    }
  }, {
    key: 'initSilentAudio',
    value: function initSilentAudio(dts, duration) {
      var unit = Mp4Remuxer.getSilentFrame(this._audioMeta.channelCount);
      return {
        dts: dts,
        pts: dts,
        cts: 0,
        duration: duration,
        unit: unit,
        size: unit.byteLength,
        originDts: dts,
        type: 'video'
      };
    }
  }, {
    key: 'videoMeta',
    get: function get() {
      return this._context.getInstance('TRACKS').videoTrack.meta;
    }
  }, {
    key: 'audioMeta',
    get: function get() {
      return this._context.getInstance('TRACKS').audioTrack.meta;
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
}();

var Remuxer = {
  Mp4Remuxer: Mp4Remuxer
};

var _createClass$e = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$e(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Reference: https://tools.ietf.org/html/rfc8216#section-4.3
 */
var M3U8Parser = function () {
  function M3U8Parser() {
    _classCallCheck$e(this, M3U8Parser);
  }

  _createClass$e(M3U8Parser, null, [{
    key: 'parse',
    value: function parse(text) {
      var baseurl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var ret = {
        duration: 0
      };
      if (!text || !text.split) {
        return;
      }
      var refs = text.split(/\r|\n/);
      refs = refs.filter(function (ref) {
        return ref;
      });
      var ref = refs.shift();
      if (!ref.match('#EXTM3U')) {
        throw new Error('Invalid m3u8 file: not "#EXTM3U"');
      }
      ref = refs.shift();
      var nextDiscontinue = false;
      while (ref) {
        var refm = ref.match(/#(.[A-Z|-]*):(.*)/);
        var refd = ref.match(/#(.[A-Z|-]*)/);
        if (refd && refm && refm.length > 2) {
          switch (refm[1]) {
            case 'EXT-X-VERSION':
              ret.version = parseInt(refm[2]);
              break;
            case 'EXT-X-MEDIA-SEQUENCE':
              ret.sequence = parseInt(refm[2]);
              break;
            case 'EXT-X-TARGETDURATION':
              ret.targetduration = parseFloat(refm[2]);
              break;
            case 'EXTINF':
              M3U8Parser.parseFrag(refm, refs, ret, baseurl, nextDiscontinue);
              nextDiscontinue = false;
              break;
            case 'EXT-X-KEY':
              M3U8Parser.parseDecrypt(refm[2], ret);
              break;
          }
        }if (refd && refd.length > 1) {
          switch (refd[1]) {
            case 'EXT-X-DISCONTINUITY':
              nextDiscontinue = true;
              break;
          }
        }
        ref = refs.shift();
      }
      return ret;
    }
  }, {
    key: 'parseFrag',
    value: function parseFrag(refm, refs, ret, baseurl, discontinue) {
      if (!ret.frags) {
        ret.frags = [];
      }

      var freg = {
        start: ret.duration,
        duration: parseFloat(refm[2]) * 1000
      };

      ret.duration += freg.duration;
      var nextline = refs.shift();
      if (nextline.match(/#(.*):(.*)/)) {
        nextline = refs.shift();
      }
      if (nextline.length > 0 && nextline.charAt(0) === '/' && baseurl.match(/.*\/\/.*\.\w+/g)) {
        baseurl = baseurl.match(/.*\/\/.*\.\w+/g)[0];
      }
      if (nextline.match(/.*:\/\/.*/)) {
        freg.url = nextline;
      } else {
        freg.url = baseurl + nextline;
      }
      freg.discontinue = discontinue;
      ret.frags.push(freg);
    }
  }, {
    key: 'parseURL',
    value: function parseURL(url) {
      var baseurl = '';
      var urls = url.match(/(.*\/).*\.m3u8/);
      if (urls && urls.length > 0) {
        for (var i = 0; i < urls.length; i++) {
          if (urls[i].match(/.*\/$/g) && urls[i].length > baseurl.length) {
            baseurl = urls[i];
          }
        }
      }
      return baseurl;
    }
  }, {
    key: 'parseDecrypt',
    value: function parseDecrypt(refm, ret) {
      ret.encrypt = {};
      var refs = refm.split(',');
      for (var i in refs) {
        var cmd = refs[i];
        if (cmd.match(/METHOD=(.*)/)) {
          ret.encrypt.method = cmd.match(/METHOD=(.*)/)[1];
        }
        if (cmd.match(/URI="(.*)"/)) {
          ret.encrypt.uri = cmd.match(/URI="(.*)"/)[1];
        }

        if (cmd.match(/IV=0x(.*)/)) {
          var iv = cmd.match(/IV=0x(.*)/)[1];
          var length = Math.ceil(iv.length / 2);
          ret.encrypt.ivb = new Uint8Array(length);
          for (var _i = length - 1; _i >= 0; _i--) {
            var im = parseInt(iv.substr(_i * 2, 2), 16);
            ret.encrypt.ivb[_i] = im;
          }
          ret.encrypt.iv = iv;
        }
      }    }
  }]);

  return M3U8Parser;
}();

var _createClass$f = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$f(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Golomb = function () {
  function Golomb(uint8array) {
    _classCallCheck$f(this, Golomb);

    this.TAG = 'Golomb';
    this._buffer = uint8array;
    this._bufferIndex = 0;
    this._totalBytes = uint8array.byteLength;
    this._totalBits = uint8array.byteLength * 8;
    this._currentWord = 0;
    this._currentWordBitsLeft = 0;
  }

  _createClass$f(Golomb, [{
    key: 'destroy',
    value: function destroy() {
      this._buffer = null;
    }
  }, {
    key: '_fillCurrentWord',
    value: function _fillCurrentWord() {
      var bufferBytesLeft = this._totalBytes - this._bufferIndex;

      var bytesRead = Math.min(4, bufferBytesLeft);
      var word = new Uint8Array(4);
      word.set(this._buffer.subarray(this._bufferIndex, this._bufferIndex + bytesRead));
      this._currentWord = new DataView(word.buffer).getUint32(0);

      this._bufferIndex += bytesRead;
      this._currentWordBitsLeft = bytesRead * 8;
    }
  }, {
    key: 'readBits',
    value: function readBits(size) {
      var bits = Math.min(this._currentWordBitsLeft, size); // :uint
      var valu = this._currentWord >>> 32 - bits;
      if (size > 32) {
        throw new Error('Cannot read more than 32 bits at a time');
      }
      this._currentWordBitsLeft -= bits;
      if (this._currentWordBitsLeft > 0) {
        this._currentWord <<= bits;
      } else if (this._totalBytes - this._bufferIndex > 0) {
        this._fillCurrentWord();
      }

      bits = size - bits;
      if (bits > 0 && this._currentWordBitsLeft) {
        return valu << bits | this.readBits(bits);
      } else {
        return valu;
      }
    }
  }, {
    key: 'readBool',
    value: function readBool() {
      return this.readBits(1) === 1;
    }
  }, {
    key: 'readByte',
    value: function readByte() {
      return this.readBits(8);
    }
  }, {
    key: '_skipLeadingZero',
    value: function _skipLeadingZero() {
      var zeroCount = void 0;
      for (zeroCount = 0; zeroCount < this._currentWordBitsLeft; zeroCount++) {
        if ((this._currentWord & 0x80000000 >>> zeroCount) !== 0) {
          this._currentWord <<= zeroCount;
          this._currentWordBitsLeft -= zeroCount;
          return zeroCount;
        }
      }
      this._fillCurrentWord();
      return zeroCount + this._skipLeadingZero();
    }
  }, {
    key: 'readUEG',
    value: function readUEG() {
      // unsigned exponential golomb
      var leadingZeros = this._skipLeadingZero();
      return this.readBits(leadingZeros + 1) - 1;
    }
  }, {
    key: 'readSEG',
    value: function readSEG() {
      // signed exponential golomb
      var value = this.readUEG();
      if (value & 0x01) {
        return value + 1 >>> 1;
      } else {
        return -1 * (value >>> 1);
      }
    }
  }]);

  return Golomb;
}();

var _createClass$g = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$g(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var SPSParser = function () {
  function SPSParser() {
    _classCallCheck$g(this, SPSParser);
  }

  _createClass$g(SPSParser, null, [{
    key: '_ebsp2rbsp',
    value: function _ebsp2rbsp(uint8array) {
      var src = uint8array;
      var srcLength = src.byteLength;
      var dst = new Uint8Array(srcLength);
      var dstIdx = 0;

      for (var i = 0; i < srcLength; i++) {
        if (i >= 2) {
          if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
            continue;
          }
        }
        dst[dstIdx] = src[i];
        dstIdx++;
      }

      return new Uint8Array(dst.buffer, 0, dstIdx);
    }
  }, {
    key: 'parseSPS',
    value: function parseSPS(uint8array) {
      var rbsp = SPSParser._ebsp2rbsp(uint8array);
      var gb = new Golomb(rbsp);

      gb.readByte();
      var profileIdc = gb.readByte();
      gb.readByte();
      var levelIdc = gb.readByte();
      gb.readUEG();

      var profile_string = SPSParser.getProfileString(profileIdc);
      var level_string = SPSParser.getLevelString(levelIdc);
      var chroma_format_idc = 1;
      var chroma_format = 420;
      var chroma_format_table = [0, 420, 422, 444];
      var bit_depth = 8;

      if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128 || profileIdc === 138 || profileIdc === 144) {
        chroma_format_idc = gb.readUEG();
        if (chroma_format_idc === 3) {
          gb.readBits(1);
        }
        if (chroma_format_idc <= 3) {
          chroma_format = chroma_format_table[chroma_format_idc];
        }

        bit_depth = gb.readUEG() + 8;
        gb.readUEG();
        gb.readBits(1);
        if (gb.readBool()) {
          var scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;
          for (var i = 0; i < scaling_list_count; i++) {
            if (gb.readBool()) {
              if (i < 6) {
                SPSParser._skipScalingList(gb, 16);
              } else {
                SPSParser._skipScalingList(gb, 64);
              }
            }
          }
        }
      }
      gb.readUEG();
      var pic_order_cnt_type = gb.readUEG();
      if (pic_order_cnt_type === 0) {
        gb.readUEG();
      } else if (pic_order_cnt_type === 1) {
        gb.readBits(1);
        gb.readSEG();
        gb.readSEG();
        var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
        for (var _i = 0; _i < num_ref_frames_in_pic_order_cnt_cycle; _i++) {
          gb.readSEG();
        }
      }
      gb.readUEG();
      gb.readBits(1);

      var pic_width_in_mbs_minus1 = gb.readUEG();
      var pic_height_in_map_units_minus1 = gb.readUEG();

      var frame_mbs_only_flag = gb.readBits(1);
      if (frame_mbs_only_flag === 0) {
        gb.readBits(1);
      }
      gb.readBits(1);

      var frame_crop_left_offset = 0;
      var frame_crop_right_offset = 0;
      var frame_crop_top_offset = 0;
      var frame_crop_bottom_offset = 0;

      var frame_cropping_flag = gb.readBool();
      if (frame_cropping_flag) {
        frame_crop_left_offset = gb.readUEG();
        frame_crop_right_offset = gb.readUEG();
        frame_crop_top_offset = gb.readUEG();
        frame_crop_bottom_offset = gb.readUEG();
      }

      var par_width = 1,
          par_height = 1;
      var fps = 0,
          fps_fixed = true,
          fps_num = 0,
          fps_den = 0;

      var vui_parameters_present_flag = gb.readBool();
      if (vui_parameters_present_flag) {
        if (gb.readBool()) {
          // aspect_ratio_info_present_flag
          var aspect_ratio_idc = gb.readByte();
          var par_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
          var par_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

          if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
            par_width = par_w_table[aspect_ratio_idc - 1];
            par_height = par_h_table[aspect_ratio_idc - 1];
          } else if (aspect_ratio_idc === 255) {
            par_width = gb.readByte() << 8 | gb.readByte();
            par_height = gb.readByte() << 8 | gb.readByte();
          }
        }

        if (gb.readBool()) {
          gb.readBool();
        }
        if (gb.readBool()) {
          gb.readBits(4);
          if (gb.readBool()) {
            gb.readBits(24);
          }
        }
        if (gb.readBool()) {
          gb.readUEG();
          gb.readUEG();
        }
        if (gb.readBool()) {
          var num_units_in_tick = gb.readBits(32);
          var time_scale = gb.readBits(32);
          fps_fixed = gb.readBool();

          fps_num = time_scale;
          fps_den = num_units_in_tick * 2;
          fps = fps_num / fps_den;
        }
      }

      var parScale = 1;
      if (par_width !== 1 || par_height !== 1) {
        parScale = par_width / par_height;
      }

      var crop_unit_x = 0,
          crop_unit_y = 0;
      if (chroma_format_idc === 0) {
        crop_unit_x = 1;
        crop_unit_y = 2 - frame_mbs_only_flag;
      } else {
        var sub_wc = chroma_format_idc === 3 ? 1 : 2;
        var sub_hc = chroma_format_idc === 1 ? 2 : 1;
        crop_unit_x = sub_wc;
        crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
      }

      var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
      var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);

      codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
      codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;

      var present_width = Math.ceil(codec_width * parScale);

      gb.destroy();
      gb = null;

      return {
        profile_string: profile_string,
        level_string: level_string,
        bit_depth: bit_depth,
        chroma_format: chroma_format,
        chroma_format_string: SPSParser.getChromaFormatString(chroma_format),

        frame_rate: {
          fixed: fps_fixed,
          fps: fps,
          fps_den: fps_den,
          fps_num: fps_num
        },

        par_ratio: {
          width: par_width,
          height: par_height
        },

        codec_size: {
          width: codec_width,
          height: codec_height
        },

        present_size: {
          width: present_width,
          height: codec_height
        }
      };
    }
  }, {
    key: '_skipScalingList',
    value: function _skipScalingList(gb, count) {
      var last_scale = 8,
          next_scale = 8;
      var delta_scale = 0;
      for (var i = 0; i < count; i++) {
        if (next_scale !== 0) {
          delta_scale = gb.readSEG();
          next_scale = (last_scale + delta_scale + 256) % 256;
        }
        last_scale = next_scale === 0 ? last_scale : next_scale;
      }
    }
  }, {
    key: 'getProfileString',
    value: function getProfileString(profileIdc) {
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
    key: 'getLevelString',
    value: function getLevelString(levelIdc) {
      return (levelIdc / 10).toFixed(1);
    }
  }, {
    key: 'getChromaFormatString',
    value: function getChromaFormatString(chroma) {
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
  }, {
    key: 'toVideoMeta',
    value: function toVideoMeta(spsConfig) {
      var meta = {};
      if (spsConfig && spsConfig.codec_size) {
        meta.codecWidth = spsConfig.codec_size.width;
        meta.codecHeight = spsConfig.codec_size.height;
        meta.presentWidth = spsConfig.present_size.width;
        meta.presentHeight = spsConfig.present_size.height;
      }

      meta.profile = spsConfig.profile_string;
      meta.level = spsConfig.level_string;
      meta.bitDepth = spsConfig.bit_depth;
      meta.chromaFormat = spsConfig.chroma_format;

      meta.parRatio = {
        width: spsConfig.par_ratio.width,
        height: spsConfig.par_ratio.height
      };

      meta.frameRate = spsConfig.frame_rate;

      var fpsDen = meta.frameRate.fps_den;
      var fpsNum = meta.frameRate.fps_num;
      meta.refSampleDuration = Math.floor(meta.timescale * (fpsDen / fpsNum));
    }
  }]);

  return SPSParser;
}();

var _createClass$h = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$h(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Nalunit = function () {
  function Nalunit() {
    _classCallCheck$h(this, Nalunit);
  }

  _createClass$h(Nalunit, null, [{
    key: 'getNalunits',
    value: function getNalunits(buffer) {
      if (buffer.length - buffer.position < 4) {
        return [];
      }

      var buf = buffer.dataview;
      var position = buffer.position;
      if (buf.getInt32(position) === 1 || buf.getInt16(position) === 0 && buf.getInt8(position + 2) === 1) {
        return Nalunit.getAnnexbNals(buffer);
      } else {
        return Nalunit.getAvccNals(buffer);
      }
    }
  }, {
    key: 'getAnnexbNals',
    value: function getAnnexbNals(buffer) {
      var nals = [];
      var position = Nalunit.getHeaderPositionAnnexB(buffer);
      var start = position.pos;
      var end = start;
      while (start < buffer.length - 4) {
        var header = buffer.buffer.slice(start, start + position.headerLength);
        if (position.pos === buffer.position) {
          buffer.skip(position.headerLength);
        }
        position = Nalunit.getHeaderPositionAnnexB(buffer);
        end = position.pos;
        var body = new Uint8Array(buffer.buffer.slice(start + header.byteLength, end));
        var unit = { header: header, body: body };
        Nalunit.analyseNal(unit);
        nals.push(unit);
        buffer.skip(end - buffer.position);
        start = end;
      }
      return nals;
    }
  }, {
    key: 'getAvccNals',
    value: function getAvccNals(buffer) {
      var nals = [];
      while (buffer.position < buffer.length - 4) {
        var length = buffer.dataview.getInt32();
        if (buffer.length - buffer.position >= length) {
          var header = buffer.buffer.slice(buffer.position, buffer.position + 4);
          buffer.skip(4);
          var body = buffer.buffer.slice(buffer.position, buffer.position + length);
          buffer.skip(length);
          var unit = { header: header, body: body };
          Nalunit.analyseNal(unit);
          nals.push(unit);
        } else {
          break;
        }
      }
      return nals;
    }
  }, {
    key: 'analyseNal',
    value: function analyseNal(unit) {
      var type = unit.body[0] & 0x1f;
      switch (type) {
        case 1:
          // NDR
          unit.ndr = true;
          break;
        case 5:
          // IDR
          unit.idr = true;
          break;
        case 6:
          // SEI
          break;
        case 7:
          // SPS
          unit.sps = SPSParser.parseSPS(unit.body);
          break;
        case 8:
          // PPS
          unit.pps = true;
          break;
      }
    }
  }, {
    key: 'getHeaderPositionAnnexB',
    value: function getHeaderPositionAnnexB(buffer) {
      // seperate
      var pos = buffer.position;
      var headerLength = 0;
      while (headerLength !== 3 && headerLength !== 4 && pos < buffer.length - 4) {
        if (buffer.dataview.getInt16(pos) === 0) {
          if (buffer.dataview.getInt16(pos + 2) === 1) {
            // 0x000001
            headerLength = 4;
          } else if (buffer.dataview.getInt8(pos + 2) === 1) {
            headerLength = 3;
          } else {
            pos++;
          }
        } else {
          pos++;
        }
      }

      if (pos === buffer.length - 4) {
        if (buffer.dataview.getInt16(pos) === 0) {
          if (buffer.dataview.getInt16(pos + 2) === 1) {
            // 0x000001
            headerLength = 4;
          }
        } else {
          pos++;
          if (buffer.dataview.getInt16(pos) === 0 && buffer.dataview.getInt8(pos) === 1) {
            // 0x0000001
            headerLength = 3;
          } else {
            pos = buffer.length;
          }
        }
      }
      return { pos: pos, headerLength: headerLength };
    }
  }, {
    key: 'getAvcc',
    value: function getAvcc(sps, pps) {
      var ret = new Uint8Array(sps.byteLength + pps.byteLength + 11);
      ret[0] = 0x01;
      ret[1] = sps[1];
      ret[2] = sps[2];
      ret[3] = sps[3];
      ret[4] = 255;
      ret[5] = 225;

      var offset = 6;

      ret.set(new Uint8Array([sps.byteLength >>> 8 & 0xff, sps.byteLength & 0xff]), offset);
      offset += 2;
      ret.set(sps, offset);
      offset += sps.byteLength;

      ret[offset] = 1;
      offset++;

      ret.set(new Uint8Array([pps.byteLength >>> 8 & 0xff, pps.byteLength & 0xff]), offset);
      offset += 2;
      ret.set(pps, offset);
      return ret;
    }
  }]);

  return Nalunit;
}();

var _createClass$i = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$i(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var AAC = function () {
  function AAC() {
    _classCallCheck$i(this, AAC);
  }

  _createClass$i(AAC, null, [{
    key: 'getSilentFrame',
    value: function getSilentFrame(codec, channelCount) {
      if (codec === 'mp4a.40.2') {
        // handle LC-AAC
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
      } else {
        // handle HE-AAC (mp4a.40.5 / mp4a.40.29)
        if (channelCount === 1) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0:d=0.05" -c:a libfdk_aac -profile:a aac_he -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x4e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x1c, 0x6, 0xf1, 0xc1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        } else if (channelCount === 2) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        } else if (channelCount === 3) {
          // ffmpeg -y -f lavfi -i "aevalsrc=0|0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
          return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
        }
      }
      return null;
    }
  }]);

  return AAC;
}();

var _createClass$j = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$j(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var REMUX_EVENTS$2 = EVENTS.REMUX_EVENTS,
    LOADER_EVENTS$1 = EVENTS.LOADER_EVENTS;

var Compatibility = function () {
  function Compatibility() {
    _classCallCheck$j(this, Compatibility);

    this.nextAudioDts = 0; // 模拟下一段音频数据的dts
    this.nextVideoDts = 0; // 模拟下一段视频数据的dts

    this.lastAudioSamplesLen = 0; // 上一段音频数据的长度
    this.lastVideoSamplesLen = 0; // 上一段视频数据的长度

    this.lastVideoDts = undefined; // 上一段音频数据的长度
    this.lastAudioDts = undefined; // 上一段视频数据的长度

    this.allAudioSamplesCount = 0; // 音频总数据量(原始帧)
    this.allVideoSamplesCount = 0; // 视频总数据量(原始帧)

    this._firstAudioSample = null;
    this._firstVideoSample = null;

    this.filledAudioSamples = []; // 补充音频帧（）
    this.filledVideoSamples = []; // 补充视频帧（）

    this.videoLastSample = null;
    this.audioLastSample = null; // stash last sample for duration compat

    this._videoLargeGap = 0;
    this._audioLargeGap = 0;
  }

  _createClass$j(Compatibility, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.before(REMUX_EVENTS$2.REMUX_MEDIA, this.doFix.bind(this));
      this.on(LOADER_EVENTS$1.LOADER_COMPLETE, function () {
        if (_this.videoLastSample) {
          _this.videoTrack.samples.unshift(_this.videoLastSample);
        }
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.nextAudioDts = null; // 估算下一段音频数据的dts
      this.nextVideoDts = null; // 估算下一段视频数据的dts

      this.lastAudioSamplesLen = 0; // 上一段音频数据的长度
      this.lastVideoSamplesLen = 0; // 上一段视频数据的长度

      this.lastVideoDts = undefined; // 上一段音频数据的长度
      this.lastAudioDts = undefined; // 上一段视频数据的长度

      // this.allAudioSamplesCount = 0 // 音频总数据量(原始帧)
      // this.allVideoSamplesCount = 0 // 视频总数据量(原始帧)

      // this._firstAudioSample = null
      // this._firstVideoSample = null
      this.videoLastSample = null;
      this.audioLastSample = null;

      this.filledAudioSamples = []; // 补充音频帧（）
      this.filledVideoSamples = []; // 补充视频帧（）
    }
  }, {
    key: 'doFix',
    value: function doFix() {
      var _getFirstSample = this.getFirstSample(),
          isFirstAudioSamples = _getFirstSample.isFirstAudioSamples,
          isFirstVideoSamples = _getFirstSample.isFirstVideoSamples;

      this.recordSamplesCount();

      if (this._firstVideoSample) {
        this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples);
      }
      if (this._firstAudioSample) {
        this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples);
      }

      var _Compatibility$detact = Compatibility.detactChangeStream(this.videoTrack.samples),
          videoChanged = _Compatibility$detact.changed,
          videoChangedIdx = _Compatibility$detact.changedIdx;

      if (videoChanged && !isFirstAudioSamples) {
        this.fixChangeStreamVideo(videoChangedIdx);
      } else {
        this.doFixVideo(isFirstVideoSamples);
      }

      var _Compatibility$detact2 = Compatibility.detactChangeStream(this.audioTrack.samples),
          audioChanged = _Compatibility$detact2.changed,
          audioChangedIdx = _Compatibility$detact2.changedIdx;

      if (audioChanged) {
        this.fixChangeStreamAudio(audioChangedIdx);
      } else {
        this.doFixAudio(isFirstAudioSamples);
      }

      this.removeInvalidSamples();
    }
  }, {
    key: 'doFixVideo',
    value: function doFixVideo(first, streamChangeStart) {
      var _videoTrack = this.videoTrack,
          videoSamples = _videoTrack.samples,
          meta = _videoTrack.meta;

      // console.log('next video', this.nextVideoDts)

      for (var i = 0, len = videoSamples.length; i < len; i++) {
        var sample = videoSamples[i];
        sample.originDts = sample.dts;
      }

      if (meta.frameRate && meta.frameRate.fixed === false) {
        return;
      }

      if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
        return;
      }

      // console.log(`video lastSample, ${videoSamples[videoSamples.length - 1].dts}`)

      var firstSample = videoSamples[0];

      // step0.修复hls流出现巨大gap，需要强制重定位的问题
      if (this._videoLargeGap > 0) {
        Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
      }

      if (firstSample.dts !== this._firstVideoSample.dts && streamChangeStart) {
        if (streamChangeStart) {
          this.nextVideoDts = streamChangeStart; // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
        }

        this._videoLargeGap = this.nextVideoDts - firstSample.dts;
        Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
      }

      // step1. 修复与audio首帧差距太大的问题
      if (first && this._firstAudioSample) {
        var videoFirstDts = this._firstVideoSample.originDts;
        var audioFirstDts = this._firstAudioSample.originDts || this._firstAudioSample.dts;
        var gap = videoFirstDts - audioFirstDts;
        if (gap > 2 * meta.refSampleDuration && gap < 10 * meta.refSampleDuration) {
          var fillCount = Math.floor(gap / meta.refSampleDuration);

          for (var _i = 0; _i < fillCount; _i++) {
            var clonedFirstSample = Object.assign({}, firstSample); // 视频头部帧缺失需要复制第一帧
            // 重新计算sample的dts和pts
            clonedFirstSample.dts = videoFirstDts - (_i + 1) * meta.refSampleDuration;
            clonedFirstSample.pts = clonedFirstSample.dts + clonedFirstSample.cts;

            videoSamples.unshift(clonedFirstSample);

            this.filledVideoSamples.push({
              dts: clonedFirstSample.dts,
              size: clonedFirstSample.data.byteLength
            });
          }
          this._firstVideoSample = this.filledVideoSamples[0] || this._firstVideoSample;
        } else if (gap < -2 * meta.refSampleDuration) {
          this._videoLargeGap = -1 * gap;
          Compatibility.doFixLargeGap(videoSamples, -1 * gap);
        }
      }

      var curLastSample = videoSamples.pop();
      if (videoSamples.length) {
        videoSamples[videoSamples.length - 1].duration = curLastSample.dts - videoSamples[videoSamples.length - 1].dts;
      }

      if (this.videoLastSample) {
        var videoLastSample = this.videoLastSample;
        videoLastSample.duration = firstSample.dts - videoLastSample.dts;
        videoSamples.unshift(this.videoLastSample);
      }

      this.videoLastSample = curLastSample;

      this.videoTrack.samples = videoSamples;
    }
  }, {
    key: 'doFixAudio',
    value: function doFixAudio(first, streamChangeStart) {
      var _audioTrack = this.audioTrack,
          audioSamples = _audioTrack.samples,
          meta = _audioTrack.meta;

      if (!audioSamples || !audioSamples.length) {
        return;
      }

      // console.log('next audio', this.nextAudioDts)
      for (var i = 0, len = audioSamples.length; i < len; i++) {
        var sample = audioSamples[i];
        sample.originDts = sample.dts;
      }

      // console.log(`audio lastSample, ${audioSamples[audioSamples.length - 1].dts}`)

      var samplesLen = audioSamples.length;
      var silentFrame = AAC.getSilentFrame(meta.codec, meta.channelCount);

      var firstSample = this._firstAudioSample;

      var _firstSample = audioSamples[0];
      // 对audioSamples按照dts做排序
      // audioSamples = Compatibility.sortAudioSamples(audioSamples)
      if (this._audioLargeGap > 0) {
        Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap);
      }

      if (_firstSample.dts !== this._firstAudioSample.dts && (streamChangeStart || Compatibility.detectLargeGap(this.nextAudioDts, _firstSample))) {
        if (streamChangeStart) {
          this.nextAudioDts = streamChangeStart; // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
        }
        this._audioLargeGap = this.nextAudioDts - _firstSample.dts;
        Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap);
      }
      // step0. 首帧与video首帧间距大的问题
      if (this._firstVideoSample && first) {
        var videoFirstPts = this._firstVideoSample.originDts || this._firstVideoSample.dts;
        var _gap = firstSample.dts - videoFirstPts;
        if (_gap > meta.refSampleDuration && _gap < 10 * meta.refSampleDuration) {
          var silentSampleCount = Math.floor((firstSample.dts - videoFirstPts) / meta.refSampleDuration);

          for (var _i2 = 0; _i2 < silentSampleCount; _i2++) {
            var silentSample = {
              data: silentFrame,
              datasize: silentFrame.byteLength,
              dts: firstSample.dts - (_i2 + 1) * meta.refSampleDuration,
              filtered: 0
            };

            audioSamples.unshift(silentSample);

            this.filledAudioSamples.push({
              dts: silentSample.dts,
              size: silentSample.data.byteLength
            });
          }
          this._firstAudioSample = this.filledAudioSamples[0] || this._firstAudioSample;
        } else if (_gap < -1 * meta.refSampleDuration) {
          this._audioLargeGap = -1 * _gap;
          Compatibility.doFixLargeGap(audioSamples, -1 * _gap);
        }
      }

      var gap = void 0;
      var firstDts = audioSamples[0].dts;

      if (this.nextAudioDts) {
        // step1. 处理samples段之间的丢帧情况
        // 当发现duration差距大于1帧时进行补帧
        gap = firstDts - this.nextAudioDts;
        var absGap = Math.abs(gap);

        if (absGap > meta.refSampleDuration && samplesLen === 1 && this.lastAudioSamplesLen === 1) {
          meta.refSampleDurationFixed = undefined;
        }

        if (gap > 2 * meta.refSampleDuration && gap < 10 * meta.refSampleDuration) {
          if (samplesLen === 1 && this.lastAudioSamplesLen === 1) {
            // 如果sample的length一直是1，而且一直不符合refSampleDuration，需要动态修改refSampleDuration
            meta.refSampleDurationFixed = meta.refSampleDurationFixed !== undefined ? meta.refSampleDurationFixed + gap : meta.refSampleDuration + gap;
          } else {
            var silentFrameCount = Math.floor(gap / meta.refSampleDuration);

            for (var _i3 = 0; _i3 < silentFrameCount; _i3++) {
              var computed = firstDts - (_i3 + 1) * meta.refSampleDuration;
              var _silentSample = Object.assign({}, audioSamples[0], {
                dts: computed > this.nextAudioDts ? computed : this.nextAudioDts
              });

              this.filledAudioSamples.push({
                dts: _silentSample.dts,
                size: _silentSample.data.byteLength
              });
              this.audioTrack.samples.unshift(_silentSample);
            }
          }
        } else if (absGap <= meta.refSampleDuration && absGap > 0) {
          // 当差距比较小的时候将音频帧重定位
          // console.log('重定位音频帧dts', audioSamples[0].dts, this.nextAudioDts)
          audioSamples[0].dts = this.nextAudioDts;
          audioSamples[0].pts = this.nextAudioDts;
        } else if (gap < 0) {
          Compatibility.doFixLargeGap(audioSamples, -1 * gap);
        }
      }
      var lastOriginDts = audioSamples[audioSamples.length - 1].originDts;
      var lastDts = audioSamples[audioSamples.length - 1].dts;
      var lastSampleDuration = audioSamples.length >= 2 ? lastOriginDts - audioSamples[audioSamples.length - 2].originDts : meta.refSampleDuration;

      this.lastAudioSamplesLen = samplesLen;
      this.nextAudioDts = meta.refSampleDurationFixed ? lastDts + meta.refSampleDurationFixed : lastDts + lastSampleDuration;
      this.lastAudioDts = lastDts;

      audioSamples[audioSamples.length - 1].duration = lastSampleDuration;

      // step3. 修复samples段内部的dts异常问题
      for (var _i4 = 0, _len = audioSamples.length; _i4 < _len; _i4++) {
        var current = audioSamples[_i4];
        var next = audioSamples[_i4 + 1];

        if (!next) {
          break;
        }

        var duration = next.dts - current.dts;
        audioSamples[_i4].duration = duration;
        /*
        if (duration > (2 * meta.refSampleDuration)) {
          // 两帧之间间隔太大，需要补空白帧
          /**
          let silentFrameCount = Math.floor(duration / meta.refSampleDuration)
          let frameIdx = 0
           while (frameIdx < silentFrameCount) {
            const silentSample = {
              data: silentFrame,
              datasize: silentFrame.byteLength,
              dts: current.dts + (frameIdx + 1) * meta.refSampleDuration,
              filtered: 0,
              isSilent: true
            }
             audioSamples.splice(i, 0, silentSample)
             this.filledAudioSamples.push({
              dts: silentSample.dts,
              size: silentSample.data.byteLength
            })
             frameIdx++
            i++ // 不对静音帧做比较
          }
        } */
      }

      this.audioTrack.samples = Compatibility.sortAudioSamples(audioSamples);
    }
  }, {
    key: 'fixChangeStreamVideo',
    value: function fixChangeStreamVideo(changeIdx) {
      var _videoTrack2 = this.videoTrack,
          samples = _videoTrack2.samples,
          meta = _videoTrack2.meta;

      var prevDts = changeIdx === 0 ? this.getStreamChangeStart(samples[0]) : samples[changeIdx - 1].dts;
      var curDts = samples[changeIdx].dts;
      var isContinue = Math.abs(prevDts - curDts) <= 2 * meta.refSampleDuration;

      if (isContinue) {
        if (!samples[changeIdx].options) {
          samples[changeIdx].options = {
            isContinue: true
          };
        } else {
          samples[changeIdx].options.isContinue = true;
        }
        return this.doFixVideo(false);
      }

      var firstPartSamples = samples.slice(0, changeIdx);
      var secondPartSamples = samples.slice(changeIdx);
      var firstSample = samples[0];

      var changeSample = secondPartSamples[0];
      var firstPartDuration = changeSample.dts - firstSample.dts;
      var streamChangeStart = firstSample.options && firstSample.options.start + firstPartDuration ? firstSample.options.start : null;

      this.videoTrack.samples = samples.slice(0, changeIdx);

      this.doFixVideo(false);

      this.videoTrack.samples = samples.slice(changeIdx);

      this.doFixVideo(false, streamChangeStart);

      this.videoTrack.samples = firstPartSamples.concat(secondPartSamples);
    }
  }, {
    key: 'fixChangeStreamAudio',
    value: function fixChangeStreamAudio(changeIdx) {
      var _audioTrack2 = this.audioTrack,
          samples = _audioTrack2.samples,
          meta = _audioTrack2.meta;

      var prevDts = changeIdx === 0 ? this.getStreamChangeStart(samples[0]) : samples[changeIdx - 1].dts;
      var curDts = samples[changeIdx].dts;
      var isContinue = Math.abs(prevDts - curDts) <= 2 * meta.refSampleDuration;

      if (isContinue) {
        if (!samples[changeIdx].options) {
          samples[changeIdx].options = {
            isContinue: true
          };
        } else {
          samples[changeIdx].options.isContinue = true;
        }
        return this.doFixAudio(false);
      }

      var firstPartSamples = samples.slice(0, changeIdx);
      var secondPartSamples = samples.slice(changeIdx);
      var firstSample = samples[0];

      var changeSample = secondPartSamples[0];
      var firstPartDuration = changeSample.dts - firstSample.dts;
      var streamChangeStart = firstSample.options && firstSample.options.start + firstPartDuration ? firstSample.options.start : null;

      this.audioTrack.samples = firstPartSamples;

      this.doFixAudio(false);

      this.audioTrack.samples = secondPartSamples;

      this.doFixAudio(false, streamChangeStart);

      this.audioTrack.samples = firstPartSamples.concat(secondPartSamples);
    }
  }, {
    key: 'getFirstSample',
    value: function getFirstSample() {
      // 获取video和audio的首帧数据
      var videoSamples = this.videoTrack.samples;
      var audioSamples = this.audioTrack.samples;

      var isFirstVideoSamples = false;
      var isFirstAudioSamples = false;

      if (!this._firstVideoSample && videoSamples.length) {
        this._firstVideoSample = Compatibility.findFirstVideoSample(videoSamples);
        this.removeInvalidSamples();
        isFirstVideoSamples = true;
      }

      if (!this._firstAudioSample && audioSamples.length) {
        this._firstAudioSample = Compatibility.findFirstAudioSample(audioSamples); // 寻找dts最小的帧作为首个音频帧
        this.removeInvalidSamples();
        isFirstAudioSamples = true;
      }

      return {
        isFirstVideoSamples: isFirstVideoSamples,
        isFirstAudioSamples: isFirstAudioSamples
      };
    }

    /**
     * 在没有refSampleDuration的问题流中，
     */

  }, {
    key: 'fixRefSampleDuration',
    value: function fixRefSampleDuration(meta, samples) {
      var isVideo = meta.type === 'video';
      var allSamplesCount = isVideo ? this.allVideoSamplesCount : this.allAudioSamplesCount;
      var firstDts = isVideo ? this._firstVideoSample.dts : this._firstAudioSample.dts;
      var filledSamplesCount = isVideo ? this.filledVideoSamples.length : this.filledAudioSamples.length;

      if (!meta.refSampleDuration || meta.refSampleDuration <= 0 || Number.isNaN(meta.refSampleDuration)) {
        if (samples.length >= 1) {
          var lastDts = samples[samples.length - 1].dts;

          meta.refSampleDuration = Math.floor((lastDts - firstDts) / (allSamplesCount + filledSamplesCount - 1)); // 将refSampleDuration重置为计算后的平均值
        }
      } else if (meta.refSampleDuration) {
        if (samples.length >= 5) {
          var _lastDts = samples[samples.length - 1].dts;
          var _firstDts = samples[0].dts;
          var durationAvg = (_lastDts - _firstDts) / (samples.length - 1);

          meta.refSampleDuration = Math.floor(Math.abs(meta.refSampleDuration - durationAvg) <= 5 ? meta.refSampleDuration : durationAvg); // 将refSampleDuration重置为计算后的平均值
        }
      }
    }

    /**
     * 记录截止目前一共播放了多少帧
     */

  }, {
    key: 'recordSamplesCount',
    value: function recordSamplesCount() {
      var audioTrack = this.audioTrack,
          videoTrack = this.videoTrack;

      this.allAudioSamplesCount += audioTrack.samples.length;
      this.allVideoSamplesCount += videoTrack.samples.length;
    }

    /**
     * 去除不合法的帧（倒退、重复帧）
     */

  }, {
    key: 'removeInvalidSamples',
    value: function removeInvalidSamples() {
      var _firstVideoSample = this._firstVideoSample,
          _firstAudioSample = this._firstAudioSample;

      if (_firstAudioSample) {
        this.audioTrack.samples = this.audioTrack.samples.filter(function (sample, index) {
          if (sample === _firstAudioSample) {
            return true;
          }
          return sample.dts > _firstAudioSample.dts;
        });
      }

      if (_firstVideoSample) {
        this.videoTrack.samples = this.videoTrack.samples.filter(function (sample, index) {
          if (sample === _firstVideoSample) {
            return true;
          }
          return sample.dts > _firstVideoSample.dts;
        });
      }
    }
  }, {
    key: 'getStreamChangeStart',
    value: function getStreamChangeStart(sample) {
      if (sample.options && sample.options.start) {
        return sample.options.start - this.dtsBase;
      }
      return Infinity;
    }
  }, {
    key: 'tracks',
    get: function get() {
      return this._context.getInstance('TRACKS');
    }
  }, {
    key: 'audioTrack',
    get: function get() {
      if (this.tracks && this.tracks.audioTrack) {
        return this.tracks.audioTrack;
      }
      return {
        samples: [],
        meta: {}
      };
    }
  }, {
    key: 'videoTrack',
    get: function get() {
      if (this.tracks && this.tracks.videoTrack) {
        return this.tracks.videoTrack;
      }
      return {
        samples: [],
        meta: {}
      };
    }
  }, {
    key: 'dtsBase',
    get: function get() {
      var remuxer = this._context.getInstance('MP4_REMUXER');
      if (remuxer) {
        return remuxer._dtsBase;
      }
      return 0;
    }
  }], [{
    key: 'sortAudioSamples',
    value: function sortAudioSamples(samples) {
      if (samples.length === 1) {
        return samples;
      }

      return samples.sort(function (a, b) {
        return a.dts - b.dts;
      });
    }

    /**
     * 寻找dts最小的sample
     * @param samples
     */

  }, {
    key: 'findFirstAudioSample',
    value: function findFirstAudioSample(samples) {
      if (!samples || samples.length === 0) {
        return null;
      }

      return Compatibility.sortAudioSamples(samples)[0];
    }
  }, {
    key: 'findFirstVideoSample',
    value: function findFirstVideoSample(samples) {
      if (!samples.length) {
        return null;
      }

      var sorted = samples.sort(function (a, b) {
        return a.dts - b.dts;
      });

      for (var i = 0, len = sorted.length; i < len; i++) {
        if (sorted[i].isKeyframe) {
          return sorted[i];
        }
      }
    }
  }, {
    key: 'detectLargeGap',
    value: function detectLargeGap(nextDts, firstSample) {
      if (nextDts === null) {
        return;
      }
      var curDts = firstSample.dts || 0;
      var cond1 = nextDts - curDts >= 1000 || curDts - nextDts >= 1000; // fix hls流出现大量流dts间距问题
      var cond2 = firstSample.options && firstSample.options.discontinue;

      return cond1 || cond2;
    }
  }, {
    key: 'doFixLargeGap',
    value: function doFixLargeGap(samples, gap) {
      // console.log('fix large gap ', gap)
      for (var i = 0, len = samples.length; i < len; i++) {
        var sample = samples[i];
        sample.dts += gap;
        if (sample.pts) {
          sample.pts += gap;
        }
      }
    }

    /**
     * 中途换流
     */

  }, {
    key: 'detactChangeStream',
    value: function detactChangeStream(samples) {
      var changed = false;
      var changedIdx = -1;
      for (var i = 0, len = samples.length; i < len; i++) {
        if (samples[i].options && samples[i].options.meta) {
          changed = true;
          changedIdx = i;
          break;
        }
      }

      return {
        changed: changed,
        changedIdx: changedIdx
      };
    }
  }]);

  return Compatibility;
}();

var Nalunit$1 = Nalunit;
var SpsParser = SPSParser;
var Compatibility$1 = Compatibility;

var _createClass$k = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _possibleConstructorReturn$1(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck$k(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Track = function () {
  /**
   * The constructor.
   */
  function Track() {
    _classCallCheck$k(this, Track);

    this.id = -1;
    this.sequenceNumber = 0;
    this.samples = [];
    this.droppedSamples = [];
    this.length = 0;
  }

  /**
   * Reset the track.
   */

  _createClass$k(Track, [{
    key: 'reset',
    value: function reset() {
      this.sequenceNumber = 0;
      this.samples = [];
      this.length = 0;
    }
    /**
     * destroy the track.
     */

  }, {
    key: 'distroy',
    value: function distroy() {
      this.reset();
      this.id = -1;
    }
  }]);

  return Track;
}();

var AudioTrack = function (_Track) {
  _inherits$1(AudioTrack, _Track);

  /**
   * The constructor for audio track.
   */
  function AudioTrack() {
    _classCallCheck$k(this, AudioTrack);

    var _this = _possibleConstructorReturn$1(this, (AudioTrack.__proto__ || Object.getPrototypeOf(AudioTrack)).call(this));

    _this.TAG = 'AudioTrack';
    _this.type = 'audio';
    return _this;
  }

  return AudioTrack;
}(Track);

var VideoTrack = function (_Track2) {
  _inherits$1(VideoTrack, _Track2);

  /**
   * The constructor for video track.
   */
  function VideoTrack() {
    _classCallCheck$k(this, VideoTrack);

    var _this2 = _possibleConstructorReturn$1(this, (VideoTrack.__proto__ || Object.getPrototypeOf(VideoTrack)).call(this));

    _this2.TAG = 'VideoTrack';
    _this2.type = 'video';
    _this2.dropped = 0;
    return _this2;
  }
  /**
   * reset the video track.
   */

  _createClass$k(VideoTrack, [{
    key: 'reset',
    value: function reset() {
      this.sequenceNumber = 0;
      this.samples = [];
      this.length = 0;
      this.dropped = 0;
    }
  }]);

  return VideoTrack;
}(Track);

var Tracks = function () {
  function Tracks() {
    _classCallCheck$k(this, Tracks);

    this.audioTrack = null;
    this.videoTrack = null;
  }

  _createClass$k(Tracks, [{
    key: 'destroy',
    value: function destroy() {
      this.audioTrack = null;
      this.videoTrack = null;
    }
  }]);

  return Tracks;
}();

var _createClass$l = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$l(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var XgBuffer = function () {
  /**
   * A buffer to store loaded data.
   *
   * @class LoaderBuffer
   * @param {number} length - Optional the buffer size
   */
  function XgBuffer(length) {
    _classCallCheck$l(this, XgBuffer);

    this.length = length || 0;
    this.historyLen = length || 0;
    this.array = [];
    this.offset = 0;
  }

  /**
   * The function to push data.
   *
   * @param {number} data - The data to push into the buffer
   */

  _createClass$l(XgBuffer, [{
    key: "push",
    value: function push(data) {
      this.array.push(data);
      this.length += data.byteLength;
      this.historyLen += data.byteLength;
    }

    /**
     * The function to shift data.
     *
     * @param {number} length - The size of shift.
     */

  }, {
    key: "shift",
    value: function shift(length) {
      if (this.array.length < 1) {
        return new Uint8Array(0);
      }

      if (length === undefined) {
        return this._shiftBuffer();
      }
      if (this.offset + length === this.array[0].length) {
        var _ret = this.array[0].slice(this.offset, this.offset + length);
        this.offset = 0;
        this.array.shift();
        this.length -= length;
        return _ret;
      }

      if (this.offset + length < this.array[0].length) {
        var _ret2 = this.array[0].slice(this.offset, this.offset + length);
        this.offset += length;
        this.length -= length;
        return _ret2;
      }

      var ret = new Uint8Array(length);
      var tmpoff = 0;
      while (this.array.length > 0 && length > 0) {
        if (this.offset + length < this.array[0].length) {
          var tmp = this.array[0].slice(this.offset, this.offset + length);
          ret.set(tmp, tmpoff);
          this.offset += length;
          this.length -= length;
          length = 0;
          break;
        } else {
          // console.log('mark1')
          var templength = this.array[0].length - this.offset;
          ret.set(this.array[0].slice(this.offset, this.array[0].length), tmpoff);
          this.array.shift();
          this.offset = 0;
          tmpoff += templength;
          this.length -= templength;
          length -= templength;
        }
      }
      return ret;
    }

    /**
     * Function to clear the buffer.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.array = [];
      this.length = 0;
      this.offset = 0;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.clear();
      this.historyLen = 0;
    }

    /**
     * Function to shift one unit8Array.
     */

  }, {
    key: "_shiftBuffer",
    value: function _shiftBuffer() {
      this.length -= this.array[0].length;
      this.offset = 0;
      return this.array.shift();
    }

    /**
     * Convert uint8 data to number.
     *
     * @param {number} start - the start postion.
     * @param {number} length - the length of data.
     */

  }, {
    key: "toInt",
    value: function toInt(start, length) {
      var retInt = 0;
      var i = this.offset + start;
      while (i < this.offset + length + start) {
        if (i < this.array[0].length) {
          retInt = retInt * 256 + this.array[0][i];
        } else if (this.array[1]) {
          retInt = retInt * 256 + this.array[1][i - this.array[0].length];
        }

        i++;
      }
      return retInt;
    }
  }]);

  return XgBuffer;
}();

var RemuxBuffer = function () {
  function RemuxBuffer() {
    _classCallCheck$l(this, RemuxBuffer);

    this.video = [];
    this.audio = [];
  }

  _createClass$l(RemuxBuffer, [{
    key: "destroy",
    value: function destroy() {
      this.video = [];
      this.audio = [];
    }
  }]);

  return RemuxBuffer;
}();

var _createClass$m = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$m(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Source = function Source() {
  _classCallCheck$m(this, Source);

  this.mimetype = '';
  this.init = null;
  this.data = [];
};

var PreSource = function () {
  function PreSource() {
    _classCallCheck$m(this, PreSource);

    this.sources = {};
  }

  _createClass$m(PreSource, [{
    key: 'getSource',
    value: function getSource(source) {
      return this.sources[source];
    }
  }, {
    key: 'createSource',
    value: function createSource(name) {
      this.sources[name] = new Source();
      return this.sources[name];
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.sources = {};
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.sources = {};
    }
  }]);

  return PreSource;
}();

var Tracks$1 = Tracks;
var AudioTrack$1 = AudioTrack;
var VideoTrack$1 = VideoTrack;
var XgBuffer$1 = XgBuffer;
var PreSource$1 = PreSource;

var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

var _createClass$n = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$n(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var DEMUX_EVENTS$1 = EVENTS.DEMUX_EVENTS;
var StreamType = {
  0x01: ['video', 'MPEG-1'],
  0x02: ['video', 'MPEG-2'],
  0x1b: ['video', 'AVC.H264'],
  0xea: ['video', 'VC-1'],
  0x03: ['audio', 'MPEG-1'],
  0x04: ['audio', 'MPEG-2'],
  0x0f: ['audio', 'MPEG-2.AAC'],
  0x11: ['audio', 'MPEG-4.AAC'],
  0x80: ['audio', 'LPCM'],
  0x81: ['audio', 'AC3'],
  0x06: ['audio', 'AC3'],
  0x82: ['audio', 'DTS'],
  0x83: ['audio', 'Dolby TrueHD'],
  0x84: ['audio', 'AC3-Plus'],
  0x85: ['audio', 'DTS-HD'],
  0x86: ['audio', 'DTS-MA'],
  0xa1: ['audio', 'AC3-Plus-SEC'],
  0xa2: ['audio', 'DTS-HD-SEC']
};

var TsDemuxer = function () {
  function TsDemuxer(configs) {
    _classCallCheck$n(this, TsDemuxer);

    this.configs = Object.assign({}, configs);
    this.demuxing = false;
    this.pat = [];
    this.pmt = [];
    this._hasVideoMeta = false;
    this._hasAudioMeta = false;
  }

  _createClass$n(TsDemuxer, [{
    key: 'init',
    value: function init() {
      this.on(DEMUX_EVENTS$1.DEMUX_START, this.demux.bind(this));
    }
  }, {
    key: 'demux',
    value: function demux(frag) {
      if (this.demuxing) {
        return;
      }

      var buffer = this.inputBuffer;
      var frags = { pat: [], pmt: [] };
      var peses = {};

      // Read TS segment
      while (buffer.length >= 188) {
        if (buffer.length >= 1 && buffer.array[0][buffer.offset] !== 71) {
          this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, this.TAG, new Error('Untrust sync code: ' + buffer.array[0][buffer.offset] + ', try to recover;'), false);
        }
        while (buffer.length >= 1 && buffer.array[0][buffer.offset] !== 71) {
          buffer.shift(1);
        }
        var buf = buffer.shift(188);
        // console.log(buf);
        var tsStream = new Stream$1(buf.buffer);
        var ts = {};
        TsDemuxer.read(tsStream, ts, frags);
        if (ts.pes) {
          if (!peses[ts.header.pid]) {
            peses[ts.header.pid] = [];
          }
          peses[ts.header.pid].push(ts.pes);
          ts.pes.ES.buffer = [ts.pes.ES.buffer];
        } else if (peses[ts.header.pid]) {
          peses[ts.header.pid][peses[ts.header.pid].length - 1].ES.buffer.push(ts.payload.stream);
        }
      }

      var AudioOptions = frag;
      var VideoOptions = frag;

      // Get Frames data
      for (var i = 0; i < Object.keys(peses).length; i++) {
        var epeses = peses[Object.keys(peses)[i]];
        for (var j = 0; j < epeses.length; j++) {
          epeses[j].id = Object.keys(peses)[i];
          epeses[j].ES.buffer = TsDemuxer.Merge(epeses[j].ES.buffer);
          if (epeses[j].type === 'audio') {
            this.pushAudioSample(epeses[j], AudioOptions);
            AudioOptions = {};
          } else if (epeses[j].type === 'video') {
            this.pushVideoSample(epeses[j], VideoOptions);
            VideoOptions = {};
          }
        }
      }

      if (this._hasAudioMeta) {
        this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE, 'audio');
      }
      if (this._hasVideoMeta) {
        this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE, 'video');
      }
    }
  }, {
    key: 'pushAudioSample',
    value: function pushAudioSample(pes, options) {
      var track = void 0;
      if (!this._tracks.audioTrack) {
        this._tracks.audioTrack = new AudioTrack$1();
        track = this._tracks.audioTrack;
      } else {
        track = this._tracks.audioTrack;
      }
      var meta = new AudioTrackMeta$1({
        audioSampleRate: pes.ES.frequence,
        sampleRate: pes.ES.frequence,
        channelCount: pes.ES.channel,
        codec: 'mp4a.40.' + pes.ES.audioObjectType,
        config: pes.ES.audioConfig,
        id: 2,
        sampleRateIndex: pes.ES.frequencyIndex
      });
      meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);

      var metaEqual = TsDemuxer.compaireMeta(track.meta, meta, true);

      if (!this._hasAudioMeta || !metaEqual) {
        track.meta = meta;
        this._hasAudioMeta = true;
        this.emit(DEMUX_EVENTS$1.METADATA_PARSED, 'audio');
      }

      var data = new Uint8Array(pes.ES.buffer.buffer.slice(pes.ES.buffer.position, pes.ES.buffer.length));
      var dts = parseInt(pes.pts / 90);
      var pts = parseInt(pes.pts / 90);
      var sample = new AudioTrackSample$1({ dts: dts, pts: pts, data: data, options: options });
      track.samples.push(sample);
    }
  }, {
    key: 'pushVideoSample',
    value: function pushVideoSample(pes, options) {
      var nals = Nalunit$1.getNalunits(pes.ES.buffer);
      var track = void 0;
      var meta = new VideoTrackMeta$1();
      if (!this._tracks.videoTrack) {
        this._tracks.videoTrack = new VideoTrack$1();
        track = this._tracks.videoTrack;
      } else {
        track = this._tracks.videoTrack;
      }
      var sampleLength = 0;
      var sps = false;
      var pps = false;
      for (var i = 0; i < nals.length; i++) {
        var nal = nals[i];
        if (nal.sps) {
          sps = nal;
          track.sps = nal.body;
          meta.chromaFormat = sps.sps.chroma_format;
          meta.codec = 'avc1.';
          for (var j = 1; j < 4; j++) {
            var h = sps.body[j].toString(16);
            if (h.length < 2) {
              h = '0' + h;
            }
            meta.codec += h;
          }
          meta.codecHeight = sps.sps.codec_size.height;
          meta.codecWidth = sps.sps.codec_size.width;
          meta.frameRate = sps.sps.frame_rate;
          meta.id = 1;
          meta.level = sps.sps.level_string;
          meta.presentHeight = sps.sps.present_size.height;
          meta.presentWidth = sps.sps.present_size.width;
          meta.profile = sps.sps.profile_string;
          meta.refSampleDuration = Math.floor(meta.timescale * (sps.sps.frame_rate.fps_den / sps.sps.frame_rate.fps_num));
          meta.sarRatio = sps.sps.sar_ratio ? sps.sps.sar_ratio : sps.sps.par_ratio;
        } else if (nal.pps) {
          track.pps = nal.body;
          pps = nal;
        } else {
          sampleLength += 4 + nal.body.byteLength;
        }
      }

      if (sps && pps) {
        meta.avcc = Nalunit$1.getAvcc(sps.body, pps.body);
        var metaEqual = TsDemuxer.compaireMeta(track.meta, meta, true);
        if (!this._hasVideoMeta || !metaEqual) {
          if (options) {
            options.meta = Object.assign({}, meta);
          } else {
            options = {
              meta: Object.assign({}, meta)
            };
          }
          track.meta = meta;
          this._hasVideoMeta = true;
          this.emit(DEMUX_EVENTS$1.METADATA_PARSED, 'video');
        }
      }

      var data = new Uint8Array(sampleLength);
      var offset = 0;
      var isKeyframe = false;
      for (var _i = 0; _i < nals.length; _i++) {
        var _nal = nals[_i];
        var length = _nal.body.byteLength;
        if (_nal.idr) {
          isKeyframe = true;
        }
        if (!_nal.pps && !_nal.sps) {
          data.set(new Uint8Array([length >>> 24 & 0xff, length >>> 16 & 0xff, length >>> 8 & 0xff, length & 0xff]), offset);
          offset += 4;
          data.set(_nal.body, offset);
          offset += length;
        }
      }
      var sample = new VideoTrackSample$1({
        dts: parseInt(pes.dts / 90),
        pts: parseInt(pes.pts / 90),
        cts: (pes.pts - pes.dts) / 90,
        originDts: pes.dts,
        isKeyframe: isKeyframe,
        data: data,
        options: options
      });
      track.samples.push(sample);
    }
  }, {
    key: 'destory',
    value: function destory() {
      this.off(DEMUX_EVENTS$1.DEMUX_START, this.demux);
      this.configs = {};
      this.demuxing = false;
      this.pat = [];
      this.pmt = [];
      this._hasVideoMeta = false;
      this._hasAudioMeta = false;
    }
  }, {
    key: 'inputBuffer',
    get: function get() {
      return this._context.getInstance(this.configs.inputbuffer);
    }
  }, {
    key: '_tracks',
    get: function get() {
      return this._context.getInstance('TRACKS');
    }
  }], [{
    key: 'compaireArray',
    value: function compaireArray(a, b, type) {
      var al = 0;
      var bl = 0;
      if (type === 'Uint8Array') {
        al = a.byteLength;
        bl = b.byteLength;
      } else if (type === 'Array') {
        al = a.length;
        bl = b.length;
      }
      if (al !== bl) {
        return false;
      }

      for (var i = 0; i < al; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'compaireMeta',
    value: function compaireMeta(a, b, ignoreDuration) {
      if (!a || !b) {
        return false;
      }

      for (var i = 0, k = Object.keys(a).length; i < k; i++) {
        var itema = a[Object.keys(a)[i]];
        var itemb = b[Object.keys(a)[i]];
        if ((typeof itema === 'undefined' ? 'undefined' : _typeof$1(itema)) !== 'object') {
          if (ignoreDuration && Object.keys(a)[i] !== 'duration' && Object.keys(a)[i] !== 'refSampleDuration' && Object.keys(a)[i] !== 'refSampleDurationFixed' && itema !== itemb) {
            return false;
          }
        } else if (itema.byteLength !== undefined) {
          if (itemb.byteLength === undefined) {
            return false;
          }
          if (!TsDemuxer.compaireArray(itema, itemb, 'Uint8Array')) {
            return false;
          }
        } else if (itema.length !== undefined) {
          if (itemb.length === undefined) {
            return false;
          }
          if (!TsDemuxer.compaireArray(itema, itemb, 'Array')) {
            return false;
          }
        } else {
          if (!TsDemuxer.compaireMeta(itema, itemb)) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: 'Merge',
    value: function Merge(buffers) {
      var data = void 0;
      var length = 0;
      var offset = 0;
      for (var i = 0; i < buffers.length; i++) {
        length += buffers[i].length - buffers[i].position;
      }

      data = new Uint8Array(length);
      for (var _i2 = 0; _i2 < buffers.length; _i2++) {
        var buffer = buffers[_i2];
        data.set(new Uint8Array(buffer.buffer, buffer.position), offset);
        offset += buffer.length - buffer.position;
      }
      return new Stream$1(data.buffer);
    }
  }, {
    key: 'read',
    value: function read(stream, ts, frags) {
      TsDemuxer.readHeader(stream, ts);
      TsDemuxer.readPayload(stream, ts, frags);
      if (ts.header.packet === 'MEDIA' && ts.header.payload === 1 && !ts.unknownPIDs) {
        ts.pes = TsDemuxer.PES(ts);
      }
    }
  }, {
    key: 'readPayload',
    value: function readPayload(stream, ts, frags) {
      var header = ts.header;
      var pid = header.pid;
      switch (pid) {
        case 0:
          TsDemuxer.PAT(stream, ts, frags);
          break;
        case 1:
          TsDemuxer.CAT(stream, ts, frags);
          break;
        case 2:
          TsDemuxer.TSDT(stream, ts, frags);
          break;
        case 0x1fff:
          break;
        default:
          // TODO: some的写法不太好，得改
          if (frags.pat.some(function (item) {
            return item.pid === pid;
          })) {
            TsDemuxer.PMT(stream, ts, frags);
          } else {
            var sts = frags.pmt ? frags.pmt.filter(function (item) {
              return item.pid === pid;
            }) : [];
            if (sts.length > 0) {
              TsDemuxer.Media(stream, ts, StreamType[sts[0].streamType][0]);
            } else {
              ts.unknownPIDs = true;
            }          }
      }
    }
  }, {
    key: 'readHeader',
    value: function readHeader(stream, ts) {
      var header = {};
      header.sync = stream.readUint8();
      var next = stream.readUint16();
      header.error = next >>> 15;
      header.payload = next >>> 14 & 1;
      header.priority = next >>> 13 & 1;
      header.pid = next & 0x1fff;

      next = stream.readUint8();

      header.scrambling = next >> 6 & 0x3; // 是否加密，00表示不加密

      /**
       * 00 ISO/IEC未来使用保留
       * 01 没有调整字段，仅含有184B有效净荷
       * 02 没有有效净荷，仅含有183B调整字段
       * 03 0~182B调整字段后为有效净荷
       */
      header.adaptation = next >> 4 & 0x3;
      header.continuity = next & 15;
      header.packet = header.pid === 0 ? 'PAT' : 'MEDIA';
      ts.header = header;
    }
  }, {
    key: 'PAT',
    value: function PAT(stream, ts, frags) {
      var ret = {};
      var next = stream.readUint8();
      stream.skip(next);
      next = stream.readUint8();
      ret.tabelID = next;
      next = stream.readUint16();
      ret.error = next >>> 7;
      ret.zero = next >>> 6 & 1;
      ret.sectionLength = next & 0xfff;
      ret.streamID = stream.readUint16();
      ret.current = stream.readUint8() & 1;
      ret.sectionNumber = stream.readUint8();
      ret.lastSectionNumber = stream.readUint8();
      var N = (ret.sectionLength - 9) / 4;
      var list = [];
      for (var i = 0; i < N; i++) {
        var programNumber = stream.readUint16();
        var pid = stream.readUint16() & 0x1fff;
        list.push({
          program: programNumber,
          pid: pid,
          type: programNumber === 0 ? 'network' : 'mapPID'
        });
      }
      if (list.length > 0) {
        frags.pat = frags.pat.concat(list);
      }
      ret.list = list;
      ret.program = stream.readUint16();
      ret.pid = stream.readUint16() & 0x1fff;
      ts.payload = ret;
      // TODO CRC
    }
  }, {
    key: 'PMT',
    value: function PMT(stream, ts, frags) {
      var ret = {};
      var header = ts.header;
      header.packet = 'PMT';
      var next = stream.readUint8();
      stream.skip(next);
      next = stream.readUint8();
      ret.tableID = next;
      next = stream.readUint16();
      ret.sectionLength = next & 0xfff;
      ret.program = stream.readUint16();
      ret.current = stream.readUint8() & 1;
      ret.order = stream.readUint8();
      ret.lastOrder = stream.readUint8();
      ret.PCR_PID = stream.readUint16() & 0x1fff;
      ret.programLength = stream.readUint16() & 0xfff;
      var N = (ret.sectionLength - 13) / 5;
      var list = [];
      for (var i = 0; i < N; i++) {
        list.push({
          streamType: stream.readUint8(),
          pid: stream.readUint16() & 0x1fff, // 0x07e5 视频，0x07e6
          es: stream.readUint16() & 0xfff
        });
      }
      ret.list = list;
      if (!this.pmt) {
        this.pmt = [];
      }
      frags.pmt = this.pmt.concat(list.map(function (item) {
        return {
          pid: item.pid,
          es: item.es,
          streamType: item.streamType,
          program: ret.program
        };
      }));
      ts.payload = ret;
    }
  }, {
    key: 'Media',
    value: function Media(stream, ts, type) {
      var header = ts.header;
      var payload = {};
      header.type = type;
      if (header.adaptation === 0x03) {
        payload.adaptationLength = stream.readUint8();
        if (payload.adaptationLength > 0) {
          var next = stream.readUint8();
          payload.discontinue = next >>> 7;
          payload.access = next >>> 6 & 0x01;
          payload.priority = next >>> 5 & 0x01;
          payload.PCR = next >>> 4 & 0x01;
          payload.OPCR = next >>> 3 & 0x01;
          payload.splicePoint = next >>> 2 & 0x01;
          payload.transportPrivate = next >>> 1 & 0x01;
          payload.adaptationField = next & 0x01;
          var _start = stream.position;
          if (payload.PCR === 1) {
            payload.programClockBase = stream.readUint32() << 1;
            next = stream.readUint16();
            payload.programClockBase |= next >>> 15;
            payload.programClockExtension = next & 0x1ff;
          }
          if (payload.OPCR === 1) {
            payload.originProgramClockBase = stream.readUint32() << 1;
            next = stream.readUint16();
            payload.originProgramClockBase += next >>> 15;
            payload.originProgramClockExtension = next & 0x1ff;
          }
          if (payload.splicePoint === 1) {
            payload.spliceCountdown = stream.readUint8();
          }
          if (payload.transportPrivate === 1) {
            var length = stream.readUint8();
            var transportPrivateData = [];
            for (var i = 0; i < length; i++) {
              transportPrivateData.push(stream.readUint8());
            }
          }
          if (payload.adaptationField === 1) {
            var _length = stream.readUint8();
            var _next = stream.readUint8();
            var start = stream.position;
            var ltw = _next >>> 7;
            var piecewise = _next >>> 6 & 0x1;
            var seamless = _next >>> 5 & 0x1;
            if (ltw === 1) {
              _next = stream.readUint16();
              payload.ltwValid = _next >>> 15;
              payload.ltwOffset = _next & 0xefff;
            }
            if (piecewise === 1) {
              _next = stream.readUint24();
              payload.piecewiseRate = _next & 0x3fffff;
            }
            if (seamless === 1) {
              _next = stream.readInt8();
              payload.spliceType = _next >>> 4;
              payload.dtsNextAU1 = _next >>> 1 & 0x7;
              payload.marker1 = _next & 0x1;
              _next = stream.readUint16();
              payload.dtsNextAU2 = _next >>> 1;
              payload.marker2 = _next & 0x1;
              _next = stream.readUint16();
              payload.dtsNextAU3 = _next;
            }
            stream.skip(_length - 1 - (stream.position - start));
          }
          var lastStuffing = payload.adaptationLength - 1 - (stream.position - _start);
          stream.skip(lastStuffing);
        }
      }
      payload.stream = new Stream$1(stream.buffer.slice(stream.position));
      ts.payload = payload;
    }
  }, {
    key: 'PES',
    value: function PES(ts) {
      var ret = {};
      var buffer = ts.payload.stream;

      var next = buffer.readUint24();
      if (next !== 1) {
        ret.ES = {};
        ret.ES.buffer = buffer;
      } else {
        var streamID = buffer.readUint8();
        if (streamID >= 0xe0 && streamID <= 0xef) {
          ret.type = 'video';
        }
        if (streamID >= 0xc0 && streamID <= 0xdf) {
          ret.type = 'audio';
        }
        var packetLength = buffer.readUint16();
        ret.packetLength = packetLength;
        if (ret.type === 'video' || ret.type === 'audio') {
          var _next2 = buffer.readUint8();
          var first = _next2 >>> 6;
          if (first !== 0x02) {
            throw new Error('error when parse pes header');
          }
          _next2 = buffer.readUint8();
          ret.ptsDTSFlag = _next2 >>> 6;
          ret.escrFlag = _next2 >>> 5 & 0x01;
          ret.esRateFlag = _next2 >>> 4 & 0x01;
          ret.dsmFlag = _next2 >>> 3 & 0x01;
          ret.additionalFlag = _next2 >>> 2 & 0x01;
          ret.crcFlag = _next2 >>> 1 & 0x01;
          ret.extensionFlag = _next2 & 0x01;
          ret.pesHeaderLength = buffer.readUint8();
          var N1 = ret.pesHeaderLength;

          if (ret.ptsDTSFlag === 2) {
            var pts = [];
            _next2 = buffer.readUint8();
            pts.push(_next2 >>> 1 & 0x07);
            _next2 = buffer.readUint16();
            pts.push(_next2 >>> 1);
            _next2 = buffer.readUint16();
            pts.push(_next2 >>> 1);
            ret.pts = pts[0] << 30 | pts[1] << 15 | pts[2];
            N1 -= 5;
            // 视频如果没有dts用pts
            if (ret.type === 'video') {
              ret.dts = ret.pts;
            }
          }
          if (ret.ptsDTSFlag === 3) {
            var _pts = [];
            _next2 = buffer.readUint8();
            _pts.push(_next2 >>> 1 & 0x07);
            _next2 = buffer.readUint16();
            _pts.push(_next2 >>> 1);
            _next2 = buffer.readUint16();
            _pts.push(_next2 >>> 1);
            ret.pts = _pts[0] << 30 | _pts[1] << 15 | _pts[2];
            var dts = [];
            _next2 = buffer.readUint8();
            dts.push(_next2 >>> 1 & 0x07);
            _next2 = buffer.readUint16();
            dts.push(_next2 >>> 1);
            _next2 = buffer.readUint16();
            dts.push(_next2 >>> 1);
            ret.dts = dts[0] << 30 | dts[1] << 15 | dts[2];
            N1 -= 10;
          }
          if (ret.escrFlag === 1) {
            var escr = [];
            var ex = [];
            _next2 = buffer.readUint8();
            escr.push(_next2 >>> 3 & 0x07);
            escr.push(_next2 & 0x03);
            _next2 = buffer.readUint16();
            escr.push(_next2 >>> 13);
            escr.push(_next2 & 0x03);
            _next2 = buffer.readUint16();
            escr.push(_next2 >>> 13);
            ex.push(_next2 & 0x03);
            _next2 = buffer.readUint8();
            ex.push(_next2 >>> 1);
            ret.escr = (escr[0] << 30 | escr[1] << 28 | escr[2] << 15 | escr[3] << 13 | escr[4]) * 300 + (ex[0] << 7 | ex[1]);
            N1 -= 6;
          }
          if (ret.esRateFlag === 1) {
            _next2 = buffer.readUint24();
            ret.esRate = _next2 >>> 1 & 0x3fffff;
            N1 -= 3;
          }
          if (ret.dsmFlag === 1) {
            throw new Error('not support DSM_trick_mode');
          }
          if (ret.additionalFlag === 1) {
            _next2 = buffer.readUint8();
            ret.additionalCopyInfo = _next2 & 0x7f;
            N1 -= 1;
          }
          if (ret.crcFlag === 1) {
            ret.pesCRC = buffer.readUint16();
            N1 -= 2;
          }
          if (ret.extensionFlag === 1) {
            throw new Error('not support extension');
          }
          if (N1 > 0) {
            buffer.skip(N1);
          }
          ret.ES = TsDemuxer.ES(buffer, ret.type);
        } else {
          throw new Error('format is not supported');
        }
      }
      return ret;
    }
  }, {
    key: 'ES',
    value: function ES(buffer, type) {
      var next = void 0;
      var ret = {};
      if (type === 'video') {
        next = buffer.readUint32();
        if (next !== 1) {
          buffer.back(4);
          next = buffer.readUint24();
          if (next !== 1) {
            throw new Error('h264 nal header parse failed');
          }
        }
        buffer.skip(2); // 09 F0
        // TODO readnalu
        ret.buffer = buffer;
      } else if (type === 'audio') {
        next = buffer.readUint16();
        // adts的同步字节，12位
        if (next >>> 4 !== 0xfff) {
          throw new Error('aac ES parse Error');
        }
        var fq = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
        ret.id = (next >>> 3 & 0x01) === 0 ? 'MPEG-4' : 'MPEG-2';
        ret.layer = next >>> 1 & 0x03;
        ret.absent = next & 0x01;
        next = buffer.readUint16();
        ret.audioObjectType = (next >>> 14 & 0x03) + 1;
        ret.profile = ret.audioObjectType - 1;
        ret.frequencyIndex = next >>> 10 & 0x0f;
        ret.frequence = fq[ret.frequencyIndex];
        ret.channel = next >>> 6 & 0x07;
        ret.frameLength = (next & 0x03) << 11 | buffer.readUint16() >>> 5;
        TsDemuxer.getAudioConfig(ret);
        buffer.skip(1);
        ret.buffer = buffer;
      } else {
        throw new Error('ES ' + type + ' is not supported');
      }

      return ret;
    }
  }, {
    key: 'TSDT',
    value: function TSDT(stream, ts, frags) {
      // TODO
      ts.payload = {};
    }
  }, {
    key: 'CAT',
    value: function CAT(stream, ts, frags) {
      var ret = {};
      ret.tableID = stream.readUint8();
      var next = stream.readUint16();
      ret.sectionIndicator = next >>> 7;
      ret.sectionLength = next & 0x0fff;
      stream.skip(2);
      next = stream.readUint8();
      ret.version = next >>> 3;
      ret.currentNextIndicator = next & 0x01;
      ret.sectionNumber = stream.readUint8();
      ret.lastSectionNumber = stream.readUint8();
      var N = (this.sectionLength - 9) / 4;
      ret.crc32 = stream.readUint32();
      ts.payload = ret;
    }
  }, {
    key: 'getAudioConfig',
    value: function getAudioConfig(ret) {
      var userAgent = navigator.userAgent.toLowerCase();
      var config = void 0;
      var extensionSampleIndex = void 0;
      if (/firefox/i.test(userAgent)) {
        if (ret.frequencyIndex >= 6) {
          ret.audioObjectType = 5;
          config = new Array(4);
          extensionSampleIndex = ret.frequencyIndex - 3;
        } else {
          ret.audioObjectType = 2;
          config = new Array(2);
          extensionSampleIndex = ret.frequencyIndex;
        }
      } else if (userAgent.indexOf('android') !== -1) {
        ret.audioObjectType = 2;
        config = new Array(2);
        extensionSampleIndex = ret.frequencyIndex;
      } else {
        ret.audioObjectType = 5;
        config = new Array(4);
        if (ret.frequencyIndex >= 6) {
          extensionSampleIndex = ret.frequencyIndex - 3;
        } else {
          if (ret.channel === 1) {
            ret.audioObjectType = 2;
            config = new Array(2);
          }
          extensionSampleIndex = ret.frequencyIndex;
        }
      }

      config[0] = ret.audioObjectType << 3;
      config[0] |= (ret.frequencyIndex & 0x0e) >> 1;
      config[1] = (ret.frequencyIndex & 0x01) << 7;
      config[1] |= ret.channel << 3;
      if (ret.audioObjectType === 5) {
        config[1] |= (extensionSampleIndex & 0x0e) >> 1;
        config[2] = (extensionSampleIndex & 0x01) << 7;
        config[2] |= 2 << 2;
        config[3] = 0;
      }
      ret.audioConfig = config;
    }
  }]);

  return TsDemuxer;
}();

var _createClass$o = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$o(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Playlist = function () {
  function Playlist(configs) {
    _classCallCheck$o(this, Playlist);

    this._baseURL = '';
    this._list = {};
    this._ts = {};
    this.version = 0;
    this.sequence = -1;
    this.targetduration = 0;
    this.duration = 0;
    this.fragLength = 0;
    this._lastget = undefined;
    this._audoclear = configs.autoclear || false;
  }

  _createClass$o(Playlist, [{
    key: 'push',
    value: function push(ts, duration, discontinue) {
      if (!this._ts[ts]) {
        this._ts[ts] = { duration: duration,
          downloaded: false,
          downloading: false,
          start: this.duration,
          discontinue: discontinue ? true : false
        };
        this._list[this.duration] = ts;
        this.duration += duration;
        this.fragLength += 1;
      }
    }
  }, {
    key: 'deleteFrag',
    value: function deleteFrag(url) {
      if (this._ts[url]) {
        if (this._ts[url].start > this._lastget.time) {
          this._lastget = {
            duration: this._ts[url].duration,
            time: this._ts[url].start,
            downloaded: false,
            downloading: false,
            url: url
          };
        }
        delete this._list[this._ts[url].start];
        delete this._ts[url];
        this.fragLength -= 1;
      }
    }
  }, {
    key: 'pushM3U8',
    value: function pushM3U8(data, deletepre) {
      // 常规信息替换
      if (!data) {
        throw new Error('No m3u8 data received.');
      }
      this.version = data.version;
      this.targetduration = data.targetduration;
      if (data.encrypt && !this.encrypt) {
        this.encrypt = data.encrypt;
      }
      // 新分片信息
      if (data.sequence > this.sequence) {
        this.sequence = data.sequence;
        var newfraglist = [];
        for (var i = 0; i < data.frags.length; i++) {
          var frag = data.frags[i];
          if (!this._ts[frag.url]) {
            newfraglist.push(frag.url);
            this.push(frag.url, frag.duration, frag.discontinue);
          }
        }

        if (newfraglist.length < 1) {
          throw new Error('Can not read ts file list.');
        }

        if (deletepre) {
          var tslist = this.getTsList();
          for (var _i = 0; _i < tslist.length; _i++) {
            if (newfraglist.indexOf(tslist[_i]) < 0) {
              this.deleteFrag(tslist[_i]);
            }
          }
        }
      } else {
        throw new Error('Old m3u8 file received, ' + data.sequence);
      }
    }
  }, {
    key: 'getTsList',
    value: function getTsList() {
      return Object.keys(this._ts);
    }
  }, {
    key: 'downloaded',
    value: function downloaded(tsname, isloaded) {
      var ts = this._ts[tsname];
      if (ts) {
        ts.downloaded = isloaded;
      }
    }
  }, {
    key: 'downloading',
    value: function downloading(tsname, loading) {
      var ts = this._ts[tsname];
      if (ts) {
        ts.downloading = loading;
      }
    }
  }, {
    key: 'getTsByName',
    value: function getTsByName(name) {
      return this._ts[name];
    }
  }, {
    key: 'getTs',
    value: function getTs(time) {
      var timelist = Object.keys(this._list);
      var ts = void 0;

      if (time === undefined) {
        if (this._lastget) {
          time = this._lastget.time + this._lastget.duration;
        } else {
          time = 0;
        }
      }

      if (timelist.length < 1 || time >= this.duration) {
        return undefined;
      }
      timelist.sort(function (a, b) {
        return parseFloat(a) - parseFloat(b);
      });
      for (var i = 0; i < timelist.length; i++) {
        if (time >= parseInt(timelist[i])) {
          var url = this._list[timelist[i]];
          var downloaded = this._ts[url].downloaded;
          var downloading = this._ts[url].downloading;
          ts = { url: url, downloaded: downloaded, downloading: downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration) };
          if (this.autoclear) {
            delete this._ts[this._lastget.url];
            delete this._list[this._lastget.time];
          }
          this._lastget = ts;
        } else {
          break;
        }
      }
      return ts;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._baseURL = '';
      this._list = {};
      this._ts = {};
      this.version = 0;
      this.sequence = -1;
      this.targetduration = 0;
      this.duration = 0;
    }
  }, {
    key: 'clearDownloaded',
    value: function clearDownloaded() {
      for (var i = 0, l = Object.keys(this._ts).length; i < l; i++) {
        var ts = this._ts[Object.keys(this._ts)[i]];
        ts.downloaded = false;
        ts.downloading = false;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._baseURL = '';
      this._list = {};
      this._ts = {};
      this.version = 0;
      this.sequence = -1;
      this.targetduration = 0;
      this.duration = 0;
      this.fragLength = 0;
      this._lastget = undefined;
      this._audoclear = false;
    }
  }, {
    key: 'list',
    get: function get() {
      return this._list;
    }
  }, {
    key: 'baseURL',
    set: function set(baseURL) {
      if (this.baseURL !== baseURL) {
        this.clear();
        this._baseURL = baseURL;
      }
    },
    get: function get() {
      return this._baseURL;
    }
  }]);

  return Playlist;
}();

var _createClass$p = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$p(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var DATA_TYPES = {
  NUMBER: 0,
  BOOLEAN: 1,
  STRING: 2,
  OBJECT: 3,
  MIX_ARRAY: 8,
  OBJECT_END: 9,
  STRICT_ARRAY: 10,
  DATE: 11,
  LONE_STRING: 12

  /**
   * meta信息解析
   */
};
var AMFParser = function () {
  function AMFParser() {
    _classCallCheck$p(this, AMFParser);

    this.offset = 0;
    this.readOffset = this.offset;
  }

  _createClass$p(AMFParser, [{
    key: 'resolve',
    value: function resolve(meta, size) {
      if (size < 3) {
        throw new Error('not enough data for metainfo');
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
      var strLen = dv.getUint16(0, !isLe);
      var str = '';
      if (strLen > 0) {
        str = UTF8$1.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
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
      var strLen = dv.getUint32(0, !isLe);
      var str = '';
      if (strLen > 0) {
        str = UTF8$1.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
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
      var NUMBER = DATA_TYPES.NUMBER,
          BOOLEAN = DATA_TYPES.BOOLEAN,
          STRING = DATA_TYPES.STRING,
          OBJECT = DATA_TYPES.OBJECT,
          MIX_ARRAY = DATA_TYPES.MIX_ARRAY,
          OBJECT_END = DATA_TYPES.OBJECT_END,
          STRICT_ARRAY = DATA_TYPES.STRICT_ARRAY,
          DATE = DATA_TYPES.DATE,
          LONE_STRING = DATA_TYPES.LONE_STRING;

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
  }]);

  return AMFParser;
}();

var _createClass$q = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$q(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var DEMUX_EVENTS$2 = EVENTS.DEMUX_EVENTS;

var FlvDemuxer = function () {
  function FlvDemuxer() {
    _classCallCheck$q(this, FlvDemuxer);

    this._firstFragmentLoaded = false;
    this._trackNum = 0;
    this._hasScript = false;
  }

  _createClass$q(FlvDemuxer, [{
    key: 'init',
    value: function init() {
      this.on(DEMUX_EVENTS$2.DEMUX_START, this.doParseFlv.bind(this));
    }

    /**
     * if the flv head is valid
     * @param data
     * @returns {boolean}
     */

  }, {
    key: 'doParseFlv',
    value: function doParseFlv() {
      if (!this._firstFragmentLoaded) {
        if (this.loaderBuffer.length < 13) {
          return;
        }
        var header = this.loaderBuffer.shift(13);
        this.parseFlvHeader(header);
        this.doParseFlv(); // 递归调用，继续解析flv流
      } else {
        if (this.loaderBuffer.length < 11) {
          return;
        }
        var chunk = void 0;

        var loopMax = 10000; // 防止死循环产生
        do {
          // console.log('mark4')
          chunk = this._parseFlvTag();
        } while (chunk && loopMax-- > 0);

        this.emit(DEMUX_EVENTS$2.DEMUX_COMPLETE);
      }
    }
  }, {
    key: 'parseFlvHeader',
    value: function parseFlvHeader(header) {
      if (!FlvDemuxer.isFlvFile(header)) {
        this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, new Error('invalid flv file'));
        this.doParseFlv();
      } else {
        this._firstFragmentLoaded = true;
        var playType = FlvDemuxer.getPlayType(header[4]);

        if (playType.hasVideo) {
          this.initVideoTrack();
        }

        if (playType.hasAudio) {
          this.initAudioTrack();
        }
      }
      this.doParseFlv();
    }

    /**
     * init default video track configs
     */

  }, {
    key: 'initVideoTrack',
    value: function initVideoTrack() {
      this._trackNum++;
      var videoTrack = new VideoTrack$1();
      videoTrack.meta = new VideoTrackMeta$1();
      videoTrack.id = videoTrack.meta.id = this._trackNum;

      this.tracks.videoTrack = videoTrack;
    }

    /**
     * init default audio track configs
     */

  }, {
    key: 'initAudioTrack',
    value: function initAudioTrack() {
      this._trackNum++;
      var audioTrack = new AudioTrack$1();
      audioTrack.meta = new AudioTrackMeta$1();
      audioTrack.id = audioTrack.meta.id = this._trackNum;

      this.tracks.audioTrack = audioTrack;
    }

    /**
     * Package the data as the following data structure
     * {
     *    data: Uint8Array. the Stream data.
     *    info: The first byte info of the Tag.
     *    tagType: 8、9、18
     *    timeStamp: the timestemp
     * }
     */

  }, {
    key: '_parseFlvTag',
    value: function _parseFlvTag() {
      if (this.loaderBuffer.length < 11) {
        return null;
      }
      var chunk = this._parseFlvTagHeader();
      if (chunk) {
        this._processChunk(chunk);
      }
      return chunk;
    }

    /**
     * Parse the 11 byte tag Header
     */

  }, {
    key: '_parseFlvTagHeader',
    value: function _parseFlvTagHeader() {
      var offset = 0;
      var chunk = {};

      var tagType = this.loaderBuffer.toInt(offset, 1);
      offset += 1;

      // 2 bit FMS reserved, 1 bit filtered, 5 bit tag type
      chunk.filtered = (tagType & 32) >>> 5;
      chunk.tagType = tagType & 31;

      // 3 Byte datasize
      chunk.datasize = this.loaderBuffer.toInt(offset, 3);
      offset += 3;

      if (chunk.tagType !== 8 && chunk.tagType !== 9 && chunk.tagType !== 11 && chunk.tagType !== 18 || this.loaderBuffer.toInt(8, 3) !== 0) {
        if (this.loaderBuffer && this.loaderBuffer.length > 0) {
          this.loaderBuffer.shift(1);
        }
        this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error('tagType ' + chunk.tagType), false);
        return null;
      }

      if (this.loaderBuffer.length < chunk.datasize + 15) {
        return null;
      }

      // read the data.
      this.loaderBuffer.shift(4);

      // 3 Byte timestamp
      var timestamp = this.loaderBuffer.toInt(0, 3);
      this.loaderBuffer.shift(3);

      // 1 Byte timestampExt
      var timestampExt = this.loaderBuffer.shift(1)[0];
      if (timestampExt > 0) {
        timestamp += timestampExt * 0x1000000;
      }

      chunk.dts = timestamp;

      // streamId
      this.loaderBuffer.shift(3);
      return chunk;
    }
  }, {
    key: '_processChunk',
    value: function _processChunk(chunk) {
      switch (chunk.tagType) {
        case 18:
          this._parseScriptData(chunk);
          break;
        case 8:
          this._parseAACData(chunk);
          break;
        case 9:
          this._parseHevcData(chunk);
          break;
        case 11:
          // for some CDN that did not process the currect RTMP messages
          this.loaderBuffer.shift(3);
          break;
        default:
          this.loaderBuffer.shift(1);
      }
    }

    /**
     * parse flv script data
     * @param chunk
     * @private
     */

  }, {
    key: '_parseScriptData',
    value: function _parseScriptData(chunk) {
      var audioTrack = this.tracks.audioTrack;
      var videoTrack = this.tracks.videoTrack;

      var data = this.loaderBuffer.shift(chunk.datasize);

      var info = new AMFParser().resolve(data, data.length);

      var onMetaData = this._context.onMetaData = info ? info.onMetaData : undefined;

      // fill mediaInfo
      this._context.mediaInfo.duration = onMetaData.duration;
      this._context.mediaInfo.hasVideo = onMetaData.hasVideo;
      this._context.mediaInfo.hsaAudio = onMetaData.hasAudio;

      var validate = this._datasizeValidator(chunk.datasize);
      if (validate) {
        this.emit(DEMUX_EVENTS$2.MEDIA_INFO);
        this._hasScript = true;
      }

      // Edit default meta.
      if (audioTrack && !audioTrack.hasSpecificConfig) {
        var meta = audioTrack.meta;
        if (onMetaData.audiosamplerate) {
          meta.sampleRate = onMetaData.audiosamplerate;
        }

        if (onMetaData.audiochannels) {
          meta.channelCount = onMetaData.audiochannels;
        }

        switch (onMetaData.audiosamplerate) {
          case 44100:
            meta.sampleRateIndex = 4;
            break;
          case 22050:
            meta.sampleRateIndex = 7;
            break;
          case 11025:
            meta.sampleRateIndex = 10;
            break;
        }
      }
      if (videoTrack && !videoTrack.hasSpecificConfig) {
        var _meta = videoTrack.meta;
        if (typeof onMetaData.framerate === 'number') {
          var fpsNum = Math.floor(onMetaData.framerate * 1000);
          if (fpsNum > 0) {
            var fps = fpsNum / 1000;
            if (!_meta.frameRate) {
              _meta.frameRate = {};
            }
            _meta.frameRate.fixed = true;
            _meta.frameRate.fps = fps;
            _meta.frameRate.fps_num = fpsNum;
            _meta.frameRate.fps_den = 1000;
          }
        }
      }
    }
  }, {
    key: '_aacSequenceHeaderParser',
    value: function _aacSequenceHeaderParser(data) {
      var ret = {};
      ret.hasSpecificConfig = true;
      ret.objectType = data[1] >>> 3;
      ret.sampleRateIndex = (data[1] & 7) << 1 | data[2] >>> 7;
      ret.audiosamplerate = this._switchAudioSampleRate(ret.sampleRateIndex);
      ret.channelCount = (data[2] & 120) >>> 3;
      ret.frameLength = (data[2] & 4) >>> 2;
      ret.dependsOnCoreCoder = (data[2] & 2) >>> 1;
      ret.extensionFlagIndex = data[2] & 1;

      ret.codec = 'mp4a.40.' + ret.objectType;
      var userAgent = window.navigator.userAgent.toLowerCase();
      var extensionSamplingIndex = void 0;

      var config = void 0;
      var samplingIndex = ret.sampleRateIndex;

      if (userAgent.indexOf('firefox') !== -1) {
        // firefox: use SBR (HE-AAC) if freq less than 24kHz
        if (ret.sampleRateIndex >= 6) {
          ret.objectType = 5;
          config = new Array(4);
          extensionSamplingIndex = samplingIndex - 3;
        } else {
          // use LC-AAC
          ret.objectType = 2;
          config = new Array(2);
          extensionSamplingIndex = samplingIndex;
        }
      } else if (userAgent.indexOf('android') !== -1) {
        // android: always use LC-AAC
        ret.objectType = 2;
        config = new Array(2);
        extensionSamplingIndex = samplingIndex;
      } else {
        // for other browsers, e.g. chrome...
        // Always use HE-AAC to make it easier to switch aac codec profile
        ret.objectType = 5;
        extensionSamplingIndex = ret.sampleRateIndex;
        config = new Array(4);

        if (ret.sampleRateIndex >= 6) {
          extensionSamplingIndex = ret.sampleRateIndex - 3;
        } else if (ret.channelCount === 1) {
          // Mono channel
          ret.objectType = 2;
          config = new Array(2);
          extensionSamplingIndex = ret.sampleRateIndex;
        }
      }

      config[0] = ret.objectType << 3;
      config[0] |= (ret.sampleRateIndex & 0x0F) >>> 1;
      config[1] = (ret.sampleRateIndex & 0x0F) << 7;
      config[1] |= (ret.channelCount & 0x0F) << 3;
      if (ret.objectType === 5) {
        config[1] |= (extensionSamplingIndex & 0x0F) >>> 1;
        config[2] = (extensionSamplingIndex & 0x01) << 7;
        // extended audio object type: force to 2 (LC-AAC)
        config[2] |= 2 << 2;
        config[3] = 0;
      }
      ret.config = config;
      return ret;
    }
  }, {
    key: '_parseAACData',
    value: function _parseAACData(chunk) {
      var track = this.tracks.audioTrack;
      if (!track) {
        return;
      }

      var meta = track.meta;

      if (!meta) {
        track.meta = new AudioTrackMeta$1();
        meta = track.meta;
      }

      var info = this.loaderBuffer.shift(1)[0];

      chunk.data = this.loaderBuffer.shift(chunk.datasize - 1);

      var format = (info & 240) >>> 4;

      track.format = format;

      if (format !== 10) {
        this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, new Error('invalid audio format: ' + format));
      }

      if (format === 10 && !this._hasAudioSequence) {
        meta.sampleRate = this._switchAudioSamplingFrequency(info);
        meta.sampleRateIndex = (info & 12) >>> 2;
        meta.frameLenth = (info & 2) >>> 1;
        meta.channelCount = info & 1;
        meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
      }

      var audioSampleRate = meta.audioSampleRate;
      var audioSampleRateIndex = meta.sampleRateIndex;
      var refSampleDuration = meta.refSampleDuration;

      delete chunk.tagType;
      var validate = this._datasizeValidator(chunk.datasize);

      if (chunk.data[0] === 0) {
        // AAC Sequence Header
        var aacHeader = this._aacSequenceHeaderParser(chunk.data);
        audioSampleRate = aacHeader.audiosamplerate || meta.audioSampleRate;
        audioSampleRateIndex = aacHeader.sampleRateIndex || meta.sampleRateIndex;
        refSampleDuration = Math.floor(1024 / audioSampleRate * meta.timescale);

        meta.channelCount = aacHeader.channelCount;
        meta.sampleRate = audioSampleRate;
        meta.sampleRateIndex = audioSampleRateIndex;
        meta.refSampleDuration = refSampleDuration;
        meta.duration = this._context.mediaInfo.duration * meta.timescale;
        meta.config = aacHeader.config;

        var audioMedia = this._context.mediaInfo.audio;

        // fill audio media info
        audioMedia.codec = aacHeader.codec;
        audioMedia.channelCount = aacHeader.channelCount;
        audioMedia.sampleRate = audioSampleRate;
        audioMedia.sampleRateIndex = aacHeader.audioSampleRateIndex;

        if (this._hasScript && !this._hasAudioSequence) {
          this.emit(DEMUX_EVENTS$2.METADATA_PARSED, 'audio');
        } else if (this._hasScript && this._hasAudioSequence) {
          this.emit(DEMUX_EVENTS$2.AUDIO_METADATA_CHANGE);
          // this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio')
        }
        this._hasAudioSequence = true;

        this._metaChange = true;
      } else {
        if (this._metaChange) {
          chunk.options = {
            meta: track.meta
          };
          this._metaChange = false;
        }

        chunk.data = chunk.data.slice(1, chunk.data.length);
        track.samples.push(chunk);
      }
      if (!validate) {
        this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error('TAG length error at ' + chunk.datasize), false);
        // this.logger.warn(this.TAG, error.message)
      }
    }

    /**
     * parse hevc/avc video data
     * @param chunk
     * @private
     */

  }, {
    key: '_parseHevcData',
    value: function _parseHevcData(chunk) {
      // header
      var info = this.loaderBuffer.shift(1)[0];
      chunk.frameType = (info & 0xf0) >>> 4;
      chunk.isKeyframe = chunk.frameType === 1;
      // let tempCodecID = this.tracks.videoTrack.codecID
      var codecID = info & 0x0f;
      this.tracks.videoTrack.codecID = codecID;

      // hevc和avc的header解析方式一样
      chunk.avcPacketType = this.loaderBuffer.shift(1)[0];
      chunk.cts = this.loaderBuffer.toInt(0, 3);
      this.loaderBuffer.shift(3);

      // 12 for hevc, 7 for avc
      if (codecID === 12) {
        var data = this.loaderBuffer.shift(chunk.datasize - 5);
        chunk.data = data;

        if (Number.parseInt(chunk.avcPacketType) !== 0) {
          if (!this._datasizeValidator(chunk.datasize)) {
            this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error('invalid video tag datasize: ' + chunk.datasize), false);
          }
          var nalu = {};
          var r = 0;
          nalu.cts = chunk.cts;
          nalu.dts = chunk.dts;
          while (chunk.data.length > r) {
            var sizes = chunk.data.slice(Number.parseInt(r), 4 + r);
            nalu.size = sizes[3];
            nalu.size += sizes[2] * 256;
            nalu.size += sizes[1] * 256 * 256;
            nalu.size += sizes[0] * 256 * 256 * 256;
            r += 4;
            nalu.data = chunk.data.slice(Number.parseInt(r), nalu.size + r);
            r += nalu.size;
            this.tracks.videoTrack.samples.push(nalu);
            this.emit(DEMUX_EVENTS$2.METADATA_PARSED, 'video');
          }
        } else if (Number.parseInt(chunk.avcPacketType) === 0) {
          if (!this._datasizeValidator(chunk.datasize)) {
            this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error('invalid video tag datasize: ' + chunk.datasize), false);
          } else {
            this.emit(DEMUX_EVENTS$2.METADATA_PARSED, 'video');
          }
        }
      } else if (codecID === 7) {
        var _data = this.loaderBuffer.shift(chunk.datasize - 5);
        if (_data[4] === 0 && _data[5] === 0 && _data[6] === 0 && _data[7] === 1) {
          var avcclength = 0;
          for (var i = 0; i < 4; i++) {
            avcclength = avcclength * 256 + _data[i];
          }
          avcclength -= 4;
          _data = _data.slice(4, _data.length);
          _data[3] = avcclength % 256;
          avcclength = (avcclength - _data[3]) / 256;
          _data[2] = avcclength % 256;
          avcclength = (avcclength - _data[2]) / 256;
          _data[1] = avcclength % 256;
          _data[0] = (avcclength - _data[1]) / 256;
        }

        chunk.data = _data;
        // If it is AVC sequece Header.
        if (chunk.avcPacketType === 0) {
          this._avcSequenceHeaderParser(chunk.data);
          var validate = this._datasizeValidator(chunk.datasize);
          if (validate) {
            if (this._hasScript && !this._hasVideoSequence) {
              this.emit(DEMUX_EVENTS$2.METADATA_PARSED, 'video');
            } else if (this._hasScript && this._hasVideoSequence) {
              this.emit(DEMUX_EVENTS$2.VIDEO_METADATA_CHANGE);
              // this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video')
            }
            this._hasVideoSequence = true;
          }
          this._metaChange = true;
        } else {
          if (!this._datasizeValidator(chunk.datasize)) {
            this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error('invalid video tag datasize: ' + chunk.datasize), false);
            return;
          }
          if (this._metaChange) {
            chunk.options = {
              meta: Object.assign({}, this.tracks.videoTrack.meta)
            };
            this._metaChange = false;
          }
          this.tracks.videoTrack.samples.push(chunk);
          // this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
        }
      } else {
        this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error('video codeid is ' + codecID), false);
        chunk.data = this.loaderBuffer.shift(chunk.datasize - 1);
        if (!this._datasizeValidator(chunk.datasize)) {
          this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error('invalid video tag datasize: ' + chunk.datasize), false);
        }
        this.tracks.videoTrack.samples.push(chunk);
        this.emit(DEMUX_EVENTS$2.DEMUX_COMPLETE);
      }
      delete chunk.tagType;
    }

    /**
     * parse avc metadata
     * @param data
     * @private
     */

  }, {
    key: '_avcSequenceHeaderParser',
    value: function _avcSequenceHeaderParser(data) {
      var track = this.tracks.videoTrack;

      if (!track) {
        return;
      }

      var offset = 0;

      if (!track.meta) {
        track.meta = new VideoTrackMeta$1();
      }
      var meta = track.meta;

      meta.configurationVersion = data[0];
      meta.avcProfileIndication = data[1];
      meta.profileCompatibility = data[2];
      meta.avcLevelIndication = data[3] / 10;
      meta.nalUnitLength = (data[4] & 0x03) + 1;

      var numOfSps = data[5] & 0x1f;
      offset = 6;
      var config = {};

      // parse SPS
      for (var i = 0; i < numOfSps; i++) {
        var size = data[offset] * 255 + data[offset + 1];
        offset += 2;

        var sps = new Uint8Array(size);
        for (var j = 0; j < size; j++) {
          sps[j] = data[offset + j];
        }

        // codec string
        var codecString = 'avc1.';
        for (var _j = 1; _j < 4; _j++) {
          var h = sps[_j].toString(16);
          if (h.length < 2) {
            h = '0' + h;
          }
          codecString += h;
        }

        meta.codec = codecString;

        offset += size;
        this.tracks.videoTrack.meta.sps = sps;
        config = SpsParser.parseSPS(sps);
      }

      var numOfPps = data[offset];

      offset++;

      for (var _i = 0; _i < numOfPps; _i++) {
        var _size = data[offset] * 255 + data[offset + 1];
        offset += 2;
        var pps = new Uint8Array(_size);
        for (var _j2 = 0; _j2 < _size; _j2++) {
          pps[_j2] = data[offset + _j2];
        }
        offset += _size;
        this.tracks.videoTrack.meta.pps = pps;
      }

      Object.assign(meta, SpsParser.toVideoMeta(config));

      // fill video media info
      var videoMedia = this._context.mediaInfo.video;

      videoMedia.codec = meta.codec;
      videoMedia.profile = meta.profile;
      videoMedia.level = meta.level;
      videoMedia.chromaFormat = meta.chromaFormat;
      videoMedia.frameRate = meta.frameRate;
      videoMedia.parRatio = meta.parRatio;
      videoMedia.width = videoMedia.width === meta.presentWidth ? videoMedia.width : meta.presentWidth;
      videoMedia.height = videoMedia.height === meta.presentHeight ? videoMedia.width : meta.presentHeight;

      meta.duration = this._context.mediaInfo.duration * meta.timescale;
      meta.avcc = new Uint8Array(data.length);
      meta.avcc.set(data);
      track.meta = meta;
    }

    /**
     * choose audio sample rate
     * @param samplingFrequencyIndex
     * @returns {number}
     * @private
     */

  }, {
    key: '_switchAudioSampleRate',
    value: function _switchAudioSampleRate(samplingFrequencyIndex) {
      var samplingFrequencyList = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
      return samplingFrequencyList[samplingFrequencyIndex];
    }

    /**
     * choose audio sampling frequence
     * @param info
     * @returns {number}
     * @private
     */

  }, {
    key: '_switchAudioSamplingFrequency',
    value: function _switchAudioSamplingFrequency(info) {
      var samplingFrequencyIndex = (info & 12) >>> 2;
      var samplingFrequencyList = [5500, 11025, 22050, 44100, 48000];
      return samplingFrequencyList[samplingFrequencyIndex];
    }

    /**
     * choose audio channel count
     * @param info
     * @returns {number}
     * @private
     */

  }, {
    key: '_switchAudioChannel',
    value: function _switchAudioChannel(info) {
      var sampleTrackNumIndex = info & 1;
      var sampleTrackNumList = [1, 2];
      return sampleTrackNumList[sampleTrackNumIndex];
    }

    /**
     * check datasize is valid use 4 Byte after current tag
     * @param datasize
     * @returns {boolean}
     * @private
     */

  }, {
    key: '_datasizeValidator',
    value: function _datasizeValidator(datasize) {
      var datasizeConfirm = this.loaderBuffer.toInt(0, 4);
      this.loaderBuffer.shift(4);
      return datasizeConfirm === datasize + 11;
    }
  }, {
    key: 'loaderBuffer',
    get: function get() {
      var buffer = this._context.getInstance('LOADER_BUFFER');
      if (buffer) {
        return buffer;
      } else {
        this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, new Error('找不到 loaderBuffer 实例'));
      }
    }
  }, {
    key: 'tracks',
    get: function get() {
      return this._context.getInstance('TRACKS');
    }
  }, {
    key: 'logger',
    get: function get() {
      return this._context.getInstance('LOGGER');
    }
  }], [{
    key: 'isFlvFile',
    value: function isFlvFile(data) {
      return !(data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01);
    }

    /**
     * If the stream has audio or video.
     * @param {number} streamFlag - Data from the stream which is define whether the audio / video track is exist.
     */

  }, {
    key: 'getPlayType',
    value: function getPlayType(streamFlag) {
      var result = {
        hasVideo: false,
        hasAudio: false
      };

      if (streamFlag & 0x01 > 0) {
        result.hasVideo = true;
      }

      if (streamFlag & 0x04 > 0) {
        result.hasAudio = true;
      }

      return result;
    }
  }]);

  return FlvDemuxer;
}();

var FlvDemuxer$1 = FlvDemuxer;

var _typeof$2 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

var _createClass$r = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck$r(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var LOADER_EVENTS$2 = EVENTS.LOADER_EVENTS;
var READ_STREAM = 0;
var READ_TEXT = 1;
var READ_JSON = 2;
var READ_BUFFER = 3;

var FetchLoader = function () {
  function FetchLoader(configs) {
    _classCallCheck$r(this, FetchLoader);

    this.configs = Object.assign({}, configs);
    this.url = null;
    this.status = 0;
    this.error = null;
    this._reader = null;
    this._canceled = false;
    this._destroyed = false;
    this.readtype = this.configs.readtype;
    this.buffer = this.configs.buffer || 'LOADER_BUFFER';
    this._loaderTaskNo = 0;
  }

  _createClass$r(FetchLoader, [{
    key: 'init',
    value: function init() {
      this.on(LOADER_EVENTS$2.LADER_START, this.load.bind(this));
    }
  }, {
    key: 'load',
    value: function load(url, opts) {
      var _this = this;
      this.url = url;

      this._canceled = false;

      // TODO: Add Ranges
      var params = this.getParams(opts);
      _this.loading = true;
      return fetch(this.url, params).then(function (response) {
        if (response.ok) {
          _this.status = response.status;
          return _this._onFetchResponse(response);
        }
        _this.loading = false;
        _this.emit(LOADER_EVENTS$2.LOADER_ERROR, _this.TAG, new Error('invalid response.'));
      }).catch(function (error) {
        _this.loading = false;
        _this.emit(LOADER_EVENTS$2.LOADER_ERROR, _this.TAG, error);
        throw new Error(error.message);
      });
    }
  }, {
    key: '_onFetchResponse',
    value: function _onFetchResponse(response) {
      var _this = this;
      var buffer = this._context.getInstance(this.buffer);
      this._loaderTaskNo++;
      var taskno = this._loaderTaskNo;
      if (response.ok === true) {
        switch (this.readtype) {
          case READ_JSON:
            response.json().then(function (data) {
              _this.loading = false;
              if (!_this._canceled && !_this._destroyed) {
                if (buffer) {
                  buffer.push(data);
                  _this.emit(LOADER_EVENTS$2.LOADER_COMPLETE, buffer);
                } else {
                  _this.emit(LOADER_EVENTS$2.LOADER_COMPLETE, data);
                }
              }
            });
            break;
          case READ_TEXT:
            response.text().then(function (data) {
              _this.loading = false;
              if (!_this._canceled && !_this._destroyed) {
                if (buffer) {
                  buffer.push(data);
                  _this.emit(LOADER_EVENTS$2.LOADER_COMPLETE, buffer);
                } else {
                  _this.emit(LOADER_EVENTS$2.LOADER_COMPLETE, data);
                }
              }
            });
            break;
          case READ_BUFFER:
            response.arrayBuffer().then(function (data) {
              _this.loading = false;
              if (!_this._canceled && !_this._destroyed) {
                if (buffer) {
                  buffer.push(new Uint8Array(data));
                  _this.emit(LOADER_EVENTS$2.LOADER_COMPLETE, buffer);
                } else {
                  _this.emit(LOADER_EVENTS$2.LOADER_COMPLETE, data);
                }
              }
            });
            break;
          case READ_STREAM:
          default:
            return this._onReader(response.body.getReader(), taskno);
        }
      }
    }
  }, {
    key: '_onReader',
    value: function _onReader(reader, taskno) {
      var buffer = this._context.getInstance(this.buffer);
      if (!buffer && this._reader || this._destroyed) {
        try {
          this._reader.cancel();
        } catch (e) {
          // DO NOTHING
        }
      }

      this._reader = reader;
      if (this.loading === false) {
        return;
      }

      var _this = this;
      // reader read function returns a Promise. get data when callback and has value.done when disconnected.
      // read方法返回一个Promise. 回调中可以获取到数据。当value.done存在时，说明链接断开。
      this._reader && this._reader.read().then(function (val) {
        if (_this._canceled || _this._destroyed) {
          if (_this._reader) {
            try {
              _this._reader.cancel();
            } catch (e) {
              // DO NOTHING
            }
          }
          return;
        }
        if (val.done) {
          _this.loading = false;
          _this.status = 0;
          _this.emit(LOADER_EVENTS$2.LOADER_COMPLETE, buffer);
          return;
        }

        buffer.push(val.value);
        _this.emit(LOADER_EVENTS$2.LOADER_DATALOADED, buffer);
        return _this._onReader(reader, taskno);
      }).catch(function (error) {
        _this.loading = false;
        _this.emit(LOADER_EVENTS$2.LOADER_ERROR, _this.TAG, error);
      });
    }
  }, {
    key: 'getParams',
    value: function getParams(opts) {
      var options = Object.assign({}, opts);
      var headers = new Headers();

      var params = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'

        // add custmor headers
        // 添加自定义头
      };if (_typeof$2(this.configs.headers) === 'object') {
        var configHeaders = this.configs.headers;
        for (var key in configHeaders) {
          if (configHeaders.hasOwnProperty(key)) {
            headers.append(key, configHeaders[key]);
          }
        }
      }

      if (_typeof$2(options.headers) === 'object') {
        var optHeaders = options.headers;
        for (var _key in optHeaders) {
          if (optHeaders.hasOwnProperty(_key)) {
            headers.append(_key, optHeaders[_key]);
          }
        }
      }

      if (options.cors === false) {
        params.mode = 'same-origin';
      }

      // withCredentials is disabled by default
      // withCredentials 在默认情况下不被使用。
      if (options.withCredentials) {
        params.credentials = 'include';
      }

      // TODO: Add ranges;
      return params;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this._reader) {
        try {
          this._reader.cancel();
        } catch (e) {
          // 防止failed: 200错误被打印到控制台上
        }
        this._reader = null;
        this.loading = false;
      }
      this._canceled = true;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._destroyed = true;
      this.cancel();
    }
  }], [{
    key: 'type',
    get: function get() {
      return 'loader';
    }
  }]);

  return FetchLoader;
}();

var FetchLoader$1 = FetchLoader;

var REMUX_EVENTS$3 = EVENTS.REMUX_EVENTS;
var DEMUX_EVENTS$3 = EVENTS.DEMUX_EVENTS;
var LOADER_EVENTS$3 = EVENTS.LOADER_EVENTS;
var MSE_EVENTS$1 = EVENTS.MSE_EVENTS;

var Tag = 'FLVController';

var Logger = function () {
  function Logger() {
    classCallCheck(this, Logger);
  }

  createClass(Logger, [{
    key: 'warn',
    value: function warn() {}
  }]);
  return Logger;
}();

var FLV_ERROR = 'FLV_ERROR';

var FlvController = function () {
  function FlvController(player) {
    classCallCheck(this, FlvController);

    this.TAG = Tag;
    this._player = player;

    this.state = {
      initSegmentArrived: false,
      randomAccessPoints: []
    };

    this.bufferClearTimer = null;
  }

  createClass(FlvController, [{
    key: 'init',
    value: function init() {
      this._context.registry('FETCH_LOADER', FetchLoader$1);
      this._context.registry('LOADER_BUFFER', XgBuffer$1);

      this._context.registry('FLV_DEMUXER', FlvDemuxer$1);
      this._context.registry('TRACKS', Tracks$1);

      this._context.registry('MP4_REMUXER', Remuxer.Mp4Remuxer);
      this._context.registry('PRE_SOURCE_BUFFER', PreSource$1);

      if (this._player.config.compatibility !== false) {
        this._context.registry('COMPATIBILITY', Compatibility$1);
      }

      this._context.registry('LOGGER', Logger);
      this.mse = this._context.registry('MSE', Mse)({ container: this._player.video });

      this._handleTimeUpdate = this._handleTimeUpdate.bind(this);

      this.initListeners();
    }
  }, {
    key: 'initListeners',
    value: function initListeners() {
      this.on(LOADER_EVENTS$3.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this));
      this.on(LOADER_EVENTS$3.LOADER_ERROR, this._handleNetworkError.bind(this));

      this.on(DEMUX_EVENTS$3.MEDIA_INFO, this._handleMediaInfo.bind(this));
      this.on(DEMUX_EVENTS$3.METADATA_PARSED, this._handleMetadataParsed.bind(this));
      this.on(DEMUX_EVENTS$3.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this));
      this.on(DEMUX_EVENTS$3.DEMUX_ERROR, this._handleDemuxError.bind(this));

      this.on(REMUX_EVENTS$3.INIT_SEGMENT, this._handleAppendInitSegment.bind(this));
      this.on(REMUX_EVENTS$3.MEDIA_SEGMENT, this._handleMediaSegment.bind(this));
      this.on(REMUX_EVENTS$3.RANDOM_ACCESS_POINT, this._handleAddRAP.bind(this));

      this.on(MSE_EVENTS$1.SOURCE_UPDATE_END, this._handleSourceUpdateEnd.bind(this));

      this._player.on('timeupdate', this._handleTimeUpdate);
    }
  }, {
    key: '_handleMediaInfo',
    value: function _handleMediaInfo() {
      if (!this._context.mediaInfo) {
        this.emit(DEMUX_EVENTS$3.DEMUX_ERROR, new Error('failed to get mediainfo'));
      }
    }
  }, {
    key: '_handleLoaderDataLoaded',
    value: function _handleLoaderDataLoaded() {
      this.emitTo('FLV_DEMUXER', DEMUX_EVENTS$3.DEMUX_START);
    }
  }, {
    key: '_handleMetadataParsed',
    value: function _handleMetadataParsed(type) {
      this.emit(REMUX_EVENTS$3.REMUX_METADATA, type);
    }
  }, {
    key: '_handleDemuxComplete',
    value: function _handleDemuxComplete() {
      this.emit(REMUX_EVENTS$3.REMUX_MEDIA);
    }
  }, {
    key: '_handleAppendInitSegment',
    value: function _handleAppendInitSegment() {
      this.state.initSegmentArrived = true;
      this.mse.addSourceBuffers();
    }
  }, {
    key: '_handleMediaSegment',
    value: function _handleMediaSegment() {
      this.mse.addSourceBuffers();
      this.mse.doAppend();
    }
  }, {
    key: '_handleSourceUpdateEnd',
    value: function _handleSourceUpdateEnd() {
      var time = this._player.currentTime;
      var video = this._player.video;
      var preloadTime = this._player.config.preloadTime || 5;

      var length = video.buffered.length;


      if (length === 0) {
        return;
      }

      var bufferEnd = video.buffered.end(length - 1);
      if (bufferEnd - time > preloadTime * 2) {
        this._player.currentTime = bufferEnd - preloadTime;
      }
      this.mse.doAppend();
    }
  }, {
    key: '_handleTimeUpdate',
    value: function _handleTimeUpdate() {
      var _this = this;

      var time = this._player.currentTime;

      var video = this._player.video;
      var buffered = video.buffered;

      if (!buffered || !buffered.length) {
        return;
      }

      var range = [0, 0];
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

      var bufferStart = range[0];
      var bufferEnd = range[1];

      if (currentTime > bufferEnd || currentTime < bufferStart) {
        video.currentTime = bufferStart;
        return;
      }

      if (time - bufferStart > 10 || buffered.length > 1) {
        // 在直播时及时清空buffer，降低直播内存占用
        if (this.bufferClearTimer || !this.state.randomAccessPoints.length) {
          return;
        }
        var rap = Infinity;
        for (var _i = 0; _i < this.state.randomAccessPoints.length; _i++) {
          var temp = Math.ceil(this.state.randomAccessPoints[_i] / 1000);
          if (temp > time - 10) {
            break;
          } else {
            rap = temp;
          }
        }

        // console.log('rap', rap, `time ${time}`, `bufferEnd ${bufferEnd}`,`clean ${Math.min(rap, time - 10, bufferEnd - 10)}`)
        this.mse.remove(Math.max(Math.min(rap, time - 10, bufferEnd - 10), 0.1), 0);

        this.bufferClearTimer = setTimeout(function () {
          _this.bufferClearTimer = null;
        }, 5000);
      }
    }
  }, {
    key: '_handleNetworkError',
    value: function _handleNetworkError(tag, err) {
      this._player.emit('error', new Player.Errors('network', this._player.config.url));
      this._onError(LOADER_EVENTS$3.LOADER_ERROR, tag, err, true);
    }
  }, {
    key: '_handleDemuxError',
    value: function _handleDemuxError(tag, err, fatal) {
      if (fatal === undefined) {
        fatal = false;
      }
      this._player.emit('error', new Player.Errors('parse', this._player.config.url));
      this._onError(DEMUX_EVENTS$3.DEMUX_ERROR, tag, err, fatal);
    }
  }, {
    key: '_handleAddRAP',
    value: function _handleAddRAP(rap) {
      if (this.state.randomAccessPoints) {
        this.state.randomAccessPoints.push(rap);
      }
    }
  }, {
    key: '_onError',
    value: function _onError(type, mod, err, fatal) {
      var error = {
        errorType: type,
        errorDetails: '[' + mod + ']: ' + err.message,
        errorFatal: fatal || false
      };
      this._player.emit(FLV_ERROR, error);
    }
  }, {
    key: 'seek',
    value: function seek() {
      if (!this.state.initSegmentArrived) {
        this.loadData();
      }
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      this.emit(LOADER_EVENTS$3.LADER_START, this._player.config.url);
    }
  }, {
    key: 'pause',
    value: function pause() {
      var loader = this._context.getInstance('FETCH_LOADER');

      if (loader) {
        loader.cancel();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._player.off('timeupdate', this._handleTimeUpdate);
      this._player = null;
      this.mse = null;
      this.state.randomAccessPoints = [];
    }
  }]);
  return FlvController;
}();

var flvAllowedEvents = EVENTS.FlvAllowedEvents;

var FlvPlayer = function (_Player) {
  inherits(FlvPlayer, _Player);

  function FlvPlayer(config) {
    classCallCheck(this, FlvPlayer);

    var _this = possibleConstructorReturn(this, (FlvPlayer.__proto__ || Object.getPrototypeOf(FlvPlayer)).call(this, config));

    _this.context = new Context$1(flvAllowedEvents);
    _this.initEvents();
    _this.loaderCompleteTimer = null;
    // const preloadTime = player.config.preloadTime || 15
    return _this;
  }

  createClass(FlvPlayer, [{
    key: 'start',
    value: function start() {
      this.initFlv();
      this.context.init();
      get$1(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'start', this).call(this, this.flv.mse.url);
    }
  }, {
    key: 'initFlvEvents',
    value: function initFlvEvents(flv) {
      var _this2 = this;

      var player = this;
      flv.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, function () {
        Player.util.addClass(player.root, 'xgplayer-is-live');
        if (!Player.util.findDom(_this2.root, 'xg-live')) {
          var live = Player.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
          player.controls.appendChild(live);
        }
      });

      flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, function () {
        // 直播完成，待播放器播完缓存后发送关闭事件
        if (!player.paused) {
          _this2.loaderCompleteTimer = setInterval(function () {
            var end = player.getBufferedRange()[1];
            if (Math.abs(player.currentTime - end) < 0.5) {
              player.emit('ended');
              window.clearInterval(_this2.loaderCompleteTimer);
            }
          }, 200);
        } else {
          player.emit('ended');
        }
      });
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      var _this3 = this;

      this.on('timeupdate', function () {
        _this3.loadData();
      });

      this.on('seeking', function () {
        var time = _this3.currentTime;
        var range = _this3.getBufferedRange();
        if (time > range[1] || time < range[0]) {
          _this3.flv.seek(_this3.currentTime);
        }
      });
    }
  }, {
    key: 'initFlv',
    value: function initFlv() {
      var flv = this.context.registry('FLV_CONTROLLER', FlvController)(this);
      this.initFlvEvents(flv);
      this.flv = flv;
    }
  }, {
    key: 'play',
    value: function play() {
      var _this4 = this;

      if (this._hasStart) {
        return this._destroy().then(function () {
          _this4.context = new Context$1(flvAllowedEvents);
          var flv = _this4.context.registry('FLV_CONTROLLER', FlvController)(_this4);
          _this4.initFlvEvents(flv);
          _this4.flv = flv;
          _this4.context.init();
          get$1(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'start', _this4).call(_this4, flv.mse.url);
          return get$1(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'play', _this4).call(_this4);
        });
      } else {
        return get$1(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'play', this).call(this);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      get$1(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'pause', this).call(this);
      if (this.flv) {
        this.flv.pause();
      }
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentTime;

      if (this.flv) {
        this.flv.seek(time);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this._destroy().then(function () {
        get$1(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'destroy', _this5).call(_this5);
      });
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      var _this6 = this;

      return this.flv.mse.destroy().then(function () {
        _this6.context.destroy();
        _this6.flv = null;
        _this6.context = null;
        if (_this6.loaderCompleteTimer) {
          window.clearInterval(_this6.loaderCompleteTimer);
        }
      });
    }
  }, {
    key: 'src',
    get: function get() {
      return this.currentSrc;
    },
    set: function set(url) {
      var _this7 = this;

      this.player.config.url = url;
      if (!this.paused) {
        this.pause();
        this.once('pause', function () {
          _this7.start(url);
        });
        this.once('canplay', function () {
          _this7.play();
        });
      } else {
        this.start(url);
      }
      this.once('canplay', function () {
        _this7.currentTime = 0;
      });
    }
  }]);
  return FlvPlayer;
}(Player);

export default FlvPlayer;
//# sourceMappingURL=index.js.map
