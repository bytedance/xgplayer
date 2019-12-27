(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('xgplayer')) :
  typeof define === 'function' && define.amd ? define(['xgplayer'], factory) :
  (global = global || self, factory(global.Player));
}(this, (function (Player) { 'use strict';

  Player = Player && Player.hasOwnProperty('default') ? Player['default'] : Player;

  var LIBRARY = require('./_library');
  var global = require('./_global');
  var ctx = require('./_ctx');
  var classof = require('./_classof');
  var $export = require('./_export');
  var isObject = require('./_is-object');
  var aFunction = require('./_a-function');
  var anInstance = require('./_an-instance');
  var forOf = require('./_for-of');
  var speciesConstructor = require('./_species-constructor');
  var task = require('./_task').set;
  var microtask = require('./_microtask')();
  var newPromiseCapabilityModule = require('./_new-promise-capability');
  var perform = require('./_perform');
  var userAgent = require('./_user-agent');
  var promiseResolve = require('./_promise-resolve');
  var PROMISE = 'Promise';
  var TypeError$1 = global.TypeError;
  var process = global.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8 || '';
  var $Promise = global[PROMISE];
  var isNode = classof(process) == 'process';
  var empty = function () {/* empty */};
  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

  var USE_NATIVE = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);
      var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
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
  var isThenable = function (it) {
    var then;
    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
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
  var isUnhandled = function (promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled = function (promise) {
    task.call(global, function () {
      var handler;
      if (isNode) {
        process.emit('rejectionHandled', promise);
      } else if (handler = global.onrejectionhandled) {
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
    Internal.prototype = require('./_redefine-all')($Promise.prototype, {
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
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = ctx($resolve, promise, 1);
      this.reject = ctx($reject, promise, 1);
    };
    newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
      return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    };
  }

  $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
  require('./_set-to-string-tag')($Promise, PROMISE);
  require('./_set-species')(PROMISE);
  Wrapper = require('./_core')[PROMISE];

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
  $export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
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

  // https://github.com/tc39/proposal-string-pad-start-end

  var $export$1 = require('./_export');
  var $pad = require('./_string-pad');
  var userAgent$1 = require('./_user-agent');

  // https://github.com/zloirock/core-js/issues/280
  var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent$1);

  $export$1($export$1.P + $export$1.F * WEBKIT_BUG, 'String', {
    padStart: function padStart(maxLength /* , fillString = ' ' */) {
      return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
    }
  });

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

  var process$1 = function (src, obj) {
  	var key;
  	for (key in src) obj[key] = src[key];
  };

  // eslint-disable-next-line no-unused-vars
  var normalizeOptions = function (opts1/*, …options*/) {
  	var result = create(null);
  	forEach.call(arguments, function (options) {
  		if (!isValue(options)) return;
  		process$1(Object(options), result);
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

  var isMergeableObject = function isMergeableObject(value) {
  	return isNonNullObject(value)
  		&& !isSpecial(value)
  };

  function isNonNullObject(value) {
  	return !!value && typeof value === 'object'
  }

  function isSpecial(value) {
  	var stringValue = Object.prototype.toString.call(value);

  	return stringValue === '[object RegExp]'
  		|| stringValue === '[object Date]'
  		|| isReactElement(value)
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
  	return value.$$typeof === REACT_ELEMENT_TYPE
  }

  function emptyTarget(val) {
  	return Array.isArray(val) ? [] : {}
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
  	return (options.clone !== false && options.isMergeableObject(value))
  		? deepmerge(emptyTarget(value), value, options)
  		: value
  }

  function defaultArrayMerge(target, source, options) {
  	return target.concat(source).map(function(element) {
  		return cloneUnlessOtherwiseSpecified(element, options)
  	})
  }

  function mergeObject(target, source, options) {
  	var destination = {};
  	if (options.isMergeableObject(target)) {
  		Object.keys(target).forEach(function(key) {
  			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
  		});
  	}
  	Object.keys(source).forEach(function(key) {
  		if (!options.isMergeableObject(source[key]) || !target[key]) {
  			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
  		} else {
  			destination[key] = deepmerge(target[key], source[key], options);
  		}
  	});
  	return destination
  }

  function deepmerge(target, source, options) {
  	options = options || {};
  	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

  	var sourceIsArray = Array.isArray(source);
  	var targetIsArray = Array.isArray(target);
  	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  	if (!sourceAndTargetTypesMatch) {
  		return cloneUnlessOtherwiseSpecified(source, options)
  	} else if (sourceIsArray) {
  		return options.arrayMerge(target, source, options)
  	} else {
  		return mergeObject(target, source, options)
  	}
  }

  deepmerge.all = function deepmergeAll(array, options) {
  	if (!Array.isArray(array)) {
  		throw new Error('first argument should be an array')
  	}

  	return array.reduce(function(prev, next) {
  		return deepmerge(prev, next, options)
  	}, {})
  };

  var deepmerge_1 = deepmerge;

  var version = "1.1.5";

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

  var _Errors = function (_Player$Errors) {
    inherits(_Errors, _Player$Errors);

    function _Errors(type, vid) {
      var errd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var url = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      classCallCheck(this, _Errors);

      errd.version = version;

      var _this = possibleConstructorReturn(this, (_Errors.__proto__ || Object.getPrototypeOf(_Errors)).call(this, type, vid, errd));

      _this.url = url;
      return _this;
    }

    return _Errors;
  }(Player.Errors);

  var Stream = function () {
    function Stream(buffer) {
      classCallCheck(this, Stream);

      if (buffer instanceof ArrayBuffer) {
        this.buffer = buffer;
        this.dataview = new DataView(buffer);
        this.dataview.position = 0;
      } else {
        throw new _Errors('parse', '', { line: 9, handle: '[Stream] constructor', msg: 'data is valid' });
      }
    }

    createClass(Stream, [{
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
              throw new _Errors('parse', '', { line: 73, handle: '[Stream] readByte', msg: 'not supported for readBody 8' });
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

  var Box = function () {
    function Box() {
      classCallCheck(this, Box);

      this.headSize = 8;
      this.size = 0;
      this.type = '';
      this.subBox = [];
      this.start = -1;
    }

    createClass(Box, [{
      key: 'readHeader',
      value: function readHeader(stream) {
        this.start = stream.position;
        this.size = stream.readUint32();
        this.type = String.fromCharCode(stream.readUint8(), stream.readUint8(), stream.readUint8(), stream.readUint8());
        if (this.size === 1) {
          this.size = stream.readUint64();
        } else if (this.size === 0) {
          if (this.type !== 'mdat') {
            throw new _Errors('parse', '', { line: 19, handle: '[Box] readHeader', msg: 'parse mp4 mdat box failed' });
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
        var stream = new Stream(this.data);
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

  Box.avc1 = function () {
    var stream = new Stream(this.data);
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
      var box = new Box();
      box.readHeader(stream);
      self.subBox.push(box);
      box.readBody(stream);
    }
    delete this.data;
    stream = null;
  };

  Box.avcC = function () {
    var stream = new Stream(this.data);
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

  Box.btrt = function () {
    var stream = new Stream(this.data);
    this.bufferSizeDB = stream.readUint32();
    this.maxBitrate = stream.readUint32();
    this.avgBitrate = stream.readUint32();
    delete this.subBox;
    delete this.data;
    stream = null;
  };

  Box.co64 = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
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

  Box.ctts = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);

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

  Box.dref = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
    var entryCount = stream.readUint32();
    this.entryCount = entryCount;
    var self = this;
    // 暂时不支持离散视频，视频的部分内容由url指定
    for (var i = 0; i < entryCount; i++) {
      var box = new Box();
      self.subBox.push(box);
      box.read(stream);
    }
    delete this.data;
    stream = null;
  };

  Box.elst = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
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

  Box.esds = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
    var box = Box.MP4ESDescrTag(stream);
    this.subBox.push(box);
    delete this.data;
    stream = null;
  };

  Box.ftyp = function () {
    var stream = new Stream(this.data);
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

  Box.hdlr = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
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

  Box.iods = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
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

  Box.mdat = function () {
    delete this.subBox;
  };

  var UTC = function () {
    function UTC() {
      classCallCheck(this, UTC);

      var time = new Date();
      time.setFullYear(1904);
      time.setMonth(0);
      time.setDate(1);
      time.setHours(0);
      time.setMinutes(0);
      time.setSeconds(0);
      this.time = time;
    }

    createClass(UTC, [{
      key: "setTime",
      value: function setTime(value) {
        this.time.setTime(this.time.getTime() + value * 1);
        return this.time.toLocaleString();
      }
    }]);
    return UTC;
  }();

  Box.mdhd = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
    if (this.version === 1) {
      this.create = stream.readUint64();
      this.modify = stream.readUint64();
      this.createTime = new UTC().setTime(this.create * 1000);
      this.modifyTime = new UTC().setTime(this.modify * 1000);
      this.timescale = stream.readUint32();
      this.duration = stream.readUint64();
    } else {
      this.create = stream.readUint32();
      this.modify = stream.readUint32();
      this.createTime = new UTC().setTime(this.create * 1000);
      this.modifyTime = new UTC().setTime(this.modify * 1000);
      this.timescale = stream.readUint32();
      this.duration = stream.readUint32();
    }
    this.language = stream.readUint16();
    stream.readUint16();
    delete this.subBox;
    delete this.data;
    stream = null;
  };

  Box.mp4a = function () {
    var stream = new Stream(this.data);
    stream.skip(6);
    this.dataReferenceIndex = stream.readUint16();
    stream.skip(8);
    this.channelCount = stream.readUint16();
    this.sampleSize = stream.readUint16();
    stream.skip(4);
    this.sampleRate = stream.readUint32() / 65536;
    var box = new Box();
    box.readHeader(stream);
    this.subBox.push(box);
    box.readBody(stream);
    delete this.data;
    stream = null;
  };

  Box.MP4DecConfigDescrTag = function (stream) {
    var box = new Box();
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
    box.bufferSize = Stream.readByte(stream.dataview, 3);
    box.maximum = stream.readUint32();
    box.average = stream.readUint32();
    box.subBox.push(Box.MP4DecSpecificDescrTag(stream));
    return box;
  };

  Box.MP4DecSpecificDescrTag = function (stream) {
    var box = new Box();
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

  Box.MP4ESDescrTag = function (stream) {
    var box = new Box();
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
    box.subBox.push(Box.MP4DecConfigDescrTag(stream));
    box.subBox.push(Box.SLConfigDescriptor(stream));
    return box;
  };

  Box.mvhd = function () {
    var stream = new Stream(this.data);

    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
    this.create = stream.readUint32();
    this.modify = stream.readUint32();
    this.createTime = new UTC().setTime(this.create * 1000);
    this.modifyTime = new UTC().setTime(this.modify * 1000);
    this.timeScale = stream.readUint32();
    this.duration = stream.readUint32();
    this.rate = stream.readUint16() + '.' + stream.readUint16();
    this.volume = stream.readUint8() + '.' + stream.readUint8();
    // 越过保留的10字节
    Stream.readByte(stream.dataview, 8);
    Stream.readByte(stream.dataview, 2);
    // 视频转换矩阵
    var matrix = [];
    for (var i = 0; i < 9; i++) {
      matrix.push(stream.readUint16() + '.' + stream.readUint16());
    }
    this.matrix = matrix;
    Stream.readByte(stream.dataview, 24);
    this.nextTrackID = stream.readUint32();
    delete this.subBox;
    delete this.data;
  };

  Box.pasp = function () {
    var stream = new Stream(this.data);
    this.content = stream.buffer.slice(0, this.size - 8);
    delete this.subBox;
    delete this.data;
    stream = null;
  };

  Box.SLConfigDescriptor = function (stream) {
    var box = new Box();
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

  Box.smhd = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
    this.balance = stream.readInt8() + '.' + stream.readInt8();
    delete this.subBox;
    delete this.data;
    stream = null;
  };

  Box.stco = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
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

  Box.stsc = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
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

  Box.stsd = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
    this.entryCount = stream.readUint32();
    var box = new Box();
    box.readHeader(stream);
    this.subBox.push(box);
    box.readBody(stream);
    delete this.data;
    stream = null;
  };

  Box.stss = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
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

  Box.stsz = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
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

  Box.stts = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3);
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

  Box.tkhd = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = Stream.readByte(stream.dataview, 3, 0);
    if (this.version === 1) {
      this.create = stream.readUint64();
      this.modify = stream.readUint64();
      this.createTime = new UTC().setTime(this.create * 1000);
      this.modifyTime = new UTC().setTime(this.modify * 1000);
      this.trackID = stream.readUint32();
      this.reserverd = stream.readUint32();
      this.duration = stream.readUint64();
    } else {
      this.create = stream.readUint32();
      this.modify = stream.readUint32();
      this.createTime = new UTC().setTime(this.create * 1000);
      this.modifyTime = new UTC().setTime(this.modify * 1000);
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

  Box.udta = function () {
    delete this.subBox;
  };

  Box['url '] = function () {
    var stream = new Stream(this.data);
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

  Box.vmhd = function () {
    var stream = new Stream(this.data);
    this.version = stream.readUint8();
    this.flag = [stream.readUint8(), stream.readUint8(), stream.readUint8()];
    this.graphicsmode = stream.readUint16();
    this.opcolor = [stream.readUint16(), stream.readUint16(), stream.readUint16()];
    delete this.subBox;
    delete this.data;
    stream = null;
  };

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

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  module.exports = _concat2.default;
  });

  var Concat = unwrapExports(lib);

  var Parse = function Parse(buffer) {
    classCallCheck(this, Parse);

    this.buffer = null;
    this.boxes = [];
    this.nextBox = null;
    this.start = 0;
    var self = this;
    if (self.buffer) {
      Concat(Uint8Array, self.buffer, buffer);
    } else {
      self.buffer = buffer;
    }
    var bufferLength = buffer.byteLength;
    buffer.position = 0;
    var stream = new Stream(buffer);
    while (bufferLength - stream.position >= 8) {
      var box = new Box();
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

  var Buffer = function () {
    function Buffer() {
      classCallCheck(this, Buffer);

      this.buffer = new Uint8Array(0);
    }

    createClass(Buffer, [{
      key: 'write',
      value: function write() {
        var self = this;

        for (var _len = arguments.length, buffer = Array(_len), _key = 0; _key < _len; _key++) {
          buffer[_key] = arguments[_key];
        }

        buffer.forEach(function (item) {
          if (item) {
            self.buffer = Concat(Uint8Array, self.buffer, item);
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

  var UINT32_MAX = Math.pow(2, 32) - 1;

  var FMP4 = function () {
    function FMP4() {
      classCallCheck(this, FMP4);
    }

    createClass(FMP4, null, [{
      key: 'type',
      value: function type(name) {
        return new Uint8Array([name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)]);
      }
    }, {
      key: 'size',
      value: function size(value) {
        return Buffer.writeUint32(value);
      }
    }, {
      key: 'extension',
      value: function extension(version, flag) {
        return new Uint8Array([version, flag >> 16 & 0xff, flag >> 8 & 0xff, flag & 0xff]);
      }
    }, {
      key: 'ftyp',
      value: function ftyp() {
        var buffer = new Buffer();
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
        var buffer = new Buffer();var size = 8;

        var mvhd = FMP4.mvhd(data.duration, data.timeScale);
        var trak = FMP4.audioTrak(data);
        var mvex = FMP4.mvex(data.duration, data.timeScale);
        var udtaBuffer = new Buffer();
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();var size = 8;
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
        var udtaBuffer = new Buffer();
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();var duration = data.duration;var mediaTime = data.mediaTime;
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
        var buffer = new Buffer();var size = 8;
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

        var buffer = new Buffer();
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();var size = 8;
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();var size = 8;
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
        var buffer = new Buffer();var content = void 0;
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();var size = 40; // 8(avc1)+8(avcc)+8(btrt)+16(pasp)
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();
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
        var buffer = new Buffer();var size = 8;
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
        var buffer = new Buffer();
        var content = new Uint8Array([duration >> 24, duration >> 16 & 0xff, duration >> 8 & 0xff, duration & 0xff]);
        buffer.write(FMP4.size(16), FMP4.type('mehd'), FMP4.extension(0, 0), content);
        return buffer.buffer;
      }
    }, {
      key: 'trex',
      value: function trex(id) {
        var buffer = new Buffer();
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
        var buffer = new Buffer();
        var content = new Uint8Array([id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff]);
        buffer.write(FMP4.size(16), FMP4.type('trep'), FMP4.extension(0, 0), content);
        return buffer.buffer;
      }
    }, {
      key: 'moof',
      value: function moof(data) {
        var buffer = new Buffer();var size = 8;
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
        var buffer = new Buffer();
        var content = Buffer.writeUint32(FMP4.sequence);
        FMP4.sequence += 1;
        buffer.write(FMP4.size(16), FMP4.type('mfhd'), FMP4.extension(0, 0), content);
        return buffer.buffer;
      }
    }, {
      key: 'traf',
      value: function traf(data) {
        var buffer = new Buffer();var size = 8;
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
        var buffer = new Buffer();
        var content = Buffer.writeUint32(id);
        buffer.write(FMP4.size(16), FMP4.type('tfhd'), FMP4.extension(0, 131072), content);
        return buffer.buffer;
      }
    }, {
      key: 'tfdt',
      value: function tfdt(time) {
        var buffer = new Buffer();
        var content = new Uint8Array([time >> 24, time >> 16 & 0xff, time >> 8 & 0xff, time & 0xff]);
        buffer.write(FMP4.size(16), FMP4.type('tfdt'), FMP4.extension(0, 0), content);
        return buffer.buffer;
      }
    }, {
      key: 'trun',
      value: function trun(data) {
        var buffer = new Buffer();
        var sampleCount = Buffer.writeUint32(data.samples.length);
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
        var offset = Buffer.writeUint32(92 + 4 * data.samples.length);
        buffer.write(FMP4.size(20 + 4 * data.samples.length), FMP4.type('trun'), FMP4.extension(0, 513), sampleCount, offset);
        data.samples.forEach(function (item, idx) {
          buffer.write(Buffer.writeUint32(item.size));
        });
        return buffer.buffer;
      }
    }, {
      key: 'mdat',
      value: function mdat(data) {
        var buffer = new Buffer();var size = 8;
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

  var Task = function () {
    function Task(url, range, callback) {
      classCallCheck(this, Task);

      eventEmitter(this);
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
        xhr.target.emit('error', new _Errors('network', '', { line: 25, handle: '[Task] constructor', msg: e.message, url: url }));
        xhr.target.remove();
      };
      xhr.onabort = function () {
        xhr.target.remove();
      };
      this.xhr = xhr;
      Task.queue.push(this);
      this.update();
    }

    createClass(Task, [{
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

  var MP4 = function () {
    /**
       * [constructor 构造函数]
       * @param {String} url                      [视频地址]
       * @param {Number} [chunk_size=Math.pow(25, 4)]           [请求的数据块大小，对于长视频设置的较大些可以避免二次请求]
       */
    function MP4(url) {
      var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1024;
      classCallCheck(this, MP4);

      eventEmitter(this);
      this.url = url;
      this.CHUNK_SIZE = chunkSize;
      this.reqTimeLength = 5;
      this.init(url);
      this.once('mdatReady', this.moovParse.bind(this));
      this.cache = new Buffer();
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


    createClass(MP4, [{
      key: 'getData',
      value: function getData() {
        var _this = this;

        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start + this.CHUNK_SIZE;

        var self = this;
        return new Promise(function (resolve, reject) {
          var task = new Task(_this.url, [start, end], resolve);
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
        var mvhd = util.findBox(moov, 'mvhd');
        var traks = util.findBox(moov, 'trak');
        var audioTrak = void 0;
        var audioCodec = void 0;
        var audioTimeScale = void 0;
        var channelCount = void 0,
            sampleRate = void 0,
            decoderConfig = void 0;
        if (Player.util.typeOf(traks) !== 'Array') {
          traks = [traks];
        }
        traks.forEach(function (trak) {
          var hdlr = util.findBox(trak, 'hdlr');
          var mdhd = util.findBox(trak, 'mdhd');
          if (!hdlr || !mdhd) {
            self.emit('error', new _Errors('parse', '', { line: 72, handle: '[MP4] moovParse', url: self.url }));
            return;
          }
          var stsd = util.findBox(trak, 'stsd');
          var codecBox = stsd.subBox[0];
          if (hdlr.handleType === 'soun') {
            audioTrak = trak;
            var esds = util.findBox(trak, 'esds');
            var mp4a = util.findBox(trak, 'mp4a');
            var ESDescriptor = util.findBox(trak, 5);
            audioTimeScale = mdhd.timescale;
            if (esds) {
              audioCodec = codecBox.type + '.' + util.toHex(esds.subBox[0].subBox[0].typeID) + ('.' + esds.subBox[0].subBox[0].subBox[0].type);
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
        this.audioTrak = deepmerge_1({}, audioTrak);
        var mdat = this._boxes.find(function (item) {
          return item.type === 'mdat';
        });
        var audioDuration = parseFloat(util.seekTrakDuration(audioTrak, audioTimeScale));
        this.mdatStart = mdat.start;
        this.sampleCount = util.sampleCount(util.findBox(this.audioTrak, 'stts').entry);

        var audioFrame = void 0,
            audioNextFrame = void 0;
        var stts = util.findBox(this.audioTrak, 'stts').entry;
        for (var i = 0; i < audioDuration; i += this.reqTimeLength) {
          audioFrame = util.seekOrderSampleByTime(stts, audioTimeScale, i);
          if (i + this.reqTimeLength < audioDuration) {
            audioNextFrame = util.seekOrderSampleByTime(stts, audioTimeScale, i + this.reqTimeLength);
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
            parsedFir = new Parse(resFir);
          } catch (e) {
            self.emit('error', e.type ? e : new _Errors('parse', '', { line: 176, handle: '[MP4] init', msg: e.message }));
            return false;
          }
          self._boxes = boxes = parsedFir.boxes;
          boxes.every(function (item) {
            if (item.type === 'ftyp') {
              mdatStart += item.size;
              ftyp = item;
              self.ftypBox = ftyp;
              self.ftypBuffer = resFir.slice(0, ftyp.size);
            } else if (item.type === 'mdat') {
              mdat = item;
              mdat.start = mdatStart;
              mdatStart += item.size;
              self.mdatBox = mdat;
              // self.emit('mdatReady', moov)
            }
            return true;
          });
          if (!mdat) {
            var nextBox = parsedFir.nextBox;
            if (nextBox) {
              if (nextBox.type === 'moov' || nextBox.type === 'free') {
                self.getData(mdatStart, mdatStart + nextBox.size + 1024).then(function (resSec) {
                  var parsedSec = new Parse(resSec);
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
                          var parsedThi = new Parse(resThi);
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
                            self.emit('error', new _Errors('parse', '', { line: 207, handle: '[MP4] init', msg: 'not find mdat box' }));
                          }
                        }).catch(function () {
                          self.emit('error', new _Errors('network', '', { line: 210, handle: '[MP4] getData', msg: 'getData failed' }));
                        });
                      } else {
                        self.emit('error', new _Errors('parse', '', { line: 213, handle: '[MP4] init', msg: 'not find mdat box' }));
                      }
                    } else {
                      self.emit('error', new _Errors('parse', '', { line: 216, handle: '[MP4] init', msg: 'not find mdat box' }));
                    }
                  }
                }).catch(function () {
                  self.emit('error', new _Errors('network', '', { line: 220, handle: '[MP4] getData', msg: 'getData failed' }));
                });
              } else {
                self.emit('error', new _Errors('parse', '', { line: 223, handle: '[MP4] init', msg: 'not find mdat box' }));
              }
            } else {
              self.emit('error', new _Errors('parse', '', { line: 226, handle: '[MP4] init', msg: 'not find mdat box' }));
            }
          } else {
            var _nextBox = parsedFir.nextBox;
            if (_nextBox) {
              self.emit('error', new _Errors('parse', '', { line: 223, handle: '[MP4] init', msg: 'not find moov box' }));
            } else {
              self.getData(mdatStart, mdatStart + 1024).then(function (resSec) {
                var parsedSec = new Parse(resSec);
                self._boxes = self._boxes.concat(parsedSec.boxes);
                parsedSec.boxes.every(function (item) {
                  if (item.type === 'moov') {
                    mdatStart += item.size;
                    moov = item;
                    self.moovBox = moov;
                    self.moovBuffer = resSec.slice(0, moov.size);
                    self.emit('mdatReady', moov);
                    return false;
                  } else {
                    mdatStart += item.size;
                    return true;
                  }
                });
                if (!moov) {
                  var nextBoxSec = parsedSec.nextBox;
                  if (nextBoxSec) {
                    if (nextBoxSec.type === 'moov') {
                      self.getData(mdatStart, mdatStart + nextBoxSec.size - 1).then(function (resThi) {
                        var parsedThi = new Parse(resThi);
                        self._boxes = self._boxes.concat(parsedThi.boxes);
                        parsedThi.boxes.every(function (item) {
                          if (item.type === 'moov') {
                            mdatStart += item.size;
                            moov = item;
                            self.moovBox = moov;
                            self.moovBuffer = resSec.slice(0, moov.size);
                            self.emit('mdatReady', moov);
                            return false;
                          } else {
                            mdatStart += item.size;
                            return true;
                          }
                        });
                        if (!moov) {
                          self.emit('error', new _Errors('parse', '', { line: 207, handle: '[MP4] init', msg: 'not find moov box' }));
                        }
                      }).catch(function () {
                        self.emit('error', new _Errors('network', '', { line: 210, handle: '[MP4] getData', msg: 'getData failed' }));
                      });
                    } else {
                      self.emit('error', new _Errors('parse', '', { line: 213, handle: '[MP4] init', msg: 'not find moov box' }));
                    }
                  } else {
                    self.emit('error', new _Errors('parse', '', { line: 216, handle: '[MP4] init', msg: 'not find moov box' }));
                  }
                }
              }).catch(function () {
                self.emit('error', new _Errors('network', '', { line: 220, handle: '[MP4] getData', msg: 'getData failed' }));
              });
            }
          }
        }).catch(function () {
          self.emit('error', new _Errors('network', '', { line: 230, handle: '[MP4] getData', msg: 'getData failed' }));
        });
      }
    }, {
      key: 'getSamplesByOrders',
      value: function getSamplesByOrders() {
        var start = arguments[1];
        var end = arguments[2];

        var trak = this.audioTrak;
        var stsc = util.findBox(trak, 'stsc'); // chunk~samples
        var stsz = util.findBox(trak, 'stsz'); // sample-size
        var stts = util.findBox(trak, 'stts'); // sample-time
        var stco = util.findBox(trak, 'stco'); // chunk-offset
        var ctts = util.findBox(trak, 'ctts'); // offset-compositime
        var mdatStart = this.mdatStart;
        var samples = [];
        end = end !== undefined ? end : stsz.entries.length;
        if (start instanceof Array) {
          start.forEach(function (item, idx) {
            samples.push({
              idx: item,
              size: stsz.entries[item],
              time: util.seekSampleTime(stts, ctts, item),
              offset: util.seekSampleOffset(stsc, stco, stsz, item, mdatStart)
            });
          });
        } else if (end !== 0) {
          for (var i = start; i < end; i++) {
            samples.push({
              idx: i,
              size: stsz.entries[i],
              time: util.seekSampleTime(stts, ctts, i),
              offset: util.seekSampleOffset(stsc, stco, stsz, i, mdatStart)
            });
          }
        } else {
          samples = {
            idx: start,
            size: stsz.entries[start],
            time: util.seekSampleTime(stts, ctts, start),
            offset: util.seekSampleOffset(stsc, stco, stsz, start, mdatStart)
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
        var buffer = new Buffer();
        buffer.write(FMP4.ftyp());
        buffer.write(FMP4.moov(meta));
        this.cache.write(buffer.buffer);
        return buffer.buffer;
      }
    }, {
      key: 'seek',
      value: function seek(time) {
        var audioIndexOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var audioNextIndexOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        var audioStts = util.findBox(this.audioTrak, 'stts').entry;
        if (!audioIndexOrder) {
          audioIndexOrder = util.seekOrderSampleByTime(audioStts, this.meta.audioTimeScale, time).order;
        }
        if (!audioNextIndexOrder) {
          if (time + this.reqTimeLength < this.meta.audioDuration) {
            audioNextIndexOrder = util.seekOrderSampleByTime(audioStts, this.meta.audioTimeScale, time + this.reqTimeLength).order;
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
          self.emit('error', new _Errors('parse', '', { line: 366, handle: '[MP4] loadFragment', url: self.url }));
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
        var buffer = new Buffer();
        buffer.write(FMP4.moof(data));
        buffer.write(FMP4.mdat(data));
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

  var MSE = function () {
    function MSE() {
      var codecs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'audio/mp4; codecs="mp4a.40.5"';
      classCallCheck(this, MSE);

      var self = this;
      eventEmitter(this);
      this.codecs = codecs;
      this.replaying = false;
      this.mediaSource = new window.MediaSource();
      this.url = window.URL.createObjectURL(this.mediaSource);
      this.queue = [];
      this.updating = false;
      this.mediaSource.addEventListener('sourceopen', function () {
        self.sourceBuffer = self.mediaSource.addSourceBuffer(self.codecs);
        self.sourceBuffer.addEventListener('error', function (e) {
          self.emit('error', new _Errors('mse', '', { line: 16, handle: '[MSE] constructor sourceopen', msg: e.message }));
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

    createClass(MSE, [{
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
    var player = this;var sniffer = Player.sniffer;var util = Player.util;
    var Errors = Player.Errors;var mainURL = void 0;var backupURL = void 0;
    var preloadTime = player.config.preloadTime || 15;
    Player.m4a = true;
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

      var mp4 = new MP4(url);
      mp4.reqTimeLength = player.config.reqTimeLength || 5;
      var mse = void 0;
      return new Promise(function (resolve, reject) {
        mp4.once('mdatReady', function () {
          mse = new MSE();
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
    }) && MSE.isSupported('audio/mp4; codecs="mp4a.40.5"')) {
      var _start = player.start;
      if (!rule.call(player)) {
        return false;
      }
      player.cut = function () {
        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var end = arguments[1];

        var segment = new Buffer();
        return new Promise(function (resolve, reject) {
          var mp4 = new MP4(url);
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
                var meta = Player.util.deepCopy({
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
      if (player.config.segPlay) {
        var sp = player.config.segPlay;
        player.cut(sp.start, sp.end).then(function (blob) {
          if (blob) {
            player.config.url = URL.createObjectURL(blob);
            player.start(player.config.url);
          }
        }, function () {
          console.log('error');
        });
        return;
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

      player.switchURL = function (url) {
        var mp5 = new MP4(url);
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
        Task.clear();
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
        Task.clear();
      });

      player.on('playing', function () {
      });

      player.on('waiting', function () {
        var buffered = player.buffered;var hasBuffered = false;var curTime = player.currentTime;
        Task.clear();
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
        Task.clear();
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
        Task.clear();
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
          var mdatCache = new Buffer();
          mdatCache.write(FMP4.size(player.mp4.mdatBox.size), FMP4.type('mdat'));
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
          var m4aCache = new Buffer();
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

  Player.install('m4aplayer', m4aplayer);

})));
//# sourceMappingURL=index.js.map
