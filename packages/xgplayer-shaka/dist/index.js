(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer')) :
	typeof define === 'function' && define.amd ? define(['xgplayer'], factory) :
	(global = global || self, global.ShakaJsPlayer = factory(global.Player));
}(this, (function (Player) { 'use strict';

	Player = Player && Object.prototype.hasOwnProperty.call(Player, 'default') ? Player['default'] : Player;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var shakaPlayer_compiled = createCommonjsModule(function (module, exports) {
	(function () {
	  var innerGlobal = typeof window != "undefined" ? window : commonjsGlobal;var exportTo = {};(function (window, global) {
	    var q,
	        ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function (b, c, d) {
	      b != Array.prototype && b != Object.prototype && (b[c] = d.value);
	    },
	        da = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;function ea() {
	      ea = function () {};da.Symbol || (da.Symbol = fa);
	    }var fa = function () {
	      var b = 0;return function (c) {
	        return "jscomp_symbol_" + (c || "") + b++;
	      };
	    }();
	    function ia() {
	      ea();var b = da.Symbol.iterator;b || (b = da.Symbol.iterator = da.Symbol("iterator"));"function" != typeof Array.prototype[b] && ca(Array.prototype, b, { configurable: !0, writable: !0, value: function () {
	          return ja(this);
	        } });ia = function () {};
	    }function ja(b) {
	      var c = 0;return ka(function () {
	        return c < b.length ? { done: !1, value: b[c++] } : { done: !0 };
	      });
	    }function ka(b) {
	      ia();b = { next: b };b[da.Symbol.iterator] = function () {
	        return this;
	      };return b;
	    }function r(b) {
	      ia();var c = b[Symbol.iterator];return c ? c.call(b) : ja(b);
	    }
	    function la(b, c) {
	      if (c) {
	        for (var d = da, e = b.split("."), f = 0; f < e.length - 1; f++) {
	          var g = e[f];g in d || (d[g] = {});d = d[g];
	        }e = e[e.length - 1];f = d[e];g = c(f);g != f && null != g && ca(d, e, { configurable: !0, writable: !0, value: g });
	      }
	    }
	    la("Promise", function (b) {
	      function c(b) {
	        this.b = 0;this.g = void 0;this.a = [];var c = this.c();try {
	          b(c.resolve, c.reject);
	        } catch (l) {
	          c.reject(l);
	        }
	      }function d() {
	        this.a = null;
	      }function e(b) {
	        return b instanceof c ? b : new c(function (c) {
	          c(b);
	        });
	      }if (b) return b;d.prototype.b = function (b) {
	        null == this.a && (this.a = [], this.f());this.a.push(b);
	      };d.prototype.f = function () {
	        var b = this;this.c(function () {
	          b.h();
	        });
	      };var f = da.setTimeout;d.prototype.c = function (b) {
	        f(b, 0);
	      };d.prototype.h = function () {
	        for (; this.a && this.a.length;) {
	          var b = this.a;this.a = [];for (var c = 0; c < b.length; ++c) {
	            var d = b[c];b[c] = null;try {
	              d();
	            } catch (m) {
	              this.g(m);
	            }
	          }
	        }this.a = null;
	      };d.prototype.g = function (b) {
	        this.c(function () {
	          throw b;
	        });
	      };c.prototype.c = function () {
	        function b(b) {
	          return function (e) {
	            d || (d = !0, b.call(c, e));
	          };
	        }var c = this,
	            d = !1;return { resolve: b(this.s), reject: b(this.f) };
	      };c.prototype.s = function (b) {
	        if (b === this) this.f(new TypeError("A Promise cannot resolve to itself"));else if (b instanceof c) this.u(b);else {
	          a: switch (typeof b) {case "object":
	              var d = null != b;break a;case "function":
	              d = !0;
	              break a;default:
	              d = !1;}d ? this.m(b) : this.h(b);
	        }
	      };c.prototype.m = function (b) {
	        var c = void 0;try {
	          c = b.then;
	        } catch (l) {
	          this.f(l);return;
	        }"function" == typeof c ? this.B(c, b) : this.h(b);
	      };c.prototype.f = function (b) {
	        this.i(2, b);
	      };c.prototype.h = function (b) {
	        this.i(1, b);
	      };c.prototype.i = function (b, c) {
	        if (0 != this.b) throw Error("Cannot settle(" + b + ", " + c + "): Promise already settled in state" + this.b);this.b = b;this.g = c;this.l();
	      };c.prototype.l = function () {
	        if (null != this.a) {
	          for (var b = 0; b < this.a.length; ++b) g.b(this.a[b]);this.a = null;
	        }
	      };
	      var g = new d();c.prototype.u = function (b) {
	        var c = this.c();b.cc(c.resolve, c.reject);
	      };c.prototype.B = function (b, c) {
	        var d = this.c();try {
	          b.call(c, d.resolve, d.reject);
	        } catch (m) {
	          d.reject(m);
	        }
	      };c.prototype.then = function (b, d) {
	        function e(b, c) {
	          return "function" == typeof b ? function (c) {
	            try {
	              f(b(c));
	            } catch (y) {
	              g(y);
	            }
	          } : c;
	        }var f,
	            g,
	            h = new c(function (b, c) {
	          f = b;g = c;
	        });this.cc(e(b, f), e(d, g));return h;
	      };c.prototype["catch"] = function (b) {
	        return this.then(void 0, b);
	      };c.prototype.cc = function (b, c) {
	        function d() {
	          switch (e.b) {case 1:
	              b(e.g);break;
	            case 2:
	              c(e.g);break;default:
	              throw Error("Unexpected state: " + e.b);}
	        }var e = this;null == this.a ? g.b(d) : this.a.push(d);
	      };c.resolve = e;c.reject = function (b) {
	        return new c(function (c, d) {
	          d(b);
	        });
	      };c.race = function (b) {
	        return new c(function (c, d) {
	          for (var f = r(b), g = f.next(); !g.done; g = f.next()) e(g.value).cc(c, d);
	        });
	      };c.all = function (b) {
	        var d = r(b),
	            f = d.next();return f.done ? e([]) : new c(function (b, c) {
	          function g(c) {
	            return function (d) {
	              h[c] = d;k--;0 == k && b(h);
	            };
	          }var h = [],
	              k = 0;do h.push(void 0), k++, e(f.value).cc(g(h.length - 1), c), f = d.next(); while (!f.done);
	        });
	      };return c;
	    });la("Promise.prototype.finally", function (b) {
	      return b ? b : function (b) {
	        return this.then(function (c) {
	          return Promise.resolve(b()).then(function () {
	            return c;
	          });
	        }, function (c) {
	          return Promise.resolve(b()).then(function () {
	            throw c;
	          });
	        });
	      };
	    });function ma(b) {
	      function c(c) {
	        return b.next(c);
	      }function d(c) {
	        return b["throw"](c);
	      }return new Promise(function (e, f) {
	        function g(b) {
	          b.done ? e(b.value) : Promise.resolve(b.value).then(c, d).then(g, f);
	        }g(b.next());
	      });
	    }function t(b) {
	      return ma(b());
	    }
	    var na = "function" == typeof Object.create ? Object.create : function (b) {
	      function c() {}c.prototype = b;return new c();
	    },
	        pa;if ("function" == typeof Object.setPrototypeOf) pa = Object.setPrototypeOf;else {
	      var qa;a: {
	        var ra = { Ae: !0 },
	            ta = {};try {
	          ta.__proto__ = ra;qa = ta.Ae;break a;
	        } catch (b) {}qa = !1;
	      }pa = qa ? function (b, c) {
	        b.__proto__ = c;if (b.__proto__ !== c) throw new TypeError(b + " is not extensible");return b;
	      } : null;
	    }var ua = pa;
	    function va(b, c) {
	      b.prototype = na(c.prototype);b.prototype.constructor = b;if (ua) ua(b, c);else for (var d in c) if ("prototype" != d) if (Object.defineProperties) {
	        var e = Object.getOwnPropertyDescriptor(c, d);e && Object.defineProperty(b, d, e);
	      } else b[d] = c[d];b.tg = c.prototype;
	    }function wa() {
	      this.g = !1;this.c = null;this.o = void 0;this.j = 1;this.b = this.f = 0;this.i = this.a = null;
	    }function xa(b) {
	      if (b.g) throw new TypeError("Generator is already running");b.g = !0;
	    }wa.prototype.h = function (b) {
	      this.o = b;
	    };
	    function ya(b, c) {
	      b.a = { Ld: c, Wd: !0 };b.j = b.f || b.b;
	    }wa.prototype["return"] = function (b) {
	      this.a = { "return": b };this.j = this.b;
	    };function u(b, c, d) {
	      b.j = d;return { value: c };
	    }wa.prototype.A = function (b) {
	      this.j = b;
	    };function w(b) {
	      b.j = 0;
	    }function za(b, c, d) {
	      b.f = c;void 0 != d && (b.b = d);
	    }function Aa(b, c) {
	      b.f = 0;b.b = c || 0;
	    }function Ba(b, c) {
	      b.j = c;b.f = 0;
	    }function Ca(b) {
	      b.f = 0;var c = b.a.Ld;b.a = null;return c;
	    }function Fa(b) {
	      b.i = [b.a];b.f = 0;b.b = 0;
	    }
	    function Ga(b, c) {
	      var d = b.i.splice(0)[0];(d = b.a = b.a || d) ? d.Wd ? b.j = b.f || b.b : void 0 != d.A && b.b < d.A ? (b.j = d.A, b.a = null) : b.j = b.b : b.j = c;
	    }function Ha(b) {
	      this.a = new wa();this.b = b;
	    }function Ia(b, c) {
	      xa(b.a);var d = b.a.c;if (d) return Ja(b, "return" in d ? d["return"] : function (b) {
	        return { value: b, done: !0 };
	      }, c, b.a["return"]);b.a["return"](c);return Ma(b);
	    }
	    function Ja(b, c, d, e) {
	      try {
	        var f = c.call(b.a.c, d);if (!(f instanceof Object)) throw new TypeError("Iterator result " + f + " is not an object");if (!f.done) return b.a.g = !1, f;var g = f.value;
	      } catch (h) {
	        return b.a.c = null, ya(b.a, h), Ma(b);
	      }b.a.c = null;e.call(b.a, g);return Ma(b);
	    }
	    function Ma(b) {
	      for (; b.a.j;) try {
	        var c = b.b(b.a);if (c) return b.a.g = !1, { value: c.value, done: !1 };
	      } catch (d) {
	        b.a.o = void 0, ya(b.a, d);
	      }b.a.g = !1;if (b.a.a) {
	        c = b.a.a;b.a.a = null;if (c.Wd) throw c.Ld;return { value: c["return"], done: !0 };
	      }return { value: void 0, done: !0 };
	    }
	    function Na(b) {
	      this.next = function (c) {
	        xa(b.a);b.a.c ? c = Ja(b, b.a.c.next, c, b.a.h) : (b.a.h(c), c = Ma(b));return c;
	      };this["throw"] = function (c) {
	        xa(b.a);b.a.c ? c = Ja(b, b.a.c["throw"], c, b.a.h) : (ya(b.a, c), c = Ma(b));return c;
	      };this["return"] = function (c) {
	        return Ia(b, c);
	      };ia();this[Symbol.iterator] = function () {
	        return this;
	      };
	    }function z(b, c) {
	      Na.prototype = b.prototype;return new Na(new Ha(c));
	    }function Oa(b) {
	      for (var c, d = []; !(c = b.next()).done;) d.push(c.value);return d;
	    }
	    function Pa(b, c) {
	      return Object.prototype.hasOwnProperty.call(b, c);
	    }
	    la("WeakMap", function (b) {
	      function c(b) {
	        this.a = (g += Math.random() + 1).toString();if (b) {
	          ea();ia();b = r(b);for (var c; !(c = b.next()).done;) c = c.value, this.set(c[0], c[1]);
	        }
	      }function d(b) {
	        Pa(b, f) || ca(b, f, { value: {} });
	      }function e(b) {
	        var c = Object[b];c && (Object[b] = function (b) {
	          d(b);return c(b);
	        });
	      }if (function () {
	        if (!b || !Object.seal) return !1;try {
	          var c = Object.seal({}),
	              d = Object.seal({}),
	              e = new b([[c, 2], [d, 3]]);if (2 != e.get(c) || 3 != e.get(d)) return !1;e["delete"](c);e.set(d, 4);return !e.has(c) && 4 == e.get(d);
	        } catch (m) {
	          return !1;
	        }
	      }()) return b;
	      var f = "$jscomp_hidden_" + Math.random();e("freeze");e("preventExtensions");e("seal");var g = 0;c.prototype.set = function (b, c) {
	        d(b);if (!Pa(b, f)) throw Error("WeakMap key fail: " + b);b[f][this.a] = c;return this;
	      };c.prototype.get = function (b) {
	        return Pa(b, f) ? b[f][this.a] : void 0;
	      };c.prototype.has = function (b) {
	        return Pa(b, f) && Pa(b[f], this.a);
	      };c.prototype["delete"] = function (b) {
	        return Pa(b, f) && Pa(b[f], this.a) ? delete b[f][this.a] : !1;
	      };return c;
	    });
	    la("Map", function (b) {
	      function c() {
	        var b = {};return b.Fa = b.next = b.head = b;
	      }function d(b, c) {
	        var d = b.a;return ka(function () {
	          if (d) {
	            for (; d.head != b.a;) d = d.Fa;for (; d.next != d.head;) return d = d.next, { done: !1, value: c(d) };d = null;
	          }return { done: !0, value: void 0 };
	        });
	      }function e(b, c) {
	        var d = c && typeof c;"object" == d || "function" == d ? g.has(c) ? d = g.get(c) : (d = "" + ++h, g.set(c, d)) : d = "p_" + c;var e = b.b[d];if (e && Pa(b.b, d)) for (var f = 0; f < e.length; f++) {
	          var k = e[f];if (c !== c && k.key !== k.key || c === k.key) return { id: d, list: e, index: f, X: k };
	        }return { id: d,
	          list: e, index: -1, X: void 0 };
	      }function f(b) {
	        this.b = {};this.a = c();this.size = 0;if (b) {
	          b = r(b);for (var d; !(d = b.next()).done;) d = d.value, this.set(d[0], d[1]);
	        }
	      }if (function () {
	        if (!b || "function" != typeof b || !b.prototype.entries || "function" != typeof Object.seal) return !1;try {
	          var c = Object.seal({ x: 4 }),
	              d = new b(r([[c, "s"]]));if ("s" != d.get(c) || 1 != d.size || d.get({ x: 4 }) || d.set({ x: 4 }, "t") != d || 2 != d.size) return !1;var e = d.entries(),
	              f = e.next();if (f.done || f.value[0] != c || "s" != f.value[1]) return !1;f = e.next();return f.done || 4 != f.value[0].x || "t" != f.value[1] || !e.next().done ? !1 : !0;
	        } catch (p) {
	          return !1;
	        }
	      }()) return b;ea();ia();var g = new WeakMap();f.prototype.set = function (b, c) {
	        var d = e(this, b);d.list || (d.list = this.b[d.id] = []);d.X ? d.X.value = c : (d.X = { next: this.a, Fa: this.a.Fa, head: this.a, key: b, value: c }, d.list.push(d.X), this.a.Fa.next = d.X, this.a.Fa = d.X, this.size++);return this;
	      };f.prototype["delete"] = function (b) {
	        b = e(this, b);return b.X && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.b[b.id], b.X.Fa.next = b.X.next, b.X.next.Fa = b.X.Fa, b.X.head = null, this.size--, !0) : !1;
	      };f.prototype.clear = function () {
	        this.b = {};this.a = this.a.Fa = c();this.size = 0;
	      };f.prototype.has = function (b) {
	        return !!e(this, b).X;
	      };f.prototype.get = function (b) {
	        return (b = e(this, b).X) && b.value;
	      };f.prototype.entries = function () {
	        return d(this, function (b) {
	          return [b.key, b.value];
	        });
	      };f.prototype.keys = function () {
	        return d(this, function (b) {
	          return b.key;
	        });
	      };f.prototype.values = function () {
	        return d(this, function (b) {
	          return b.value;
	        });
	      };f.prototype.forEach = function (b, c) {
	        for (var d = this.entries(), e; !(e = d.next()).done;) e = e.value, b.call(c, e[1], e[0], this);
	      };f.prototype[Symbol.iterator] = f.prototype.entries;var h = 0;return f;
	    });
	    la("Set", function (b) {
	      function c(b) {
	        this.a = new Map();if (b) {
	          b = r(b);for (var c; !(c = b.next()).done;) this.add(c.value);
	        }this.size = this.a.size;
	      }if (function () {
	        if (!b || "function" != typeof b || !b.prototype.entries || "function" != typeof Object.seal) return !1;try {
	          var c = Object.seal({ x: 4 }),
	              e = new b(r([c]));if (!e.has(c) || 1 != e.size || e.add(c) != e || 1 != e.size || e.add({ x: 4 }) != e || 2 != e.size) return !1;var f = e.entries(),
	              g = f.next();if (g.done || g.value[0] != c || g.value[1] != c) return !1;g = f.next();return g.done || g.value[0] == c || 4 != g.value[0].x || g.value[1] != g.value[0] ? !1 : f.next().done;
	        } catch (h) {
	          return !1;
	        }
	      }()) return b;ea();ia();c.prototype.add = function (b) {
	        this.a.set(b, b);this.size = this.a.size;return this;
	      };c.prototype["delete"] = function (b) {
	        b = this.a["delete"](b);this.size = this.a.size;return b;
	      };c.prototype.clear = function () {
	        this.a.clear();this.size = 0;
	      };c.prototype.has = function (b) {
	        return this.a.has(b);
	      };c.prototype.entries = function () {
	        return this.a.entries();
	      };c.prototype.values = function () {
	        return this.a.values();
	      };c.prototype.keys = c.prototype.values;
	      c.prototype[Symbol.iterator] = c.prototype.values;c.prototype.forEach = function (b, c) {
	        var d = this;this.a.forEach(function (e) {
	          return b.call(c, e, e, d);
	        });
	      };return c;
	    });function Qa(b, c, d) {
	      b instanceof String && (b = String(b));for (var e = b.length, f = 0; f < e; f++) {
	        var g = b[f];if (c.call(d, g, f, b)) return { Td: f, ve: g };
	      }return { Td: -1, ve: void 0 };
	    }la("Array.prototype.findIndex", function (b) {
	      return b ? b : function (b, d) {
	        return Qa(this, b, d).Td;
	      };
	    });
	    function Ra(b, c) {
	      ia();b instanceof String && (b += "");var d = 0,
	          e = { next: function () {
	          if (d < b.length) {
	            var f = d++;return { value: c(f, b[f]), done: !1 };
	          }e.next = function () {
	            return { done: !0, value: void 0 };
	          };return e.next();
	        } };e[Symbol.iterator] = function () {
	        return e;
	      };return e;
	    }la("Array.prototype.keys", function (b) {
	      return b ? b : function () {
	        return Ra(this, function (b) {
	          return b;
	        });
	      };
	    });la("Object.is", function (b) {
	      return b ? b : function (b, d) {
	        return b === d ? 0 !== b || 1 / b === 1 / d : b !== b && d !== d;
	      };
	    });
	    la("Array.prototype.includes", function (b) {
	      return b ? b : function (b, d) {
	        var c = this;c instanceof String && (c = String(c));var f = c.length,
	            g = d || 0;for (0 > g && (g = Math.max(g + f, 0)); g < f; g++) {
	          var h = c[g];if (h === b || Object.is(h, b)) return !0;
	        }return !1;
	      };
	    });function Sa(b, c, d) {
	      if (null == b) throw new TypeError("The 'this' value for String.prototype." + d + " must not be null or undefined");if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + d + " must not be a regular expression");return b + "";
	    }
	    la("String.prototype.includes", function (b) {
	      return b ? b : function (b, d) {
	        return -1 !== Sa(this, b, "includes").indexOf(b, d || 0);
	      };
	    });la("Array.from", function (b) {
	      return b ? b : function (b, d, e) {
	        ia();d = null != d ? d : function (b) {
	          return b;
	        };var c = [],
	            g = b[Symbol.iterator];if ("function" == typeof g) for (b = g.call(b); !(g = b.next()).done;) c.push(d.call(e, g.value));else {
	          g = b.length;for (var h = 0; h < g; h++) c.push(d.call(e, b[h]));
	        }return c;
	      };
	    });
	    la("String.prototype.startsWith", function (b) {
	      return b ? b : function (b, d) {
	        for (var c = Sa(this, b, "startsWith"), f = c.length, g = b.length, h = Math.max(0, Math.min(d | 0, c.length)), k = 0; k < g && h < f;) if (c[h++] != b[k++]) return !1;return k >= g;
	      };
	    });la("Array.prototype.find", function (b) {
	      return b ? b : function (b, d) {
	        return Qa(this, b, d).ve;
	      };
	    });var Ta = "function" == typeof Object.assign ? Object.assign : function (b, c) {
	      for (var d = 1; d < arguments.length; d++) {
	        var e = arguments[d];if (e) for (var f in e) Pa(e, f) && (b[f] = e[f]);
	      }return b;
	    };
	    la("Object.assign", function (b) {
	      return b || Ta;
	    });var Wa = this;Wa.a = !0;function A(b, c) {
	      var d = b.split("."),
	          e = Wa;d[0] in e || !e.execScript || e.execScript("var " + d[0]);for (var f; d.length && (f = d.shift());) d.length || void 0 === c ? e[f] ? e = e[f] : e = e[f] = {} : e[f] = c;
	    }function Xa(b, c) {
	      function d() {}d.prototype = c.prototype;b.tg = c.prototype;b.prototype = new d();b.prototype.constructor = b;b.Eg = function (b, d, g) {
	        return c.prototype[d].apply(b, Array.prototype.slice.call(arguments, 2));
	      };
	    }    function Ya(b) {
	      this.c = Math.exp(Math.log(.5) / b);this.b = this.a = 0;
	    }function Za(b, c, d) {
	      var e = Math.pow(b.c, c);d = d * (1 - e) + e * b.a;isNaN(d) || (b.a = d, b.b += c);
	    }function $a(b) {
	      return b.a / (1 - Math.pow(b.c, b.b));
	    }function ab() {
	      this.b = new Ya(2);this.c = new Ya(5);this.a = 0;
	    }ab.prototype.getBandwidthEstimate = function (b) {
	      return 128E3 > this.a ? b : Math.min($a(this.b), $a(this.c));
	    };function bb() {}function cb() {}function db() {}window.console && window.console.log.bind && (cb = console.warn.bind(console), bb = console.error.bind(console));var hb = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function ib(b) {
	      var c;b instanceof ib ? (jb(this, b.ta), this.bb = b.bb, this.sa = b.sa, kb(this, b.Ab), this.ja = b.ja, lb(this, b.a.clone()), this.Sa = b.Sa) : b && (c = String(b).match(hb)) ? (jb(this, c[1] || "", !0), this.bb = mb(c[2] || ""), this.sa = mb(c[3] || "", !0), kb(this, c[4]), this.ja = mb(c[5] || "", !0), lb(this, c[6] || "", !0), this.Sa = mb(c[7] || "")) : this.a = new nb(null);
	    }q = ib.prototype;q.ta = "";q.bb = "";q.sa = "";q.Ab = null;q.ja = "";q.Sa = "";
	    q.toString = function () {
	      var b = [],
	          c = this.ta;c && b.push(ob(c, pb, !0), ":");if (c = this.sa) {
	        b.push("//");var d = this.bb;d && b.push(ob(d, pb, !0), "@");b.push(encodeURIComponent(c).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));c = this.Ab;null != c && b.push(":", String(c));
	      }if (c = this.ja) this.sa && "/" != c.charAt(0) && b.push("/"), b.push(ob(c, "/" == c.charAt(0) ? qb : rb, !0));(c = this.a.toString()) && b.push("?", c);(c = this.Sa) && b.push("#", ob(c, sb));return b.join("");
	    };
	    q.resolve = function (b) {
	      var c = this.clone();"data" === c.ta && (c = new ib());var d = !!b.ta;d ? jb(c, b.ta) : d = !!b.bb;d ? c.bb = b.bb : d = !!b.sa;d ? c.sa = b.sa : d = null != b.Ab;var e = b.ja;if (d) kb(c, b.Ab);else if (d = !!b.ja) {
	        if ("/" != e.charAt(0)) if (this.sa && !this.ja) e = "/" + e;else {
	          var f = c.ja.lastIndexOf("/");-1 != f && (e = c.ja.substr(0, f + 1) + e);
	        }if (".." == e || "." == e) e = "";else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
	          f = 0 == e.lastIndexOf("/", 0);e = e.split("/");for (var g = [], h = 0; h < e.length;) {
	            var k = e[h++];"." == k ? f && h == e.length && g.push("") : ".." == k ? ((1 < g.length || 1 == g.length && "" != g[0]) && g.pop(), f && h == e.length && g.push("")) : (g.push(k), f = !0);
	          }e = g.join("/");
	        }
	      }d ? c.ja = e : d = "" !== b.a.toString();d ? lb(c, b.a.clone()) : d = !!b.Sa;d && (c.Sa = b.Sa);return c;
	    };q.clone = function () {
	      return new ib(this);
	    };function jb(b, c, d) {
	      b.ta = d ? mb(c, !0) : c;b.ta && (b.ta = b.ta.replace(/:$/, ""));
	    }function kb(b, c) {
	      if (c) {
	        c = Number(c);if (isNaN(c) || 0 > c) throw Error("Bad port number " + c);b.Ab = c;
	      } else b.Ab = null;
	    }function lb(b, c, d) {
	      c instanceof nb ? b.a = c : (d || (c = ob(c, tb)), b.a = new nb(c));
	    }
	    function mb(b, c) {
	      return b ? c ? decodeURI(b) : decodeURIComponent(b) : "";
	    }function ob(b, c, d) {
	      return "string" == typeof b ? (b = encodeURI(b).replace(c, yb), d && (b = b.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), b) : null;
	    }function yb(b) {
	      b = b.charCodeAt(0);return "%" + (b >> 4 & 15).toString(16) + (b & 15).toString(16);
	    }var pb = /[#\/\?@]/g,
	        rb = /[#\?:]/g,
	        qb = /[#\?]/g,
	        tb = /[#\?@]/g,
	        sb = /#/g;function nb(b) {
	      this.a = b || null;
	    }q = nb.prototype;q.ha = null;q.fc = null;
	    q.add = function (b, c) {
	      if (!this.ha && (this.ha = {}, this.fc = 0, this.a)) for (var d = this.a.split("&"), e = 0; e < d.length; e++) {
	        var f = d[e].indexOf("="),
	            g = null;if (0 <= f) {
	          var h = d[e].substring(0, f);g = d[e].substring(f + 1);
	        } else h = d[e];h = decodeURIComponent(h.replace(/\+/g, " "));g = g || "";this.add(h, decodeURIComponent(g.replace(/\+/g, " ")));
	      }this.a = null;(d = this.ha.hasOwnProperty(b) && this.ha[b]) || (this.ha[b] = d = []);d.push(c);this.fc++;return this;
	    };
	    q.toString = function () {
	      if (this.a) return this.a;if (!this.ha) return "";var b = [],
	          c;for (c in this.ha) for (var d = encodeURIComponent(c), e = this.ha[c], f = 0; f < e.length; f++) {
	        var g = d;"" !== e[f] && (g += "=" + encodeURIComponent(e[f]));b.push(g);
	      }return this.a = b.join("&");
	    };q.clone = function () {
	      var b = new nb();b.a = this.a;if (this.ha) {
	        var c = {},
	            d;for (d in this.ha) c[d] = this.ha[d].concat();b.ha = c;b.fc = this.fc;
	      }return b;
	    };function zb(b) {
	      this.b = b;this.a = null;
	    }zb.prototype.R = function (b) {
	      var c = this;this.stop();var d = !0,
	          e = null;this.a = function () {
	        window.clearTimeout(e);d = !1;
	      };e = window.setTimeout(function () {
	        d && c.b();
	      }, 1E3 * b);return this;
	    };zb.prototype.stop = function () {
	      this.a && (this.a(), this.a = null);
	    };function C(b) {
	      this.b = b;this.a = null;
	    }A("shaka.util.Timer", C);C.prototype.yc = function () {
	      this.stop();this.b();return this;
	    };C.prototype.tickNow = C.prototype.yc;C.prototype.R = function (b) {
	      var c = this;this.stop();this.a = new zb(function () {
	        c.b();
	      }).R(b);return this;
	    };C.prototype.tickAfter = C.prototype.R;C.prototype.Na = function (b) {
	      var c = this;this.stop();this.a = new zb(function () {
	        c.a.R(b);c.b();
	      }).R(b);return this;
	    };C.prototype.tickEvery = C.prototype.Na;C.prototype.stop = function () {
	      this.a && (this.a.stop(), this.a = null);
	    };
	    C.prototype.stop = C.prototype.stop;function Ab(b, c) {
	      var d = Bb();this.i = null == b.maxAttempts ? d.maxAttempts : b.maxAttempts;this.f = null == b.baseDelay ? d.baseDelay : b.baseDelay;this.h = null == b.fuzzFactor ? d.fuzzFactor : b.fuzzFactor;this.g = null == b.backoffFactor ? d.backoffFactor : b.backoffFactor;this.a = 0;this.b = this.f;if (this.c = void 0 === c ? !1 : c) this.a = 1;
	    }
	    function Cb(b) {
	      return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (b.a >= b.i) if (b.c) b.a = 1, b.b = b.f;else return d["return"](Promise.reject());e = b.a;b.a++;if (0 == e) return d["return"]();f = b.b * (1 + (2 * Math.random() - 1) * b.h);return u(d, new Promise(function (b) {
	                new C(b).R(f / 1E3);
	              }), 2);case 2:
	              b.b *= b.g, w(d);}
	        });
	      });
	    }function Bb() {
	      return { maxAttempts: 2, baseDelay: 1E3, backoffFactor: 2, fuzzFactor: .5, timeout: 0 };
	    }function D(b, c, d, e) {
	      for (var f = [], g = 3; g < arguments.length; ++g) f[g - 3] = arguments[g];this.severity = b;this.category = c;this.code = d;this.data = f;this.handled = !1;
	    }A("shaka.util.Error", D);D.prototype.toString = function () {
	      return "shaka.util.Error " + JSON.stringify(this, null, "  ");
	    };D.Severity = { RECOVERABLE: 1, CRITICAL: 2 };D.Category = { NETWORK: 1, TEXT: 2, MEDIA: 3, MANIFEST: 4, STREAMING: 5, DRM: 6, PLAYER: 7, CAST: 8, STORAGE: 9 };
	    D.Code = { UNSUPPORTED_SCHEME: 1E3, BAD_HTTP_STATUS: 1001, HTTP_ERROR: 1002, TIMEOUT: 1003, MALFORMED_DATA_URI: 1004, UNKNOWN_DATA_URI_ENCODING: 1005, REQUEST_FILTER_ERROR: 1006, RESPONSE_FILTER_ERROR: 1007, MALFORMED_TEST_URI: 1008, UNEXPECTED_TEST_REQUEST: 1009, INVALID_TEXT_HEADER: 2E3, INVALID_TEXT_CUE: 2001, UNABLE_TO_DETECT_ENCODING: 2003, BAD_ENCODING: 2004, INVALID_XML: 2005, INVALID_MP4_TTML: 2007, INVALID_MP4_VTT: 2008, UNABLE_TO_EXTRACT_CUE_START_TIME: 2009, BUFFER_READ_OUT_OF_BOUNDS: 3E3, JS_INTEGER_OVERFLOW: 3001, EBML_OVERFLOW: 3002,
	      EBML_BAD_FLOATING_POINT_SIZE: 3003, MP4_SIDX_WRONG_BOX_TYPE: 3004, MP4_SIDX_INVALID_TIMESCALE: 3005, MP4_SIDX_TYPE_NOT_SUPPORTED: 3006, WEBM_CUES_ELEMENT_MISSING: 3007, WEBM_EBML_HEADER_ELEMENT_MISSING: 3008, WEBM_SEGMENT_ELEMENT_MISSING: 3009, WEBM_INFO_ELEMENT_MISSING: 3010, WEBM_DURATION_ELEMENT_MISSING: 3011, WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING: 3012, WEBM_CUE_TIME_ELEMENT_MISSING: 3013, MEDIA_SOURCE_OPERATION_FAILED: 3014, MEDIA_SOURCE_OPERATION_THREW: 3015, VIDEO_ERROR: 3016, QUOTA_EXCEEDED_ERROR: 3017, TRANSMUXING_FAILED: 3018,
	      UNABLE_TO_GUESS_MANIFEST_TYPE: 4E3, DASH_INVALID_XML: 4001, DASH_NO_SEGMENT_INFO: 4002, DASH_EMPTY_ADAPTATION_SET: 4003, DASH_EMPTY_PERIOD: 4004, DASH_WEBM_MISSING_INIT: 4005, DASH_UNSUPPORTED_CONTAINER: 4006, DASH_PSSH_BAD_ENCODING: 4007, DASH_NO_COMMON_KEY_SYSTEM: 4008, DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED: 4009, DASH_CONFLICTING_KEY_IDS: 4010, UNPLAYABLE_PERIOD: 4011, RESTRICTIONS_CANNOT_BE_MET: 4012, NO_PERIODS: 4014, HLS_PLAYLIST_HEADER_MISSING: 4015, INVALID_HLS_TAG: 4016, HLS_INVALID_PLAYLIST_HIERARCHY: 4017, DASH_DUPLICATE_REPRESENTATION_ID: 4018,
	      HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND: 4020, HLS_COULD_NOT_GUESS_MIME_TYPE: 4021, HLS_MASTER_PLAYLIST_NOT_PROVIDED: 4022, HLS_REQUIRED_ATTRIBUTE_MISSING: 4023, HLS_REQUIRED_TAG_MISSING: 4024, HLS_COULD_NOT_GUESS_CODECS: 4025, HLS_KEYFORMATS_NOT_SUPPORTED: 4026, DASH_UNSUPPORTED_XLINK_ACTUATE: 4027, DASH_XLINK_DEPTH_LIMIT: 4028, HLS_COULD_NOT_PARSE_SEGMENT_START_TIME: 4030, CONTENT_UNSUPPORTED_BY_BROWSER: 4032, CANNOT_ADD_EXTERNAL_TEXT_TO_LIVE_STREAM: 4033, HLS_AES_128_ENCRYPTION_NOT_SUPPORTED: 4034, HLS_INTERNAL_SKIP_STREAM: 4035,
	      INVALID_STREAMS_CHOSEN: 5005, NO_RECOGNIZED_KEY_SYSTEMS: 6E3, REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE: 6001, FAILED_TO_CREATE_CDM: 6002, FAILED_TO_ATTACH_TO_VIDEO: 6003, INVALID_SERVER_CERTIFICATE: 6004, FAILED_TO_CREATE_SESSION: 6005, FAILED_TO_GENERATE_LICENSE_REQUEST: 6006, LICENSE_REQUEST_FAILED: 6007, LICENSE_RESPONSE_REJECTED: 6008, ENCRYPTED_CONTENT_WITHOUT_DRM_INFO: 6010, NO_LICENSE_SERVER_GIVEN: 6012, OFFLINE_SESSION_REMOVED: 6013, EXPIRED: 6014, SERVER_CERTIFICATE_REQUIRED: 6015, INIT_DATA_TRANSFORM_ERROR: 6016, LOAD_INTERRUPTED: 7E3,
	      OPERATION_ABORTED: 7001, NO_VIDEO_ELEMENT: 7002, CAST_API_UNAVAILABLE: 8E3, NO_CAST_RECEIVERS: 8001, ALREADY_CASTING: 8002, UNEXPECTED_CAST_ERROR: 8003, CAST_CANCELED_BY_USER: 8004, CAST_CONNECTION_TIMED_OUT: 8005, CAST_RECEIVER_APP_UNAVAILABLE: 8006, STORAGE_NOT_SUPPORTED: 9E3, INDEXED_DB_ERROR: 9001, DEPRECATED_OPERATION_ABORTED: 9002, REQUESTED_ITEM_NOT_FOUND: 9003, MALFORMED_OFFLINE_URI: 9004, CANNOT_STORE_LIVE_OFFLINE: 9005, STORE_ALREADY_IN_PROGRESS: 9006, NO_INIT_DATA_FOR_OFFLINE: 9007, LOCAL_PLAYER_INSTANCE_REQUIRED: 9008,
	      NEW_KEY_OPERATION_NOT_SUPPORTED: 9011, KEY_NOT_FOUND: 9012, MISSING_STORAGE_CELL: 9013 };function F() {
	      var b,
	          c,
	          d = new Promise(function (d, f) {
	        b = d;c = f;
	      });d.resolve = b;d.reject = c;return d;
	    }F.prototype.resolve = function () {};F.prototype.reject = function () {};function H(b, c) {
	      this.promise = b;this.Zd = c;this.a = !1;
	    }A("shaka.util.AbortableOperation", H);function Db(b) {
	      return new H(Promise.reject(b), function () {
	        return Promise.resolve();
	      });
	    }H.failed = Db;function Eb() {
	      var b = Promise.reject(new D(2, 7, 7001));b["catch"](function () {});return new H(b, function () {
	        return Promise.resolve();
	      });
	    }H.aborted = Eb;function Hb(b) {
	      return new H(Promise.resolve(b), function () {
	        return Promise.resolve();
	      });
	    }H.completed = Hb;
	    function Ib(b) {
	      return new H(b, function () {
	        return b["catch"](function () {});
	      });
	    }H.notAbortable = Ib;H.prototype.abort = function () {
	      this.a = !0;return this.Zd();
	    };H.prototype.abort = H.prototype.abort;function Jb(b) {
	      return new H(Promise.all(b.map(function (b) {
	        return b.promise;
	      })), function () {
	        return Promise.all(b.map(function (b) {
	          return b.abort();
	        }));
	      });
	    }H.all = Jb;H.prototype["finally"] = function (b) {
	      this.promise.then(function () {
	        return b(!0);
	      }, function () {
	        return b(!1);
	      });return this;
	    };H.prototype["finally"] = H.prototype["finally"];
	    H.prototype.U = function (b, c) {
	      function d() {
	        f.reject(new D(2, 7, 7001));return e.abort();
	      }var e = this,
	          f = new F();this.promise.then(function (c) {
	        e.a ? f.reject(new D(2, 7, 7001)) : b ? d = Kb(b, c, f) : f.resolve(c);
	      }, function (b) {
	        c ? d = Kb(c, b, f) : f.reject(b);
	      });return new H(f, function () {
	        return d();
	      });
	    };H.prototype.chain = H.prototype.U;
	    function Kb(b, c, d) {
	      try {
	        var e = b(c);if (e && e.promise && e.abort) return d.resolve(e.promise), function () {
	          return e.abort();
	        };d.resolve(e);return function () {
	          return Promise.resolve(e).then(function () {})["catch"](function () {});
	        };
	      } catch (f) {
	        return d.reject(f), function () {
	          return Promise.resolve();
	        };
	      }
	    }function I(b, c) {
	      c = void 0 === c ? {} : c;for (var d in c) this[d] = c[d];this.defaultPrevented = this.cancelable = this.bubbles = !1;this.timeStamp = window.performance && window.performance.now ? window.performance.now() : Date.now();this.type = b;this.isTrusted = !1;this.target = this.currentTarget = null;this.a = !1;
	    }I.prototype.preventDefault = function () {
	      this.cancelable && (this.defaultPrevented = !0);
	    };I.prototype.stopImmediatePropagation = function () {
	      this.a = !0;
	    };I.prototype.stopPropagation = function () {};function Lb() {
	      this.a = {};
	    }q = Lb.prototype;q.push = function (b, c) {
	      this.a.hasOwnProperty(b) ? this.a[b].push(c) : this.a[b] = [c];
	    };q.get = function (b) {
	      return (b = this.a[b]) ? b.slice() : null;
	    };q.getAll = function () {
	      var b = [],
	          c;for (c in this.a) b.push.apply(b, this.a[c]);return b;
	    };q.remove = function (b, c) {
	      var d = this.a[b];if (d) for (var e = 0; e < d.length; ++e) d[e] == c && (d.splice(e, 1), --e);
	    };q.forEach = function (b) {
	      for (var c in this.a) b(c, this.a[c]);
	    };function Mb() {
	      this.Jc = new Lb();this.$b = this;
	    }Mb.prototype.addEventListener = function (b, c) {
	      this.Jc.push(b, c);
	    };Mb.prototype.removeEventListener = function (b, c) {
	      this.Jc.remove(b, c);
	    };Mb.prototype.dispatchEvent = function (b) {
	      for (var c = this.Jc.get(b.type) || [], d = 0; d < c.length; ++d) {
	        b.target = this.$b;b.currentTarget = this.$b;var e = c[d];try {
	          e.handleEvent ? e.handleEvent(b) : e.call(this, b);
	        } catch (f) {}if (b.a) break;
	      }return b.defaultPrevented;
	    };function Nb(b) {
	      function c(b) {
	        switch (typeof b) {case "undefined":case "boolean":case "number":case "string":case "symbol":case "function":
	            return b;default:
	            if (!b || b.buffer && b.buffer.constructor == ArrayBuffer) return b;if (d.has(b)) return null;var e = b.constructor == Array;if (b.constructor != Object && !e) return null;d.add(b);var g = e ? [] : {},
	                h;for (h in b) g[h] = c(b[h]);e && (g.length = b.length);return g;}
	      }var d = new Set();return c(b);
	    }function Ob(b, c) {
	      return "number" === typeof b && "number" === typeof c && isNaN(b) && isNaN(c) ? !0 : b === c;
	    }function Pb(b, c) {
	      var d = b.indexOf(c);-1 < d && b.splice(d, 1);
	    }function Qb(b, c) {
	      var d = 0;b.forEach(function (b) {
	        d += c(b) ? 1 : 0;
	      });return d;
	    }
	    function Rb(b, c, d) {
	      d || (d = Ob);if (b.length != c.length) return !1;c = c.slice();var e = {};b = r(b);for (var f = b.next(); !f.done; e = { item: e.item }, f = b.next()) {
	        e.item = f.value;f = c.findIndex(function (b) {
	          return function (c) {
	            return d(b.item, c);
	          };
	        }(e));if (-1 == f) return !1;c[f] = c[c.length - 1];c.pop();
	      }return 0 == c.length;
	    }function Sb() {
	      this.a = [];
	    }function Tb(b, c) {
	      b.a.push(c["finally"](function () {
	        Pb(b.a, c);
	      }));
	    }Sb.prototype.destroy = function () {
	      var b = [];this.a.forEach(function (c) {
	        c.promise["catch"](function () {});b.push(c.abort());
	      });this.a = [];return Promise.all(b);
	    };function J(b) {
	      Mb.call(this);this.f = !1;this.g = new Sb();this.a = new Set();this.b = new Set();this.c = b || null;
	    }Xa(J, Mb);A("shaka.net.NetworkingEngine", J);J.RequestType = { MANIFEST: 0, SEGMENT: 1, LICENSE: 2, APP: 3, TIMING: 4 };J.PluginPriority = { FALLBACK: 1, PREFERRED: 2, APPLICATION: 3 };var Ub = {};function Vb(b, c, d) {
	      d = d || 3;var e = Ub[b];if (!e || d >= e.priority) Ub[b] = { priority: d, Rf: c };
	    }J.registerScheme = Vb;J.unregisterScheme = function (b) {
	      delete Ub[b];
	    };J.prototype.Tf = function (b) {
	      this.a.add(b);
	    };J.prototype.registerRequestFilter = J.prototype.Tf;
	    J.prototype.vg = function (b) {
	      this.a["delete"](b);
	    };J.prototype.unregisterRequestFilter = J.prototype.vg;J.prototype.Ie = function () {
	      this.a.clear();
	    };J.prototype.clearAllRequestFilters = J.prototype.Ie;J.prototype.Uf = function (b) {
	      this.b.add(b);
	    };J.prototype.registerResponseFilter = J.prototype.Uf;J.prototype.wg = function (b) {
	      this.b["delete"](b);
	    };J.prototype.unregisterResponseFilter = J.prototype.wg;J.prototype.Je = function () {
	      this.b.clear();
	    };J.prototype.clearAllResponseFilters = J.prototype.Je;
	    J.defaultRetryParameters = function () {
	      return Bb();
	    };function Wb(b, c) {
	      return { uris: b, method: "GET", body: null, headers: {}, allowCrossSiteCredentials: !1, retryParameters: c, licenseRequestType: null, sessionId: null };
	    }J.makeRequest = Wb;J.prototype.destroy = function () {
	      this.f = !0;this.a.clear();this.b.clear();return this.g.destroy();
	    };J.prototype.destroy = J.prototype.destroy;
	    J.prototype.request = function (b, c) {
	      var d = this,
	          e = new Xb();if (this.f) {
	        var f = Promise.reject(new D(2, 7, 7001));f["catch"](function () {});return new Yb(f, function () {
	          return Promise.resolve();
	        }, e);
	      }c.method = c.method || "GET";c.headers = c.headers || {};c.retryParameters = c.retryParameters ? Nb(c.retryParameters) : Bb();c.uris = Nb(c.uris);f = Zb(this, b, c);var g = f.U(function () {
	        return $b(d, b, c, new Ab(c.retryParameters, !1), 0, null, e);
	      }),
	          h = g.U(function (c) {
	        return ac(d, b, c);
	      }),
	          k = Date.now(),
	          l = 0;f.promise.then(function () {
	        l = Date.now() - k;
	      }, function () {});var m = 0;g.promise.then(function () {
	        m = Date.now();
	      }, function () {});f = h.U(function (c) {
	        var e = Date.now() - m,
	            f = c.response;f.timeMs += l;f.timeMs += e;c.qf || !d.c || f.fromCache || 1 != b || d.c(f.timeMs, f.data.byteLength);return f;
	      }, function (b) {
	        b && (b.severity = 2);throw b;
	      });f = new Yb(f.promise, f.Zd, e);Tb(this.g, f);return f;
	    };J.prototype.request = J.prototype.request;
	    function Zb(b, c, d) {
	      var e = Hb(void 0),
	          f = {};b = r(b.a);for (var g = b.next(); !g.done; f = { qd: f.qd }, g = b.next()) f.qd = g.value, e = e.U(function (b) {
	        return function () {
	          return b.qd(c, d);
	        };
	      }(f));return e.U(void 0, function (b) {
	        if (b && 7001 == b.code) throw b;throw new D(2, 1, 1006, b);
	      });
	    }
	    function $b(b, c, d, e, f, g, h) {
	      var k = new ib(d.uris[f]),
	          l = k.ta,
	          m = !1;l || (l = location.protocol, l = l.slice(0, -1), jb(k, l), d.uris[f] = k.toString());l = l.toLowerCase();var n = (l = Ub[l]) ? l.Rf : null;if (!n) return Db(new D(2, 1, 1E3, k));var p;return Ib(Cb(e)).U(function () {
	        if (b.f) return Eb();p = Date.now();return n(d.uris[f], d, c, function (d, e, f) {
	          b.c && 1 == c && (b.c(d, e), m = !0, h.a = f);
	        });
	      }).U(function (b) {
	        void 0 == b.timeMs && (b.timeMs = Date.now() - p);return { response: b, qf: m };
	      }, function (k) {
	        if (k && 7001 == k.code) throw k;if (b.f) return Eb();if (k && 1 == k.severity) return b.dispatchEvent(new I("retry", { error: k instanceof D ? k : null })), f = (f + 1) % d.uris.length, $b(b, c, d, e, f, k, h);throw k || g;
	      });
	    }function ac(b, c, d) {
	      var e = Hb(void 0);b = r(b.b);for (var f = b.next(); !f.done; f = b.next()) e = e.U(f.value.bind(null, c, d.response));return e.U(function () {
	        return d;
	      }, function (b) {
	        if (b && 7001 == b.code) throw b;var c = 2;b instanceof D && (c = b.severity);throw new D(c, 1, 1007, b);
	      });
	    }function Xb() {
	      this.a = 0;
	    }J.NumBytesRemainingClass = Xb;function Yb(b, c, d) {
	      H.call(this, b, c);this.b = d;
	    }va(Yb, H);
	    J.PendingRequest = Yb;Yb.all = Jb;Yb.notAbortable = Ib;Yb.completed = Hb;Yb.aborted = Eb;Yb.failed = Db;function bc() {}A("shaka.util.IReleasable", bc);bc.prototype.release = function () {};function K() {
	      this.a = new Lb();
	    }A("shaka.util.EventManager", K);K.prototype.release = function () {
	      this.$a();this.a = null;
	    };K.prototype.release = K.prototype.release;K.prototype.w = function (b, c, d, e) {
	      this.a && (b = new cc(b, c, d, e), this.a.push(c, b));
	    };K.prototype.listen = K.prototype.w;K.prototype.da = function (b, c, d, e) {
	      function f(e) {
	        g.ea(b, c, f);d(e);
	      }var g = this;this.w(b, c, f, e);
	    };K.prototype.listenOnce = K.prototype.da;
	    K.prototype.ea = function (b, c, d) {
	      if (this.a) {
	        var e = this.a.get(c) || [];e = r(e);for (var f = e.next(); !f.done; f = e.next()) f = f.value, f.target != b || d != f.listener && d || (f.ea(), this.a.remove(c, f));
	      }
	    };K.prototype.unlisten = K.prototype.ea;K.prototype.$a = function () {
	      if (this.a) {
	        var b = this.a.getAll();b = r(b);for (var c = b.next(); !c.done; c = b.next()) c.value.ea();this.a.a = {};
	      }
	    };K.prototype.removeAll = K.prototype.$a;
	    function cc(b, c, d, e) {
	      this.target = b;this.type = c;this.listener = d;this.a = dc(b, e);this.target.addEventListener(c, d, this.a);
	    }cc.prototype.ea = function () {
	      this.target.removeEventListener(this.type, this.listener, this.a);this.listener = this.target = null;this.a = !1;
	    };cc.prototype.unlisten = cc.prototype.ea;function dc(b, c) {
	      if (void 0 == c) return !1;if ("boolean" == typeof c) return c;var d = new Set(["passive", "capture"]);Object.keys(c).filter(function (b) {
	        return !d.has(b);
	      });return ec(b) ? c : c.capture || !1;
	    }
	    function ec(b) {
	      var c = fc;if (void 0 == c) {
	        c = !1;try {
	          var d = {},
	              e = { get: function () {
	              c = !0;return !1;
	            } };Object.defineProperty(d, "passive", e);Object.defineProperty(d, "capture", e);e = function () {};b.addEventListener("test", e, d);b.removeEventListener("test", e, d);
	        } catch (f) {
	          c = !1;
	        }fc = c;
	      }return c || !1;
	    }var fc = void 0;function gc(b) {
	      b = new Uint8Array(b);if (new DataView(b.buffer, b.byteOffset, b.byteLength).getUint32(0, !0) + 4 != b.byteLength) throw new RangeError("Malformed FairPlay init data");b = hc(b.subarray(4), !0);return new ib(b).sa;
	    }A("shaka.util.FairPlayUtils.defaultGetContentId", gc);
	    function ic(b, c, d) {
	      function e(b) {
	        new DataView(g.buffer).setUint32(h, b.byteLength, !0);h += 4;f(b);
	      }function f(b) {
	        g.set(b, h);h += b.byteLength;
	      }if (!d || !d.byteLength) throw new D(2, 6, 6015);c = "string" == typeof c ? new Uint8Array(jc(c, !0)) : new Uint8Array(c);var g = new Uint8Array(8 + b.byteLength + c.byteLength + d.byteLength),
	          h = 0;f(new Uint8Array(b));e(c);e(new Uint8Array(d));return g;
	    }A("shaka.util.FairPlayUtils.initDataTransform", ic);function kc(b, c) {
	      for (var d = [], e = r(b), f = e.next(); !f.done; f = e.next()) d.push(c(f.value));return d;
	    }function lc(b, c) {
	      for (var d = r(b), e = d.next(); !e.done; e = d.next()) if (!c(e.value)) return !1;return !0;
	    }function mc(b) {
	      var c = new Map();Object.keys(b).forEach(function (d) {
	        c.set(d, b[d]);
	      });return c;
	    }function nc(b) {
	      var c = {};b.forEach(function (b, e) {
	        c[e] = b;
	      });return c;
	    }function oc(b, c) {
	      var d = b;c && (d += '; codecs="' + c + '"');return d;
	    }function pc(b) {
	      var c = [b.mimeType];qc.forEach(function (d, e) {
	        var f = b[e];f && c.push(d + '="' + f + '"');
	      });return c.join(";");
	    }function rc(b) {
	      b = b.split(".");var c = b[0];b.pop();return [c, b.join(".")];
	    }var qc = new Map().set("codecs", "codecs").set("frameRate", "framerate").set("bandwidth", "bitrate").set("width", "width").set("height", "height").set("channelsCount", "channels");function sc() {
	      return window.MediaSource && MediaSource.isTypeSupported ? !0 : !1;
	    }function tc(b) {
	      return "" != uc().canPlayType(b);
	    }function vc() {
	      return !!navigator.vendor && navigator.vendor.includes("Apple") && !wc("Tizen");
	    }function xc() {
	      if (!vc()) return null;var b = navigator.userAgent.match(/Version\/(\d+)/);return b ? parseInt(b[1], 10) : (b = navigator.userAgent.match(/OS (\d+)(?:_\d+)?/)) ? parseInt(b[1], 10) : null;
	    }function wc(b) {
	      return (navigator.userAgent || "").includes(b);
	    }
	    function uc() {
	      if (yc) return yc;zc || (zc = new C(function () {
	        yc = null;
	      }));(yc = document.querySelector("video") || document.querySelector("audio")) || (yc = document.createElement("video"));zc.R(1);return yc;
	    }var zc = null,
	        yc = null;function Bc(b) {
	      if (!b) return "";b = new Uint8Array(b);239 == b[0] && 187 == b[1] && 191 == b[2] && (b = b.subarray(3));b = Cc(b);b = escape(b);try {
	        return decodeURIComponent(b);
	      } catch (c) {
	        throw new D(2, 2, 2004);
	      }
	    }A("shaka.util.StringUtils.fromUTF8", Bc);
	    function hc(b, c, d) {
	      if (!b) return "";if (!d && 0 != b.byteLength % 2) throw new D(2, 2, 2004);if (b instanceof ArrayBuffer) var e = b;else d = new Uint8Array(b.byteLength), d.set(new Uint8Array(b)), e = d.buffer;b = Math.floor(b.byteLength / 2);d = new Uint16Array(b);e = new DataView(e);for (var f = 0; f < b; f++) d[f] = e.getUint16(2 * f, c);return Cc(d);
	    }A("shaka.util.StringUtils.fromUTF16", hc);
	    function Dc(b) {
	      var c = new Uint8Array(b);if (239 == c[0] && 187 == c[1] && 191 == c[2]) return Bc(c);if (254 == c[0] && 255 == c[1]) return hc(c.subarray(2), !1);if (255 == c[0] && 254 == c[1]) return hc(c.subarray(2), !0);var d = function (b, c) {
	        return b.byteLength <= c || 32 <= b[c] && 126 >= b[c];
	      }.bind(null, c);if (0 == c[0] && 0 == c[2]) return hc(b, !1);if (0 == c[1] && 0 == c[3]) return hc(b, !0);if (d(0) && d(1) && d(2) && d(3)) return Bc(b);throw new D(2, 2, 2003);
	    }A("shaka.util.StringUtils.fromBytesAutoDetect", Dc);
	    function Ec(b) {
	      b = encodeURIComponent(b);b = unescape(b);for (var c = new Uint8Array(b.length), d = 0; d < b.length; ++d) c[d] = b.charCodeAt(d);return c.buffer;
	    }A("shaka.util.StringUtils.toUTF8", Ec);function jc(b, c) {
	      for (var d = new Uint8Array(2 * b.length), e = new DataView(d.buffer), f = 0; f < b.length; ++f) e.setUint16(2 * f, b.charCodeAt(f), c);return d.buffer;
	    }A("shaka.util.StringUtils.toUTF16", jc);
	    function Cc(b) {
	      if (!Fc) for (var c = function (b) {
	        try {
	          var c = new Uint8Array(b);return 0 < String.fromCharCode.apply(null, c).length;
	        } catch (g) {
	          return !1;
	        }
	      }, d = { size: 65536 }; 0 < d.size; d = { size: d.size }, d.size /= 2) if (c(d.size)) {
	        Fc = function (b) {
	          return function (c) {
	            for (var d = "", e = 0; e < c.length; e += b.size) d += String.fromCharCode.apply(null, c.subarray(e, e + b.size));return d;
	          };
	        }(d);break;
	      }return Fc(b);
	    }var Fc = null;A("shaka.util.StringUtils.resetFromCharCode", function () {
	      Fc = null;
	    });var L = { zc: function (b, c) {
	        var d = Cc(b);c = void 0 == c ? !0 : c;d = window.btoa(d).replace(/\+/g, "-").replace(/\//g, "_");return c ? d : d.replace(/=*$/, "");
	      } };A("shaka.util.Uint8ArrayUtils.toBase64", L.zc);L.Ba = function (b) {
	      b = window.atob(b.replace(/-/g, "+").replace(/_/g, "/"));for (var c = new Uint8Array(b.length), d = 0; d < b.length; ++d) c[d] = b.charCodeAt(d);return c;
	    };A("shaka.util.Uint8ArrayUtils.fromBase64", L.Ba);
	    L.Qc = function (b) {
	      for (var c = new Uint8Array(b.length / 2), d = 0; d < b.length; d += 2) c[d / 2] = window.parseInt(b.substr(d, 2), 16);return c;
	    };A("shaka.util.Uint8ArrayUtils.fromHex", L.Qc);L.Ac = function (b) {
	      for (var c = "", d = 0; d < b.length; ++d) {
	        var e = b[d].toString(16);1 == e.length && (e = "0" + e);c += e;
	      }return c;
	    };A("shaka.util.Uint8ArrayUtils.toHex", L.Ac);L.za = function (b, c) {
	      if (!b && !c) return !0;if (!b || !c || b.length != c.length) return !1;for (var d = 0; d < b.length; ++d) if (b[d] != c[d]) return !1;return !0;
	    };A("shaka.util.Uint8ArrayUtils.equal", L.za);
	    L.concat = function (b) {
	      for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];for (var e = d = 0; e < c.length; ++e) d += c[e].length;d = new Uint8Array(d);for (var f = e = 0; f < c.length; ++f) d.set(c[f], e), e += c[f].length;return d;
	    };A("shaka.util.Uint8ArrayUtils.concat", L.concat);function Gc(b) {
	      var c = this;this.B = b;this.u = new Set();this.h = this.l = null;this.S = !1;this.K = 0;this.a = null;this.i = new K();this.b = new Map();this.s = [];this.m = new F();this.f = null;this.g = function (d) {
	        c.m.reject(d);b.onError(d);
	      };this.pa = new Map();this.W = new Map();this.O = new C(function () {
	        return Hc(c);
	      });this.c = !1;this.na = new F();this.D = !1;this.F = [];this.oa = !1;this.$ = new C(function () {
	        Ic(c);
	      }).Na(1);this.m["catch"](function () {});
	    }q = Gc.prototype;
	    q.destroy = function () {
	      var b = this;return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (b.c) return u(d, b.na, 0);b.c = !0;return u(d, Jc(b), 4);case 4:
	              b.na.resolve(), d.A(0);}
	        });
	      });
	    };
	    function Jc(b) {
	      return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.i.release(), b.i = null, b.m.reject(), b.$.stop(), b.$ = null, b.O.stop(), b.O = null, u(d, Kc(b), 2);case 2:
	              if (!b.h) {
	                d.A(3);break;
	              }za(d, 4);return u(d, b.h.setMediaKeys(null), 6);case 6:
	              Ba(d, 5);break;case 4:
	              Ca(d);case 5:
	              b.h = null;case 3:
	              b.a = null, b.u.clear(), b.l = null, b.s = [], b.f = null, b.g = null, b.B = null, w(d);}
	        });
	      });
	    }q.configure = function (b) {
	      this.f = b;
	    };function Lc(b, c, d) {
	      b.s = [];b.D = d;return Mc(b, c);
	    }
	    function Nc(b, c, d) {
	      b.s = d;b.D = 0 < d.length;return Mc(b, c);
	    }function Oc(b, c, d, e, f, g) {
	      var h = new Map();h.set(c, { audioCapabilities: f, videoCapabilities: g, distinctiveIdentifier: "optional", persistentState: "required", sessionTypes: ["persistent-license"], label: c, drmInfos: [{ keySystem: c, licenseServerUri: d, distinctiveIdentifierRequired: !1, persistentStateRequired: !0, audioRobustness: "", videoRobustness: "", serverCertificate: e, initData: null, keyIds: null }] });return Pc(b, h);
	    }
	    function Mc(b, c) {
	      var d = Qc(b);if (d) for (var e = r(c), f = e.next(); !f.done; f = e.next()) f.value.drmInfos = [d];d = c.some(function (b) {
	        return 0 < b.drmInfos.length;
	      });d || (f = mc(b.f.servers), Rc(c, f));e = r(c);for (f = e.next(); !f.done; f = e.next()) {
	        f = r(f.value.drmInfos);for (var g = f.next(); !g.done; g = f.next()) Sc(g.value, mc(b.f.servers), mc(b.f.advanced || {}));
	      }f = Tc(b, c);if (!f.size) return b.S = !0, Promise.resolve();f = Pc(b, f);return d ? f : f["catch"](function () {});
	    }
	    q.Hb = function (b) {
	      var c = this;if (!this.l) return this.i.da(b, "encrypted", function () {
	        c.g(new D(2, 6, 6010));
	      }), Promise.resolve();this.h = b;this.i.da(this.h, "play", function () {
	        for (var b = 0; b < c.F.length; b++) Uc(c, c.F[b]);c.oa = !0;c.F = [];
	      });"webkitCurrentPlaybackTargetIsWireless" in this.h && this.i.w(this.h, "webkitcurrentplaybacktargetiswirelesschanged", function () {
	        return Kc(c);
	      });b = this.h.setMediaKeys(this.l);b = b["catch"](function (b) {
	        return Promise.reject(new D(2, 6, 6003, b.message));
	      });var d = Vc(this);return Promise.all([b, d]).then(function () {
	        if (c.c) return Promise.reject();Wc(c);c.a.initData.length || c.s.length || c.i.w(c.h, "encrypted", function (b) {
	          return Xc(c, b.initDataType, new Uint8Array(b.initData));
	        });
	      })["catch"](function (b) {
	        if (!c.c) return Promise.reject(b);
	      });
	    };
	    function Vc(b) {
	      return t(function d() {
	        var e;return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (!(b.l && b.a && b.a.serverCertificate && b.a.serverCertificate.length)) {
	                d.A(0);break;
	              }za(d, 3);return u(d, b.l.setServerCertificate(b.a.serverCertificate), 5);case 5:
	              Ba(d, 0);break;case 3:
	              return e = Ca(d), d["return"](Promise.reject(new D(2, 6, 6004, e.message)));}
	        });
	      });
	    }
	    function Yc(b, c) {
	      return t(function e() {
	        var f, g, h;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return u(e, Zc(b, c), 2);case 2:
	              f = e.o;if (!f) return e["return"]();g = [];if (h = b.b.get(f)) h.ya = new F(), g.push(h.ya);g.push(f.remove());return u(e, Promise.all(g), 0);}
	        });
	      });
	    }function Wc(b) {
	      var c = b.a ? b.a.initData : [];c.forEach(function (c) {
	        return $c(b, c.initDataType, c.initData);
	      });b.s.forEach(function (c) {
	        return Zc(b, c);
	      });c.length || b.s.length || b.m.resolve();return b.m;
	    }
	    function Xc(b, c, d) {
	      var e = b.b.values();e = r(e);for (var f = e.next(); !f.done; f = e.next()) if (L.za(d, f.value.initData) && !wc("Tizen 2")) return;$c(b, c, d);
	    }function ad(b) {
	      return b ? b.keySystem : "";
	    }function bd(b, c) {
	      return wc("Edge/") ? !0 : b.u.has(c);
	    }function cd(b) {
	      b = b.b.keys();b = kc(b, function (b) {
	        return b.sessionId;
	      });return Array.from(b);
	    }q.Lb = function () {
	      var b = Infinity,
	          c = this.b.keys();c = r(c);for (var d = c.next(); !d.done; d = c.next()) d = d.value, isNaN(d.expiration) || (b = Math.min(b, d.expiration));return b;
	    };
	    function Tc(b, c) {
	      for (var d = new Set(), e = r(c), f = e.next(); !f.done; f = e.next()) {
	        var g = r(f.value.drmInfos);for (f = g.next(); !f.done; f = g.next()) d.add(f.value);
	      }e = r(d);for (f = e.next(); !f.done; f = e.next()) Sc(f.value, mc(b.f.servers), mc(b.f.advanced || {}));g = b.D ? "required" : "optional";var h = b.D ? ["persistent-license"] : ["temporary"];e = new Map();d = r(d);for (f = d.next(); !f.done; f = d.next()) f = f.value, e.set(f.keySystem, { audioCapabilities: [], videoCapabilities: [], distinctiveIdentifier: "optional", persistentState: g, sessionTypes: h,
	        label: f.keySystem, drmInfos: [] });d = r(c);for (f = d.next(); !f.done; f = d.next()) {
	        f = f.value;g = f.audio;h = f.video;var k = g ? oc(g.mimeType, g.codecs) : "",
	            l = h ? oc(h.mimeType, h.codecs) : "",
	            m = r(f.drmInfos);for (f = m.next(); !f.done; f = m.next()) {
	          f = f.value;var n = e.get(f.keySystem);n.drmInfos.push(f);f.distinctiveIdentifierRequired && (n.distinctiveIdentifier = "required");f.persistentStateRequired && (n.persistentState = "required");g && n.audioCapabilities.push({ robustness: f.audioRobustness || "", contentType: k });h && n.videoCapabilities.push({ robustness: f.videoRobustness || "", contentType: l });
	        }
	      }return e;
	    }
	    function Pc(b, c) {
	      if (1 == c.size && c.has("")) return Promise.reject(new D(2, 6, 6E3));for (var d = r(c.values()), e = d.next(); !e.done; e = d.next()) e = e.value, 0 == e.audioCapabilities.length && delete e.audioCapabilities, 0 == e.videoCapabilities.length && delete e.videoCapabilities;var f = d = new F();[!0, !1].forEach(function (b) {
	        var d = this;c.forEach(function (c, e) {
	          c.drmInfos.some(function (b) {
	            return !!b.licenseServerUri;
	          }) == b && (f = f["catch"](function () {
	            if (!this.c) return navigator.requestMediaKeySystemAccess(e, [c]);
	          }.bind(d)));
	        });
	      }.bind(b));
	      f = f["catch"](function () {
	        return Promise.reject(new D(2, 6, 6001));
	      });f = f.then(function (b) {
	        if (this.c) return Promise.reject();this.u.clear();var d = b.getConfiguration(),
	            e = d.videoCapabilities || [],
	            f = r(d.audioCapabilities || []);for (d = f.next(); !d.done; d = f.next()) this.u.add(d.value.contentType);e = r(e);for (d = e.next(); !d.done; d = e.next()) this.u.add(d.value.contentType);e = b.keySystem;d = c.get(b.keySystem);f = [];var g = [],
	            n = [],
	            p = [];dd(d.drmInfos, f, g, n, p);this.a = { keySystem: e, licenseServerUri: f[0], distinctiveIdentifierRequired: "required" == d.distinctiveIdentifier, persistentStateRequired: "required" == d.persistentState, audioRobustness: (d.audioCapabilities ? d.audioCapabilities[0].robustness : "") || "", videoRobustness: (d.videoCapabilities ? d.videoCapabilities[0].robustness : "") || "", serverCertificate: g[0], initData: n, keyIds: p };return this.a.licenseServerUri ? b.createMediaKeys() : Promise.reject(new D(2, 6, 6012, this.a.keySystem));
	      }.bind(b)).then(function (b) {
	        if (this.c) return Promise.reject();this.l = b;this.S = !0;
	      }.bind(b))["catch"](function (b) {
	        if (!this.c) return this.a = null, this.u.clear(), b instanceof D ? Promise.reject(b) : Promise.reject(new D(2, 6, 6002, b.message));
	      }.bind(b));d.reject();return f;
	    }
	    function Qc(b) {
	      b = mc(b.f.clearKeys);if (0 == b.size) return null;var c = [],
	          d = [];b.forEach(function (b, e) {
	        var f = L.Qc(e),
	            g = L.Qc(b);f = { kty: "oct", kid: L.zc(f, !1), k: L.zc(g, !1) };c.push(f);d.push(f.kid);
	      });b = JSON.stringify({ keys: c });var e = JSON.stringify({ kids: d });e = [{ initData: new Uint8Array(Ec(e)), initDataType: "keyids" }];return { keySystem: "org.w3.clearkey", licenseServerUri: "data:application/json;base64," + window.btoa(b), distinctiveIdentifierRequired: !1, persistentStateRequired: !1, audioRobustness: "", videoRobustness: "",
	        serverCertificate: null, initData: e, keyIds: [] };
	    }
	    function Zc(b, c) {
	      try {
	        var d = b.l.createSession("persistent-license");
	      } catch (g) {
	        var e = new D(2, 6, 6005, g.message);b.g(e);return Promise.reject(e);
	      }b.i.w(d, "message", b.fe.bind(b));b.i.w(d, "keystatuseschange", b.de.bind(b));var f = { initData: null, loaded: !1, hd: Infinity, ya: null };b.b.set(d, f);return d.load(c).then(function (b) {
	        if (this.c) return Promise.reject();if (b) return f.loaded = !0, ed(this) && this.m.resolve(), d;this.b["delete"](d);this.g(new D(2, 6, 6013));
	      }.bind(b), function (b) {
	        this.c || (this.b["delete"](d), this.g(new D(2, 6, 6005, b.message)));
	      }.bind(b));
	    }
	    function $c(b, c, d) {
	      try {
	        var e = b.D ? b.l.createSession("persistent-license") : b.l.createSession();
	      } catch (f) {
	        b.g(new D(2, 6, 6005, f.message));return;
	      }b.i.w(e, "message", b.fe.bind(b));b.i.w(e, "keystatuseschange", b.de.bind(b));b.b.set(e, { initData: d, loaded: !1, hd: Infinity, ya: null });try {
	        d = b.f.initDataTransform(d, b.a);
	      } catch (f) {
	        c = f;f instanceof D || (c = new D(2, 6, 6016, f));b.g(c);return;
	      }e.generateRequest(c, d.buffer)["catch"](function (c) {
	        if (!b.c) {
	          b.b["delete"](e);if (c.errorCode && c.errorCode.systemCode) {
	            var d = c.errorCode.systemCode;
	            0 > d && (d += Math.pow(2, 32));d = "0x" + d.toString(16);
	          }b.g(new D(2, 6, 6006, c.message, c, d));
	        }
	      });
	    }function fd(b, c) {
	      if (ad(c).startsWith("com.apple.fps")) {
	        var d = c.serverCertificate,
	            e = gc(b);b = ic(b, e, d);
	      }return b;
	    }q.fe = function (b) {
	      this.h && this.f.delayLicenseRequestUntilPlayed && this.h.paused && !this.oa ? this.F.push(b) : Uc(this, b);
	    };
	    function Uc(b, c) {
	      var d = c.target,
	          e = b.b.get(d),
	          f = b.a.licenseServerUri,
	          g = b.f.advanced[b.a.keySystem];"individualization-request" == c.messageType && g && g.individualizationServer && (f = g.individualizationServer);f = Wb([f], b.f.retryParameters);f.body = c.message;f.method = "POST";f.licenseRequestType = c.messageType;f.sessionId = d.sessionId;"com.microsoft.playready" != b.a.keySystem && "com.chromecast.playready" != b.a.keySystem || gd(f);b.a.keySystem.startsWith("com.apple.fps") && b.f.fairPlayTransform && hd(f);var h = Date.now();
	      b.B.ub.request(2, f).promise.then(function (b) {
	        if (this.c) return Promise.reject();this.a.keySystem.startsWith("com.apple.fps") && this.f.fairPlayTransform && id(b);this.K += (Date.now() - h) / 1E3;return d.update(b.data).then(function () {
	          var b = this;this.B.onEvent(new I("drmsessionupdate"));e && (e.ya && e.ya.resolve(), new C(function () {
	            e.loaded = !0;ed(b) && b.m.resolve();
	          }).R(jd));
	        }.bind(this));
	      }.bind(b), function (b) {
	        this.c || (b = new D(2, 6, 6007, b), this.g(b), e && e.ya && e.ya.reject(b));
	      }.bind(b))["catch"](function (b) {
	        this.c || (b = new D(2, 6, 6008, b.message), this.g(b), e && e.ya && e.ya.reject(b));
	      }.bind(b));
	    }function gd(b) {
	      var c = hc(b.body, !0, !0);if (c.includes("PlayReadyKeyMessage")) {
	        c = new DOMParser().parseFromString(c, "application/xml");for (var d = c.getElementsByTagName("HttpHeader"), e = 0; e < d.length; ++e) b.headers[d[e].querySelector("name").textContent] = d[e].querySelector("value").textContent;b.body = L.Ba(c.querySelector("Challenge").textContent).buffer;
	      } else b.headers["Content-Type"] = "text/xml; charset=utf-8";
	    }
	    function hd(b) {
	      var c = new Uint8Array(b.body);c = "spc=" + L.zc(c);b.headers["Content-Type"] = "application/x-www-form-urlencoded";b.body = Ec(c);
	    }function id(b) {
	      try {
	        var c = Bc(b.data);
	      } catch (d) {
	        return;
	      }c = c.trim();"<ckc>" === c.substr(0, 5) && "</ckc>" === c.substr(-6) && (c = c.slice(5, -6));try {
	        c = JSON.parse(c).ckc;
	      } catch (d) {}b.data = L.Ba(c).buffer;
	    }
	    q.de = function (b) {
	      b = b.target;var c = this.b.get(b),
	          d = !1;b.keyStatuses.forEach(function (b, e) {
	        if ("string" == typeof e) {
	          var f = e;e = b;b = f;
	        }if ("com.microsoft.playready" == this.a.keySystem && 16 == e.byteLength && !wc("Tizen") && !wc("VITIS")) {
	          f = new DataView(e);var g = f.getUint32(0, !0),
	              l = f.getUint16(4, !0),
	              m = f.getUint16(6, !0);f.setUint32(0, g, !1);f.setUint16(4, l, !1);f.setUint16(6, m, !1);
	        }"com.microsoft.playready" == this.a.keySystem && "status-pending" == b && (b = "usable");"status-pending" != b && (c.loaded = !0);"expired" == b && (d = !0);f = L.Ac(new Uint8Array(e));this.pa.set(f, b);
	      }.bind(this));var e = b.expiration - Date.now();(0 > e || d && 1E3 > e) && c && !c.ya && (this.b["delete"](b), b.close()["catch"](function () {}));ed(this) && (this.m.resolve(), this.O.R(kd));
	    };function Hc(b) {
	      var c = b.pa,
	          d = b.W;d.clear();c.forEach(function (b, c) {
	        return d.set(c, b);
	      });c = Array.from(d.values());c.length && c.every(function (b) {
	        return "expired" == b;
	      }) && b.g(new D(2, 6, 6014));b.B.qc(nc(d));
	    }
	    function ld() {
	      function b(b) {
	        return t(function h() {
	          var c, f, m;return z(h, function (h) {
	            switch (h.j) {case 1:
	                return za(h, 2), u(h, navigator.requestMediaKeySystemAccess(b, d), 4);case 4:
	                return c = h.o, m = (f = c.getConfiguration().sessionTypes) ? f.includes("persistent-license") : !1, wc("Tizen 3") && (m = !1), e.set(b, { persistentState: m }), u(h, c.createMediaKeys(), 5);case 5:
	                Ba(h, 0);break;case 2:
	                Ca(h), e.set(b, null), w(h);}
	          });
	        });
	      }var c = [{ contentType: 'video/mp4; codecs="avc1.42E01E"' }, { contentType: 'video/webm; codecs="vp8"' }],
	          d = [{ videoCapabilities: c,
	        persistentState: "required", sessionTypes: ["persistent-license"] }, { videoCapabilities: c }],
	          e = new Map();c = "org.w3.clearkey com.widevine.alpha com.microsoft.playready com.apple.fps.3_0 com.apple.fps.2_0 com.apple.fps.1_0 com.apple.fps com.adobe.primetime".split(" ").map(function (c) {
	        return b(c);
	      });return Promise.all(c).then(function () {
	        return nc(e);
	      });
	    }
	    function md(b, c) {
	      var d = c.audio,
	          e = c.video;if (d && d.encrypted && !bd(b, oc(d.mimeType, d.codecs)) || e && e.encrypted && !bd(b, oc(e.mimeType, e.codecs))) return !1;var f = ad(b.a);return 0 == c.drmInfos.length || c.drmInfos.some(function (b) {
	        return b.keySystem == f;
	      });
	    }
	    function nd(b, c) {
	      if (!b.length) return c;if (!c.length) return b;for (var d = [], e = 0; e < b.length; e++) for (var f = 0; f < c.length; f++) if (b[e].keySystem == c[f].keySystem) {
	        var g = b[e];f = c[f];var h = [];h = h.concat(g.initData || []);h = h.concat(f.initData || []);var k = [];k = k.concat(g.keyIds);k = k.concat(f.keyIds);d.push({ keySystem: g.keySystem, licenseServerUri: g.licenseServerUri || f.licenseServerUri, distinctiveIdentifierRequired: g.distinctiveIdentifierRequired || f.distinctiveIdentifierRequired, persistentStateRequired: g.persistentStateRequired || f.persistentStateRequired, videoRobustness: g.videoRobustness || f.videoRobustness, audioRobustness: g.audioRobustness || f.audioRobustness, serverCertificate: g.serverCertificate || f.serverCertificate, initData: h, keyIds: k });break;
	      }return d;
	    }
	    function Kc(b) {
	      return t(function d() {
	        var e;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = Array.from(b.b.keys()), b.b.clear(), u(d, Promise.all(e.map(function (b) {
	                return t(function k() {
	                  return z(k, function (d) {
	                    switch (d.j) {case 1:
	                        return za(d, 2), u(d, Promise.all([b.close(), b.closed]), 4);case 4:
	                        Ba(d, 0);break;case 2:
	                        Ca(d), w(d);}
	                  });
	                });
	              })), 0);}
	        });
	      });
	    }function Ic(b) {
	      b.b.forEach(function (c, d) {
	        var e = c.hd,
	            f = d.expiration;isNaN(f) && (f = Infinity);f != e && (b.B.onExpirationUpdated(d.sessionId, f), c.hd = f);
	      });
	    }
	    function ed(b) {
	      b = b.b.values();return lc(b, function (b) {
	        return b.loaded;
	      });
	    }function Rc(b, c) {
	      var d = [];c.forEach(function (b, c) {
	        d.push({ keySystem: c, licenseServerUri: b, distinctiveIdentifierRequired: !1, persistentStateRequired: !1, audioRobustness: "", videoRobustness: "", serverCertificate: null, initData: [], keyIds: [] });
	      });for (var e = r(b), f = e.next(); !f.done; f = e.next()) f.value.drmInfos = d;
	    }
	    function dd(b, c, d, e, f) {
	      b.forEach(function (b) {
	        c.includes(b.licenseServerUri) || c.push(b.licenseServerUri);b.serverCertificate && (d.some(function (c) {
	          return L.za(c, b.serverCertificate);
	        }) || d.push(b.serverCertificate));b.initData && b.initData.forEach(function (b) {
	          e.some(function (c) {
	            return c.keyId && c.keyId == b.keyId ? !0 : c.initDataType == b.initDataType && L.za(c.initData, b.initData);
	          }) || e.push(b);
	        });if (b.keyIds) for (var g = 0; g < b.keyIds.length; ++g) f.includes(b.keyIds[g]) || f.push(b.keyIds[g]);
	      });
	    }
	    function Sc(b, c, d) {
	      if (b.keySystem && ("org.w3.clearkey" != b.keySystem || !b.licenseServerUri)) {
	        c.size && (c = c.get(b.keySystem) || "", b.licenseServerUri = c);b.keyIds || (b.keyIds = []);if (d = d.get(b.keySystem)) b.distinctiveIdentifierRequired || (b.distinctiveIdentifierRequired = d.distinctiveIdentifierRequired), b.persistentStateRequired || (b.persistentStateRequired = d.persistentStateRequired), b.videoRobustness || (b.videoRobustness = d.videoRobustness), b.audioRobustness || (b.audioRobustness = d.audioRobustness), b.serverCertificate || (b.serverCertificate = d.serverCertificate);window.cast && window.cast.__platform__ && "com.microsoft.playready" == b.keySystem && (b.keySystem = "com.chromecast.playready");
	      }
	    }var jd = 5,
	        kd = .5;function od() {
	      this.a = new muxjs.mp4.CaptionParser();this.g = [];this.f = {};
	    }od.prototype.init = function (b) {
	      var c = muxjs.mp4.probe;b = new Uint8Array(b);this.g = c.videoTrackIds(b);this.f = c.timescale(b);this.a.init();
	    };od.prototype.b = function (b, c) {
	      var d = new Uint8Array(b);(d = this.a.parse(d, this.g, this.f)) && d.captions && c(d.captions);this.a.clearParsedCaptions();
	    };od.prototype.c = function () {
	      this.a.resetCaptionStream();
	    };function pd() {}pd.prototype.init = function () {};pd.prototype.b = function () {};pd.prototype.c = function () {};function qd(b) {
	      return !b || 1 == b.length && 1E-6 > b.end(0) - b.start(0) ? null : b.length ? b.end(b.length - 1) : null;
	    }function rd(b, c, d) {
	      d = void 0 === d ? 0 : d;return !b || !b.length || 1 == b.length && 1E-6 > b.end(0) - b.start(0) || c > b.end(b.length - 1) ? !1 : c + d >= b.start(0);
	    }function sd(b, c) {
	      if (!b || !b.length || 1 == b.length && 1E-6 > b.end(0) - b.start(0)) return 0;for (var d = 0, e = b.length - 1; 0 <= e && b.end(e) > c; --e) d += b.end(e) - Math.max(b.start(e), c);return d;
	    }
	    function td(b) {
	      if (!b) return [];for (var c = [], d = 0; d < b.length; d++) c.push({ start: b.start(d), end: b.end(d) });return c;
	    }var ud = { Ke: function (b, c) {
	        return b.reduce(function (b, c, f) {
	          return c["catch"](b.bind(null, f));
	        }.bind(null, c), Promise.reject());
	      }, Gc: function (b, c) {
	        return b.concat(c);
	      }, oc: function () {}, Ia: function (b) {
	        return null != b;
	      } };function vd(b, c) {
	      if (0 == c.length) return b;var d = c.map(function (b) {
	        return new ib(b);
	      });return b.map(function (b) {
	        return new ib(b);
	      }).map(function (b) {
	        return d.map(b.resolve.bind(b));
	      }).reduce(ud.Gc, []).map(function (b) {
	        return b.toString();
	      });
	    }function wd(b, c) {
	      return { keySystem: b, licenseServerUri: "", distinctiveIdentifierRequired: !1, persistentStateRequired: !1, audioRobustness: "", videoRobustness: "", serverCertificate: null, initData: c || [], keyIds: [] };
	    }
	    var xd = { Pa: "video", Eb: "audio", ra: "text", Cg: "image", Ag: "application" },
	        yd = 1 / 15;function Bd() {
	      this.a = new muxjs.mp4.Transmuxer({ keepOriginalTimestamps: !0 });this.b = null;this.g = [];this.c = [];this.f = !1;this.a.on("data", this.i.bind(this));this.a.on("done", this.h.bind(this));
	    }Bd.prototype.destroy = function () {
	      this.a.dispose();this.a = null;return Promise.resolve();
	    };function Cd(b, c) {
	      return window.muxjs && "mp2t" == b.toLowerCase().split(";")[0].split("/")[1] ? c ? MediaSource.isTypeSupported(Dd(c, b)) : MediaSource.isTypeSupported(Dd("audio", b)) || MediaSource.isTypeSupported(Dd("video", b)) : !1;
	    }
	    function Dd(b, c) {
	      var d = c.replace(/mp2t/i, "mp4");"audio" == b && (d = d.replace("video", "audio"));var e = /avc1\.(66|77|100)\.(\d+)/.exec(d);if (e) {
	        var f = "avc1.",
	            g = e[1],
	            h = Number(e[2]);f = ("66" == g ? f + "4200" : "77" == g ? f + "4d00" : f + "6400") + (h >> 4).toString(16);f += (h & 15).toString(16);d = d.replace(e[0], f);
	      }return d;
	    }function Ed(b, c) {
	      b.f = !0;b.b = new F();b.g = [];b.c = [];var d = new Uint8Array(c);b.a.push(d);b.a.flush();b.f && b.b.reject(new D(2, 3, 3018));return b.b;
	    }
	    Bd.prototype.i = function (b) {
	      this.c = b.captions;var c = new Uint8Array(b.data.byteLength + b.initSegment.byteLength);c.set(b.initSegment, 0);c.set(b.data, b.initSegment.byteLength);this.g.push(c);
	    };Bd.prototype.h = function () {
	      var b = { data: L.concat.apply(null, this.g), captions: this.c };this.b.resolve(b);this.f = !1;
	    };function Fd(b, c, d) {
	      this.startTime = b;this.direction = Gd;this.endTime = c;this.payload = d;this.region = new Hd();this.position = null;this.positionAlign = Id;this.size = 100;this.textAlign = Jd;this.writingMode = Kd;this.lineInterpretation = Ld;this.line = null;this.lineHeight = "";this.lineAlign = Md;this.displayAlign = Nd;this.fontSize = this.backgroundImage = this.backgroundColor = this.color = "";this.fontWeight = Od;this.fontStyle = Pd;this.fontFamily = "";this.textDecoration = [];this.wrapLine = !0;this.id = "";this.nestedCues = [];this.spacer = !1;
	    }A("shaka.text.Cue", Fd);var Id = "auto";Fd.positionAlign = { LEFT: "line-left", RIGHT: "line-right", CENTER: "center", AUTO: Id };var Jd = "center",
	        Qd = { LEFT: "left", RIGHT: "right", CENTER: Jd, START: "start", END: "end" };Fd.textAlign = Qd;var Nd = "after",
	        Rd = { BEFORE: "before", CENTER: "center", AFTER: Nd };Fd.displayAlign = Rd;var Gd = "ltr";Fd.direction = { HORIZONTAL_LEFT_TO_RIGHT: Gd, HORIZONTAL_RIGHT_TO_LEFT: "rtl" };var Kd = "horizontal-tb";Fd.writingMode = { HORIZONTAL_TOP_TO_BOTTOM: Kd, VERTICAL_LEFT_TO_RIGHT: "vertical-lr", VERTICAL_RIGHT_TO_LEFT: "vertical-rl" };
	    var Ld = 0;Fd.lineInterpretation = { LINE_NUMBER: Ld, PERCENTAGE: 1 };var Md = "start",
	        Sd = { CENTER: "center", START: Md, END: "end" };Fd.lineAlign = Sd;var Od = 400;Fd.fontWeight = { NORMAL: Od, BOLD: 700 };var Pd = "normal",
	        Td = { NORMAL: Pd, ITALIC: "italic", OBLIQUE: "oblique" };Fd.fontStyle = Td;Fd.textDecoration = { UNDERLINE: "underline", LINE_THROUGH: "lineThrough", OVERLINE: "overline" };
	    function Hd() {
	      this.id = "";this.regionAnchorY = this.regionAnchorX = this.viewportAnchorY = this.viewportAnchorX = 0;this.height = this.width = 100;this.viewportAnchorUnits = this.widthUnits = this.heightUnits = Ud;this.scroll = Vd;
	    }A("shaka.text.CueRegion", Hd);var Ud = 1;Hd.units = { PX: 0, PERCENTAGE: Ud, LINES: 2 };var Vd = "";Hd.scrollMode = { NONE: Vd, UP: "up" };function Wd(b) {
	      this.g = null;this.c = b;this.f = this.m = 0;this.h = Infinity;this.b = this.a = null;this.l = "";this.i = new Map();
	    }var Xd = {};A("shaka.text.TextEngine.registerParser", function (b, c) {
	      Xd[b] = c;
	    });A("shaka.text.TextEngine.unregisterParser", function (b) {
	      delete Xd[b];
	    });function Yd(b) {
	      return Xd[b] || window.muxjs && "application/cea-608" == b ? !0 : !1;
	    }Wd.prototype.destroy = function () {
	      this.c = this.g = null;this.i.clear();return Promise.resolve();
	    };function Zd(b, c) {
	      "application/cea-608" != c && (b.g = new Xd[c]());
	    }
	    Wd.prototype.kc = function (b) {
	      var c = { periodStart: 0, segmentStart: null, segmentEnd: 0 };try {
	        return this.g.parseMedia(new Uint8Array(b), c)[0].startTime;
	      } catch (d) {
	        throw new D(2, 2, 2009, d);
	      }
	    };
	    function $d(b, c, d, e) {
	      return Promise.resolve().then(function () {
	        if (this.g && this.c) if (null == d || null == e) this.g.parseInit(new Uint8Array(c));else {
	          var b = { periodStart: this.m, segmentStart: d, segmentEnd: e };b = this.g.parseMedia(new Uint8Array(c), b).filter(function (b) {
	            return b.startTime >= this.f && b.startTime < this.h;
	          }.bind(this));this.c.append(b);null == this.a && (this.a = Math.max(d, this.f));this.b = Math.min(e, this.h);
	        }
	      }.bind(b));
	    }
	    Wd.prototype.remove = function (b, c) {
	      return Promise.resolve().then(function () {
	        !this.c || !this.c.remove(b, c) || null == this.a || c <= this.a || b >= this.b || (b <= this.a && c >= this.b ? this.a = this.b = null : b <= this.a && c < this.b ? this.a = c : b > this.a && c >= this.b && (this.b = b));
	      }.bind(this));
	    };function ae(b, c, d) {
	      b.l = c;if (c = b.i.get(c)) for (var e = r(c.keys()), f = e.next(); !f.done; f = e.next()) (f = c.get(f.value).filter(function (b) {
	        return b.endTime <= d;
	      })) && b.c.append(f);
	    }
	    function be(b, c, d, e, f) {
	      var g = d + " " + e,
	          h = new Map();c = r(c);for (var k = c.next(); !k.done; k = c.next()) {
	        var l = k.value;k = l.stream;h.has(k) || h.set(k, new Map());h.get(k).has(g) || h.get(k).set(g, []);l.startTime += f;l.endTime += f;l.startTime >= b.f && l.startTime < b.h && (l = new Fd(l.startTime, l.endTime, l.text), h.get(k).get(g).push(l), k == b.l && b.c.append([l]));
	      }f = r(h.keys());for (g = f.next(); !g.done; g = f.next()) for (g = g.value, b.i.has(g) || b.i.set(g, new Map()), c = r(h.get(g).keys()), k = c.next(); !k.done; k = c.next()) k = k.value, l = h.get(g).get(k), b.i.get(g).set(k, l);b.a = null == b.a ? Math.max(d, b.f) : Math.min(b.a, Math.max(d, b.f));b.b = Math.max(b.b, Math.min(e, b.h));
	    }function ce(b, c, d) {
	      this.f = b;this.g = d;this.b = {};this.a = null;this.c = {};this.i = new K();this.u = !1;this.l = {};this.m = c;b = this.s = new F();c = new MediaSource();this.i.da(c, "sourceopen", b.resolve);this.f.src = de(c);this.h = c;
	    }var de = window.URL.createObjectURL;function ee(b) {
	      var c = oc(b.mimeType, b.codecs),
	          d = pc(b);return Yd(c) || MediaSource.isTypeSupported(d) || Cd(c, b.type);
	    }q = ce.prototype;
	    q.destroy = function () {
	      var b = this;this.u = !0;var c = [],
	          d;for (d in this.c) {
	        var e = this.c[d],
	            f = e[0];this.c[d] = e.slice(0, 1);f && c.push(f.p["catch"](ud.oc));for (f = 1; f < e.length; ++f) e[f].p.reject();
	      }this.a && c.push(this.a.destroy());this.g && c.push(this.g.destroy());for (var g in this.l) c.push(this.l[g].destroy());return Promise.all(c).then(function () {
	        b.i && (b.i.release(), b.i = null);b.f && (b.f.removeAttribute("src"), b.f.load(), b.f = null);b.h = null;b.a = null;b.g = null;b.b = {};b.l = {};b.m = null;b.c = {};
	      });
	    };
	    q.init = function (b, c) {
	      var d = this;return t(function f() {
	        var g;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = xd, u(f, d.s, 2);case 2:
	              b.forEach(function (b, f) {
	                var h = oc(b.mimeType, b.codecs);f == g.ra ? fe(d, h) : (!c && MediaSource.isTypeSupported(h) || !Cd(h, f) || (d.l[f] = new Bd(), h = Dd(f, h)), h = d.h.addSourceBuffer(h), d.i.w(h, "error", d.lg.bind(d, f)), d.i.w(h, "updateend", d.xb.bind(d, f)), d.b[f] = h, d.c[f] = []);
	              }), w(f);}
	        });
	      });
	    };function fe(b, c) {
	      b.a || (b.a = new Wd(b.g));Zd(b.a, c);
	    }
	    function ge(b) {
	      return b.h ? "ended" == b.h.readyState : !0;
	    }function he(b, c) {
	      if ("text" == c) var d = b.a.a;else d = ie(b, c), d = !d || 1 == d.length && 1E-6 > d.end(0) - d.start(0) ? null : 1 == d.length && 0 > d.start(0) ? 0 : d.length ? d.start(0) : null;return d;
	    }function je(b, c) {
	      return "text" == c ? b.a.b : qd(ie(b, c));
	    }function ke(b, c, d) {
	      if ("text" == c) return b = b.a, null == b.b || b.b < d ? 0 : b.b - Math.max(d, b.a);b = ie(b, c);return sd(b, d);
	    }
	    q.Sc = function (b) {
	      b.total = td(this.f.buffered);b.audio = td(ie(this, "audio"));b.video = td(ie(this, "video"));b.text = [];if (this.a) {
	        var c = this.a.a,
	            d = this.a.b;null != c && null != d && b.text.push({ start: c, end: d });
	      }
	    };function ie(b, c) {
	      try {
	        return b.b[c].buffered;
	      } catch (d) {
	        return null;
	      }
	    }
	    function le(b, c, d, e, f, g) {
	      if ("text" == c) return $d(b.a, d, e, f);if (b.l[c]) return Ed(b.l[c], d).then(function (b) {
	        this.a || fe(this, "text/vtt");b.captions && b.captions.length && be(this.a, b.captions, e, f, this.b.video.timestampOffset);return me(this, c, this.re.bind(this, c, b.data.buffer));
	      }.bind(b));g && window.muxjs && (b.a || fe(b, "text/vtt"), null == e && null == f ? b.m.init(d) : b.m.b(d, function (c) {
	        c.length && be(b.a, c, e, f, b.b.video.timestampOffset);
	      }));return me(b, c, b.re.bind(b, c, d));
	    }
	    function ne(b, c) {
	      var d = je(b, "video") || 0;ae(b.a, c, d);
	    }q.remove = function (b, c, d) {
	      return "text" == b ? this.a.remove(c, d) : me(this, b, this.se.bind(this, b, c, d));
	    };function oe(b, c) {
	      if ("text" == c) {
	        if (!b.a) return Promise.resolve();b.m.c();return b.a.remove(0, Infinity);
	      }return me(b, c, b.se.bind(b, c, 0, b.h.duration));
	    }q.flush = function (b) {
	      return "text" == b ? Promise.resolve() : me(this, b, this.Pe.bind(this, b));
	    };
	    function pe(b, c, d, e, f) {
	      return "text" == c ? (b.a.m = d, b = b.a, b.f = e, b.h = f, Promise.resolve()) : Promise.all([me(b, c, b.Be.bind(b, c)), me(b, c, b.kg.bind(b, c, d)), me(b, c, b.hg.bind(b, c, e, f))]);
	    }q.endOfStream = function (b) {
	      return qe(this, function () {
	        ge(this) || (b ? this.h.endOfStream(b) : this.h.endOfStream());
	      }.bind(this));
	    };q.xa = function (b) {
	      return qe(this, function () {
	        this.h.duration = b;
	      }.bind(this));
	    };q.Y = function () {
	      return this.h.duration;
	    };q.re = function (b, c) {
	      this.b[b].appendBuffer(c);
	    };
	    q.se = function (b, c, d) {
	      d <= c ? this.xb(b) : this.b[b].remove(c, d);
	    };q.Be = function (b) {
	      var c = this.b[b].appendWindowStart,
	          d = this.b[b].appendWindowEnd;this.b[b].abort();this.b[b].appendWindowStart = c;this.b[b].appendWindowEnd = d;this.xb(b);
	    };q.Pe = function (b) {
	      this.f.currentTime -= .001;this.xb(b);
	    };q.kg = function (b, c) {
	      0 > c && (c += .001);this.b[b].timestampOffset = c;this.xb(b);
	    };q.hg = function (b, c, d) {
	      this.b[b].appendWindowStart = 0;this.b[b].appendWindowEnd = d;this.b[b].appendWindowStart = c;this.xb(b);
	    };
	    q.lg = function (b) {
	      this.c[b][0].p.reject(new D(2, 3, 3014, this.f.error ? this.f.error.code : 0));
	    };q.xb = function (b) {
	      var c = this.c[b][0];c && (c.p.resolve(), re(this, b));
	    };function me(b, c, d) {
	      if (b.u) return Promise.reject();d = { start: d, p: new F() };b.c[c].push(d);if (1 == b.c[c].length) try {
	        d.start();
	      } catch (e) {
	        "QuotaExceededError" == e.name ? d.p.reject(new D(2, 3, 3017, c)) : d.p.reject(new D(2, 3, 3015, e)), re(b, c);
	      }return d.p;
	    }
	    function qe(b, c) {
	      if (b.u) return Promise.reject();var d = [],
	          e;for (e in b.b) {
	        var f = new F(),
	            g = { start: function (b) {
	            b.resolve();
	          }.bind(null, f), p: f };b.c[e].push(g);d.push(f);1 == b.c[e].length && g.start();
	      }return Promise.all(d).then(function () {
	        try {
	          c();
	        } catch (l) {
	          var b = Promise.reject(new D(2, 3, 3015, l));
	        }for (var d in this.b) re(this, d);return b;
	      }.bind(b), function (b) {
	        throw b;
	      }.bind(b));
	    }function re(b, c) {
	      b.c[c].shift();var d = b.c[c][0];if (d) try {
	        d.start();
	      } catch (e) {
	        d.p.reject(new D(2, 3, 3015, e)), re(b, c);
	      }
	    }function se(b, c) {
	      b = M(b);c = M(c);return b.split("-")[0] == c.split("-")[0];
	    }function te(b, c) {
	      b = M(b);c = M(c);var d = b.split("-"),
	          e = c.split("-");return d[0] == e[0] && 1 == d.length && 2 == e.length;
	    }function M(b) {
	      var c = b.split("-");b = c[0] || "";c = c[1] || "";b = b.toLowerCase();b = ue.get(b) || b;return (c = c.toUpperCase()) ? b + "-" + c : b;
	    }function ve(b) {
	      return b.language ? M(b.language) : b.audio && b.audio.language ? M(b.audio.language) : b.video && b.video.language ? M(b.video.language) : "und";
	    }
	    function we(b, c) {
	      for (var d = M(b), e = new Set(), f = r(c), g = f.next(); !g.done; g = f.next()) e.add(M(g.value));f = r(e);for (g = f.next(); !g.done; g = f.next()) if (g = g.value, g == d) return g;f = r(e);for (g = f.next(); !g.done; g = f.next()) if (g = g.value, te(g, d)) return g;f = r(e);for (g = f.next(); !g.done; g = f.next()) {
	        var h = g = g.value,
	            k = d;h = M(h);k = M(k);h = h.split("-");k = k.split("-");if (2 == h.length && 2 == k.length && h[0] == k[0]) return g;
	      }e = r(e);for (g = e.next(); !g.done; g = e.next()) if (f = g.value, te(d, f)) return f;return null;
	    }
	    var ue = new Map([["aar", "aa"], ["abk", "ab"], ["afr", "af"], ["aka", "ak"], ["alb", "sq"], ["amh", "am"], ["ara", "ar"], ["arg", "an"], ["arm", "hy"], ["asm", "as"], ["ava", "av"], ["ave", "ae"], ["aym", "ay"], ["aze", "az"], ["bak", "ba"], ["bam", "bm"], ["baq", "eu"], ["bel", "be"], ["ben", "bn"], ["bih", "bh"], ["bis", "bi"], ["bod", "bo"], ["bos", "bs"], ["bre", "br"], ["bul", "bg"], ["bur", "my"], ["cat", "ca"], ["ces", "cs"], ["cha", "ch"], ["che", "ce"], ["chi", "zh"], ["chu", "cu"], ["chv", "cv"], ["cor", "kw"], ["cos", "co"], ["cre", "cr"], ["cym", "cy"], ["cze", "cs"], ["dan", "da"], ["deu", "de"], ["div", "dv"], ["dut", "nl"], ["dzo", "dz"], ["ell", "el"], ["eng", "en"], ["epo", "eo"], ["est", "et"], ["eus", "eu"], ["ewe", "ee"], ["fao", "fo"], ["fas", "fa"], ["fij", "fj"], ["fin", "fi"], ["fra", "fr"], ["fre", "fr"], ["fry", "fy"], ["ful", "ff"], ["geo", "ka"], ["ger", "de"], ["gla", "gd"], ["gle", "ga"], ["glg", "gl"], ["glv", "gv"], ["gre", "el"], ["grn", "gn"], ["guj", "gu"], ["hat", "ht"], ["hau", "ha"], ["heb", "he"], ["her", "hz"], ["hin", "hi"], ["hmo", "ho"], ["hrv", "hr"], ["hun", "hu"], ["hye", "hy"], ["ibo", "ig"], ["ice", "is"], ["ido", "io"], ["iii", "ii"], ["iku", "iu"], ["ile", "ie"], ["ina", "ia"], ["ind", "id"], ["ipk", "ik"], ["isl", "is"], ["ita", "it"], ["jav", "jv"], ["jpn", "ja"], ["kal", "kl"], ["kan", "kn"], ["kas", "ks"], ["kat", "ka"], ["kau", "kr"], ["kaz", "kk"], ["khm", "km"], ["kik", "ki"], ["kin", "rw"], ["kir", "ky"], ["kom", "kv"], ["kon", "kg"], ["kor", "ko"], ["kua", "kj"], ["kur", "ku"], ["lao", "lo"], ["lat", "la"], ["lav", "lv"], ["lim", "li"], ["lin", "ln"], ["lit", "lt"], ["ltz", "lb"], ["lub", "lu"], ["lug", "lg"], ["mac", "mk"], ["mah", "mh"], ["mal", "ml"], ["mao", "mi"], ["mar", "mr"], ["may", "ms"], ["mkd", "mk"], ["mlg", "mg"], ["mlt", "mt"], ["mon", "mn"], ["mri", "mi"], ["msa", "ms"], ["mya", "my"], ["nau", "na"], ["nav", "nv"], ["nbl", "nr"], ["nde", "nd"], ["ndo", "ng"], ["nep", "ne"], ["nld", "nl"], ["nno", "nn"], ["nob", "nb"], ["nor", "no"], ["nya", "ny"], ["oci", "oc"], ["oji", "oj"], ["ori", "or"], ["orm", "om"], ["oss", "os"], ["pan", "pa"], ["per", "fa"], ["pli", "pi"], ["pol", "pl"], ["por", "pt"], ["pus", "ps"], ["que", "qu"], ["roh", "rm"], ["ron", "ro"], ["rum", "ro"], ["run", "rn"], ["rus", "ru"], ["sag", "sg"], ["san", "sa"], ["sin", "si"], ["slk", "sk"], ["slo", "sk"], ["slv", "sl"], ["sme", "se"], ["smo", "sm"], ["sna", "sn"], ["snd", "sd"], ["som", "so"], ["sot", "st"], ["spa", "es"], ["sqi", "sq"], ["srd", "sc"], ["srp", "sr"], ["ssw", "ss"], ["sun", "su"], ["swa", "sw"], ["swe", "sv"], ["tah", "ty"], ["tam", "ta"], ["tat", "tt"], ["tel", "te"], ["tgk", "tg"], ["tgl", "tl"], ["tha", "th"], ["tib", "bo"], ["tir", "ti"], ["ton", "to"], ["tsn", "tn"], ["tso", "ts"], ["tuk", "tk"], ["tur", "tr"], ["twi", "tw"], ["uig", "ug"], ["ukr", "uk"], ["urd", "ur"], ["uzb", "uz"], ["ven", "ve"], ["vie", "vi"], ["vol", "vo"], ["wel", "cy"], ["wln", "wa"], ["wol", "wo"], ["xho", "xh"], ["yid", "yi"], ["yor", "yo"], ["zha", "za"], ["zho", "zh"], ["zul", "zu"]]);var N = { bd: function (b, c, d) {
	        function e(b, c, d) {
	          return b >= c && b <= d;
	        }var f = b.video;return f && f.width && f.height && (!e(f.width, c.minWidth, Math.min(c.maxWidth, d.width)) || !e(f.height, c.minHeight, Math.min(c.maxHeight, d.height)) || !e(f.width * f.height, c.minPixels, c.maxPixels)) || b && b.frameRate && !e(b.frameRate, c.minFrameRate, c.maxFrameRate) || !e(b.bandwidth, c.minBandwidth, c.maxBandwidth) ? !1 : !0;
	      }, Gd: function (b, c, d) {
	        var e = !1;b.forEach(function (b) {
	          var f = b.allowedByApplication;b.allowedByApplication = N.bd(b, c, d);f != b.allowedByApplication && (e = !0);
	        });return e;
	      }, filterNewPeriod: function (b, c, d, e) {
	        e.variants = e.variants.filter(function (e) {
	          if (b && b.S && !md(b, e)) return !1;var f = e.audio;e = e.video;return f && !ee(f) || e && !ee(e) || f && c && !N.Hd(f, c) || e && d && !N.Hd(e, d) ? !1 : !0;
	        });e.textStreams = e.textStreams.filter(function (b) {
	          return Yd(oc(b.mimeType, b.codecs));
	        });
	      }, Hd: function (b, c) {
	        return b.mimeType != c.mimeType || b.codecs.split(".")[0] != c.codecs.split(".")[0] ? !1 : !0;
	      }, Ed: function (b) {
	        var c = b.audio,
	            d = b.video,
	            e = c ? c.codecs : null,
	            f = d ? d.codecs : null,
	            g = [];f && g.push(f);e && g.push(e);var h = [];d && h.push(d.mimeType);c && h.push(c.mimeType);h = h[0] || null;var k = [];c && k.push(c.kind);d && k.push(d.kind);k = k[0] || null;var l = new Set();c && c.roles.forEach(function (b) {
	          return l.add(b);
	        });d && d.roles.forEach(function (b) {
	          return l.add(b);
	        });b = { id: b.id, active: !1, type: "variant", bandwidth: b.bandwidth, language: b.language, label: null, kind: k, width: null, height: null, frameRate: null, pixelAspectRatio: null, mimeType: h, codecs: g.join(", "), audioCodec: e, videoCodec: f, primary: b.primary, roles: Array.from(l), audioRoles: null,
	          videoId: null, audioId: null, channelsCount: null, audioSamplingRate: null, audioBandwidth: null, videoBandwidth: null, originalVideoId: null, originalAudioId: null, originalTextId: null };d && (b.videoId = d.id, b.originalVideoId = d.originalId, b.width = d.width || null, b.height = d.height || null, b.frameRate = d.frameRate || null, b.pixelAspectRatio = d.pixelAspectRatio || null, b.videoBandwidth = d.bandwidth || null);c && (b.audioId = c.id, b.originalAudioId = c.originalId, b.channelsCount = c.channelsCount, b.audioSamplingRate = c.audioSamplingRate, b.audioBandwidth = c.bandwidth || null, b.label = c.label, b.audioRoles = c.roles);return b;
	      }, xc: function (b) {
	        return { id: b.id, active: !1, type: "text", bandwidth: 0, language: b.language, label: b.label, kind: b.kind || null, width: null, height: null, frameRate: null, pixelAspectRatio: null, mimeType: b.mimeType, codecs: b.codecs || null, audioCodec: null, videoCodec: null, primary: b.primary, roles: b.roles, audioRoles: null, videoId: null, audioId: null, channelsCount: null, audioSamplingRate: null, audioBandwidth: null, videoBandwidth: null, originalVideoId: null, originalAudioId: null,
	          originalTextId: b.originalId };
	      }, Wc: function (b) {
	        b.__shaka_id || (b.__shaka_id = N.yf++);return b.__shaka_id;
	      }, yf: 0, sf: function (b) {
	        var c = N.Sd(b);c.active = "disabled" != b.mode;c.type = "text";c.originalTextId = b.id;"captions" == b.kind && (c.mimeType = "application/cea-608");return c;
	      }, rf: function (b) {
	        var c = N.Sd(b);c.active = b.enabled;c.type = "variant";c.originalAudioId = b.id;"main" == b.kind ? (c.primary = !0, c.roles = ["main"], c.audioRoles = ["main"]) : c.audioRoles = [];return c;
	      }, Sd: function (b) {
	        return { id: N.Wc(b), active: !1, type: "", bandwidth: 0,
	          language: M(b.language), label: b.label, kind: b.kind, width: null, height: null, frameRate: null, pixelAspectRatio: null, mimeType: null, codecs: null, audioCodec: null, videoCodec: null, primary: !1, roles: [], audioRoles: null, videoId: null, audioId: null, channelsCount: null, audioSamplingRate: null, audioBandwidth: null, videoBandwidth: null, originalVideoId: null, originalAudioId: null, originalTextId: null };
	      }, rb: function (b) {
	        return b.allowedByApplication && b.allowedByKeySystem;
	      }, df: function (b) {
	        return b.filter(function (b) {
	          return N.rb(b);
	        });
	      },
	      Nd: function (b, c) {
	        var d = b.filter(function (b) {
	          return b.audio && b.audio.channelsCount;
	        }),
	            e = new Map();d = r(d);for (var f = d.next(); !f.done; f = d.next()) {
	          f = f.value;var g = f.audio.channelsCount;e.has(g) || e.set(g, []);e.get(g).push(f);
	        }d = Array.from(e.keys());if (0 == d.length) return b;f = d.filter(function (b) {
	          return b <= c;
	        });return f.length ? e.get(Math.max.apply(null, f)) : e.get(Math.min.apply(null, d));
	      }, Jb: function (b, c, d) {
	        var e = b,
	            f = b.filter(function (b) {
	          return b.primary;
	        });f.length && (e = f);var g = e.length ? e[0].language : "";e = e.filter(function (b) {
	          return b.language == g;
	        });if (c) {
	          var h = we(M(c), b.map(function (b) {
	            return b.language;
	          }));h && (e = b.filter(function (b) {
	            return M(b.language) == h;
	          }));
	        }if (d) {
	          if (b = N.Md(e, d), b.length) return b;
	        } else if (b = e.filter(function (b) {
	          return 0 == b.roles.length;
	        }), b.length) return b;b = e.map(function (b) {
	          return b.roles;
	        }).reduce(ud.Gc, []);return b.length ? N.Md(e, b[0]) : e;
	      }, Md: function (b, c) {
	        return b.filter(function (b) {
	          return b.roles.includes(c);
	        });
	      }, Qd: function (b, c, d) {
	        for (var e = 0; e < d.length; e++) if (d[e].audio == b && d[e].video == c) return d[e];return null;
	      }, tf: function (b) {
	        return "audio" == b.type;
	      }, wf: function (b) {
	        return "video" == b.type;
	      }, nf: function (b) {
	        var c = [];b.audio && c.push(b.audio);b.video && c.push(b.video);return c;
	      }, Gg: function (b) {
	        return N.tf(b) ? "type=audio codecs=" + b.codecs + " bandwidth=" + b.bandwidth + " channelsCount=" + b.channelsCount + " audioSamplingRate=" + b.audioSamplingRate : N.wf(b) ? "type=video codecs=" + b.codecs + " bandwidth=" + b.bandwidth + " frameRate=" + b.frameRate + " width=" + b.width + " height=" + b.height : "unexpected stream type";
	      } };function O() {
	      this.h = null;this.f = !1;this.b = new ab();this.c = [];this.i = !1;this.a = this.g = null;
	    }A("shaka.abr.SimpleAbrManager", O);O.prototype.stop = function () {
	      this.h = null;this.f = !1;this.c = [];this.g = null;
	    };O.prototype.stop = O.prototype.stop;O.prototype.init = function (b) {
	      this.h = b;
	    };O.prototype.init = O.prototype.init;
	    O.prototype.chooseVariant = function () {
	      var b = xe(this.a.restrictions, this.c),
	          c = this.b.getBandwidthEstimate(this.a.defaultBandwidthEstimate);this.c.length && !b.length && (b = xe(null, this.c), b = [b[0]]);for (var d = b[0] || null, e = 0; e < b.length; ++e) {
	        var f = b[e],
	            g = (b[e + 1] || { bandwidth: Infinity }).bandwidth / this.a.bandwidthUpgradeTarget;c >= f.bandwidth / this.a.bandwidthDowngradeTarget && c <= g && (d = f);
	      }this.g = Date.now();return d;
	    };O.prototype.chooseVariant = O.prototype.chooseVariant;O.prototype.enable = function () {
	      this.f = !0;
	    };
	    O.prototype.enable = O.prototype.enable;O.prototype.disable = function () {
	      this.f = !1;
	    };O.prototype.disable = O.prototype.disable;O.prototype.segmentDownloaded = function (b, c) {
	      var d = this.b;if (!(16E3 > c)) {
	        var e = 8E3 * c / b,
	            f = b / 1E3;d.a += c;Za(d.b, f, e);Za(d.c, f, e);
	      }if (null != this.g && this.f) a: {
	        if (!this.i) {
	          if (!(128E3 <= this.b.a)) break a;this.i = !0;
	        } else if (Date.now() - this.g < 1E3 * this.a.switchInterval) break a;d = this.chooseVariant();this.b.getBandwidthEstimate(this.a.defaultBandwidthEstimate);this.h(d);
	      }
	    };
	    O.prototype.segmentDownloaded = O.prototype.segmentDownloaded;O.prototype.getBandwidthEstimate = function () {
	      return this.b.getBandwidthEstimate(this.a.defaultBandwidthEstimate);
	    };O.prototype.getBandwidthEstimate = O.prototype.getBandwidthEstimate;O.prototype.setVariants = function (b) {
	      this.c = b;
	    };O.prototype.setVariants = O.prototype.setVariants;O.prototype.configure = function (b) {
	      this.a = b;
	    };O.prototype.configure = O.prototype.configure;
	    function xe(b, c) {
	      b && (c = c.filter(function (c) {
	        return N.bd(c, b, { width: Infinity, height: Infinity });
	      }));return c.sort(function (b, c) {
	        return b.bandwidth - c.bandwidth;
	      });
	    }function ye(b, c) {
	      this.a = b;this.b = c;
	    }ye.prototype.toString = function () {
	      return "v" + this.a + "." + this.b;
	    };function ze(b, c) {
	      var d = new ye(2, 6),
	          e = Ae,
	          f = e.a,
	          g = d.b - f.b;(0 < (d.a - f.a || g) ? e.c : e.b)(e.a, d, b, c);
	    }function Be(b, c, d, e) {
	      cb([d, "has been deprecated and will be removed in", c, ". We are currently at version", b, ". Additional information:", e].join(" "));
	    }function Ce(b, c, d, e) {
	      bb([d, "has been deprecated and has been removed in", c, ". We are now at version", b, ". Additional information:", e].join(""));
	    }var Ae = null;var De = "ended play playing pause pausing ratechange seeked seeking timeupdate volumechange".split(" "),
	        Ee = "buffered currentTime duration ended loop muted paused playbackRate seeking videoHeight videoWidth volume".split(" "),
	        Fe = ["loop", "playbackRate"],
	        Ge = ["pause", "play"],
	        He = "abrstatuschanged adaptation buffering drmsessionupdate emsg error expirationupdated largegap loading manifestparsed onstatechange onstateidle streaming textchanged texttrackvisibility timelineregionadded timelineregionenter timelineregionexit trackschanged unloading variantchanged".split(" "),
	        Ie = { getAssetUri: 2, getAudioLanguages: 2, getAudioLanguagesAndRoles: 2, getBufferedInfo: 2, getConfiguration: 2, getExpiration: 2, getPlaybackRate: 2, getTextLanguages: 2, getTextLanguagesAndRoles: 2, getTextTracks: 2, getStats: 5, getVariantTracks: 2, isAudioOnly: 10, isBuffering: 1, isInProgress: 1, isLive: 10, isTextTrackVisible: 1, keySystem: 10, seekRange: 1, usingEmbeddedTextTrack: 2, getLoadMode: 10 },
	        Je = { getPlayheadTimeAsDate: 1, getPresentationStartTimeAsDate: 20 },
	        Ke = [["getConfiguration", "configure"]],
	        Le = [["isTextTrackVisible", "setTextTrackVisibility"]],
	        Me = "addTextTrack cancelTrickPlay configure resetConfiguration retryStreaming selectAudioLanguage selectEmbeddedTextTrack selectTextLanguage selectTextTrack selectVariantTrack selectVariantsByLabel setTextTrackVisibility trickPlay".split(" "),
	        Ne = ["attach", "detach", "load", "unload"];
	    function Oe(b) {
	      return JSON.stringify(b, function (b, d) {
	        if ("function" != typeof d) {
	          if (d instanceof Event || d instanceof I) {
	            var c = {},
	                f;for (f in d) {
	              var g = d[f];g && "object" == typeof g ? "detail" == f && (c[f] = g) : f in Event || (c[f] = g);
	            }return c;
	          }if (d instanceof TimeRanges) for (c = { __type__: "TimeRanges", length: d.length, start: [], end: [] }, f = 0; f < d.length; ++f) c.start.push(d.start(f)), c.end.push(d.end(f));else c = d instanceof Uint8Array ? { __type__: "Uint8Array", entries: Array.from(d) } : "number" == typeof d ? isNaN(d) ? "NaN" : isFinite(d) ? d : 0 > d ? "-Infinity" : "Infinity" : d;return c;
	        }
	      });
	    }function Pe(b) {
	      return JSON.parse(b, function (b, d) {
	        return "NaN" == d ? NaN : "-Infinity" == d ? -Infinity : "Infinity" == d ? Infinity : d && "object" == typeof d && "TimeRanges" == d.__type__ ? Qe(d) : d && "object" == typeof d && "Uint8Array" == d.__type__ ? new Uint8Array(d.entries) : d;
	      });
	    }function Qe(b) {
	      return { length: b.length, start: function (c) {
	          return b.start[c];
	        }, end: function (c) {
	          return b.end[c];
	        } };
	    }function Re(b, c, d, e, f, g) {
	      this.O = b;this.f = new C(c);this.S = d;this.l = !1;this.F = e;this.K = f;this.B = g;this.b = this.h = !1;this.D = "";this.i = null;this.m = this.ce.bind(this);this.s = this.Ff.bind(this);this.a = { video: {}, player: {} };this.u = 0;this.c = {};this.g = null;Se.add(this);
	    }var Te = !1,
	        Ue = null;q = Re.prototype;q.destroy = function () {
	      Se["delete"](this);Ve(this);Ue && We(this);this.f && (this.f.stop(), this.f = null);this.K = this.F = null;this.b = this.h = !1;this.s = this.m = this.g = this.c = this.a = this.i = null;return Promise.resolve();
	    };
	    q.ga = function () {
	      return this.b;
	    };q.nd = function () {
	      return this.D;
	    };q.init = function () {
	      if (window.chrome && chrome.cast && chrome.cast.isAvailable && this.O.length) {
	        this.h = !0;this.f.yc();var b = new chrome.cast.SessionRequest(this.O);b = new chrome.cast.ApiConfig(b, Xe.bind(this), Ye.bind(this), "origin_scoped");chrome.cast.initialize(b, function () {}, function () {});Te && this.f.R(.02);(b = Ue) && b.status != chrome.cast.SessionStatus.STOPPED ? Ze(this, b) : Ue = null;
	      }
	    };q.ud = function (b) {
	      this.i = b;this.b && $e({ type: "appData", appData: this.i });
	    };
	    q.cast = function (b) {
	      if (!this.h) return Promise.reject(new D(1, 8, 8E3));if (!Te) return Promise.reject(new D(1, 8, 8001));if (this.b) return Promise.reject(new D(1, 8, 8002));this.g = new F();chrome.cast.requestSession(this.kd.bind(this, b), this.be.bind(this));return this.g;
	    };q.Kb = function () {
	      this.b && (Ve(this), Ue && (We(this), Ue.stop(function () {}, function () {}), Ue = null));
	    };
	    q.get = function (b, c) {
	      if ("video" == b) {
	        if (Ge.includes(c)) return this.le.bind(this, b, c);
	      } else if ("player" == b) {
	        if (Je[c] && !this.get("player", "isLive")()) return function () {};if (Me.includes(c)) return this.le.bind(this, b, c);if (Ne.includes(c)) return this.Wf.bind(this, b, c);if (Ie[c]) return this.ie.bind(this, b, c);
	      }return this.ie(b, c);
	    };q.set = function (b, c, d) {
	      this.a[b][c] = d;$e({ type: "set", targetName: b, property: c, value: d });
	    };
	    q.kd = function (b, c) {
	      Ue = c;c.addUpdateListener(this.m);c.addMessageListener("urn:x-cast:com.google.shaka.v2", this.s);this.ce();$e({ type: "init", initState: b, appData: this.i });this.g.resolve();
	    };q.be = function (b) {
	      var c = 8003;switch (b.code) {case "cancel":
	          c = 8004;break;case "timeout":
	          c = 8005;break;case "receiver_unavailable":
	          c = 8006;}this.g.reject(new D(2, 8, c, b));
	    };q.ie = function (b, c) {
	      return this.a[b][c];
	    };
	    q.le = function (b, c, d) {
	      for (var e = [], f = 2; f < arguments.length; ++f) e[f - 2] = arguments[f];$e({ type: "call", targetName: b, methodName: c, args: e });
	    };q.Wf = function (b, c, d) {
	      for (var e = [], f = 2; f < arguments.length; ++f) e[f - 2] = arguments[f];f = new F();var g = this.u.toString();this.u++;this.c[g] = f;$e({ type: "asyncCall", targetName: b, methodName: c, args: e, id: g });return f;
	    };function Xe(b) {
	      for (var c = r(Se), d = c.next(); !d.done; d = c.next()) Ze(d.value, b);
	    }function Ze(b, c) {
	      var d = b.B();b.g = new F();b.l = !0;b.kd(d, c);
	    }
	    function Ye(b) {
	      for (var c = r(Se), d = c.next(); !d.done; d = c.next()) d = d.value, Te = "available" == b, d.f.yc();
	    }function We(b) {
	      var c = Ue;c.removeUpdateListener(b.m);c.removeMessageListener("urn:x-cast:com.google.shaka.v2", b.s);
	    }q.ce = function () {
	      var b = Ue ? "connected" == Ue.status : !1;if (this.b && !b) {
	        this.K();for (var c in this.a) this.a[c] = {};Ve(this);
	      }this.D = (this.b = b) ? Ue.receiver.friendlyName : "";this.f.yc();
	    };function Ve(b) {
	      for (var c in b.c) {
	        var d = b.c[c];delete b.c[c];d.reject(new D(1, 7, 7E3));
	      }
	    }
	    q.Ff = function (b, c) {
	      var d = Pe(c);switch (d.type) {case "event":
	          var e = d.event;this.F(d.targetName, new I(e.type, e));break;case "update":
	          e = d.update;for (var f in e) {
	            d = this.a[f] || {};for (var g in e[f]) d[g] = e[f][g];
	          }this.l && (this.S(), this.l = !1);break;case "asyncComplete":
	          if (f = d.id, d = d.error, g = this.c[f], delete this.c[f], g) if (d) {
	            f = new D(d.severity, d.category, d.code);for (e in d) f[e] = d[e];g.reject(f);
	          } else g.resolve();}
	    };function $e(b) {
	      b = Oe(b);Ue.sendMessage("urn:x-cast:com.google.shaka.v2", b, function () {}, db);
	    }
	    var Se = new Set();window.__onGCastApiAvailable = function (b) {
	      if (b) {
	        b = r(Se);for (var c = b.next(); !c.done; c = b.next()) c.value.init();
	      }
	    };function P(b, c, d) {
	      var e = this;Mb.call(this);this.c = b;this.b = c;this.i = this.g = this.f = this.l = this.h = null;this.s = d;this.m = new Map();this.a = new Re(d, function () {
	        return af(e);
	      }, function () {
	        return bf(e);
	      }, function (b, c) {
	        return cf(e, b, c);
	      }, function () {
	        return df(e);
	      }, function () {
	        return ef(e);
	      });ff(this);
	    }Xa(P, Mb);A("shaka.cast.CastProxy", P);
	    P.prototype.destroy = function (b) {
	      b && this.a.Kb();this.i && (this.i.release(), this.i = null);b = [];this.b && (b.push(this.b.destroy()), this.b = null);this.a && (b.push(this.a.destroy()), this.a = null);this.l = this.h = this.c = null;return Promise.all(b);
	    };P.prototype.destroy = P.prototype.destroy;P.prototype.pf = function () {
	      return this.h;
	    };P.prototype.getVideo = P.prototype.pf;P.prototype.ff = function () {
	      return this.l;
	    };P.prototype.getPlayer = P.prototype.ff;P.prototype.Ee = function () {
	      return this.a.h && Te;
	    };P.prototype.canCast = P.prototype.Ee;
	    P.prototype.ga = function () {
	      return this.a.ga();
	    };P.prototype.isCasting = P.prototype.ga;P.prototype.nd = function () {
	      return this.a.nd();
	    };P.prototype.receiverName = P.prototype.nd;P.prototype.cast = function () {
	      var b = ef(this);return this.a.cast(b).then(function () {
	        if (this.b) return this.b.Cd();
	      }.bind(this));
	    };P.prototype.cast = P.prototype.cast;P.prototype.ud = function (b) {
	      this.a.ud(b);
	    };P.prototype.setAppData = P.prototype.ud;
	    P.prototype.sg = function () {
	      var b = this.a;if (b.b) {
	        var c = b.B();chrome.cast.requestSession(b.kd.bind(b, c), b.be.bind(b));
	      }
	    };P.prototype.suggestDisconnect = P.prototype.sg;
	    P.prototype.He = function (b) {
	      var c = this;return t(function e() {
	        return z(e, function (e) {
	          switch (e.j) {case 1:
	              if (b == c.s) return e["return"]();c.s = b;c.a.Kb();return u(e, c.a.destroy(), 2);case 2:
	              c.a = null, c.a = new Re(b, function () {
	                return af(c);
	              }, function () {
	                return bf(c);
	              }, function (b, e) {
	                return cf(c, b, e);
	              }, function () {
	                return df(c);
	              }, function () {
	                return ef(c);
	              }), c.a.init(), w(e);}
	        });
	      });
	    };P.prototype.changeReceiverId = P.prototype.He;P.prototype.Kb = function () {
	      this.a.Kb();
	    };P.prototype.forceDisconnect = P.prototype.Kb;
	    function ff(b) {
	      b.a.init();b.i = new K();De.forEach(function (b) {
	        this.i.w(this.c, b, this.D.bind(this));
	      }.bind(b));He.forEach(function (b) {
	        this.i.w(this.b, b, this.u.bind(this));
	      }.bind(b));b.h = {};for (var c in b.c) Object.defineProperty(b.h, c, { configurable: !1, enumerable: !0, get: b.B.bind(b, c), set: b.F.bind(b, c) });b.l = {};gf(b, function (c) {
	        Object.defineProperty(b.l, c, { configurable: !1, enumerable: !0, get: function () {
	            return hf(b, c);
	          } });
	      });jf(b);b.f = new Mb();b.f.$b = b.h;b.g = new Mb();b.g.$b = b.l;
	    }
	    function jf(b) {
	      var c = new Map();gf(b, function (d, e) {
	        if (c.has(e)) {
	          var f = c.get(e);d.length < f.length ? b.m.set(d, f) : b.m.set(f, d);
	        } else c.set(e, d);
	      });
	    }
	    function gf(b, c) {
	      function d(b) {
	        return "constructor" == b || "function" != typeof e[b] ? !1 : !f.has(b);
	      }var e = b.b,
	          f = new Set();for (g in e) d(g) && (f.add(g), c(g, e[g]));var g = Object.getPrototypeOf(e);for (var h = Object.getPrototypeOf({}); g && g != h;) {
	        for (var k = r(Object.getOwnPropertyNames(g)), l = k.next(); !l.done; l = k.next()) l = l.value, d(l) && (f.add(l), c(l, e[l]));g = Object.getPrototypeOf(g);
	      }
	    }
	    function ef(b) {
	      var c = { video: {}, player: {}, playerAfterLoad: {}, manifest: b.b.hc(), startTime: null };b.c.pause();Fe.forEach(function (b) {
	        c.video[b] = this.c[b];
	      }.bind(b));b.c.ended || (c.startTime = b.c.currentTime);Ke.forEach(function (b) {
	        var d = b[1];b = this.b[b[0]]();c.player[d] = b;
	      }.bind(b));Le.forEach(function (b) {
	        var d = b[1];b = this.b[b[0]]();c.playerAfterLoad[d] = b;
	      }.bind(b));return c;
	    }function af(b) {
	      b.dispatchEvent(new I("caststatuschanged"));
	    }function bf(b) {
	      b.f.dispatchEvent(new I(b.h.paused ? "pause" : "play"));
	    }
	    function df(b) {
	      Ke.forEach(function (b) {
	        var c = b[1];b = this.a.get("player", b[0])();this.b[c](b);
	      }.bind(b));var c = b.a.get("player", "getAssetUri")(),
	          d = b.a.get("video", "ended"),
	          e = Promise.resolve(),
	          f = b.c.autoplay,
	          g = null;d || (g = b.a.get("video", "currentTime"));c && (b.c.autoplay = !1, e = b.b.load(c, g));var h = {};Fe.forEach(function (b) {
	        h[b] = this.a.get("video", b);
	      }.bind(b));e.then(function () {
	        b.c && (Fe.forEach(function (b) {
	          this.c[b] = h[b];
	        }.bind(b)), Le.forEach(function (b) {
	          var c = b[1];b = this.a.get("player", b[0])();this.b[c](b);
	        }.bind(b)), b.c.autoplay = f, c && b.c.play());
	      }, function (c) {
	        b.b.dispatchEvent(new I("error", { detail: c }));
	      });
	    }P.prototype.B = function (b) {
	      if ("addEventListener" == b) return this.f.addEventListener.bind(this.f);if ("removeEventListener" == b) return this.f.removeEventListener.bind(this.f);if (this.a.ga() && 0 == Object.keys(this.a.a.video).length) {
	        var c = this.c[b];if ("function" != typeof c) return c;
	      }return this.a.ga() ? this.a.get("video", b) : (b = this.c[b], "function" == typeof b && (b = b.bind(this.c)), b);
	    };
	    P.prototype.F = function (b, c) {
	      this.a.ga() ? this.a.set("video", b, c) : this.c[b] = c;
	    };P.prototype.D = function (b) {
	      this.a.ga() || this.f.dispatchEvent(new I(b.type, b));
	    };
	    function hf(b, c) {
	      b.m.has(c) && (c = b.m.get(c));if ("addEventListener" == c) return b.g.addEventListener.bind(b.g);if ("removeEventListener" == c) return b.g.removeEventListener.bind(b.g);if ("getMediaElement" == c) return function () {
	        return this.h;
	      }.bind(b);if ("getSharedConfiguration" == c) return b.a.get("player", "getConfiguration");if ("getNetworkingEngine" == c) return b.b.Mb.bind(b.b);if (b.a.ga()) {
	        if ("getManifest" == c || "drmInfo" == c) return function () {
	          cb(c + "() does not work while casting!");return null;
	        };if ("getManifestUri" == c) return ze("getManifestUri", 'Please use "getAssetUri" instead.'), hf(b, "getAssetUri");if ("attach" == c || "detach" == c) return function () {
	          cb(c + "() does not work while casting!");return Promise.resolve();
	        };
	      }return b.a.ga() && 0 == Object.keys(b.a.a.video).length && Ie[c] || !b.a.ga() ? b.b[c].bind(b.b) : b.a.get("player", c);
	    }P.prototype.u = function (b) {
	      this.a.ga() || this.g.dispatchEvent(b);
	    };function cf(b, c, d) {
	      b.a.ga() && ("video" == c ? b.f.dispatchEvent(d) : "player" == c && b.g.dispatchEvent(d));
	    }function kf(b, c, d, e) {
	      var f = this;Mb.call(this);this.a = b;this.b = c;this.c = new K();this.D = { video: b, player: c };this.s = d || function () {};this.F = e || function (b) {
	        return b;
	      };this.u = !1;this.h = !0;this.g = 0;this.m = !1;this.l = !0;this.i = this.f = null;this.B = new C(function () {
	        lf(f);
	      });mf(this);
	    }Xa(kf, Mb);A("shaka.cast.CastReceiver", kf);kf.prototype.isConnected = function () {
	      return this.u;
	    };kf.prototype.isConnected = kf.prototype.isConnected;kf.prototype.vf = function () {
	      return this.h;
	    };kf.prototype.isIdle = kf.prototype.vf;
	    kf.prototype.destroy = function () {
	      var b = this;return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.c && (b.c.release(), b.c = null), e = [], b.b && (e.push(b.b.destroy()), b.b = null), b.B && (b.B.stop(), b.B = null), b.a = null, b.D = null, b.s = null, b.u = !1, b.h = !0, b.f = null, b.i = null, u(d, Promise.all(e), 2);case 2:
	              f = cast.receiver.CastReceiverManager.getInstance(), f.stop(), w(d);}
	        });
	      });
	    };kf.prototype.destroy = kf.prototype.destroy;
	    function mf(b) {
	      var c = cast.receiver.CastReceiverManager.getInstance();c.onSenderConnected = b.ee.bind(b);c.onSenderDisconnected = b.ee.bind(b);c.onSystemVolumeChanged = b.Oe.bind(b);b.i = c.getCastMessageBus("urn:x-cast:com.google.cast.media");b.i.onMessage = b.Af.bind(b);b.f = c.getCastMessageBus("urn:x-cast:com.google.shaka.v2");b.f.onMessage = b.Kf.bind(b);c.start();De.forEach(function (b) {
	        this.c.w(this.a, b, this.je.bind(this, "video"));
	      }.bind(b));He.forEach(function (b) {
	        this.c.w(this.b, b, this.je.bind(this, "player"));
	      }.bind(b));
	      cast.__platform__ && cast.__platform__.canDisplayType('video/mp4; codecs="avc1.640028"; width=3840; height=2160') ? b.b.vd(3840, 2160) : b.b.vd(1920, 1080);b.c.w(b.a, "loadeddata", function () {
	        this.m = !0;
	      }.bind(b));b.c.w(b.b, "loading", function () {
	        this.h = !1;nf(this);
	      }.bind(b));b.c.w(b.a, "playing", function () {
	        this.h = !1;nf(this);
	      }.bind(b));b.c.w(b.a, "pause", function () {
	        nf(this);
	      }.bind(b));b.c.w(b.b, "unloading", function () {
	        this.h = !0;nf(this);
	      }.bind(b));b.c.w(b.a, "ended", function () {
	        var b = this;new C(function () {
	          b.a && b.a.ended && (b.h = !0, nf(b));
	        }).R(5);
	      }.bind(b));
	    }q = kf.prototype;q.ee = function () {
	      this.g = 0;this.l = !0;this.u = 0 != cast.receiver.CastReceiverManager.getInstance().getSenders().length;nf(this);
	    };function nf(b) {
	      Promise.resolve().then(function () {
	        this.b && (this.dispatchEvent(new I("caststatuschanged")), of(this) || pf(this, 0));
	      }.bind(b));
	    }
	    function qf(b, c, d) {
	      for (var e in c.player) b.b[e](c.player[e]);b.s(d);d = Promise.resolve();var f = b.a.autoplay;c.manifest && (b.a.autoplay = !1, d = b.b.load(c.manifest, c.startTime));d.then(function () {
	        if (b.b) {
	          for (var d in c.video) b.a[d] = c.video[d];for (var e in c.playerAfterLoad) b.b[e](c.playerAfterLoad[e]);b.a.autoplay = f;c.manifest && (b.a.play(), pf(b, 0));
	        }
	      }, function (c) {
	        b.b.dispatchEvent(new I("error", { detail: c }));
	      });
	    }q.je = function (b, c) {
	      this.b && (lf(this), rf(this, { type: "event", targetName: b, event: c }, this.f));
	    };
	    function lf(b) {
	      b.B.R(.5);var c = { video: {}, player: {} };Ee.forEach(function (b) {
	        c.video[b] = this.a[b];
	      }.bind(b));if (b.b.V()) for (var d in Je) 0 == b.g % Je[d] && (c.player[d] = b.b[d]());for (var e in Ie) 0 == b.g % Ie[e] && (c.player[e] = b.b[e]());if (d = cast.receiver.CastReceiverManager.getInstance().getSystemVolume()) c.video.volume = d.level, c.video.muted = d.muted;b.m && (b.g += 1);rf(b, { type: "update", update: c }, b.f);of(b);
	    }function of(b) {
	      return b.l && (b.a.duration || b.b.V()) ? (sf(b), b.l = !1, !0) : !1;
	    }
	    function sf(b) {
	      var c = { contentId: b.b.hc(), streamType: b.b.V() ? "LIVE" : "BUFFERED", duration: b.a.duration, contentType: "" };pf(b, 0, c);
	    }q.Oe = function () {
	      var b = cast.receiver.CastReceiverManager.getInstance().getSystemVolume();b && rf(this, { type: "update", update: { video: { volume: b.level, muted: b.muted } } }, this.f);rf(this, { type: "event", targetName: "video", event: { type: "volumechange" } }, this.f);
	    };
	    q.Kf = function (b) {
	      var c = Pe(b.data);switch (c.type) {case "init":
	          this.g = 0;this.m = !1;this.l = !0;qf(this, c.initState, c.appData);lf(this);break;case "appData":
	          this.s(c.appData);break;case "set":
	          var d = c.targetName,
	              e = c.property;c = c.value;if ("video" == d) {
	            var f = cast.receiver.CastReceiverManager.getInstance();if ("volume" == e) {
	              f.setSystemVolumeLevel(c);break;
	            } else if ("muted" == e) {
	              f.setSystemVolumeMuted(c);break;
	            }
	          }this.D[d][e] = c;break;case "call":
	          d = this.D[c.targetName];d[c.methodName].apply(d, c.args);break;case "asyncCall":
	          d = c.targetName;e = c.methodName;"player" == d && "load" == e && (this.g = 0, this.m = !1);f = c.id;b = b.senderId;var g = this.D[d];c = g[e].apply(g, c.args);"player" == d && "load" == e && (c = c.then(function () {
	            this.l = !0;
	          }.bind(this)));c.then(this.oe.bind(this, b, f, null), this.oe.bind(this, b, f));}
	    };
	    q.Af = function (b) {
	      var c = Pe(b.data);switch (c.type) {case "PLAY":
	          this.a.play();pf(this, 0);break;case "PAUSE":
	          this.a.pause();pf(this, 0);break;case "SEEK":
	          b = c.currentTime;var d = c.resumeState;null != b && (this.a.currentTime = Number(b));d && "PLAYBACK_START" == d ? (this.a.play(), pf(this, 0)) : d && "PLAYBACK_PAUSE" == d && (this.a.pause(), pf(this, 0));break;case "STOP":
	          this.b.Cd().then(function () {
	            this.b && pf(this, 0);
	          }.bind(this));break;case "GET_STATUS":
	          pf(this, Number(c.requestId));break;case "VOLUME":
	          d = c.volume;b = d.level;d = d.muted;var e = this.a.volume,
	              f = this.a.muted;null != b && (this.a.volume = Number(b));null != d && (this.a.muted = d);e == this.a.volume && f == this.a.muted || pf(this, 0);break;case "LOAD":
	          this.g = 0;this.l = this.m = !1;b = c.media;d = c.currentTime;e = this.F(b.contentId);f = c.autoplay || !0;this.s(b.customData);f && (this.a.autoplay = !0);this.b.load(e, d).then(function () {
	            this.b && sf(this);
	          }.bind(this))["catch"](function (b) {
	            var d = "LOAD_FAILED";7 == b.category && 7E3 == b.code && (d = "LOAD_CANCELLED");rf(this, { requestId: Number(c.requestId), type: d }, this.i);
	          }.bind(this));break;default:
	          rf(this, { requestId: Number(c.requestId), type: "INVALID_REQUEST", reason: "INVALID_COMMAND" }, this.i);}
	    };q.oe = function (b, c, d) {
	      this.b && rf(this, { type: "asyncComplete", id: c, error: d }, this.f, b);
	    };function rf(b, c, d, e) {
	      b.u && (b = Oe(c), e ? d.getCastChannel(e).send(b) : d.broadcast(b));
	    }
	    function pf(b, c, d) {
	      var e = b.a.playbackRate;var f = tf;f = b.h ? f.IDLE : b.b.Xc() ? f.we : b.a.paused ? f.ye : f.ze;e = { mediaSessionId: 0, playbackRate: e, playerState: f, currentTime: b.a.currentTime, supportedMediaCommands: 15, volume: { level: b.a.volume, muted: b.a.muted } };d && (e.media = d);rf(b, { requestId: c, type: "MEDIA_STATUS", status: [e] }, b.i);
	    }var tf = { IDLE: "IDLE", ze: "PLAYING", we: "BUFFERING", ye: "PAUSED" };function Q(b, c) {
	      this.J = b;this.b = c == uf;this.a = 0;
	    }A("shaka.util.DataViewReader", Q);var uf = 1;Q.Endianness = { Bg: 0, Dg: uf };Q.prototype.ua = function () {
	      return this.a < this.J.byteLength;
	    };Q.prototype.hasMoreData = Q.prototype.ua;Q.prototype.ca = function () {
	      return this.a;
	    };Q.prototype.getPosition = Q.prototype.ca;Q.prototype.Ve = function () {
	      return this.J.byteLength;
	    };Q.prototype.getLength = Q.prototype.Ve;Q.prototype.la = function () {
	      try {
	        var b = this.J.getUint8(this.a);this.a += 1;return b;
	      } catch (c) {
	        vf();
	      }
	    };Q.prototype.readUint8 = Q.prototype.la;
	    Q.prototype.Tb = function () {
	      try {
	        var b = this.J.getUint16(this.a, this.b);this.a += 2;return b;
	      } catch (c) {
	        vf();
	      }
	    };Q.prototype.readUint16 = Q.prototype.Tb;Q.prototype.G = function () {
	      try {
	        var b = this.J.getUint32(this.a, this.b);this.a += 4;return b;
	      } catch (c) {
	        vf();
	      }
	    };Q.prototype.readUint32 = Q.prototype.G;Q.prototype.ke = function () {
	      try {
	        var b = this.J.getInt32(this.a, this.b);this.a += 4;return b;
	      } catch (c) {
	        vf();
	      }
	    };Q.prototype.readInt32 = Q.prototype.ke;
	    Q.prototype.Bb = function () {
	      try {
	        if (this.b) {
	          var b = this.J.getUint32(this.a, !0);var c = this.J.getUint32(this.a + 4, !0);
	        } else c = this.J.getUint32(this.a, !1), b = this.J.getUint32(this.a + 4, !1);
	      } catch (d) {
	        vf();
	      }if (2097151 < c) throw new D(2, 3, 3001);this.a += 8;return c * Math.pow(2, 32) + b;
	    };Q.prototype.readUint64 = Q.prototype.Bb;Q.prototype.Za = function (b) {
	      this.a + b > this.J.byteLength && vf();var c = new Uint8Array(this.J.buffer, this.J.byteOffset + this.a, b);this.a += b;return c;
	    };Q.prototype.readBytes = Q.prototype.Za;
	    Q.prototype.M = function (b) {
	      this.a + b > this.J.byteLength && vf();this.a += b;
	    };Q.prototype.skip = Q.prototype.M;Q.prototype.me = function (b) {
	      this.a < b && vf();this.a -= b;
	    };Q.prototype.rewind = Q.prototype.me;Q.prototype.seek = function (b) {
	      (0 > b || b > this.J.byteLength) && vf();this.a = b;
	    };Q.prototype.seek = Q.prototype.seek;Q.prototype.md = function () {
	      for (var b = this.a; this.ua() && 0 != this.J.getUint8(this.a);) this.a += 1;b = new Uint8Array(this.J.buffer, this.J.byteOffset + b, this.a - b);this.a += 1;return Bc(b);
	    };
	    Q.prototype.readTerminatedString = Q.prototype.md;function vf() {
	      throw new D(2, 3, 3E3);
	    }function R() {
	      this.c = [];this.b = [];this.a = !1;
	    }A("shaka.util.Mp4Parser", R);R.prototype.H = function (b, c) {
	      var d = wf(b);this.c[d] = 0;this.b[d] = c;return this;
	    };R.prototype.box = R.prototype.H;R.prototype.fa = function (b, c) {
	      var d = wf(b);this.c[d] = 1;this.b[d] = c;return this;
	    };R.prototype.fullBox = R.prototype.fa;R.prototype.stop = function () {
	      this.a = !0;
	    };R.prototype.stop = R.prototype.stop;
	    R.prototype.parse = function (b, c) {
	      var d = new Uint8Array(b);d = new Q(new DataView(d.buffer, d.byteOffset, d.byteLength), 0);for (this.a = !1; d.ua() && !this.a;) this.sc(0, d, c);
	    };R.prototype.parse = R.prototype.parse;
	    R.prototype.sc = function (b, c, d) {
	      var e = c.ca(),
	          f = c.G(),
	          g = c.G();switch (f) {case 0:
	          f = c.J.byteLength - e;break;case 1:
	          f = c.Bb();}var h = this.b[g];if (h) {
	        var k = null,
	            l = null;1 == this.c[g] && (l = c.G(), k = l >>> 24, l &= 16777215);g = e + f;d && g > c.J.byteLength && (g = c.J.byteLength);g -= c.ca();c = 0 < g ? c.Za(g) : new Uint8Array(0);c = new Q(new DataView(c.buffer, c.byteOffset, c.byteLength), 0);h({ parser: this, partialOkay: d || !1, version: k, flags: l, reader: c, size: f, start: e + b });
	      } else c.M(Math.min(e + f - c.ca(), c.J.byteLength - c.ca()));
	    };
	    R.prototype.parseNext = R.prototype.sc;function xf(b) {
	      for (var c = null != b.flags ? 12 : 8; b.reader.ua() && !b.parser.a;) b.parser.sc(b.start + c, b.reader, b.partialOkay);
	    }R.children = xf;function yf(b) {
	      for (var c = null != b.flags ? 12 : 8, d = b.reader.G(); 0 < d && !b.parser.a; --d) b.parser.sc(b.start + c, b.reader, b.partialOkay);
	    }R.sampleDescription = yf;function zf(b) {
	      return function (c) {
	        b(c.reader.Za(c.reader.J.byteLength - c.reader.ca()));
	      };
	    }R.allData = zf;function wf(b) {
	      for (var c = 0, d = 0; d < b.length; d++) c = c << 8 | b.charCodeAt(d);return c;
	    }
	    function Af(b) {
	      return String.fromCharCode(b >> 24 & 255, b >> 16 & 255, b >> 8 & 255, b & 255);
	    }R.typeToString = Af;function Bf(b) {
	      var c = this;this.a = [];this.b = [];this.data = [];new R().H("moov", xf).fa("pssh", function (b) {
	        if (!(1 < b.version)) {
	          var d = b.reader.J;d = new Uint8Array(d.buffer, d.byteOffset - 12, b.size);c.data.push(d);c.a.push(L.Ac(b.reader.Za(16)));if (0 < b.version) {
	            d = b.reader.G();for (var f = 0; f < d; ++f) {
	              var g = L.Ac(b.reader.Za(16));c.b.push(g);
	            }
	          }
	        }
	      }).parse(b);
	    }
	    function Cf(b) {
	      if (!b) return b;var c = new Bf(b);if (1 >= c.data.length) return b;b = [];var d = {};c = r(c.data);for (var e = c.next(); !e.done; d = { lc: d.lc }, e = c.next()) d.lc = e.value, b.some(function (b) {
	        return function (c) {
	          return L.za(c, b.lc);
	        };
	      }(d)) || b.push(d.lc);return L.concat.apply(L, b instanceof Array ? b : Oa(r(b)));
	    }var S = { gc: function (b, c) {
	        var d = S.P(b, c);return 1 != d.length ? null : d[0];
	      }, Oc: function (b, c, d) {
	        b = S.Od(b, c, d);return 1 != b.length ? null : b[0];
	      }, P: function (b, c) {
	        return Array.prototype.filter.call(b.childNodes, function (b) {
	          return b instanceof Element && b.tagName == c;
	        });
	      }, Od: function (b, c, d) {
	        return Array.prototype.filter.call(b.childNodes, function (b) {
	          return b instanceof Element && b.localName == d && b.namespaceURI == c;
	        });
	      }, getAttributeNS: function (b, c, d) {
	        return b.hasAttributeNS(c, d) ? b.getAttributeNS(c, d) : null;
	      }, ic: function (b) {
	        return Array.prototype.every.call(b.childNodes, function (b) {
	          return b.nodeType == Node.TEXT_NODE || b.nodeType == Node.CDATA_SECTION_NODE;
	        }) ? b.textContent.trim() : null;
	      }, I: function (b, c, d, e) {
	        e = void 0 === e ? null : e;var f = null;b = b.getAttribute(c);null != b && (f = d(b));return null == f ? e : f;
	      }, Of: function (b) {
	        if (!b) return null;/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(b) && (b += "Z");b = Date.parse(b);return isNaN(b) ? null : Math.floor(b / 1E3);
	      }, Ea: function (b) {
	        if (!b) return null;b = /^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$/.exec(b);
	        if (!b) return null;b = 31536E3 * Number(b[1] || null) + 2592E3 * Number(b[2] || null) + 86400 * Number(b[3] || null) + 3600 * Number(b[4] || null) + 60 * Number(b[5] || null) + Number(b[6] || null);return isFinite(b) ? b : null;
	      }, uc: function (b) {
	        var c = /([0-9]+)-([0-9]+)/.exec(b);if (!c) return null;b = Number(c[1]);if (!isFinite(b)) return null;c = Number(c[2]);return isFinite(c) ? { start: b, end: c } : null;
	      }, parseInt: function (b) {
	        b = Number(b);return 0 === b % 1 ? b : null;
	      }, tc: function (b) {
	        b = Number(b);return 0 === b % 1 && 0 < b ? b : null;
	      }, yb: function (b) {
	        b = Number(b);return 0 === b % 1 && 0 <= b ? b : null;
	      }, parseFloat: function (b) {
	        b = Number(b);return isNaN(b) ? null : b;
	      }, Me: function (b) {
	        var c;b = (c = b.match(/^(\d+)\/(\d+)$/)) ? Number(c[1]) / Number(c[2]) : Number(b);return isNaN(b) ? null : b;
	      }, he: function (b, c) {
	        var d = new DOMParser();try {
	          var e = d.parseFromString(b, "text/xml");
	        } catch (g) {}if (e && e.documentElement.tagName == c) var f = e.documentElement;return f && 0 < f.getElementsByTagName("parsererror").length ? null : f;
	      }, ge: function (b, c) {
	        try {
	          var d = Bc(b);return S.he(d, c);
	        } catch (e) {}
	      } };var Df = new Map().set("urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b", "org.w3.clearkey").set("urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed", "com.widevine.alpha").set("urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95", "com.microsoft.playready").set("urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb", "com.adobe.primetime");
	    function Ef(b, c, d) {
	      var e = Ff(b),
	          f = null;b = [];var g = [],
	          h = new Set(e.map(function (b) {
	        return b.keyId;
	      }));h["delete"](null);if (1 < h.size) throw new D(2, 4, 4010);d || (g = e.filter(function (b) {
	        return "urn:mpeg:dash:mp4protection:2011" == b.ne ? (f = b.init || f, !1) : !0;
	      }), g.length && (b = Gf(f, c, g), 0 == b.length && (b = [wd("", f)])));if (e.length && (d || !g.length)) for (b = [], c = r(Df.values()), d = c.next(); !d.done; d = c.next()) d = d.value, "org.w3.clearkey" != d && b.push(wd(d, f));if (h = Array.from(h)[0] || null) for (c = r(b), d = c.next(); !d.done; d = c.next()) for (d = r(d.value.initData), e = d.next(); !e.done; e = d.next()) e.value.keyId = h;return { Kd: h, Fg: f, drmInfos: b, Pd: !0 };
	    }function Hf(b, c, d, e) {
	      var f = Ef(b, c, e);if (d.Pd) {
	        b = 1 == d.drmInfos.length && !d.drmInfos[0].keySystem;c = 0 == f.drmInfos.length;if (0 == d.drmInfos.length || b && !c) d.drmInfos = f.drmInfos;d.Pd = !1;
	      } else if (0 < f.drmInfos.length && (d.drmInfos = d.drmInfos.filter(function (b) {
	        return f.drmInfos.some(function (c) {
	          return c.keySystem == b.keySystem;
	        });
	      }), 0 == d.drmInfos.length)) throw new D(2, 4, 4008);return f.Kd || d.Kd;
	    }
	    function If(b) {
	      var c = 0,
	          d = new DataView(b).getUint32(c, !0);if (d !== b.byteLength) return [];c += 6;d = [];for (var e = new DataView(b); c < b.byteLength - 1;) {
	        var f = e.getUint16(c, !0);c += 2;var g = e.getUint16(c, !0);c += 2;var h = new Uint8Array(b, c, g);d.push({ type: f, value: h });c += g;
	      }return d;
	    }function Jf(b) {
	      return (b = b.querySelector("DATA > LA_URL")) ? b.textContent : "";
	    }
	    function Gf(b, c, d) {
	      var e = [];d = r(d);for (var f = d.next(); !f.done; f = d.next()) {
	        f = f.value;var g = Df.get(f.ne);if (g) {
	          var h;if (h = S.Oc(f.node, "urn:microsoft:playready", "pro")) {
	            h = L.Ba(h.textContent);var k = new Uint8Array([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149]),
	                l = h.length,
	                m = k.length + 16 + l,
	                n = new ArrayBuffer(m),
	                p = new Uint8Array(n);n = new DataView(n);var v = 0;n.setUint32(v, m);v += 4;n.setUint32(v, 1886614376);v += 4;n.setUint32(v, 0);v += 4;p.set(k, v);v += k.length;n.setUint32(v, l);v += 4;p.set(h, v);h = [{ initData: p,
	              initDataType: "cenc", keyId: f.keyId }];
	          } else h = null;h = wd(g, f.init || b || h);if (g = Kf.get(g)) h.licenseServerUri = g(f);e.push(h);
	        } else for (f = c(f.node) || [], f = r(f), g = f.next(); !g.done; g = f.next()) e.push(g.value);
	      }return e;
	    }
	    var Kf = new Map().set("com.widevine.alpha", function (b) {
	      return (b = S.Oc(b.node, "urn:microsoft", "laurl")) ? b.getAttribute("licenseUrl") || "" : "";
	    }).set("com.microsoft.playready", function (b) {
	      b = S.Oc(b.node, "urn:microsoft:playready", "pro");if (!b) return "";b = L.Ba(b.textContent);b = If(b.buffer).filter(function (b) {
	        return 1 === b.type;
	      })[0];if (!b) return "";b = hc(b.value, !0);return (b = S.he(b, "WRMHEADER")) ? Jf(b) : "";
	    });function Ff(b) {
	      var c = [];b = r(b);for (var d = b.next(); !d.done; d = b.next()) (d = Lf(d.value)) && c.push(d);return c;
	    }
	    function Lf(b) {
	      var c = b.getAttribute("schemeIdUri"),
	          d = S.getAttributeNS(b, "urn:mpeg:cenc:2013", "default_KID"),
	          e = S.Od(b, "urn:mpeg:cenc:2013", "pssh").map(S.ic);if (!c) return null;c = c.toLowerCase();if (d && (d = d.replace(/-/g, "").toLowerCase(), d.includes(" "))) throw new D(2, 4, 4009);var f = [];try {
	        f = e.map(function (b) {
	          return { initDataType: "cenc", initData: L.Ba(b), keyId: null };
	        });
	      } catch (g) {
	        throw new D(2, 4, 4007);
	      }return { node: b, ne: c, keyId: d, init: 0 < f.length ? f : null };
	    }function Mf(b, c, d, e, f) {
	      var g = { RepresentationID: c, Number: d, Bandwidth: e, Time: f };return b.replace(/\$(RepresentationID|Number|Bandwidth|Time)?(?:%0([0-9]+)([diouxX]))?\$/g, function (b, c, d, e) {
	        if ("$$" == b) return "$";var f = g[c];if (null == f) return b;"RepresentationID" == c && d && (d = void 0);"Time" == c && (f = Math.round(f));switch (e) {case void 0:case "d":case "i":case "u":
	            b = f.toString();break;case "o":
	            b = f.toString(8);break;case "x":
	            b = f.toString(16);break;case "X":
	            b = f.toString(16).toUpperCase();break;default:
	            b = f.toString();}d = window.parseInt(d, 10) || 1;return Array(Math.max(0, d - b.length) + 1).join("0") + b;
	      });
	    }
	    function Nf(b, c) {
	      var d = Of(b, c, "timescale"),
	          e = 1;d && (e = S.tc(d) || 1);d = Of(b, c, "duration");(d = S.tc(d || "")) && (d /= e);var f = Of(b, c, "startNumber"),
	          g = Number(Of(b, c, "presentationTimeOffset")) || 0,
	          h = S.yb(f || "");if (null == f || null == h) h = 1;var k = Pf(b, c, "SegmentTimeline");f = null;if (k) {
	        f = e;var l = b.T.duration || Infinity;k = S.P(k, "S");for (var m = [], n = 0, p = 0; p < k.length; ++p) {
	          var v = k[p],
	              x = S.I(v, "t", S.yb),
	              B = S.I(v, "d", S.yb);v = S.I(v, "r", S.parseInt);null != x && (x -= g);if (!B) break;x = null != x ? x : n;v = v || 0;if (0 > v) if (p + 1 < k.length) {
	            v = S.I(k[p + 1], "t", S.yb);if (null == v) break;else if (x >= v) break;v = Math.ceil((v - x) / B) - 1;
	          } else {
	            if (Infinity == l) break;else if (x / f >= l) break;v = Math.ceil((l * f - x) / B) - 1;
	          }0 < m.length && x != n && (m[m.length - 1].end = x / f);for (var y = 0; y <= v; ++y) n = x + B, m.push({ start: x / f, end: n / f, xg: x }), x = n;
	        }f = m;
	      }return { timescale: e, Z: d, ab: h, ma: g / e || 0, Dd: g, N: f };
	    }function Of(b, c, d) {
	      return [c(b.C), c(b.aa), c(b.ka)].filter(ud.Ia).map(function (b) {
	        return b.getAttribute(d);
	      }).reduce(function (b, c) {
	        return b || c;
	      });
	    }
	    function Pf(b, c, d) {
	      return [c(b.C), c(b.aa), c(b.ka)].filter(ud.Ia).map(function (b) {
	        return S.gc(b, d);
	      }).reduce(function (b, c) {
	        return b || c;
	      });
	    }
	    function Qf(b, c, d, e, f, g) {
	      for (var h = S.getAttributeNS(b, "http://www.w3.org/1999/xlink", "href"), k = S.getAttributeNS(b, "http://www.w3.org/1999/xlink", "actuate") || "onRequest", l = 0; l < b.attributes.length; l++) {
	        var m = b.attributes[l];"http://www.w3.org/1999/xlink" == m.namespaceURI && (b.removeAttributeNS(m.namespaceURI, m.localName), --l);
	      }if (5 <= g) return Db(new D(2, 4, 4028));if ("onLoad" != k) return Db(new D(2, 4, 4027));var n = vd([e], [h]);return f.request(0, Wb(n, c)).U(function (e) {
	        e = S.ge(e.data, b.tagName);if (!e) return Db(new D(2, 4, 4001, h));for (; b.childNodes.length;) b.removeChild(b.childNodes[0]);for (; e.childNodes.length;) {
	          var k = e.childNodes[0];e.removeChild(k);b.appendChild(k);
	        }for (k = 0; k < e.attributes.length; k++) {
	          var l = e.attributes[k].nodeName,
	              m = e.getAttribute(l);b.setAttribute(l, m);
	        }return Rf(b, c, d, n[0], f, g + 1);
	      });
	    }
	    function Rf(b, c, d, e, f, g) {
	      g = void 0 === g ? 0 : g;if (S.getAttributeNS(b, "http://www.w3.org/1999/xlink", "href")) {
	        var h = Qf(b, c, d, e, f, g);d && (h = h.U(void 0, function () {
	          return Rf(b, c, d, e, f, g);
	        }));return h;
	      }h = [];for (var k = 0; k < b.childNodes.length; k++) {
	        var l = b.childNodes[k];l instanceof Element && ("urn:mpeg:dash:resolve-to-zero:2013" == S.getAttributeNS(l, "http://www.w3.org/1999/xlink", "href") ? (b.removeChild(l), --k) : "SegmentTimeline" != l.tagName && h.push(Rf(l, c, d, e, f, g)));
	      }return Jb(h).U(function () {
	        return b;
	      });
	    }function Sf(b, c, d) {
	      this.c = b;this.b = c;this.a = d;
	    }A("shaka.media.InitSegmentReference", Sf);Sf.prototype.Ic = function () {
	      return this.c();
	    };Sf.prototype.createUris = Sf.prototype.Ic;Sf.prototype.Uc = function () {
	      return this.b;
	    };Sf.prototype.getStartByte = Sf.prototype.Uc;Sf.prototype.Tc = function () {
	      return this.a;
	    };Sf.prototype.getEndByte = Sf.prototype.Tc;function T(b, c, d, e, f, g) {
	      this.position = b;this.startTime = c;this.endTime = d;this.c = e;this.b = f;this.a = g;
	    }A("shaka.media.SegmentReference", T);T.prototype.ca = function () {
	      return this.position;
	    };
	    T.prototype.getPosition = T.prototype.ca;T.prototype.kc = function () {
	      return this.startTime;
	    };T.prototype.getStartTime = T.prototype.kc;T.prototype.Te = function () {
	      return this.endTime;
	    };T.prototype.getEndTime = T.prototype.Te;T.prototype.Ic = function () {
	      return this.c();
	    };T.prototype.createUris = T.prototype.Ic;T.prototype.Uc = function () {
	      return this.b;
	    };T.prototype.getStartByte = T.prototype.Uc;T.prototype.Tc = function () {
	      return this.a;
	    };T.prototype.getEndByte = T.prototype.Tc;function Tf(b, c, d, e) {
	      var f,
	          g = new R().fa("sidx", function (b) {
	        f = Uf(c, e, d, b);
	      });b && g.parse(b);if (f) return f;throw new D(2, 3, 3004);
	    }
	    function Uf(b, c, d, e) {
	      var f = [];e.reader.M(4);var g = e.reader.G();if (0 == g) throw new D(2, 3, 3005);if (0 == e.version) {
	        var h = e.reader.G();var k = e.reader.G();
	      } else h = e.reader.Bb(), k = e.reader.Bb();e.reader.M(2);var l = e.reader.Tb();b = b + e.size + k;for (k = 0; k < l; k++) {
	        var m = e.reader.G(),
	            n = (m & 2147483648) >>> 31;m &= 2147483647;var p = e.reader.G();e.reader.M(4);if (1 == n) throw new D(2, 3, 3006);f.push(new T(f.length, h / g - c, (h + p) / g - c, function () {
	          return d;
	        }, b, b + m - 1));h += p;b += m;
	      }e.parser.stop();return f;
	    }function U(b) {
	      this.a = b;
	    }A("shaka.media.SegmentIndex", U);U.prototype.destroy = function () {
	      this.a = null;return Promise.resolve();
	    };U.prototype.destroy = U.prototype.destroy;U.prototype.find = function (b) {
	      for (var c = this.a.length - 1; 0 <= c; --c) {
	        var d = this.a[c];if (b >= d.startTime && b < d.endTime) return d.position;
	      }return this.a.length && b < this.a[0].startTime ? this.a[0].position : null;
	    };U.prototype.find = U.prototype.find;
	    U.prototype.get = function (b) {
	      if (0 == this.a.length) return null;b -= this.a[0].position;return 0 > b || b >= this.a.length ? null : this.a[b];
	    };U.prototype.get = U.prototype.get;U.prototype.offset = function (b) {
	      for (var c = 0; c < this.a.length; ++c) this.a[c].startTime += b, this.a[c].endTime += b;
	    };U.prototype.offset = U.prototype.offset;
	    U.prototype.cd = function (b) {
	      for (var c = [], d = 0, e = 0; d < this.a.length && e < b.length;) {
	        var f = this.a[d],
	            g = b[e];f.startTime < g.startTime ? (c.push(f), d++) : (f.startTime > g.startTime ? 0 == d && c.push(g) : (.1 < Math.abs(f.endTime - g.endTime) ? c.push(new T(f.position, g.startTime, g.endTime, g.c, g.b, g.a)) : c.push(f), d++), e++);
	      }for (; d < this.a.length;) c.push(this.a[d++]);if (c.length) for (d = c[c.length - 1].position + 1; e < b.length;) f = b[e++], f = new T(d++, f.startTime, f.endTime, f.c, f.b, f.a), c.push(f);else c = b;this.a = c;
	    };U.prototype.merge = U.prototype.cd;
	    U.prototype.Lc = function (b) {
	      for (var c = 0; c < this.a.length; ++c) if (this.a[c].endTime > b) {
	        this.a.splice(0, c);return;
	      }this.a = [];
	    };U.prototype.evict = U.prototype.Lc;function Vf(b, c) {
	      for (; b.a.length;) if (b.a[b.a.length - 1].startTime >= c) b.a.pop();else break;for (; b.a.length;) if (0 >= b.a[0].endTime) b.a.shift();else break;if (0 != b.a.length) {
	        var d = b.a[b.a.length - 1];b.a[b.a.length - 1] = new T(d.position, d.startTime, c, d.c, d.b, d.a);
	      }
	    }function Wf(b) {
	      this.b = b;this.a = new Q(b, 0);Xf || (Xf = [new Uint8Array([255]), new Uint8Array([127, 255]), new Uint8Array([63, 255, 255]), new Uint8Array([31, 255, 255, 255]), new Uint8Array([15, 255, 255, 255, 255]), new Uint8Array([7, 255, 255, 255, 255, 255]), new Uint8Array([3, 255, 255, 255, 255, 255, 255]), new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255])]);
	    }var Xf;Wf.prototype.ua = function () {
	      return this.a.ua();
	    };
	    function Yf(b) {
	      var c = Zf(b);if (7 < c.length) throw new D(2, 3, 3002);for (var d = 0, e = 0; e < c.length; e++) d = 256 * d + c[e];c = d;d = Zf(b);a: {
	        e = L.za;for (var f = 0; f < Xf.length; f++) if (e(d, Xf[f])) {
	          e = !0;break a;
	        }e = !1;
	      }if (e) d = b.b.byteLength - b.a.ca();else {
	        if (8 == d.length && d[1] & 224) throw new D(2, 3, 3001);e = d[0] & (1 << 8 - d.length) - 1;for (f = 1; f < d.length; f++) e = 256 * e + d[f];d = e;
	      }d = b.a.ca() + d <= b.b.byteLength ? d : b.b.byteLength - b.a.ca();e = new DataView(b.b.buffer, b.b.byteOffset + b.a.ca(), d);b.a.M(d);return new $f(c, e);
	    }
	    function Zf(b) {
	      var c = b.a.la(),
	          d;for (d = 1; 8 >= d && !(c & 1 << 8 - d); d++);if (8 < d) throw new D(2, 3, 3002);var e = new Uint8Array(d);e[0] = c;for (c = 1; c < d; c++) e[c] = b.a.la();return e;
	    }function $f(b, c) {
	      this.id = b;this.a = c;
	    }function ag(b) {
	      if (8 < b.a.byteLength) throw new D(2, 3, 3002);if (8 == b.a.byteLength && b.a.getUint8(0) & 224) throw new D(2, 3, 3001);for (var c = 0, d = 0; d < b.a.byteLength; d++) {
	        var e = b.a.getUint8(d);c = 256 * c + e;
	      }return c;
	    }function bg() {}
	    bg.prototype.parse = function (b, c, d, e) {
	      var f;c = new Wf(new DataView(c));if (440786851 != Yf(c).id) throw new D(2, 3, 3008);var g = Yf(c);if (408125543 != g.id) throw new D(2, 3, 3009);c = g.a.byteOffset;g = new Wf(g.a);for (f = null; g.ua();) {
	        var h = Yf(g);if (357149030 == h.id) {
	          f = h;break;
	        }
	      }if (!f) throw new D(2, 3, 3010);g = new Wf(f.a);f = 1E6;for (h = null; g.ua();) {
	        var k = Yf(g);if (2807729 == k.id) f = ag(k);else if (17545 == k.id) if (h = k, 4 == h.a.byteLength) h = h.a.getFloat32(0);else if (8 == h.a.byteLength) h = h.a.getFloat64(0);else throw new D(2, 3, 3003);
	      }if (null == h) throw new D(2, 3, 3011);g = f / 1E9;f = h * g;b = Yf(new Wf(new DataView(b)));if (475249515 != b.id) throw new D(2, 3, 3007);return cg(b, c, g, f, d, e);
	    };function cg(b, c, d, e, f, g) {
	      function h() {
	        return f;
	      }var k = [];b = new Wf(b.a);for (var l = null, m = null; b.ua();) {
	        var n = Yf(b);if (187 == n.id) {
	          var p = dg(n);p && (n = d * p.yg, p = c + p.Vf, null != l && k.push(new T(k.length, l - g, n - g, h, m, p - 1)), l = n, m = p);
	        }
	      }null != l && k.push(new T(k.length, l - g, e - g, h, m, null));return k;
	    }
	    function dg(b) {
	      var c = new Wf(b.a);b = Yf(c);if (179 != b.id) throw new D(2, 3, 3013);b = ag(b);c = Yf(c);if (183 != c.id) throw new D(2, 3, 3012);c = new Wf(c.a);for (var d = 0; c.ua();) {
	        var e = Yf(c);if (241 == e.id) {
	          d = ag(e);break;
	        }
	      }return { yg: b, Vf: d };
	    }function eg(b, c) {
	      var d = Pf(b, c, "Initialization");if (!d) return null;var e = b.C.qa,
	          f = d.getAttribute("sourceURL");f && (e = vd(b.C.qa, [f]));f = 0;var g = null;if (d = S.I(d, "range", S.uc)) f = d.start, g = d.end;return new Sf(function () {
	        return e;
	      }, f, g);
	    }
	    function fg(b, c) {
	      var d = Number(Of(b, gg, "presentationTimeOffset")) || 0,
	          e = Of(b, gg, "timescale"),
	          f = 1;e && (f = S.tc(e) || 1);d = d / f || 0;e = eg(b, gg);var g = b.C.contentType;f = b.C.mimeType.split("/")[1];if ("text" != g && "mp4" != f && "webm" != f) throw new D(2, 4, 4006);if ("webm" == f && !e) throw new D(2, 4, 4005);g = Pf(b, gg, "RepresentationIndex");var h = Of(b, gg, "indexRange"),
	          k = b.C.qa;h = S.uc(h || "");if (g) {
	        var l = g.getAttribute("sourceURL");l && (k = vd(b.C.qa, [l]));h = S.I(g, "range", S.uc, h);
	      }if (!h) throw new D(2, 4, 4002);f = hg(b, c, e, k, h.start, h.end, f, d);return { createSegmentIndex: f.createSegmentIndex, findSegmentPosition: f.findSegmentPosition, getSegmentReference: f.getSegmentReference, initSegmentReference: e, ma: d };
	    }
	    function hg(b, c, d, e, f, g, h, k) {
	      var l = b.presentationTimeline,
	          m = !b.mb || !b.T.Zc,
	          n = b.T.start,
	          p = b.T.duration,
	          v = c,
	          x = null;return { createSegmentIndex: function () {
	          var b = [v(e, f, g), "webm" == h ? v(d.c(), d.b, d.a) : null];v = null;return Promise.all(b).then(function (b) {
	            var c = b[0];b = b[1] || null;c = "mp4" == h ? Tf(c, f, e, k) : new bg().parse(c, b, e, k);l.vb(c, n);x = new U(c);m && Vf(x, p);
	          });
	        }, findSegmentPosition: function (b) {
	          return x.find(b);
	        }, getSegmentReference: function (b) {
	          return x.get(b);
	        } };
	    }function gg(b) {
	      return b.Ub;
	    }function ig(b, c) {
	      var d = eg(b, jg);var e = kg(b);var f = Nf(b, jg),
	          g = f.ab;0 == g && (g = 1);var h = 0;f.Z ? h = f.Z * (g - 1) : f.N && 0 < f.N.length && (h = f.N[0].start);e = { Z: f.Z, startTime: h, ab: g, ma: f.ma, N: f.N, tb: e };if (!e.Z && !e.N && 1 < e.tb.length) throw new D(2, 4, 4002);if (!e.Z && !b.T.duration && !e.N && 1 == e.tb.length) throw new D(2, 4, 4002);if (e.N && 0 == e.N.length) throw new D(2, 4, 4002);g = f = null;b.ka.id && b.C.id && (g = b.ka.id + "," + b.C.id, f = c[g]);h = lg(b.T.duration, e.ab, b.C.qa, e);f ? (f.cd(h), g = b.presentationTimeline.Ob(), f.Lc(g - b.T.start)) : (b.presentationTimeline.vb(h, b.T.start), f = new U(h), g && b.mb && (c[g] = f));b.mb && b.T.Zc || Vf(f, b.T.duration);return { createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: f.find.bind(f), getSegmentReference: f.get.bind(f), initSegmentReference: d, ma: e.ma };
	    }function jg(b) {
	      return b.La;
	    }
	    function lg(b, c, d, e) {
	      var f = e.tb.length;e.N && e.N.length != e.tb.length && (f = Math.min(e.N.length, e.tb.length));for (var g = [], h = e.startTime, k = 0; k < f; k++) {
	        var l = e.tb[k],
	            m = vd(d, [l.xf]),
	            n = void 0;n = null != e.Z ? h + e.Z : e.N ? e.N[k].end : h + b;g.push(new T(k + c, h, n, function (b) {
	          return b;
	        }.bind(null, m), l.start, l.end));h = n;
	      }return g;
	    }
	    function kg(b) {
	      return [b.C.La, b.aa.La, b.ka.La].filter(ud.Ia).map(function (b) {
	        return S.P(b, "SegmentURL");
	      }).reduce(function (b, d) {
	        return 0 < b.length ? b : d;
	      }).map(function (c) {
	        c.getAttribute("indexRange") && !b.Vd && (b.Vd = !0);var d = c.getAttribute("media");c = S.I(c, "mediaRange", S.uc, { start: 0, end: null });return { xf: d, start: c.start, end: c.end };
	      });
	    }function mg(b, c, d, e) {
	      var f = ng(b);var g = Nf(b, og);var h = Of(b, og, "media"),
	          k = Of(b, og, "index");g = { Z: g.Z, timescale: g.timescale, ab: g.ab, ma: g.ma, Dd: g.Dd, N: g.N, ad: h, Qb: k };h = g.Qb ? 1 : 0;h += g.N ? 1 : 0;h += g.Z ? 1 : 0;if (0 == h) throw new D(2, 4, 4002);1 != h && (g.Qb && (g.N = null), g.Z = null);if (!g.Qb && !g.ad) throw new D(2, 4, 4002);if (g.Qb) {
	        d = b.C.mimeType.split("/")[1];if ("mp4" != d && "webm" != d) throw new D(2, 4, 4006);if ("webm" == d && !f) throw new D(2, 4, 4005);e = Mf(g.Qb, b.C.id, null, b.bandwidth || null, null);e = vd(b.C.qa, [e]);b = hg(b, c, f, e, 0, null, d, g.ma);
	      } else g.Z ? (e || (b.presentationTimeline.ed(g.Z), b.presentationTimeline.fd(b.T.start)), b = pg(b, g)) : (h = c = null, b.ka.id && b.C.id && (h = b.ka.id + "," + b.C.id, c = d[h]), k = qg(b, g), e = !b.mb || !b.T.Zc, c ? (e && Vf(new U(k), b.T.duration), c.cd(k), d = b.presentationTimeline.Ob(), c.Lc(d - b.T.start)) : (b.presentationTimeline.vb(k, b.T.start), c = new U(k), h && b.mb && (d[h] = c)), e && Vf(c, b.T.duration), b = { createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: c.find.bind(c), getSegmentReference: c.get.bind(c) });return { createSegmentIndex: b.createSegmentIndex,
	        findSegmentPosition: b.findSegmentPosition, getSegmentReference: b.getSegmentReference, initSegmentReference: f, ma: g.ma };
	    }function og(b) {
	      return b.Wb;
	    }
	    function pg(b, c) {
	      var d = b.T.duration,
	          e = c.Z,
	          f = c.ab,
	          g = c.timescale,
	          h = c.ad,
	          k = b.bandwidth || null,
	          l = b.C.id,
	          m = b.C.qa;return { createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function (b) {
	          return 0 > b || d && b >= d ? null : Math.floor(b / e);
	        }, getSegmentReference: function (b) {
	          var c = b * e,
	              n = c + e;d && (n = Math.min(n, d));return 0 > n || d && c >= d ? null : new T(b, c, n, function () {
	            var d = Mf(h, l, b + f, k, c * g);return vd(m, [d]);
	          }, 0, null);
	        } };
	    }
	    function qg(b, c) {
	      for (var d = [], e = 0; e < c.N.length; e++) {
	        var f = e + c.ab;d.push(new T(f, c.N[e].start, c.N[e].end, function (b, c, d, e, f, n) {
	          b = Mf(b, c, f, d, n);return vd(e, [b]).map(function (b) {
	            return b.toString();
	          });
	        }.bind(null, c.ad, b.C.id, b.bandwidth || null, b.C.qa, f, c.N[e].xg + c.Dd), 0, null));
	      }return d;
	    }function ng(b) {
	      var c = Of(b, og, "initialization");if (!c) return null;var d = b.C.id,
	          e = b.bandwidth || null,
	          f = b.C.qa;return new Sf(function () {
	        var b = Mf(c, d, null, e, null);return vd(f, [b]);
	      }, 0, null);
	    }var V = { zb: {}, Sb: {}, pd: function (b, c) {
	        V.Sb[b] = c;
	      } };A("shaka.media.ManifestParser.registerParserByExtension", V.pd);V.Cb = function (b, c) {
	      V.zb[b] = c;
	    };A("shaka.media.ManifestParser.registerParserByMime", V.Cb);
	    V.Sf = function () {
	      var b = {};if (sc()) {
	        for (var c in V.zb) b[c] = !0;for (var d in V.Sb) b[d] = !0;
	      }c = { mpd: "application/dash+xml", m3u8: "application/x-mpegurl", ism: "application/vnd.ms-sstr+xml" };d = r(["application/dash+xml", "application/x-mpegurl", "application/vnd.apple.mpegurl", "application/vnd.ms-sstr+xml"]);for (var e = d.next(); !e.done; e = d.next()) e = e.value, b[e] = sc() ? !!V.zb[e] : tc(e);for (var f in c) b[f] = sc() ? !!V.Sb[f] : tc(c[f]);return b;
	    };
	    V.create = function (b, c, d, e) {
	      return t(function g() {
	        var h, k;return z(g, function (g) {
	          switch (g.j) {case 1:
	              return za(g, 2), u(g, V.Ue(b, c, d, e), 4);case 4:
	              return h = g.o, g["return"](new h());case 2:
	              throw k = Ca(g), k.severity = 2, k;}
	        });
	      });
	    };
	    V.Ue = function (b, c, d, e) {
	      return t(function g() {
	        var h, k, l, m, n;return z(g, function (g) {
	          switch (g.j) {case 1:
	              h = V;if (e && (k = h.zb[e.toLowerCase()])) return g["return"](k);if (l = h.getExtension(b)) if (m = h.Sb[l]) return g["return"](m);if (e) {
	                g.A(2);break;
	              }return u(g, h.bf(b, c, d), 3);case 3:
	              if (e = g.o) if (n = V.zb[e]) return g["return"](n);case 2:
	              throw new D(2, 4, 4E3, b);}
	        });
	      });
	    };
	    V.bf = function (b, c, d) {
	      return t(function f() {
	        var g, h, k;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = Wb([b], d), g.method = "HEAD", u(f, c.request(0, g).promise, 2);case 2:
	              return h = f.o, k = h.headers["content-type"], f["return"](k ? k.toLowerCase().split(";").shift() : "");}
	        });
	      });
	    };V.getExtension = function (b) {
	      b = new ib(b).ja.split("/").pop().split(".");return 1 == b.length ? "" : b.pop().toLowerCase();
	    };V.isSupported = function (b, c) {
	      return sc() ? c in V.zb || V.getExtension(b) in V.Sb ? !0 : !1 : !1;
	    };function W(b, c, d) {
	      this.f = b;this.vc = c;this.h = this.g = Infinity;this.a = 1;this.b = this.c = null;this.l = 0;this.m = !0;this.i = 0;this.s = void 0 === d ? !0 : d;
	    }A("shaka.media.PresentationTimeline", W);W.prototype.Y = function () {
	      return this.g;
	    };W.prototype.getDuration = W.prototype.Y;W.prototype.$e = function () {
	      return this.a;
	    };W.prototype.getMaxSegmentDuration = W.prototype.$e;W.prototype.xa = function (b) {
	      this.g = b;
	    };W.prototype.setDuration = W.prototype.xa;W.prototype.hf = function () {
	      return this.f;
	    };
	    W.prototype.getPresentationStartTime = W.prototype.hf;W.prototype.pe = function (b) {
	      this.l = b;
	    };W.prototype.setClockOffset = W.prototype.pe;W.prototype.Xb = function (b) {
	      this.m = b;
	    };W.prototype.setStatic = W.prototype.Xb;W.prototype.xd = function (b) {
	      this.h = b;
	    };W.prototype.setSegmentAvailabilityDuration = W.prototype.xd;W.prototype.ig = function (b) {
	      this.vc = b;
	    };W.prototype.setDelay = W.prototype.ig;W.prototype.Se = function () {
	      return this.vc;
	    };W.prototype.getDelay = W.prototype.Se;
	    W.prototype.vb = function (b, c) {
	      if (0 != b.length) {
	        var d = b[b.length - 1].endTime + c;this.fd(b[0].startTime + c);this.a = b.reduce(function (b, c) {
	          return Math.max(b, c.endTime - c.startTime);
	        }, this.a);this.b = Math.max(this.b, d);null != this.f && this.s && (this.f = (Date.now() + this.l) / 1E3 - this.b - this.a);
	      }
	    };W.prototype.notifySegments = W.prototype.vb;W.prototype.fd = function (b) {
	      this.c = null == this.c ? b : Math.min(this.c, b);
	    };W.prototype.notifyMinSegmentStartTime = W.prototype.fd;W.prototype.ed = function (b) {
	      this.a = Math.max(this.a, b);
	    };
	    W.prototype.notifyMaxSegmentDuration = W.prototype.ed;W.prototype.offset = function (b) {
	      null != this.c && (this.c += b);null != this.b && (this.b += b);
	    };W.prototype.offset = W.prototype.offset;W.prototype.V = function () {
	      return Infinity == this.g && !this.m;
	    };W.prototype.isLive = W.prototype.V;W.prototype.Xa = function () {
	      return Infinity != this.g && !this.m;
	    };W.prototype.isInProgress = W.prototype.Xa;W.prototype.Ob = function () {
	      if (Infinity == this.h) return this.i;var b = this.pb() - this.h;return Math.max(this.i, b);
	    };
	    W.prototype.getSegmentAvailabilityStart = W.prototype.Ob;W.prototype.qe = function (b) {
	      this.i = b;
	    };W.prototype.setUserSeekStart = W.prototype.qe;W.prototype.pb = function () {
	      return this.V() || this.Xa() ? Math.min(Math.max(0, (Date.now() + this.l) / 1E3 - this.a - this.f), this.g) : this.g;
	    };W.prototype.getSegmentAvailabilityEnd = W.prototype.pb;W.prototype.Nb = function (b) {
	      var c = Math.max(this.c, this.i);if (Infinity == this.h) return c;var d = this.pb() - this.h;b = Math.min(d + b, this.Ca());return Math.max(c, b);
	    };
	    W.prototype.getSafeSeekRangeStart = W.prototype.Nb;W.prototype.ob = function () {
	      return this.Nb(0);
	    };W.prototype.getSeekRangeStart = W.prototype.ob;W.prototype.Ca = function () {
	      var b = this.V() || this.Xa() ? this.vc : 0;return Math.max(0, this.pb() - b);
	    };W.prototype.getSeekRangeEnd = W.prototype.Ca;W.prototype.ue = function () {
	      return null == this.f || null != this.b && this.s ? !1 : !0;
	    };W.prototype.usingPresentationStartTime = W.prototype.ue;function rg(b, c, d, e) {
	      b = Wb(b, e);if (0 != c || null != d) b.headers.Range = d ? "bytes=" + c + "-" + d : "bytes=" + c + "-";return b;
	    }function sg() {
	      var b = this;this.b = this.a = null;this.f = [];this.c = null;this.l = [];this.h = 1;this.m = {};this.s = 0;this.u = new Ya(5);this.i = new C(function () {
	        tg(b);
	      });this.g = new Sb();
	    }A("shaka.dash.DashParser", sg);q = sg.prototype;q.configure = function (b) {
	      this.a = b;
	    };q.start = function (b, c) {
	      var d = this;return t(function f() {
	        var g;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return d.f = [b], d.b = c, u(f, ug(d), 2);case 2:
	              g = f.o;d.b && vg(d, g);if (!d.b) throw new D(2, 7, 7001);return f["return"](d.c);}
	        });
	      });
	    };
	    q.stop = function () {
	      this.a = this.b = null;this.f = [];this.c = null;this.l = [];this.m = {};null != this.i && (this.i.stop(), this.i = null);return this.g.destroy();
	    };q.update = function () {
	      ug(this)["catch"](function (b) {
	        if (this.b) this.b.onError(b);
	      }.bind(this));
	    };q.onExpirationUpdated = function () {};
	    function ug(b) {
	      var c = Date.now(),
	          d = b.b.networkingEngine.request(0, Wb(b.f, b.a.retryParameters));Tb(b.g, d);return d.promise.then(function (c) {
	        if (b.b) return c.uri && !b.f.includes(c.uri) && b.f.unshift(c.uri), wg(b, c.data, c.uri);
	      }).then(function () {
	        var d = (Date.now() - c) / 1E3;Za(b.u, 1, d);return d;
	      });
	    }function wg(b, c, d) {
	      c = S.ge(c, "MPD");if (!c) throw new D(2, 4, 4001, d);c = Rf(c, b.a.retryParameters, b.a.dash.xlinkFailGracefully, d, b.b.networkingEngine);Tb(b.g, c);return c.promise.then(function (c) {
	        return xg(b, c, d);
	      });
	    }
	    function xg(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n, p, v, x, B, y, G, E, aa, sa, ba, ub, Ua, X, oa, ha, Ka, Da, Ea, vb, eb, fb;return z(f, function (f) {
	          switch (f.j) {case 1:
	              l = ud;m = S;n = [d];p = m.P(c, "Location").map(m.ic).filter(l.Ia);0 < p.length && (v = vd(n, p), n = b.f = v);x = m.P(c, "BaseURL").map(m.ic);B = vd(n, x);y = b.a.dash.ignoreMinBufferTime;G = 0;y || (G = m.I(c, "minBufferTime", m.Ea));b.s = m.I(c, "minimumUpdatePeriod", m.Ea, -1);E = m.I(c, "availabilityStartTime", m.Of);aa = m.I(c, "timeShiftBufferDepth", m.Ea);sa = m.I(c, "maxSegmentDuration", m.Ea);
	              ba = c.getAttribute("type") || "static";ub = b.a.dash.ignoreSuggestedPresentationDelay;Ua = null;ub || (Ua = m.I(c, "suggestedPresentationDelay", m.Ea));b.c ? X = b.c.presentationTimeline : (oa = Math.max(b.a.dash.defaultPresentationDelay, 1.5 * G), ha = null != Ua ? Ua : oa, X = new W(E, ha, b.a.dash.autoCorrectDrift));Ka = { mb: "static" != ba, presentationTimeline: X, ka: null, T: null, aa: null, C: null, bandwidth: 0, Vd: !1 };for (var gb = Ka, zd = B, wb = S.I(c, "mediaPresentationDuration", S.Ea), Fb = [], La = 0, Ac = S.P(c, "Period"), Va = 0; Va < Ac.length; Va++) {
	                var Gb = Ac[Va];
	                La = S.I(Gb, "start", S.Ea, La);var Ad = S.I(Gb, "duration", S.Ea),
	                    xb = null;if (Va != Ac.length - 1) {
	                  var Ph = S.I(Ac[Va + 1], "start", S.Ea);null != Ph && (xb = Ph - La);
	                } else null != wb && (xb = wb - La);null == xb && (xb = Ad);Gb = yg(b, gb, zd, { start: La, duration: xb, node: Gb, Zc: null == xb || Va == Ac.length - 1 });Fb.push(Gb);Ad = gb.ka.id;b.l.includes(Ad) || (b.l.push(Ad), b.c && (b.b.filterNewPeriod(Gb), b.c.periods.push(Gb)));if (null == xb) {
	                  La = null;break;
	                }La += xb;
	              }null == b.c && b.b.filterAllPeriods(Fb);null != wb ? (g = Fb, h = wb, k = !1) : (g = Fb, h = La, k = !0);Da = h;Ea = g;X.Xb("static" == ba);"static" != ba && k || X.xa(Da || Infinity);(vb = X.V()) && !isNaN(b.a.availabilityWindowOverride) && (aa = b.a.availabilityWindowOverride);null == aa && (aa = Infinity);X.xd(aa);X.ed(sa || 1);if (b.c) {
	                f.A(0);break;
	              }b.c = { presentationTimeline: X, periods: Ea, offlineSessionIds: [], minBufferTime: G || 0 };if (!X.ue()) {
	                f.A(0);break;
	              }eb = m.P(c, "UTCTiming");return u(f, zg(b, B, eb), 4);case 4:
	              fb = f.o;if (!b.b) return f["return"]();X.pe(fb);w(f);}
	        });
	      });
	    }
	    function yg(b, c, d, e) {
	      c.ka = Ag(e.node, null, d);c.T = e;c.ka.id || (c.ka.id = "__shaka_period_" + e.start);S.P(e.node, "EventStream").forEach(b.Pf.bind(b, e.start, e.duration));d = S.P(e.node, "AdaptationSet").map(b.Nf.bind(b, c)).filter(ud.Ia);if (c.mb) {
	        c = [];for (var f = r(d), g = f.next(); !g.done; g = f.next()) {
	          g = r(g.value.Yf);for (var h = g.next(); !h.done; h = g.next()) c.push(h.value);
	        }if (c.length != new Set(c).size) throw new D(2, 4, 4018);
	      }var k = d.filter(function (b) {
	        return !b.Bd;
	      });d.filter(function (b) {
	        return b.Bd;
	      }).forEach(function (b) {
	        var c = b.streams[0],
	            d = b.Bd;k.forEach(function (b) {
	          b.id == d && b.streams.forEach(function (b) {
	            b.trickModeVideo = c;
	          });
	        });
	      });c = Bg(k, "video");f = Bg(k, "audio");if (!c.length && !f.length) throw new D(2, 4, 4004);d = b.a.disableAudio;if (!f.length || d) f = [null];d = b.a.disableVideo;if (!c.length || d) c = [null];d = [];for (g = 0; g < f.length; g++) for (h = 0; h < c.length; h++) Cg(b, f[g], c[h], d);c = [];if (!b.a.disableText) for (b = Bg(k, "text"), f = 0; f < b.length; f++) c.push.apply(c, b[f].streams);return { startTime: e.start, textStreams: c, variants: d };
	    }
	    function Bg(b, c) {
	      return b.filter(function (b) {
	        return b.contentType == c;
	      });
	    }
	    function Cg(b, c, d, e) {
	      if (c || d) if (c && d) {
	        var f = c.drmInfos;var g = d.drmInfos;if (f.length && g.length ? 0 < nd(f, g).length : 1) {
	          g = nd(c.drmInfos, d.drmInfos);for (var h = 0; h < c.streams.length; h++) for (var k = 0; k < d.streams.length; k++) f = (d.streams[k].bandwidth || 0) + (c.streams[h].bandwidth || 0), f = { id: b.h++, language: c.language, primary: c.$c || d.$c, audio: c.streams[h], video: d.streams[k], bandwidth: f, drmInfos: g, allowedByApplication: !0, allowedByKeySystem: !0 }, e.push(f);
	        }
	      } else for (g = c || d, h = 0; h < g.streams.length; h++) f = g.streams[h].bandwidth || 0, f = { id: b.h++, language: g.language || "und", primary: g.$c, audio: c ? g.streams[h] : null, video: d ? g.streams[h] : null, bandwidth: f, drmInfos: g.drmInfos, allowedByApplication: !0, allowedByKeySystem: !0 }, e.push(f);
	    }
	    q.Nf = function (b, c) {
	      b.aa = Ag(c, b.ka, null);if ("image" == b.aa.contentType) return null;var d = !1,
	          e = S.P(c, "Role"),
	          f = e.map(function (b) {
	        return b.getAttribute("value");
	      }).filter(ud.Ia),
	          g = void 0,
	          h = "text" == b.aa.contentType;h && (g = "subtitle");for (var k = 0; k < e.length; k++) {
	        var l = e[k].getAttribute("schemeIdUri");if (null == l || "urn:mpeg:dash:role:2011" == l) switch (l = e[k].getAttribute("value"), l) {case "main":
	            d = !0;break;case "caption":case "subtitle":
	            g = l;}
	      }var m = null,
	          n = !1;S.P(c, "EssentialProperty").forEach(function (b) {
	        "http://dashif.org/guidelines/trickmode" == b.getAttribute("schemeIdUri") ? m = b.getAttribute("value") : n = !0;
	      });k = S.P(c, "Accessibility");var p = new Map();e = {};k = r(k);for (l = k.next(); !l.done; e = { Ib: e.Ib }, l = k.next()) {
	        var v = l.value;l = v.getAttribute("schemeIdUri");v = v.getAttribute("value");"urn:scte:dash:cc:cea-608:2015" == l || "urn:scte:dash:cc:cea-708:2015" == l ? (e.Ib = 1, null != v ? v.split(";").forEach(function (b) {
	          return function (c) {
	            if (c.includes("=")) {
	              c = c.split("=");var d = c[0].startsWith("CC") ? c[0] : "CC" + c[0];c = c[1].split(",")[0].split(":").pop();
	            } else d = "CC" + b.Ib, b.Ib += 2;p.set(d, M(c));
	          };
	        }(e)) : p.set("CC1", "und")) : "urn:mpeg:dash:role:2011" == l && null != v && (f.push(v), "captions" == v && (g = "caption"));
	      }if (n) return null;e = S.P(c, "ContentProtection");var x = Ef(e, this.a.dash.customScheme, this.a.dash.ignoreDrmInfo);e = M(c.getAttribute("lang") || "und");k = c.getAttribute("label");(l = S.P(c, "Label")) && l.length && (l = l[0], l.textContent && (k = l.textContent));l = S.P(c, "Representation");f = l.map(this.Qf.bind(this, b, x, g, e, k, d, f, p)).filter(function (b) {
	        return !!b;
	      });if (0 == f.length) {
	        if (this.a.dash.ignoreEmptyAdaptationSet || h) return null;throw new D(2, 4, 4003);
	      }b.aa.contentType && "application" != b.aa.contentType || (b.aa.contentType = Dg(f[0].mimeType, f[0].codecs), f.forEach(function (c) {
	        c.type = b.aa.contentType;
	      }));f.forEach(function (b) {
	        x.drmInfos.forEach(function (c) {
	          b.keyId && c.keyIds.push(b.keyId);
	        });
	      });h = l.map(function (b) {
	        return b.getAttribute("id");
	      }).filter(ud.Ia);return { id: b.aa.id || "__fake__" + this.h++, contentType: b.aa.contentType, language: e, $c: d, streams: f, drmInfos: x.drmInfos, Bd: m, Yf: h };
	    };
	    q.Qf = function (b, c, d, e, f, g, h, k, l) {
	      b.C = Ag(l, b.aa, null);if (!Eg(b.C)) return null;b.bandwidth = S.I(l, "bandwidth", S.tc) || 0;var m = b.C.contentType;m = "text" == m || "application" == m;try {
	        var n = this.Zf.bind(this);if (b.C.Ub) var p = fg(b, n);else if (b.C.La) p = ig(b, this.m);else if (b.C.Wb) p = mg(b, n, this.m, !!this.c);else {
	          var v = b.C.qa,
	              x = b.T.duration || 0;p = { createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function (b) {
	              return 0 <= b && b < x ? 1 : null;
	            }, getSegmentReference: function (b) {
	              return 1 != b ? null : new T(1, 0, x, function () {
	                return v;
	              }, 0, null);
	            }, initSegmentReference: null, ma: 0 };
	        }
	      } catch (B) {
	        if (m && 4002 == B.code) return null;throw B;
	      }l = S.P(l, "ContentProtection");l = Hf(l, this.a.dash.customScheme, c, this.a.dash.ignoreDrmInfo);return { id: this.h++, originalId: b.C.id, createSegmentIndex: p.createSegmentIndex, findSegmentPosition: p.findSegmentPosition, getSegmentReference: p.getSegmentReference, initSegmentReference: p.initSegmentReference, presentationTimeOffset: p.ma, mimeType: b.C.mimeType, codecs: b.C.codecs, frameRate: b.C.frameRate, pixelAspectRatio: b.C.pixelAspectRatio,
	        bandwidth: b.bandwidth, width: b.C.width, height: b.C.height, kind: d, encrypted: 0 < c.drmInfos.length, keyId: l, language: e, label: f, type: b.aa.contentType, primary: g, trickModeVideo: null, emsgSchemeIdUris: b.C.emsgSchemeIdUris, roles: h, channelsCount: b.C.gd, audioSamplingRate: b.C.audioSamplingRate, closedCaptions: k };
	    };
	    function tg(b) {
	      t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = 0, za(d, 2), u(d, ug(b), 4);case 4:
	              e = d.o;Ba(d, 3);break;case 2:
	              f = Ca(d), b.b && (f.severity = 1, b.b.onError(f));case 3:
	              if (!b.b) return d["return"]();vg(b, e);w(d);}
	        });
	      });
	    }function vg(b, c) {
	      0 > b.s || b.i.R(Math.max(3, b.s - c, $a(b.u)));
	    }
	    function Ag(b, c, d) {
	      c = c || { contentType: "", mimeType: "", codecs: "", emsgSchemeIdUris: [], frameRate: void 0, gd: null, audioSamplingRate: null };d = d || c.qa;var e = S.yb,
	          f = S.Me,
	          g = S.P(b, "BaseURL").map(S.ic),
	          h = b.getAttribute("contentType") || c.contentType,
	          k = b.getAttribute("mimeType") || c.mimeType,
	          l = b.getAttribute("codecs") || c.codecs;f = S.I(b, "frameRate", f) || c.frameRate;var m = b.getAttribute("par") || c.pixelAspectRatio,
	          n = S.P(b, "InbandEventStream"),
	          p = c.emsgSchemeIdUris.slice();n = r(n);for (var v = n.next(); !v.done; v = n.next()) v = v.value.getAttribute("schemeIdUri"), p.includes(v) || p.push(v);n = S.P(b, "AudioChannelConfiguration");n = Fg(n) || c.gd;v = S.I(b, "audioSamplingRate", e) || c.audioSamplingRate;h || (h = Dg(k, l));return { qa: vd(d, g), Ub: S.gc(b, "SegmentBase") || c.Ub, La: S.gc(b, "SegmentList") || c.La, Wb: S.gc(b, "SegmentTemplate") || c.Wb, width: S.I(b, "width", e) || c.width, height: S.I(b, "height", e) || c.height, contentType: h, mimeType: k, codecs: l, frameRate: f, pixelAspectRatio: m, emsgSchemeIdUris: p, id: b.getAttribute("id"), gd: n, audioSamplingRate: v };
	    }
	    function Fg(b) {
	      for (var c = 0; c < b.length; ++c) {
	        var d = b[c],
	            e = d.getAttribute("schemeIdUri");if (e && (d = d.getAttribute("value"))) switch (e) {case "urn:mpeg:dash:outputChannelPositionList:2012":
	            return d.trim().split(/ +/).length;case "urn:mpeg:dash:23003:3:audio_channel_configuration:2011":case "urn:dts:dash:audio_channel_configuration:2012":
	            e = parseInt(d, 10);if (!e) continue;return e;case "tag:dolby.com,2014:dash:audio_channel_configuration:2011":case "urn:dolby:dash:audio_channel_configuration:2011":
	            if (e = parseInt(d, 16)) {
	              for (b = 0; e;) e & 1 && ++b, e >>= 1;return b;
	            }}
	      }return null;
	    }function Eg(b) {
	      var c = b.Ub ? 1 : 0;c += b.La ? 1 : 0;c += b.Wb ? 1 : 0;if (0 == c) return "text" == b.contentType || "application" == b.contentType ? !0 : !1;1 != c && (b.Ub && (b.La = null), b.Wb = null);return !0;
	    }
	    function Gg(b, c, d, e) {
	      c = vd(c, [d]);c = Wb(c, b.a.retryParameters);c.method = e;c = b.b.networkingEngine.request(4, c);Tb(b.g, c);return c.promise.then(function (b) {
	        if ("HEAD" == e) {
	          if (!b.headers || !b.headers.date) return 0;b = b.headers.date;
	        } else b = Bc(b.data);b = Date.parse(b);return isNaN(b) ? 0 : b - Date.now();
	      });
	    }
	    function zg(b, c, d) {
	      d = d.map(function (b) {
	        return { scheme: b.getAttribute("schemeIdUri"), value: b.getAttribute("value") };
	      });var e = b.a.dash.clockSyncUri;!d.length && e && d.push({ scheme: "urn:mpeg:dash:utc:http-head:2014", value: e });return ud.Ke(d, function (b) {
	        var d = b.scheme;b = b.value;switch (d) {case "urn:mpeg:dash:utc:http-head:2014":case "urn:mpeg:dash:utc:http-head:2012":
	            return Gg(this, c, b, "HEAD");case "urn:mpeg:dash:utc:http-xsdate:2014":case "urn:mpeg:dash:utc:http-iso:2014":case "urn:mpeg:dash:utc:http-xsdate:2012":case "urn:mpeg:dash:utc:http-iso:2012":
	            return Gg(this, c, b, "GET");case "urn:mpeg:dash:utc:direct:2014":case "urn:mpeg:dash:utc:direct:2012":
	            return d = Date.parse(b), isNaN(d) ? 0 : d - Date.now();case "urn:mpeg:dash:utc:http-ntp:2014":case "urn:mpeg:dash:utc:ntp:2014":case "urn:mpeg:dash:utc:sntp:2014":
	            return cb("NTP UTCTiming scheme is not supported"), Promise.reject();default:
	            return cb("Unrecognized scheme in UTCTiming element", d), Promise.reject();}
	      }.bind(b))["catch"](function () {
	        cb("A UTCTiming element should always be given in live manifests! This content may not play on clients with bad clocks!");
	        return 0;
	      });
	    }q.Pf = function (b, c, d) {
	      var e = S.yb,
	          f = d.getAttribute("schemeIdUri") || "",
	          g = d.getAttribute("value") || "",
	          h = S.I(d, "timescale", e) || 1;S.P(d, "Event").forEach(function (d) {
	        var k = S.I(d, "presentationTime", e) || 0,
	            m = S.I(d, "duration", e) || 0;k = k / h + b;m = k + m / h;null != c && (k = Math.min(k, b + c), m = Math.min(m, b + c));d = { schemeIdUri: f, value: g, startTime: k, endTime: m, id: d.getAttribute("id") || "", eventElement: d };this.b.onTimelineRegionAdded(d);
	      }.bind(this));
	    };
	    q.Zf = function (b, c, d) {
	      b = rg(b, c, d, this.a.retryParameters);b = this.b.networkingEngine.request(1, b);Tb(this.g, b);return b.promise.then(function (b) {
	        return b.data;
	      });
	    };function Dg(b, c) {
	      return Yd(oc(b, c)) ? "text" : b.split("/")[0];
	    }V.pd("mpd", sg);V.Cb("application/dash+xml", sg);V.Cb("video/vnd.mpeg.dash.mpd", sg);function Hg(b, c, d, e) {
	      this.b = b;this.type = c;this.a = d;this.segments = e || null;
	    }function Ig(b, c, d, e) {
	      this.id = b;this.name = c;this.a = d;this.value = void 0 === e ? null : e;
	    }Ig.prototype.toString = function () {
	      function b(b) {
	        return b.name + "=" + (isNaN(Number(b.value)) ? '"' + b.value + '"' : b.value);
	      }var c = "#" + this.name,
	          d = this.a ? this.a.map(b) : [];this.value && d.unshift(this.value);0 < d.length && (c += ":" + d.join(","));return c;
	    };function Jg(b, c) {
	      this.name = b;this.value = c;
	    }
	    Ig.prototype.getAttribute = function (b) {
	      var c = this.a.filter(function (c) {
	        return c.name == b;
	      });return c.length ? c[0] : null;
	    };function Kg(b, c, d) {
	      return (b = b.getAttribute(c)) ? b.value : d || null;
	    }function Lg(b, c) {
	      this.b = c;this.a = b;
	    }var Mg = { nb: function (b, c) {
	        return b.filter(function (b) {
	          return b.name == c;
	        });
	      }, Ta: function (b, c) {
	        var d = Mg.nb(b, c);return d.length ? d[0] : null;
	      }, Pc: function (b, c, d) {
	        return b.filter(function (b) {
	          var e = b.getAttribute("TYPE");b = b.getAttribute("GROUP-ID");return e.value == c && b.value == d;
	        });
	      }, Hc: function (b, c) {
	        return vd([b], [c])[0];
	      }, Yc: function (b) {
	        return (/^#(?!EXT)/m.test(b)
	        );
	      } };function Ng(b) {
	      this.b = b;this.a = 0;
	    }function Og(b) {
	      Pg(b, /[ \t]+/gm);
	    }function Pg(b, c) {
	      c.lastIndex = b.a;var d = c.exec(b.b);d = null == d ? null : { position: d.index, length: d[0].length, ag: d };if (b.a == b.b.length || null == d || d.position != b.a) return null;b.a += d.length;return d.ag;
	    }function Qg(b) {
	      return b.a == b.b.length ? null : (b = Pg(b, /[^ \t\n]*/gm)) ? b[0] : null;
	    }function Rg() {
	      this.a = 0;
	    }
	    function Sg(b, c, d) {
	      c = Bc(c);c = c.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n").trim();var e = c.split(/\n+/m);if (!/^#EXTM3U($|[ \t\n])/m.test(e[0])) throw new D(2, 4, 4015);c = 0;for (var f = 1; f < e.length; f++) if (!Mg.Yc(e[f])) {
	        var g = Tg(b, e[f]);--b.a;if (Ug.includes(g.name)) {
	          c = 1;break;
	        } else "EXT-X-STREAM-INF" == g.name && (f += 1);
	      }f = [];for (g = 1; g < e.length;) if (Mg.Yc(e[g])) g += 1;else {
	        var h = Tg(b, e[g]);if (Vg.includes(h.name)) {
	          if (1 != c) throw new D(2, 4, 4017);e = e.splice(g, e.length - g);b = Wg(b, d, e, f);return new Hg(d, c, f, b);
	        }f.push(h);g += 1;"EXT-X-STREAM-INF" == h.name && (h.a.push(new Jg("URI", e[g])), g += 1);
	      }return new Hg(d, c, f);
	    }function Wg(b, c, d, e) {
	      var f = [],
	          g = [];d.forEach(function (d) {
	        if (/^(#EXT)/.test(d)) d = Tg(b, d), Ug.includes(d.name) ? e.push(d) : g.push(d);else {
	          if (Mg.Yc(d)) return [];d = Mg.Hc(c, d.trim());f.push(new Lg(d, g));g = [];
	        }
	      });return f;
	    }
	    function Tg(b, c) {
	      var d = b.a++,
	          e = c.match(/^#(EXT[^:]*)(?::(.*))?$/);if (!e) throw new D(2, 4, 4016, c);var f = e[1],
	          g = e[2];e = [];var h;if (g) {
	        g = new Ng(g);var k;(k = Pg(g, /^([^,=]+)(?:,|$)/g)) && (h = k[1]);for (var l = /([^=]+)=(?:"([^"]*)"|([^",]*))(?:,|$)/g; k = Pg(g, l);) e.push(new Jg(k[1], k[2] || k[3]));
	      }return new Ig(d, f, e, h);
	    }var Ug = "EXT-X-TARGETDURATION EXT-X-MEDIA-SEQUENCE EXT-X-DISCONTINUITY-SEQUENCE EXT-X-PLAYLIST-TYPE EXT-X-MAP EXT-X-I-FRAMES-ONLY EXT-X-ENDLIST".split(" "),
	        Vg = "EXTINF EXT-X-BYTERANGE EXT-X-DISCONTINUITY EXT-X-PROGRAM-DATE-TIME EXT-X-KEY EXT-X-DATERANGE".split(" ");function Xg(b) {
	      try {
	        var c = Xg.parse(b);return Hb({ uri: b, ld: b, data: c.data, headers: { "content-type": c.contentType } });
	      } catch (d) {
	        return Db(d);
	      }
	    }A("shaka.net.DataUriPlugin", Xg);
	    Xg.parse = function (b) {
	      var c = b.split(":");if (2 > c.length || "data" != c[0]) throw new D(2, 1, 1004, b);c = c.slice(1).join(":").split(",");if (2 > c.length) throw new D(2, 1, 1004, b);var d = c[0];c = window.decodeURIComponent(c.slice(1).join(","));d = d.split(";");var e = null;1 < d.length && (e = d[1]);if ("base64" == e) b = L.Ba(c).buffer;else {
	        if (e) throw new D(2, 1, 1005, b);b = Ec(c);
	      }return { data: b, contentType: d[0] };
	    };Vb("data", Xg);function Yg() {
	      var b = this;this.a = this.f = null;this.$ = 1;this.D = new Map();this.S = new Set();this.b = new Map();this.c = null;this.u = "";this.s = new Rg();this.O = 0;this.h = new C(function () {
	        Zg(b);
	      });this.g = $g;this.m = null;this.B = 0;this.F = Infinity;this.i = new Sb();this.K = [];this.l = new Map();this.W = !1;
	    }A("shaka.hls.HlsParser", Yg);q = Yg.prototype;q.configure = function (b) {
	      this.a = b;
	    };
	    q.start = function (b, c) {
	      var d = this;return t(function f() {
	        var g, h;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return d.f = c, u(f, ah(d, Wb([b], d.a.retryParameters), 0), 2);case 2:
	              return g = f.o, d.u = g.uri, u(f, bh(d, g.data), 3);case 3:
	              return h = d.O, 0 < h && d.h.R(h), f["return"](d.m);}
	        });
	      });
	    };q.stop = function () {
	      this.h && (this.h.stop(), this.h = null);var b = [];this.i && (b.push(this.i.destroy()), this.i = null);this.a = this.f = null;this.D.clear();this.S.clear();this.b.clear();this.m = null;return Promise.all(b);
	    };
	    q.update = function () {
	      if (this.g != ch.Qa) {
	        for (var b = [], c = r(this.b.values()), d = c.next(); !d.done; d = c.next()) b.push(dh(this, d.value));return Promise.all(b);
	      }
	    };
	    function dh(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n, p, v, x, B;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = Mg, g = ch, h = c.Ce, u(e, ah(b, Wb([h], b.a.retryParameters), 0), 2);case 2:
	              k = e.o;l = Sg(b.s, k.data, k.uri);if (1 != l.type) throw new D(2, 4, 4017);n = (m = f.Ta(l.a, "EXT-X-MEDIA-SEQUENCE")) ? Number(m.value) : 0;p = c.stream;return u(e, eh(b, c.Bc, l, n, p.mimeType, p.codecs), 3);case 3:
	              v = e.o;c.Vb.a = v;x = v[v.length - 1];if (B = f.Ta(l.a, "EXT-X-ENDLIST")) fh(b, g.Qa), b.c.xa(x.endTime);w(e);}
	        });
	      });
	    }q.onExpirationUpdated = function () {};
	    function bh(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n, p, v, x, B;return z(e, function (e) {
	          switch (e.j) {case 1:
	              f = Sg(b.s, c, b.u);if (0 != f.type) throw new D(2, 4, 4022);return u(e, gh(b, f), 2);case 2:
	              g = e.o;if (!b.f) throw new D(2, 7, 7001);if (b.W && 0 == g.variants.length) throw new D(2, 4, 4034);b.f.filterAllPeriods([g]);h = Infinity;k = 0;l = Infinity;for (var y = r(b.b.values()), E = y.next(); !E.done; E = y.next()) m = E.value, h = Math.min(h, m.dd), k = Math.max(k, m.dd), "text" != m.stream.type && (l = Math.min(l, m.duration));b.g != ch.Qa ? (b.c = new W(0, 3 * b.B), b.c.Xb(!1)) : (b.c = new W(null, 0), b.c.Xb(!0));hh(b);if (b.g != ch.Qa) {
	                b.O = b.F;n = ch;b.g == n.Fd && (p = b.c.vc, isNaN(b.a.availabilityWindowOverride) || (p = b.a.availabilityWindowOverride), b.c.xd(p));for (v = 0; 95443.7176888889 <= k;) v += 95443.7176888889, k -= 95443.7176888889;if (v) for (y = r(b.b.values()), E = y.next(); !E.done; E = y.next()) x = E.value, 95443.7176888889 > x.dd && (x.stream.presentationTimeOffset = -v, x.Vb.offset(v));
	              } else for (b.c.xa(l), b.c.offset(-h), y = r(b.b.values()), E = y.next(); !E.done; E = y.next()) B = E.value, B.stream.presentationTimeOffset = h, B.Vb.offset(-h), Vf(B.Vb, l);b.m = { presentationTimeline: b.c, periods: [g], offlineSessionIds: [], minBufferTime: 0 };w(e);}
	        });
	      });
	    }
	    function gh(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n, p, v, x, B, y;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = Mg, g = ud, h = c.a, k = f.nb(c.a, "EXT-X-MEDIA"), l = k.filter(function (b) {
	                return "SUBTITLES" == ih(b, "TYPE");
	              }.bind(b)), m = l.map(function (b) {
	                var c = this;return t(function ba() {
	                  var e;return z(ba, function (f) {
	                    switch (f.j) {case 1:
	                        if (c.a.disableText) return f["return"](null);za(f, 2);return u(f, jh(c, b), 4);case 4:
	                        return f["return"](f.o);case 2:
	                        e = Ca(f);if (c.a.hls.ignoreTextStreamFailures) return f["return"](null);
	                        throw e;}
	                  });
	                });
	              }.bind(b)), n = k.filter(function (b) {
	                return "CLOSED-CAPTIONS" == ih(b, "TYPE");
	              }), kh(b, n), u(e, Promise.all(m), 2);case 2:
	              return p = e.o, v = f.nb(h, "EXT-X-STREAM-INF"), x = v.map(function (b) {
	                return lh(this, b, c);
	              }.bind(b)), u(e, Promise.all(x), 3);case 3:
	              return B = e.o, y = B.reduce(g.Gc, []), y = y.filter(function (b) {
	                return null != b;
	              }), e["return"]({ startTime: 0, variants: y, textStreams: p.filter(function (b) {
	                  return null != b;
	                }) });}
	        });
	      });
	    }
	    function lh(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n, p, v, x, B, y, G, E, aa, sa, ba, ub, Ua, X, oa, ha, Ka, Da, Ea, vb, eb, fb;return z(f, function (f) {
	          switch (f.j) {case 1:
	              g = xd;h = Mg;k = Kg(c, "CODECS", "avc1.42E01E,mp4a.40.2");l = mh(k.split(/\s*,\s*/));m = c.getAttribute("RESOLUTION");p = n = null;v = Kg(c, "FRAME-RATE");x = Number(ih(c, "BANDWIDTH"));m && (B = m.value.split("x"), n = B[0], p = B[1]);y = h.nb(d.a, "EXT-X-MEDIA");y = y.filter(function (b) {
	                return "CLOSED-CAPTIONS" != ih(b, "TYPE");
	              });y = y.filter(function (b) {
	                var c = Kg(b, "URI") || "";return "SUBTITLES" == (Kg(b, "TYPE") || "") || "" != c;
	              });G = Kg(c, "AUDIO");E = Kg(c, "VIDEO");G ? y = h.Pc(y, "AUDIO", G) : E && (y = h.Pc(y, "VIDEO", E));if (aa = nh(g.ra, l)) {
	                if (sa = Kg(c, "SUBTITLES")) if (ba = h.Pc(y, "SUBTITLES", sa), ba.length && (ub = b.D.get(ba[0].id))) ub.stream.codecs = aa;Pb(l, aa);
	              }Ua = y.map(function (b) {
	                return oh(this, b, l);
	              }.bind(b));X = [];oa = [];return u(f, Promise.all(Ua), 2);case 2:
	              Ka = f.o;Ka = Ka.filter(function (b) {
	                return null != b;
	              });G ? X = Ka : E && (oa = Ka);Ea = !1;X.length || oa.length ? X.length ? (eb = ih(c, "URI"), fb = X[0].Bc, eb == fb ? (Da = g.Eb, Ea = !0) : Da = g.Pa) : Da = g.Eb : 1 == l.length ? (vb = nh(g.Pa, l), Da = m || v || vb ? g.Pa : g.Eb) : (Da = g.Pa, l = [l.join(",")]);if (Ea) {
	                f.A(3);break;
	              }return u(f, ph(b, c, l, Da), 4);case 4:
	              ha = f.o;case 3:
	              if (ha) ha.stream.type == g.Eb ? X = [ha] : oa = [ha];else if (null === ha) return f["return"]([]);oa && qh(oa);X && qh(X);return f["return"](rh(b, X, oa, x, n, p, v));}
	        });
	      });
	    }function qh(b) {
	      b.forEach(function (b) {
	        if (b) {
	          var c = b.stream.codecs.split(",");c = c.filter(function (b) {
	            return "mp4a.40.34" != b;
	          });b.stream.codecs = c.join(",");
	        }
	      });
	    }
	    function rh(b, c, d, e, f, g, h) {
	      d.forEach(function (b) {
	        if (b = b.stream) b.width = Number(f) || void 0, b.height = Number(g) || void 0, b.frameRate = Number(h) || void 0;
	      }.bind(b));var k = b.a ? b.a.disableAudio : !1;if (!c.length || k) c = [null];k = b.a ? b.a.disableVideo : !1;if (!d.length || k) d = [null];k = [];c = r(c);for (var l = c.next(); !l.done; l = c.next()) {
	        l = l.value;for (var m = r(d), n = m.next(); !n.done; n = m.next()) {
	          var p = n.value;n = l ? l.stream : null;var v = p ? p.stream : null,
	              x = l ? l.drmInfos : null,
	              B = p ? p.drmInfos : null;p = (p ? p.Bc : "") + " - " + (l ? l.Bc : "");var y = void 0;if (n && v) {
	            if (x.length && B.length ? 0 < nd(x, B).length : 1) y = nd(x, B);else continue;
	          } else n ? y = x : v && (y = B);b.S.has(p) || (n = sh(b, n, v, e, y), k.push(n), b.S.add(p));
	        }
	      }return k;
	    }function sh(b, c, d, e, f) {
	      return { id: b.$++, language: c ? c.language : "und", primary: !!c && c.primary || !!d && d.primary, audio: c, video: d, bandwidth: e, drmInfos: f, allowedByApplication: !0, allowedByKeySystem: !0 };
	    }
	    function jh(b, c) {
	      return t(function e() {
	        var f;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return ih(c, "TYPE"), u(e, oh(b, c, []), 2);case 2:
	              return f = e.o, e["return"](f.stream);}
	        });
	      });
	    }function kh(b, c) {
	      for (var d = r(c), e = d.next(); !e.done; e = d.next()) {
	        e = e.value;ih(e, "TYPE");var f = Kg(e, "LANGUAGE") || "und";f = M(f);var g = ih(e, "GROUP-ID");e = ih(e, "INSTREAM-ID");b.l.get(g) || b.l.set(g, new Map());b.l.get(g).set(e, f);
	      }
	    }
	    function oh(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n, p, v, x, B, y;return z(f, function (f) {
	          switch (f.j) {case 1:
	              g = ih(c, "URI");if (b.b.has(g)) return f["return"](b.b.get(g));h = ih(c, "TYPE").toLowerCase();k = xd;"subtitles" == h && (h = k.ra);l = M(Kg(c, "LANGUAGE", "und"));m = Kg(c, "NAME");n = c.getAttribute("DEFAULT");p = c.getAttribute("AUTOSELECT");v = Kg(c, "CHANNELS");if ("audio" == h) {
	                if (v) {
	                  var G = v.split("/")[0];G = parseInt(G, 10);
	                } else G = null;
	              } else G = null;x = G;B = !!n || !!p;return u(f, th(b, g, d, h, l, B, m, x, null), 2);case 2:
	              y = f.o;if (b.b.has(g)) return f["return"](b.b.get(g));
	              if (null == y) return f["return"](null);b.D.set(c.id, y);b.b.set(g, y);return f["return"](y);}
	        });
	      });
	    }
	    function ph(b, c, d, e) {
	      return t(function g() {
	        var h, k, l, m, n;return z(g, function (g) {
	          switch (g.j) {case 1:
	              h = xd;k = ih(c, "URI");if (b.b.has(k)) return g["return"](b.b.get(k));l = Kg(c, "CLOSED-CAPTIONS");m = null;e == h.Pa && l && "NONE" != l && (m = b.l.get(l));return u(g, th(b, k, d, e, "und", !1, null, null, m), 2);case 2:
	              n = g.o;if (null == n) return g["return"](null);if (b.b.has(k)) return g["return"](b.b.get(k));b.b.set(k, n);return g["return"](n);}
	        });
	      });
	    }
	    function th(b, c, d, e, f, g, h, k, l) {
	      return t(function n() {
	        var p, v, x, B, y, G, E, aa, sa, ba, ub, Ua, X, oa, ha, Ka, Da, Ea, vb, eb, fb, zd, gb, Oh, wb, Fb;return z(n, function (n) {
	          switch (n.j) {case 1:
	              return p = Mg, v = p.Hc(b.u, c), u(n, ah(b, Wb([v], b.a.retryParameters), 0), 2);case 2:
	              x = n.o;v = x.uri;B = Sg(b.s, x.data, v);if (1 != B.type) throw new D(2, 4, 4017);y = [];B.segments.forEach(function (b) {
	                b = p.nb(b.b, "EXT-X-KEY");y.push.apply(y, b);
	              });G = !1;E = [];aa = null;for (var La = r(y), Va = La.next(); !Va.done; Va = La.next()) if (sa = Va.value, ba = ih(sa, "METHOD"), "NONE" != ba) {
	                G = !0;if ("AES-128" == ba) return b.W = !0, n["return"](null);ub = ih(sa, "KEYFORMAT");if (X = (Ua = uh[ub]) ? Ua(sa) : null) X.keyIds.length && (aa = X.keyIds[0]), E.push(X);
	              }if (G && !E.length) throw new D(2, 4, 4026);vh(b, B);oa = wh(e, d);return u(n, xh(b, e, oa, B), 3);case 3:
	              return ha = n.o, yh.includes(ha) && (oa = ""), Da = (Ka = p.Ta(B.a, "EXT-X-MEDIA-SEQUENCE")) ? Number(Ka.value) : 0, za(n, 4), u(n, eh(b, c, B, Da, ha, oa), 6);case 6:
	              Ea = n.o;Ba(n, 5);break;case 4:
	              vb = Ca(n);if (4035 == vb.code) return cb("Skipping unsupported HLS stream", ha, c), n["return"](null);
	              throw vb;case 5:
	              return eb = Ea[0].startTime, fb = Ea[Ea.length - 1].endTime, zd = fb - eb, gb = new U(Ea), Oh = zh(B), wb = void 0, "text" == e && (wb = "subtitle"), Fb = { id: b.$++, originalId: h, createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: gb.find.bind(gb), getSegmentReference: gb.get.bind(gb), initSegmentReference: Oh, presentationTimeOffset: 0, mimeType: ha, codecs: oa, kind: wb, encrypted: G, keyId: aa, language: f, label: h, type: e, primary: g, trickModeVideo: null, emsgSchemeIdUris: null, frameRate: void 0, pixelAspectRatio: void 0,
	                width: void 0, height: void 0, bandwidth: void 0, roles: [], channelsCount: k, audioSamplingRate: null, closedCaptions: l }, n["return"]({ stream: Fb, Vb: gb, drmInfos: E, Bc: c, Ce: v, dd: eb, Hg: fb, duration: zd });}
	        });
	      });
	    }function vh(b, c) {
	      var d = ch,
	          e = Mg.Ta(c.a, "EXT-X-PLAYLIST-TYPE"),
	          f = Mg.Ta(c.a, "EXT-X-ENDLIST");f = e && "VOD" == e.value || f;e = e && "EVENT" == e.value && !f;e = !f && !e;f ? fh(b, d.Qa) : (e ? fh(b, d.Fd) : fh(b, d.xe), d = Ah(c.a, "EXT-X-TARGETDURATION"), d = Number(d.value), b.B = Math.max(d, b.B), b.F = Math.min(d, b.F));
	    }
	    function zh(b) {
	      var c = Mg.nb(b.a, "EXT-X-MAP");if (!c.length) return null;if (1 < c.length) throw new D(2, 4, 4020);c = c[0];var d = ih(c, "URI"),
	          e = Mg.Hc(b.b, d);b = 0;d = null;if (c = Kg(c, "BYTERANGE")) b = c.split("@"), c = Number(b[0]), b = Number(b[1]), d = b + c - 1;return new Sf(function () {
	        return [e];
	      }, b, d);
	    }
	    function Bh(b, c, d, e) {
	      var f = c.b,
	          g = c.a;c = Ah(f, "EXTINF").value.split(",");c = e + Number(c[0]);var h = 0,
	          k = null;if (f = Mg.Ta(f, "EXT-X-BYTERANGE")) h = f.value.split("@"), f = Number(h[0]), h = h[1] ? Number(h[1]) : b.a + 1, k = h + f - 1;return new T(d, e, c, function () {
	        return [g];
	      }, h, k);
	    }function hh(b) {
	      b.c && (b.K.forEach(function (c) {
	        b.c.vb(c, 0);
	      }), b.K = []);
	    }
	    function eh(b, c, d, e, f, g) {
	      return t(function k() {
	        var l, m, n, p, v, x, B, y, G, E, aa;return z(k, function (k) {
	          switch (k.j) {case 1:
	              return l = d.segments, m = [], n = l[0].a, p = Bh(null, l[0], e, 0), v = zh(d), u(k, Ch(b, c, v, p, f, g), 2);case 2:
	              x = k.o;n.split("/").pop();for (var ba = 0; ba < l.length; ++ba) B = l[ba], y = m[m.length - 1], G = 0 == ba ? x : y.endTime, E = e + ba, aa = Bh(y, B, E, G), m.push(aa);b.K.push(m);hh(b);return k["return"](m);}
	        });
	      });
	    }
	    function Dh(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = 1, g = rg(c.c(), c.b, c.b + 2048 - 1, b.a.retryParameters), h = rg(c.c(), c.b, c.a, b.a.retryParameters), za(e, 2), u(e, ah(b, g, f), 4);case 4:
	              return k = e.o, e["return"](k);case 2:
	              l = Ca(e);if (7001 == l.code) throw l;cb("Unable to fetch a partial HLS segment! Falling back to a full segment request, which is expensive!  Your server should support Range requests and CORS preflights.", g.uris[0]);return u(e, ah(b, h, f), 5);case 5:
	              return m = e.o, e["return"](m);}
	        });
	      });
	    }
	    function Ch(b, c, d, e, f, g) {
	      return t(function k() {
	        var l, m, n, p, v, x, B, y, G;return z(k, function (k) {
	          switch (k.j) {case 1:
	              if (b.m && (l = b.b.get(c), m = l.Vb, n = m.get(e.position))) return k["return"](n.startTime);f = f.toLowerCase();if (yh.includes(f)) throw cb("Raw formats are not yet supported.  Skipping " + f), new D(1, 4, 4035);if ("video/webm" == f) throw cb("WebM in HLS is not yet supported.  Skipping."), new D(1, 4, 4035);if ("video/mp4" != f && "audio/mp4" != f) {
	                k.A(2);break;
	              }p = [Dh(b, e)];d && p.push(Dh(b, d));return u(k, Promise.all(p), 3);case 3:
	              return v = k.o, x = v[0], B = v[1] || v[0], k["return"](Eh(c, x.uri, x.data, B.data));case 2:
	              if ("video/mp2t" != f) {
	                k.A(4);break;
	              }return u(k, Dh(b, e), 5);case 5:
	              return y = k.o, k["return"](Fh(c, y.uri, y.data));case 4:
	              if ("application/mp4" != f && !f.startsWith("text/")) {
	                k.A(6);break;
	              }return u(k, Dh(b, e), 7);case 7:
	              return G = k.o, k["return"](Gh(f, g, G.data));case 6:
	              throw new D(2, 4, 4030, c);}
	        });
	      });
	    }
	    function Eh(b, c, d, e) {
	      var f = 0;new R().H("moov", xf).H("trak", xf).H("mdia", xf).fa("mdhd", function (b) {
	        b.reader.M(0 == b.version ? 8 : 16);f = b.reader.G();b.parser.stop();
	      }).parse(e, !0);if (!f) throw new D(2, 4, 4030, b, c);var g = 0,
	          h = !1;new R().H("moof", xf).H("traf", xf).fa("tfdt", function (b) {
	        g = (0 == b.version ? b.reader.G() : b.reader.Bb()) / f;h = !0;b.parser.stop();
	      }).parse(d, !0);if (!h) throw new D(2, 4, 4030, b, c);return g;
	    }
	    function Fh(b, c, d) {
	      function e() {
	        throw new D(2, 4, 4030, b, c);
	      }d = new Q(new DataView(d), 0);for (var f = 0, g = 0;;) if (f = d.ca(), g = d.la(), 71 != g && e(), d.Tb() & 16384 || e(), g = (d.la() & 48) >> 4, 0 != g && 2 != g || e(), 3 == g && (g = d.la(), d.M(g)), 1 != d.G() >> 8) d.seek(f + 188), g = d.la(), 71 != g && (d.seek(f + 192), g = d.la()), 71 != g && (d.seek(f + 204), g = d.la()), 71 != g && e(), d.me(1);else return d.M(3), f = d.la() >> 6, 0 != f && 1 != f || e(), 0 == d.la() && e(), f = d.la(), g = d.Tb(), d = d.Tb(), (1073741824 * ((f & 14) >> 1) + ((g & 65534) << 14 | (d & 65534) >> 1)) / 9E4;
	    }
	    function Gh(b, c, d) {
	      b = oc(b, c);if (!Yd(b)) return 0;c = new Wd(null);Zd(c, b);return c.kc(d);
	    }function mh(b) {
	      var c = new Set(),
	          d = [];b = r(b);for (var e = b.next(); !e.done; e = b.next()) {
	        e = e.value;var f = rc(e)[0];c.has(f) || (d.push(e), c.add(f));
	      }return d;
	    }function nh(b, c) {
	      for (var d = Hh[b], e = 0; e < d.length; e++) for (var f = 0; f < c.length; f++) if (d[e].test(c[f].trim())) return c[f].trim();return "text" == b ? "" : null;
	    }function wh(b, c) {
	      if (1 == c.length) return c[0];var d = nh(b, c);if (null != d) return d;throw new D(2, 4, 4025, c);
	    }
	    function xh(b, c, d, e) {
	      return t(function g() {
	        var h, k, l, m, n, p, v, x, B;return z(g, function (g) {
	          switch (g.j) {case 1:
	              h = xd;k = e.segments[0].a;l = new ib(k);m = l.ja.split(".").pop();n = Ih[c];if (p = n[m]) return g["return"](p);if (c == h.ra) return d && "vtt" != d ? g["return"]("application/mp4") : g["return"]("text/vtt");v = Wb([k], b.a.retryParameters);v.method = "HEAD";return u(g, ah(b, v, 1), 2);case 2:
	              x = g.o;B = x.headers["content-type"];if (!B) throw new D(2, 4, 4021, m);return g["return"](B.split(";")[0]);}
	        });
	      });
	    }
	    function ih(b, c) {
	      var d = b.getAttribute(c);if (!d) throw new D(2, 4, 4023, c);return d.value;
	    }function Ah(b, c) {
	      var d = Mg.Ta(b, c);if (!d) throw new D(2, 4, 4024, c);return d;
	    }
	    var Hh = { audio: [/^vorbis$/, /^opus$/, /^flac$/, /^mp4a/, /^[ae]c-3$/], video: [/^avc/, /^hev/, /^hvc/, /^vp0?[89]/, /^av1$/], text: [/^vtt$/, /^wvtt/, /^stpp/] },
	        yh = ["audio/aac", "audio/ac3", "audio/ec3", "audio/mpeg"],
	        Ih = { audio: { mp4: "audio/mp4", m4s: "audio/mp4", m4i: "audio/mp4", m4a: "audio/mp4", ts: "video/mp2t", aac: "audio/aac", ac3: "audio/ac3", ec3: "audio/ec3", mp3: "audio/mpeg" }, video: { mp4: "video/mp4", m4s: "video/mp4", m4i: "video/mp4", m4v: "video/mp4", ts: "video/mp2t" }, text: { mp4: "application/mp4", m4s: "application/mp4", m4i: "application/mp4",
	        vtt: "text/vtt", ttml: "application/ttml+xml" } };function Zg(b) {
	      t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (!b.f) return d["return"]();za(d, 2);return u(d, b.update(), 4);case 4:
	              e = b.O;b.h.R(e);Ba(d, 0);break;case 2:
	              f = Ca(d);if (!b.f) return d["return"]();f.severity = 1;b.f.onError(f);b.h.R(.1);w(d);}
	        });
	      });
	    }function fh(b, c) {
	      b.g = c;b.c && b.c.Xb(b.g == ch.Qa);b.g != ch.Qa || b.h.stop();
	    }function ah(b, c, d) {
	      if (!b.i) throw new D(2, 7, 7001);c = b.f.networkingEngine.request(d, c);Tb(b.i, c);return c.promise;
	    }
	    var uh = { "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed": function (b) {
	        var c = ih(b, "METHOD");ze("HLS SAMPLE-AES-CENC", "SAMPLE-AES-CENC will no longer be supported, see Issue #1227");if (!["SAMPLE-AES", "SAMPLE-AES-CTR", "SAMPLE-AES-CENC"].includes(c)) return null;c = ih(b, "URI");c = Xg.parse(c);c = new Uint8Array(c.data);c = wd("com.widevine.alpha", [{ initDataType: "cenc", initData: c }]);if (b = Kg(b, "KEYID")) c.keyIds = [b.substr(2).toLowerCase()];return c;
	      } },
	        $g = "VOD",
	        ch = { Qa: $g, xe: "EVENT", Fd: "LIVE" };V.pd("m3u8", Yg);
	    V.Cb("application/x-mpegurl", Yg);V.Cb("application/vnd.apple.mpegurl", Yg);function Jh() {
	      this.a = new Map();
	    }function Kh(b, c, d) {
	      Lh(b, c).text = d;
	    }function Lh(b, c) {
	      b.a.has(c) || b.a.set(c, new Mh());return b.a.get(c);
	    }function Mh() {
	      this.text = this.variant = null;
	    }function Nh(b, c) {
	      this.a = b;this.b = new Set([b]);c = c || [];for (var d = r(c), e = d.next(); !e.done; e = d.next()) this.add(e.value);
	    }Nh.prototype.add = function (b) {
	      return Qh(this.a, b) ? (this.b.add(b), !0) : !1;
	    };function Qh(b, c) {
	      var d;if (!(d = !!b.audio != !!c.audio || !!b.video != !!c.video || b.language != c.language) && (d = b.audio && c.audio)) {
	        d = b.audio;var e = c.audio;d = !(d.channelsCount == e.channelsCount && Rh(d, e) && Sh(d.roles, e.roles));
	      }!d && (d = b.video && c.video) && (d = b.video, e = c.video, d = !(Rh(d, e) && Sh(d.roles, e.roles)));return d ? !1 : !0;
	    }
	    Nh.prototype.values = function () {
	      return this.b.values();
	    };function Rh(b, c) {
	      if (b.mimeType != c.mimeType) return !1;var d = b.codecs.split(",").map(function (b) {
	        return rc(b)[0];
	      }),
	          e = c.codecs.split(",").map(function (b) {
	        return rc(b)[0];
	      });if (d.length != e.length) return !1;d.sort();e.sort();for (var f = 0; f < d.length; f++) if (d[f] != e[f]) return !1;return !0;
	    }
	    function Sh(b, c) {
	      var d = new Set(b),
	          e = new Set(c);d["delete"]("main");e["delete"]("main");if (d.size != e.size) return !1;d = r(d);for (var f = d.next(); !f.done; f = d.next()) if (!e.has(f.value)) return !1;return !0;
	    }function Th(b) {
	      this.a = b;this.b = new Uh(b.language, "", b.audio && b.audio.channelsCount ? b.audio.channelsCount : 0, "");
	    }Th.prototype.create = function (b) {
	      var c = this,
	          d = b.filter(function (b) {
	        return Qh(c.a, b);
	      });return d.length ? new Nh(d[0], d) : this.b.create(b);
	    };function Uh(b, c, d, e, f) {
	      this.f = b;this.c = c;this.a = d;this.b = void 0 === e ? "" : e;this.g = void 0 === f ? "" : f;
	    }
	    Uh.prototype.create = function (b) {
	      var c = [];c = Vh(b, this.f);var d = b.filter(function (b) {
	        return b.primary;
	      });c = c.length ? c : d.length ? d : b;this.c && (b = Wh(c, this.c, this.g), b.length && (c = b));this.a && (b = N.Nd(c, this.a), b.length && (c = b));this.b && (b = Xh(c, this.b), b.length && (c = b));b = new Nh(c[0]);c = r(c);for (d = c.next(); !d.done; d = c.next()) d = d.value, Qh(b.a, d) && b.add(d);return b;
	    };function Vh(b, c) {
	      var d = M(c),
	          e = we(d, b.map(function (b) {
	        return ve(b);
	      }));return e ? b.filter(function (b) {
	        return e == ve(b);
	      }) : [];
	    }
	    function Wh(b, c, d) {
	      return b.filter(function (b) {
	        if (d) {
	          var e = b[d];return e && e.roles.includes(c);
	        }e = b.audio;b = b.video;return e && 0 <= e.roles.indexOf(c) || b && 0 <= b.roles.indexOf(c);
	      });
	    }function Xh(b, c) {
	      return b.filter(function (b) {
	        return b.audio ? b.audio.label.toLowerCase() == c.toLowerCase() : !1;
	      });
	    }function Yh() {
	      this.a = Zh;this.b = new Map().set(Zh, 2).set($h, 1);
	    }function ai(b, c, d) {
	      b.b.set(Zh, d).set($h, c);
	    }var $h = 0,
	        Zh = 1;function bi(b, c) {
	      this.g = b;this.h = ci(b);this.a = b.a.currentTime;this.f = Date.now() / 1E3;this.b = !1;this.i = c;this.c = function () {};
	    }bi.prototype.release = function () {
	      this.g = null;this.c = function () {};
	    };function di(b, c) {
	      b.c = c;
	    }function ei(b) {
	      this.a = b;
	    }function ci(b) {
	      if (b.a.paused || 0 == b.a.playbackRate || null == b.a.buffered) var c = !1;else a: {
	        c = b.a.buffered;b = b.a.currentTime;for (var d = 0; d < c.length; d++) {
	          var e = c.start(d),
	              f = c.end(d);if (!(b < e || b > f - .5)) {
	            c = !0;break a;
	          }
	        }c = !1;
	      }return c;
	    }function fi(b, c, d, e, f) {
	      var g = this;this.a = b;this.u = c;this.s = d;this.l = f;this.f = new K();this.i = !1;this.m = b.readyState;this.c = !1;this.b = e;this.h = !1;this.f.w(b, "waiting", function () {
	        return gi(g);
	      });this.g = new C(function () {
	        gi(g);
	      }).Na(.25);
	    }fi.prototype.release = function () {
	      this.f && (this.f.release(), this.f = null);null != this.g && (this.g.stop(), this.g = null);this.b && (this.b.release(), this.b = null);this.a = this.u = this.l = null;
	    };fi.prototype.jd = function () {
	      this.h = !0;gi(this);
	    };
	    function gi(b) {
	      if (0 != b.a.readyState) {
	        if (b.a.seeking) {
	          if (!b.i) return;
	        } else b.i = !1;if (!b.a.paused) {
	          b.a.readyState != b.m && (b.c = !1, b.m = b.a.readyState);var c = b.s.smallGapLimit,
	              d = b.a.currentTime,
	              e = b.a.buffered;a: {
	            if (e && e.length && !(1 == e.length && 1E-6 > e.end(0) - e.start(0))) {
	              var f = wc("Edge/") || wc("Trident/") || wc("Tizen") || wc("CrKey") ? .5 : .1;for (var g = 0; g < e.length; g++) if (e.start(g) > d && (0 == g || e.end(g - 1) - d <= f)) {
	                f = g;break a;
	              }
	            }f = null;
	          }if (null == f) {
	            if (b.b) {
	              b = b.b;e = b.g;d = ci(e);f = e.a.currentTime;g = Date.now() / 1E3;if (b.a != f || b.h != d) b.f = g, b.a = f, b.h = d, b.b = !1;f = g - b.f;f >= b.i && d && !b.b && (b.c(b.a, f), b.b = !0, b.a = e.a.currentTime);
	            }
	          } else if (0 != f || b.h) {
	            g = e.start(f);var h = b.u.Ca();if (!(g >= h)) {
	              h = g - d;c = h <= c;var k = !1;.001 > h || (c || b.c || (b.c = !0, d = new I("largegap", { currentTime: d, gapSize: h }), d.cancelable = !0, b.l(d), b.s.jumpLargeGaps && !d.defaultPrevented && (k = !0)), !c && !k) || (0 != f && e.end(f - 1), b.a.currentTime = g);
	            }
	          }
	        }
	      }
	    }function hi(b) {
	      var c = this;this.c = b;this.a = new Set();this.b = new C(function () {
	        ii(c, !1);
	      }).Na(.25);
	    }hi.prototype.release = function () {
	      this.b.stop();for (var b = r(this.a), c = b.next(); !c.done; c = b.next()) c.value.release();this.a.clear();
	    };function ii(b, c) {
	      for (var d = r(b.a), e = d.next(); !e.done; e = d.next()) e.value.g(b.c.currentTime, c);
	    }function ji(b) {
	      var c = [];b = r(b);for (var d = b.next(); !d.done; d = b.next()) {
	        d = r(d.value.variants);for (var e = d.next(); !e.done; e = d.next()) c.push(e.value);
	      }return c;
	    }function ki(b, c) {
	      for (var d = null, e = r(b), f = e.next(); !f.done; f = e.next()) f = f.value, c >= f.startTime && (d = f);return d;
	    }function li(b) {
	      this.c = b;this.a = null;this.b = function () {};
	    }li.prototype.release = function () {
	      this.a = this.c = null;this.b = function () {};
	    };li.prototype.g = function (b) {
	      var c = this.a,
	          d = this.c.periods;b = ki(d, b) || d[0];c != b && this.b(b);this.a = b;
	    };function mi(b, c) {
	      b.b = c;
	    }function ni(b) {
	      var c = this;this.a = b;this.f = !1;this.c = this.a.jc();this.b = new C(function () {
	        c.a.Yd(.25 * c.c);
	      });
	    }ni.prototype.release = function () {
	      this.b && (this.b.stop(), this.b = null);this.a = null;
	    };ni.prototype.set = function (b) {
	      this.c = b;oi(this);
	    };function oi(b) {
	      b.b.stop();var c = b.f ? 0 : b.c;if (0 <= c) try {
	        b.a.jc() != c && b.a.wd(c);return;
	      } catch (d) {}b.b.Na(.25);0 != b.a.jc() && b.a.wd(0);
	    }function pi(b, c, d) {
	      this.a = b;this.f = c;this.g = d;this.h = !1;this.b = new K();this.c = new qi(b);0 < b.readyState ? ri(this, d) : si(this, d);
	    }pi.prototype.release = function () {
	      this.b && (this.b.release(), this.b = null);null != this.c && (this.c.release(), this.c = null);this.f = function () {};this.a = null;
	    };function ti(b) {
	      return b.h ? b.a.currentTime : b.g;
	    }function si(b, c) {
	      b.g = c;b.b.ea(b.a, "loadedmetadata");b.b.da(b.a, "loadedmetadata", function () {
	        ri(b, c);
	      });
	    }
	    function ri(b, c) {
	      .001 > Math.abs(b.a.currentTime - c) ? ui(b) : (b.b.da(b.a, "seeking", function () {
	        ui(b);
	      }), vi(b.c, 0 == b.a.currentTime ? c : b.a.currentTime));
	    }function ui(b) {
	      b.h = !0;b.b.w(b.a, "seeking", function () {
	        return b.f();
	      });
	    }function qi(b) {
	      var c = this;this.b = b;this.h = 10;this.g = this.f = this.c = 0;this.a = new C(function () {
	        0 >= c.c ? c.a.stop() : c.b.currentTime != c.f ? c.a.stop() : (c.b.currentTime = c.g, c.c--);
	      });
	    }qi.prototype.release = function () {
	      this.a && (this.a.stop(), this.a = null);this.b = null;
	    };
	    function vi(b, c) {
	      b.f = b.b.currentTime;b.g = c;b.c = b.h;b.b.currentTime = c;b.a.Na(.1);
	    }function wi(b) {
	      function c() {
	        null == d.c ? d.f = !0 : (d.b.da(d.a, "seeking", function () {
	          d.f = !0;
	        }), d.a.currentTime = Math.max(0, d.a.currentTime + d.c));
	      }var d = this;this.a = b;this.f = !1;this.c = null;this.b = new K();0 == this.a.readyState ? this.b.da(this.a, "loadeddata", c) : c();
	    }wi.prototype.release = function () {
	      this.b && (this.b.release(), this.b = null);this.a = null;
	    };wi.prototype.m = function (b) {
	      this.c = this.f ? this.c : b;
	    };wi.prototype.h = function () {
	      return (this.f ? this.a.currentTime : this.c) || 0;
	    };wi.prototype.s = function () {};
	    function xi(b, c, d, e, f, g) {
	      var h = this;this.b = b;this.a = c.presentationTimeline;this.B = c.minBufferTime || 0;this.g = d;this.u = f;this.l = null;this.f = new fi(b, c.presentationTimeline, d, yi(b, d), g);this.c = new pi(b, function () {
	        a: {
	          var b = h.f;b.i = !0;b.h = !1;b.c = !1;var c = ti(h.c);b = zi(h, c);if (.001 < Math.abs(b - c) && (c = new Date().getTime() / 1E3, !h.l || h.l < c - 1)) {
	            h.l = c;c = h.c;0 < c.a.readyState ? vi(c.c, b) : si(c, b);b = void 0;break a;
	          }h.u();b = void 0;
	        }return b;
	      }, Ai(this, e));this.i = new C(function () {
	        if (0 != h.b.readyState && !h.b.paused) {
	          var b = h.b.currentTime,
	              c = h.a.ob(),
	              d = h.a.Ca();3 > d - c && (c = d - 3);b < c && (b = zi(h, b), h.b.currentTime = b);
	        }
	      }).Na(.25);
	    }xi.prototype.release = function () {
	      this.c && (this.c.release(), this.c = null);this.f && (this.f.release(), this.f = null);this.i && (this.i.stop(), this.i = null);this.b = this.c = this.a = this.g = null;this.u = function () {};
	    };xi.prototype.m = function (b) {
	      var c = this.c;0 < c.a.readyState ? vi(c.c, b) : si(c, b);
	    };xi.prototype.h = function () {
	      var b = ti(this.c);return 0 < this.b.readyState && !this.b.paused ? Bi(this, b) : b;
	    };
	    function Ai(b, c) {
	      null == c ? c = Infinity > b.a.Y() ? b.a.ob() : b.a.Ca() : 0 > c && (c = b.a.Ca() + c);return Ci(b, Bi(b, c));
	    }xi.prototype.s = function () {
	      this.f.jd();
	    };function Ci(b, c) {
	      var d = b.a.Y();return c >= d ? d - b.g.durationBackoff : c;
	    }function zi(b, c) {
	      var d = rd.bind(null, b.b.buffered),
	          e = Math.max(b.B, b.g.rebufferingGoal),
	          f = b.g.safeSeekOffset,
	          g = b.a.ob(),
	          h = b.a.Ca(),
	          k = b.a.Y();3 > h - g && (g = h - 3);var l = b.a.Nb(e),
	          m = b.a.Nb(f);e = b.a.Nb(e + f);return c >= k ? Ci(b, c) : c > h ? h : c < g ? d(m) ? m : e : c >= l || d(c) ? c : e;
	    }
	    function Bi(b, c) {
	      var d = b.a.ob();if (c < d) return d;d = b.a.Ca();return c > d ? d : c;
	    }function yi(b, c) {
	      if (!c.stallEnabled) return null;var d = c.stallSkip,
	          e = new bi(new ei(b), c.stallThreshold);di(e, function () {
	        b.currentTime += d;
	      });return e;
	    }function Di() {
	      this.b = function () {};this.a = new Set();
	    }Di.prototype.release = function () {
	      this.b = function () {};this.a.clear();
	    };function Ei(b, c) {
	      b.b = c;
	    }function Fi(b) {
	      var c = this;this.h = b;this.f = new Map();this.a = function () {};this.b = function () {};this.c = function () {};this.i = [{ eb: null, cb: Gi, Wa: function (b, e) {
	          return c.a(b, e);
	        } }, { eb: Hi, cb: Gi, Wa: function (b, e) {
	          return c.a(b, e);
	        } }, { eb: Ii, cb: Gi, Wa: function (b, e) {
	          return c.a(b, e);
	        } }, { eb: Gi, cb: Hi, Wa: function (b, e) {
	          return c.b(b, e);
	        } }, { eb: Gi, cb: Ii, Wa: function (b, e) {
	          return c.b(b, e);
	        } }, { eb: Hi, cb: Ii, Wa: function (b, e) {
	          return c.c(b, e);
	        } }, { eb: Ii, cb: Hi, Wa: function (b, e) {
	          return c.c(b, e);
	        } }];
	    }
	    Fi.prototype.release = function () {
	      this.h = null;this.f.clear();this.a = function () {};this.b = function () {};this.c = function () {};
	    };Fi.prototype.g = function (b, c) {
	      for (var d = r(this.h.a), e = d.next(); !e.done; e = d.next()) {
	        e = e.value;var f = this.f.get(e),
	            g = b < e.startTime ? Hi : b > e.endTime ? Ii : Gi;this.f.set(e, g);for (var h = r(this.i), k = h.next(); !k.done; k = h.next()) k = k.value, k.eb == f && k.cb == g && k.Wa(e, c);
	      }
	    };function Ji(b, c, d, e) {
	      b.a = c;b.b = d;b.c = e;
	    }var Hi = 1,
	        Gi = 2,
	        Ii = 3;function Ki(b, c) {
	      this.a = c;this.c = b;this.g = null;this.l = 1;this.u = Promise.resolve();this.h = [];this.i = new Map();this.b = new Map();this.s = !1;this.F = null;this.D = this.f = this.m = !1;this.B = 0;
	    }Ki.prototype.destroy = function () {
	      for (var b = r(this.b.values()), c = b.next(); !c.done; c = b.next()) Li(c.value);this.b.clear();this.i.clear();this.g = this.h = this.u = this.c = this.a = null;this.f = !0;return Promise.resolve();
	    };
	    Ki.prototype.configure = function (b) {
	      this.g = b;this.F = new Ab({ maxAttempts: Math.max(b.retryParameters.maxAttempts, 2), baseDelay: b.retryParameters.baseDelay, backoffFactor: b.retryParameters.backoffFactor, fuzzFactor: b.retryParameters.fuzzFactor, timeout: 0 }, !0);
	    };
	    Ki.prototype.start = function () {
	      var b = this;return t(function d() {
	        var e, f, g;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = b.a.Ua(), f = Mi(b, e), g = b.a.ae(b.c.periods[f]), g.variant || g.text ? u(d, Ni(b, g.variant ? g.variant.audio : null, g.variant ? g.variant.video : null, g.text, e), 2) : d["return"](new D(2, 5, 5005));case 2:
	              if (b.f) return d["return"]();b.a && b.a.Cf && b.a.Cf();w(d);}
	        });
	      });
	    };function Oi(b) {
	      return Pi(b, "audio");
	    }function Qi(b) {
	      return Pi(b, "video");
	    }
	    function Pi(b, c) {
	      var d = b.b.get(c);return d ? d.Ka || d.stream : null;
	    }
	    function Ri(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n, p, v, x;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = xd, u(e, oe(b.a.L, f.ra), 2);case 2:
	              return b.B++, b.D = !1, g = b.B, h = b.a.L, k = new Map(), l = new Set(), k.set(f.ra, c), l.add(c), u(e, h.init(k, !1), 3);case 3:
	              return b.f ? e["return"]() : u(e, Si(b, l), 4);case 4:
	              if (b.f) return e["return"]();n = (m = b.a.L.g.isTextVisible()) || b.g.alwaysStreamText;b.B != g || b.b.has(f.ra) || b.D || !n || (p = b.a.Ua(), v = Mi(b, p), x = Ti(c, v, 0), b.b.set(f.ra, x), Ui(b, x, 0));w(e);}
	        });
	      });
	    }
	    function Vi(b, c) {
	      var d = b.b.get("video");if (d) {
	        var e = d.stream;if (e) if (c) {
	          var f = e.trickModeVideo;f && !d.Ka && (Wi(b, f, !1, 0, !1), d.Ka = e);
	        } else if (e = d.Ka) d.Ka = null, Wi(b, e, !0, 0, !1);
	      }
	    }function Xi(b, c, d, e) {
	      var f = !1;if (c.video) {
	        var g = Wi(b, c.video, d, e, !1);f = f || g;
	      }c.audio && (b = Wi(b, c.audio, d, e, !1), f = f || b);return f;
	    }
	    function Wi(b, c, d, e, f) {
	      var g = b.b.get(c.type);if (!g && "text" == c.type && b.g.ignoreTextStreamFailures) return Ri(b, c), !0;if (!g) return !1;var h = Yi(b, c),
	          k = Array.from(b.b.values()).every(function (b) {
	        return b.ia == g.ia;
	      });if (d && h != g.ia && k) return b.b.forEach(function (c) {
	        Zi(b, c);
	      }), !0;g.Ka && (c.trickModeVideo ? (g.Ka = c, c = c.trickModeVideo) : g.Ka = null);k = b.h[h];if (!k || !k.Db) return !1;k = b.i.get(c.id);if (!k || !k.Db || g.stream == c && !f) return !1;"text" == c.type && fe(b.a.L, oc(c.mimeType, c.codecs));g.stream = c;g.nc = !0;$i(b, g, h) && g.Rb.abort();
	      d && (g.Ra ? g.Cc = !0 : g.Ja ? (g.Oa = !0, g.dc = e, g.Cc = !0) : (Li(g), aj(b, g, !0, e)["catch"](function (c) {
	        if (b.a) b.a.onError(c);
	      })));return !0;
	    }function $i(b, c, d) {
	      if (!c.Rb) return !1;var e = b.a.Ua(),
	          f = je(b.a.L, c.type),
	          g = bj(b, c, e, f, d);d = g ? g.a ? g.a - g.b : null : null;g && !d && (d = (g.endTime - g.kc()) * c.stream.bandwidth / 8);if (isNaN(d)) return !1;(g = c.stream.initSegmentReference) && (d += (g.a ? g.a - g.b : null) || 0);g = b.a.getBandwidthEstimate();return 8 * d / g < f - e - Math.max(b.c.minBufferTime || 0, b.g.rebufferingGoal) || c.Rb.b.a > d ? !0 : !1;
	    }
	    function cj(b) {
	      function c(c) {
	        var f = b.a.L;"text" == c ? (c = f.a, c = null == c.a || null == c.b ? !1 : d >= c.a && d < c.b) : (c = ie(f, c), c = rd(c, d, e));return c;
	      }var d = b.a.Ua(),
	          e = b.g.smallGapLimit,
	          f = Mi(b, d);if (lc(b.b.values(), function (b) {
	        return b.ia == f;
	      })) for (var g = r(b.b.keys()), h = g.next(); !h.done; h = g.next()) h = h.value, c(h) || Zi(b, b.b.get(h));else lc(b.b.keys(), c) || b.b.forEach(function (c) {
	        Zi(b, c);
	      });
	    }
	    function Zi(b, c) {
	      c.Ra || c.Oa || (c.Ja ? (c.Oa = !0, c.dc = 0) : null == he(b.a.L, c.type) ? null == c.Ga && Ui(b, c, 0) : (Li(c), aj(b, c, !1, 0)["catch"](function (c) {
	        if (b.a) b.a.onError(c);
	      })));
	    }
	    function Ni(b, c, d, e, f) {
	      return t(function h() {
	        var k, l, m, n, p, v, x;return z(h, function (h) {
	          switch (h.j) {case 1:
	              return k = b.a.Ua(), l = Mi(b, k), m = xd, n = new Map(), p = new Set(), c && (n.set(m.Eb, c), p.add(c)), d && (n.set(m.Pa, d), p.add(d)), e && (n.set(m.ra, e), p.add(e)), v = b.a.L, x = b.g.forceTransmuxTS, u(h, v.init(n, x), 2);case 2:
	              if (b.f) return h["return"]();dj(b);return u(h, Si(b, p), 3);case 3:
	              if (b.f) return h["return"]();n.forEach(function (c, d) {
	                if (!b.b.has(d)) {
	                  var e = Ti(c, l, f);b.b.set(d, e);Ui(b, e, 0);
	                }
	              });w(h);}
	        });
	      });
	    }
	    function Ti(b, c, d) {
	      return { stream: b, type: b.type, sb: null, Da: null, Ka: null, nc: !0, ia: c, endOfStream: !1, Ja: !1, Ga: null, Oa: !1, dc: 0, Cc: !1, Ra: !1, od: !1, Pb: !1, rd: d || 0, Rb: null };
	    }
	    function ej(b, c) {
	      var d = b.h[c];if (d) return d.promise;d = { promise: new F(), Db: !1 };b.h[c] = d;for (var e = new Set(), f = r(b.c.periods[c].variants), g = f.next(); !g.done; g = f.next()) g = g.value, g.video && e.add(g.video), g.video && g.video.trickModeVideo && e.add(g.video.trickModeVideo), g.audio && e.add(g.audio);f = r(b.c.periods[c].textStreams);for (g = f.next(); !g.done; g = f.next()) e.add(g.value);b.u = b.u.then(function () {
	        if (!this.f) return Si(this, e);
	      }.bind(b)).then(function () {
	        this.f || (this.h[c].promise.resolve(), this.h[c].Db = !0);
	      }.bind(b))["catch"](function (b) {
	        this.f || (this.h[c].promise["catch"](function () {}), this.h[c].promise.reject(), delete this.h[c], this.a.onError(b));
	      }.bind(b));return d.promise;
	    }
	    function Si(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n;return z(e, function (e) {
	          switch (e.j) {case 1:
	              f = [];for (var p = r(c), x = p.next(); !x.done; x = p.next()) g = x.value, (h = b.i.get(g.id)) ? f.push(h.promise) : (b.i.set(g.id, { promise: new F(), Db: !1 }), f.push(g.createSegmentIndex()));za(e, 2);return u(e, Promise.all(f), 4);case 4:
	              if (b.f) return e["return"]();Ba(e, 3);break;case 2:
	              k = Ca(e);if (b.f) return e["return"]();e = r(c);for (x = e.next(); !x.done; x = e.next()) l = x.value, b.i.get(l.id).promise["catch"](function () {}), b.i.get(l.id).promise.reject(), b.i["delete"](l.id);throw k;case 3:
	              p = r(c);for (x = p.next(); !x.done; x = p.next()) m = x.value, n = b.i.get(m.id), n.Db || (n.promise.resolve(), n.Db = !0);w(e);}
	        });
	      });
	    }function dj(b) {
	      var c = b.c.presentationTimeline.Y();Infinity > c ? b.a.L.xa(c) : b.a.L.xa(Math.pow(2, 32));
	    }
	    function fj(b, c) {
	      if (!b.f && !c.Ja && null != c.Ga && !c.Ra) if (c.Ga = null, c.Oa) aj(b, c, c.Cc, c.dc);else {
	        try {
	          var d = gj(b, c);null != d && (Ui(b, c, d), c.Pb = !1);
	        } catch (e) {
	          hj(b, e);return;
	        }d = Array.from(b.b.values());ij(b, c);b.s && d.every(function (b) {
	          return b.endOfStream;
	        }) && b.a.L.endOfStream().then(function () {
	          if (!this.f) {
	            var b = this.a.L.Y();0 != b && b < this.c.presentationTimeline.Y() && this.c.presentationTimeline.xa(b);
	          }
	        }.bind(b));
	      }
	    }
	    function gj(b, c) {
	      if (jj(c)) return ne(b.a.L, c.stream.originalId || ""), null;var d = b.a.Ua(),
	          e = kj(b, c, d),
	          f = Yi(b, c.stream),
	          g = Mi(b, e),
	          h = ke(b.a.L, c.type, d),
	          k = Math.max(b.c.minBufferTime || 0, b.g.rebufferingGoal, b.g.bufferingGoal) * b.l;if (e >= b.c.presentationTimeline.Y()) return c.endOfStream = !0, "video" == c.type && (e = b.b.get("text")) && "application/cea-608" == e.stream.mimeType && (e.endOfStream = !0), null;c.endOfStream = !1;c.ia = g;if (g != f) return null;if (h >= k) return .5;g = je(b.a.L, c.type);g = bj(b, c, d, g, f);if (!g) return 1;var l = Infinity;Array.from(b.b.values()).forEach(function (c) {
	        jj(c) || (c = kj(b, c, d), l = Math.min(l, c));
	      });if (e >= l + b.c.presentationTimeline.a) return 1;c.rd = 0;lj(b, c, d, f, g);return null;
	    }function kj(b, c, d) {
	      if (!c.sb || !c.Da) return Math.max(d, c.rd);d = Yi(b, c.sb);return b.c.periods[d].startTime + c.Da.endTime;
	    }
	    function bj(b, c, d, e, f) {
	      if (c.Da && c.stream == c.sb) return mj(b, c, f, c.Da.position + 1);c.Da ? (d = Yi(b, c.sb), d = c.stream.findSegmentPosition(Math.max(0, b.c.periods[d].startTime + c.Da.endTime - b.c.periods[f].startTime))) : d = c.stream.findSegmentPosition(Math.max(0, (e || d) - b.c.periods[f].startTime));if (null == d) return null;var g = null;null == e && (g = mj(b, c, f, Math.max(0, d - 1)));return g || mj(b, c, f, d);
	    }
	    function mj(b, c, d, e) {
	      d = b.c.periods[d];c = c.stream.getSegmentReference(e);if (!c) return null;e = b.c.presentationTimeline;b = e.Ob();e = e.pb();return d.startTime + c.endTime < b || d.startTime + c.startTime > e ? null : c;
	    }
	    function lj(b, c, d, e, f) {
	      var g = b.c.periods[e],
	          h = c.stream,
	          k = b.c.presentationTimeline.Y(),
	          l = b.c.periods[e + 1];e = nj(b, c, e, Math.max(0, g.startTime - .1), l ? l.startTime + .01 : k);c.Ja = !0;c.nc = !1;k = oj(b, c, f);Promise.all([e, k]).then(function (b) {
	        if (!this.f && !this.m) return pj(this, c, d, g, h, f, b[1]);
	      }.bind(b)).then(function () {
	        this.f || this.m || (c.Ja = !1, c.od = !1, c.Oa || this.a.jd(), Ui(this, c, 0), qj(this, h));
	      }.bind(b))["catch"](function (b) {
	        this.f || this.m || (c.Ja = !1, "text" == c.type && this.g.ignoreTextStreamFailures ? this.b["delete"]("text") : 7001 == b.code ? (c.Ja = !1, c.Ga = null, Ui(this, c, 0)) : 3017 == b.code ? rj(this, c, b) : (c.Pb = !0, b.severity = 2, hj(this, b)));
	      }.bind(b));
	    }function rj(b, c, d) {
	      if (!Array.from(b.b.values()).some(function (b) {
	        return b != c && b.od;
	      })) {
	        var e = Math.round(100 * b.l);if (20 < e) b.l -= .2;else if (4 < e) b.l -= .04;else {
	          c.Pb = !0;b.m = !0;b.a.onError(d);return;
	        }c.od = !0;
	      }Ui(b, c, 4);
	    }
	    function nj(b, c, d, e, f) {
	      if (!c.nc) return Promise.resolve();d = pe(b.a.L, c.type, b.c.periods[d].startTime - c.stream.presentationTimeOffset, e, f);if (!c.stream.initSegmentReference) return d;b = oj(b, c, c.stream.initSegmentReference).then(function (b) {
	        if (!this.f) return le(this.a.L, c.type, b, null, null, c.stream.closedCaptions && 0 < c.stream.closedCaptions.size);
	      }.bind(b))["catch"](function (b) {
	        c.nc = !0;return Promise.reject(b);
	      });return Promise.all([d, b]);
	    }
	    function pj(b, c, d, e, f, g, h) {
	      var k = f.closedCaptions && 0 < f.closedCaptions.size;null != f.emsgSchemeIdUris && 0 < f.emsgSchemeIdUris.length && new R().fa("emsg", b.K.bind(b, e, g, f.emsgSchemeIdUris)).parse(h);return sj(b, c, d).then(function () {
	        if (!this.f) return le(this.a.L, c.type, h, g.startTime + e.startTime, g.endTime + e.startTime, k);
	      }.bind(b)).then(function () {
	        if (!this.f) return c.sb = f, c.Da = g, Promise.resolve();
	      }.bind(b));
	    }
	    Ki.prototype.K = function (b, c, d, e) {
	      var f = e.reader.md(),
	          g = e.reader.md(),
	          h = e.reader.G(),
	          k = e.reader.G(),
	          l = e.reader.G(),
	          m = e.reader.G();e = e.reader.Za(e.reader.J.byteLength - e.reader.ca());b = b.startTime + c.startTime + k / h;if (d.includes(f)) if ("urn:mpeg:dash:event:2012" == f) this.a.Df();else this.a.onEvent(new I("emsg", { detail: { startTime: b, endTime: b + l / h, schemeIdUri: f, value: g, timescale: h, presentationTimeDelta: k, eventDuration: l, id: m, messageData: e } }));
	    };
	    function sj(b, c, d) {
	      var e = Math.max(b.g.bufferBehind, b.c.presentationTimeline.a),
	          f = he(b.a.L, c.type);if (null == f) return Promise.resolve();d = d - f - e;return 0 >= d ? Promise.resolve() : b.a.L.remove(c.type, f, f + d).then(function () {}.bind(b));
	    }
	    function qj(b, c) {
	      if (!b.s) {
	        var d = Array.from(b.b.values());if (1 != d.length || "text" != d[0].type) b.s = d.every(function (b) {
	          return "text" == b.type ? !0 : !b.Oa && !b.Ra && b.Da;
	        });if (b.s) {
	          d = Yi(b, c);b.h[d] || ej(b, d).then(function () {
	            this.f || this.a.$d();
	          }.bind(b))["catch"](ud.oc);for (d = 0; d < b.c.periods.length; ++d) ej(b, d)["catch"](ud.oc);b.a.Lf && b.a.Lf();
	        }
	      }
	    }
	    function ij(b, c) {
	      var d = Yi(b, c.stream);if (c.ia != d) {
	        var e = c.ia,
	            f = Array.from(b.b.values());f.every(function (b) {
	          return b.ia == e || jj(b);
	        }) && f.every(tj) && ej(b, e).then(function () {
	          if (!this.f && f.every(function (b) {
	            var c = tj(b),
	                d = Yi(this, b.stream);return jj(b) ? !0 : c && b.ia == e && d != e;
	          }.bind(this))) {
	            var b = this.c.periods[e],
	                c = this.a.ae(b),
	                d = new Map();c.variant && c.variant.video && d.set("video", c.variant.video);c.variant && c.variant.audio && d.set("audio", c.variant.audio);c.text && d.set("text", c.text);c = r(this.b.keys());for (var l = c.next(); !l.done; l = c.next()) if (l = l.value, !d.has(l) && "text" != l) {
	              this.a.onError(new D(2, 5, 5005));return;
	            }c = r(Array.from(d.keys()));for (l = c.next(); !l.done; l = c.next()) if (l = l.value, !this.b.has(l)) if ("text" == l) Ni(this, null, null, d.get("text"), b.startTime), d["delete"](l);else {
	              this.a.onError(new D(2, 5, 5005));return;
	            }c = r(Array.from(this.b.keys()));for (l = c.next(); !l.done; l = c.next()) {
	              l = l.value;var m = this.b.get(l),
	                  n = d.get(l);if (n) {
	                var p = jj(m);p && (m.ia = e, m.rd = b.startTime);Wi(this, n, !1, 0, !1);p && jj(m) || Ui(this, this.b.get(l), 0);
	              } else this.b["delete"](l);
	            }this.a.$d();
	          }
	        }.bind(b))["catch"](ud.oc);
	      }
	    }function jj(b) {
	      return b && "text" == b.type && "application/cea-608" == b.stream.mimeType;
	    }function tj(b) {
	      return !b.Ja && null == b.Ga && !b.Oa && !b.Ra;
	    }function Mi(b, c) {
	      var d = ki(b.c.periods, c + yd);return d ? b.c.periods.indexOf(d) : 0;
	    }
	    function Yi(b, c) {
	      for (var d = b.c.periods, e = 0; e < d.length; e++) {
	        for (var f = d[e], g = new Set(), h = r(f.variants), k = h.next(); !k.done; k = h.next()) k = k.value, k.audio && g.add(k.audio), k.video && g.add(k.video), k.video && k.video.trickModeVideo && g.add(k.video.trickModeVideo);f = r(f.textStreams);for (h = f.next(); !h.done; h = f.next()) g.add(h.value);if (g.has(c)) return e;
	      }return -1;
	    }function oj(b, c, d) {
	      d = rg(d.c(), d.b, d.a, b.g.retryParameters);b = b.a.ub.request(1, d);c.Rb = b;return b.promise.then(function (b) {
	        c.Rb = null;return b.data;
	      });
	    }
	    function aj(b, c, d, e) {
	      return t(function g() {
	        var h, k, l;return z(g, function (g) {
	          switch (g.j) {case 1:
	              return c.Oa = !1, c.Cc = !1, c.dc = 0, c.Ra = !0, e ? (k = b.a.Ua(), l = b.a.L.Y(), h = b.a.L.remove(c.type, k + e, l)) : h = oe(b.a.L, c.type).then(function () {
	                if (!this.f && d) return this.a.L.flush(c.type);
	              }.bind(b)), u(g, h, 2);case 2:
	              if (b.f) return g["return"]();c.sb = null;c.Da = null;c.Ra = !1;c.endOfStream = !1;Ui(b, c, 0);w(g);}
	        });
	      });
	    }
	    function Ui(b, c, d) {
	      c.Ga = new zb(function () {
	        return t(function f() {
	          var d;return z(f, function (f) {
	            switch (f.j) {case 1:
	                return za(f, 2), u(f, fj(b, c), 4);case 4:
	                Ba(f, 0);break;case 2:
	                d = Ca(f);if (b.a) b.a.onError(d);w(f);}
	          });
	        });
	      }).R(d);
	    }function Li(b) {
	      null != b.Ga && (b.Ga.stop(), b.Ga = null);
	    }function hj(b, c) {
	      Cb(b.F).then(function () {
	        this.f || (this.a.onError(c), c.handled || this.g.failureCallback(c));
	      }.bind(b));
	    }function uj(b, c, d, e, f, g) {
	      if (200 <= d && 299 >= d && 202 != d) return { uri: f || e, ld: e, data: c, headers: b, fromCache: !!b["x-shaka-from-cache"] };f = null;try {
	        f = Dc(c);
	      } catch (h) {}throw new D(401 == d || 403 == d ? 2 : 1, 1, 1001, e, d, f, b, g);
	    }function vj(b, c, d, e) {
	      var f = new vj.b();mc(c.headers).forEach(function (b, c) {
	        f.append(c, b);
	      });var g = new vj.a(),
	          h = { Id: !1, te: !1 };b = vj.l(b, d, { body: c.body || void 0, headers: f, method: c.method, signal: g.signal, credentials: c.allowCrossSiteCredentials ? "include" : void 0 }, h, e);b = new H(b, function () {
	        h.Id = !0;g.abort();return Promise.resolve();
	      });if (c = c.retryParameters.timeout) {
	        var k = new C(function () {
	          h.te = !0;g.abort();
	        });k.R(c / 1E3);b["finally"](function () {
	          k.stop();
	        });
	      }return b;
	    }A("shaka.net.HttpFetchPlugin", vj);
	    vj.l = function (b, c, d, e, f) {
	      return t(function h() {
	        var k, l, m, n, p, v, x, B, y, G, E, aa, sa, ba;return z(h, function (h) {
	          switch (h.j) {case 1:
	              return k = vj.g, l = vj.c, v = p = 0, x = Date.now(), za(h, 2), u(h, k(b, d), 4);case 4:
	              return m = h.o, B = m.clone().body.getReader(), G = (y = m.headers.get("Content-Length")) ? parseInt(y, 10) : 0, E = function (b) {
	                function c() {
	                  return t(function ha() {
	                    var d, e;return z(ha, function (h) {
	                      switch (h.j) {case 1:
	                          return za(h, 2), u(h, B.read(), 4);case 4:
	                          d = h.o;Ba(h, 3);break;case 2:
	                          return Ca(h), h["return"]();case 3:
	                          d.done || (p += d.value.byteLength);e = Date.now();if (100 < e - x || d.done) f(e - x, p - v, G - p), v = p, x = e;d.done ? b.close() : (b.enqueue(d.value), c());w(h);}
	                    });
	                  });
	                }c();
	              }, new l({ start: E }), u(h, m.arrayBuffer(), 5);case 5:
	              n = h.o;Ba(h, 3);break;case 2:
	              aa = Ca(h);if (e.Id) throw new D(1, 1, 7001, b, c);if (e.te) throw new D(1, 1, 1003, b, c);throw new D(1, 1, 1002, b, aa, c);case 3:
	              return sa = {}, ba = m.headers, ba.forEach(function (b, c) {
	                sa[c.trim()] = b;
	              }), h["return"](uj(sa, n, m.status, b, m.url, c));}
	        });
	      });
	    };
	    vj.isSupported = function () {
	      if (window.ReadableStream) try {
	        new ReadableStream({});
	      } catch (b) {
	        return !1;
	      } else return !1;return !(!window.fetch || !window.AbortController);
	    };vj.isSupported = vj.isSupported;vj.g = window.fetch;vj.a = window.AbortController;vj.c = window.ReadableStream;vj.b = window.Headers;vj.isSupported() && (Vb("http", vj, 2), Vb("https", vj, 2));function wj(b, c, d, e) {
	      var f = new wj.f(),
	          g = Date.now(),
	          h = 0,
	          k = new Promise(function (k, m) {
	        f.open(c.method, b, !0);f.responseType = "arraybuffer";f.timeout = c.retryParameters.timeout;f.withCredentials = c.allowCrossSiteCredentials;f.onabort = function () {
	          m(new D(1, 1, 7001, b, d));
	        };f.onload = function (c) {
	          c = c.target;var e = c.getAllResponseHeaders().trim().split("\r\n"),
	              f = {};e = r(e);for (var g = e.next(); !g.done; g = e.next()) g = g.value.split(": "), f[g[0].toLowerCase()] = g.slice(1).join(": ");try {
	            var h = uj(f, c.response, c.status, b, c.responseURL, d);k(h);
	          } catch (G) {
	            m(G);
	          }
	        };f.onerror = function (c) {
	          m(new D(1, 1, 1002, b, c, d));
	        };f.ontimeout = function () {
	          m(new D(1, 1, 1003, b, d));
	        };f.onprogress = function (b) {
	          var c = Date.now();if (100 < c - g || b.lengthComputable && b.loaded == b.total) e(c - g, b.loaded - h, b.total - b.loaded), h = b.loaded, g = c;
	        };for (var l in c.headers) f.setRequestHeader(l.toLowerCase(), c.headers[l]);f.send(c.body);
	      });return new H(k, function () {
	        f.abort();return Promise.resolve();
	      });
	    }A("shaka.net.HttpXHRPlugin", wj);wj.f = window.XMLHttpRequest;Vb("http", wj, 1);
	    Vb("https", wj, 1);function xj() {
	      this.a = this.f = this.b = 0;this.c = new Map();this.g = 0;
	    }function yj(b, c) {
	      b.b += c;var d = b.g;b.g++;b.c.set(d, c);return d;
	    }xj.prototype.close = function (b, c) {
	      if (this.c.has(b)) {
	        var d = this.c.get(b);this.c["delete"](b);this.f += d;this.a += c;
	      }
	    };function zj(b, c, d) {
	      this.h = b;this.b = new Map();this.c = !1;this.g = c;this.f = d;this.a = new xj();
	    }zj.prototype.destroy = function () {
	      this.c = !0;return Promise.all(this.b.values()).then(function () {}, function () {});
	    };
	    function Aj(b, c, d, e, f, g) {
	      var h = yj(b.a, e);e = b.b.get(c) || Promise.resolve();b.b.set(c, e.then(function () {
	        return t(function l() {
	          var c, e, p, v, x, B;return z(l, function (l) {
	            switch (l.j) {case 1:
	                return u(l, Bj(b, d), 2);case 2:
	                c = l.o;if (b.c) throw new D(2, 9, 7001);if (f) {
	                  e = new Uint8Array(c);p = new Bf(e);for (var m in p.data) v = Number(m), x = p.data[v], B = p.a[v], b.f(x, B);
	                }b.a.close(h, c.byteLength);m = b.a;b.g(0 == m.b ? 0 : m.f / m.b, b.a.a);return l["return"](g(c));}
	          });
	        });
	      }));
	    }
	    function Cj(b) {
	      return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              return u(d, Promise.all(b.b.values()), 2);case 2:
	              return d["return"](b.a.a);}
	        });
	      });
	    }function Bj(b, c) {
	      return t(function e() {
	        var f, g;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = b.h.request(1, c), u(e, f.promise, 2);case 2:
	              return g = e.o, e["return"](g.data);}
	        });
	      });
	    }function Dj(b, c) {
	      var d = this;this.c = b;this.b = b.objectStore(c);this.a = new F();b.onabort = function (b) {
	        b.preventDefault();d.a.reject();
	      };b.onerror = function (b) {
	        b.preventDefault();d.a.reject();
	      };b.oncomplete = function () {
	        d.a.resolve();
	      };
	    }Dj.prototype.abort = function () {
	      try {
	        this.c.abort();
	      } catch (b) {}return this.a["catch"](function () {});
	    };
	    function Ej(b, c) {
	      return new Promise(function (d, e) {
	        var f = b.b.openCursor();f.onerror = e;f.onsuccess = function (b) {
	          b = b.target.result;if (!b) return d();c(b.key, b.value, b);b["continue"]();
	        };
	      });
	    }Dj.prototype.store = function () {
	      return this.b;
	    };Dj.prototype.promise = function () {
	      return this.a;
	    };function Fj(b) {
	      this.b = b;this.a = [];
	    }Fj.prototype.destroy = function () {
	      return Promise.all(this.a.map(function (b) {
	        return b.abort();
	      }));
	    };function Gj(b, c) {
	      return Hj(b, c, "readwrite");
	    }function Hj(b, c, d) {
	      d = b.b.transaction([c], d);var e = new Dj(d, c);b.a.push(e);e.promise().then(function () {
	        Pb(b.a, e);
	      }, function () {
	        Pb(b.a, e);
	      });return e;
	    }function Ij(b, c, d) {
	      this.b = new Fj(b);this.c = c;this.a = d;
	    }q = Ij.prototype;q.destroy = function () {
	      return this.b.destroy();
	    };q.hasFixedKeySpace = function () {
	      return !0;
	    };q.addSegments = function () {
	      return Jj(this.c);
	    };q.removeSegments = function (b, c) {
	      return Kj(this, this.c, b, c);
	    };q.getSegments = function (b) {
	      var c = this;return t(function e() {
	        var f;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return u(e, Lj(c, c.c, b), 2);case 2:
	              return f = e.o, e["return"](f.map(function (b) {
	                return c.Jd(b);
	              }));}
	        });
	      });
	    };q.addManifests = function () {
	      return Jj(this.a);
	    };
	    q.updateManifestExpiration = function (b, c) {
	      var d = Gj(this.b, this.a),
	          e = d.store();e.get(b).onsuccess = function (d) {
	        if (d = d.target.result) d.expiration = c, e.put(d, b);
	      };return d.promise();
	    };q.removeManifests = function (b, c) {
	      return Kj(this, this.a, b, c);
	    };q.getManifests = function (b) {
	      var c = this;return t(function e() {
	        var f;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return u(e, Lj(c, c.a, b), 2);case 2:
	              return f = e.o, e["return"](f.map(function (b) {
	                return c.ec(b);
	              }));}
	        });
	      });
	    };
	    q.getAllManifests = function () {
	      var b = this;return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = Hj(b.b, b.a, "readonly"), f = new Map(), u(d, Ej(e, function (d, e) {
	                f.set(d, b.ec(e));
	              }), 2);case 2:
	              return u(d, e.promise(), 3);case 3:
	              return d["return"](f);}
	        });
	      });
	    };q.Jd = function (b) {
	      return b;
	    };q.ec = function (b) {
	      return b;
	    };function Jj(b) {
	      return Promise.reject(new D(2, 9, 9011, "Cannot add new value to " + b));
	    }
	    q.add = function (b, c) {
	      var d = this;return t(function f() {
	        var g, h, k, l, m;return z(f, function (f) {
	          switch (f.j) {case 1:
	              g = Gj(d.b, b);h = g.store();k = [];for (var n = r(c), v = n.next(); !v.done; v = n.next()) l = v.value, m = h.add(l), m.onsuccess = function (b) {
	                k.push(b.target.result);
	              };return u(f, g.promise(), 2);case 2:
	              return f["return"](k);}
	        });
	      });
	    };
	    function Kj(b, c, d, e) {
	      b = Gj(b.b, c);c = b.store();var f = {};d = r(d);for (var g = d.next(); !g.done; f = { key: f.key }, g = d.next()) f.key = g.value, c["delete"](f.key).onsuccess = function (b) {
	        return function () {
	          return e(b.key);
	        };
	      }(f);return b.promise();
	    }
	    function Lj(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n, p;return z(f, function (f) {
	          switch (f.j) {case 1:
	              g = Hj(b.b, c, "readonly");h = g.store();k = {};l = [];m = {};n = r(d);for (p = n.next(); !p.done; m = { request: m.request, key: m.key }, p = n.next()) m.key = p.value, m.request = h.get(m.key), m.request.onsuccess = function (b) {
	                return function () {
	                  void 0 == b.request.result && l.push(b.key);k[b.key] = b.request.result;
	                };
	              }(m);return u(f, g.promise(), 2);case 2:
	              if (l.length) throw new D(2, 9, 9012, "Could not find values for " + l);return f["return"](d.map(function (b) {
	                return k[b];
	              }));}
	        });
	      });
	    }
	function Mj(b) {
	      this.a = new Fj(b);
	    }Mj.prototype.destroy = function () {
	      return this.a.destroy();
	    };Mj.prototype.getAll = function () {
	      var b = this;return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = Hj(b.a, "session-ids", "readonly"), f = [], u(d, Ej(e, function (b, d) {
	                f.push(d);
	              }), 2);case 2:
	              return u(d, e.promise(), 3);case 3:
	              return d["return"](f);}
	        });
	      });
	    };Mj.prototype.add = function (b) {
	      var c = Gj(this.a, "session-ids"),
	          d = c.store();b = r(b);for (var e = b.next(); !e.done; e = b.next()) d.add(e.value);return c.promise();
	    };
	    Mj.prototype.remove = function (b) {
	      var c = this;return t(function e() {
	        var f;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = Gj(c.a, "session-ids"), u(e, Ej(f, function (c, e, f) {
	                0 <= b.indexOf(e.sessionId) && f["delete"]();
	              }), 2);case 2:
	              return u(e, f.promise(), 0);}
	        });
	      });
	    };function Nj() {
	      this.a = new Map();
	    }Nj.prototype.destroy = function () {
	      for (var b = [], c = r(this.a.values()), d = c.next(); !d.done; d = c.next()) b.push(d.value.destroy());this.a.clear();return Promise.all(b);
	    };Nj.prototype.init = function () {
	      var b = this;Oj.forEach(function (c, d) {
	        var e = c();e && b.a.set(d, e);
	      });for (var c = [], d = r(this.a.values()), e = d.next(); !e.done; e = d.next()) c.push(e.value.init());return Promise.all(c);
	    };
	    function Pj(b) {
	      var c = null;b.a.forEach(function (b, e) {
	        b.getCells().forEach(function (b, d) {
	          b.hasFixedKeySpace() || c || (c = { path: { wa: e, ba: d }, ba: b });
	        });
	      });if (c) return c;throw new D(2, 9, 9013, "Could not find a cell that supports add-operations");
	    }function Qj(b, c) {
	      b.a.forEach(function (b, e) {
	        b.getCells().forEach(function (b, d) {
	          c({ wa: e, ba: d }, b);
	        });
	      });
	    }
	    function Rj(b, c, d) {
	      b = b.a.get(c);if (!b) throw new D(2, 9, 9013, "Could not find mechanism with name " + c);c = b.getCells().get(d);if (!c) throw new D(2, 9, 9013, "Could not find cell with name " + d);return c;
	    }function Sj(b, c) {
	      b.a.forEach(function (b) {
	        c(b.getEmeSessionCell());
	      });
	    }function Tj(b) {
	      var c = Array.from(b.a.keys());if (!c.length) throw new D(2, 9, 9E3, "No supported storage mechanisms found");return b.a.get(c[0]).getEmeSessionCell();
	    }
	    Nj.prototype.erase = function () {
	      var b = this;return t(function d() {
	        var e, f, g;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = Array.from(b.a.values()), f = 0 < e.length, f || (g = Oj, g.forEach(function (b) {
	                (b = b()) && e.push(b);
	              })), u(d, Promise.all(e.map(function (b) {
	                return b.erase();
	              })), 2);case 2:
	              if (f) d.A(0);else return u(d, Promise.all(e.map(function (b) {
	                return b.destroy();
	              })), 0);}
	        });
	      });
	    };function Uj(b, c) {
	      Oj.set(b, c);
	    }A("shaka.offline.StorageMuxer.register", Uj);A("shaka.offline.StorageMuxer.unregister", function (b) {
	      Oj["delete"](b);
	    });
	    var Oj = new Map();function Vj(b) {
	      Ij.apply(this, arguments);
	    }va(Vj, Ij);Vj.prototype.updateManifestExpiration = function (b, c) {
	      var d = Gj(this.b, this.a),
	          e = d.store(),
	          f = new F();e.get(b).onsuccess = function (d) {
	        (d = d.target.result) ? (d.expiration = c, e.put(d), f.resolve()) : f.reject(new D(2, 9, 9012, "Could not find values for " + b));
	      };return d.promise().then(function () {
	        return f;
	      });
	    };
	    Vj.prototype.ec = function (b) {
	      return { originalManifestUri: b.originalManifestUri, duration: b.duration, size: b.size, expiration: null == b.expiration ? Infinity : b.expiration, periods: b.periods.map(Wj), sessionIds: b.sessionIds, drmInfo: b.drmInfo, appMetadata: b.appMetadata };
	    };function Wj(b) {
	      Xj(b);b.streams.forEach(function () {});return { startTime: b.startTime, streams: b.streams.map(Yj) };
	    }
	    function Yj(b) {
	      var c = b.initSegmentUri ? Zj(b.initSegmentUri) : null;return { id: b.id, originalId: null, primary: b.primary, presentationTimeOffset: b.presentationTimeOffset, contentType: b.contentType, mimeType: b.mimeType, codecs: b.codecs, frameRate: b.frameRate, pixelAspectRatio: void 0, kind: b.kind, language: b.language, label: b.label, width: b.width, height: b.height, initSegmentKey: c, encrypted: b.encrypted, keyId: b.keyId, segments: b.segments.map(ak), variantIds: b.variantIds };
	    }
	    function ak(b) {
	      var c = Zj(b.uri);return { startTime: b.startTime, endTime: b.endTime, dataKey: c };
	    }Vj.prototype.Jd = function (b) {
	      return { data: b.data };
	    };function Zj(b) {
	      var c;if ((c = /^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(b)) || (c = /^offline:segment\/([0-9]+)$/.exec(b))) return Number(c[1]);throw new D(2, 9, 9004, "Could not parse uri " + b);
	    }
	    function Xj(b) {
	      var c = b.streams.filter(function (b) {
	        return "audio" == b.contentType;
	      }),
	          d = b.streams.filter(function (b) {
	        return "video" == b.contentType;
	      });if (!c.every(function (b) {
	        return b.variantIds;
	      }) || !d.every(function (b) {
	        return b.variantIds;
	      })) {
	        c.forEach(function (b) {
	          b.variantIds = [];
	        });d.forEach(function (b) {
	          b.variantIds = [];
	        });var e = 0;if (d.length && !c.length) {
	          var f = e++;d.forEach(function (b) {
	            b.variantIds.push(f);
	          });
	        }if (!d.length && c.length) {
	          var g = e++;c.forEach(function (b) {
	            b.variantIds.push(g);
	          });
	        }d.length && c.length && c.forEach(function (b) {
	          d.forEach(function (c) {
	            var d = e++;b.variantIds.push(d);c.variantIds.push(d);
	          });
	        });
	      }
	    }function bk(b, c, d, e) {
	      Ij.call(this, b, c, d);this.f = e;
	    }va(bk, Ij);bk.prototype.hasFixedKeySpace = function () {
	      return this.f;
	    };bk.prototype.addSegments = function (b) {
	      return this.f ? Jj(this.c) : this.add(this.c, b);
	    };bk.prototype.addManifests = function (b) {
	      return this.f ? Jj(this.a) : this.add(this.a, b);
	    };bk.prototype.ec = function (b) {
	      null == b.expiration && (b.expiration = Infinity);return b;
	    };function ck() {
	      this.g = this.c = this.b = this.a = this.f = null;
	    }q = ck.prototype;
	    q.init = function () {
	      var b = this,
	          c = new F(),
	          d = window.indexedDB.open("shaka_offline_db", 4);d.onsuccess = function (d) {
	        d = d.target.result;b.f = d;var e = d.objectStoreNames;e = e.contains("manifest") && e.contains("segment") ? new Vj(d, "segment", "manifest") : null;b.a = e;e = d.objectStoreNames;e = e.contains("manifest-v2") && e.contains("segment-v2") ? new bk(d, "segment-v2", "manifest-v2", !0) : null;b.b = e;e = d.objectStoreNames;e = e.contains("manifest-v3") && e.contains("segment-v3") ? new bk(d, "segment-v3", "manifest-v3", !1) : null;b.c = e;d = d.objectStoreNames.contains("session-ids") ? new Mj(d) : null;b.g = d;c.resolve();
	      };d.onupgradeneeded = function (b) {
	        b = b.target.result;for (var c = r(["segment-v3", "manifest-v3", "session-ids"]), d = c.next(); !d.done; d = c.next()) d = d.value, b.objectStoreNames.contains(d) || b.createObjectStore(d, { autoIncrement: !0 });
	      };d.onerror = function (b) {
	        c.reject(new D(2, 9, 9001, d.error));b.preventDefault();
	      };return c;
	    };
	    q.destroy = function () {
	      var b = this;return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (!b.a) {
	                d.A(2);break;
	              }return u(d, b.a.destroy(), 2);case 2:
	              if (!b.b) {
	                d.A(4);break;
	              }return u(d, b.b.destroy(), 4);case 4:
	              if (!b.c) {
	                d.A(6);break;
	              }return u(d, b.c.destroy(), 6);case 6:
	              if (!b.g) {
	                d.A(8);break;
	              }return u(d, b.g.destroy(), 8);case 8:
	              b.f && b.f.close(), w(d);}
	        });
	      });
	    };q.getCells = function () {
	      var b = new Map();this.a && b.set("v1", this.a);this.b && b.set("v2", this.b);this.c && b.set("v3", this.c);return b;
	    };q.getEmeSessionCell = function () {
	      return this.g;
	    };
	    q.erase = function () {
	      var b = this;return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (!b.a) {
	                d.A(2);break;
	              }return u(d, b.a.destroy(), 2);case 2:
	              if (!b.b) {
	                d.A(4);break;
	              }return u(d, b.b.destroy(), 4);case 4:
	              if (!b.c) {
	                d.A(6);break;
	              }return u(d, b.c.destroy(), 6);case 6:
	              return b.f && b.f.close(), u(d, dk(), 8);case 8:
	              return b.f = null, b.a = null, b.b = null, b.c = null, u(d, b.init(), 0);}
	        });
	      });
	    };
	    function dk() {
	      var b = new F(),
	          c = window.indexedDB.deleteDatabase("shaka_offline_db");c.onblocked = function () {};c.onsuccess = function () {
	        b.resolve();
	      };c.onerror = function (d) {
	        b.reject(new D(2, 9, 9001, c.error));d.preventDefault();
	      };return b;
	    }Uj("idb", function () {
	      return window.indexedDB ? new ck() : null;
	    });function ek(b, c, d, e) {
	      this.a = b;this.g = c;this.f = d;this.c = e;this.b = ["offline:", b, "/", c, "/", d, "/", e].join("");
	    }ek.prototype.wa = function () {
	      return this.g;
	    };ek.prototype.ba = function () {
	      return this.f;
	    };ek.prototype.key = function () {
	      return this.c;
	    };ek.prototype.toString = function () {
	      return this.b;
	    };
	    function fk(b) {
	      b = /^offline:([a-z]+)\/([^/]+)\/([^/]+)\/([0-9]+)$/.exec(b);if (null == b) return null;var c = b[1];if ("manifest" != c && "segment" != c) return null;var d = b[2];if (!d) return null;var e = b[3];return e && null != c ? new ek(c, d, e, Number(b[4])) : null;
	    }function gk(b, c) {
	      this.b = b;this.a = c;
	    }function hk(b, c) {
	      var d = new W(null, 0);d.xa(c.duration);var e = c.periods.map(function (c) {
	        return ik(b, c, d);
	      }),
	          f = c.drmInfo ? [c.drmInfo] : [];c.drmInfo && e.forEach(function (b) {
	        b.variants.forEach(function (b) {
	          b.drmInfos = f;
	        });
	      });return { presentationTimeline: d, minBufferTime: 2, offlineSessionIds: c.sessionIds, periods: e };
	    }
	    function ik(b, c, d) {
	      var e = c.streams.filter(function (b) {
	        return "audio" == b.contentType;
	      }),
	          f = c.streams.filter(function (b) {
	        return "video" == b.contentType;
	      });e = jk(b, e, f);f = c.streams.filter(function (b) {
	        return "text" == b.contentType;
	      }).map(function (c) {
	        return kk(b, c);
	      });c.streams.forEach(function (e) {
	        e = e.segments.map(function (c, d) {
	          return lk(b, d, c);
	        });d.vb(e, c.startTime);
	      });return { startTime: c.startTime, variants: Array.from(e.values()), textStreams: f };
	    }
	    function jk(b, c, d) {
	      for (var e = new Set(), f = r(c), g = f.next(); !g.done; g = f.next()) {
	        var h = r(g.value.variantIds);for (g = h.next(); !g.done; g = h.next()) e.add(g.value);
	      }f = r(d);for (g = f.next(); !g.done; g = f.next()) for (h = r(g.value.variantIds), g = h.next(); !g.done; g = h.next()) e.add(g.value);f = new Map();e = r(e);for (g = e.next(); !g.done; g = e.next()) g = g.value, f.set(g, { id: g, language: "", primary: !1, audio: null, video: null, bandwidth: 0, drmInfos: [], allowedByApplication: !0, allowedByKeySystem: !0 });c = r(c);for (e = c.next(); !e.done; e = c.next()) for (e = e.value, g = kk(b, e), h = r(e.variantIds), e = h.next(); !e.done; e = h.next()) e = f.get(e.value), e.language = g.language, e.primary = e.primary || g.primary, e.audio = g;d = r(d);for (c = d.next(); !c.done; c = d.next()) for (e = c.value, c = kk(b, e), g = r(e.variantIds), e = g.next(); !e.done; e = g.next()) e = f.get(e.value), e.primary = e.primary || c.primary, e.video = c;return f;
	    }
	    function kk(b, c) {
	      var d = c.segments.map(function (c, d) {
	        return lk(b, d, c);
	      }),
	          e = new U(d);d = { id: c.id, originalId: c.originalId, createSegmentIndex: function () {
	          return Promise.resolve();
	        }, findSegmentPosition: function (b) {
	          return e.find(b);
	        }, getSegmentReference: function (b) {
	          return e.get(b);
	        }, initSegmentReference: null, presentationTimeOffset: c.presentationTimeOffset, mimeType: c.mimeType, codecs: c.codecs, width: c.width || void 0, height: c.height || void 0, frameRate: c.frameRate || void 0, pixelAspectRatio: c.pixelAspectRatio || void 0,
	        kind: c.kind, encrypted: c.encrypted, keyId: c.keyId, language: c.language, label: c.label || null, type: c.contentType, primary: c.primary, trickModeVideo: null, emsgSchemeIdUris: null, roles: [], channelsCount: null, audioSamplingRate: null, closedCaptions: null };null != c.initSegmentKey && (d.initSegmentReference = mk(b, c.initSegmentKey));return d;
	    }function lk(b, c, d) {
	      var e = new ek("segment", b.b, b.a, d.dataKey);return new T(c, d.startTime, d.endTime, function () {
	        return [e.toString()];
	      }, 0, null);
	    }
	    function mk(b, c) {
	      var d = new ek("segment", b.b, b.a, c);return new Sf(function () {
	        return [d.toString()];
	      }, 0, null);
	    }function nk() {
	      this.a = null;
	    }q = nk.prototype;q.configure = function () {};
	    q.start = function (b) {
	      var c = this;return t(function e() {
	        var f, g, h, k, l, m;return z(e, function (e) {
	          switch (e.j) {case 1:
	              f = fk(b);c.a = f;if (null == f || "manifest" != f.a) return e["return"](Promise.reject(new D(2, 1, 9004, f)));g = new Nj();Aa(e, 2);return u(e, g.init(), 4);case 4:
	              return u(e, Rj(g, f.wa(), f.ba()), 5);case 5:
	              return h = e.o, u(e, h.getManifests([f.key()]), 6);case 6:
	              return k = e.o, l = k[0], m = new gk(f.wa(), f.ba()), e["return"](hk(m, l));case 2:
	              return Fa(e), u(e, g.destroy(), 7);case 7:
	              Ga(e, 0);}
	        });
	      });
	    };q.stop = function () {
	      return Promise.resolve();
	    };
	    q.update = function () {};
	    q.onExpirationUpdated = function (b, c) {
	      var d = this;return t(function f() {
	        var g, h, k, l, m, n, p;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = d.a, h = new Nj(), za(f, 2, 3), u(f, h.init(), 5);case 5:
	              return u(f, Rj(h, g.wa(), g.ba()), 6);case 6:
	              return k = f.o, u(f, k.getManifests([g.key()]), 7);case 7:
	              l = f.o;m = l[0];n = m.sessionIds.includes(b);p = void 0 == m.expiration || m.expiration > c;if (!n || !p) {
	                f.A(3);break;
	              }return u(f, k.updateManifestExpiration(g.key(), c), 3);case 3:
	              return Fa(f), u(f, h.destroy(), 10);case 10:
	              Ga(f, 0);break;case 2:
	              Ca(f), f.A(3);}
	        });
	      });
	    };V.Cb("application/x-offline-manifest", nk);function ok(b) {
	      var c = fk(b);return c && "manifest" == c.a ? ok.h(b) : c && "segment" == c.a ? ok.i(c.key(), c) : Db(new D(2, 1, 9004, b));
	    }A("shaka.offline.OfflineScheme", ok);ok.h = function (b) {
	      b = { uri: b, ld: b, data: new ArrayBuffer(0), headers: { "content-type": "application/x-offline-manifest" } };return Hb(b);
	    };ok.i = function (b, c) {
	      var d = new Nj();return Hb(void 0).U(function () {
	        return d.init();
	      }).U(function () {
	        return Rj(d, c.wa(), c.ba());
	      }).U(function (b) {
	        return b.getSegments([c.key()]);
	      }).U(function (b) {
	        return { uri: c, ld: c, data: b[0].data, headers: {} };
	      })["finally"](function () {
	        return d.destroy();
	      });
	    };
	    Vb("offline", ok);function pk(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n;return z(f, function (f) {
	          switch (f.j) {case 1:
	              g = [];for (var p = [], x = r(d), B = x.next(); !B.done; B = x.next()) {
	                B = B.value;for (var y = !1, G = r(p), E = G.next(); !E.done; E = G.next()) if (E = E.value, qk(E.info, B)) {
	                  E.sessionIds.push(B.sessionId);y = !0;break;
	                }y || p.push({ info: B, sessionIds: [B.sessionId] });
	              }h = r(p);k = h.next();case 2:
	              if (k.done) {
	                f.A(4);break;
	              }l = k.value;m = rk(b, c, l);return u(f, m, 5);case 5:
	              n = f.o;g = g.concat(n);k = h.next();f.A(2);break;case 4:
	              return f["return"](g);}
	        });
	      });
	    }
	    function rk(b, c, d) {
	      return t(function f() {
	        var g, h;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = new Gc({ ub: c, onError: function () {}, qc: function () {}, onExpirationUpdated: function () {}, onEvent: function () {} }), za(f, 2), g.configure(b), u(f, Oc(g, d.info.keySystem, d.info.licenseUri, d.info.serverCertificate, d.info.audioCapabilities, d.info.videoCapabilities), 4);case 4:
	              Ba(f, 3);break;case 2:
	              return Ca(f), u(f, g.destroy(), 5);case 5:
	              return f["return"]([]);case 3:
	              return za(f, 6), u(f, Vc(g), 8);case 8:
	              Ba(f, 7);break;case 6:
	              return Ca(f), u(f, g.destroy(), 9);case 9:
	              return f["return"]([]);case 7:
	              return h = [], u(f, Promise.all(d.sessionIds.map(function (b) {
	                return t(function n() {
	                  return z(n, function (c) {
	                    switch (c.j) {case 1:
	                        return za(c, 2), u(c, Yc(g, b), 4);case 4:
	                        h.push(b);Ba(c, 0);break;case 2:
	                        Ca(c), w(c);}
	                  });
	                });
	              })), 10);case 10:
	              return u(f, g.destroy(), 11);case 11:
	              return f["return"](h);}
	        });
	      });
	    }
	    function qk(b, c) {
	      function d(b, c) {
	        return b.robustness == c.robustness && b.contentType == c.contentType;
	      }return b.keySystem == c.keySystem && b.licenseUri == c.licenseUri && Rb(b.audioCapabilities, c.audioCapabilities, d) && Rb(b.videoCapabilities, c.videoCapabilities, d);
	    }function sk(b, c) {
	      var d = tk(),
	          e = this;this.g = c;this.c = b;this.i = d;this.h = null;this.f = [];this.b = this.a = null;this.l = !0;this.m = Promise.resolve().then(function () {
	        return uk(e);
	      });
	    }sk.prototype.destroy = function () {
	      var b = this;return t(function d() {
	        var e;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.l = !1, b.b && b.b.abort(), vk(b), u(d, b.m, 2);case 2:
	              b.a && b.a.va.Ya();for (var f = r(b.f), h = f.next(); !h.done; h = f.next()) e = h.value, e.va.Ya();b.a = null;b.f = [];b.g = null;w(d);}
	        });
	      });
	    };
	    function wk(b, c) {
	      var d = { wb: function () {}, pc: function () {}, Ya: function () {}, onError: function () {}, rc: function () {}, Jg: function () {} };b.f.push({ create: c, va: d });b.b && b.b.abort();vk(b);return d;
	    }
	    function uk(b) {
	      return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (b.l) {
	                if (0 == b.f.length || b.a && !b.a.Va) var e = !1;else {
	                  b.a && (b.a.va.Ya(), b.a = null);e = b.f.shift();var g = e.create(b.i);g ? (e.va.wb(), b.a = { node: g.node, payload: g.payload, Va: g.Va, va: e.va }) : e.va.rc();e = !0;
	                }e ? e = Promise.resolve() : b.a ? e = xk(b) : (b.g.Bf(b.c), b.h = new F(), e = b.h);return u(d, e, 1);
	              }d.A(0);}
	        });
	      });
	    }
	    function xk(b) {
	      return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.c = b.g.cf(b.c, b.i, b.a.node, b.a.payload), za(d, 2), b.b = b.g.Le(b.c, b.i, b.a.payload), u(d, b.b.promise, 4);case 4:
	              b.b = null;b.c == b.a.node && (b.a.va.pc(), b.a = null);Ba(d, 0);break;case 2:
	              e = Ca(d);if (7001 == e.code) b.a.va.Ya();else b.a.va.onError(e);b.a = null;b.b = null;f = b;return u(d, b.g.handleError(b.i, e), 5);case 5:
	              f.c = d.o, w(d);}
	        });
	      });
	    }function vk(b) {
	      b.h && (b.h.resolve(), b.h = null);
	    }function yk(b) {
	      this.a = null;for (var c = 0; c < b.textTracks.length; ++c) {
	        var d = b.textTracks[c];d.mode = "disabled";"Shaka Player TextTrack" == d.label && (this.a = d);
	      }this.a || (this.a = b.addTextTrack("subtitles", "Shaka Player TextTrack"));this.a.mode = "hidden";
	    }A("shaka.text.SimpleTextDisplayer", yk);yk.prototype.remove = function (b, c) {
	      if (!this.a) return !1;zk(this.a, function (d) {
	        return d.startTime < c && d.endTime > b;
	      });return !0;
	    };yk.prototype.remove = yk.prototype.remove;
	    yk.prototype.append = function (b) {
	      for (var c = Ak, d = [], e = 0; e < b.length; e++) {
	        var f = c(b[e]);f && d.push(f);
	      }d.slice().sort(function (b, c) {
	        return b.startTime != c.startTime ? b.startTime - c.startTime : b.endTime != c.endTime ? b.endTime - c.startTime : d.indexOf(c) - d.indexOf(b);
	      }).forEach(function (b) {
	        this.a.addCue(b);
	      }.bind(this));
	    };yk.prototype.append = yk.prototype.append;yk.prototype.destroy = function () {
	      this.a && zk(this.a, function () {
	        return !0;
	      });this.a = null;return Promise.resolve();
	    };yk.prototype.destroy = yk.prototype.destroy;
	    yk.prototype.isTextVisible = function () {
	      return "showing" == this.a.mode;
	    };yk.prototype.isTextVisible = yk.prototype.isTextVisible;yk.prototype.setTextVisibility = function (b) {
	      this.a.mode = b ? "showing" : "hidden";
	    };yk.prototype.setTextVisibility = yk.prototype.setTextVisibility;
	    function Ak(b) {
	      if (b.startTime >= b.endTime) return null;var c = new VTTCue(b.startTime, b.endTime, b.payload);c.lineAlign = b.lineAlign;c.positionAlign = b.positionAlign;c.size = b.size;try {
	        c.align = b.textAlign;
	      } catch (d) {}"center" == b.textAlign && "center" != c.align && (c.align = "middle");"vertical-lr" == b.writingMode ? c.vertical = "lr" : "vertical-rl" == b.writingMode && (c.vertical = "rl");1 == b.lineInterpretation && (c.snapToLines = !1);null != b.line && (c.line = b.line);null != b.position && (c.position = b.position);return c;
	    }
	    function zk(b, c) {
	      var d = b.mode;b.mode = "showing" == d ? "showing" : "hidden";for (var e = b.cues, f = e.length - 1; 0 <= f; f--) {
	        var g = e[f];g && c(g) && b.removeCue(g);
	      }b.mode = d;
	    }function Bk(b, c, d, e, f) {
	      var g = f in e,
	          h = !0,
	          k;for (k in c) {
	        var l = f + "." + k,
	            m = g ? e[f] : d[k];g || k in d ? void 0 === c[k] ? void 0 === m || g ? delete b[k] : b[k] = Nb(m) : m.constructor == Object && c[k] && c[k].constructor == Object ? (b[k] || (b[k] = Nb(m)), l = Bk(b[k], c[k], m, e, l), h = h && l) : typeof c[k] != typeof m || null == c[k] || "function" != typeof c[k] && c[k].constructor != m.constructor ? (bb("Invalid config, wrong type for " + l), h = !1) : ("function" == typeof d[k] && d[k].length != c[k].length && cb("Unexpected number of arguments for " + l), b[k] = c[k]) : (bb("Invalid config, unrecognized key " + l), h = !1);
	      }return h;
	    }A("shaka.util.ConfigUtils.mergeConfigObjects", Bk);function Ck(b, c) {
	      for (var d = {}, e = d, f = 0, g = 0;;) {
	        f = b.indexOf(".", f);if (0 > f) break;if (0 == f || "\\" != b[f - 1]) g = b.substring(g, f).replace(/\\\./g, "."), e[g] = {}, e = e[g], g = f + 1;f += 1;
	      }e[b.substring(g).replace(/\\\./g, ".")] = c;return d;
	    }A("shaka.util.ConfigUtils.convertToConfigObject", Ck);function Dk() {}A("shaka.util.PlayerConfiguration", Dk);
	    function Ek() {
	      var b = 5E5,
	          c = Infinity;navigator.connection && (b = 1E6 * navigator.connection.downlink, navigator.connection.saveData && (c = 360));var d = { retryParameters: Bb(), servers: {}, clearKeys: {}, advanced: {}, delayLicenseRequestUntilPlayed: !1, initDataTransform: fd, fairPlayTransform: !0 },
	          e = { retryParameters: Bb(), availabilityWindowOverride: NaN, disableAudio: !1, disableVideo: !1, disableText: !1, dash: { customScheme: function (b) {
	            if (b) return null;
	          }, clockSyncUri: "", ignoreDrmInfo: !1, xlinkFailGracefully: !1, defaultPresentationDelay: 10,
	          ignoreMinBufferTime: !1, autoCorrectDrift: !0, ignoreSuggestedPresentationDelay: !1, ignoreEmptyAdaptationSet: !1 }, hls: { ignoreTextStreamFailures: !1 } },
	          f = { retryParameters: Bb(), failureCallback: function (b) {
	          return [b];
	        }, rebufferingGoal: 2, bufferingGoal: 10, bufferBehind: 30, ignoreTextStreamFailures: !1, alwaysStreamText: !1, startAtSegmentBoundary: !1, smallGapLimit: .5, jumpLargeGaps: !1, durationBackoff: 1, forceTransmuxTS: !1, safeSeekOffset: 5, stallEnabled: !0, stallThreshold: 1, stallSkip: .1, useNativeHlsOnSafari: !0 };wc("Web0S") && (f.stallEnabled = !1);var g = { trackSelectionCallback: function (b) {
	          return t(function m() {
	            return z(m, function (c) {
	              switch (c.j) {case 1:
	                  return c["return"](b);}
	            });
	          });
	        }, progressCallback: function (b, c) {
	          return [b, c];
	        }, usePersistentLicense: !0 },
	          h = { drm: d, manifest: e, streaming: f, offline: g, abrFactory: O, abr: { enabled: !0, defaultBandwidthEstimate: b, switchInterval: 8, bandwidthUpgradeTarget: .85, bandwidthDowngradeTarget: .95, restrictions: { minWidth: 0, maxWidth: Infinity, minHeight: 0, maxHeight: c, minPixels: 0, maxPixels: Infinity, minFrameRate: 0,
	            maxFrameRate: Infinity, minBandwidth: 0, maxBandwidth: Infinity } }, preferredAudioLanguage: "", preferredTextLanguage: "", preferredVariantRole: "", preferredTextRole: "", preferredAudioChannelCount: 2, restrictions: { minWidth: 0, maxWidth: Infinity, minHeight: 0, maxHeight: Infinity, minPixels: 0, maxPixels: Infinity, minFrameRate: 0, maxFrameRate: Infinity, minBandwidth: 0, maxBandwidth: Infinity }, playRangeStart: 0, playRangeEnd: Infinity, textDisplayFactory: function () {
	          return null;
	        } };g.trackSelectionCallback = function (b) {
	        return t(function m() {
	          return z(m, function (c) {
	            switch (c.j) {case 1:
	                return c["return"](Fk(b, h.preferredAudioLanguage));}
	          });
	        });
	      };return h;
	    }function Gk(b, c, d) {
	      var e = { ".drm.servers": "", ".drm.clearKeys": "", ".drm.advanced": { distinctiveIdentifierRequired: !1, persistentStateRequired: !1, videoRobustness: "", audioRobustness: "", serverCertificate: new Uint8Array(0), individualizationServer: "" } };return Bk(b, c, d || Ek(), e, "");
	    }Dk.mergeConfigObjects = Gk;
	    function Fk(b, c) {
	      var d = b.filter(function (b) {
	        return "variant" == b.type;
	      }),
	          e = [],
	          f = we(c, d.map(function (b) {
	        return b.language;
	      }));f && (e = d.filter(function (b) {
	        return M(b.language) == f;
	      }));0 == e.length && (e = d.filter(function (b) {
	        return b.primary;
	      }));0 == e.length && (d.map(function (b) {
	        return b.language;
	      }), e = d);var g = e.filter(function (b) {
	        return b.height && 480 >= b.height;
	      });g.length && (g.sort(function (b, c) {
	        return c.height - b.height;
	      }), e = g.filter(function (b) {
	        return b.height == g[0].height;
	      }));d = [];if (e.length) {
	        var h = Math.floor(e.length / 2);e.sort(function (b, c) {
	          return b.bandwidth - c.bandwidth;
	        });d.push(e[h]);
	      }e = r(b);for (h = e.next(); !h.done; h = e.next()) h = h.value, "text" == h.type && d.push(h);return d;
	    }function Hk() {
	      this.a = null;this.b = [];
	    }function Ik(b, c) {
	      if (null == b.a) b.a = { timestamp: Date.now() / 1E3, state: c, duration: 0 };else {
	        var d = Date.now() / 1E3;b.a.duration = d - b.a.timestamp;b.a.state != c && (b.b.push(b.a), b.a = { timestamp: d, state: c, duration: 0 });
	      }
	    }function Jk(b, c) {
	      var d = 0;b.a && b.a.state == c && (d += b.a.duration);for (var e = r(b.b), f = e.next(); !f.done; f = e.next()) f = f.value, d += f.state == c ? f.duration : 0;return d;
	    }
	    function Kk(b) {
	      function c(b) {
	        return { timestamp: b.timestamp, state: b.state, duration: b.duration };
	      }for (var d = [], e = r(b.b), f = e.next(); !f.done; f = e.next()) d.push(c(f.value));b.a && d.push(c(b.a));return d;
	    }function Lk() {
	      this.b = this.c = null;this.a = [];
	    }function Mk() {
	      this.f = this.s = this.h = this.b = this.i = this.l = this.m = this.g = this.u = NaN;this.a = new Hk();this.c = new Lk();
	    }function Y(b, c) {
	      var d = this;Mb.call(this);this.i = Nk;this.a = null;this.gb = !1;this.g = new K();this.Dc = this.l = this.Fb = this.b = this.s = this.f = this.Yb = this.B = this.Zb = this.W = this.ib = this.m = this.D = this.h = this.K = null;this.Xd = 1E9;this.ac = new Set();this.kb = !0;this.pa = null;this.Ud = !1;this.Rd = 0;this.oa = null;this.$ = new Jh();this.c = Ok(this);this.bc = { width: Infinity, height: Infinity };this.u = null;this.Gb = new Uh(this.c.preferredAudioLanguage, this.c.preferredVariantRole, this.c.preferredAudioChannelCount);this.na = this.c.preferredTextLanguage;
	      this.fb = this.c.preferredTextRole;c && c(this);this.K = Pk(this);this.g.w(window, "online", function () {
	        d.sd();
	      });this.F = { name: "detach" };this.O = { name: "attach" };this.Ha = { name: "unload" };this.Mc = { name: "manifest-parser" };this.Kc = { name: "manifest" };this.hb = { name: "media-source" };this.Ec = { name: "drm-engine" };this.S = { name: "load" };this.Rc = { name: "src-equals-drm-engine" };this.jb = { name: "src-equals" };var e = new Map();e.set(this.O, function (b, c) {
	        return Ib(Qk(d, b, c));
	      });e.set(this.F, function (b) {
	        b.v && (d.g.ea(b.v, "error"), b.v = null);
	        d.a = null;b = Promise.resolve();return Ib(b);
	      });e.set(this.Ha, function (b) {
	        return Ib(Rk(d, b));
	      });e.set(this.hb, function (b) {
	        b = Sk(d, b);return Ib(b);
	      });e.set(this.Mc, function (b, c) {
	        var e = Tk(d, b, c);return Ib(e);
	      });e.set(this.Kc, function (b) {
	        return Uk(d, b);
	      });e.set(this.Ec, function () {
	        var b = Vk(d);return Ib(b);
	      });e.set(this.S, function (b, c) {
	        return Ib(Wk(d, b, c));
	      });e.set(this.Rc, function (b) {
	        b = Xk(d, b);return Ib(b);
	      });e.set(this.jb, function (b, c) {
	        return Yk(d, b, c);
	      });this.lb = new sk(this.F, { cf: function (b, c, e, k) {
	          var f = null;b == d.F && (f = e == d.F ? d.F : d.O);b == d.O && (f = e == d.F || c.v != k.v ? d.F : e == d.O ? d.O : e == d.hb || e == d.S ? d.hb : e == d.jb ? d.Rc : null);b == d.hb && (f = e == d.S && c.v == k.v ? d.Mc : d.Ha);b == d.Mc && (f = Zk(d.S, d.Kc, d.Ha, e, c, k));b == d.Kc && (f = Zk(d.S, d.Ec, d.Ha, e, c, k));b == d.Ec && (f = Zk(d.S, d.S, d.Ha, e, c, k));b == d.Rc && (f = e == d.jb && c.v == k.v ? d.jb : d.Ha);if (b == d.S || b == d.jb) f = d.Ha;b == d.Ha && (f = k.v && c.v == k.v ? d.O : d.F);return f;
	        }, Le: function (b, c, h) {
	          d.dispatchEvent(new I("onstatechange", { state: b.name }));return e.get(b)(c, h);
	        }, handleError: function (b) {
	          return t(function h() {
	            return z(h, function (c) {
	              switch (c.j) {case 1:
	                  return u(c, Rk(d, b), 2);case 2:
	                  return c["return"](b.v ? d.O : d.F);}
	            });
	          });
	        }, Bf: function (b) {
	          d.dispatchEvent(new I("onstateidle", { state: b.name }));
	        } });b && this.Hb(b, !0);
	    }Xa(Y, Mb);A("shaka.Player", Y);
	    Y.prototype.destroy = function () {
	      var b = this;return t(function d() {
	        var e;return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (b.i == $k) return d["return"]();b.i = $k;e = wk(b.lb, function () {
	                return { node: b.F, payload: tk(), Va: !1 };
	              });return u(d, new Promise(function (d) {
	                e.wb = function () {};e.pc = function () {
	                  d();b.dispatchEvent(new I("loaded"));
	                };e.Ya = function () {
	                  d();
	                };e.onError = function () {
	                  d();
	                };e.rc = function () {
	                  d();
	                };
	              }), 2);case 2:
	              return u(d, b.lb.destroy(), 3);case 3:
	              b.g && (b.g.release(), b.g = null);b.Dc = null;b.l = null;b.c = null;if (!b.K) {
	                d.A(0);
	                break;
	              }return u(d, b.K.destroy(), 5);case 5:
	              b.K = null, w(d);}
	        });
	      });
	    };Y.prototype.destroy = Y.prototype.destroy;Y.version = "v2.5.10";var al = ["2", "5"];Ae = new function (b) {
	      this.a = b;this.c = Be;this.b = Ce;
	    }(new ye(Number(al[0]), Number(al[1])));var bl = ["output-restricted", "internal-error"],
	        cl = {};Y.registerSupportPlugin = function (b, c) {
	      cl[b] = c;
	    };
	    Y.isBrowserSupported = function () {
	      if (!(window.Promise && window.Uint8Array && Array.prototype.forEach)) return !1;var b = xc();return b && 12 > b || !(window.MediaKeys && window.navigator && window.navigator.requestMediaKeySystemAccess && window.MediaKeySystemAccess && window.MediaKeySystemAccess.prototype.getConfiguration) ? !1 : sc() ? !0 : tc("application/x-mpegurl");
	    };
	    Y.probeSupport = function () {
	      return ld().then(function (b) {
	        for (var c = V.Sf(), d = {}, e = r('video/mp4; codecs="avc1.42E01E",video/mp4; codecs="avc3.42E01E",video/mp4; codecs="hev1.1.6.L93.90",video/mp4; codecs="hvc1.1.6.L93.90",video/mp4; codecs="hev1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="hvc1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="vp9",video/mp4; codecs="vp09.00.10.08",video/mp4; codecs="av01.0.01M.08",audio/mp4; codecs="mp4a.40.2",audio/mp4; codecs="ac-3",audio/mp4; codecs="ec-3",audio/mp4; codecs="opus",audio/mp4; codecs="flac",video/webm; codecs="vp8",video/webm; codecs="vp9",video/webm; codecs="vp09.00.10.08",audio/webm; codecs="vorbis",audio/webm; codecs="opus",video/mp2t; codecs="avc1.42E01E",video/mp2t; codecs="avc3.42E01E",video/mp2t; codecs="hvc1.1.6.L93.90",video/mp2t; codecs="mp4a.40.2",video/mp2t; codecs="ac-3",video/mp2t; codecs="ec-3",text/vtt,application/mp4; codecs="wvtt",application/ttml+xml,application/mp4; codecs="stpp"'.split(",")), f = e.next(); !f.done; f = e.next()) {
	          f = f.value;d[f] = sc() ? Yd(f) ? !0 : MediaSource.isTypeSupported(f) || Cd(f) : tc(f);var g = f.split(";")[0];d[g] = d[g] || d[f];
	        }b = { manifest: c, media: d, drm: b };for (var h in cl) b[h] = cl[h]();return b;
	      });
	    };Y.prototype.Hb = function (b, c) {
	      c = void 0 === c ? !0 : c;if (this.i == $k) return Promise.reject(dl());var d = tk();d.v = b;sc() || (c = !1);var e = c ? this.hb : this.O,
	          f = wk(this.lb, function () {
	        return { node: e, payload: d, Va: !1 };
	      });f.wb = function () {};return el(f);
	    };Y.prototype.attach = Y.prototype.Hb;
	    Y.prototype.detach = function () {
	      var b = this;if (this.i == $k) return Promise.reject(dl());var c = wk(this.lb, function () {
	        return { node: b.F, payload: tk(), Va: !1 };
	      });c.wb = function () {};return el(c);
	    };Y.prototype.detach = Y.prototype.detach;Y.prototype.Cd = function (b) {
	      var c = this;b = void 0 === b ? !0 : b;if (this.i == $k) return Promise.reject(dl());sc() || (b = !1);var d = tk(),
	          e = wk(this.lb, function (e) {
	        var f = e.v && b ? c.hb : e.v ? c.O : c.F;d.v = e.v;return { node: f, payload: d, Va: !1 };
	      });e.wb = function () {};return el(e);
	    };Y.prototype.unload = Y.prototype.Cd;
	    Y.prototype.load = function (b, c, d) {
	      if (this.i == $k) return Promise.reject(dl());this.dispatchEvent(new I("loading"));var e = tk();e.uri = b;e.zd = Date.now() / 1E3;d && "string" != typeof d && (ze("Loading with a manifest parser factory", "Please register a manifest parser and for the mime-type."), e.Aa = function () {
	        return new d();
	      });d && "string" == typeof d && (e.mimeType = d);void 0 !== c && (e.startTime = c);var f = fl(this, e) ? this.jb : this.S,
	          g = wk(this.lb, function (b) {
	        if (null == b.v) return null;e.v = b.v;return { node: f, payload: e, Va: !0 };
	      });g.wb = function () {};return new Promise(function (b, c) {
	        g.rc = function () {
	          return c(new D(2, 7, 7002));
	        };g.pc = function () {
	          return b();
	        };g.Ya = function () {
	          return c(dl());
	        };g.onError = function (b) {
	          return c(b);
	        };
	      });
	    };Y.prototype.load = Y.prototype.load;
	    function fl(b, c) {
	      if (c.Aa) return !1;if (!sc()) return !0;var d = c.mimeType,
	          e = c.uri || "";d || (d = { mp4: "video/mp4", m4v: "video/mp4", m4a: "audio/mp4", webm: "video/webm", weba: "audio/webm", mkv: "video/webm", ts: "video/mp2t", ogv: "video/ogg", ogg: "audio/ogg", mpg: "video/mpeg", mpeg: "video/mpeg", m3u8: "application/x-mpegurl", mp3: "audio/mpeg", aac: "audio/aac", flac: "audio/flac", wav: "audio/wav" }[V.getExtension(e)]);return d ? "" == (c.v || uc()).canPlayType(d) ? !1 : V.isSupported(e, d) ? vc() && b.c.streaming.useNativeHlsOnSafari : !0 : !1;
	    }
	    function Qk(b, c, d) {
	      null == c.v && (c.v = d.v, b.g.w(c.v, "error", function () {
	        var c = gl(b);c && b.Ma(c);
	      }));b.a = c.v;return Promise.resolve();
	    }
	    function Rk(b, c) {
	      return t(function e() {
	        return z(e, function (e) {
	          switch (e.j) {case 1:
	              b.i != $k && (b.i = Nk);b.dispatchEvent(new I("unloading"));c.Aa = null;c.mimeType = null;c.startTime = null;c.uri = null;c.v && (b.g.ea(c.v, "loadeddata"), b.g.ea(c.v, "playing"), b.g.ea(c.v, "pause"), b.g.ea(c.v, "ended"), b.g.ea(c.v, "ratechange"));b.ib && (b.ib.release(), b.ib = null);b.Zb && (b.Zb.stop(), b.Zb = null);if (!b.s) {
	                e.A(2);break;
	              }return u(e, b.s.stop(), 3);case 3:
	              b.s = null;case 2:
	              if (!b.l) {
	                e.A(4);break;
	              }return u(e, b.l.stop(), 4);case 4:
	              if (!b.f) {
	                e.A(6);
	                break;
	              }return u(e, b.f.destroy(), 7);case 7:
	              b.f = null;case 6:
	              b.m && (b.m.release(), b.m = null);if (!b.D) {
	                e.A(8);break;
	              }return u(e, b.D.destroy(), 9);case 9:
	              b.D = null;case 8:
	              if (!c.v || !c.v.src) {
	                e.A(10);break;
	              }return u(e, new Promise(function (b) {
	                return new C(b).R(.1);
	              }), 11);case 11:
	              c.v.removeAttribute("src"), c.v.load();case 10:
	              if (!b.h) {
	                e.A(12);break;
	              }return u(e, b.h.destroy(), 13);case 13:
	              b.h = null;case 12:
	              b.$.a.clear(), b.Fb = null, b.B = null, b.ac.clear(), b.b = null, b.u = null, b.Fc = null, b.kb = !0, hl(b), w(e);}
	        });
	      });
	    }
	    function Sk(b, c) {
	      return t(function e() {
	        var f, g, h, k;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = window.muxjs ? new od() : new pd(), g = b.c.textDisplayFactory, h = new g(), b.Fc = g, k = new ce(c.v, f, h), u(e, k.s, 2);case 2:
	              b.D = k, w(e);}
	        });
	      });
	    }
	    function Tk(b, c, d) {
	      return t(function f() {
	        var g, h, k, l;return z(f, function (f) {
	          switch (f.j) {case 1:
	              c.Aa = d.Aa;c.mimeType = d.mimeType;c.uri = d.uri;g = c.uri;h = b.K;b.Fb = g;if (c.Aa) {
	                b.s = c.Aa();f.A(2);break;
	              }k = b;return u(f, V.create(g, h, b.c.manifest.retryParameters, c.mimeType), 3);case 3:
	              k.s = f.o;case 2:
	              l = Nb(b.c.manifest), d.v && "AUDIO" === d.v.nodeName && (l.disableVideo = !0), b.s.configure(l), w(f);}
	        });
	      });
	    }
	    function Uk(b, c) {
	      var d = c.uri,
	          e = b.K;b.Yb = new Di();Ei(b.Yb, function (c) {
	        il(b, "timelineregionadded", c);
	      });var f = { networkingEngine: e, filterNewPeriod: function (c) {
	          return b.Nc(c);
	        }, filterAllPeriods: function (c) {
	          return jl(b, c);
	        }, onTimelineRegionAdded: function (c) {
	          var d = b.Yb;a: {
	            var e = r(d.a);for (var f = e.next(); !f.done; f = e.next()) if (f = f.value, f.schemeIdUri == c.schemeIdUri && f.id == c.id && f.startTime == c.startTime && f.endTime == c.endTime) {
	              e = f;break a;
	            }e = null;
	          }null == e && (d.a.add(c), d.b(c));
	        }, onEvent: function (c) {
	          return b.dispatchEvent(c);
	        },
	        onError: function (c) {
	          return b.Ma(c);
	        } };return new H(Promise.resolve().then(function () {
	        return t(function h() {
	          var c;return z(h, function (e) {
	            switch (e.j) {case 1:
	                return c = b, u(e, b.s.start(d, f), 2);case 2:
	                c.b = e.o;b.dispatchEvent(new I("manifestparsed"));if (0 == b.b.periods.length) throw new D(2, 4, 4014);kl(b.b.periods);w(e);}
	          });
	        });
	      }), function () {
	        return b.s.stop();
	      });
	    }
	    function Vk(b) {
	      return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.h = new Gc({ ub: b.K, onError: function (d) {
	                  b.Ma(d);
	                }, qc: function (d) {
	                  ll(b, d);
	                }, onExpirationUpdated: function (d, e) {
	                  ml(b, d, e);
	                }, onEvent: function (d) {
	                  b.dispatchEvent(d);
	                } }), b.h.configure(b.c.drm), u(d, Nc(b.h, ji(b.b.periods), b.b.offlineSessionIds), 2);case 2:
	              jl(b, b.b.periods), w(d);}
	        });
	      });
	    }
	    function Wk(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n, p, v, x;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return c.startTime = d.startTime, g = c.v, h = c.uri, b.Fb = h, b.u = new Mk(), k = function () {
	                return nl(b);
	              }, l = function () {
	                var c = b.a.playbackRate;0 != c && b.W.set(c);
	              }, b.g.w(g, "playing", k), b.g.w(g, "pause", k), b.g.w(g, "ended", k), b.g.w(g, "ratechange", l), m = b.c.abrFactory, b.l && b.Dc == m || (b.Dc = m, b.l = new m(), b.l.configure(b.c.abr)), ol(b, b.b.periods), b.Gb = new Uh(b.c.preferredAudioLanguage, b.c.preferredVariantRole, b.c.preferredAudioChannelCount), b.na = b.c.preferredTextLanguage, pl(b.b.presentationTimeline, b.c.playRangeStart, b.c.playRangeEnd), u(f, b.h.Hb(g), 2);case 2:
	              return b.l.init(function (c, d, f) {
	                d = void 0 === d ? !1 : d;f = void 0 === f ? 0 : f;a: {
	                  var g = r(b.b.periods);for (var h = g.next(); !h.done; h = g.next()) if (h = h.value, h.variants.includes(c)) {
	                    g = h;break a;
	                  }g = null;
	                }ql(b, g, c, !0);b.f && Xi(b.f, c, d, f) && rl(b);
	              }), b.m = sl(b, c.startTime), b.ib = tl(b), b.W = new ni({ jc: function () {
	                  return c.v.playbackRate;
	                }, wd: function (b) {
	                  c.v.playbackRate = b;
	                }, Yd: function (b) {
	                  c.v.currentTime += b;
	                } }), n = Math.max(b.b.minBufferTime, b.c.streaming.rebufferingGoal), ul(b, n), b.f = vl(b), b.f.configure(b.c.streaming), wl(b), b.i = xl, b.dispatchEvent(new I("streaming")), u(f, b.f.start(), 3);case 3:
	              b.c.streaming.startAtSegmentBoundary && (p = b.m.h(), v = yl(b, p), b.m.m(v)), b.b.periods.forEach(b.Nc.bind(b)), zl(b), rl(b), x = Al(b) || b.b.periods[0], x.variants.some(function (b) {
	                return b.primary;
	              }), Bl(b, x.variants), b.g.da(g, "loadeddata", function () {
	                b.u.b = Date.now() / 1E3 - d.zd;
	              }), w(f);}
	        });
	      });
	    }
	    function Xk(b, c) {
	      return t(function e() {
	        var f, g;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = xd, b.h = new Gc({ ub: b.K, onError: function (c) {
	                  b.Ma(c);
	                }, qc: function (c) {
	                  ll(b, c);
	                }, onExpirationUpdated: function (c, e) {
	                  ml(b, c, e);
	                }, onEvent: function (c) {
	                  b.dispatchEvent(c);
	                } }), b.h.configure(b.c.drm), g = { id: 0, language: "und", primary: !1, audio: null, video: { id: 0, originalId: null, createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function () {
	                    return null;
	                  }, getSegmentReference: function () {
	                    return null;
	                  }, initSegmentReference: null,
	                  presentationTimeOffset: 0, mimeType: "video/mp4", codecs: "", encrypted: !0, keyId: null, language: "und", label: null, type: f.Pa, primary: !1, frameRate: void 0, pixelAspectRatio: void 0, trickModeVideo: null, emsgSchemeIdUris: null, roles: [], channelsCount: null, audioSamplingRate: null, closedCaptions: null }, bandwidth: 100, drmInfos: [], allowedByApplication: !0, allowedByKeySystem: !0 }, u(e, Nc(b.h, [g], []), 2);case 2:
	              return u(e, b.h.Hb(c.v), 0);}
	        });
	      });
	    }
	    function Yk(b, c, d) {
	      function e() {
	        return nl(b);
	      }c.uri = d.uri;c.startTime = d.startTime;b.Fb = c.uri;b.u = new Mk();b.m = new wi(c.v);null != c.startTime && b.m.m(c.startTime);b.W = new ni({ jc: function () {
	          return c.v.playbackRate;
	        }, wd: function (b) {
	          c.v.playbackRate = b;
	        }, Yd: function (b) {
	          c.v.currentTime += b;
	        } });ul(b, b.c.streaming.rebufferingGoal);b.g.w(c.v, "playing", e);b.g.w(c.v, "pause", e);b.g.w(c.v, "ended", e);b.g.da(c.v, "loadeddata", function () {
	        b.u.b = Date.now() / 1E3 - d.zd;
	      });b.a.audioTracks && (b.g.w(b.a.audioTracks, "addtrack", function () {
	        return zl(b);
	      }), b.g.w(b.a.audioTracks, "removetrack", function () {
	        return zl(b);
	      }), b.g.w(b.a.audioTracks, "change", function () {
	        return zl(b);
	      }));if (b.a.textTracks) {
	        var f = b.a.textTracks;b.g.w(f, "addtrack", function () {
	          return zl(b);
	        });b.g.w(f, "removetrack", function () {
	          return zl(b);
	        });b.g.w(f, "change", function () {
	          return zl(b);
	        });
	      }c.v.src = c.uri;b.i = Cl;b.dispatchEvent(new I("streaming"));var g = new F();b.a.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ? g.resolve() : b.a.error ? g.reject(gl(b)) : (b.g.da(b.a, "loadeddata", function () {
	        g.resolve();
	      }), b.g.da(b.a, "error", function () {
	        g.reject(gl(b));
	      }));return new H(g, function () {
	        g.reject(new D(2, 7, 7001));return Promise.resolve();
	      });
	    }function kl(b) {
	      function c(b) {
	        return b.video && b.audio || b.video && b.video.codecs.includes(",");
	      }b.some(function (b) {
	        return b.variants.some(c);
	      }) && b.forEach(function (b) {
	        b.variants = b.variants.filter(c);
	      });
	    }
	    function wl(b) {
	      function c(b) {
	        var c = "";b.video && (c = rc(b.video.codecs)[0]);var d = "";b.audio && (d = rc(b.audio.codecs)[0]);return c + "-" + d;
	      }var d = b.b.periods.reduce(function (b, c) {
	        return b.concat(c.variants);
	      }, []);d = N.Nd(d, b.c.preferredAudioChannelCount);var e = new Lb();d.forEach(function (b) {
	        var d = c(b);e.push(d, b);
	      });var f = null,
	          g = Infinity;e.forEach(function (b, c) {
	        var d = 0,
	            e = 0;c.forEach(function (b) {
	          d += b.bandwidth || 0;++e;
	        });var h = d / e;h < g && (f = b, g = h);
	      });b.b.periods.forEach(function (b) {
	        b.variants = b.variants.filter(function (b) {
	          return c(b) == f ? !0 : !1;
	        });
	      });
	    }function Pk(b) {
	      return new J(function (c, d) {
	        b.l && b.l.segmentDownloaded(c, d);
	      });
	    }function sl(b, c) {
	      return new xi(b.a, b.b, b.c.streaming, c, function () {
	        b.ib && ii(b.ib, !0);b.f && cj(b.f);b.B && Dl(b);
	      }, function (c) {
	        return b.dispatchEvent(c);
	      });
	    }
	    function tl(b) {
	      var c = new li(b.b);mi(c, function () {
	        zl(b);
	      });var d = new Fi(b.Yb);Ji(d, function (c) {
	        il(b, "timelineregionenter", c);
	      }, function (c) {
	        il(b, "timelineregionexit", c);
	      }, function (c, d) {
	        d || (il(b, "timelineregionenter", c), il(b, "timelineregionexit", c));
	      });var e = new hi(b.a);e.a.add(c);e.a.add(d);return e;
	    }function ul(b, c) {
	      b.B = new Yh();b.B.a = $h;ai(b.B, c, Math.min(.5, c / 2));hl(b);b.Zb = new C(function () {
	        Dl(b);
	      }).Na(.25);
	    }
	    function Dl(b) {
	      switch (b.i) {case Cl:
	          var c = b.a.ended ? !0 : qd(b.a.buffered) >= b.a.duration - 1;break;case xl:
	          a: if (b.a.ended || ge(b.D)) c = !0;else {
	            if (b.b.presentationTimeline.V()) {
	              var d = b.b.presentationTimeline.pb();if (qd(b.a.buffered) >= d) {
	                c = !0;break a;
	              }
	            }c = !1;
	          }break;default:
	          c = !1;}var e = sd(b.a.buffered, b.a.currentTime);d = b.B;var f = c,
	          g = d.b.get(d.a);c = d.a;e = f || e >= g ? Zh : $h;d.a = e;c != e && hl(b);
	    }
	    function vl(b) {
	      return new Ki(b.b, { Ua: function () {
	          return b.m.h();
	        }, getBandwidthEstimate: function () {
	          return b.l.getBandwidthEstimate();
	        }, L: b.D, ub: b.K, ae: b.zf.bind(b), $d: b.Fe.bind(b), onError: b.Ma.bind(b), onEvent: function (c) {
	          return b.dispatchEvent(c);
	        }, Df: b.Ef.bind(b), jd: b.Jf.bind(b) });
	    }Y.prototype.configure = function (b, c) {
	      2 == arguments.length && "string" == typeof b && (b = Ck(b, c));var d = Gk(this.c, b, Ok(this));El(this);return d;
	    };Y.prototype.configure = Y.prototype.configure;
	    function El(b) {
	      if (b.s) {
	        var c = Nb(b.c.manifest);b.a && "AUDIO" === b.a.nodeName && (c.disableVideo = !0);b.s.configure(c);
	      }b.h && b.h.configure(b.c.drm);if (b.f) {
	        b.f.configure(b.c.streaming);try {
	          b.b.periods.forEach(b.Nc.bind(b));
	        } catch (g) {
	          b.Ma(g);
	        }var d = Oi(b.f),
	            e = Qi(b.f);c = Al(b);d = N.Qd(d, e, c.variants);b.l && d && d.allowedByApplication && d.allowedByKeySystem ? Bl(b, c.variants) : Fl(b, c);
	      }if (b.D && (c = b.c.textDisplayFactory, b.Fc != c)) {
	        d = new c();e = b.D;var f = e.g;e.g = d;f && (d.setTextVisibility(f.isTextVisible()), f.destroy());e.a && (e.a.c = d);b.Fc = c;b.f && (c = b.f, (d = c.b.get("text")) && Wi(c, d.stream, !0, 0, !0));
	      }b.l && (b.l.configure(b.c.abr), b.c.abr.enabled && !b.kb ? b.l.enable() : b.l.disable(), Gl(b));b.B && (c = b.c.streaming.rebufferingGoal, b.b && (c = Math.max(c, b.b.minBufferTime)), ai(b.B, c, Math.min(.5, c / 2)));
	    }Y.prototype.getConfiguration = function () {
	      var b = Ok(this);Gk(b, this.c, Ok(this));return b;
	    };Y.prototype.getConfiguration = Y.prototype.getConfiguration;Y.prototype.$f = function () {
	      for (var b in this.c) delete this.c[b];Gk(this.c, Ok(this), Ok(this));El(this);
	    };
	    Y.prototype.resetConfiguration = Y.prototype.$f;Y.prototype.We = function () {
	      return this.i;
	    };Y.prototype.getLoadMode = Y.prototype.We;Y.prototype.af = function () {
	      return this.a;
	    };Y.prototype.getMediaElement = Y.prototype.af;Y.prototype.Mb = function () {
	      return this.K;
	    };Y.prototype.getNetworkingEngine = Y.prototype.Mb;Y.prototype.hc = function () {
	      return this.Fb;
	    };Y.prototype.getAssetUri = Y.prototype.hc;Y.prototype.Ze = function () {
	      ze("getManifestUri", 'Please use "getAssetUri" instead.');return this.hc();
	    };
	    Y.prototype.getManifestUri = Y.prototype.Ze;Y.prototype.V = function () {
	      return this.b ? this.b.presentationTimeline.V() : this.a && this.a.src ? Infinity == this.a.duration : !1;
	    };Y.prototype.isLive = Y.prototype.V;Y.prototype.Xa = function () {
	      return this.b ? this.b.presentationTimeline.Xa() : !1;
	    };Y.prototype.isInProgress = Y.prototype.Xa;
	    Y.prototype.uf = function () {
	      if (this.b) {
	        if (!this.b.periods.length) return !1;var b = this.b.periods[0].variants;return b.length ? !b[0].video : !1;
	      }return this.a && this.a.src ? this.a.videoTracks ? 0 == this.a.videoTracks.length : 0 == this.a.videoHeight : !1;
	    };Y.prototype.isAudioOnly = Y.prototype.uf;Y.prototype.bg = function () {
	      if (this.b) {
	        var b = this.b.presentationTimeline;return { start: b.ob(), end: b.Ca() };
	      }return this.a && this.a.src && (b = this.a.seekable, b.length) ? { start: b.start(0), end: b.end(b.length - 1) } : { start: 0, end: 0 };
	    };
	    Y.prototype.seekRange = Y.prototype.bg;Y.prototype.keySystem = function () {
	      return ad(this.drmInfo());
	    };Y.prototype.keySystem = Y.prototype.keySystem;Y.prototype.drmInfo = function () {
	      return this.h ? this.h.a : null;
	    };Y.prototype.drmInfo = Y.prototype.drmInfo;Y.prototype.Lb = function () {
	      return this.h ? this.h.Lb() : Infinity;
	    };Y.prototype.getExpiration = Y.prototype.Lb;Y.prototype.Xc = function () {
	      return this.B ? this.B.a == $h : !1;
	    };Y.prototype.isBuffering = Y.prototype.Xc;
	    Y.prototype.ef = function () {
	      if (this.W) {
	        var b = this.W;b = b.f ? 0 : b.c;
	      } else b = 0;return b;
	    };Y.prototype.getPlaybackRate = Y.prototype.ef;Y.prototype.ug = function (b) {
	      0 == b ? cb("A trick play rate of 0 is unsupported!") : (this.a.paused && this.a.play(), this.W.set(b), this.i == xl && Vi(this.f, 1 < Math.abs(b)));
	    };Y.prototype.trickPlay = Y.prototype.ug;Y.prototype.Ge = function () {
	      this.i == Cl && this.W.set(1);this.i == xl && (this.W.set(1), Vi(this.f, !1));
	    };Y.prototype.cancelTrickPlay = Y.prototype.Ge;
	    Y.prototype.Vc = function () {
	      if (this.b && this.m) {
	        for (var b = Hl(this), c = [], d = r(Il(this)), e = d.next(); !e.done; e = d.next()) {
	          e = e.value;var f = N.Ed(e);f.active = e == b;c.push(f);
	        }return c;
	      }return this.a && this.a.audioTracks ? Array.from(this.a.audioTracks).map(function (b) {
	        return N.rf(b);
	      }) : [];
	    };Y.prototype.getVariantTracks = Y.prototype.Vc;
	    Y.prototype.qb = function () {
	      if (this.b && this.m) {
	        for (var b = Jl(this), c = [], d = r(Kl(this)), e = d.next(); !e.done; e = d.next()) {
	          e = e.value;var f = N.xc(e);f.active = e == b;c.push(f);
	        }return c;
	      }return this.a && this.a.src && this.a.textTracks ? Array.from(this.a.textTracks).map(function (b) {
	        return N.sf(b);
	      }) : [];
	    };Y.prototype.getTextTracks = Y.prototype.qb;
	    Y.prototype.td = function (b) {
	      if (this.b && this.f) {
	        var c = Al(this),
	            d = c.textStreams.find(function (c) {
	          return c.id == b.id;
	        });d && (Ll(this, c, d, !1), Ml(this, d), this.na = d.language);
	      } else if (this.a && this.a.src && this.a.textTracks) {
	        c = Array.from(this.a.textTracks);c = r(c);for (d = c.next(); !d.done; d = c.next()) d = d.value, N.Wc(d) == b.id ? d.mode = this.gb ? "showing" : "hidden" : d.mode = "disabled";Nl(this);
	      }
	    };Y.prototype.selectTextTrack = Y.prototype.td;
	    Y.prototype.dg = function () {
	      ze("selectEmbeddedTextTrack", "If closed captions are signaled in the manifest, a text stream will be created to represent them. Please use SelectTextTrack.");var b = this.qb().filter(function (b) {
	        return "application/cea-608" == b.mimeType;
	      });0 < b.length && this.td(b[0]);
	    };Y.prototype.selectEmbeddedTextTrack = Y.prototype.dg;
	    Y.prototype.zg = function () {
	      ze("usingEmbeddedTextTrack", "If closed captions are signaled in the manifest, a text stream will be created to represent them. There should be no reason to know if the player is playing embedded text.");var b = this.qb().filter(function (b) {
	        return b.active;
	      })[0];return b ? "application/cea-608" == b.mimeType : !1;
	    };Y.prototype.usingEmbeddedTextTrack = Y.prototype.zg;
	    Y.prototype.fg = function (b, c, d) {
	      d = void 0 === d ? 0 : d;if (this.b && this.f) {
	        var e = Al(this);this.c.abr.enabled && cb("Changing tracks while abr manager is enabled will likely result in the selected track being overriden. Consider disabling abr before calling selectVariantTrack().");var f = e.variants.find(function (c) {
	          return c.id == b.id;
	        });f && N.rb(f) && (ql(this, e, f, !1), Ol(this, f, c, d), this.Gb = new Th(f), Bl(this, e.variants));
	      } else if (this.a && this.a.audioTracks) {
	        c = Array.from(this.a.audioTracks);c = r(c);for (d = c.next(); !d.done; d = c.next()) d = d.value, N.Wc(d) == b.id && (d.enabled = !0);Pl(this);
	      }
	    };Y.prototype.selectVariantTrack = Y.prototype.fg;Y.prototype.Re = function () {
	      return Ql(this.Vc());
	    };Y.prototype.getAudioLanguagesAndRoles = Y.prototype.Re;Y.prototype.mf = function () {
	      return Ql(this.qb());
	    };Y.prototype.getTextLanguagesAndRoles = Y.prototype.mf;Y.prototype.Qe = function () {
	      return Array.from(Rl(this.Vc()));
	    };Y.prototype.getAudioLanguages = Y.prototype.Qe;Y.prototype.lf = function () {
	      return Array.from(Rl(this.qb()));
	    };
	    Y.prototype.getTextLanguages = Y.prototype.lf;Y.prototype.cg = function (b, c) {
	      if (this.b && this.m) {
	        var d = Al(this);this.Gb = new Uh(b, c || "", 0, "", "audio");Sl(this, d);
	      } else if (this.a && this.a.audioTracks) {
	        d = Array.from(this.a.audioTracks);d = r(d);for (var e = d.next(); !e.done; e = d.next()) e = e.value, e.language == b && (e.enabled = !0);Pl(this);
	      }
	    };Y.prototype.selectAudioLanguage = Y.prototype.cg;
	    Y.prototype.eg = function (b, c) {
	      if (this.b && this.m) {
	        var d = Al(this);this.na = b;this.fb = c || "";var e = N.Jb(d.textStreams, this.na, this.fb)[0] || null;e && (Ll(this, d, e, !1), (this.c.streaming.alwaysStreamText || this.mc()) && Ml(this, e));
	      } else (d = this.qb().filter(function (c) {
	        return c.language == b;
	      })[0]) && this.td(d);
	    };Y.prototype.selectTextLanguage = Y.prototype.eg;
	    Y.prototype.gg = function (b) {
	      if (this.b && this.m) {
	        for (var c = Al(this), d = null, e = r(Il(this)), f = e.next(); !f.done; f = e.next()) if (f = f.value, f.audio.label == b) {
	          d = f;break;
	        }null != d && (this.Gb = new Uh(d.language, "", 0, b), Sl(this, c));
	      }
	    };Y.prototype.selectVariantsByLabel = Y.prototype.gg;Y.prototype.mc = function () {
	      var b = this.gb;return this.D ? this.D.g.isTextVisible() : this.a && this.a.src && this.a.textTracks ? Array.from(this.a.textTracks).some(function (b) {
	        return "showing" == b.mode;
	      }) : b;
	    };Y.prototype.isTextTrackVisible = Y.prototype.mc;
	    Y.prototype.jg = function (b) {
	      var c = this;return t(function e() {
	        var f, g, h, k, l, m;return z(e, function (e) {
	          switch (e.j) {case 1:
	              f = c.gb;g = !!b;if (f == g) return e["return"]();c.gb = g;if (c.i != xl) {
	                if (c.a && c.a.src && c.a.textTracks) {
	                  h = Array.from(c.a.textTracks);for (var n = r(h), v = n.next(); !v.done; v = n.next()) k = v.value, "disabled" != k.mode && (k.mode = g ? "showing" : "hidden");
	                }e.A(2);break;
	              }c.D.g.setTextVisibility(g);if (c.c.streaming.alwaysStreamText) {
	                e.A(2);break;
	              }if (!g) {
	                n = c.f;n.D = !0;if (v = n.b.get("text")) Li(v), n.b["delete"]("text");
	                e.A(2);break;
	              }l = Al(c);m = N.Jb(l.textStreams, c.na, c.fb);if (!(0 < m.length)) {
	                e.A(2);break;
	              }return u(e, Ri(c.f, m[0]), 2);case 2:
	              Tl(c), w(e);}
	        });
	      });
	    };Y.prototype.setTextTrackVisibility = Y.prototype.jg;Y.prototype.gf = function () {
	      if (!this.V()) return null;if (this.b) return new Date(1E3 * (this.b.presentationTimeline.f + this.a.currentTime));if (this.a && this.a.getStartDate) {
	        var b = this.a.getStartDate();return isNaN(b.getTime()) ? null : new Date(b.getTime() + 1E3 * this.a.currentTime);
	      }return null;
	    };
	    Y.prototype.getPlayheadTimeAsDate = Y.prototype.gf;Y.prototype.jf = function () {
	      if (!this.V()) return null;if (this.b) return new Date(1E3 * this.b.presentationTimeline.f);if (this.a && this.a.getStartDate) {
	        var b = this.a.getStartDate();return isNaN(b.getTime()) ? null : b;
	      }return null;
	    };Y.prototype.getPresentationStartTimeAsDate = Y.prototype.jf;Y.prototype.Sc = function () {
	      var b = { total: [], audio: [], video: [], text: [] };this.i == Cl && (b.total = td(this.a.buffered));this.i == xl && this.D.Sc(b);return b;
	    };Y.prototype.getBufferedInfo = Y.prototype.Sc;
	    Y.prototype.getStats = function () {
	      if (this.i != xl && this.i != Cl) return { width: NaN, height: NaN, streamBandwidth: NaN, decodedFrames: NaN, droppedFrames: NaN, corruptedFrames: NaN, estimatedBandwidth: NaN, loadLatency: NaN, playTime: NaN, pauseTime: NaN, bufferingTime: NaN, licenseTime: NaN, switchHistory: [], stateHistory: [] };nl(this);var b = this.a;if (b.getVideoPlaybackQuality) {
	        b = b.getVideoPlaybackQuality();var c = this.u,
	            d = Number(b.totalVideoFrames);c.m = Number(b.droppedVideoFrames);c.l = d;this.u.i = Number(b.corruptedVideoFrames);
	      }this.h ? (b = this.h, b = b.K ? b.K : NaN) : b = NaN;this.u.h = b;if (this.i == xl) {
	        if (b = Hl(this)) this.u.s = b.bandwidth;b && b.video && (c = this.u, d = b.video.height || NaN, c.u = b.video.width || NaN, c.g = d);b = this.l.getBandwidthEstimate();this.u.f = b;
	      }var e = this.u;b = e.u;c = e.g;d = e.s;var f = e.l,
	          g = e.m,
	          h = e.i,
	          k = e.f,
	          l = e.b,
	          m = Jk(e.a, "playing"),
	          n = Jk(e.a, "paused"),
	          p = Jk(e.a, "buffering"),
	          v = e.h,
	          x = Kk(e.a),
	          B = [];e = r(e.c.a);for (var y = e.next(); !y.done; y = e.next()) y = y.value, B.push({ timestamp: y.timestamp, id: y.id, type: y.type, fromAdaptation: y.fromAdaptation, bandwidth: y.bandwidth });
	      return { width: b, height: c, streamBandwidth: d, decodedFrames: f, droppedFrames: g, corruptedFrames: h, estimatedBandwidth: k, loadLatency: l, playTime: m, pauseTime: n, bufferingTime: p, licenseTime: v, stateHistory: x, switchHistory: B };
	    };Y.prototype.getStats = Y.prototype.getStats;
	    Y.prototype.addTextTrack = function (b, c, d, e, f, g) {
	      var h = this;return t(function l() {
	        var m, n, p, v, x, B, y, G, E;return z(l, function (l) {
	          switch (l.j) {case 1:
	              if (h.i == Cl) throw Error("State error!");if (h.i != xl) throw Error("State error!");m = Al(h);n = xd;p = h.b.periods.indexOf(m);v = p + 1;x = v >= h.b.periods.length ? h.b.presentationTimeline.Y() : h.b.periods[v].startTime;B = x - m.startTime;if (Infinity == B) throw new D(1, 4, 4033);y = new T(1, 0, B, function () {
	                return [b];
	              }, 0, null);G = { id: h.Xd++, originalId: null, createSegmentIndex: Promise.resolve.bind(Promise),
	                findSegmentPosition: function () {
	                  return 1;
	                }, getSegmentReference: function (b) {
	                  return 1 == b ? y : null;
	                }, initSegmentReference: null, presentationTimeOffset: 0, mimeType: e, codecs: f || "", kind: d, encrypted: !1, keyId: null, language: c, label: g || null, type: n.ra, primary: !1, frameRate: void 0, pixelAspectRatio: void 0, trickModeVideo: null, emsgSchemeIdUris: null, roles: [], channelsCount: null, audioSamplingRate: null, closedCaptions: null };h.ac.add(G);m.textStreams.push(G);return u(l, Ri(h.f, G), 2);case 2:
	              return (E = Pi(h.f, "text")) && Kh(h.$, m, E), h.ac["delete"](G), Fl(h, m), zl(h), l["return"](N.xc(G));}
	        });
	      });
	    };Y.prototype.addTextTrack = Y.prototype.addTextTrack;Y.prototype.vd = function (b, c) {
	      this.bc.width = b;this.bc.height = c;
	    };Y.prototype.setMaxHardwareResolution = Y.prototype.vd;Y.prototype.sd = function () {
	      if (this.i == xl) {
	        var b = this.f;if (b.f) b = !1;else if (b.m) b = !1;else {
	          for (var c = r(b.b.values()), d = c.next(); !d.done; d = c.next()) d = d.value, d.Pb && (d.Pb = !1, Ui(b, d, .1));b = !0;
	        }
	      } else b = !1;return b;
	    };Y.prototype.retryStreaming = Y.prototype.sd;Y.prototype.Xe = function () {
	      return this.b;
	    };
	    Y.prototype.getManifest = Y.prototype.Xe;Y.prototype.Ye = function () {
	      return this.s ? this.s.constructor : null;
	    };Y.prototype.getManifestParserFactory = Y.prototype.Ye;function ql(b, c, d, e) {
	      Lh(b.$, c).variant = d;b = b.u.c;b.c != d && (b.c = d, b.a.push({ timestamp: Date.now() / 1E3, id: d.id, type: "variant", fromAdaptation: e, bandwidth: d.bandwidth }));
	    }function Ll(b, c, d, e) {
	      Kh(b.$, c, d);b = b.u.c;b.b != d && (b.b = d, b.a.push({ timestamp: Date.now() / 1E3, id: d.id, type: "text", fromAdaptation: e, bandwidth: null }));
	    }
	    function Ok(b) {
	      var c = Ek();c.streaming.failureCallback = function (c) {
	        var d = [1001, 1002, 1003];b.V() && d.includes(c.code) && (c.severity = 1, b.sd());
	      };c.textDisplayFactory = function () {
	        return new yk(b.a);
	      };return c;
	    }
	    function ol(b, c) {
	      for (var d = 0; d < c.length; d++) {
	        for (var e = c[d], f = new Map(), g = r(e.variants), h = g.next(); !h.done; h = g.next()) if (h = h.value, h.video && h.video.closedCaptions) {
	          h = h.video;for (var k = r(h.closedCaptions.keys()), l = k.next(); !l.done; l = k.next()) if (l = l.value, !f.has(l)) {
	            var m = { id: b.Xd++, originalId: l, createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function () {
	                return null;
	              }, getSegmentReference: function () {
	                return null;
	              }, initSegmentReference: null, presentationTimeOffset: 0, mimeType: "application/cea-608",
	              codecs: "", kind: "caption", encrypted: !1, keyId: null, language: h.closedCaptions.get(l), label: null, type: "text", primary: !1, frameRate: void 0, pixelAspectRatio: void 0, trickModeVideo: null, emsgSchemeIdUris: null, roles: h.roles, channelsCount: null, audioSamplingRate: null, closedCaptions: null };f.set(l, m);
	          }
	        }f = r(f.values());for (g = f.next(); !g.done; g = f.next()) e.textStreams.push(g.value);
	      }
	    }
	    function jl(b, c) {
	      var d = b.f ? Oi(b.f) : null,
	          e = b.f ? Qi(b.f) : null;c.forEach(N.filterNewPeriod.bind(null, b.h, d, e));d = Qb(c, function (b) {
	        return b.variants.some(N.rb);
	      });if (0 == d) throw new D(2, 4, 4032);if (d < c.length) throw new D(2, 4, 4011);c.forEach(function (b) {
	        N.Gd(b.variants, this.c.restrictions, this.bc) && this.f && Al(this) == b && zl(this);Ul(this, b.variants);
	      }.bind(b));
	    }q = Y.prototype;
	    q.Nc = function (b) {
	      var c = this.f ? Oi(this.f) : null,
	          d = this.f ? Qi(this.f) : null;N.filterNewPeriod(this.h, c, d, b);c = b.variants;if (!c.some(N.rb)) throw new D(2, 4, 4011);Ul(this, b.variants);N.Gd(c, this.c.restrictions, this.bc) && this.f && Al(this) == b && zl(this);if (b = this.h ? this.h.a : null) for (c = r(c), d = c.next(); !d.done; d = c.next()) {
	        d = r(d.value.drmInfos);for (var e = d.next(); !e.done; e = d.next()) if (e = e.value, e.keySystem == b.keySystem) {
	          e = r(e.initData || []);for (var f = e.next(); !f.done; f = e.next()) f = f.value, Xc(this.h, f.initDataType, f.initData);
	        }
	      }
	    };function Ol(b, c, d, e) {
	      d = void 0 === d ? !1 : d;e = void 0 === e ? 0 : e;if (b.kb) return b.pa = c, b.Ud = d, b.Rd = e, !0;(c = Xi(b.f, c, d, e)) && Pl(b);return c;
	    }function Ml(b, c) {
	      if (b.kb) return b.oa = c, !0;var d = Wi(b.f, c, !0, 0, !1);d && Nl(b);return d;
	    }
	    function yl(b, c) {
	      function d(b, c) {
	        if (!b) return null;var d = b.findSegmentPosition(c - g.startTime);return null == d ? null : (d = b.getSegmentReference(d)) ? d.startTime + g.startTime : null;
	      }var e = Oi(b.f),
	          f = Qi(b.f),
	          g = Al(b);e = d(e, c);f = d(f, c);return null != f && null != e ? Math.max(f, e) : null != f ? f : null != e ? e : c;
	    }function hl(b) {
	      var c = b.Xc();if (b.u && b.B && b.m) {
	        var d = b.W;d.f = c;oi(d);nl(b);
	      }b.dispatchEvent(new I("buffering", { buffering: c }));
	    }
	    function nl(b) {
	      if (b.u && b.B) {
	        var c = b.u.a;b.B.a == $h ? Ik(c, "buffering") : b.a.paused ? Ik(c, "paused") : b.a.ended ? Ik(c, "ended") : Ik(c, "playing");
	      }
	    }function Bl(b, c) {
	      try {
	        Ul(b, c);
	      } catch (e) {
	        return b.Ma(e), null;
	      }var d = c.filter(function (b) {
	        return N.rb(b);
	      });d = b.Gb.create(d);b.l.setVariants(Array.from(d.values()));return b.l.chooseVariant();
	    }function Fl(b, c) {
	      var d = Sl(b, c, !1),
	          e = N.Jb(c.textStreams, b.na, b.fb)[0] || null,
	          f = !1;e && (b.c.streaming.alwaysStreamText || b.mc()) && (Ll(b, c, e, !0), f = Ml(b, e));(d || f) && rl(b);
	    }
	    function Sl(b, c, d) {
	      d = void 0 === d ? !0 : d;var e = Bl(b, c.variants),
	          f = !1;e && (ql(b, c, e, !0), f = Ol(b, e, !0));d && f && rl(b);return f;
	    }
	    q.zf = function (b) {
	      try {
	        this.kb = !0;this.l.disable();Gl(this);var c = Bl(this, b.variants),
	            d = N.Jb(b.textStreams, this.na, this.fb)[0] || null;this.pa && (b.variants.includes(this.pa) && (c = this.pa), this.pa = null);this.oa && (b.textStreams.includes(this.oa) && (d = this.oa), this.oa = null);c && ql(this, b, c, !0);d && Ll(this, b, d, !0);var e = this.f,
	            f = e.b.get("video");if (f) var g = e.c.periods[f.ia];else {
	          var h = e.b.get("audio");g = h ? e.c.periods[h.ia] : null;
	        }var k = c ? c.audio : null;if (!g && d) {
	          var l;if (l = k) {
	            b = d;var m = M(this.c.preferredTextLanguage),
	                n = M(k.language),
	                p = M(b.language);l = se(p, m) && !se(n, p);
	          }l && (this.gb = !0);this.gb && this.D.g.setTextVisibility(!0);Tl(this);
	        }return this.c.streaming.alwaysStreamText || this.mc() ? { variant: c, text: d } : { variant: c, text: null };
	      } catch (v) {
	        return this.Ma(v), { variant: null, text: null };
	      }
	    };q.Fe = function () {
	      this.kb = !1;this.c.abr.enabled && (this.l.enable(), Gl(this));this.pa && (Xi(this.f, this.pa, this.Ud, this.Rd), Pl(this), this.pa = null);this.oa && (Wi(this.f, this.oa, !0, 0, !1), Nl(this), this.oa = null);
	    };
	    q.Ef = function () {
	      this.s && this.s.update && this.s.update();
	    };q.Jf = function () {
	      this.m && this.m.s();
	    };function rl(b) {
	      Vl(b, new I("adaptation"));
	    }function zl(b) {
	      Vl(b, new I("trackschanged"));
	    }function Pl(b) {
	      Vl(b, new I("variantchanged"));
	    }function Nl(b) {
	      Vl(b, new I("textchanged"));
	    }function Tl(b) {
	      Vl(b, new I("texttrackvisibility"));
	    }function Gl(b) {
	      Vl(b, new I("abrstatuschanged", { Ig: b.c.abr.enabled }));
	    }q.Ma = function (b) {
	      if (this.i != $k) {
	        var c = new I("error", { detail: b });this.dispatchEvent(c);c.defaultPrevented && (b.handled = !0);
	      }
	    };
	    function il(b, c, d) {
	      b.dispatchEvent(new I(c, { detail: { schemeIdUri: d.schemeIdUri, value: d.value, startTime: d.startTime, endTime: d.endTime, id: d.id, eventElement: d.eventElement } }));
	    }function gl(b) {
	      if (!b.a.error) return null;var c = b.a.error.code;if (1 == c) return null;var d = b.a.error.msExtendedCode;d && (0 > d && (d += Math.pow(2, 32)), d = d.toString(16));return new D(2, 3, 3016, c, d, b.a.error.message);
	    }
	    function ll(b, c) {
	      if (b.f) {
	        var d = Al(b),
	            e = !1,
	            f = Object.keys(c),
	            g = 1 == f.length && "00" == f[0];f.length && b.b.periods.forEach(function (b) {
	          b.variants.forEach(function (b) {
	            N.nf(b).forEach(function (d) {
	              var f = b.allowedByKeySystem;d.keyId && (d = c[g ? "00" : d.keyId], b.allowedByKeySystem = !!d && !bl.includes(d));f != b.allowedByKeySystem && (e = !0);
	            });
	          });
	        });f = Oi(b.f);var h = Qi(b.f);(f = N.Qd(f, h, d.variants)) && !f.allowedByKeySystem && Sl(b, d);e && (zl(b), Bl(b, d.variants));
	      }
	    }
	    function ml(b, c, d) {
	      if (b.s && b.s.onExpirationUpdated) b.s.onExpirationUpdated(c, d);b.dispatchEvent(new I("expirationupdated"));
	    }function pl(b, c, d) {
	      0 < c && (b.V() || b.qe(c));d < b.Y() && (b.V() || b.xa(d));
	    }
	    function Ul(b, c) {
	      var d = b.h ? nc(b.h.W) : {},
	          e = Object.keys(d);e = e.length && "00" == e[0];for (var f = !1, g = !1, h = [], k = [], l = r(c), m = l.next(); !m.done; m = l.next()) {
	        m = m.value;var n = [];m.audio && n.push(m.audio);m.video && n.push(m.video);n = r(n);for (var p = n.next(); !p.done; p = n.next()) if (p = p.value, p.keyId) {
	          var v = d[e ? "00" : p.keyId];v ? bl.includes(v) && (k.includes(v) || k.push(v)) : h.includes(p.keyId) || h.push(p.keyId);
	        }m.allowedByApplication ? m.allowedByKeySystem && (f = !0) : g = !0;
	      }if (!f) throw new D(2, 4, 4012, { hasAppRestrictions: g, missingKeys: h,
	        restrictedKeyStatuses: k });
	    }function Vl(b, c) {
	      t(function e() {
	        return z(e, function (e) {
	          switch (e.j) {case 1:
	              return u(e, Promise.resolve(), 2);case 2:
	              b.i != $k && b.dispatchEvent(c), w(e);}
	        });
	      });
	    }function Rl(b) {
	      var c = new Set();b = r(b);for (var d = b.next(); !d.done; d = b.next()) d = d.value, d.language ? c.add(M(d.language)) : c.add("und");return c;
	    }
	    function Ql(b) {
	      var c = new Map();b = r(b);for (var d = b.next(); !d.done; d = b.next()) {
	        var e = d.value;d = "und";var f = [];e.language && (d = M(e.language));"variant" == e.type ? f = e.audioRoles : f = e.roles;f && f.length || (f = [""]);c.has(d) || c.set(d, new Set());e = r(f);for (f = e.next(); !f.done; f = e.next()) f = f.value, c.get(d).add(f);
	      }var g = [];c.forEach(function (b, c) {
	        for (var d = r(b), e = d.next(); !e.done; e = d.next()) g.push({ language: c, role: e.value });
	      });return g;
	    }
	    function Il(b) {
	      b = Al(b);return null == b ? [] : b.variants.filter(function (b) {
	        return N.rb(b);
	      });
	    }function Kl(b) {
	      var c = Al(b);return null == c ? [] : c.textStreams.filter(function (c) {
	        return !b.ac.has(c);
	      });
	    }function Al(b) {
	      var c = b.m.h(),
	          d = null;b = r(b.b.periods);for (var e = b.next(); !e.done; e = b.next()) e = e.value, e.startTime <= c && (d = e);return d;
	    }function Hl(b) {
	      var c = Al(b);return Lh(b.$, c).variant;
	    }
	    function Jl(b) {
	      var c = Al(b);if (null == c) return null;if (!Lh(b.$, c).text) {
	        var d = N.Jb(c.textStreams, b.na, b.fb);d.length && Kh(b.$, c, d[0]);
	      }return Lh(b.$, c).text;
	    }function dl() {
	      return new D(2, 7, 7E3);
	    }function Zk(b, c, d, e, f, g) {
	      return e == b && f.v == g.v && f.uri == g.uri && f.mimeType == g.mimeType && f.Aa == g.Aa ? c : d;
	    }function tk() {
	      return { Aa: null, v: null, mimeType: null, startTime: null, zd: null, uri: null };
	    }
	    function el(b) {
	      return new Promise(function (c, d) {
	        b.Ya = function () {
	          return d(dl());
	        };b.pc = function () {
	          return c();
	        };b.onError = function (b) {
	          return d(b);
	        };b.rc = function () {
	          return d(dl());
	        };
	      });
	    }var $k = 0,
	        Nk = 1,
	        xl = 2,
	        Cl = 3;Y.LoadMode = { DESTROYED: $k, NOT_LOADED: Nk, MEDIA_SOURCE: xl, SRC_EQUALS: Cl };function Wl(b, c, d) {
	      var e = void 0 == c.expiration ? Infinity : c.expiration,
	          f = c.presentationTimeline.Y();c = Xl(c.periods[0]);return { offlineUri: null, originalManifestUri: b, duration: f, size: 0, expiration: e, tracks: c, appMetadata: d };
	    }function Yl(b, c) {
	      var d = ik(new gk(b.wa(), b.ba()), c.periods[0], new W(null, 0)),
	          e = c.appMetadata || {};d = Xl(d);return { offlineUri: b.toString(), originalManifestUri: c.originalManifestUri, duration: c.duration, size: c.size, expiration: c.expiration, tracks: d, appMetadata: e };
	    }
	    function Xl(b) {
	      var c = [],
	          d = N.df(b.variants);d = r(d);for (var e = d.next(); !e.done; e = d.next()) c.push(N.Ed(e.value));b = r(b.textStreams);for (d = b.next(); !d.done; d = b.next()) c.push(N.xc(d.value));return c;
	    }function Zl() {
	      this.a = {};
	    }function $l(b, c) {
	      var d = c.audio,
	          e = c.video;d && !e && (b.a[d.id] = d.bandwidth || c.bandwidth);!d && e && (b.a[e.id] = e.bandwidth || c.bandwidth);if (d && e) {
	        var f = d.bandwidth || 393216,
	            g = e.bandwidth || c.bandwidth - f;0 >= g && (g = c.bandwidth);b.a[d.id] = f;b.a[e.id] = g;
	      }
	    }function am(b, c, d) {
	      d = d.endTime - d.startTime;return bm(b, c) * d;
	    }function bm(b, c) {
	      var d = b.a[c];null == d && (d = 0);return d;
	    }function cm(b) {
	      this.a = !1;this.b = new F();this.c = b;
	    }cm.prototype.destroy = function () {
	      var b = this;if (this.a) return this.b;this.a = !0;return this.c().then(function () {
	        b.b.resolve();
	      }, function () {
	        b.b.resolve();
	      });
	    };function dm(b, c, d) {
	      b = r(b.periods);for (var e = b.next(); !e.done; e = b.next()) e = e.value, e.variants = e.variants.filter(function (b) {
	        return N.bd(b, c, d);
	      });
	    }function em(b) {
	      b = r(b.periods);for (var c = b.next(); !c.done; c = b.next()) c = c.value, c.variants = c.variants.filter(function (b) {
	        var c = !0;b.audio && (c = c && ee(b.audio));b.video && (c = c && ee(b.video));return c;
	      });
	    }function fm(b, c) {
	      for (var d = r(b.periods), e = d.next(); !e.done; e = d.next()) e = e.value, e.variants = e.variants.filter(function (b) {
	        return md(c, b);
	      });
	    }
	    function gm(b) {
	      var c = new hm();b.periods.forEach(function (b, d) {
	        var e = im(b.variants);if (0 == d) {
	          e = r(e.a);for (var f = e.next(); !f.done; f = e.next()) c.add(f.value);
	        } else jm(c, e);
	      });b = r(b.periods);for (var d = b.next(); !d.done; d = b.next()) d = d.value, d.variants = d.variants.filter(function (b) {
	        return km(c, new lm(b));
	      });
	    }
	    function mm(b, c) {
	      return t(function e() {
	        var f, g, h, k;return z(e, function (e) {
	          switch (e.j) {case 1:
	              f = null, g = r(b.periods), h = g.next();case 2:
	              if (h.done) {
	                e.A(0);break;
	              }k = h.value;f && (k.variants = k.variants.filter(function (b) {
	                return km(f, new lm(b));
	              }));return u(e, c(k), 5);case 5:
	              f = im(k.variants), h = g.next(), e.A(2);}
	        });
	      });
	    }function lm(b) {
	      var c = b.audio;b = b.video;this.b = c ? c.mimeType : null;this.a = c ? c.codecs.split(".")[0] : null;this.f = b ? b.mimeType : null;this.c = b ? b.codecs.split(".")[0] : null;
	    }function hm() {
	      this.a = [];
	    }
	    hm.prototype.add = function (b) {
	      km(this, b) || this.a.push(b);
	    };function jm(b, c) {
	      b.a = b.a.filter(function (b) {
	        return km(c, b);
	      });
	    }function km(b, c) {
	      return b.a.some(function (b) {
	        return c.b == b.b && c.a == b.a && c.f == b.f && c.c == b.c;
	      });
	    }function im(b) {
	      var c = new hm();b = r(b);for (var d = b.next(); !d.done; d = b.next()) c.add(new lm(d.value));return c;
	    }function Z(b) {
	      var c = this;if (b && b.constructor != Y) throw new D(2, 9, 9008);this.b = this.a = null;b ? (this.a = b.c, this.b = b.Mb()) : (this.a = Ek(), this.b = new J());this.f = !1;this.c = [];this.g = [];var d = !b;this.h = new cm(function () {
	        return t(function f() {
	          var b;return z(f, function (f) {
	            switch (f.j) {case 1:
	                return b = function () {}, u(f, Promise.all(c.g.map(function (c) {
	                  return c.then(b, b);
	                })), 2);case 2:
	                if (!d) {
	                  f.A(3);break;
	                }return u(f, c.b.destroy(), 3);case 3:
	                c.a = null, c.b = null, w(f);}
	          });
	        });
	      });
	    }A("shaka.offline.Storage", Z);
	    function nm() {
	      if (sc()) a: {
	        var b = r(Oj.values());for (var c = b.next(); !c.done; c = b.next()) if (c = c.value, c = c()) {
	          c.destroy();b = !0;break a;
	        }b = !1;
	      } else b = !1;return b;
	    }Z.support = nm;Z.prototype.destroy = function () {
	      return this.h.destroy();
	    };Z.prototype.destroy = Z.prototype.destroy;
	    Z.prototype.configure = function (b, c) {
	      2 == arguments.length && "string" == typeof b && (b = Ck(b, c));var d = b,
	          e = !1;null != d.trackSelectionCallback && (e = !0, d.offline = d.offline || {}, d.offline.trackSelectionCallback = d.trackSelectionCallback, delete d.trackSelectionCallback);null != d.progressCallback && (e = !0, d.offline = d.offline || {}, d.offline.progressCallback = d.progressCallback, delete d.progressCallback);null != d.usePersistentLicense && (e = !0, d.offline = d.offline || {}, d.offline.usePersistentLicense = d.usePersistentLicense, delete d.usePersistentLicense);
	      e && ze("Storage.configure with OfflineConfig", "Please configure storage with a player configuration.");return Gk(this.a, b);
	    };Z.prototype.configure = Z.prototype.configure;Z.prototype.getConfiguration = function () {
	      var b = Ek();Gk(b, this.a, Ek());return b;
	    };Z.prototype.getConfiguration = Z.prototype.getConfiguration;Z.prototype.Mb = function () {
	      return this.b;
	    };Z.prototype.getNetworkingEngine = Z.prototype.Mb;
	    Z.prototype.store = function (b, c, d) {
	      var e = this;return om(this, pm(this, b, c || {}, function () {
	        return t(function g() {
	          var c, k;return z(g, function (g) {
	            switch (g.j) {case 1:
	                return d && "string" != typeof d ? (ze("Storing with a manifest parser factory", "Please register a manifest parser and for the mime-type."), c = d, g["return"](new c())) : u(g, V.create(b, e.b, e.a.manifest.retryParameters, d), 2);case 2:
	                return k = g.o, g["return"](k);}
	          });
	        });
	      }));
	    };Z.prototype.store = Z.prototype.store;Z.prototype.kf = function () {
	      return this.f;
	    };
	    Z.prototype.getStoreInProgress = Z.prototype.kf;
	    function pm(b, c, d, e) {
	      return t(function g() {
	        var h, k, l, m, n, p, v, x, B, y;return z(g, function (g) {
	          switch (g.j) {case 1:
	              qm();if (b.f) return g["return"](Promise.reject(new D(2, 9, 9006)));b.f = !0;return u(g, rm(b, c, e), 2);case 2:
	              h = g.o;sm(b);k = !h.presentationTimeline.V() && !h.presentationTimeline.Xa();if (!k) throw new D(2, 9, 9005, c);l = null;m = new Nj();p = n = null;za(g, 3, 4);return u(g, tm(b, h, function (b) {
	                p = p || b;
	              }), 6);case 6:
	              l = g.o;sm(b);if (p) throw p;return u(g, um(b, h, l), 7);case 7:
	              return u(g, m.init(), 8);case 8:
	              return sm(b), u(g, Pj(m), 9);case 9:
	              return n = g.o, sm(b), u(g, vm(b, n.ba, l, h, c, d), 10);case 10:
	              v = g.o;sm(b);if (p) throw p;return u(g, n.ba.addManifests([v]), 11);case 11:
	              return x = g.o, sm(b), B = new ek("manifest", n.path.wa, n.path.ba, x[0]), g["return"](Yl(B, v));case 4:
	              return Fa(g), b.f = !1, b.c = [], u(g, m.destroy(), 12);case 12:
	              if (!l) {
	                g.A(13);break;
	              }return u(g, l.destroy(), 13);case 13:
	              Ga(g, 0);break;case 3:
	              y = Ca(g);if (!n) {
	                g.A(15);break;
	              }return u(g, n.ba.removeSegments(b.c, function () {}), 15);case 15:
	              throw p || y;}
	        });
	      });
	    }
	    function um(b, c, d) {
	      return t(function f() {
	        var g;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = { width: Infinity, height: Infinity }, dm(c, b.a.restrictions, g), em(c), fm(c, d), gm(c), u(f, mm(c, function (c) {
	                return t(function m() {
	                  var d, f, g, h, k, y, G, E;return z(m, function (m) {
	                    switch (m.j) {case 1:
	                        d = N;f = [];for (var n = r(c.variants), p = n.next(); !p.done; p = n.next()) g = p.value, f.push(d.Ed(g));n = r(c.textStreams);for (p = n.next(); !p.done; p = n.next()) h = p.value, f.push(d.xc(h));return u(m, b.a.offline.trackSelectionCallback(f), 2);
	                      case 2:
	                        k = m.o;y = new Set();G = new Set();n = r(k);for (p = n.next(); !p.done; p = n.next()) E = p.value, "variant" == E.type && y.add(E.id), "text" == E.type && G.add(E.id);c.variants = c.variants.filter(function (b) {
	                          return y.has(b.id);
	                        });c.textStreams = c.textStreams.filter(function (b) {
	                          return G.has(b.id);
	                        });w(m);}
	                  });
	                });
	              }), 2);case 2:
	              wm(c), w(f);}
	        });
	      });
	    }
	    function vm(b, c, d, e, f, g) {
	      return t(function k() {
	        var l, m, n, p, v, x, B, y, G, E;return z(k, function (k) {
	          switch (k.j) {case 1:
	              return l = Wl(f, e, g), m = e.periods.some(function (b) {
	                return b.variants.some(function (b) {
	                  return b.drmInfos && b.drmInfos.length;
	                });
	              }), n = e.periods.some(function (b) {
	                return b.variants.some(function (b) {
	                  return b.drmInfos.some(function (b) {
	                    return b.initData && b.initData.length;
	                  });
	                });
	              }), p = m && !n, v = null, p && (x = d.a, v = xm.get(x.keySystem)), B = new zj(b.b, function (c, d) {
	                l.size = d;b.a.offline.progressCallback(l, c);
	              }, function (c, e) {
	                p && b.a.offline.usePersistentLicense && v == e && Xc(d, "cenc", c);
	              }), Aa(k, 2), G = y = ym(b, B, c, d, e, f, g), u(k, Cj(B), 4);case 4:
	              G.size = k.o;y.expiration = d.Lb();E = cd(d);y.sessionIds = b.a.offline.usePersistentLicense ? E : [];if (m && b.a.offline.usePersistentLicense && !E.length) throw new D(2, 9, 9007);return k["return"](y);case 2:
	              return Fa(k), u(k, B.destroy(), 5);case 5:
	              Ga(k, 0);}
	        });
	      });
	    }Z.prototype.remove = function (b) {
	      return om(this, zm(this, b));
	    };Z.prototype.remove = Z.prototype.remove;
	    function zm(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m;return z(e, function (e) {
	          switch (e.j) {case 1:
	              qm();f = fk(c);if (null == f || "manifest" != f.a) return e["return"](Promise.reject(new D(2, 9, 9004, c)));g = f;h = new Nj();Aa(e, 2);return u(e, h.init(), 4);case 4:
	              return u(e, Rj(h, g.wa(), g.ba()), 5);case 5:
	              return k = e.o, u(e, k.getManifests([g.key()]), 6);case 6:
	              return l = e.o, m = l[0], u(e, Promise.all([Am(b, m, h), Bm(b, k, g, m)]), 2);case 2:
	              return Fa(e), u(e, h.destroy(), 8);case 8:
	              Ga(e, 0);}
	        });
	      });
	    }
	    function Cm(b, c) {
	      for (var d = [], e = r(b.periods), f = e.next(); !f.done; f = e.next()) {
	        f = r(f.value.streams);for (var g = f.next(); !g.done; g = f.next()) g = g.value, c && "video" == g.contentType ? d.push({ contentType: oc(g.mimeType, g.codecs), robustness: b.drmInfo.videoRobustness }) : c || "audio" != g.contentType || d.push({ contentType: oc(g.mimeType, g.codecs), robustness: b.drmInfo.audioRobustness });
	      }return d;
	    }function Am(b, c, d) {
	      return t(function f() {
	        return z(f, function (f) {
	          switch (f.j) {case 1:
	              return u(f, Dm(b.b, b.a.drm, d, c), 0);}
	        });
	      });
	    }
	    function Bm(b, c, d, e) {
	      function f() {
	        k += 1;b.a.offline.progressCallback(l, k / h);
	      }var g = Em(e),
	          h = g.length + 1,
	          k = 0,
	          l = Yl(d, e);return Promise.all([c.removeSegments(g, f), c.removeManifests([d.key()], f)]);
	    }Z.prototype.Xf = function () {
	      return om(this, Fm(this));
	    };Z.prototype.removeEmeSessions = Z.prototype.Xf;
	    function Fm(b) {
	      return t(function d() {
	        var e, f, g, h, k, l, m, n, p;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return qm(), e = b.b, f = b.a.drm, g = new Nj(), h = !1, Aa(d, 2), u(d, g.init(), 4);case 4:
	              k = [];Sj(g, function (b) {
	                return k.push(b);
	              });l = Promise.resolve();m = {};n = r(k);for (p = n.next(); !p.done; m = { wc: m.wc }, p = n.next()) m.wc = p.value, l = l.then(function (b) {
	                return function () {
	                  return t(function y() {
	                    var d, g;return z(y, function (k) {
	                      switch (k.j) {case 1:
	                          return u(k, b.wc.getAll(), 2);case 2:
	                          return d = k.o, u(k, pk(f, e, d), 3);case 3:
	                          return g = k.o, u(k, b.wc.remove(g), 4);case 4:
	                          g.length != d.length && (h = !0), w(k);}
	                    });
	                  });
	                };
	              }(m));return u(d, l, 2);case 2:
	              return Fa(d), u(d, g.destroy(), 6);case 6:
	              Ga(d, 3);break;case 3:
	              return d["return"](!h);}
	        });
	      });
	    }Z.prototype.list = function () {
	      return om(this, Gm());
	    };Z.prototype.list = Z.prototype.list;
	    function Gm() {
	      return t(function c() {
	        var d, e, f;return z(c, function (c) {
	          switch (c.j) {case 1:
	              return qm(), d = [], e = new Nj(), Aa(c, 2), u(c, e.init(), 4);case 4:
	              return f = Promise.resolve(), Qj(e, function (c, e) {
	                f = f.then(function () {
	                  return t(function m() {
	                    var f;return z(m, function (g) {
	                      switch (g.j) {case 1:
	                          return u(g, e.getAllManifests(), 2);case 2:
	                          f = g.o, f.forEach(function (e, f) {
	                            var g = Yl(new ek("manifest", c.wa, c.ba, f), e);d.push(g);
	                          }), w(g);}
	                    });
	                  });
	                });
	              }), u(c, f, 2);case 2:
	              return Fa(c), u(c, e.destroy(), 6);case 6:
	              Ga(c, 3);break;case 3:
	              return c["return"](d);}
	        });
	      });
	    }
	    function rm(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = null, h = b.b, k = { networkingEngine: h, filterAllPeriods: function () {}, filterNewPeriod: function () {}, onTimelineRegionAdded: function () {}, onEvent: function () {}, onError: function (b) {
	                  g = b;
	                } }, u(f, d(), 2);case 2:
	              return l = f.o, l.configure(b.a.manifest), sm(b), Aa(f, 3), u(f, l.start(c, k), 5);case 5:
	              return m = f.o, sm(b), n = Hm(m), u(f, Promise.all(kc(n, function (b) {
	                return b.createSegmentIndex();
	              })), 6);case 6:
	              sm(b);if (g) throw g;
	              return f["return"](m);case 3:
	              return Fa(f), u(f, l.stop(), 7);case 7:
	              Ga(f, 0);}
	        });
	      });
	    }function tm(b, c, d) {
	      return t(function f() {
	        var g, h, k;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = new Gc({ ub: b.b, onError: d, qc: function () {}, onExpirationUpdated: function () {}, onEvent: function () {} }), h = ji(c.periods), k = b.a, g.configure(k.drm), u(f, Lc(g, h, k.offline.usePersistentLicense), 2);case 2:
	              return u(f, Vc(g), 3);case 3:
	              return u(f, Wc(g), 4);case 4:
	              return f["return"](g);}
	        });
	      });
	    }
	    function ym(b, c, d, e, f, g, h) {
	      var k = new Zl(),
	          l = f.periods.map(function (e) {
	        return Im(b, c, d, k, f, e);
	      }),
	          m = e.a,
	          n = b.a.offline.usePersistentLicense;m && n && (m.initData = []);return { originalManifestUri: g, duration: f.presentationTimeline.Y(), size: 0, expiration: e.Lb(), periods: l, sessionIds: n ? cd(e) : [], drmInfo: m, appMetadata: h };
	    }
	    function Im(b, c, d, e, f, g) {
	      for (var h = r(g.variants), k = h.next(); !k.done; k = h.next()) $l(e, k.value);h = r(g.textStreams);for (k = h.next(); !k.done; k = h.next()) e.a[k.value.id] = 52;h = Jm(g);var l = new Map();h = r(h);for (k = h.next(); !k.done; k = h.next()) {
	        k = k.value;var m = Km(b, c, d, e, f, k);l.set(k.id, m);
	      }g.variants.forEach(function (b) {
	        b.audio && l.get(b.audio.id).variantIds.push(b.id);b.video && l.get(b.video.id).variantIds.push(b.id);
	      });return { startTime: g.startTime, streams: Array.from(l.values()) };
	    }
	    function Km(b, c, d, e, f, g) {
	      var h = { id: g.id, originalId: g.originalId, primary: g.primary, presentationTimeOffset: g.presentationTimeOffset || 0, contentType: g.type, mimeType: g.mimeType, codecs: g.codecs, frameRate: g.frameRate, pixelAspectRatio: g.pixelAspectRatio, kind: g.kind, language: g.language, label: g.label, width: g.width || null, height: g.height || null, initSegmentKey: null, encrypted: g.encrypted, keyId: g.keyId, segments: [], variantIds: [] };f = f.presentationTimeline.Ob();var k = g.id,
	          l = g.initSegmentReference;l && (l = rg(l.c(), l.b, l.a, b.a.streaming.retryParameters), Aj(c, k, l, .5 * bm(e, g.id), !0, function (c) {
	        return t(function p() {
	          var e;return z(p, function (f) {
	            switch (f.j) {case 1:
	                return u(f, d.addSegments([{ data: c }]), 2);case 2:
	                e = f.o, b.c.push(e[0]), h.initSegmentKey = e[0], w(f);}
	          });
	        });
	      }));Lm(g, f, function (f) {
	        var l = rg(f.c(), f.b, f.a, b.a.streaming.retryParameters);Aj(c, k, l, am(e, g.id, f), !1, function (c) {
	          return t(function x() {
	            var e;return z(x, function (g) {
	              switch (g.j) {case 1:
	                  return u(g, d.addSegments([{ data: c }]), 2);case 2:
	                  e = g.o, b.c.push(e[0]), h.segments.push({ startTime: f.startTime,
	                    endTime: f.endTime, dataKey: e[0] }), w(g);}
	            });
	          });
	        });
	      });return h;
	    }function Lm(b, c, d) {
	      c = b.findSegmentPosition(c);for (var e = null == c ? null : b.getSegmentReference(c); e;) d(e), e = b.getSegmentReference(++c);
	    }function sm(b) {
	      if (b.h.a) throw new D(2, 9, 7001);
	    }function qm() {
	      if (!nm()) throw new D(2, 9, 9E3);
	    }function om(b, c) {
	      return t(function e() {
	        return z(e, function (e) {
	          switch (e.j) {case 1:
	              return b.g.push(c), Aa(e, 2), u(e, c, 4);case 4:
	              return e["return"](e.o);case 2:
	              Fa(e), Pb(b.g, c), Ga(e, 0);}
	        });
	      });
	    }
	    function Em(b) {
	      var c = [];b.periods.forEach(function (b) {
	        b.streams.forEach(function (b) {
	          null != b.initSegmentKey && c.push(b.initSegmentKey);b.segments.forEach(function (b) {
	            c.push(b.dataKey);
	          });
	        });
	      });return c;
	    }Z.deleteAll = function () {
	      return t(function c() {
	        var d;return z(c, function (c) {
	          switch (c.j) {case 1:
	              return d = new Nj(), Aa(c, 2), u(c, d.erase(), 2);case 2:
	              return Fa(c), u(c, d.destroy(), 5);case 5:
	              Ga(c, 0);}
	        });
	      });
	    };
	    function Dm(b, c, d, e) {
	      return t(function g() {
	        var h, k, l;return z(g, function (g) {
	          switch (g.j) {case 1:
	              if (!e.drmInfo) return g["return"]();h = Tj(d);k = e.sessionIds.map(function (b) {
	                return { sessionId: b, keySystem: e.drmInfo.keySystem, licenseUri: e.drmInfo.licenseServerUri, serverCertificate: e.drmInfo.serverCertificate, audioCapabilities: Cm(e, !1), videoCapabilities: Cm(e, !0) };
	              });return u(g, pk(c, b, k), 2);case 2:
	              return l = g.o, u(g, h.remove(l), 3);case 3:
	              return u(g, h.add(k.filter(function (b) {
	                return -1 == l.indexOf(b.sessionId);
	              })), 0);}
	        });
	      });
	    }function Hm(b) {
	      var c = new Set();b = r(b.periods);for (var d = b.next(); !d.done; d = b.next()) {
	        d = d.value;for (var e = r(d.textStreams), f = e.next(); !f.done; f = e.next()) c.add(f.value);d = r(d.variants);for (e = d.next(); !e.done; e = d.next()) e = e.value, e.audio && c.add(e.audio), e.video && c.add(e.video);
	      }return c;
	    }
	    function Jm(b) {
	      for (var c = new Set(), d = r(b.textStreams), e = d.next(); !e.done; e = d.next()) c.add(e.value);b = r(b.variants);for (d = b.next(); !d.done; d = b.next()) d = d.value, d.audio && c.add(d.audio), d.video && c.add(d.video);return c;
	    }function wm(b) {
	      if (0 == b.periods.length) throw new D(2, 4, 4014);b = r(b.periods);for (var c = b.next(); !c.done; c = b.next()) Mm(c.value);
	    }
	    function Mm(b) {
	      b.variants.map(function (b) {
	        return b.video;
	      });var c = new Set(b.variants.map(function (b) {
	        return b.audio;
	      }));b = b.textStreams;for (var d = r(c), e = d.next(); !e.done; e = d.next()) {
	        e = r(c);for (var f = e.next(); !f.done; f = e.next());
	      }c = r(b);for (d = c.next(); !d.done; d = c.next()) for (d = r(b), e = d.next(); !e.done; e = d.next());
	    }
	    var xm = new Map().set("org.w3.clearkey", "1077efecc0b24d02ace33c1e52e2fb4b").set("com.widevine.alpha", "edef8ba979d64acea3c827dcd51d21ed").set("com.microsoft.playready", "9a04f07998404286ab92e65be0885f95").set("com.adobe.primetime", "f239e769efa348509c16a903c6932efb");cl.offline = nm;A("shaka.polyfill.installAll", function () {
	      for (var b = 0; b < Nm.length; ++b) try {
	        Nm[b].De();
	      } catch (c) {
	        cb("Error installing polyfill!", c);
	      }
	    });var Nm = [];function Om(b, c) {
	      c = c || 0;for (var d = { priority: c, De: b }, e = 0; e < Nm.length; e++) if (Nm[e].priority < c) {
	        Nm.splice(e, 0, d);return;
	      }Nm.push(d);
	    }A("shaka.polyfill.register", Om);Om(function () {
	      Pm();
	    }, -1);function Qm(b) {
	      var c = b.type.replace(/^(webkit|moz|MS)/, "").toLowerCase();if ("function" === typeof Event) var d = new Event(c, b);else d = document.createEvent("Event"), d.initEvent(c, b.bubbles, b.cancelable);b.target.dispatchEvent(d);
	    }
	    Om(function () {
	      if (window.Document) {
	        var b = Element.prototype;b.requestFullscreen = b.requestFullscreen || b.mozRequestFullScreen || b.msRequestFullscreen || b.webkitRequestFullscreen;b = Document.prototype;b.exitFullscreen = b.exitFullscreen || b.mozCancelFullScreen || b.msExitFullscreen || b.webkitExitFullscreen;"fullscreenElement" in document || (Object.defineProperty(document, "fullscreenElement", { get: function () {
	            return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
	          } }), Object.defineProperty(document, "fullscreenEnabled", { get: function () {
	            return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled;
	          } }));document.addEventListener("webkitfullscreenchange", Qm);document.addEventListener("webkitfullscreenerror", Qm);document.addEventListener("mozfullscreenchange", Qm);document.addEventListener("mozfullscreenerror", Qm);document.addEventListener("MSFullscreenChange", Qm);document.addEventListener("MSFullscreenError", Qm);
	      }
	    });Om(function () {
	      var b = !1;if (wc("CrKey")) b = !0;else try {
	        window.indexedDB && (b = !1);
	      } catch (c) {
	        b = !0;
	      }b && delete window.indexedDB;
	    });function Rm(b, c, d) {
	      if ("input" == b) switch (this.type) {case "range":
	          b = "change";}HTMLInputElement.prototype.originalAddEventListener.call(this, b, c, d);
	    }Om(function () {
	      wc("Trident/") && !HTMLInputElement.prototype.originalAddEventListener && (HTMLInputElement.prototype.originalAddEventListener = HTMLInputElement.prototype.addEventListener, HTMLInputElement.prototype.addEventListener = Rm);
	    });Om(function () {
	      navigator.languages || Object.defineProperty(navigator, "languages", { get: function () {
	          return navigator.language ? [navigator.language] : ["en"];
	        } });
	    });Om(function () {});function Sm() {
	      var b = MediaSource.prototype.addSourceBuffer;MediaSource.prototype.addSourceBuffer = function (c) {
	        for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];d = b.apply(this, d);d.abort = function () {};return d;
	      };
	    }function Tm() {
	      var b = SourceBuffer.prototype.remove;SourceBuffer.prototype.remove = function (c, d) {
	        return b.call(this, c, d - .001);
	      };
	    }function Um() {
	      var b = MediaSource.isTypeSupported;MediaSource.isTypeSupported = function (c) {
	        return "mp2t" == c.split(/ *; */)[0].split("/")[1].toLowerCase() ? !1 : b(c);
	      };
	    }
	    function Vm() {
	      var b = MediaSource.isTypeSupported;MediaSource.isTypeSupported = function (c) {
	        return "opus" != rc(c)[0] && b(c);
	      };
	    }
	    function Wm() {
	      var b = MediaSource.isTypeSupported,
	          c = /^dv(?:h[e1]|a[v1])\./;MediaSource.isTypeSupported = function (d) {
	        for (var e = d.split(/ *; */), f = e[0], g = {}, h = 1; h < e.length; ++h) {
	          var k = e[h].split("="),
	              l = k[0];k = k[1].replace(/"(.*)"/, "$1");g[l] = k;
	        }e = g.codecs;if (!e) return b(d);var m = !1,
	            n = !1;d = e.split(",").filter(function (b) {
	          c.test(b) && (n = !0);/^(hev|hvc)1\.2/.test(b) && (m = !0);return !0;
	        });n && (m = !1);g.codecs = d.join(",");m && (g.eotf = "smpte2084");for (var p in g) f += "; " + p + '="' + g[p] + '"';return cast.__platform__.canDisplayType(f);
	      };
	    }
	    Om(function () {
	      var b = xc();window.MediaSource && (window.cast && cast.__platform__ && cast.__platform__.canDisplayType ? Wm() : b ? (Um(), 12 >= b ? (Sm(), Tm()) : Sm()) : wc("Tizen") && Vm());
	    });function Xm(b, c) {
	      try {
	        var d = new Ym(b, c);return Promise.resolve(d);
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	    function Ym(b, c) {
	      this.keySystem = b;if (b.startsWith("com.apple.fps")) for (var d = r(c), e = d.next(); !e.done; e = d.next()) {
	        var f = e.value;if ("required" == f.persistentState) e = null;else {
	          e = { audioCapabilities: [], videoCapabilities: [], persistentState: "optional", distinctiveIdentifier: "optional", initDataTypes: f.initDataTypes, sessionTypes: ["temporary"], label: f.label };var g = !1,
	              h = !1;if (f.audioCapabilities) for (var k = r(f.audioCapabilities), l = k.next(); !l.done; l = k.next()) if (l = l.value, l.contentType) {
	            g = !0;var m = l.contentType.split(";")[0];
	            WebKitMediaKeys.isTypeSupported(this.keySystem, m) && (e.audioCapabilities.push(l), h = !0);
	          }if (f.videoCapabilities) for (f = r(f.videoCapabilities), l = f.next(); !l.done; l = f.next()) k = l.value, k.contentType && (g = !0, l = k.contentType.split(";")[0], WebKitMediaKeys.isTypeSupported(this.keySystem, l) && (e.videoCapabilities.push(k), h = !0));g || (h = WebKitMediaKeys.isTypeSupported(this.keySystem, "video/mp4"));e = h ? e : null;
	        }if (e) {
	          this.a = e;return;
	        }
	      }d = Error("Unsupported keySystem");d.name = "NotSupportedError";d.code = DOMException.NOT_SUPPORTED_ERR;
	      throw d;
	    }Ym.prototype.createMediaKeys = function () {
	      var b = new Zm(this.keySystem);return Promise.resolve(b);
	    };Ym.prototype.getConfiguration = function () {
	      return this.a;
	    };function $m(b) {
	      var c = this.mediaKeys;c && c != b && an(c, null);delete this.mediaKeys;return (this.mediaKeys = b) ? an(b, this) : Promise.resolve();
	    }function Zm(b) {
	      this.b = new WebKitMediaKeys(b);this.a = new K();
	    }
	    Zm.prototype.createSession = function (b) {
	      b = b || "temporary";if ("temporary" != b) throw new TypeError("Session type " + b + " is unsupported on this platform.");return new bn(this.b, b);
	    };Zm.prototype.setServerCertificate = function (b) {
	return Promise.resolve(!0);
	    };
	    function an(b, c) {
	      b.a.$a();if (!c) return Promise.resolve();b.a.w(c, "webkitneedkey", cn);try {
	        return 1 <= c.readyState ? c.webkitSetMediaKeys(b.b) : b.a.da(c, "loadedmetadata", function () {
	          c.webkitSetMediaKeys(b.b);
	        }), Promise.resolve();
	      } catch (d) {
	        return Promise.reject(d);
	      }
	    }function bn(b) {
	      Mb.call(this);this.b = null;this.g = b;this.c = this.a = null;this.f = new K();this.sessionId = "";this.expiration = NaN;this.closed = new F();this.keyStatuses = new dn();
	    }Xa(bn, Mb);q = bn.prototype;
	    q.generateRequest = function (b, c) {
	      this.a = new F();try {
	        this.b = this.g.createSession("video/mp4", new Uint8Array(c)), this.sessionId = this.b.sessionId || "", this.f.w(this.b, "webkitkeymessage", this.og.bind(this)), this.f.w(this.b, "webkitkeyadded", this.mg.bind(this)), this.f.w(this.b, "webkitkeyerror", this.ng.bind(this)), en(this, "status-pending");
	      } catch (d) {
	        this.a.reject(d);
	      }return this.a;
	    };q.load = function () {
	      return Promise.reject(Error("MediaKeySession.load not yet supported"));
	    };q.update = function (b) {
	      this.c = new F();try {
	        this.b.update(new Uint8Array(b));
	      } catch (c) {
	        this.c.reject(c);
	      }return this.c;
	    };
	    q.close = function () {
	      try {
	        this.b.close(), this.closed.resolve(), this.f.$a();
	      } catch (b) {
	        this.closed.reject(b);
	      }return this.closed;
	    };q.remove = function () {
	      return Promise.reject(Error("MediaKeySession.remove is only applicable for persistent licenses, which are not supported on this platform"));
	    };function cn(b) {
	      var c = new Event("encrypted");c.initDataType = "cenc";c.initData = b.initData;this.dispatchEvent(c);
	    }
	    q.og = function (b) {
	      this.a && (this.a.resolve(), this.a = null);this.dispatchEvent(new I("message", { messageType: void 0 == this.keyStatuses.a ? "license-request" : "license-renewal", message: b.message.buffer }));
	    };q.mg = function () {
	      this.c && (en(this, "usable"), this.c.resolve(), this.c = null);
	    };
	    q.ng = function () {
	      var b = Error("EME PatchedMediaKeysApple key error");b.errorCode = this.b.error;if (null != this.a) this.a.reject(b), this.a = null;else if (null != this.c) this.c.reject(b), this.c = null;else switch (this.b.error.code) {case WebKitMediaKeyError.MEDIA_KEYERR_OUTPUT:case WebKitMediaKeyError.MEDIA_KEYERR_HARDWARECHANGE:
	          en(this, "output-not-allowed");break;default:
	          en(this, "internal-error");}
	    };function en(b, c) {
	      var d = b.keyStatuses;d.size = void 0 == c ? 0 : 1;d.a = c;b.dispatchEvent(new I("keystatuseschange"));
	    }
	    function dn() {
	      this.size = 0;this.a = void 0;
	    }var fn;q = dn.prototype;q.forEach = function (b) {
	      this.a && b(this.a, fn);
	    };q.get = function (b) {
	      if (this.has(b)) return this.a;
	    };q.has = function (b) {
	      var c = fn;return this.a && L.za(new Uint8Array(b), new Uint8Array(c)) ? !0 : !1;
	    };q.entries = function () {};q.keys = function () {};q.values = function () {};
	    Om(function () {
	      window.HTMLVideoElement && window.WebKitMediaKeys && (fn = new Uint8Array([0]).buffer, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = $m, window.MediaKeys = Zm, window.MediaKeySystemAccess = Ym, navigator.requestMediaKeySystemAccess = Xm);
	    });function gn(b, c) {
	      try {
	        var d = new hn(b, c);return Promise.resolve(d);
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	    function hn(b, c) {
	      this.keySystem = b;for (var d = !1, e = 0; e < c.length; ++e) {
	        var f = c[e],
	            g = { audioCapabilities: [], videoCapabilities: [], persistentState: "optional", distinctiveIdentifier: "optional", initDataTypes: f.initDataTypes, sessionTypes: ["temporary"], label: f.label },
	            h = !1;if (f.audioCapabilities) for (var k = 0; k < f.audioCapabilities.length; ++k) {
	          var l = f.audioCapabilities[k];if (l.contentType) {
	            h = !0;var m = l.contentType.split(";")[0];MSMediaKeys.isTypeSupported(this.keySystem, m) && (g.audioCapabilities.push(l), d = !0);
	          }
	        }if (f.videoCapabilities) for (k = 0; k < f.videoCapabilities.length; ++k) l = f.videoCapabilities[k], l.contentType && (h = !0, m = l.contentType.split(";")[0], MSMediaKeys.isTypeSupported(this.keySystem, m) && (g.videoCapabilities.push(l), d = !0));h || (d = MSMediaKeys.isTypeSupported(this.keySystem, "video/mp4"));"required" == f.persistentState && (d = !1);if (d) {
	          this.a = g;return;
	        }
	      }d = Error("Unsupported keySystem");d.name = "NotSupportedError";d.code = DOMException.NOT_SUPPORTED_ERR;throw d;
	    }hn.prototype.createMediaKeys = function () {
	      var b = new jn(this.keySystem);return Promise.resolve(b);
	    };
	    hn.prototype.getConfiguration = function () {
	      return this.a;
	    };function kn(b) {
	      var c = this.mediaKeys;c && c != b && ln(c, null);delete this.mediaKeys;return (this.mediaKeys = b) ? ln(b, this) : Promise.resolve();
	    }function jn(b) {
	      this.a = new MSMediaKeys(b);this.b = new K();
	    }jn.prototype.createSession = function (b) {
	      b = b || "temporary";if ("temporary" != b) throw new TypeError("Session type " + b + " is unsupported on this platform.");return new mn(this.a, b);
	    };jn.prototype.setServerCertificate = function () {
	      return Promise.resolve(!1);
	    };
	    function ln(b, c) {
	      function d() {
	        c.msSetMediaKeys(e.a);c.removeEventListener("loadedmetadata", d);
	      }b.b.$a();if (!c) return Promise.resolve();b.b.w(c, "msneedkey", nn);var e = b;try {
	        return 1 <= c.readyState ? c.msSetMediaKeys(b.a) : c.addEventListener("loadedmetadata", d), Promise.resolve();
	      } catch (f) {
	        return Promise.reject(f);
	      }
	    }function mn(b) {
	      Mb.call(this);this.c = null;this.g = b;this.b = this.a = null;this.f = new K();this.sessionId = "";this.expiration = NaN;this.closed = new F();this.keyStatuses = new on();
	    }Xa(mn, Mb);q = mn.prototype;
	    q.generateRequest = function (b, c) {
	      this.a = new F();try {
	        this.c = this.g.createSession("video/mp4", new Uint8Array(c), null), this.f.w(this.c, "mskeymessage", this.If.bind(this)), this.f.w(this.c, "mskeyadded", this.Gf.bind(this)), this.f.w(this.c, "mskeyerror", this.Hf.bind(this)), pn(this, "status-pending");
	      } catch (d) {
	        this.a.reject(d);
	      }return this.a;
	    };q.load = function () {
	      return Promise.reject(Error("MediaKeySession.load not yet supported"));
	    };q.update = function (b) {
	      this.b = new F();try {
	        this.c.update(new Uint8Array(b));
	      } catch (c) {
	        this.b.reject(c);
	      }return this.b;
	    };
	    q.close = function () {
	      try {
	        this.c.close(), this.closed.resolve(), this.f.$a();
	      } catch (b) {
	        this.closed.reject(b);
	      }return this.closed;
	    };q.remove = function () {
	      return Promise.reject(Error("MediaKeySession.remove is only applicable for persistent licenses, which are not supported on this platform"));
	    };function nn(b) {
	      if (b.initData) {
	        var c = document.createEvent("CustomEvent");c.initCustomEvent("encrypted", !1, !1, null);c.initDataType = "cenc";c.initData = Cf(b.initData);this.dispatchEvent(c);
	      }
	    }
	    q.If = function (b) {
	      this.a && (this.a.resolve(), this.a = null);this.dispatchEvent(new I("message", { messageType: void 0 == this.keyStatuses.a ? "license-request" : "license-renewal", message: b.message.buffer }));
	    };q.Gf = function () {
	      this.a ? (pn(this, "usable"), this.a.resolve(), this.a = null) : this.b && (pn(this, "usable"), this.b.resolve(), this.b = null);
	    };
	    q.Hf = function () {
	      var b = Error("EME PatchedMediaKeysMs key error");b.errorCode = this.c.error;if (null != this.a) this.a.reject(b), this.a = null;else if (null != this.b) this.b.reject(b), this.b = null;else switch (this.c.error.code) {case MSMediaKeyError.MS_MEDIA_KEYERR_OUTPUT:case MSMediaKeyError.MS_MEDIA_KEYERR_HARDWARECHANGE:
	          pn(this, "output-not-allowed");break;default:
	          pn(this, "internal-error");}
	    };function pn(b, c) {
	      var d = b.keyStatuses;d.size = void 0 == c ? 0 : 1;d.a = c;b.dispatchEvent(new I("keystatuseschange"));
	    }
	    function on() {
	      this.size = 0;this.a = void 0;
	    }var qn;q = on.prototype;q.forEach = function (b) {
	      this.a && b(this.a, qn);
	    };q.get = function (b) {
	      if (this.has(b)) return this.a;
	    };q.has = function (b) {
	      var c = qn;return this.a && L.za(new Uint8Array(b), new Uint8Array(c)) ? !0 : !1;
	    };q.entries = function () {};q.keys = function () {};q.values = function () {};
	    Om(function () {
	      !window.HTMLVideoElement || !window.MSMediaKeys || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration || (qn = new Uint8Array([0]).buffer, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = kn, window.MediaKeys = jn, window.MediaKeySystemAccess = hn, navigator.requestMediaKeySystemAccess = gn);
	    });function rn() {
	      return Promise.reject(Error("The key system specified is not supported."));
	    }function sn(b) {
	      return null == b ? Promise.resolve() : Promise.reject(Error("MediaKeys not supported."));
	    }function tn() {
	      throw new TypeError("Illegal constructor.");
	    }tn.prototype.createSession = function () {};tn.prototype.setServerCertificate = function () {};function un() {
	      throw new TypeError("Illegal constructor.");
	    }un.prototype.getConfiguration = function () {};un.prototype.createMediaKeys = function () {};
	    Om(function () {
	      !window.HTMLVideoElement || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration || (navigator.requestMediaKeySystemAccess = rn, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = sn, window.MediaKeys = tn, window.MediaKeySystemAccess = un);
	    }, -10);var vn = "";function wn(b) {
	      var c = vn;return c ? c + b.charAt(0).toUpperCase() + b.slice(1) : b;
	    }function xn(b, c) {
	      try {
	        var d = new yn(b, c);return Promise.resolve(d);
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }function zn(b) {
	      var c = this.mediaKeys;c && c != b && An(c, null);delete this.mediaKeys;(this.mediaKeys = b) && An(b, this);return Promise.resolve();
	    }
	    function yn(b, c) {
	      this.a = this.keySystem = b;var d = !1;"org.w3.clearkey" == b && (this.a = "webkit-org.w3.clearkey", d = !1);var e = !1;var f = document.getElementsByTagName("video");f = f.length ? f[0] : document.createElement("video");for (var g = 0; g < c.length; ++g) {
	        var h = c[g],
	            k = { audioCapabilities: [], videoCapabilities: [], persistentState: "optional", distinctiveIdentifier: "optional", initDataTypes: h.initDataTypes, sessionTypes: ["temporary"], label: h.label },
	            l = !1;if (h.audioCapabilities) for (var m = 0; m < h.audioCapabilities.length; ++m) {
	          var n = h.audioCapabilities[m];if (n.contentType) {
	            l = !0;var p = n.contentType.split(";")[0];f.canPlayType(p, this.a) && (k.audioCapabilities.push(n), e = !0);
	          }
	        }if (h.videoCapabilities) for (m = 0; m < h.videoCapabilities.length; ++m) n = h.videoCapabilities[m], n.contentType && (l = !0, f.canPlayType(n.contentType, this.a) && (k.videoCapabilities.push(n), e = !0));l || (e = f.canPlayType("video/mp4", this.a) || f.canPlayType("video/webm", this.a));"required" == h.persistentState && (d ? (k.persistentState = "required", k.sessionTypes = ["persistent-license"]) : e = !1);if (e) {
	          this.b = k;return;
	        }
	      }d = "Unsupported keySystem";if ("org.w3.clearkey" == b || "com.widevine.alpha" == b) d = "None of the requested configurations were supported.";d = Error(d);d.name = "NotSupportedError";d.code = DOMException.NOT_SUPPORTED_ERR;throw d;
	    }yn.prototype.createMediaKeys = function () {
	      var b = new Bn(this.a);return Promise.resolve(b);
	    };yn.prototype.getConfiguration = function () {
	      return this.b;
	    };function Bn(b) {
	      this.g = b;this.b = null;this.a = new K();this.c = [];this.f = {};
	    }
	    function An(b, c) {
	      b.b = c;b.a.$a();var d = vn;c && (b.a.w(c, d + "needkey", b.Mf.bind(b)), b.a.w(c, d + "keymessage", b.rg.bind(b)), b.a.w(c, d + "keyadded", b.pg.bind(b)), b.a.w(c, d + "keyerror", b.qg.bind(b)));
	    }q = Bn.prototype;q.createSession = function (b) {
	      b = b || "temporary";if ("temporary" != b && "persistent-license" != b) throw new TypeError("Session type " + b + " is unsupported on this platform.");var c = this.b || document.createElement("video");c.src || (c.src = "about:blank");b = new Cn(c, this.g, b);this.c.push(b);return b;
	    };
	    q.setServerCertificate = function () {
	      return Promise.resolve(!1);
	    };q.Mf = function (b) {
	      var c = document.createEvent("CustomEvent");c.initCustomEvent("encrypted", !1, !1, null);c.initDataType = "webm";c.initData = b.initData;this.b.dispatchEvent(c);
	    };q.rg = function (b) {
	      var c = Dn(this, b.sessionId);c && (b = new I("message", { messageType: void 0 == c.keyStatuses.a ? "licenserequest" : "licenserenewal", message: b.message }), c.b && (c.b.resolve(), c.b = null), c.dispatchEvent(b));
	    };
	    q.pg = function (b) {
	      if (b = Dn(this, b.sessionId)) En(b, "usable"), b.a && b.a.resolve(), b.a = null;
	    };q.qg = function (b) {
	      var c = Dn(this, b.sessionId);c && c.handleError(b);
	    };function Dn(b, c) {
	      var d = b.f[c];return d ? d : (d = b.c.shift()) ? (d.sessionId = c, b.f[c] = d) : null;
	    }function Cn(b, c, d) {
	      Mb.call(this);this.f = b;this.h = !1;this.a = this.b = null;this.c = c;this.g = d;this.sessionId = "";this.expiration = NaN;this.closed = new F();this.keyStatuses = new Fn();
	    }Xa(Cn, Mb);q = Cn.prototype;
	    q.handleError = function (b) {
	      var c = Error("EME v0.1b key error");c.errorCode = b.errorCode;c.errorCode.systemCode = b.systemCode;!b.sessionId && this.b ? (c.method = "generateRequest", 45 == b.systemCode && (c.message = "Unsupported session type."), this.b.reject(c), this.b = null) : b.sessionId && this.a ? (c.method = "update", this.a.reject(c), this.a = null) : (c = b.systemCode, b.errorCode.code == MediaKeyError.MEDIA_KEYERR_OUTPUT ? En(this, "output-restricted") : 1 == c ? En(this, "expired") : En(this, "internal-error"));
	    };
	    function Gn(b, c, d) {
	      if (b.h) return Promise.reject(Error("The session is already initialized."));b.h = !0;try {
	        if ("persistent-license" == b.g) {
	          if (d) var e = new Uint8Array(Ec("LOAD_SESSION|" + d));else {
	            var f = Ec("PERSISTENT|"),
	                g = new Uint8Array(f.byteLength + c.byteLength);g.set(new Uint8Array(f), 0);g.set(new Uint8Array(c), f.byteLength);e = g;
	          }
	        } else e = new Uint8Array(c);
	      } catch (k) {
	        return Promise.reject(k);
	      }b.b = new F();var h = wn("generateKeyRequest");try {
	        b.f[h](b.c, e);
	      } catch (k) {
	        if ("InvalidStateError" != k.name) return b.b = null, Promise.reject(k);
	        new C(function () {
	          try {
	            b.f[h](b.c, e);
	          } catch (l) {
	            b.b.reject(l), b.b = null;
	          }
	        }).R(.01);
	      }return b.b;
	    }
	    q.yd = function (b, c) {
	      if (this.a) this.a.then(this.yd.bind(this, b, c))["catch"](this.yd.bind(this, b, c));else {
	        this.a = b;if ("webkit-org.w3.clearkey" == this.c) {
	          var d = Bc(c);var e = JSON.parse(d);"oct" != e.keys[0].kty && (this.a.reject(Error("Response is not a valid JSON Web Key Set.")), this.a = null);d = L.Ba(e.keys[0].k);e = L.Ba(e.keys[0].kid);
	        } else d = new Uint8Array(c), e = null;var f = wn("addKey");try {
	          this.f[f](this.c, d, e, this.sessionId);
	        } catch (g) {
	          this.a.reject(g), this.a = null;
	        }
	      }
	    };
	    function En(b, c) {
	      var d = b.keyStatuses;d.size = void 0 == c ? 0 : 1;d.a = c;b.dispatchEvent(new I("keystatuseschange"));
	    }q.generateRequest = function (b, c) {
	      return Gn(this, c, null);
	    };q.load = function (b) {
	      return "persistent-license" == this.g ? Gn(this, null, b) : Promise.reject(Error("Not a persistent session."));
	    };q.update = function (b) {
	      var c = new F();this.yd(c, b);return c;
	    };
	    q.close = function () {
	      if ("persistent-license" != this.g) {
	        if (!this.sessionId) return this.closed.reject(Error("The session is not callable.")), this.closed;var b = wn("cancelKeyRequest");try {
	          this.f[b](this.c, this.sessionId);
	        } catch (c) {}
	      }this.closed.resolve();return this.closed;
	    };q.remove = function () {
	      return "persistent-license" != this.g ? Promise.reject(Error("Not a persistent session.")) : this.close();
	    };function Fn() {
	      this.size = 0;this.a = void 0;
	    }var Hn;q = Fn.prototype;q.forEach = function (b) {
	      this.a && b(this.a, Hn);
	    };q.get = function (b) {
	      if (this.has(b)) return this.a;
	    };
	    q.has = function (b) {
	      var c = Hn;return this.a && L.za(new Uint8Array(b), new Uint8Array(c)) ? !0 : !1;
	    };q.entries = function () {};q.keys = function () {};q.values = function () {};
	    Om(function () {
	      if (!(!window.HTMLVideoElement || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration)) {
	        if (HTMLMediaElement.prototype.webkitGenerateKeyRequest) vn = "webkit";else if (!HTMLMediaElement.prototype.generateKeyRequest) return;Hn = new Uint8Array([0]).buffer;navigator.requestMediaKeySystemAccess = xn;delete HTMLMediaElement.prototype.mediaKeys;HTMLMediaElement.prototype.mediaKeys = null;HTMLMediaElement.prototype.setMediaKeys = zn;window.MediaKeys = Bn;window.MediaKeySystemAccess = yn;
	      }
	    });function In(b) {
	      b = b.target;if ("picture-in-picture" == b.webkitPresentationMode) {
	        document.pictureInPictureElement = b;var c = new Event("enterpictureinpicture");b.dispatchEvent(c);
	      } else document.pictureInPictureElement == b && (document.pictureInPictureElement = null), c = new Event("leavepictureinpicture"), b.dispatchEvent(c);
	    }
	    function Jn() {
	      return this.webkitSupportsPresentationMode("picture-in-picture") ? (this.webkitSetPresentationMode("picture-in-picture"), document.pictureInPictureElement = this, Promise.resolve()) : Promise.reject(Error("PiP not allowed by video element"));
	    }function Kn() {
	      var b = document.pictureInPictureElement;return b ? (b.webkitSetPresentationMode("inline"), document.pictureInPictureElement = null, Promise.resolve()) : Promise.reject(Error("No picture in picture element found"));
	    }
	    function Ln() {
	      return this.hasAttribute("disablePictureInPicture") ? !0 : !this.webkitSupportsPresentationMode("picture-in-picture");
	    }function Mn(b) {
	      b ? this.setAttribute("disablePictureInPicture", "") : this.removeAttribute("disablePictureInPicture");
	    }
	    Om(function () {
	      if (window.HTMLVideoElement) {
	        var b = HTMLVideoElement.prototype;b.requestPictureInPicture && document.exitPictureInPicture || !b.webkitSupportsPresentationMode || (document.pictureInPictureEnabled = !0, document.pictureInPictureElement = null, b.requestPictureInPicture = Jn, Object.defineProperty(b, "disablePictureInPicture", { get: Ln, set: Mn, enumerable: !0, configurable: !0 }), document.exitPictureInPicture = Kn, document.addEventListener("webkitpresentationmodechanged", In, !0));
	      }
	    });Om(function () {
	      if (window.HTMLMediaElement) {
	        var b = HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play = function () {
	          var c = b.apply(this);c && c["catch"](function () {});return c;
	        };
	      }
	    });function Nn() {
	      return { droppedVideoFrames: this.webkitDroppedFrameCount, totalVideoFrames: this.webkitDecodedFrameCount, corruptedVideoFrames: 0, creationTime: NaN, totalFrameDelay: 0 };
	    }Om(function () {
	      if (window.HTMLVideoElement) {
	        var b = HTMLVideoElement.prototype;!b.getVideoPlaybackQuality && "webkitDroppedFrameCount" in b && (b.getVideoPlaybackQuality = Nn);
	      }
	    });function On(b, c, d) {
	      return new window.TextTrackCue(b, c, d);
	    }function Pn(b, c, d) {
	      return new window.TextTrackCue(b + "-" + c + "-" + d, b, c, d);
	    }Om(function () {
	      if (!window.VTTCue && window.TextTrackCue) {
	        var b = TextTrackCue.length;if (3 == b) window.VTTCue = On;else if (6 == b) window.VTTCue = Pn;else {
	          try {
	            var c = !!On(1, 2, "");
	          } catch (d) {
	            c = !1;
	          }c && (window.VTTCue = On);
	        }
	      }
	    });function Qn() {}A("shaka.text.TtmlTextParser", Qn);Qn.prototype.parseInit = function () {};Qn.prototype.parseInit = Qn.prototype.parseInit;
	    Qn.prototype.parseMedia = function (b, c) {
	      var d = Bc(b),
	          e = [],
	          f = new DOMParser(),
	          g = null;if ("" == d) return e;try {
	        g = f.parseFromString(d, "text/xml");
	      } catch (sa) {
	        throw new D(2, 2, 2005, "Failed to parse TTML.");
	      }if (g) {
	        if (d = g.getElementsByTagName("parsererror")[0]) throw new D(2, 2, 2005, d.textContent);if (f = g.getElementsByTagName("tt")[0]) {
	          var h = S.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "frameRate");var k = S.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "subFrameRate");var l = S.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "frameRateMultiplier");var m = S.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "tickRate");g = f.getAttribute("xml:space") || "default";d = f.getAttribute("tts:extent");
	        } else throw new D(2, 2, 2005, "TTML does not contain <tt> tag.");if ("default" != g && "preserve" != g) throw new D(2, 2, 2005, "Invalid xml:space value: " + g);g = "default" == g;h = new Rn(h, k, l, m);k = Sn(f.getElementsByTagName("metadata")[0]);l = Sn(f.getElementsByTagName("styling")[0]);m = Sn(f.getElementsByTagName("layout")[0]);for (var n = [], p = 0; p < m.length; p++) {
	          var v = m[p],
	              x = l,
	              B = d;var y = new Hd();var G = v.getAttribute("xml:id");if (G) {
	            y.id = G;G = null;B && (G = Tn.exec(B) || Un.exec(B));B = G ? Number(G[1]) : null;G = G ? Number(G[2]) : null;var E, aa;if (E = Vn(v, x, "extent")) E = (aa = Tn.exec(E)) || Un.exec(E), null != E && (y.width = null != B ? 100 * Number(E[1]) / B : Number(E[1]), y.height = null != G ? 100 * Number(E[2]) / G : Number(E[2]), y.widthUnits = aa || null != B ? Ud : 0, y.heightUnits = aa || null != G ? Ud : 0);if (v = Vn(v, x, "origin")) E = (aa = Tn.exec(v)) || Un.exec(v), null != E && (y.viewportAnchorX = null != G ? 100 * Number(E[1]) / G : Number(E[1]), y.viewportAnchorY = null != B ? 100 * Number(E[2]) / B : Number(E[2]), y.viewportAnchorUnits = aa || null != B ? Ud : 0);
	          } else y = null;y && n.push(y);
	        }d = (d = f.getElementsByTagName("body")[0]) ? Array.from(d.querySelectorAll("[begin]")) : [];d = r(d);for (f = d.next(); !f.done; f = d.next()) (f = Wn(f.value, c.periodStart, h, k, l, m, n, g, !1)) && e.push(f);
	      }return e;
	    };Qn.prototype.parseMedia = Qn.prototype.parseMedia;
	    var Tn = /^(\d{1,2}(?:\.\d+)?|100)% (\d{1,2}(?:\.\d+)?|100)%$/,
	        Xn = /^(\d+px|\d+em)$/,
	        Un = /^(\d+)px (\d+)px$/,
	        Yn = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,
	        Zn = /^(?:(\d{2,}):)?(\d{2}):(\d{2})$/,
	        $n = /^(?:(\d{2,}):)?(\d{2}):(\d{2}\.\d{2,})$/,
	        ao = /^(\d*(?:\.\d*)?)f$/,
	        bo = /^(\d*(?:\.\d*)?)t$/,
	        co = /^(?:(\d*(?:\.\d*)?)h)?(?:(\d*(?:\.\d*)?)m)?(?:(\d*(?:\.\d*)?)s)?(?:(\d*(?:\.\d*)?)ms)?$/,
	        eo = { left: Md, center: "center", right: "end", start: Md, end: "end" },
	        fo = { left: "line-left", center: "center", right: "line-right" };
	    function Sn(b) {
	      var c = [];if (!b) return c;for (var d = r(b.childNodes), e = d.next(); !e.done; e = d.next()) e = e.value, e.nodeType == Node.ELEMENT_NODE && "br" !== e.nodeName && (e = Sn(e), c = c.concat(e));c.length || c.push(b);return c;
	    }function go(b, c) {
	      for (var d = "", e = r(b.childNodes), f = e.next(); !f.done; f = e.next()) f = f.value, "br" == f.nodeName && b.childNodes[0] !== f ? d += "\n" : f.childNodes && 0 < f.childNodes.length ? d += go(f, c) : c ? (f = f.textContent.trim(), f = f.replace(/\s+/g, " "), d += f) : d += f.textContent;return d;
	    }
	    function Wn(b, c, d, e, f, g, h, k, l) {
	      if (l && "br" == b.nodeName) return b = new Fd(0, 0, ""), b.spacer = !0, b;var m = /^[\s\n]*$/.test(b.textContent),
	          n = b.nodeType == Node.ELEMENT_NODE && !b.hasAttribute("begin") && !b.hasAttribute("end");if (b.nodeType != Node.ELEMENT_NODE || n && m || n && !l) return null;m = ho(b.getAttribute("begin"), d);n = ho(b.getAttribute("end"), d);var p = ho(b.getAttribute("dur"), d);null == n && null != p && (n = m + p);if (!l && (null == m || null == n)) throw new D(2, 2, 2001);m += c;n += c;p = "";l = [];if (Array.from(b.childNodes).find(function (b) {
	        return b.nodeType === Node.TEXT_NODE && /\w+/.test(b.textContent);
	      })) p = go(b, k);else for (var v = r(b.childNodes), x = v.next(); !x.done; x = v.next()) (x = Wn(x.value, c, d, e, f, g, h, k, !0)) && l.push(x);c = new Fd(m, n, p);c.nestedCues = l;if ((g = io(b, "region", g, "")[0]) && g.getAttribute("xml:id")) {
	        var B = g.getAttribute("xml:id");c.region = h.filter(function (b) {
	          return b.id == B;
	        })[0];
	      }e = io(b, "smpte:backgroundImage", e, "#")[0];jo(c, b, g, e, f);return c;
	    }
	    function jo(b, c, d, e, f) {
	      "rtl" == ko(c, d, f, "direction") && (b.direction = "rtl");var g = ko(c, d, f, "writingMode");"tb" == g || "tblr" == g ? b.writingMode = "vertical-lr" : "tbrl" == g ? b.writingMode = "vertical-rl" : "rltb" == g || "rl" == g ? b.direction = "rtl" : g && (b.direction = Gd);(g = ko(c, d, f, "textAlign")) ? (b.positionAlign = fo[g], b.lineAlign = eo[g], b.textAlign = Qd[g.toUpperCase()]) : b.textAlign = "start";if (g = ko(c, d, f, "displayAlign")) b.displayAlign = Rd[g.toUpperCase()];if (g = ko(c, d, f, "color")) b.color = g;if (g = ko(c, d, f, "backgroundColor")) b.backgroundColor = g;if (g = ko(c, d, f, "fontFamily")) b.fontFamily = g;(g = ko(c, d, f, "fontWeight")) && "bold" == g && (b.fontWeight = 700);(g = ko(c, d, f, "wrapOption")) && "noWrap" == g && (b.wrapLine = !1);(g = ko(c, d, f, "lineHeight")) && g.match(Xn) && (b.lineHeight = g);(g = ko(c, d, f, "fontSize")) && g.match(Xn) && (b.fontSize = g);if (g = ko(c, d, f, "fontStyle")) b.fontStyle = Td[g.toUpperCase()];if (e) {
	        g = e.getAttribute("imagetype");var h = e.getAttribute("encoding");e = e.textContent.trim();"PNG" == g && "Base64" == h && e && (b.backgroundImage = "data:image/png;base64," + e);
	      }(d = Vn(d, f, "textDecoration")) && lo(b, d);(c = mo(c, f, "textDecoration")) && lo(b, c);
	    }
	    function lo(b, c) {
	      for (var d = c.split(" "), e = 0; e < d.length; e++) switch (d[e]) {case "underline":
	          b.textDecoration.includes("underline") || b.textDecoration.push("underline");break;case "noUnderline":
	          b.textDecoration.includes("underline") && Pb(b.textDecoration, "underline");break;case "lineThrough":
	          b.textDecoration.includes("lineThrough") || b.textDecoration.push("lineThrough");break;case "noLineThrough":
	          b.textDecoration.includes("lineThrough") && Pb(b.textDecoration, "lineThrough");break;case "overline":
	          b.textDecoration.includes("overline") || b.textDecoration.push("overline");break;case "noOverline":
	          b.textDecoration.includes("overline") && Pb(b.textDecoration, "overline");}
	    }function ko(b, c, d, e) {
	      return (b = mo(b, d, e)) ? b : Vn(c, d, e);
	    }function Vn(b, c, d) {
	      for (var e = Sn(b), f = 0; f < e.length; f++) {
	        var g = S.getAttributeNS(e[f], "http://www.w3.org/ns/ttml#styling", d);if (g) return g;
	      }return (b = io(b, "style", c, "")[0]) ? S.getAttributeNS(b, "http://www.w3.org/ns/ttml#styling", d) : null;
	    }
	    function mo(b, c, d) {
	      var e = S.getAttributeNS(b, "http://www.w3.org/ns/ttml#styling", d);if (e) return e;b = io(b, "style", c, "");c = null;for (e = 0; e < b.length; e++) {
	        var f = S.getAttributeNS(b[e], "http://www.w3.org/ns/ttml#styling", d);f && (c = f);
	      }return c;
	    }
	    function io(b, c, d, e) {
	      var f = [];if (!b || 1 > d.length) return f;var g = b;for (b = null; g && !(b = g.getAttribute(c)) && (g = g.parentNode, g instanceof Element););if (c = b) for (c = c.split(" "), c = r(c), b = c.next(); !b.done; b = c.next()) {
	        b = b.value;g = r(d);for (var h = g.next(); !h.done; h = g.next()) if (h = h.value, e + h.getAttribute("xml:id") == b) {
	          f.push(h);break;
	        }
	      }return f;
	    }
	    function ho(b, c) {
	      var d = null;if (Yn.test(b)) {
	        d = Yn.exec(b);var e = Number(d[1]),
	            f = Number(d[2]),
	            g = Number(d[3]),
	            h = Number(d[4]);h += (Number(d[5]) || 0) / c.b;g += h / c.frameRate;d = g + 60 * f + 3600 * e;
	      } else Zn.test(b) ? d = no(Zn, b) : $n.test(b) ? d = no($n, b) : ao.test(b) ? (d = ao.exec(b), d = Number(d[1]) / c.frameRate) : bo.test(b) ? (d = bo.exec(b), d = Number(d[1]) / c.a) : co.test(b) && (d = no(co, b));return d;
	    }
	    function no(b, c) {
	      var d = b.exec(c);return null == d || "" == d[0] ? null : (Number(d[4]) || 0) / 1E3 + (Number(d[3]) || 0) + 60 * (Number(d[2]) || 0) + 3600 * (Number(d[1]) || 0);
	    }function Rn(b, c, d, e) {
	      this.frameRate = Number(b) || 30;this.b = Number(c) || 1;this.a = Number(e);0 == this.a && (this.a = b ? this.frameRate * this.b : 1);d && (b = /^(\d+) (\d+)$/g.exec(d)) && (this.frameRate *= Number(b[1]) / Number(b[2]));
	    }Xd["application/ttml+xml"] = Qn;function oo() {
	      this.a = new Qn();
	    }A("shaka.text.Mp4TtmlParser", oo);oo.prototype.parseInit = function (b) {
	      var c = !1;new R().H("moov", xf).H("trak", xf).H("mdia", xf).H("minf", xf).H("stbl", xf).fa("stsd", yf).H("stpp", function (b) {
	        c = !0;b.parser.stop();
	      }).parse(b);if (!c) throw new D(2, 2, 2007);
	    };oo.prototype.parseInit = oo.prototype.parseInit;oo.prototype.parseMedia = function (b, c) {
	      var d = !1,
	          e = [];new R().H("mdat", zf(function (b) {
	        d = !0;e = e.concat(this.a.parseMedia(b, c));
	      }.bind(this))).parse(b);if (!d) throw new D(2, 2, 2007);return e;
	    };
	    oo.prototype.parseMedia = oo.prototype.parseMedia;Xd['application/mp4; codecs="stpp"'] = oo;Xd['application/mp4; codecs="stpp.ttml.im1t"'] = oo;Xd['application/mp4; codecs="stpp.TTML.im1t"'] = oo;function po() {}A("shaka.text.VttTextParser", po);po.prototype.parseInit = function () {};po.prototype.parseInit = po.prototype.parseInit;
	    po.prototype.parseMedia = function (b, c) {
	      var d = Bc(b);d = d.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n");d = d.split(/\n{2,}/m);if (!/^WEBVTT($|[ \t\n])/m.test(d[0])) throw new D(2, 2, 2E3);var e = c.segmentStart;if (null == e && (e = 0, d[0].includes("X-TIMESTAMP-MAP"))) {
	        var f = d[0].match(/LOCAL:((?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3}))/m),
	            g = d[0].match(/MPEGTS:(\d+)/m);if (f && g) {
	          e = qo(new Ng(f[1]));if (null == e) throw new D(2, 2, 2E3);e = c.periodStart + (Number(g[1]) / 9E4 - e);
	        }
	      }g = [];var h = d[0].split("\n");for (f = 1; f < h.length; f++) if (/^Region:/.test(h[f])) {
	        var k = new Ng(h[f]),
	            l = new Hd();Qg(k);Og(k);for (var m = Qg(k); m;) {
	          var n = l,
	              p = m;(m = /^id=(.*)$/.exec(p)) ? n.id = m[1] : (m = /^width=(\d{1,2}|100)%$/.exec(p)) ? n.width = Number(m[1]) : (m = /^lines=(\d+)$/.exec(p)) ? (n.height = Number(m[1]), n.heightUnits = 2) : (m = /^regionanchor=(\d{1,2}|100)%,(\d{1,2}|100)%$/.exec(p)) ? (n.regionAnchorX = Number(m[1]), n.regionAnchorY = Number(m[2])) : (m = /^viewportanchor=(\d{1,2}|100)%,(\d{1,2}|100)%$/.exec(p)) ? (n.viewportAnchorX = Number(m[1]), n.viewportAnchorY = Number(m[2])) : /^scroll=up$/.exec(p) && (n.scroll = "up");Og(k);m = Qg(k);
	        }g.push(l);
	      }f = [];for (k = 1; k < d.length; k++) {
	        h = d[k].split("\n");m = h;p = e;h = g;if (1 == m.length && !m[0] || /^NOTE($|[ \t])/.test(m[0]) || "STYLE" == m[0]) h = null;else {
	          l = null;m[0].includes("--\x3e") || (l = m[0], m.splice(0, 1));n = new Ng(m[0]);var v = qo(n),
	              x = Pg(n, /[ \t]+--\x3e[ \t]+/g),
	              B = qo(n);if (null == v || null == x || null == B) throw new D(2, 2, 2001);m = new Fd(v + p, B + p, m.slice(1).join("\n").trim());Og(n);for (p = Qg(n); p;) ro(m, p, h), Og(n), p = Qg(n);null != l && (m.id = l);h = m;
	        }h && f.push(h);
	      }return f;
	    };po.prototype.parseMedia = po.prototype.parseMedia;
	    function ro(b, c, d) {
	      var e;if (e = /^align:(start|middle|center|end|left|right)$/.exec(c)) c = e[1], "middle" == c ? b.textAlign = Jd : b.textAlign = Qd[c.toUpperCase()];else if (e = /^vertical:(lr|rl)$/.exec(c)) b.writingMode = "lr" == e[1] ? "vertical-lr" : "vertical-rl";else if (e = /^size:([\d.]+)%$/.exec(c)) b.size = Number(e[1]);else if (e = /^position:([\d.]+)%(?:,(line-left|line-right|center|start|end))?$/.exec(c)) b.position = Number(e[1]), e[2] && (c = e[2], b.positionAlign = "line-left" == c || "start" == c ? "line-left" : "line-right" == c || "end" == c ? "line-right" : "center");else if (e = /^region:(.*)$/.exec(c)) {
	        if (c = so(d, e[1])) b.region = c;
	      } else if (d = /^line:([\d.]+)%(?:,(start|end|center))?$/.exec(c)) b.lineInterpretation = 1, b.line = Number(d[1]), d[2] && (b.lineAlign = Sd[d[2].toUpperCase()]);else if (d = /^line:(-?\d+)(?:,(start|end|center))?$/.exec(c)) b.lineInterpretation = Ld, b.line = Number(d[1]), d[2] && (b.lineAlign = Sd[d[2].toUpperCase()]);
	    }function so(b, c) {
	      var d = b.filter(function (b) {
	        return b.id == c;
	      });return d.length ? d[0] : null;
	    }
	    function qo(b) {
	      b = Pg(b, /(?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3})/g);if (null == b) return null;var c = Number(b[2]),
	          d = Number(b[3]);return 59 < c || 59 < d ? null : Number(b[4]) / 1E3 + d + 60 * c + 3600 * (Number(b[1]) || 0);
	    }Xd["text/vtt"] = po;Xd['text/vtt; codecs="vtt"'] = po;function to() {
	      this.a = null;
	    }A("shaka.text.Mp4VttParser", to);to.prototype.parseInit = function (b) {
	      var c = !1;new R().H("moov", xf).H("trak", xf).H("mdia", xf).fa("mdhd", function (b) {
	        0 == b.version ? (b.reader.M(4), b.reader.M(4), this.a = b.reader.G(), b.reader.M(4)) : (b.reader.M(8), b.reader.M(8), this.a = b.reader.G(), b.reader.M(8));b.reader.M(4);
	      }.bind(this)).H("minf", xf).H("stbl", xf).fa("stsd", yf).H("wvtt", function () {
	        c = !0;
	      }).parse(b);if (!this.a) throw new D(2, 2, 2008);if (!c) throw new D(2, 2, 2008);
	    };
	    to.prototype.parseInit = to.prototype.parseInit;
	    to.prototype.parseMedia = function (b, c) {
	      var d = this;if (!this.a) throw new D(2, 2, 2008);var e = 0,
	          f = [],
	          g,
	          h = [],
	          k = !1,
	          l = !1,
	          m = !1,
	          n = null;new R().H("moof", xf).H("traf", xf).fa("tfdt", function (b) {
	        k = !0;e = 0 == b.version ? b.reader.G() : b.reader.Bb();
	      }).fa("tfhd", function (b) {
	        var c = b.flags;b = b.reader;b.M(4);c & 1 && b.M(8);c & 2 && b.M(4);n = c & 8 ? b.G() : null;
	      }).fa("trun", function (b) {
	        l = !0;var c = b.version,
	            d = b.flags;b = b.reader;var e = b.G();d & 1 && b.M(4);d & 4 && b.M(4);for (var g = [], h = 0; h < e; h++) {
	          var k = { duration: null, sampleSize: null, Ad: null };d & 256 && (k.duration = b.G());d & 512 && (k.sampleSize = b.G());d & 1024 && b.M(4);d & 2048 && (k.Ad = 0 == c ? b.G() : b.ke());g.push(k);
	        }f = g;
	      }).H("mdat", zf(function (b) {
	        m = !0;g = b;
	      })).parse(b);if (!m && !k && !l) throw new D(2, 2, 2008);var p = e,
	          v = new DataView(g.buffer, g.byteOffset, g.byteLength),
	          x = new Q(v, 0);f.forEach(function (b) {
	        var f = b.duration || n,
	            g = b.Ad ? e + b.Ad : p;p = g + (f || 0);var k = 0;do {
	          var l = x.G();k += l;var m = x.G(),
	              v = null;"vttc" == Af(m) ? 8 < l && (v = x.Za(l - 8)) : x.M(l - 8);f && v && h.push(uo(v, c.periodStart + g / d.a, c.periodStart + p / d.a));
	        } while (b.sampleSize && k < b.sampleSize);
	      });return h.filter(ud.Ia);
	    };to.prototype.parseMedia = to.prototype.parseMedia;function uo(b, c, d) {
	      var e, f, g;new R().H("payl", zf(function (b) {
	        e = Bc(b);
	      })).H("iden", zf(function (b) {
	        f = Bc(b);
	      })).H("sttg", zf(function (b) {
	        g = Bc(b);
	      })).parse(b);return e ? vo(e, f, g, c, d) : null;
	    }function vo(b, c, d, e, f) {
	      b = new Fd(e, f, b);c && (b.id = c);if (d) for (c = new Ng(d), d = Qg(c); d;) ro(b, d, []), Og(c), d = Qg(c);return b;
	    }Xd['application/mp4; codecs="wvtt"'] = to;A("shaka.util.Dom.createHTMLElement", function (b) {
	      return document.createElement(b);
	    });A("shaka.util.Dom.createVideoElement", function () {
	      var b = document.createElement("video");b.muted = !0;b.width = 600;b.height = 400;return b;
	    });A("shaka.util.Dom.asHTMLElement", function (b) {
	      return b;
	    });A("shaka.util.Dom.asHTMLMediaElement", function (b) {
	      return b;
	    });A("shaka.util.Dom.removeAllChildren", function (b) {
	      for (; b.firstChild;) b.removeChild(b.firstChild);
	    }); /*
	        @license
	        EME Encryption Scheme Polyfill
	        Copyright 2019 Google LLC
	        SPDX-License-Identifier: Apache-2.0
	        */
	    function wo() {}var xo;A("EmeEncryptionSchemePolyfill", wo);function yo() {
	      xo ? console.debug("EmeEncryptionSchemePolyfill: Already installed.") : navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration ? (xo = navigator.requestMediaKeySystemAccess, console.debug("EmeEncryptionSchemePolyfill: Waiting to detect encryptionScheme support."), navigator.requestMediaKeySystemAccess = zo) : console.debug("EmeEncryptionSchemePolyfill: EME not found");
	    }wo.install = yo;
	    function zo(b, c) {
	      var d = this;return t(function f() {
	        var g;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return console.assert(d == navigator, 'bad "this" for requestMediaKeySystemAccess'), u(f, xo.call(d, b, c), 2);case 2:
	              g = f.o;if (Ao(g)) return console.debug("EmeEncryptionSchemePolyfill: Native encryptionScheme support found."), navigator.requestMediaKeySystemAccess = xo, f["return"](g);console.debug("EmeEncryptionSchemePolyfill: No native encryptionScheme support found. Patching encryptionScheme support.");navigator.requestMediaKeySystemAccess = Bo;return f["return"](Bo.call(d, b, c));}
	        });
	      });
	    }
	    function Bo(b, c) {
	      var d = this;return t(function f() {
	        var g, h, k, l, m, n, p, v;return z(f, function (f) {
	          switch (f.j) {case 1:
	              console.assert(d == navigator, 'bad "this" for requestMediaKeySystemAccess');g = Co(b);h = [];for (var x = r(c), y = x.next(); !y.done; y = x.next()) k = y.value, l = Do(k.videoCapabilities, g), m = Do(k.audioCapabilities, g), k.videoCapabilities && k.videoCapabilities.length && !l.length || k.audioCapabilities && k.audioCapabilities.length && !m.length || (n = Object.assign({}, k), n.videoCapabilities = l, n.audioCapabilities = m, h.push(n));
	              if (!h.length) throw p = Error("Unsupported keySystem or supportedConfigurations."), p.name = "NotSupportedError", p.code = DOMException.NOT_SUPPORTED_ERR, p;return u(f, xo.call(d, b, h), 2);case 2:
	              return v = f.o, f["return"](new Eo(v, g));}
	        });
	      });
	    }function Do(b, c) {
	      return b ? b.filter(function (b) {
	        return !b.encryptionScheme || b.encryptionScheme == c;
	      }) : b;
	    }function Fo() {}var Go;A("McEncryptionSchemePolyfill", Fo);
	    function Ho() {
	      navigator.mediaCapabilities ? (Go = navigator.mediaCapabilities.decodingInfo, console.debug("McEncryptionSchemePolyfill: Waiting to detect encryptionScheme support."), navigator.mediaCapabilities.decodingInfo = Io) : console.debug("McEncryptionSchemePolyfill: MediaCapabilities not found");
	    }Fo.install = Ho;
	    function Io(b) {
	      var c = this;return t(function e() {
	        var f, g;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return console.assert(c == navigator.mediaCapabilities, 'bad "this" for decodingInfo'), u(e, Go.call(c, b), 2);case 2:
	              f = e.o;if (!b.keySystemConfiguration) return e["return"](f);g = f.keySystemAccess;if (Ao(g)) return console.debug("McEncryptionSchemePolyfill: Native encryptionScheme support found."), navigator.mediaCapabilities.decodingInfo = Go, e["return"](f);console.debug("McEncryptionSchemePolyfill: No native encryptionScheme support found. Patching encryptionScheme support.");
	              navigator.mediaCapabilities.decodingInfo = Jo;return e["return"](Jo.call(c, b));}
	        });
	      });
	    }
	    function Jo(b) {
	      var c = this;return t(function e() {
	        var f, g, h, k, l, m, n;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return console.assert(c == navigator.mediaCapabilities, 'bad "this" for decodingInfo'), f = null, b.keySystemConfiguration && (g = b.keySystemConfiguration, h = g.keySystem, k = g.audio && g.audio.encryptionScheme, l = g.video && g.video.encryptionScheme, f = Co(h), m = { powerEfficient: !1, smooth: !1, supported: !1, keySystemAccess: null, configuration: b }, k && k != f || l && l != f) ? e["return"](m) : u(e, Go.call(c, b), 2);case 2:
	              return n = e.o, n.keySystemAccess && (n.keySystemAccess = new Eo(n.keySystemAccess, f)), e["return"](n);}
	        });
	      });
	    }function Eo(b, c) {
	      this.b = b;this.a = c;this.keySystem = b.keySystem;
	    }Eo.prototype.getConfiguration = function () {
	      var b = this.b.getConfiguration();if (b.videoCapabilities) for (var c = r(b.videoCapabilities), d = c.next(); !d.done; d = c.next()) d.value.encryptionScheme = this.a;if (b.audioCapabilities) for (c = r(b.audioCapabilities), d = c.next(); !d.done; d = c.next()) d.value.encryptionScheme = this.a;return b;
	    };Eo.prototype.createMediaKeys = function () {
	      return this.b.createMediaKeys();
	    };
	    function Co(b) {
	      if (b.startsWith("com.widevine") || b.startsWith("com.microsoft") || b.startsWith("com.adobe") || b.startsWith("org.w3")) return "cenc";if (b.startsWith("com.apple")) return "cbcs-1-9";console.warn("EmeEncryptionSchemePolyfill: Unknown key system:", b, "Please contribute!");return null;
	    }function Ao(b) {
	      b = b.getConfiguration();var c = b.audioCapabilities && b.audioCapabilities[0];return (b = b.videoCapabilities && b.videoCapabilities[0] || c) && void 0 !== b.encryptionScheme ? !0 : !1;
	    }function Ko() {}
	    A("EncryptionSchemePolyfills", Ko);function Pm() {
	      yo();Ho();
	    }Ko.install = Pm; module.Ne && (module.Ne = Ko);
	  }).call(exportTo, innerGlobal, innerGlobal);for (var k in exportTo.shaka) exports[k] = exportTo.shaka[k];
	})();


	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShakaJsPlayer = function (_Player) {
	  _inherits(ShakaJsPlayer, _Player);

	  function ShakaJsPlayer(options) {
	    _classCallCheck(this, ShakaJsPlayer);

	    var _this = _possibleConstructorReturn(this, (ShakaJsPlayer.__proto__ || Object.getPrototypeOf(ShakaJsPlayer)).call(this, options));

	    var self = _this;
	    _this.shakaOpts = options.shakaOpts || {};
	    _this.util = Player.util;
	    _this.player = _this;
	    _this.url = _this.player.config.url;
	    _this.sniffer = Player.sniffer;
	    _this.player_ = null;
	    _this.content = [];

	    shakaPlayer_compiled.polyfill.installAll();

	    if (shakaPlayer_compiled.Player.isBrowserSupported()) {
	      _this.video_ = _this.player.video;
	      _this.video_.autoplay = false;
	      _this.player_ = new shakaPlayer_compiled.Player(_this.video_);

	      _this.player_.addEventListener('error', function (event) {
	        console.error('Error code', event.detail.code, 'object', event.detail); // eslint-disable-line no-console
	      });

	      if (_this.shakaOpts) {
	        _this.player_.configure(_this.shakaOpts);
	      }

	      _this.player_.getNetworkingEngine().registerRequestFilter(function (type, request) {
	        // Only add headers to license requests:
	        if (type === shakaPlayer_compiled.net.NetworkingEngine.RequestType.LICENSE) {
	          // This is the specific header name and value the server wants:
	          request.headers['CWIP-Auth-Header'] = 'VGhpc0lzQVRlc3QK';
	        }
	      });

	      // this.player_.addEventListener(
	      //     'trackschanged', self.onTracksChanged_);
	      _this.player_.addEventListener('adaptation', self.onAdaptation_);

	      var config = { abr: { enabled: false } };
	      _this.player_.configure(config);

	      _this.once('complete', function () {
	        _this.player_.load(_this.url).then(function () {
	          self.onTracksChanged_();
	        }).catch(function (event) {
	          console.error('Error code', event.detail.code, 'object', event.detail); // eslint-disable-line no-console
	        }); // eslint-disable-line no-console);
	      });

	      if (_this.player_.isLive()) {
	        _this.util.addClass(_this.player.root, 'xgplayer-is-live');
	        var live = _this.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
	        _this.player.controls.appendChild(live);
	      }
	    } else {
	      console.error('Browser not supported!'); // eslint-disable-line no-console
	    }
	    return _this;
	  }

	  _createClass(ShakaJsPlayer, [{
	    key: 'onTracksChanged_',
	    value: function onTracksChanged_() {
	      this.updateVariantTracks_();
	    }
	  }, {
	    key: 'onAdaptation_',
	    value: function onAdaptation_() {
	      var self = this;
	      // console.log('onAdaptation_')
	      var tracks = this.player_.getVariantTracks();

	      tracks.forEach(function (track) {
	        if (!track.active) {
	          return;
	        }

	        for (var i = 0; i < self.content.length; ++i) {
	          var option = self.content[i];
	          if (option.value === track.id) {
	            option.selected = true;
	          } else {
	            option.selected = false;
	          }
	        }
	      });
	    }
	  }, {
	    key: 'updateVariantTracks_',
	    value: function updateVariantTracks_() {
	      var tracks = this.player_.getVariantTracks();
	      tracks.sort(function (t1, t2) {
	        return t1.bandwidth - t2.bandwidth;
	      });
	      this.updateTrackOptions_(tracks);
	    }
	  }, {
	    key: 'updateTrackOptions_',
	    value: function updateTrackOptions_(tracks) {
	      // console.log(tracks); // eslint-disable-line no-console
	      var self = this;
	      var formatters = {
	        variant: function variant(track) {
	          var trackInfo = '';
	          if (track.width && track.height) {
	            trackInfo += track.height + 'P';
	          }
	          // trackInfo += track.bandwidth + ' bits/s';
	          return trackInfo;
	        }
	      };
	      this.content = [];
	      tracks.forEach(function (track) {
	        var option = {};
	        option.textContent = formatters[track.type](track);
	        option.track = track;
	        option.value = track.id;
	        option.selected = track.active;
	        self.content.push(option);
	      });
	      this.updateDefinition();
	    }
	  }, {
	    key: 'updateDefinition',
	    value: function updateDefinition() {
	      var self = this;
	      var ul = this.util.createDom('xg-definition', '', { tabindex: 3 }, 'xgplayer-definition');
	      var root = this.player.controls;
	      if (this.sniffer.device === 'mobile') {
	        return;
	      }
	      // let availableBitrates = _player.getBitrateInfoListFor('video') || [];

	      if (this.content instanceof Array && this.content.length > 1) {
	        // this.content.forEach(function (element, index) {
	        //     content.push(isNaN(index) ? 'Auto' : element.height + 'P');
	        // });
	        this.util.addClass(this.player.root, 'xgplayer-is-definition');

	        var tmp = ['<ul>'];

	        // tmp.push('<li class="definition">Auto</li>');
	        this.content.forEach(function (item) {
	          tmp.push('<li class=\'\'>' + item.textContent + '</li>');
	        });
	        this.content.some(function (item) {
	          if (item.selected) {
	            tmp.push('</ul><p class="name"><em>' + item.textContent + '</em></p>');
	            return true;
	          }
	          return false;
	        });
	        var urlInRoot = root.querySelector('.xgplayer-definition');
	        if (urlInRoot) {
	          urlInRoot.innerHTML = '<xg-tips class="xgplayer-tips">清晰度</xg-tips>' + tmp.join('');
	        } else {
	          ul.innerHTML = '<xg-tips class="xgplayer-tips">清晰度</xg-tips>' + tmp.join('');
	          root.appendChild(ul);
	        }
	      }

	      ['touchstart', 'click'].forEach(function (item) {
	        ul.addEventListener(item, function (ev) {
	          ev.preventDefault();
	          ev.stopPropagation();
	          var li = ev.target || ev.srcElement;
	          if (li && li.tagName.toLocaleLowerCase() === 'li') {
	            Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
	              self.util.removeClass(item, 'definition');
	            });
	            self.util.addClass(li, 'definition');
	            li.parentNode.nextSibling.textContent = li.textContent;

	            var config = { abr: { enabled: false } };
	            self.player_.configure(config);
	            // console.log(li.innerHTML);
	            self.content.some(function (item, index) {
	              if (li.innerHTML.indexOf(item.textContent) > -1) {
	                self.player_.selectVariantTrack(self.content[index].track, true);
	                return true;
	              }
	              return false;
	            });

	            // let enableAdaptation = this.player_.getConfiguration().abr.enabled;
	            // document.getElementById('enableAdaptation').checked = enableAdaptation;
	          } else if (li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
	            self.util.addClass(ul, 'xgplayer-definition-active');
	            ul.focus();
	          }
	        }, false);
	      });
	      ul.addEventListener('blur', function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        self.util.removeClass(ul, 'xgplayer-definition-active');
	      });

	      this.player.once('destroy', function () {
	        ul = null;
	      });
	      this.player.start = function () {
	        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.player.config.url;

	        var root = self.player.root;
	        root.insertBefore(self.player.video, root.firstChild);
	        self.util.removeClass(root, 'none');
	        self.player.userTimer = setTimeout(function () {
	          self.player.emit('blur');
	        }, self.player.config.inactive);
	        setTimeout(function () {
	          self.player.emit('complete');
	        }, 1);

	        self.player.reset = function () {
	          // _player.reset();
	        };
	      };
	    }
	  }]);

	  return ShakaJsPlayer;
	}(Player);

	ShakaJsPlayer.isSupported = shakaPlayer_compiled.Player.isBrowserSupported();

	return ShakaJsPlayer;

})));
//# sourceMappingURL=index.js.map
