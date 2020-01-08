(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer')) :
	typeof define === 'function' && define.amd ? define(['xgplayer'], factory) :
	(global = global || self, global.ShakaJsPlayer = factory(global.Player));
}(this, (function (Player) { 'use strict';

	Player = Player && Player.hasOwnProperty('default') ? Player['default'] : Player;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var shakaPlayer_compiled = createCommonjsModule(function (module, exports) {
	(function () {
	  var innerGlobal = typeof window != "undefined" ? window : commonjsGlobal;var exportTo = {};(function (window, global) {
	    var q,
	        ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (b, c, d) {
	      b != Array.prototype && b != Object.prototype && (b[c] = d.value);
	    },
	        ca = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;function da() {
	      da = function () {};ca.Symbol || (ca.Symbol = ea);
	    }var ea = function () {
	      var b = 0;return function (c) {
	        return "jscomp_symbol_" + (c || "") + b++;
	      };
	    }();
	    function ha() {
	      da();var b = ca.Symbol.iterator;b || (b = ca.Symbol.iterator = ca.Symbol("iterator"));"function" != typeof Array.prototype[b] && ba(Array.prototype, b, { configurable: !0, writable: !0, value: function () {
	          return ia(this);
	        } });ha = function () {};
	    }function ia(b) {
	      var c = 0;return ja(function () {
	        return c < b.length ? { done: !1, value: b[c++] } : { done: !0 };
	      });
	    }function ja(b) {
	      ha();b = { next: b };b[ca.Symbol.iterator] = function () {
	        return this;
	      };return b;
	    }function r(b) {
	      ha();var c = b[Symbol.iterator];return c ? c.call(b) : ia(b);
	    }
	    function ka(b, c) {
	      if (c) {
	        for (var d = ca, e = b.split("."), f = 0; f < e.length - 1; f++) {
	          var g = e[f];g in d || (d[g] = {});d = d[g];
	        }e = e[e.length - 1];f = d[e];g = c(f);g != f && null != g && ba(d, e, { configurable: !0, writable: !0, value: g });
	      }
	    }
	    ka("Promise", function (b) {
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
	      };var f = ca.setTimeout;d.prototype.c = function (b) {
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
	        if (b === this) this.f(new TypeError("A Promise cannot resolve to itself"));else if (b instanceof c) this.v(b);else {
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
	        }"function" == typeof c ? this.C(c, b) : this.h(b);
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
	      var g = new d();c.prototype.v = function (b) {
	        var c = this.c();b.ac(c.resolve, c.reject);
	      };c.prototype.C = function (b, c) {
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
	        });this.ac(e(b, f), e(d, g));return h;
	      };c.prototype["catch"] = function (b) {
	        return this.then(void 0, b);
	      };c.prototype.ac = function (b, c) {
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
	          for (var f = r(b), g = f.next(); !g.done; g = f.next()) e(g.value).ac(c, d);
	        });
	      };c.all = function (b) {
	        var d = r(b),
	            f = d.next();return f.done ? e([]) : new c(function (b, c) {
	          function g(c) {
	            return function (d) {
	              h[c] = d;k--;0 == k && b(h);
	            };
	          }var h = [],
	              k = 0;do h.push(void 0), k++, e(f.value).ac(g(h.length - 1), c), f = d.next(); while (!f.done);
	        });
	      };return c;
	    });ka("Promise.prototype.finally", function (b) {
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
	    });function la(b) {
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
	      return la(b());
	    }
	    var ma = "function" == typeof Object.create ? Object.create : function (b) {
	      function c() {}c.prototype = b;return new c();
	    },
	        oa;if ("function" == typeof Object.setPrototypeOf) oa = Object.setPrototypeOf;else {
	      var pa;a: {
	        var qa = { pe: !0 },
	            ra = {};try {
	          ra.__proto__ = qa;pa = ra.pe;break a;
	        } catch (b) {}pa = !1;
	      }oa = pa ? function (b, c) {
	        b.__proto__ = c;if (b.__proto__ !== c) throw new TypeError(b + " is not extensible");return b;
	      } : null;
	    }var sa = oa;function ta() {
	      this.g = !1;this.c = null;this.o = void 0;this.j = 1;this.b = this.f = 0;this.i = this.a = null;
	    }
	    function ua(b) {
	      if (b.g) throw new TypeError("Generator is already running");b.g = !0;
	    }ta.prototype.h = function (b) {
	      this.o = b;
	    };function va(b, c) {
	      b.a = { Cd: c, Jd: !0 };b.j = b.f || b.b;
	    }ta.prototype["return"] = function (b) {
	      this.a = { "return": b };this.j = this.b;
	    };function u(b, c, d) {
	      b.j = d;return { value: c };
	    }ta.prototype.A = function (b) {
	      this.j = b;
	    };function w(b) {
	      b.j = 0;
	    }function xa(b, c, d) {
	      b.f = c;void 0 != d && (b.b = d);
	    }function ya(b, c) {
	      b.f = 0;b.b = c || 0;
	    }function za(b, c) {
	      b.j = c;b.f = 0;
	    }function Ba(b) {
	      b.f = 0;var c = b.a.Cd;b.a = null;return c;
	    }
	    function Ca(b) {
	      b.i = [b.a];b.f = 0;b.b = 0;
	    }function Da(b, c) {
	      var d = b.i.splice(0)[0];(d = b.a = b.a || d) ? d.Jd ? b.j = b.f || b.b : void 0 != d.A && b.b < d.A ? (b.j = d.A, b.a = null) : b.j = b.b : b.j = c;
	    }function Ea(b) {
	      this.a = new ta();this.b = b;
	    }function Fa(b, c) {
	      ua(b.a);var d = b.a.c;if (d) return Ga(b, "return" in d ? d["return"] : function (b) {
	        return { value: b, done: !0 };
	      }, c, b.a["return"]);b.a["return"](c);return Ha(b);
	    }
	    function Ga(b, c, d, e) {
	      try {
	        var f = c.call(b.a.c, d);if (!(f instanceof Object)) throw new TypeError("Iterator result " + f + " is not an object");if (!f.done) return b.a.g = !1, f;var g = f.value;
	      } catch (h) {
	        return b.a.c = null, va(b.a, h), Ha(b);
	      }b.a.c = null;e.call(b.a, g);return Ha(b);
	    }
	    function Ha(b) {
	      for (; b.a.j;) try {
	        var c = b.b(b.a);if (c) return b.a.g = !1, { value: c.value, done: !1 };
	      } catch (d) {
	        b.a.o = void 0, va(b.a, d);
	      }b.a.g = !1;if (b.a.a) {
	        c = b.a.a;b.a.a = null;if (c.Jd) throw c.Cd;return { value: c["return"], done: !0 };
	      }return { value: void 0, done: !0 };
	    }
	    function Ka(b) {
	      this.next = function (c) {
	        ua(b.a);b.a.c ? c = Ga(b, b.a.c.next, c, b.a.h) : (b.a.h(c), c = Ha(b));return c;
	      };this["throw"] = function (c) {
	        ua(b.a);b.a.c ? c = Ga(b, b.a.c["throw"], c, b.a.h) : (va(b.a, c), c = Ha(b));return c;
	      };this["return"] = function (c) {
	        return Fa(b, c);
	      };ha();this[Symbol.iterator] = function () {
	        return this;
	      };
	    }function z(b, c) {
	      Ka.prototype = b.prototype;return new Ka(new Ea(c));
	    }function La(b) {
	      if (!(b instanceof Array)) {
	        b = r(b);for (var c, d = []; !(c = b.next()).done;) d.push(c.value);b = d;
	      }return b;
	    }
	    function Ma(b, c) {
	      return Object.prototype.hasOwnProperty.call(b, c);
	    }
	    ka("WeakMap", function (b) {
	      function c(b) {
	        this.a = (g += Math.random() + 1).toString();if (b) {
	          da();ha();b = r(b);for (var c; !(c = b.next()).done;) c = c.value, this.set(c[0], c[1]);
	        }
	      }function d(b) {
	        Ma(b, f) || ba(b, f, { value: {} });
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
	        d(b);if (!Ma(b, f)) throw Error("WeakMap key fail: " + b);b[f][this.a] = c;return this;
	      };c.prototype.get = function (b) {
	        return Ma(b, f) ? b[f][this.a] : void 0;
	      };c.prototype.has = function (b) {
	        return Ma(b, f) && Ma(b[f], this.a);
	      };c.prototype["delete"] = function (b) {
	        return Ma(b, f) && Ma(b[f], this.a) ? delete b[f][this.a] : !1;
	      };return c;
	    });
	    ka("Map", function (b) {
	      function c() {
	        var b = {};return b.Ea = b.next = b.head = b;
	      }function d(b, c) {
	        var d = b.a;return ja(function () {
	          if (d) {
	            for (; d.head != b.a;) d = d.Ea;for (; d.next != d.head;) return d = d.next, { done: !1, value: c(d) };d = null;
	          }return { done: !0, value: void 0 };
	        });
	      }function e(b, c) {
	        var d = c && typeof c;"object" == d || "function" == d ? g.has(c) ? d = g.get(c) : (d = "" + ++h, g.set(c, d)) : d = "p_" + c;var e = b.b[d];if (e && Ma(b.b, d)) for (var f = 0; f < e.length; f++) {
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
	      }()) return b;da();ha();var g = new WeakMap();f.prototype.set = function (b, c) {
	        var d = e(this, b);d.list || (d.list = this.b[d.id] = []);d.X ? d.X.value = c : (d.X = { next: this.a, Ea: this.a.Ea, head: this.a, key: b, value: c }, d.list.push(d.X), this.a.Ea.next = d.X, this.a.Ea = d.X, this.size++);return this;
	      };f.prototype["delete"] = function (b) {
	        b = e(this, b);return b.X && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.b[b.id], b.X.Ea.next = b.X.next, b.X.next.Ea = b.X.Ea, b.X.head = null, this.size--, !0) : !1;
	      };f.prototype.clear = function () {
	        this.b = {};this.a = this.a.Ea = c();this.size = 0;
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
	    ka("Set", function (b) {
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
	      }()) return b;da();ha();c.prototype.add = function (b) {
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
	    });function Na(b, c, d) {
	      b instanceof String && (b = String(b));for (var e = b.length, f = 0; f < e; f++) {
	        var g = b[f];if (c.call(d, g, f, b)) return { Gd: f, ke: g };
	      }return { Gd: -1, ke: void 0 };
	    }ka("Array.prototype.findIndex", function (b) {
	      return b ? b : function (b, d) {
	        return Na(this, b, d).Gd;
	      };
	    });
	    function Oa(b, c) {
	      ha();b instanceof String && (b += "");var d = 0,
	          e = { next: function () {
	          if (d < b.length) {
	            var f = d++;return { value: c(f, b[f]), done: !1 };
	          }e.next = function () {
	            return { done: !0, value: void 0 };
	          };return e.next();
	        } };e[Symbol.iterator] = function () {
	        return e;
	      };return e;
	    }ka("Array.prototype.keys", function (b) {
	      return b ? b : function () {
	        return Oa(this, function (b) {
	          return b;
	        });
	      };
	    });ka("Object.is", function (b) {
	      return b ? b : function (b, d) {
	        return b === d ? 0 !== b || 1 / b === 1 / d : b !== b && d !== d;
	      };
	    });
	    ka("Array.prototype.includes", function (b) {
	      return b ? b : function (b, d) {
	        var c = this;c instanceof String && (c = String(c));var f = c.length,
	            g = d || 0;for (0 > g && (g = Math.max(g + f, 0)); g < f; g++) {
	          var h = c[g];if (h === b || Object.is(h, b)) return !0;
	        }return !1;
	      };
	    });function Pa(b, c, d) {
	      if (null == b) throw new TypeError("The 'this' value for String.prototype." + d + " must not be null or undefined");if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + d + " must not be a regular expression");return b + "";
	    }
	    ka("String.prototype.includes", function (b) {
	      return b ? b : function (b, d) {
	        return -1 !== Pa(this, b, "includes").indexOf(b, d || 0);
	      };
	    });ka("Array.from", function (b) {
	      return b ? b : function (b, d, e) {
	        ha();d = null != d ? d : function (b) {
	          return b;
	        };var c = [],
	            g = b[Symbol.iterator];if ("function" == typeof g) for (b = g.call(b); !(g = b.next()).done;) c.push(d.call(e, g.value));else {
	          g = b.length;for (var h = 0; h < g; h++) c.push(d.call(e, b[h]));
	        }return c;
	      };
	    });
	    ka("String.prototype.startsWith", function (b) {
	      return b ? b : function (b, d) {
	        for (var c = Pa(this, b, "startsWith"), f = c.length, g = b.length, h = Math.max(0, Math.min(d | 0, c.length)), k = 0; k < g && h < f;) if (c[h++] != b[k++]) return !1;return k >= g;
	      };
	    });ka("Array.prototype.find", function (b) {
	      return b ? b : function (b, d) {
	        return Na(this, b, d).ke;
	      };
	    });var Qa = "function" == typeof Object.assign ? Object.assign : function (b, c) {
	      for (var d = 1; d < arguments.length; d++) {
	        var e = arguments[d];if (e) for (var f in e) Ma(e, f) && (b[f] = e[f]);
	      }return b;
	    };
	    ka("Object.assign", function (b) {
	      return b || Qa;
	    });var Ra = this;Ra.a = !0;function A(b, c) {
	      var d = b.split("."),
	          e = Ra;d[0] in e || !e.execScript || e.execScript("var " + d[0]);for (var f; d.length && (f = d.shift());) d.length || void 0 === c ? e[f] ? e = e[f] : e = e[f] = {} : e[f] = c;
	    }function Sa(b, c) {
	      function d() {}d.prototype = c.prototype;b.fg = c.prototype;b.prototype = new d();b.prototype.constructor = b;b.tg = function (b, d, g) {
	        return c.prototype[d].apply(b, Array.prototype.slice.call(arguments, 2));
	      };
	    }    function Xa(b) {
	      this.c = Math.exp(Math.log(.5) / b);this.b = this.a = 0;
	    }function Ya(b, c, d) {
	      var e = Math.pow(b.c, c);d = d * (1 - e) + e * b.a;isNaN(d) || (b.a = d, b.b += c);
	    }function Za(b) {
	      return b.a / (1 - Math.pow(b.c, b.b));
	    }function $a() {
	      this.b = new Xa(2);this.c = new Xa(5);this.a = 0;
	    }$a.prototype.getBandwidthEstimate = function (b) {
	      return 128E3 > this.a ? b : Math.min(Za(this.b), Za(this.c));
	    };function ab() {}function bb() {}function cb() {}window.console && window.console.log.bind && (bb = console.warn.bind(console), ab = console.error.bind(console));var db = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function ib(b) {
	      var c;b instanceof ib ? (jb(this, b.sa), this.bb = b.bb, this.ra = b.ra, kb(this, b.zb), this.ja = b.ja, lb(this, b.a.clone()), this.Sa = b.Sa) : b && (c = String(b).match(db)) ? (jb(this, c[1] || "", !0), this.bb = mb(c[2] || ""), this.ra = mb(c[3] || "", !0), kb(this, c[4]), this.ja = mb(c[5] || "", !0), lb(this, c[6] || "", !0), this.Sa = mb(c[7] || "")) : this.a = new nb(null);
	    }q = ib.prototype;q.sa = "";q.bb = "";q.ra = "";q.zb = null;q.ja = "";q.Sa = "";
	    q.toString = function () {
	      var b = [],
	          c = this.sa;c && b.push(ob(c, pb, !0), ":");if (c = this.ra) {
	        b.push("//");var d = this.bb;d && b.push(ob(d, pb, !0), "@");b.push(encodeURIComponent(c).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));c = this.zb;null != c && b.push(":", String(c));
	      }if (c = this.ja) this.ra && "/" != c.charAt(0) && b.push("/"), b.push(ob(c, "/" == c.charAt(0) ? qb : rb, !0));(c = this.a.toString()) && b.push("?", c);(c = this.Sa) && b.push("#", ob(c, sb));return b.join("");
	    };
	    q.resolve = function (b) {
	      var c = this.clone();"data" === c.sa && (c = new ib());var d = !!b.sa;d ? jb(c, b.sa) : d = !!b.bb;d ? c.bb = b.bb : d = !!b.ra;d ? c.ra = b.ra : d = null != b.zb;var e = b.ja;if (d) kb(c, b.zb);else if (d = !!b.ja) {
	        if ("/" != e.charAt(0)) if (this.ra && !this.ja) e = "/" + e;else {
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
	      b.sa = d ? mb(c, !0) : c;b.sa && (b.sa = b.sa.replace(/:$/, ""));
	    }function kb(b, c) {
	      if (c) {
	        c = Number(c);if (isNaN(c) || 0 > c) throw Error("Bad port number " + c);b.zb = c;
	      } else b.zb = null;
	    }function lb(b, c, d) {
	      c instanceof nb ? b.a = c : (d || (c = ob(c, vb)), b.a = new nb(c));
	    }
	    function mb(b, c) {
	      return b ? c ? decodeURI(b) : decodeURIComponent(b) : "";
	    }function ob(b, c, d) {
	      return "string" == typeof b ? (b = encodeURI(b).replace(c, wb), d && (b = b.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), b) : null;
	    }function wb(b) {
	      b = b.charCodeAt(0);return "%" + (b >> 4 & 15).toString(16) + (b & 15).toString(16);
	    }var pb = /[#\/\?@]/g,
	        rb = /[#\?:]/g,
	        qb = /[#\?]/g,
	        vb = /[#\?@]/g,
	        sb = /#/g;function nb(b) {
	      this.a = b || null;
	    }q = nb.prototype;q.ha = null;q.cc = null;
	    q.add = function (b, c) {
	      if (!this.ha && (this.ha = {}, this.cc = 0, this.a)) for (var d = this.a.split("&"), e = 0; e < d.length; e++) {
	        var f = d[e].indexOf("="),
	            g = null;if (0 <= f) {
	          var h = d[e].substring(0, f);g = d[e].substring(f + 1);
	        } else h = d[e];h = decodeURIComponent(h.replace(/\+/g, " "));g = g || "";this.add(h, decodeURIComponent(g.replace(/\+/g, " ")));
	      }this.a = null;(d = this.ha.hasOwnProperty(b) && this.ha[b]) || (this.ha[b] = d = []);d.push(c);this.cc++;return this;
	    };
	    q.toString = function () {
	      if (this.a) return this.a;if (!this.ha) return "";var b = [],
	          c;for (c in this.ha) for (var d = encodeURIComponent(c), e = this.ha[c], f = 0; f < e.length; f++) {
	        var g = d;"" !== e[f] && (g += "=" + encodeURIComponent(e[f]));b.push(g);
	      }return this.a = b.join("&");
	    };q.clone = function () {
	      var b = new nb();b.a = this.a;if (this.ha) {
	        var c = {},
	            d;for (d in this.ha) c[d] = this.ha[d].concat();b.ha = c;b.cc = this.cc;
	      }return b;
	    };function xb(b) {
	      this.b = b;this.a = null;
	    }xb.prototype.P = function (b) {
	      var c = this;this.stop();var d = !0,
	          e = null;this.a = function () {
	        window.clearTimeout(e);d = !1;
	      };e = window.setTimeout(function () {
	        d && c.b();
	      }, 1E3 * b);return this;
	    };xb.prototype.stop = function () {
	      this.a && (this.a(), this.a = null);
	    };function C(b) {
	      this.b = b;this.a = null;
	    }A("shaka.util.Timer", C);C.prototype.uc = function () {
	      this.stop();this.b();return this;
	    };C.prototype.tickNow = C.prototype.uc;C.prototype.P = function (b) {
	      var c = this;this.stop();this.a = new xb(function () {
	        c.b();
	      }).P(b);return this;
	    };C.prototype.tickAfter = C.prototype.P;C.prototype.Na = function (b) {
	      var c = this;this.stop();this.a = new xb(function () {
	        c.a.P(b);c.b();
	      }).P(b);return this;
	    };C.prototype.tickEvery = C.prototype.Na;C.prototype.stop = function () {
	      this.a && (this.a.stop(), this.a = null);
	    };
	    C.prototype.stop = C.prototype.stop;function yb(b, c) {
	      var d = zb();this.i = null == b.maxAttempts ? d.maxAttempts : b.maxAttempts;this.f = null == b.baseDelay ? d.baseDelay : b.baseDelay;this.h = null == b.fuzzFactor ? d.fuzzFactor : b.fuzzFactor;this.g = null == b.backoffFactor ? d.backoffFactor : b.backoffFactor;this.a = 0;this.b = this.f;if (this.c = void 0 === c ? !1 : c) this.a = 1;
	    }
	    function Ab(b) {
	      return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (b.a >= b.i) if (b.c) b.a = 1, b.b = b.f;else return d["return"](Promise.reject());e = b.a;b.a++;if (0 == e) return d["return"]();f = b.b * (1 + (2 * Math.random() - 1) * b.h);return u(d, new Promise(function (b) {
	                new C(b).P(f / 1E3);
	              }), 2);case 2:
	              b.b *= b.g, w(d);}
	        });
	      });
	    }function zb() {
	      return { maxAttempts: 2, baseDelay: 1E3, backoffFactor: 2, fuzzFactor: .5, timeout: 0 };
	    }function D(b, c, d, e) {
	      for (var f = [], g = 3; g < arguments.length; ++g) f[g - 3] = arguments[g];this.severity = b;this.category = c;this.code = d;this.data = f;this.handled = !1;
	    }A("shaka.util.Error", D);D.prototype.toString = function () {
	      return "shaka.util.Error " + JSON.stringify(this, null, "  ");
	    };D.Severity = { RECOVERABLE: 1, CRITICAL: 2 };D.Category = { NETWORK: 1, TEXT: 2, MEDIA: 3, MANIFEST: 4, STREAMING: 5, DRM: 6, PLAYER: 7, CAST: 8, STORAGE: 9 };
	    D.Code = { UNSUPPORTED_SCHEME: 1E3, BAD_HTTP_STATUS: 1001, HTTP_ERROR: 1002, TIMEOUT: 1003, MALFORMED_DATA_URI: 1004, UNKNOWN_DATA_URI_ENCODING: 1005, REQUEST_FILTER_ERROR: 1006, RESPONSE_FILTER_ERROR: 1007, MALFORMED_TEST_URI: 1008, UNEXPECTED_TEST_REQUEST: 1009, INVALID_TEXT_HEADER: 2E3, INVALID_TEXT_CUE: 2001, UNABLE_TO_DETECT_ENCODING: 2003, BAD_ENCODING: 2004, INVALID_XML: 2005, INVALID_MP4_TTML: 2007, INVALID_MP4_VTT: 2008, UNABLE_TO_EXTRACT_CUE_START_TIME: 2009, BUFFER_READ_OUT_OF_BOUNDS: 3E3, JS_INTEGER_OVERFLOW: 3001, EBML_OVERFLOW: 3002,
	      EBML_BAD_FLOATING_POINT_SIZE: 3003, MP4_SIDX_WRONG_BOX_TYPE: 3004, MP4_SIDX_INVALID_TIMESCALE: 3005, MP4_SIDX_TYPE_NOT_SUPPORTED: 3006, WEBM_CUES_ELEMENT_MISSING: 3007, WEBM_EBML_HEADER_ELEMENT_MISSING: 3008, WEBM_SEGMENT_ELEMENT_MISSING: 3009, WEBM_INFO_ELEMENT_MISSING: 3010, WEBM_DURATION_ELEMENT_MISSING: 3011, WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING: 3012, WEBM_CUE_TIME_ELEMENT_MISSING: 3013, MEDIA_SOURCE_OPERATION_FAILED: 3014, MEDIA_SOURCE_OPERATION_THREW: 3015, VIDEO_ERROR: 3016, QUOTA_EXCEEDED_ERROR: 3017, TRANSMUXING_FAILED: 3018,
	      UNABLE_TO_GUESS_MANIFEST_TYPE: 4E3, DASH_INVALID_XML: 4001, DASH_NO_SEGMENT_INFO: 4002, DASH_EMPTY_ADAPTATION_SET: 4003, DASH_EMPTY_PERIOD: 4004, DASH_WEBM_MISSING_INIT: 4005, DASH_UNSUPPORTED_CONTAINER: 4006, DASH_PSSH_BAD_ENCODING: 4007, DASH_NO_COMMON_KEY_SYSTEM: 4008, DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED: 4009, DASH_CONFLICTING_KEY_IDS: 4010, UNPLAYABLE_PERIOD: 4011, RESTRICTIONS_CANNOT_BE_MET: 4012, NO_PERIODS: 4014, HLS_PLAYLIST_HEADER_MISSING: 4015, INVALID_HLS_TAG: 4016, HLS_INVALID_PLAYLIST_HIERARCHY: 4017, DASH_DUPLICATE_REPRESENTATION_ID: 4018,
	      HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND: 4020, HLS_COULD_NOT_GUESS_MIME_TYPE: 4021, HLS_MASTER_PLAYLIST_NOT_PROVIDED: 4022, HLS_REQUIRED_ATTRIBUTE_MISSING: 4023, HLS_REQUIRED_TAG_MISSING: 4024, HLS_COULD_NOT_GUESS_CODECS: 4025, HLS_KEYFORMATS_NOT_SUPPORTED: 4026, DASH_UNSUPPORTED_XLINK_ACTUATE: 4027, DASH_XLINK_DEPTH_LIMIT: 4028, HLS_COULD_NOT_PARSE_SEGMENT_START_TIME: 4030, CONTENT_UNSUPPORTED_BY_BROWSER: 4032, CANNOT_ADD_EXTERNAL_TEXT_TO_LIVE_STREAM: 4033, HLS_AES_128_ENCRYPTION_NOT_SUPPORTED: 4034, INVALID_STREAMS_CHOSEN: 5005,
	      NO_RECOGNIZED_KEY_SYSTEMS: 6E3, REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE: 6001, FAILED_TO_CREATE_CDM: 6002, FAILED_TO_ATTACH_TO_VIDEO: 6003, INVALID_SERVER_CERTIFICATE: 6004, FAILED_TO_CREATE_SESSION: 6005, FAILED_TO_GENERATE_LICENSE_REQUEST: 6006, LICENSE_REQUEST_FAILED: 6007, LICENSE_RESPONSE_REJECTED: 6008, ENCRYPTED_CONTENT_WITHOUT_DRM_INFO: 6010, NO_LICENSE_SERVER_GIVEN: 6012, OFFLINE_SESSION_REMOVED: 6013, EXPIRED: 6014, SERVER_CERTIFICATE_REQUIRED: 6015, INIT_DATA_TRANSFORM_ERROR: 6016, LOAD_INTERRUPTED: 7E3, OPERATION_ABORTED: 7001,
	      NO_VIDEO_ELEMENT: 7002, CAST_API_UNAVAILABLE: 8E3, NO_CAST_RECEIVERS: 8001, ALREADY_CASTING: 8002, UNEXPECTED_CAST_ERROR: 8003, CAST_CANCELED_BY_USER: 8004, CAST_CONNECTION_TIMED_OUT: 8005, CAST_RECEIVER_APP_UNAVAILABLE: 8006, CAST_RECEIVER_APP_ID_MISSING: 8007, STORAGE_NOT_SUPPORTED: 9E3, INDEXED_DB_ERROR: 9001, DEPRECATED_OPERATION_ABORTED: 9002, REQUESTED_ITEM_NOT_FOUND: 9003, MALFORMED_OFFLINE_URI: 9004, CANNOT_STORE_LIVE_OFFLINE: 9005, STORE_ALREADY_IN_PROGRESS: 9006, NO_INIT_DATA_FOR_OFFLINE: 9007, LOCAL_PLAYER_INSTANCE_REQUIRED: 9008,
	      NEW_KEY_OPERATION_NOT_SUPPORTED: 9011, KEY_NOT_FOUND: 9012, MISSING_STORAGE_CELL: 9013 };function F() {
	      var b,
	          c,
	          d = new Promise(function (d, f) {
	        b = d;c = f;
	      });d.resolve = b;d.reject = c;return d;
	    }F.prototype.resolve = function () {};F.prototype.reject = function () {};function G(b, c) {
	      this.promise = b;this.Md = c;this.a = !1;
	    }A("shaka.util.AbortableOperation", G);function Bb(b) {
	      return new G(Promise.reject(b), function () {
	        return Promise.resolve();
	      });
	    }G.failed = Bb;function Eb() {
	      var b = Promise.reject(new D(2, 7, 7001));b["catch"](function () {});return new G(b, function () {
	        return Promise.resolve();
	      });
	    }G.aborted = Eb;function Fb(b) {
	      return new G(Promise.resolve(b), function () {
	        return Promise.resolve();
	      });
	    }G.completed = Fb;
	    function Gb(b) {
	      return new G(b, function () {
	        return b["catch"](function () {});
	      });
	    }G.notAbortable = Gb;G.prototype.abort = function () {
	      this.a = !0;return this.Md();
	    };G.prototype.abort = G.prototype.abort;function Hb(b) {
	      return new G(Promise.all(b.map(function (b) {
	        return b.promise;
	      })), function () {
	        return Promise.all(b.map(function (b) {
	          return b.abort();
	        }));
	      });
	    }G.all = Hb;G.prototype["finally"] = function (b) {
	      this.promise.then(function () {
	        return b(!0);
	      }, function () {
	        return b(!1);
	      });return this;
	    };G.prototype["finally"] = G.prototype["finally"];
	    G.prototype.U = function (b, c) {
	      function d() {
	        f.reject(new D(2, 7, 7001));return e.abort();
	      }var e = this,
	          f = new F();this.promise.then(function (c) {
	        e.a ? f.reject(new D(2, 7, 7001)) : b ? d = Ib(b, c, f) : f.resolve(c);
	      }, function (b) {
	        c ? d = Ib(c, b, f) : f.reject(b);
	      });return new G(f, function () {
	        return d();
	      });
	    };G.prototype.chain = G.prototype.U;
	    function Ib(b, c, d) {
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
	    };I.prototype.stopPropagation = function () {};function Jb() {
	      this.a = {};
	    }q = Jb.prototype;q.push = function (b, c) {
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
	    };function Kb() {
	      this.Fc = new Jb();this.Yb = this;
	    }Kb.prototype.addEventListener = function (b, c) {
	      this.Fc.push(b, c);
	    };Kb.prototype.removeEventListener = function (b, c) {
	      this.Fc.remove(b, c);
	    };Kb.prototype.dispatchEvent = function (b) {
	      for (var c = this.Fc.get(b.type) || [], d = 0; d < c.length; ++d) {
	        b.target = this.Yb;b.currentTarget = this.Yb;var e = c[d];try {
	          e.handleEvent ? e.handleEvent(b) : e.call(this, b);
	        } catch (f) {}if (b.a) break;
	      }return b.defaultPrevented;
	    };function Lb(b) {
	      function c(b) {
	        switch (typeof b) {case "undefined":case "boolean":case "number":case "string":case "symbol":case "function":
	            return b;default:
	            if (!b || b.buffer && b.buffer.constructor == ArrayBuffer) return b;if (d.has(b)) return null;var e = b.constructor == Array;if (b.constructor != Object && !e) return null;d.add(b);var g = e ? [] : {},
	                h;for (h in b) g[h] = c(b[h]);e && (g.length = b.length);return g;}
	      }var d = new Set();return c(b);
	    }function Mb(b, c) {
	      return "number" === typeof b && "number" === typeof c && isNaN(b) && isNaN(c) ? !0 : b === c;
	    }function Nb(b, c) {
	      var d = b.indexOf(c);-1 < d && b.splice(d, 1);
	    }function Ob(b, c) {
	      var d = 0;b.forEach(function (b) {
	        d += c(b) ? 1 : 0;
	      });return d;
	    }
	    function Pb(b, c, d) {
	      d || (d = Mb);if (b.length != c.length) return !1;c = c.slice();var e = {};b = r(b);for (var f = b.next(); !f.done; e = { item: e.item }, f = b.next()) {
	        e.item = f.value;f = c.findIndex(function (b) {
	          return function (c) {
	            return d(b.item, c);
	          };
	        }(e));if (-1 == f) return !1;c[f] = c[c.length - 1];c.pop();
	      }return 0 == c.length;
	    }function Qb() {
	      this.a = [];
	    }function Rb(b, c) {
	      b.a.push(c["finally"](function () {
	        Nb(b.a, c);
	      }));
	    }Qb.prototype.destroy = function () {
	      var b = [];this.a.forEach(function (c) {
	        c.promise["catch"](function () {});b.push(c.abort());
	      });this.a = [];return Promise.all(b);
	    };function J(b) {
	      Kb.call(this);this.f = !1;this.g = new Qb();this.a = new Set();this.b = new Set();this.c = b || null;
	    }Sa(J, Kb);A("shaka.net.NetworkingEngine", J);J.RequestType = { MANIFEST: 0, SEGMENT: 1, LICENSE: 2, APP: 3, TIMING: 4 };J.PluginPriority = { FALLBACK: 1, PREFERRED: 2, APPLICATION: 3 };var Sb = {};function Tb(b, c, d) {
	      d = d || 3;var e = Sb[b];if (!e || d >= e.priority) Sb[b] = { priority: d, Df: c };
	    }J.registerScheme = Tb;J.unregisterScheme = function (b) {
	      delete Sb[b];
	    };J.prototype.Ff = function (b) {
	      this.a.add(b);
	    };J.prototype.registerRequestFilter = J.prototype.Ff;
	    J.prototype.hg = function (b) {
	      this.a["delete"](b);
	    };J.prototype.unregisterRequestFilter = J.prototype.hg;J.prototype.ye = function () {
	      this.a.clear();
	    };J.prototype.clearAllRequestFilters = J.prototype.ye;J.prototype.Gf = function (b) {
	      this.b.add(b);
	    };J.prototype.registerResponseFilter = J.prototype.Gf;J.prototype.ig = function (b) {
	      this.b["delete"](b);
	    };J.prototype.unregisterResponseFilter = J.prototype.ig;J.prototype.ze = function () {
	      this.b.clear();
	    };J.prototype.clearAllResponseFilters = J.prototype.ze;
	    J.defaultRetryParameters = function () {
	      return zb();
	    };function Ub(b, c) {
	      return { uris: b, method: "GET", body: null, headers: {}, allowCrossSiteCredentials: !1, retryParameters: c, licenseRequestType: null, sessionId: null };
	    }J.makeRequest = Ub;J.prototype.destroy = function () {
	      this.f = !0;this.a.clear();this.b.clear();return this.g.destroy();
	    };J.prototype.destroy = J.prototype.destroy;
	    J.prototype.request = function (b, c) {
	      var d = this,
	          e = new Vb();if (this.f) {
	        var f = Promise.reject(new D(2, 7, 7001));f["catch"](function () {});return new Wb(f, function () {
	          return Promise.resolve();
	        }, e);
	      }c.method = c.method || "GET";c.headers = c.headers || {};c.retryParameters = c.retryParameters ? Lb(c.retryParameters) : zb();c.uris = Lb(c.uris);f = Xb(this, b, c);var g = f.U(function () {
	        return Yb(d, b, c, new yb(c.retryParameters, !1), 0, null, e);
	      }),
	          h = g.U(function (c) {
	        return Zb(d, b, c);
	      }),
	          k = Date.now(),
	          l = 0;f.promise.then(function () {
	        l = Date.now() - k;
	      }, function () {});var m = 0;g.promise.then(function () {
	        m = Date.now();
	      }, function () {});f = h.U(function (c) {
	        var e = Date.now() - m,
	            f = c.response;f.timeMs += l;f.timeMs += e;c.cf || !d.c || f.fromCache || 1 != b || d.c(f.timeMs, f.data.byteLength);return f;
	      }, function (b) {
	        b && (b.severity = 2);throw b;
	      });f = new Wb(f.promise, f.Md, e);Rb(this.g, f);return f;
	    };J.prototype.request = J.prototype.request;
	    function Xb(b, c, d) {
	      var e = Fb(void 0),
	          f = {};b = r(b.a);for (var g = b.next(); !g.done; f = { ld: f.ld }, g = b.next()) f.ld = g.value, e = e.U(function (b) {
	        return function () {
	          return b.ld(c, d);
	        };
	      }(f));return e.U(void 0, function (b) {
	        if (b && 7001 == b.code) throw b;throw new D(2, 1, 1006, b);
	      });
	    }
	    function Yb(b, c, d, e, f, g, h) {
	      var k = new ib(d.uris[f]),
	          l = k.sa,
	          m = !1;l || (l = location.protocol, l = l.slice(0, -1), jb(k, l), d.uris[f] = k.toString());l = l.toLowerCase();var n = (l = Sb[l]) ? l.Df : null;if (!n) return Bb(new D(2, 1, 1E3, k));var p;return Gb(Ab(e)).U(function () {
	        if (b.f) return Eb();p = Date.now();return n(d.uris[f], d, c, function (d, e, f) {
	          b.c && 1 == c && (b.c(d, e), m = !0, h.a = f);
	        });
	      }).U(function (b) {
	        void 0 == b.timeMs && (b.timeMs = Date.now() - p);return { response: b, cf: m };
	      }, function (k) {
	        if (k && 7001 == k.code) throw k;if (b.f) return Eb();if (k && 1 == k.severity) return b.dispatchEvent(new I("retry", { error: k instanceof D ? k : null })), f = (f + 1) % d.uris.length, Yb(b, c, d, e, f, k, h);throw k || g;
	      });
	    }function Zb(b, c, d) {
	      var e = Fb(void 0);b = r(b.b);for (var f = b.next(); !f.done; f = b.next()) e = e.U(f.value.bind(null, c, d.response));return e.U(function () {
	        return d;
	      }, function (b) {
	        if (b && 7001 == b.code) throw b;var c = 2;b instanceof D && (c = b.severity);throw new D(c, 1, 1007, b);
	      });
	    }function Vb() {
	      this.a = 0;
	    }J.NumBytesRemainingClass = Vb;function Wb(b, c, d) {
	      G.call(this, b, c);this.b = d;
	    }var $b = Wb;
	    $b.prototype = ma(G.prototype);$b.prototype.constructor = $b;if (sa) sa($b, G);else for (var ac in G) if ("prototype" != ac) if (Object.defineProperties) {
	      var bc = Object.getOwnPropertyDescriptor(G, ac);bc && Object.defineProperty($b, ac, bc);
	    } else $b[ac] = G[ac];$b.fg = G.prototype;J.PendingRequest = Wb;Wb.all = Hb;Wb.notAbortable = Gb;Wb.completed = Fb;Wb.aborted = Eb;Wb.failed = Bb;function cc() {}A("shaka.util.IReleasable", cc);cc.prototype.release = function () {};function K() {
	      this.a = new Jb();
	    }A("shaka.util.EventManager", K);K.prototype.release = function () {
	      this.$a();this.a = null;
	    };K.prototype.release = K.prototype.release;K.prototype.w = function (b, c, d, e) {
	      this.a && (b = new dc(b, c, d, e), this.a.push(c, b));
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
	    function dc(b, c, d, e) {
	      this.target = b;this.type = c;this.listener = d;this.a = ec(b, e);this.target.addEventListener(c, d, this.a);
	    }dc.prototype.ea = function () {
	      this.target.removeEventListener(this.type, this.listener, this.a);this.listener = this.target = null;this.a = !1;
	    };dc.prototype.unlisten = dc.prototype.ea;function ec(b, c) {
	      if (void 0 == c) return !1;if ("boolean" == typeof c) return c;var d = new Set(["passive", "capture"]);Object.keys(c).filter(function (b) {
	        return !d.has(b);
	      });return fc(b) ? c : c.capture || !1;
	    }
	    function fc(b) {
	      var c = gc;if (void 0 == c) {
	        c = !1;try {
	          var d = {},
	              e = { get: function () {
	              c = !0;return !1;
	            } };Object.defineProperty(d, "passive", e);Object.defineProperty(d, "capture", e);e = function () {};b.addEventListener("test", e, d);b.removeEventListener("test", e, d);
	        } catch (f) {
	          c = !1;
	        }gc = c;
	      }return c || !1;
	    }var gc = void 0;function hc(b) {
	      b = new Uint8Array(b);if (new DataView(b.buffer, b.byteOffset, b.byteLength).getUint32(0, !0) + 4 != b.byteLength) throw new RangeError("Malformed FairPlay init data");b = ic(b.subarray(4), !0);return new ib(b).ra;
	    }A("shaka.util.FairPlayUtils.defaultGetContentId", hc);
	    function jc(b, c, d) {
	      function e(b) {
	        new DataView(g.buffer).setUint32(h, b.byteLength, !0);h += 4;f(b);
	      }function f(b) {
	        g.set(b, h);h += b.byteLength;
	      }if (!d || !d.byteLength) throw new D(2, 6, 6015);c = "string" == typeof c ? new Uint8Array(kc(c, !0)) : new Uint8Array(c);var g = new Uint8Array(8 + b.byteLength + c.byteLength + d.byteLength),
	          h = 0;f(new Uint8Array(b));e(c);e(new Uint8Array(d));return g;
	    }A("shaka.util.FairPlayUtils.initDataTransform", jc);function lc(b, c) {
	      for (var d = [], e = r(b), f = e.next(); !f.done; f = e.next()) d.push(c(f.value));return d;
	    }function mc(b, c) {
	      for (var d = r(b), e = d.next(); !e.done; e = d.next()) if (!c(e.value)) return !1;return !0;
	    }function nc(b) {
	      var c = new Map();Object.keys(b).forEach(function (d) {
	        c.set(d, b[d]);
	      });return c;
	    }function oc(b) {
	      var c = {};b.forEach(function (b, e) {
	        c[e] = b;
	      });return c;
	    }function pc(b, c) {
	      var d = b;c && (d += '; codecs="' + c + '"');return d;
	    }function qc(b) {
	      var c = [b.mimeType];rc.forEach(function (d, e) {
	        var f = b[e];f && c.push(d + '="' + f + '"');
	      });return c.join(";");
	    }function sc(b) {
	      b = b.split(".");var c = b[0];b.pop();return [c, b.join(".")];
	    }var rc = new Map().set("codecs", "codecs").set("frameRate", "framerate").set("bandwidth", "bitrate").set("width", "width").set("height", "height").set("channelsCount", "channels");function tc() {
	      return window.MediaSource && MediaSource.isTypeSupported ? !0 : !1;
	    }function uc(b) {
	      return "" != vc().canPlayType(b);
	    }function wc(b) {
	      return (navigator.userAgent || "").includes(b);
	    }function vc() {
	      if (yc) return yc;zc || (zc = new C(function () {
	        yc = null;
	      }));(yc = document.querySelector("video") || document.querySelector("audio")) || (yc = document.createElement("video"));zc.P(1);return yc;
	    }var zc = null,
	        yc = null;function Ac(b) {
	      if (!b) return "";b = new Uint8Array(b);239 == b[0] && 187 == b[1] && 191 == b[2] && (b = b.subarray(3));b = Bc(b);b = escape(b);try {
	        return decodeURIComponent(b);
	      } catch (c) {
	        throw new D(2, 2, 2004);
	      }
	    }A("shaka.util.StringUtils.fromUTF8", Ac);
	    function ic(b, c, d) {
	      if (!b) return "";if (!d && 0 != b.byteLength % 2) throw new D(2, 2, 2004);if (b instanceof ArrayBuffer) var e = b;else d = new Uint8Array(b.byteLength), d.set(new Uint8Array(b)), e = d.buffer;b = Math.floor(b.byteLength / 2);d = new Uint16Array(b);e = new DataView(e);for (var f = 0; f < b; f++) d[f] = e.getUint16(2 * f, c);return Bc(d);
	    }A("shaka.util.StringUtils.fromUTF16", ic);
	    function Cc(b) {
	      var c = new Uint8Array(b);if (239 == c[0] && 187 == c[1] && 191 == c[2]) return Ac(c);if (254 == c[0] && 255 == c[1]) return ic(c.subarray(2), !1);if (255 == c[0] && 254 == c[1]) return ic(c.subarray(2), !0);var d = function (b, c) {
	        return b.byteLength <= c || 32 <= b[c] && 126 >= b[c];
	      }.bind(null, c);if (0 == c[0] && 0 == c[2]) return ic(b, !1);if (0 == c[1] && 0 == c[3]) return ic(b, !0);if (d(0) && d(1) && d(2) && d(3)) return Ac(b);throw new D(2, 2, 2003);
	    }A("shaka.util.StringUtils.fromBytesAutoDetect", Cc);
	    function Dc(b) {
	      b = encodeURIComponent(b);b = unescape(b);for (var c = new Uint8Array(b.length), d = 0; d < b.length; ++d) c[d] = b.charCodeAt(d);return c.buffer;
	    }A("shaka.util.StringUtils.toUTF8", Dc);function kc(b, c) {
	      for (var d = new Uint8Array(2 * b.length), e = new DataView(d.buffer), f = 0; f < b.length; ++f) e.setUint16(2 * f, b.charCodeAt(f), c);return d.buffer;
	    }A("shaka.util.StringUtils.toUTF16", kc);
	    function Bc(b) {
	      if (!Ec) for (var c = function (b) {
	        try {
	          var c = new Uint8Array(b);La(c);return !0;
	        } catch (g) {
	          return !1;
	        }
	      }, d = { size: 65536 }; 0 < d.size; d = { size: d.size }, d.size /= 2) if (c(d.size)) {
	        Ec = function (b) {
	          return function (c) {
	            for (var d = "", e = 0; e < c.length; e += b.size) d += String.fromCharCode.apply(String, La(c.subarray(e, e + b.size)));return d;
	          };
	        }(d);break;
	      }return Ec(b);
	    }var Ec = null;var L = { vc: function (b, c) {
	        var d = Bc(b);c = void 0 == c ? !0 : c;d = window.btoa(d).replace(/\+/g, "-").replace(/\//g, "_");return c ? d : d.replace(/=*$/, "");
	      } };A("shaka.util.Uint8ArrayUtils.toBase64", L.vc);L.Aa = function (b) {
	      b = window.atob(b.replace(/-/g, "+").replace(/_/g, "/"));for (var c = new Uint8Array(b.length), d = 0; d < b.length; ++d) c[d] = b.charCodeAt(d);return c;
	    };A("shaka.util.Uint8ArrayUtils.fromBase64", L.Aa);
	    L.Mc = function (b) {
	      for (var c = new Uint8Array(b.length / 2), d = 0; d < b.length; d += 2) c[d / 2] = window.parseInt(b.substr(d, 2), 16);return c;
	    };A("shaka.util.Uint8ArrayUtils.fromHex", L.Mc);L.wc = function (b) {
	      for (var c = "", d = 0; d < b.length; ++d) {
	        var e = b[d].toString(16);1 == e.length && (e = "0" + e);c += e;
	      }return c;
	    };A("shaka.util.Uint8ArrayUtils.toHex", L.wc);L.ya = function (b, c) {
	      if (!b && !c) return !0;if (!b || !c || b.length != c.length) return !1;for (var d = 0; d < b.length; ++d) if (b[d] != c[d]) return !1;return !0;
	    };A("shaka.util.Uint8ArrayUtils.equal", L.ya);
	    L.concat = function (b) {
	      for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];for (var e = d = 0; e < c.length; ++e) d += c[e].length;d = new Uint8Array(d);for (var f = e = 0; f < c.length; ++f) d.set(c[f], e), e += c[f].length;return d;
	    };A("shaka.util.Uint8ArrayUtils.concat", L.concat);function Fc(b) {
	      var c = this;this.C = b;this.v = new Set();this.l = this.h = null;this.R = !1;this.a = null;this.i = new K();this.b = new Map();this.s = [];this.m = new F();this.f = null;this.g = function (d) {
	        c.m.reject(d);b.onError(d);
	      };this.oa = new Map();this.T = new Map();this.L = new C(function () {
	        return Gc(c);
	      });this.c = !1;this.$ = new F();this.D = !1;this.F = [];this.na = !1;this.W = new C(function () {
	        Hc(c);
	      }).Na(1);this.m["catch"](function () {});
	    }q = Fc.prototype;
	    q.destroy = function () {
	      var b = this;return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (b.c) return u(d, b.$, 0);b.c = !0;return u(d, Ic(b), 4);case 4:
	              b.$.resolve(), d.A(0);}
	        });
	      });
	    };
	    function Ic(b) {
	      return t(function d() {
	        var e;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.i.release(), b.i = null, b.m.reject(), b.W.stop(), b.W = null, b.L.stop(), b.L = null, e = Array.from(b.b.keys()), b.b.clear(), u(d, Promise.all(e.map(function (b) {
	                return t(function k() {
	                  return z(k, function (d) {
	                    switch (d.j) {case 1:
	                        return xa(d, 2), u(d, Promise.all([b.close(), b.closed]), 4);case 4:
	                        za(d, 0);break;case 2:
	                        Ba(d), w(d);}
	                  });
	                });
	              })), 2);case 2:
	              if (!b.l) {
	                d.A(3);break;
	              }xa(d, 4);return u(d, b.l.setMediaKeys(null), 6);case 6:
	              za(d, 5);break;
	            case 4:
	              Ba(d);case 5:
	              b.l = null;case 3:
	              b.a = null, b.v.clear(), b.h = null, b.s = [], b.f = null, b.g = null, b.C = null, w(d);}
	        });
	      });
	    }q.configure = function (b) {
	      this.f = b;
	    };function Jc(b, c, d) {
	      b.s = [];b.D = d;return Kc(b, c);
	    }function Lc(b, c, d) {
	      b.s = d;b.D = 0 < d.length;return Kc(b, c);
	    }
	    function Mc(b, c, d, e, f, g) {
	      var h = new Map();h.set(c, { audioCapabilities: f, videoCapabilities: g, distinctiveIdentifier: "optional", persistentState: "required", sessionTypes: ["persistent-license"], label: c, drmInfos: [{ keySystem: c, licenseServerUri: d, distinctiveIdentifierRequired: !1, persistentStateRequired: !0, audioRobustness: "", videoRobustness: "", serverCertificate: e, initData: null, keyIds: null }] });return Nc(b, h);
	    }
	    function Kc(b, c) {
	      var d = Oc(b);if (d) for (var e = r(c), f = e.next(); !f.done; f = e.next()) f.value.drmInfos = [d];d = c.some(function (b) {
	        return 0 < b.drmInfos.length;
	      });d || (f = nc(b.f.servers), Pc(c, f));e = r(c);for (f = e.next(); !f.done; f = e.next()) {
	        f = r(f.value.drmInfos);for (var g = f.next(); !g.done; g = f.next()) Qc(g.value, nc(b.f.servers), nc(b.f.advanced || {}));
	      }f = Rc(b, c);if (!f.size) return b.R = !0, Promise.resolve();f = Nc(b, f);return d ? f : f["catch"](function () {});
	    }
	    q.Gb = function (b) {
	      var c = this;if (!this.h) return this.i.da(b, "encrypted", function () {
	        c.g(new D(2, 6, 6010));
	      }), Promise.resolve();this.l = b;this.i.da(this.l, "play", function () {
	        for (var b = 0; b < c.F.length; b++) Sc(c, c.F[b]);c.na = !0;c.F = [];
	      });b = this.l.setMediaKeys(this.h);b = b["catch"](function (b) {
	        return Promise.reject(new D(2, 6, 6003, b.message));
	      });var d = Tc(this);return Promise.all([b, d]).then(function () {
	        if (c.c) return Promise.reject();Uc(c);c.a.initData.length || c.s.length || c.i.w(c.l, "encrypted", function (b) {
	          return Vc(c, b.initDataType, new Uint8Array(b.initData));
	        });
	      })["catch"](function (b) {
	        if (!c.c) return Promise.reject(b);
	      });
	    };function Tc(b) {
	      return t(function d() {
	        var e;return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (!(b.h && b.a && b.a.serverCertificate && b.a.serverCertificate.length)) {
	                d.A(0);break;
	              }xa(d, 3);return u(d, b.h.setServerCertificate(b.a.serverCertificate), 5);case 5:
	              za(d, 0);break;case 3:
	              return e = Ba(d), d["return"](Promise.reject(new D(2, 6, 6004, e.message)));}
	        });
	      });
	    }
	    function Wc(b, c) {
	      return t(function e() {
	        var f, g, h;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return u(e, Xc(b, c), 2);case 2:
	              f = e.o;if (!f) return e["return"]();g = [];if (h = b.b.get(f)) h.xa = new F(), g.push(h.xa);g.push(f.remove());return u(e, Promise.all(g), 0);}
	        });
	      });
	    }function Uc(b) {
	      var c = b.a ? b.a.initData : [];c.forEach(function (c) {
	        return Yc(b, c.initDataType, c.initData);
	      });b.s.forEach(function (c) {
	        return Xc(b, c);
	      });c.length || b.s.length || b.m.resolve();return b.m;
	    }
	    function Vc(b, c, d) {
	      var e = b.b.values();e = r(e);for (var f = e.next(); !f.done; f = e.next()) if (L.ya(d, f.value.initData)) return;Yc(b, c, d);
	    }function Zc(b) {
	      return b ? b.keySystem : "";
	    }function $c(b, c) {
	      return wc("Edge/") ? !0 : b.v.has(c);
	    }function ad(b) {
	      b = b.b.keys();b = lc(b, function (b) {
	        return b.sessionId;
	      });return Array.from(b);
	    }q.Jb = function () {
	      var b = Infinity,
	          c = this.b.keys();c = r(c);for (var d = c.next(); !d.done; d = c.next()) d = d.value, isNaN(d.expiration) || (b = Math.min(b, d.expiration));return b;
	    };
	    function Rc(b, c) {
	      for (var d = new Set(), e = r(c), f = e.next(); !f.done; f = e.next()) {
	        var g = r(f.value.drmInfos);for (f = g.next(); !f.done; f = g.next()) d.add(f.value);
	      }e = r(d);for (f = e.next(); !f.done; f = e.next()) Qc(f.value, nc(b.f.servers), nc(b.f.advanced || {}));g = b.D ? "required" : "optional";var h = b.D ? ["persistent-license"] : ["temporary"];e = new Map();d = r(d);for (f = d.next(); !f.done; f = d.next()) f = f.value, e.set(f.keySystem, { audioCapabilities: [], videoCapabilities: [], distinctiveIdentifier: "optional", persistentState: g, sessionTypes: h,
	        label: f.keySystem, drmInfos: [] });d = r(c);for (f = d.next(); !f.done; f = d.next()) {
	        f = f.value;g = f.audio;h = f.video;var k = g ? pc(g.mimeType, g.codecs) : "",
	            l = h ? pc(h.mimeType, h.codecs) : "",
	            m = r(f.drmInfos);for (f = m.next(); !f.done; f = m.next()) {
	          f = f.value;var n = e.get(f.keySystem);n.drmInfos.push(f);f.distinctiveIdentifierRequired && (n.distinctiveIdentifier = "required");f.persistentStateRequired && (n.persistentState = "required");g && n.audioCapabilities.push({ robustness: f.audioRobustness || "", contentType: k });h && n.videoCapabilities.push({ robustness: f.videoRobustness || "", contentType: l });
	        }
	      }return e;
	    }
	    function Nc(b, c) {
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
	        if (this.c) return Promise.reject();this.v.clear();var d = b.getConfiguration(),
	            e = d.videoCapabilities || [],
	            f = r(d.audioCapabilities || []);for (d = f.next(); !d.done; d = f.next()) this.v.add(d.value.contentType);e = r(e);for (d = e.next(); !d.done; d = e.next()) this.v.add(d.value.contentType);e = b.keySystem;d = c.get(b.keySystem);f = [];var g = [],
	            n = [],
	            p = [];bd(d.drmInfos, f, g, n, p);this.a = { keySystem: e, licenseServerUri: f[0], distinctiveIdentifierRequired: "required" == d.distinctiveIdentifier, persistentStateRequired: "required" == d.persistentState, audioRobustness: d.audioCapabilities ? d.audioCapabilities[0].robustness : "", videoRobustness: d.videoCapabilities ? d.videoCapabilities[0].robustness : "", serverCertificate: g[0], initData: n, keyIds: p };return this.a.licenseServerUri ? b.createMediaKeys() : Promise.reject(new D(2, 6, 6012, this.a.keySystem));
	      }.bind(b)).then(function (b) {
	        if (this.c) return Promise.reject();this.h = b;this.R = !0;
	      }.bind(b))["catch"](function (b) {
	        if (!this.c) return this.a = null, this.v.clear(), b instanceof D ? Promise.reject(b) : Promise.reject(new D(2, 6, 6002, b.message));
	      }.bind(b));d.reject();return f;
	    }
	    function Oc(b) {
	      b = nc(b.f.clearKeys);if (0 == b.size) return null;var c = [],
	          d = [];b.forEach(function (b, e) {
	        var f = L.Mc(e),
	            g = L.Mc(b);f = { kty: "oct", kid: L.vc(f, !1), k: L.vc(g, !1) };c.push(f);d.push(f.kid);
	      });b = JSON.stringify({ keys: c });var e = JSON.stringify({ kids: d });e = [{ initData: new Uint8Array(Dc(e)), initDataType: "keyids" }];return { keySystem: "org.w3.clearkey", licenseServerUri: "data:application/json;base64," + window.btoa(b), distinctiveIdentifierRequired: !1, persistentStateRequired: !1, audioRobustness: "", videoRobustness: "",
	        serverCertificate: null, initData: e, keyIds: [] };
	    }
	    function Xc(b, c) {
	      try {
	        var d = b.h.createSession("persistent-license");
	      } catch (g) {
	        var e = new D(2, 6, 6005, g.message);b.g(e);return Promise.reject(e);
	      }b.i.w(d, "message", b.Ud.bind(b));b.i.w(d, "keystatuseschange", b.Sd.bind(b));var f = { initData: null, loaded: !1, cd: Infinity, xa: null };b.b.set(d, f);return d.load(c).then(function (b) {
	        if (this.c) return Promise.reject();if (b) return f.loaded = !0, cd(this) && this.m.resolve(), d;this.b["delete"](d);this.g(new D(2, 6, 6013));
	      }.bind(b), function (b) {
	        this.c || (this.b["delete"](d), this.g(new D(2, 6, 6005, b.message)));
	      }.bind(b));
	    }
	    function Yc(b, c, d) {
	      try {
	        var e = b.D ? b.h.createSession("persistent-license") : b.h.createSession();
	      } catch (f) {
	        b.g(new D(2, 6, 6005, f.message));return;
	      }b.i.w(e, "message", b.Ud.bind(b));b.i.w(e, "keystatuseschange", b.Sd.bind(b));b.b.set(e, { initData: d, loaded: !1, cd: Infinity, xa: null });try {
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
	    }function dd(b, c) {
	      if (Zc(c).startsWith("com.apple.fps")) {
	        var d = c.serverCertificate,
	            e = hc(b);b = jc(b, e, d);
	      }return b;
	    }q.Ud = function (b) {
	      this.l && this.f.delayLicenseRequestUntilPlayed && this.l.paused && !this.na ? this.F.push(b) : Sc(this, b);
	    };
	    function Sc(b, c) {
	      var d = c.target,
	          e = b.b.get(d),
	          f = b.a.licenseServerUri,
	          g = b.f.advanced[b.a.keySystem];"individualization-request" == c.messageType && g && g.individualizationServer && (f = g.individualizationServer);f = Ub([f], b.f.retryParameters);f.body = c.message;f.method = "POST";f.licenseRequestType = c.messageType;f.sessionId = d.sessionId;"com.microsoft.playready" != b.a.keySystem && "com.chromecast.playready" != b.a.keySystem || ed(f);b.a.keySystem.startsWith("com.apple.fps") && b.f.fairPlayTransform && fd(f);b.C.tb.request(2, f).promise.then(function (b) {
	        if (this.c) return Promise.reject();this.a.keySystem.startsWith("com.apple.fps") && this.f.fairPlayTransform && gd(b);return d.update(b.data).then(function () {
	          var b = this;this.C.onEvent(new I("drmsessionupdate"));e && (e.xa && e.xa.resolve(), new C(function () {
	            e.loaded = !0;cd(b) && b.m.resolve();
	          }).P(hd));
	        }.bind(this));
	      }.bind(b), function (b) {
	        this.c || (b = new D(2, 6, 6007, b), this.g(b), e && e.xa && e.xa.reject(b));
	      }.bind(b))["catch"](function (b) {
	        this.c || (b = new D(2, 6, 6008, b.message), this.g(b), e && e.xa && e.xa.reject(b));
	      }.bind(b));
	    }function ed(b) {
	      var c = ic(b.body, !0, !0);if (c.includes("PlayReadyKeyMessage")) {
	        c = new DOMParser().parseFromString(c, "application/xml");for (var d = c.getElementsByTagName("HttpHeader"), e = 0; e < d.length; ++e) b.headers[d[e].querySelector("name").textContent] = d[e].querySelector("value").textContent;b.body = L.Aa(c.querySelector("Challenge").textContent).buffer;
	      } else b.headers["Content-Type"] = "text/xml; charset=utf-8";
	    }
	    function fd(b) {
	      var c = new Uint8Array(b.body);c = "spc=" + L.vc(c);b.headers["Content-Type"] = "application/x-www-form-urlencoded";b.body = Dc(c);
	    }function gd(b) {
	      try {
	        var c = Ac(b.data);
	      } catch (d) {
	        return;
	      }c = c.trim();"<ckc>" === c.substr(0, 5) && "</ckc>" === c.substr(-6) && (c = c.slice(5, -6));try {
	        c = JSON.parse(c).ckc;
	      } catch (d) {}b.data = L.Aa(c).buffer;
	    }
	    q.Sd = function (b) {
	      b = b.target;var c = this.b.get(b),
	          d = !1;b.keyStatuses.forEach(function (b, e) {
	        if ("string" == typeof e) {
	          var f = e;e = b;b = f;
	        }if ("com.microsoft.playready" == this.a.keySystem && 16 == e.byteLength && !wc("Tizen")) {
	          f = new DataView(e);var g = f.getUint32(0, !0),
	              l = f.getUint16(4, !0),
	              m = f.getUint16(6, !0);f.setUint32(0, g, !1);f.setUint16(4, l, !1);f.setUint16(6, m, !1);
	        }"com.microsoft.playready" == this.a.keySystem && "status-pending" == b && (b = "usable");"status-pending" != b && (c.loaded = !0);"expired" == b && (d = !0);f = L.wc(new Uint8Array(e));
	        this.oa.set(f, b);
	      }.bind(this));var e = b.expiration - Date.now();(0 > e || d && 1E3 > e) && c && !c.xa && (this.b["delete"](b), b.close()["catch"](function () {}));cd(this) && (this.m.resolve(), this.L.P(id));
	    };function Gc(b) {
	      var c = b.oa,
	          d = b.T;d.clear();c.forEach(function (b, c) {
	        return d.set(c, b);
	      });c = Array.from(d.values());c.length && c.every(function (b) {
	        return "expired" == b;
	      }) && b.g(new D(2, 6, 6014));b.C.mc(oc(d));
	    }
	    function jd() {
	      function b(b) {
	        return t(function h() {
	          var c, f, m;return z(h, function (h) {
	            switch (h.j) {case 1:
	                return xa(h, 2), u(h, navigator.requestMediaKeySystemAccess(b, d), 4);case 4:
	                return c = h.o, m = (f = c.getConfiguration().sessionTypes) ? f.includes("persistent-license") : !1, wc("Tizen 3") && (m = !1), e.set(b, { persistentState: m }), u(h, c.createMediaKeys(), 5);case 5:
	                za(h, 0);break;case 2:
	                Ba(h), e.set(b, null), w(h);}
	          });
	        });
	      }var c = [{ contentType: 'video/mp4; codecs="avc1.42E01E"' }, { contentType: 'video/webm; codecs="vp8"' }],
	          d = [{ videoCapabilities: c,
	        persistentState: "required", sessionTypes: ["persistent-license"] }, { videoCapabilities: c }],
	          e = new Map();c = "org.w3.clearkey com.widevine.alpha com.microsoft.playready com.apple.fps.3_0 com.apple.fps.2_0 com.apple.fps.1_0 com.apple.fps com.adobe.primetime".split(" ").map(function (c) {
	        return b(c);
	      });return Promise.all(c).then(function () {
	        return oc(e);
	      });
	    }
	    function kd(b, c) {
	      var d = c.audio,
	          e = c.video;if (d && d.encrypted && !$c(b, pc(d.mimeType, d.codecs)) || e && e.encrypted && !$c(b, pc(e.mimeType, e.codecs))) return !1;var f = Zc(b.a);return 0 == c.drmInfos.length || c.drmInfos.some(function (b) {
	        return b.keySystem == f;
	      });
	    }
	    function ld(b, c) {
	      if (!b.length) return c;if (!c.length) return b;for (var d = [], e = 0; e < b.length; e++) for (var f = 0; f < c.length; f++) if (b[e].keySystem == c[f].keySystem) {
	        var g = b[e];f = c[f];var h = [];h = h.concat(g.initData || []);h = h.concat(f.initData || []);var k = [];k = k.concat(g.keyIds);k = k.concat(f.keyIds);d.push({ keySystem: g.keySystem, licenseServerUri: g.licenseServerUri || f.licenseServerUri, distinctiveIdentifierRequired: g.distinctiveIdentifierRequired || f.distinctiveIdentifierRequired, persistentStateRequired: g.persistentStateRequired || f.persistentStateRequired, videoRobustness: g.videoRobustness || f.videoRobustness, audioRobustness: g.audioRobustness || f.audioRobustness, serverCertificate: g.serverCertificate || f.serverCertificate, initData: h, keyIds: k });break;
	      }return d;
	    }function Hc(b) {
	      b.b.forEach(function (c, d) {
	        var e = c.cd,
	            f = d.expiration;isNaN(f) && (f = Infinity);f != e && (b.C.onExpirationUpdated(d.sessionId, f), c.cd = f);
	      });
	    }function cd(b) {
	      b = b.b.values();return mc(b, function (b) {
	        return b.loaded;
	      });
	    }
	    function Pc(b, c) {
	      var d = [];c.forEach(function (b, c) {
	        d.push({ keySystem: c, licenseServerUri: b, distinctiveIdentifierRequired: !1, persistentStateRequired: !1, audioRobustness: "", videoRobustness: "", serverCertificate: null, initData: [], keyIds: [] });
	      });for (var e = r(b), f = e.next(); !f.done; f = e.next()) f.value.drmInfos = d;
	    }
	    function bd(b, c, d, e, f) {
	      b.forEach(function (b) {
	        c.includes(b.licenseServerUri) || c.push(b.licenseServerUri);b.serverCertificate && (d.some(function (c) {
	          return L.ya(c, b.serverCertificate);
	        }) || d.push(b.serverCertificate));b.initData && b.initData.forEach(function (b) {
	          e.some(function (c) {
	            return c.keyId && c.keyId == b.keyId ? !0 : c.initDataType == b.initDataType && L.ya(c.initData, b.initData);
	          }) || e.push(b);
	        });if (b.keyIds) for (var g = 0; g < b.keyIds.length; ++g) f.includes(b.keyIds[g]) || f.push(b.keyIds[g]);
	      });
	    }
	    function Qc(b, c, d) {
	      if (b.keySystem && ("org.w3.clearkey" != b.keySystem || !b.licenseServerUri)) {
	        c.size && (c = c.get(b.keySystem) || "", b.licenseServerUri = c);b.keyIds || (b.keyIds = []);if (d = d.get(b.keySystem)) b.distinctiveIdentifierRequired || (b.distinctiveIdentifierRequired = d.distinctiveIdentifierRequired), b.persistentStateRequired || (b.persistentStateRequired = d.persistentStateRequired), b.videoRobustness || (b.videoRobustness = d.videoRobustness), b.audioRobustness || (b.audioRobustness = d.audioRobustness), b.serverCertificate || (b.serverCertificate = d.serverCertificate);window.cast && window.cast.__platform__ && "com.microsoft.playready" == b.keySystem && (b.keySystem = "com.chromecast.playready");
	      }
	    }var hd = 5,
	        id = .5;function md() {
	      this.a = new muxjs.mp4.CaptionParser();this.g = [];this.f = {};
	    }md.prototype.init = function (b) {
	      var c = muxjs.mp4.probe;b = new Uint8Array(b);this.g = c.videoTrackIds(b);this.f = c.timescale(b);this.a.init();
	    };md.prototype.b = function (b, c) {
	      var d = new Uint8Array(b);(d = this.a.parse(d, this.g, this.f)) && d.captions && c(d.captions);this.a.clearParsedCaptions();
	    };md.prototype.c = function () {
	      this.a.resetCaptionStream();
	    };function nd() {}nd.prototype.init = function () {};nd.prototype.b = function () {};nd.prototype.c = function () {};function od(b) {
	      return !b || 1 == b.length && 1E-6 > b.end(0) - b.start(0) ? null : b.length ? b.end(b.length - 1) : null;
	    }function pd(b, c, d) {
	      d = void 0 === d ? 0 : d;return !b || !b.length || 1 == b.length && 1E-6 > b.end(0) - b.start(0) || c > b.end(b.length - 1) ? !1 : c + d >= b.start(0);
	    }function qd(b, c) {
	      if (!b || !b.length || 1 == b.length && 1E-6 > b.end(0) - b.start(0)) return 0;for (var d = 0, e = b.length - 1; 0 <= e && b.end(e) > c; --e) d += b.end(e) - Math.max(b.start(e), c);return d;
	    }
	    function rd(b) {
	      if (!b) return [];for (var c = [], d = 0; d < b.length; d++) c.push({ start: b.start(d), end: b.end(d) });return c;
	    }var sd = { Ae: function (b, c) {
	        return b.reduce(function (b, c, f) {
	          return c["catch"](b.bind(null, f));
	        }.bind(null, c), Promise.reject());
	      }, Cc: function (b, c) {
	        return b.concat(c);
	      }, kc: function () {}, Ia: function (b) {
	        return null != b;
	      } };function td(b, c) {
	      if (0 == c.length) return b;var d = c.map(function (b) {
	        return new ib(b);
	      });return b.map(function (b) {
	        return new ib(b);
	      }).map(function (b) {
	        return d.map(b.resolve.bind(b));
	      }).reduce(sd.Cc, []).map(function (b) {
	        return b.toString();
	      });
	    }function ud(b, c) {
	      return { keySystem: b, licenseServerUri: "", distinctiveIdentifierRequired: !1, persistentStateRequired: !1, audioRobustness: "", videoRobustness: "", serverCertificate: null, initData: c || [], keyIds: [] };
	    }
	    var xd = { Pa: "video", Db: "audio", qa: "text", rg: "image", pg: "application" },
	        yd = 1 / 15;function zd() {
	      this.a = new muxjs.mp4.Transmuxer({ keepOriginalTimestamps: !0 });this.b = null;this.g = [];this.c = [];this.f = !1;this.a.on("data", this.i.bind(this));this.a.on("done", this.h.bind(this));
	    }zd.prototype.destroy = function () {
	      this.a.dispose();this.a = null;return Promise.resolve();
	    };function Ad(b, c) {
	      return window.muxjs && "mp2t" == b.toLowerCase().split(";")[0].split("/")[1] ? c ? MediaSource.isTypeSupported(Bd(c, b)) : MediaSource.isTypeSupported(Bd("audio", b)) || MediaSource.isTypeSupported(Bd("video", b)) : !1;
	    }
	    function Bd(b, c) {
	      var d = c.replace(/mp2t/i, "mp4");"audio" == b && (d = d.replace("video", "audio"));var e = /avc1\.(66|77|100)\.(\d+)/.exec(d);if (e) {
	        var f = "avc1.",
	            g = e[1],
	            h = Number(e[2]);f = ("66" == g ? f + "4200" : "77" == g ? f + "4d00" : f + "6400") + (h >> 4).toString(16);f += (h & 15).toString(16);d = d.replace(e[0], f);
	      }return d;
	    }function Cd(b, c) {
	      b.f = !0;b.b = new F();b.g = [];b.c = [];var d = new Uint8Array(c);b.a.push(d);b.a.flush();b.f && b.b.reject(new D(2, 3, 3018));return b.b;
	    }
	    zd.prototype.i = function (b) {
	      this.c = b.captions;var c = new Uint8Array(b.data.byteLength + b.initSegment.byteLength);c.set(b.initSegment, 0);c.set(b.data, b.initSegment.byteLength);this.g.push(c);
	    };zd.prototype.h = function () {
	      var b = { data: L.concat.apply(null, this.g), captions: this.c };this.b.resolve(b);this.f = !1;
	    };function Dd(b, c, d) {
	      this.startTime = b;this.direction = Ed;this.endTime = c;this.payload = d;this.region = new Fd();this.position = null;this.positionAlign = Gd;this.size = 100;this.textAlign = Hd;this.writingMode = Id;this.lineInterpretation = Jd;this.line = null;this.lineHeight = "";this.lineAlign = Kd;this.displayAlign = Ld;this.fontSize = this.backgroundImage = this.backgroundColor = this.color = "";this.fontWeight = Md;this.fontStyle = Nd;this.fontFamily = "";this.textDecoration = [];this.wrapLine = !0;this.id = "";this.nestedCues = [];this.spacer = !1;
	    }A("shaka.text.Cue", Dd);var Gd = "auto";Dd.positionAlign = { LEFT: "line-left", RIGHT: "line-right", CENTER: "center", AUTO: Gd };var Hd = "center",
	        Od = { LEFT: "left", RIGHT: "right", CENTER: Hd, START: "start", END: "end" };Dd.textAlign = Od;var Ld = "after",
	        Pd = { BEFORE: "before", CENTER: "center", AFTER: Ld };Dd.displayAlign = Pd;var Ed = "ltr";Dd.direction = { HORIZONTAL_LEFT_TO_RIGHT: Ed, HORIZONTAL_RIGHT_TO_LEFT: "rtl" };var Id = "horizontal-tb";Dd.writingMode = { HORIZONTAL_TOP_TO_BOTTOM: Id, VERTICAL_LEFT_TO_RIGHT: "vertical-lr", VERTICAL_RIGHT_TO_LEFT: "vertical-rl" };
	    var Jd = 0;Dd.lineInterpretation = { LINE_NUMBER: Jd, PERCENTAGE: 1 };var Kd = "start",
	        Qd = { CENTER: "center", START: Kd, END: "end" };Dd.lineAlign = Qd;var Md = 400;Dd.fontWeight = { NORMAL: Md, BOLD: 700 };var Nd = "normal",
	        Rd = { NORMAL: Nd, ITALIC: "italic", OBLIQUE: "oblique" };Dd.fontStyle = Rd;Dd.textDecoration = { UNDERLINE: "underline", LINE_THROUGH: "lineThrough", OVERLINE: "overline" };
	    function Fd() {
	      this.id = "";this.regionAnchorY = this.regionAnchorX = this.viewportAnchorY = this.viewportAnchorX = 0;this.height = this.width = 100;this.viewportAnchorUnits = this.widthUnits = this.heightUnits = Sd;this.scroll = Td;
	    }A("shaka.text.CueRegion", Fd);var Sd = 1;Fd.units = { PX: 0, PERCENTAGE: Sd, LINES: 2 };var Td = "";Fd.scrollMode = { NONE: Td, UP: "up" };function Ud(b) {
	      this.g = null;this.c = b;this.f = this.m = 0;this.h = Infinity;this.b = this.a = null;this.l = "";this.i = new Map();
	    }var Vd = {};A("shaka.text.TextEngine.registerParser", function (b, c) {
	      Vd[b] = c;
	    });A("shaka.text.TextEngine.unregisterParser", function (b) {
	      delete Vd[b];
	    });function Wd(b) {
	      return Vd[b] || window.muxjs && "application/cea-608" == b ? !0 : !1;
	    }Ud.prototype.destroy = function () {
	      this.c = this.g = null;this.i.clear();return Promise.resolve();
	    };function Xd(b, c) {
	      "application/cea-608" != c && (b.g = new Vd[c]());
	    }
	    Ud.prototype.Rc = function (b) {
	      var c = { periodStart: 0, segmentStart: null, segmentEnd: 0 };try {
	        return this.g.parseMedia(new Uint8Array(b), c)[0].startTime;
	      } catch (d) {
	        throw new D(2, 2, 2009, d);
	      }
	    };
	    function Yd(b, c, d, e) {
	      return Promise.resolve().then(function () {
	        if (this.g && this.c) if (null == d || null == e) this.g.parseInit(new Uint8Array(c));else {
	          var b = { periodStart: this.m, segmentStart: d, segmentEnd: e };b = this.g.parseMedia(new Uint8Array(c), b).filter(function (b) {
	            return b.startTime >= this.f && b.startTime < this.h;
	          }.bind(this));this.c.append(b);null == this.a && (this.a = Math.max(d, this.f));this.b = Math.min(e, this.h);
	        }
	      }.bind(b));
	    }
	    Ud.prototype.remove = function (b, c) {
	      return Promise.resolve().then(function () {
	        !this.c || !this.c.remove(b, c) || null == this.a || c <= this.a || b >= this.b || (b <= this.a && c >= this.b ? this.a = this.b = null : b <= this.a && c < this.b ? this.a = c : b > this.a && c >= this.b && (this.b = b));
	      }.bind(this));
	    };Ud.prototype.se = function (b) {
	      this.c.append(b);
	    };Ud.prototype.appendCues = Ud.prototype.se;
	    Ud.prototype.tc = function (b, c) {
	      this.l = b;var d = this.i.get(b);if (d) for (var e = r(d.keys()), f = e.next(); !f.done; f = e.next()) (f = d.get(f.value).filter(function (b) {
	        return b.endTime <= c;
	      })) && this.c.append(f);
	    };Ud.prototype.setSelectedClosedCaptionId = Ud.prototype.tc;
	    function Zd(b, c, d, e, f) {
	      var g = d + " " + e,
	          h = new Map();c = r(c);for (var k = c.next(); !k.done; k = c.next()) {
	        var l = k.value;k = l.stream;h.has(k) || h.set(k, new Map());h.get(k).has(g) || h.get(k).set(g, []);l.startTime += f;l.endTime += f;l.startTime >= b.f && l.startTime < b.h && (l = new Dd(l.startTime, l.endTime, l.text), h.get(k).get(g).push(l), k == b.l && b.c.append([l]));
	      }f = r(h.keys());for (g = f.next(); !g.done; g = f.next()) for (g = g.value, b.i.has(g) || b.i.set(g, new Map()), c = r(h.get(g).keys()), k = c.next(); !k.done; k = c.next()) k = k.value, l = h.get(g).get(k), b.i.get(g).set(k, l);b.a = null == b.a ? Math.max(d, b.f) : Math.min(b.a, Math.max(d, b.f));b.b = Math.max(b.b, Math.min(e, b.h));
	    }function $d(b, c, d) {
	      this.f = b;this.g = d;this.b = {};this.a = null;this.c = {};this.i = new K();this.v = !1;this.l = {};this.m = c;b = this.s = new F();c = new MediaSource();this.i.da(c, "sourceopen", b.resolve);this.f.src = ae(c);this.h = c;
	    }var ae = window.URL.createObjectURL;function be(b) {
	      var c = pc(b.mimeType, b.codecs),
	          d = qc(b);return Wd(c) || MediaSource.isTypeSupported(d) || Ad(c, b.type);
	    }q = $d.prototype;
	    q.destroy = function () {
	      var b = this;this.v = !0;var c = [],
	          d;for (d in this.c) {
	        var e = this.c[d],
	            f = e[0];this.c[d] = e.slice(0, 1);f && c.push(f.p["catch"](sd.kc));for (f = 1; f < e.length; ++f) e[f].p.reject();
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
	                var h = pc(b.mimeType, b.codecs);f == g.qa ? ce(d, h) : (!c && MediaSource.isTypeSupported(h) || !Ad(h, f) || (d.l[f] = new zd(), h = Bd(f, h)), h = d.h.addSourceBuffer(h), d.i.w(h, "error", d.Yf.bind(d, f)), d.i.w(h, "updateend", d.wb.bind(d, f)), d.b[f] = h, d.c[f] = []);
	              }), w(f);}
	        });
	      });
	    };function ce(b, c) {
	      b.a || (b.a = new Ud(b.g));Xd(b.a, c);
	    }
	    function de(b) {
	      return b.h ? "ended" == b.h.readyState : !0;
	    }function ee(b, c) {
	      if ("text" == c) var d = b.a.a;else d = fe(b, c), d = !d || 1 == d.length && 1E-6 > d.end(0) - d.start(0) ? null : 1 == d.length && 0 > d.start(0) ? 0 : d.length ? d.start(0) : null;return d;
	    }function ge(b, c) {
	      return "text" == c ? b.a.b : od(fe(b, c));
	    }function he(b, c, d) {
	      if ("text" == c) return b = b.a, null == b.b || b.b < d ? 0 : b.b - Math.max(d, b.a);b = fe(b, c);return qd(b, d);
	    }
	    q.Oc = function (b) {
	      b.total = rd(this.f.buffered);b.audio = rd(fe(this, "audio"));b.video = rd(fe(this, "video"));b.text = [];if (this.a) {
	        var c = this.a.a,
	            d = this.a.b;null != c && null != d && b.text.push({ start: c, end: d });
	      }
	    };function fe(b, c) {
	      try {
	        return b.b[c].buffered;
	      } catch (d) {
	        return null;
	      }
	    }
	    function ie(b, c, d, e, f, g) {
	      if ("text" == c) return Yd(b.a, d, e, f);if (b.l[c]) return Cd(b.l[c], d).then(function (b) {
	        this.a || ce(this, "text/vtt");b.captions && b.captions.length && Zd(this.a, b.captions, e, f, this.b.video.timestampOffset);return je(this, c, this.ge.bind(this, c, b.data.buffer));
	      }.bind(b));g && window.muxjs && (b.a || ce(b, "text/vtt"), null == e && null == f ? b.m.init(d) : b.m.b(d, function (c) {
	        c.length && Zd(b.a, c, e, f, b.b.video.timestampOffset);
	      }));return je(b, c, b.ge.bind(b, c, d));
	    }
	    q.tc = function (b) {
	      var c = ge(this, "video") || 0;this.a.tc(b, c);
	    };q.remove = function (b, c, d) {
	      return "text" == b ? this.a.remove(c, d) : je(this, b, this.he.bind(this, b, c, d));
	    };function ke(b, c) {
	      if ("text" == c) {
	        if (!b.a) return Promise.resolve();b.m.c();return b.a.remove(0, Infinity);
	      }return je(b, c, b.he.bind(b, c, 0, b.h.duration));
	    }q.flush = function (b) {
	      return "text" == b ? Promise.resolve() : je(this, b, this.Fe.bind(this, b));
	    };
	    function le(b, c, d, e, f) {
	      return "text" == c ? (b.a.m = d, b = b.a, b.f = e, b.h = f, Promise.resolve()) : Promise.all([je(b, c, b.qe.bind(b, c)), je(b, c, b.Xf.bind(b, c, d)), je(b, c, b.Uf.bind(b, c, e, f))]);
	    }q.endOfStream = function (b) {
	      return me(this, function () {
	        de(this) || (b ? this.h.endOfStream(b) : this.h.endOfStream());
	      }.bind(this));
	    };q.wa = function (b) {
	      return me(this, function () {
	        this.h.duration = b;
	      }.bind(this));
	    };q.Y = function () {
	      return this.h.duration;
	    };q.ge = function (b, c) {
	      this.b[b].appendBuffer(c);
	    };
	    q.he = function (b, c, d) {
	      d <= c ? this.wb(b) : this.b[b].remove(c, d);
	    };q.qe = function (b) {
	      var c = this.b[b].appendWindowStart,
	          d = this.b[b].appendWindowEnd;this.b[b].abort();this.b[b].appendWindowStart = c;this.b[b].appendWindowEnd = d;this.wb(b);
	    };q.Fe = function (b) {
	      this.f.currentTime -= .001;this.wb(b);
	    };q.Xf = function (b, c) {
	      0 > c && (c += .001);this.b[b].timestampOffset = c;this.wb(b);
	    };q.Uf = function (b, c, d) {
	      this.b[b].appendWindowStart = 0;this.b[b].appendWindowEnd = d;this.b[b].appendWindowStart = c;this.wb(b);
	    };
	    q.Yf = function (b) {
	      this.c[b][0].p.reject(new D(2, 3, 3014, this.f.error ? this.f.error.code : 0));
	    };q.wb = function (b) {
	      var c = this.c[b][0];c && (c.p.resolve(), ne(this, b));
	    };function je(b, c, d) {
	      if (b.v) return Promise.reject();d = { start: d, p: new F() };b.c[c].push(d);if (1 == b.c[c].length) try {
	        d.start();
	      } catch (e) {
	        "QuotaExceededError" == e.name ? d.p.reject(new D(2, 3, 3017, c)) : d.p.reject(new D(2, 3, 3015, e)), ne(b, c);
	      }return d.p;
	    }
	    function me(b, c) {
	      if (b.v) return Promise.reject();var d = [],
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
	        }for (var d in this.b) ne(this, d);return b;
	      }.bind(b), function (b) {
	        throw b;
	      }.bind(b));
	    }function ne(b, c) {
	      b.c[c].shift();var d = b.c[c][0];if (d) try {
	        d.start();
	      } catch (e) {
	        d.p.reject(new D(2, 3, 3015, e)), ne(b, c);
	      }
	    }function oe(b, c) {
	      b = M(b);c = M(c);return b.split("-")[0] == c.split("-")[0];
	    }function pe(b, c) {
	      b = M(b);c = M(c);var d = b.split("-"),
	          e = c.split("-");return d[0] == e[0] && 1 == d.length && 2 == e.length;
	    }function M(b) {
	      var c = b.split("-");b = c[0] || "";c = c[1] || "";b = b.toLowerCase();b = qe.get(b) || b;return (c = c.toUpperCase()) ? b + "-" + c : b;
	    }function re(b) {
	      return b.language ? M(b.language) : b.audio && b.audio.language ? M(b.audio.language) : b.video && b.video.language ? M(b.video.language) : "und";
	    }
	    function se(b, c) {
	      for (var d = M(b), e = new Set(), f = r(c), g = f.next(); !g.done; g = f.next()) e.add(M(g.value));f = r(e);for (g = f.next(); !g.done; g = f.next()) if (g = g.value, g == d) return g;f = r(e);for (g = f.next(); !g.done; g = f.next()) if (g = g.value, pe(g, d)) return g;f = r(e);for (g = f.next(); !g.done; g = f.next()) {
	        var h = g = g.value,
	            k = d;h = M(h);k = M(k);h = h.split("-");k = k.split("-");if (2 == h.length && 2 == k.length && h[0] == k[0]) return g;
	      }e = r(e);for (g = e.next(); !g.done; g = e.next()) if (f = g.value, pe(d, f)) return f;return null;
	    }
	    var qe = new Map([["aar", "aa"], ["abk", "ab"], ["afr", "af"], ["aka", "ak"], ["alb", "sq"], ["amh", "am"], ["ara", "ar"], ["arg", "an"], ["arm", "hy"], ["asm", "as"], ["ava", "av"], ["ave", "ae"], ["aym", "ay"], ["aze", "az"], ["bak", "ba"], ["bam", "bm"], ["baq", "eu"], ["bel", "be"], ["ben", "bn"], ["bih", "bh"], ["bis", "bi"], ["bod", "bo"], ["bos", "bs"], ["bre", "br"], ["bul", "bg"], ["bur", "my"], ["cat", "ca"], ["ces", "cs"], ["cha", "ch"], ["che", "ce"], ["chi", "zh"], ["chu", "cu"], ["chv", "cv"], ["cor", "kw"], ["cos", "co"], ["cre", "cr"], ["cym", "cy"], ["cze", "cs"], ["dan", "da"], ["deu", "de"], ["div", "dv"], ["dut", "nl"], ["dzo", "dz"], ["ell", "el"], ["eng", "en"], ["epo", "eo"], ["est", "et"], ["eus", "eu"], ["ewe", "ee"], ["fao", "fo"], ["fas", "fa"], ["fij", "fj"], ["fin", "fi"], ["fra", "fr"], ["fre", "fr"], ["fry", "fy"], ["ful", "ff"], ["geo", "ka"], ["ger", "de"], ["gla", "gd"], ["gle", "ga"], ["glg", "gl"], ["glv", "gv"], ["gre", "el"], ["grn", "gn"], ["guj", "gu"], ["hat", "ht"], ["hau", "ha"], ["heb", "he"], ["her", "hz"], ["hin", "hi"], ["hmo", "ho"], ["hrv", "hr"], ["hun", "hu"], ["hye", "hy"], ["ibo", "ig"], ["ice", "is"], ["ido", "io"], ["iii", "ii"], ["iku", "iu"], ["ile", "ie"], ["ina", "ia"], ["ind", "id"], ["ipk", "ik"], ["isl", "is"], ["ita", "it"], ["jav", "jv"], ["jpn", "ja"], ["kal", "kl"], ["kan", "kn"], ["kas", "ks"], ["kat", "ka"], ["kau", "kr"], ["kaz", "kk"], ["khm", "km"], ["kik", "ki"], ["kin", "rw"], ["kir", "ky"], ["kom", "kv"], ["kon", "kg"], ["kor", "ko"], ["kua", "kj"], ["kur", "ku"], ["lao", "lo"], ["lat", "la"], ["lav", "lv"], ["lim", "li"], ["lin", "ln"], ["lit", "lt"], ["ltz", "lb"], ["lub", "lu"], ["lug", "lg"], ["mac", "mk"], ["mah", "mh"], ["mal", "ml"], ["mao", "mi"], ["mar", "mr"], ["may", "ms"], ["mkd", "mk"], ["mlg", "mg"], ["mlt", "mt"], ["mon", "mn"], ["mri", "mi"], ["msa", "ms"], ["mya", "my"], ["nau", "na"], ["nav", "nv"], ["nbl", "nr"], ["nde", "nd"], ["ndo", "ng"], ["nep", "ne"], ["nld", "nl"], ["nno", "nn"], ["nob", "nb"], ["nor", "no"], ["nya", "ny"], ["oci", "oc"], ["oji", "oj"], ["ori", "or"], ["orm", "om"], ["oss", "os"], ["pan", "pa"], ["per", "fa"], ["pli", "pi"], ["pol", "pl"], ["por", "pt"], ["pus", "ps"], ["que", "qu"], ["roh", "rm"], ["ron", "ro"], ["rum", "ro"], ["run", "rn"], ["rus", "ru"], ["sag", "sg"], ["san", "sa"], ["sin", "si"], ["slk", "sk"], ["slo", "sk"], ["slv", "sl"], ["sme", "se"], ["smo", "sm"], ["sna", "sn"], ["snd", "sd"], ["som", "so"], ["sot", "st"], ["spa", "es"], ["sqi", "sq"], ["srd", "sc"], ["srp", "sr"], ["ssw", "ss"], ["sun", "su"], ["swa", "sw"], ["swe", "sv"], ["tah", "ty"], ["tam", "ta"], ["tat", "tt"], ["tel", "te"], ["tgk", "tg"], ["tgl", "tl"], ["tha", "th"], ["tib", "bo"], ["tir", "ti"], ["ton", "to"], ["tsn", "tn"], ["tso", "ts"], ["tuk", "tk"], ["tur", "tr"], ["twi", "tw"], ["uig", "ug"], ["ukr", "uk"], ["urd", "ur"], ["uzb", "uz"], ["ven", "ve"], ["vie", "vi"], ["vol", "vo"], ["wel", "cy"], ["wln", "wa"], ["wol", "wo"], ["xho", "xh"], ["yid", "yi"], ["yor", "yo"], ["zha", "za"], ["zho", "zh"], ["zul", "zu"]]);function te(b, c, d) {
	      function e(b, c, d) {
	        return b >= c && b <= d;
	      }var f = b.video;return f && f.width && f.height && !(e(f.width, c.minWidth, Math.min(c.maxWidth, d.width)) && e(f.height, c.minHeight, Math.min(c.maxHeight, d.height)) && e(f.width * f.height, c.minPixels, c.maxPixels)) || !e(b.bandwidth, c.minBandwidth, c.maxBandwidth) ? !1 : !0;
	    }function ue(b, c, d) {
	      var e = !1;b.forEach(function (b) {
	        var f = b.allowedByApplication;b.allowedByApplication = te(b, c, d);f != b.allowedByApplication && (e = !0);
	      });return e;
	    }
	    function ve(b, c, d, e) {
	      e.variants = e.variants.filter(function (e) {
	        if (b && b.R && !kd(b, e)) return !1;var f = e.audio;e = e.video;return f && !be(f) || e && !be(e) || f && c && !we(f, c) || e && d && !we(e, d) ? !1 : !0;
	      });e.textStreams = e.textStreams.filter(function (b) {
	        return Wd(pc(b.mimeType, b.codecs));
	      });
	    }function we(b, c) {
	      return b.mimeType != c.mimeType || b.codecs.split(".")[0] != c.codecs.split(".")[0] ? !1 : !0;
	    }
	    function xe(b) {
	      var c = b.audio,
	          d = b.video,
	          e = c ? c.codecs : null,
	          f = d ? d.codecs : null,
	          g = [];f && g.push(f);e && g.push(e);var h = [];d && h.push(d.mimeType);c && h.push(c.mimeType);h = h[0] || null;var k = [];c && k.push(c.kind);d && k.push(d.kind);k = k[0] || null;var l = new Set();c && c.roles.forEach(function (b) {
	        return l.add(b);
	      });d && d.roles.forEach(function (b) {
	        return l.add(b);
	      });b = { id: b.id, active: !1, type: "variant", bandwidth: b.bandwidth, language: b.language, label: null, kind: k, width: null, height: null, frameRate: null, mimeType: h, codecs: g.join(", "),
	        audioCodec: e, videoCodec: f, primary: b.primary, roles: Array.from(l), audioRoles: null, videoId: null, audioId: null, channelsCount: null, audioSamplingRate: null, audioBandwidth: null, videoBandwidth: null, originalVideoId: null, originalAudioId: null, originalTextId: null };d && (b.videoId = d.id, b.originalVideoId = d.originalId, b.width = d.width || null, b.height = d.height || null, b.frameRate = d.frameRate || null, b.videoBandwidth = d.bandwidth || null);c && (b.audioId = c.id, b.originalAudioId = c.originalId, b.channelsCount = c.channelsCount, b.audioSamplingRate = c.audioSamplingRate, b.audioBandwidth = c.bandwidth || null, b.label = c.label, b.audioRoles = c.roles);return b;
	    }
	    function ye(b) {
	      return { id: b.id, active: !1, type: "text", bandwidth: 0, language: b.language, label: b.label, kind: b.kind || null, width: null, height: null, frameRate: null, mimeType: b.mimeType, codecs: b.codecs || null, audioCodec: null, videoCodec: null, primary: b.primary, roles: b.roles, audioRoles: null, videoId: null, audioId: null, channelsCount: null, audioSamplingRate: null, audioBandwidth: null, videoBandwidth: null, originalVideoId: null, originalAudioId: null, originalTextId: b.originalId };
	    }
	    function ze(b) {
	      b.__shaka_id || (b.__shaka_id = Ae++);return b.__shaka_id;
	    }var Ae = 0;function Be(b) {
	      return { id: ze(b), active: !1, type: "", bandwidth: 0, language: M(b.language), label: b.label, kind: b.kind, width: null, height: null, frameRate: null, mimeType: null, codecs: null, audioCodec: null, videoCodec: null, primary: !1, roles: [], audioRoles: null, videoId: null, audioId: null, channelsCount: null, audioSamplingRate: null, audioBandwidth: null, videoBandwidth: null, originalVideoId: null, originalAudioId: null, originalTextId: null };
	    }
	    function Ce(b) {
	      return b.allowedByApplication && b.allowedByKeySystem;
	    }function De(b) {
	      return b.filter(function (b) {
	        return Ce(b);
	      });
	    }
	    function Ee(b, c) {
	      var d = b.filter(function (b) {
	        return b.audio && b.audio.channelsCount;
	      }),
	          e = new Map();d = r(d);for (var f = d.next(); !f.done; f = d.next()) {
	        f = f.value;var g = f.audio.channelsCount;e.has(g) || e.set(g, []);e.get(g).push(f);
	      }d = Array.from(e.keys());if (0 == d.length) return b;f = d.filter(function (b) {
	        return b <= c;
	      });return f.length ? e.get(Math.max.apply(null, f)) : e.get(Math.min.apply(null, d));
	    }
	    function Fe(b, c, d) {
	      var e = b,
	          f = b.filter(function (b) {
	        return b.primary;
	      });f.length && (e = f);var g = e.length ? e[0].language : "";e = e.filter(function (b) {
	        return b.language == g;
	      });if (c) {
	        var h = se(M(c), b.map(function (b) {
	          return b.language;
	        }));h && (e = b.filter(function (b) {
	          return M(b.language) == h;
	        }));
	      }if (d) {
	        if (b = Ge(e, d), b.length) return b;
	      } else if (b = e.filter(function (b) {
	        return 0 == b.roles.length;
	      }), b.length) return b;b = e.map(function (b) {
	        return b.roles;
	      }).reduce(sd.Cc, []);return b.length ? Ge(e, b[0]) : e;
	    }
	    function Ge(b, c) {
	      return b.filter(function (b) {
	        return b.roles.includes(c);
	      });
	    }function He(b, c, d) {
	      for (var e = 0; e < d.length; e++) if (d[e].audio == b && d[e].video == c) return d[e];return null;
	    }function Ie(b) {
	      var c = [];b.audio && c.push(b.audio);b.video && c.push(b.video);return c;
	    }function N() {
	      this.h = null;this.f = !1;this.b = new $a();this.c = [];this.i = !1;this.a = this.g = null;
	    }A("shaka.abr.SimpleAbrManager", N);N.prototype.stop = function () {
	      this.h = null;this.f = !1;this.c = [];this.g = null;
	    };N.prototype.stop = N.prototype.stop;N.prototype.init = function (b) {
	      this.h = b;
	    };N.prototype.init = N.prototype.init;
	    N.prototype.chooseVariant = function () {
	      var b = Je(this.a.restrictions, this.c),
	          c = this.b.getBandwidthEstimate(this.a.defaultBandwidthEstimate);this.c.length && !b.length && (b = Je(null, this.c), b = [b[0]]);for (var d = b[0] || null, e = 0; e < b.length; ++e) {
	        var f = b[e],
	            g = (b[e + 1] || { bandwidth: Infinity }).bandwidth / this.a.bandwidthUpgradeTarget;c >= f.bandwidth / this.a.bandwidthDowngradeTarget && c <= g && (d = f);
	      }this.g = Date.now();return d;
	    };N.prototype.chooseVariant = N.prototype.chooseVariant;N.prototype.enable = function () {
	      this.f = !0;
	    };
	    N.prototype.enable = N.prototype.enable;N.prototype.disable = function () {
	      this.f = !1;
	    };N.prototype.disable = N.prototype.disable;N.prototype.segmentDownloaded = function (b, c) {
	      var d = this.b;if (!(16E3 > c)) {
	        var e = 8E3 * c / b,
	            f = b / 1E3;d.a += c;Ya(d.b, f, e);Ya(d.c, f, e);
	      }if (null != this.g && this.f) a: {
	        if (!this.i) {
	          if (!(128E3 <= this.b.a)) break a;this.i = !0;
	        } else if (Date.now() - this.g < 1E3 * this.a.switchInterval) break a;d = this.chooseVariant();this.b.getBandwidthEstimate(this.a.defaultBandwidthEstimate);this.h(d);
	      }
	    };
	    N.prototype.segmentDownloaded = N.prototype.segmentDownloaded;N.prototype.getBandwidthEstimate = function () {
	      return this.b.getBandwidthEstimate(this.a.defaultBandwidthEstimate);
	    };N.prototype.getBandwidthEstimate = N.prototype.getBandwidthEstimate;N.prototype.setVariants = function (b) {
	      this.c = b;
	    };N.prototype.setVariants = N.prototype.setVariants;N.prototype.configure = function (b) {
	      this.a = b;
	    };N.prototype.configure = N.prototype.configure;
	    function Je(b, c) {
	      b && (c = c.filter(function (c) {
	        return te(c, b, { width: Infinity, height: Infinity });
	      }));return c.sort(function (b, c) {
	        return b.bandwidth - c.bandwidth;
	      });
	    }function Ke(b, c) {
	      this.a = b;this.b = c;
	    }Ke.prototype.toString = function () {
	      return "v" + this.a + "." + this.b;
	    };function Le(b, c) {
	      var d = new Ke(2, 6),
	          e = Me,
	          f = e.a,
	          g = d.b - f.b;(0 < (d.a - f.a || g) ? e.c : e.b)(e.a, d, b, c);
	    }function Ne(b, c, d, e) {
	      bb([d, "has been deprecated and will be removed in", c, ". We are currently at version", b, ". Additional information:", e].join(" "));
	    }function Oe(b, c, d, e) {
	      ab([d, "has been deprecated and has been removed in", c, ". We are now at version", b, ". Additional information:", e].join(""));
	    }var Me = null;var Pe = "ended play playing pause pausing ratechange seeked seeking timeupdate volumechange".split(" "),
	        Qe = "buffered currentTime duration ended loop muted paused playbackRate seeking videoHeight videoWidth volume".split(" "),
	        Re = ["loop", "playbackRate"],
	        Se = ["pause", "play"],
	        Te = "abrstatuschanged adaptation buffering emsg error loading streaming texttrackvisibility timelineregionadded timelineregionenter timelineregionexit trackschanged unloading variantchanged textchanged".split(" "),
	        Ue = { getAssetUri: 2,
	      getAudioLanguages: 2, getAudioLanguagesAndRoles: 2, getBufferedInfo: 2, getConfiguration: 2, getExpiration: 2, getPlaybackRate: 2, getTextLanguages: 2, getTextLanguagesAndRoles: 2, getTextTracks: 2, getStats: 5, getVariantTracks: 2, isAudioOnly: 10, isBuffering: 1, isInProgress: 1, isLive: 10, isTextTrackVisible: 1, keySystem: 10, seekRange: 1, usingEmbeddedTextTrack: 2, getLoadMode: 10 },
	        Ve = { getPlayheadTimeAsDate: 1, getPresentationStartTimeAsDate: 20 },
	        We = [["getConfiguration", "configure"]],
	        Xe = [["isTextTrackVisible", "setTextTrackVisibility"]],
	        Ye = "addTextTrack cancelTrickPlay configure resetConfiguration retryStreaming selectAudioLanguage selectEmbeddedTextTrack selectTextLanguage selectTextTrack selectVariantTrack selectVariantsByLabel setTextTrackVisibility trickPlay".split(" "),
	        Ze = ["attach", "detach", "load", "unload"];
	    function $e(b) {
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
	    }function af(b) {
	      return JSON.parse(b, function (b, d) {
	        return "NaN" == d ? NaN : "-Infinity" == d ? -Infinity : "Infinity" == d ? Infinity : d && "object" == typeof d && "TimeRanges" == d.__type__ ? bf(d) : d && "object" == typeof d && "Uint8Array" == d.__type__ ? new Uint8Array(d.entries) : d;
	      });
	    }function bf(b) {
	      return { length: b.length, start: function (c) {
	          return b.start[c];
	        }, end: function (c) {
	          return b.end[c];
	        } };
	    }function cf(b, c, d, e, f, g) {
	      this.T = b;this.f = new C(c);this.R = d;this.l = !1;this.F = e;this.L = f;this.C = g;this.b = this.h = !1;this.D = "";this.i = null;this.m = this.Qd.bind(this);this.s = this.pf.bind(this);this.a = { video: {}, player: {} };this.v = 0;this.c = {};this.g = null;
	    }var df = !1,
	        ef = null;q = cf.prototype;q.destroy = function () {
	      ff(this);ef && gf(this);this.f && (this.f.stop(), this.f = null);this.L = this.F = null;this.b = this.h = !1;this.s = this.m = this.g = this.c = this.a = this.i = null;return Promise.resolve();
	    };q.ga = function () {
	      return this.b;
	    };
	    q.hd = function () {
	      return this.D;
	    };q.init = function () {
	      if (window.chrome && chrome.cast && chrome.cast.isAvailable) {
	        delete window.__onGCastApiAvailable;this.h = !0;this.f.uc();var b = new chrome.cast.SessionRequest(this.T);b = new chrome.cast.ApiConfig(b, this.Rd.bind(this), this.tf.bind(this), "origin_scoped");chrome.cast.initialize(b, function () {}, function () {});df && this.f.P(.02);(b = ef) && b.status != chrome.cast.SessionStatus.STOPPED ? this.Rd(b) : ef = null;
	      } else window.__onGCastApiAvailable = function (b) {
	        b && this.init();
	      }.bind(this);
	    };
	    q.pd = function (b) {
	      this.i = b;this.b && hf({ type: "appData", appData: this.i });
	    };q.cast = function (b) {
	      if (!this.h) return Promise.reject(new D(1, 8, 8E3));if (!df) return Promise.reject(new D(1, 8, 8001));if (this.b) return Promise.reject(new D(1, 8, 8002));this.g = new F();chrome.cast.requestSession(this.ed.bind(this, b), this.Pd.bind(this));return this.g;
	    };q.Ib = function () {
	      this.b && (ff(this), ef && (gf(this), ef.stop(function () {}, function () {}), ef = null));
	    };
	    q.get = function (b, c) {
	      if ("video" == b) {
	        if (Se.includes(c)) return this.ae.bind(this, b, c);
	      } else if ("player" == b) {
	        if (Ve[c] && !this.get("player", "isLive")()) return function () {};if (Ye.includes(c)) return this.ae.bind(this, b, c);if (Ze.includes(c)) return this.If.bind(this, b, c);if (Ue[c]) return this.Yd.bind(this, b, c);
	      }return this.Yd(b, c);
	    };q.set = function (b, c, d) {
	      this.a[b][c] = d;hf({ type: "set", targetName: b, property: c, value: d });
	    };
	    q.ed = function (b, c) {
	      ef = c;c.addUpdateListener(this.m);c.addMessageListener("urn:x-cast:com.google.shaka.v2", this.s);this.Qd();hf({ type: "init", initState: b, appData: this.i });this.g.resolve();
	    };q.Pd = function (b) {
	      var c = 8003;switch (b.code) {case "cancel":
	          c = 8004;break;case "timeout":
	          c = 8005;break;case "receiver_unavailable":
	          c = 8006;}this.g.reject(new D(2, 8, c, b));
	    };q.Yd = function (b, c) {
	      return this.a[b][c];
	    };
	    q.ae = function (b, c, d) {
	      for (var e = [], f = 2; f < arguments.length; ++f) e[f - 2] = arguments[f];hf({ type: "call", targetName: b, methodName: c, args: e });
	    };q.If = function (b, c, d) {
	      for (var e = [], f = 2; f < arguments.length; ++f) e[f - 2] = arguments[f];f = new F();var g = this.v.toString();this.v++;this.c[g] = f;hf({ type: "asyncCall", targetName: b, methodName: c, args: e, id: g });return f;
	    };q.Rd = function (b) {
	      var c = this.C();this.g = new F();this.l = !0;this.ed(c, b);
	    };q.tf = function (b) {
	      df = "available" == b;this.f.uc();
	    };
	    function gf(b) {
	      var c = ef;c.removeUpdateListener(b.m);c.removeMessageListener("urn:x-cast:com.google.shaka.v2", b.s);
	    }q.Qd = function () {
	      var b = ef ? "connected" == ef.status : !1;if (this.b && !b) {
	        this.L();for (var c in this.a) this.a[c] = {};ff(this);
	      }this.D = (this.b = b) ? ef.receiver.friendlyName : "";this.f.uc();
	    };function ff(b) {
	      for (var c in b.c) {
	        var d = b.c[c];delete b.c[c];d.reject(new D(1, 7, 7E3));
	      }
	    }
	    q.pf = function (b, c) {
	      var d = af(c);switch (d.type) {case "event":
	          var e = d.event;this.F(d.targetName, new I(e.type, e));break;case "update":
	          e = d.update;for (var f in e) {
	            d = this.a[f] || {};for (var g in e[f]) d[g] = e[f][g];
	          }this.l && (this.R(), this.l = !1);break;case "asyncComplete":
	          if (f = d.id, d = d.error, g = this.c[f], delete this.c[f], g) if (d) {
	            f = new D(d.severity, d.category, d.code);for (e in d) f[e] = d[e];g.reject(f);
	          } else g.resolve();}
	    };function hf(b) {
	      b = $e(b);ef.sendMessage("urn:x-cast:com.google.shaka.v2", b, function () {}, cb);
	    }function O(b, c, d) {
	      var e = this;Kb.call(this);this.c = b;this.b = c;this.i = this.g = this.f = this.l = this.h = null;if (this.m = d) this.a = new cf(d, function () {
	        return jf(e);
	      }, function () {
	        return kf(e);
	      }, function (b, c) {
	        return lf(e, b, c);
	      }, function () {
	        return mf(e);
	      }, function () {
	        return nf(e);
	      });of(this);
	    }Sa(O, Kb);A("shaka.cast.CastProxy", O);
	    O.prototype.destroy = function (b) {
	      b && this.a && this.a.Ib();this.i && (this.i.release(), this.i = null);b = [];this.b && (b.push(this.b.destroy()), this.b = null);this.a && (b.push(this.a.destroy()), this.a = null);this.l = this.h = this.c = null;return Promise.all(b);
	    };O.prototype.destroy = O.prototype.destroy;O.prototype.bf = function () {
	      return this.h;
	    };O.prototype.getVideo = O.prototype.bf;O.prototype.Ve = function () {
	      return this.l;
	    };O.prototype.getPlayer = O.prototype.Ve;O.prototype.ue = function () {
	      return this.a ? this.a.h && df : !1;
	    };
	    O.prototype.canCast = O.prototype.ue;O.prototype.ga = function () {
	      return this.a ? this.a.ga() : !1;
	    };O.prototype.isCasting = O.prototype.ga;O.prototype.hd = function () {
	      return this.a ? this.a.hd() : "";
	    };O.prototype.receiverName = O.prototype.hd;O.prototype.cast = function () {
	      if (!this.a) throw new D(1, 8, 8007);var b = nf(this);return this.a.cast(b).then(function () {
	        if (this.b) return this.b.xd();
	      }.bind(this));
	    };O.prototype.cast = O.prototype.cast;O.prototype.pd = function (b) {
	      this.a && this.a.pd(b);
	    };O.prototype.setAppData = O.prototype.pd;
	    O.prototype.eg = function () {
	      if (this.a) {
	        var b = this.a;if (b.b) {
	          var c = b.C();chrome.cast.requestSession(b.ed.bind(b, c), b.Pd.bind(b));
	        }
	      }
	    };O.prototype.suggestDisconnect = O.prototype.eg;
	    O.prototype.xe = function (b) {
	      var c = this;return t(function e() {
	        return z(e, function (e) {
	          switch (e.j) {case 1:
	              if (b == c.m) return e["return"]();c.m = b;if (!c.a) {
	                e.A(2);break;
	              }c.a.Ib();return u(e, c.a.destroy(), 3);case 3:
	              c.a = null;case 2:
	              c.a = new cf(b, function () {
	                return jf(c);
	              }, function () {
	                return kf(c);
	              }, function (b, e) {
	                return lf(c, b, e);
	              }, function () {
	                return mf(c);
	              }, function () {
	                return nf(c);
	              }), c.a.init(), w(e);}
	        });
	      });
	    };O.prototype.changeReceiverId = O.prototype.xe;O.prototype.Ib = function () {
	      this.a && this.a.Ib();
	    };
	    O.prototype.forceDisconnect = O.prototype.Ib;function of(b) {
	      b.a && b.a.init();b.i = new K();Pe.forEach(function (b) {
	        this.i.w(this.c, b, this.ng.bind(this));
	      }.bind(b));Te.forEach(function (b) {
	        this.i.w(this.b, b, this.Cf.bind(this));
	      }.bind(b));b.h = {};for (var c in b.c) Object.defineProperty(b.h, c, { configurable: !1, enumerable: !0, get: b.mg.bind(b, c), set: b.og.bind(b, c) });b.l = {};for (var d in b.b) Object.defineProperty(b.l, d, { configurable: !1, enumerable: !0, get: b.Xd.bind(b, d) });b.f = new Kb();b.f.Yb = b.h;b.g = new Kb();b.g.Yb = b.l;
	    }
	    function nf(b) {
	      var c = { video: {}, player: {}, playerAfterLoad: {}, manifest: b.b.ec(), startTime: null };b.c.pause();Re.forEach(function (b) {
	        c.video[b] = this.c[b];
	      }.bind(b));b.c.ended || (c.startTime = b.c.currentTime);We.forEach(function (b) {
	        var d = b[1];b = this.b[b[0]]();c.player[d] = b;
	      }.bind(b));Xe.forEach(function (b) {
	        var d = b[1];b = this.b[b[0]]();c.playerAfterLoad[d] = b;
	      }.bind(b));return c;
	    }function jf(b) {
	      b.dispatchEvent(new I("caststatuschanged"));
	    }function kf(b) {
	      b.f.dispatchEvent(new I(b.h.paused ? "pause" : "play"));
	    }
	    function mf(b) {
	      We.forEach(function (b) {
	        var c = b[1];b = this.a.get("player", b[0])();this.b[c](b);
	      }.bind(b));var c = b.a.get("player", "getAssetUri")(),
	          d = b.a.get("video", "ended"),
	          e = Promise.resolve(),
	          f = b.c.autoplay,
	          g = null;d || (g = b.a.get("video", "currentTime"));c && (b.c.autoplay = !1, e = b.b.load(c, g));var h = {};Re.forEach(function (b) {
	        h[b] = this.a.get("video", b);
	      }.bind(b));e.then(function () {
	        b.c && (Re.forEach(function (b) {
	          this.c[b] = h[b];
	        }.bind(b)), Xe.forEach(function (b) {
	          var c = b[1];b = this.a.get("player", b[0])();this.b[c](b);
	        }.bind(b)), b.c.autoplay = f, c && b.c.play());
	      }, function (c) {
	        b.b.dispatchEvent(new I("error", { detail: c }));
	      });
	    }q = O.prototype;q.mg = function (b) {
	      if ("addEventListener" == b) return this.f.addEventListener.bind(this.f);if ("removeEventListener" == b) return this.f.removeEventListener.bind(this.f);if (this.a && this.a.ga() && 0 == Object.keys(this.a.a.video).length) {
	        var c = this.c[b];if ("function" != typeof c) return c;
	      }return this.a && this.a.ga() ? this.a.get("video", b) : (b = this.c[b], "function" == typeof b && (b = b.bind(this.c)), b);
	    };
	    q.og = function (b, c) {
	      this.a && this.a.ga() ? this.a.set("video", b, c) : this.c[b] = c;
	    };q.ng = function (b) {
	      this.a && this.a.ga() || this.f.dispatchEvent(new I(b.type, b));
	    };
	    q.Xd = function (b) {
	      if ("addEventListener" == b) return this.g.addEventListener.bind(this.g);if ("removeEventListener" == b) return this.g.removeEventListener.bind(this.g);if ("getMediaElement" == b) return function () {
	        return this.h;
	      }.bind(this);if ("getSharedConfiguration" == b) return this.a ? this.a.get("player", "getConfiguration") : this.b.getConfiguration();if ("getNetworkingEngine" == b) return this.b.Kb.bind(this.b);if (this.a && this.a.ga()) {
	        if ("getManifest" == b || "drmInfo" == b) return function () {
	          bb(b + "() does not work while casting!");
	          return null;
	        };if ("getManifestUri" == b) return Le("getManifestUri", 'Please use "getAssetUri" instead.'), this.Xd("getAssetUri");if ("attach" == b || "detach" == b) return function () {
	          bb(b + "() does not work while casting!");return Promise.resolve();
	        };
	      }return this.a && this.a.ga() && 0 == Object.keys(this.a.a.video).length && Ue[b] || !this.a || !this.a.ga() ? this.b[b].bind(this.b) : this.a.get("player", b);
	    };q.Cf = function (b) {
	      this.a && this.a.ga() || this.g.dispatchEvent(b);
	    };
	    function lf(b, c, d) {
	      b.a.ga() && ("video" == c ? b.f.dispatchEvent(d) : "player" == c && b.g.dispatchEvent(d));
	    }function pf(b, c, d, e) {
	      var f = this;Kb.call(this);this.a = b;this.b = c;this.c = new K();this.D = { video: b, player: c };this.s = d || function () {};this.F = e || function (b) {
	        return b;
	      };this.v = !1;this.h = !0;this.g = 0;this.m = !1;this.l = !0;this.i = this.f = null;this.C = new C(function () {
	        qf(f);
	      });rf(this);
	    }Sa(pf, Kb);A("shaka.cast.CastReceiver", pf);pf.prototype.isConnected = function () {
	      return this.v;
	    };pf.prototype.isConnected = pf.prototype.isConnected;pf.prototype.ff = function () {
	      return this.h;
	    };pf.prototype.isIdle = pf.prototype.ff;
	    pf.prototype.destroy = function () {
	      var b = this;return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.c && (b.c.release(), b.c = null), e = [], b.b && (e.push(b.b.destroy()), b.b = null), b.C && (b.C.stop(), b.C = null), b.a = null, b.D = null, b.s = null, b.v = !1, b.h = !0, b.f = null, b.i = null, u(d, Promise.all(e), 2);case 2:
	              f = cast.receiver.CastReceiverManager.getInstance(), f.stop(), w(d);}
	        });
	      });
	    };pf.prototype.destroy = pf.prototype.destroy;
	    function rf(b) {
	      var c = cast.receiver.CastReceiverManager.getInstance();c.onSenderConnected = b.Td.bind(b);c.onSenderDisconnected = b.Td.bind(b);c.onSystemVolumeChanged = b.Ee.bind(b);b.i = c.getCastMessageBus("urn:x-cast:com.google.cast.media");b.i.onMessage = b.jf.bind(b);b.f = c.getCastMessageBus("urn:x-cast:com.google.shaka.v2");b.f.onMessage = b.vf.bind(b);c.start();Pe.forEach(function (b) {
	        this.c.w(this.a, b, this.Zd.bind(this, "video"));
	      }.bind(b));Te.forEach(function (b) {
	        this.c.w(this.b, b, this.Zd.bind(this, "player"));
	      }.bind(b));
	      cast.__platform__ && cast.__platform__.canDisplayType('video/mp4; codecs="avc1.640028"; width=3840; height=2160') ? b.b.qd(3840, 2160) : b.b.qd(1920, 1080);b.c.w(b.a, "loadeddata", function () {
	        this.m = !0;
	      }.bind(b));b.c.w(b.b, "loading", function () {
	        this.h = !1;sf(this);
	      }.bind(b));b.c.w(b.a, "playing", function () {
	        this.h = !1;sf(this);
	      }.bind(b));b.c.w(b.a, "pause", function () {
	        sf(this);
	      }.bind(b));b.c.w(b.b, "unloading", function () {
	        this.h = !0;sf(this);
	      }.bind(b));b.c.w(b.a, "ended", function () {
	        var b = this;new C(function () {
	          b.a && b.a.ended && (b.h = !0, sf(b));
	        }).P(5);
	      }.bind(b));
	    }q = pf.prototype;q.Td = function () {
	      this.g = 0;this.l = !0;this.v = 0 != cast.receiver.CastReceiverManager.getInstance().getSenders().length;sf(this);
	    };function sf(b) {
	      Promise.resolve().then(function () {
	        this.b && (this.dispatchEvent(new I("caststatuschanged")), tf(this) || uf(this, 0));
	      }.bind(b));
	    }
	    function vf(b, c, d) {
	      for (var e in c.player) b.b[e](c.player[e]);b.s(d);d = Promise.resolve();var f = b.a.autoplay;c.manifest && (b.a.autoplay = !1, d = b.b.load(c.manifest, c.startTime));d.then(function () {
	        if (b.b) {
	          for (var d in c.video) b.a[d] = c.video[d];for (var e in c.playerAfterLoad) b.b[e](c.playerAfterLoad[e]);b.a.autoplay = f;c.manifest && (b.a.play(), uf(b, 0));
	        }
	      }, function (c) {
	        b.b.dispatchEvent(new I("error", { detail: c }));
	      });
	    }q.Zd = function (b, c) {
	      this.b && (qf(this), wf(this, { type: "event", targetName: b, event: c }, this.f));
	    };
	    function qf(b) {
	      b.C.P(.5);var c = { video: {}, player: {} };Qe.forEach(function (b) {
	        c.video[b] = this.a[b];
	      }.bind(b));if (b.b.V()) for (var d in Ve) 0 == b.g % Ve[d] && (c.player[d] = b.b[d]());for (var e in Ue) 0 == b.g % Ue[e] && (c.player[e] = b.b[e]());if (d = cast.receiver.CastReceiverManager.getInstance().getSystemVolume()) c.video.volume = d.level, c.video.muted = d.muted;b.m && (b.g += 1);wf(b, { type: "update", update: c }, b.f);tf(b);
	    }function tf(b) {
	      return b.l && (b.a.duration || b.b.V()) ? (xf(b), b.l = !1, !0) : !1;
	    }
	    function xf(b) {
	      var c = { contentId: b.b.ec(), streamType: b.b.V() ? "LIVE" : "BUFFERED", duration: b.a.duration, contentType: "" };uf(b, 0, c);
	    }q.Ee = function () {
	      var b = cast.receiver.CastReceiverManager.getInstance().getSystemVolume();b && wf(this, { type: "update", update: { video: { volume: b.level, muted: b.muted } } }, this.f);wf(this, { type: "event", targetName: "video", event: { type: "volumechange" } }, this.f);
	    };
	    q.vf = function (b) {
	      var c = af(b.data);switch (c.type) {case "init":
	          this.g = 0;this.m = !1;this.l = !0;vf(this, c.initState, c.appData);qf(this);break;case "appData":
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
	          }.bind(this)));c.then(this.de.bind(this, b, f, null), this.de.bind(this, b, f));}
	    };
	    q.jf = function (b) {
	      var c = af(b.data);switch (c.type) {case "PLAY":
	          this.a.play();uf(this, 0);break;case "PAUSE":
	          this.a.pause();uf(this, 0);break;case "SEEK":
	          b = c.currentTime;var d = c.resumeState;null != b && (this.a.currentTime = Number(b));d && "PLAYBACK_START" == d ? (this.a.play(), uf(this, 0)) : d && "PLAYBACK_PAUSE" == d && (this.a.pause(), uf(this, 0));break;case "STOP":
	          this.b.xd().then(function () {
	            this.b && uf(this, 0);
	          }.bind(this));break;case "GET_STATUS":
	          uf(this, Number(c.requestId));break;case "VOLUME":
	          d = c.volume;b = d.level;d = d.muted;var e = this.a.volume,
	              f = this.a.muted;null != b && (this.a.volume = Number(b));null != d && (this.a.muted = d);e == this.a.volume && f == this.a.muted || uf(this, 0);break;case "LOAD":
	          this.g = 0;this.l = this.m = !1;b = c.media;d = c.currentTime;e = this.F(b.contentId);f = c.autoplay || !0;this.s(b.customData);f && (this.a.autoplay = !0);this.b.load(e, d).then(function () {
	            this.b && xf(this);
	          }.bind(this))["catch"](function (b) {
	            var d = "LOAD_FAILED";7 == b.category && 7E3 == b.code && (d = "LOAD_CANCELLED");wf(this, { requestId: Number(c.requestId), type: d }, this.i);
	          }.bind(this));break;default:
	          wf(this, { requestId: Number(c.requestId), type: "INVALID_REQUEST", reason: "INVALID_COMMAND" }, this.i);}
	    };q.de = function (b, c, d) {
	      this.b && wf(this, { type: "asyncComplete", id: c, error: d }, this.f, b);
	    };function wf(b, c, d, e) {
	      b.v && (b = $e(c), e ? d.getCastChannel(e).send(b) : d.broadcast(b));
	    }
	    function uf(b, c, d) {
	      var e = b.a.playbackRate;var f = yf;f = b.h ? f.IDLE : b.b.Tc() ? f.le : b.a.paused ? f.ne : f.oe;e = { mediaSessionId: 0, playbackRate: e, playerState: f, currentTime: b.a.currentTime, supportedMediaCommands: 15, volume: { level: b.a.volume, muted: b.a.muted } };d && (e.media = d);wf(b, { requestId: c, type: "MEDIA_STATUS", status: [e] }, b.i);
	    }var yf = { IDLE: "IDLE", oe: "PLAYING", le: "BUFFERING", ne: "PAUSED" };function P(b, c) {
	      this.J = b;this.b = c == zf;this.a = 0;
	    }A("shaka.util.DataViewReader", P);var zf = 1;P.Endianness = { qg: 0, sg: zf };P.prototype.ta = function () {
	      return this.a < this.J.byteLength;
	    };P.prototype.hasMoreData = P.prototype.ta;P.prototype.ca = function () {
	      return this.a;
	    };P.prototype.getPosition = P.prototype.ca;P.prototype.Le = function () {
	      return this.J.byteLength;
	    };P.prototype.getLength = P.prototype.Le;P.prototype.la = function () {
	      try {
	        var b = this.J.getUint8(this.a);this.a += 1;return b;
	      } catch (c) {
	        Af();
	      }
	    };P.prototype.readUint8 = P.prototype.la;
	    P.prototype.Rb = function () {
	      try {
	        var b = this.J.getUint16(this.a, this.b);this.a += 2;return b;
	      } catch (c) {
	        Af();
	      }
	    };P.prototype.readUint16 = P.prototype.Rb;P.prototype.G = function () {
	      try {
	        var b = this.J.getUint32(this.a, this.b);this.a += 4;return b;
	      } catch (c) {
	        Af();
	      }
	    };P.prototype.readUint32 = P.prototype.G;P.prototype.$d = function () {
	      try {
	        var b = this.J.getInt32(this.a, this.b);this.a += 4;return b;
	      } catch (c) {
	        Af();
	      }
	    };P.prototype.readInt32 = P.prototype.$d;
	    P.prototype.Ab = function () {
	      try {
	        if (this.b) {
	          var b = this.J.getUint32(this.a, !0);var c = this.J.getUint32(this.a + 4, !0);
	        } else c = this.J.getUint32(this.a, !1), b = this.J.getUint32(this.a + 4, !1);
	      } catch (d) {
	        Af();
	      }if (2097151 < c) throw new D(2, 3, 3001);this.a += 8;return c * Math.pow(2, 32) + b;
	    };P.prototype.readUint64 = P.prototype.Ab;P.prototype.Za = function (b) {
	      this.a + b > this.J.byteLength && Af();var c = new Uint8Array(this.J.buffer, this.J.byteOffset + this.a, b);this.a += b;return c;
	    };P.prototype.readBytes = P.prototype.Za;
	    P.prototype.M = function (b) {
	      this.a + b > this.J.byteLength && Af();this.a += b;
	    };P.prototype.skip = P.prototype.M;P.prototype.be = function (b) {
	      this.a < b && Af();this.a -= b;
	    };P.prototype.rewind = P.prototype.be;P.prototype.seek = function (b) {
	      (0 > b || b > this.J.byteLength) && Af();this.a = b;
	    };P.prototype.seek = P.prototype.seek;P.prototype.gd = function () {
	      for (var b = this.a; this.ta() && 0 != this.J.getUint8(this.a);) this.a += 1;b = new Uint8Array(this.J.buffer, this.J.byteOffset + b, this.a - b);this.a += 1;return Ac(b);
	    };
	    P.prototype.readTerminatedString = P.prototype.gd;function Af() {
	      throw new D(2, 3, 3E3);
	    }function Q() {
	      this.c = [];this.b = [];this.a = !1;
	    }A("shaka.util.Mp4Parser", Q);Q.prototype.H = function (b, c) {
	      var d = Bf(b);this.c[d] = 0;this.b[d] = c;return this;
	    };Q.prototype.box = Q.prototype.H;Q.prototype.fa = function (b, c) {
	      var d = Bf(b);this.c[d] = 1;this.b[d] = c;return this;
	    };Q.prototype.fullBox = Q.prototype.fa;Q.prototype.stop = function () {
	      this.a = !0;
	    };Q.prototype.stop = Q.prototype.stop;
	    Q.prototype.parse = function (b, c) {
	      var d = new Uint8Array(b);d = new P(new DataView(d.buffer, d.byteOffset, d.byteLength), 0);for (this.a = !1; d.ta() && !this.a;) this.oc(0, d, c);
	    };Q.prototype.parse = Q.prototype.parse;
	    Q.prototype.oc = function (b, c, d) {
	      var e = c.ca(),
	          f = c.G(),
	          g = c.G();switch (f) {case 0:
	          f = c.J.byteLength - e;break;case 1:
	          f = c.Ab();}var h = this.b[g];if (h) {
	        var k = null,
	            l = null;1 == this.c[g] && (l = c.G(), k = l >>> 24, l &= 16777215);g = e + f;d && g > c.J.byteLength && (g = c.J.byteLength);g -= c.ca();c = 0 < g ? c.Za(g) : new Uint8Array(0);c = new P(new DataView(c.buffer, c.byteOffset, c.byteLength), 0);h({ parser: this, partialOkay: d || !1, version: k, flags: l, reader: c, size: f, start: e + b });
	      } else c.M(Math.min(e + f - c.ca(), c.J.byteLength - c.ca()));
	    };
	    Q.prototype.parseNext = Q.prototype.oc;function Cf(b) {
	      for (var c = null != b.flags ? 12 : 8; b.reader.ta() && !b.parser.a;) b.parser.oc(b.start + c, b.reader, b.partialOkay);
	    }Q.children = Cf;function Df(b) {
	      for (var c = null != b.flags ? 12 : 8, d = b.reader.G(); 0 < d && !b.parser.a; --d) b.parser.oc(b.start + c, b.reader, b.partialOkay);
	    }Q.sampleDescription = Df;function Ef(b) {
	      return function (c) {
	        b(c.reader.Za(c.reader.J.byteLength - c.reader.ca()));
	      };
	    }Q.allData = Ef;function Bf(b) {
	      for (var c = 0, d = 0; d < b.length; d++) c = c << 8 | b.charCodeAt(d);return c;
	    }
	    function Ff(b) {
	      return String.fromCharCode(b >> 24 & 255, b >> 16 & 255, b >> 8 & 255, b & 255);
	    }Q.typeToString = Ff;function Gf(b) {
	      var c = this;this.b = [];this.a = [];this.data = [];new Q().H("moov", Cf).fa("pssh", function (b) {
	        if (!(1 < b.version)) {
	          var d = b.reader.J;d = new Uint8Array(d.buffer, d.byteOffset - 12, b.size);c.data.push(d);c.b.push(L.wc(b.reader.Za(16)));if (0 < b.version) {
	            d = b.reader.G();for (var f = 0; f < d; ++f) {
	              var g = L.wc(b.reader.Za(16));c.a.push(g);
	            }
	          }
	        }
	      }).parse(b);
	    }
	    function Hf(b) {
	      if (!b) return b;var c = new Gf(b);if (1 >= c.data.length) return b;b = [];var d = {};c = r(c.data);for (var e = c.next(); !e.done; d = { hc: d.hc }, e = c.next()) d.hc = e.value, b.some(function (b) {
	        return function (c) {
	          return L.ya(c, b.hc);
	        };
	      }(d)) || b.push(d.hc);return L.concat.apply(L, La(b));
	    }new Map().set("org.w3.clearkey", "1077efecc0b24d02ace33c1e52e2fb4b").set("com.widevine.alpha", "edef8ba979d64acea3c827dcd51d21ed").set("com.microsoft.playready", "9a04f07998404286ab92e65be0885f95").set("com.adobe.primetime", "f239e769efa348509c16a903c6932efb");var R = { dc: function (b, c) {
	        var d = R.O(b, c);return 1 != d.length ? null : d[0];
	      }, Kc: function (b, c, d) {
	        b = R.Dd(b, c, d);return 1 != b.length ? null : b[0];
	      }, O: function (b, c) {
	        return Array.prototype.filter.call(b.childNodes, function (b) {
	          return b instanceof Element && b.tagName == c;
	        });
	      }, Dd: function (b, c, d) {
	        return Array.prototype.filter.call(b.childNodes, function (b) {
	          return b instanceof Element && b.localName == d && b.namespaceURI == c;
	        });
	      }, getAttributeNS: function (b, c, d) {
	        return b.hasAttributeNS(c, d) ? b.getAttributeNS(c, d) : null;
	      }, fc: function (b) {
	        return Array.prototype.every.call(b.childNodes, function (b) {
	          return b.nodeType == Node.TEXT_NODE || b.nodeType == Node.CDATA_SECTION_NODE;
	        }) ? b.textContent.trim() : null;
	      }, I: function (b, c, d, e) {
	        e = void 0 === e ? null : e;var f = null;b = b.getAttribute(c);null != b && (f = d(b));return null == f ? e : f;
	      }, zf: function (b) {
	        if (!b) return null;/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(b) && (b += "Z");b = Date.parse(b);return isNaN(b) ? null : Math.floor(b / 1E3);
	      }, Da: function (b) {
	        if (!b) return null;b = /^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$/.exec(b);
	        if (!b) return null;b = 31536E3 * Number(b[1] || null) + 2592E3 * Number(b[2] || null) + 86400 * Number(b[3] || null) + 3600 * Number(b[4] || null) + 60 * Number(b[5] || null) + Number(b[6] || null);return isFinite(b) ? b : null;
	      }, qc: function (b) {
	        var c = /([0-9]+)-([0-9]+)/.exec(b);if (!c) return null;b = Number(c[1]);if (!isFinite(b)) return null;c = Number(c[2]);return isFinite(c) ? { start: b, end: c } : null;
	      }, parseInt: function (b) {
	        b = Number(b);return 0 === b % 1 ? b : null;
	      }, pc: function (b) {
	        b = Number(b);return 0 === b % 1 && 0 < b ? b : null;
	      }, xb: function (b) {
	        b = Number(b);return 0 === b % 1 && 0 <= b ? b : null;
	      }, parseFloat: function (b) {
	        b = Number(b);return isNaN(b) ? null : b;
	      }, Ce: function (b) {
	        var c;b = (c = b.match(/^(\d+)\/(\d+)$/)) ? Number(c[1]) / Number(c[2]) : Number(b);return isNaN(b) ? null : b;
	      }, Wd: function (b, c) {
	        var d = new DOMParser();try {
	          var e = d.parseFromString(b, "text/xml");
	        } catch (g) {}if (e && e.documentElement.tagName == c) var f = e.documentElement;return f && 0 < f.getElementsByTagName("parsererror").length ? null : f;
	      }, Vd: function (b, c) {
	        try {
	          var d = Ac(b);return R.Wd(d, c);
	        } catch (e) {}
	      } };var If = new Map().set("urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b", "org.w3.clearkey").set("urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed", "com.widevine.alpha").set("urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95", "com.microsoft.playready").set("urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb", "com.adobe.primetime");
	    function Jf(b, c, d) {
	      var e = Kf(b),
	          f = null;b = [];var g = [],
	          h = new Set(e.map(function (b) {
	        return b.keyId;
	      }));h["delete"](null);if (1 < h.size) throw new D(2, 4, 4010);d || (g = e.filter(function (b) {
	        return "urn:mpeg:dash:mp4protection:2011" == b.ce ? (f = b.init || f, !1) : !0;
	      }), g.length && (b = Lf(f, c, g), 0 == b.length && (b = [ud("", f)])));if (e.length && (d || !g.length)) for (b = [], c = r(If.values()), d = c.next(); !d.done; d = c.next()) d = d.value, "org.w3.clearkey" != d && b.push(ud(d, f));if (h = Array.from(h)[0] || null) for (c = r(b), d = c.next(); !d.done; d = c.next()) for (d = r(d.value.initData), e = d.next(); !e.done; e = d.next()) e.value.keyId = h;return { Bd: h, ug: f, drmInfos: b, Ed: !0 };
	    }function Mf(b, c, d, e) {
	      var f = Jf(b, c, e);if (d.Ed) {
	        b = 1 == d.drmInfos.length && !d.drmInfos[0].keySystem;c = 0 == f.drmInfos.length;if (0 == d.drmInfos.length || b && !c) d.drmInfos = f.drmInfos;d.Ed = !1;
	      } else if (0 < f.drmInfos.length && (d.drmInfos = d.drmInfos.filter(function (b) {
	        return f.drmInfos.some(function (c) {
	          return c.keySystem == b.keySystem;
	        });
	      }), 0 == d.drmInfos.length)) throw new D(2, 4, 4008);return f.Bd || d.Bd;
	    }
	    function Nf(b) {
	      var c = 0,
	          d = new DataView(b).getUint32(c, !0);if (d !== b.byteLength) return [];c += 6;d = [];for (var e = new DataView(b); c < b.byteLength - 1;) {
	        var f = e.getUint16(c, !0);c += 2;var g = e.getUint16(c, !0);c += 2;var h = new Uint8Array(b, c, g);d.push({ type: f, value: h });c += g;
	      }return d;
	    }function Of(b) {
	      return (b = b.querySelector("DATA > LA_URL")) ? b.textContent : "";
	    }
	    function Lf(b, c, d) {
	      var e = [];d = r(d);for (var f = d.next(); !f.done; f = d.next()) {
	        f = f.value;var g = If.get(f.ce);if (g) {
	          var h;if (h = R.Kc(f.node, "urn:microsoft:playready", "pro")) {
	            h = L.Aa(h.textContent);var k = new Uint8Array([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149]),
	                l = h.length,
	                m = k.length + 16 + l,
	                n = new ArrayBuffer(m),
	                p = new Uint8Array(n);n = new DataView(n);var v = 0;n.setUint32(v, m);v += 4;n.setUint32(v, 1886614376);v += 4;n.setUint32(v, 0);v += 4;p.set(k, v);v += k.length;n.setUint32(v, l);v += 4;p.set(h, v);h = [{ initData: p,
	              initDataType: "cenc", keyId: f.keyId }];
	          } else h = null;h = ud(g, f.init || b || h);if (g = Pf.get(g)) h.licenseServerUri = g(f);e.push(h);
	        } else for (f = c(f.node) || [], f = r(f), g = f.next(); !g.done; g = f.next()) e.push(g.value);
	      }return e;
	    }
	    var Pf = new Map().set("com.widevine.alpha", function (b) {
	      return (b = R.Kc(b.node, "urn:microsoft", "laurl")) ? b.getAttribute("licenseUrl") || "" : "";
	    }).set("com.microsoft.playready", function (b) {
	      b = R.Kc(b.node, "urn:microsoft:playready", "pro");if (!b) return "";b = L.Aa(b.textContent);b = Nf(b.buffer).filter(function (b) {
	        return 1 === b.type;
	      })[0];if (!b) return "";b = ic(b.value, !0);return (b = R.Wd(b, "WRMHEADER")) ? Of(b) : "";
	    });function Kf(b) {
	      var c = [];b = r(b);for (var d = b.next(); !d.done; d = b.next()) (d = Qf(d.value)) && c.push(d);return c;
	    }
	    function Qf(b) {
	      var c = b.getAttribute("schemeIdUri"),
	          d = R.getAttributeNS(b, "urn:mpeg:cenc:2013", "default_KID"),
	          e = R.Dd(b, "urn:mpeg:cenc:2013", "pssh").map(R.fc);if (!c) return null;c = c.toLowerCase();if (d && (d = d.replace(/-/g, "").toLowerCase(), d.includes(" "))) throw new D(2, 4, 4009);var f = [];try {
	        f = e.map(function (b) {
	          return { initDataType: "cenc", initData: L.Aa(b), keyId: null };
	        });
	      } catch (g) {
	        throw new D(2, 4, 4007);
	      }return { node: b, ce: c, keyId: d, init: 0 < f.length ? f : null };
	    }function Rf(b, c, d, e, f) {
	      var g = { RepresentationID: c, Number: d, Bandwidth: e, Time: f };return b.replace(/\$(RepresentationID|Number|Bandwidth|Time)?(?:%0([0-9]+)([diouxX]))?\$/g, function (b, c, d, e) {
	        if ("$$" == b) return "$";var f = g[c];if (null == f) return b;"RepresentationID" == c && d && (d = void 0);"Time" == c && (f = Math.round(f));switch (e) {case void 0:case "d":case "i":case "u":
	            b = f.toString();break;case "o":
	            b = f.toString(8);break;case "x":
	            b = f.toString(16);break;case "X":
	            b = f.toString(16).toUpperCase();break;default:
	            b = f.toString();}d = window.parseInt(d, 10) || 1;return Array(Math.max(0, d - b.length) + 1).join("0") + b;
	      });
	    }
	    function Sf(b, c) {
	      var d = Tf(b, c, "timescale"),
	          e = 1;d && (e = R.pc(d) || 1);d = Tf(b, c, "duration");(d = R.pc(d || "")) && (d /= e);var f = Tf(b, c, "startNumber"),
	          g = Number(Tf(b, c, "presentationTimeOffset")) || 0,
	          h = R.xb(f || "");if (null == f || null == h) h = 1;var k = Uf(b, c, "SegmentTimeline");f = null;if (k) {
	        f = e;var l = b.S.duration || Infinity;k = R.O(k, "S");for (var m = [], n = 0, p = 0; p < k.length; ++p) {
	          var v = k[p],
	              x = R.I(v, "t", R.xb),
	              B = R.I(v, "d", R.xb);v = R.I(v, "r", R.parseInt);null != x && (x -= g);if (!B) break;x = null != x ? x : n;v = v || 0;if (0 > v) if (p + 1 < k.length) {
	            v = R.I(k[p + 1], "t", R.xb);if (null == v) break;else if (x >= v) break;v = Math.ceil((v - x) / B) - 1;
	          } else {
	            if (Infinity == l) break;else if (x / f >= l) break;v = Math.ceil((l * f - x) / B) - 1;
	          }0 < m.length && x != n && (m[m.length - 1].end = x / f);for (var y = 0; y <= v; ++y) n = x + B, m.push({ start: x / f, end: n / f, jg: x }), x = n;
	        }f = m;
	      }return { timescale: e, Z: d, ab: h, ma: g / e || 0, yd: g, N: f };
	    }function Tf(b, c, d) {
	      return [c(b.B), c(b.aa), c(b.ka)].filter(sd.Ia).map(function (b) {
	        return b.getAttribute(d);
	      }).reduce(function (b, c) {
	        return b || c;
	      });
	    }
	    function Uf(b, c, d) {
	      return [c(b.B), c(b.aa), c(b.ka)].filter(sd.Ia).map(function (b) {
	        return R.dc(b, d);
	      }).reduce(function (b, c) {
	        return b || c;
	      });
	    }
	    function Vf(b, c, d, e, f, g) {
	      for (var h = R.getAttributeNS(b, "http://www.w3.org/1999/xlink", "href"), k = R.getAttributeNS(b, "http://www.w3.org/1999/xlink", "actuate") || "onRequest", l = 0; l < b.attributes.length; l++) {
	        var m = b.attributes[l];"http://www.w3.org/1999/xlink" == m.namespaceURI && (b.removeAttributeNS(m.namespaceURI, m.localName), --l);
	      }if (5 <= g) return Bb(new D(2, 4, 4028));if ("onLoad" != k) return Bb(new D(2, 4, 4027));var n = td([e], [h]);return f.request(0, Ub(n, c)).U(function (e) {
	        e = R.Vd(e.data, b.tagName);if (!e) return Bb(new D(2, 4, 4001, h));for (; b.childNodes.length;) b.removeChild(b.childNodes[0]);for (; e.childNodes.length;) {
	          var k = e.childNodes[0];e.removeChild(k);b.appendChild(k);
	        }for (k = 0; k < e.attributes.length; k++) {
	          var l = e.attributes[k].nodeName,
	              m = e.getAttribute(l);b.setAttribute(l, m);
	        }return Wf(b, c, d, n[0], f, g + 1);
	      });
	    }
	    function Wf(b, c, d, e, f, g) {
	      g = void 0 === g ? 0 : g;if (R.getAttributeNS(b, "http://www.w3.org/1999/xlink", "href")) {
	        var h = Vf(b, c, d, e, f, g);d && (h = h.U(void 0, function () {
	          return Wf(b, c, d, e, f, g);
	        }));return h;
	      }h = [];for (var k = 0; k < b.childNodes.length; k++) {
	        var l = b.childNodes[k];l instanceof Element && ("urn:mpeg:dash:resolve-to-zero:2013" == R.getAttributeNS(l, "http://www.w3.org/1999/xlink", "href") ? (b.removeChild(l), --k) : "SegmentTimeline" != l.tagName && h.push(Wf(l, c, d, e, f, g)));
	      }return Hb(h).U(function () {
	        return b;
	      });
	    }function Xf(b, c, d) {
	      this.c = b;this.b = c;this.a = d;
	    }A("shaka.media.InitSegmentReference", Xf);Xf.prototype.Ec = function () {
	      return this.c();
	    };Xf.prototype.createUris = Xf.prototype.Ec;Xf.prototype.Qc = function () {
	      return this.b;
	    };Xf.prototype.getStartByte = Xf.prototype.Qc;Xf.prototype.Pc = function () {
	      return this.a;
	    };Xf.prototype.getEndByte = Xf.prototype.Pc;function S(b, c, d, e, f, g) {
	      this.position = b;this.startTime = c;this.endTime = d;this.c = e;this.b = f;this.a = g;
	    }A("shaka.media.SegmentReference", S);S.prototype.ca = function () {
	      return this.position;
	    };
	    S.prototype.getPosition = S.prototype.ca;S.prototype.Rc = function () {
	      return this.startTime;
	    };S.prototype.getStartTime = S.prototype.Rc;S.prototype.Je = function () {
	      return this.endTime;
	    };S.prototype.getEndTime = S.prototype.Je;S.prototype.Ec = function () {
	      return this.c();
	    };S.prototype.createUris = S.prototype.Ec;S.prototype.Qc = function () {
	      return this.b;
	    };S.prototype.getStartByte = S.prototype.Qc;S.prototype.Pc = function () {
	      return this.a;
	    };S.prototype.getEndByte = S.prototype.Pc;function Yf(b, c, d, e) {
	      var f,
	          g = new Q().fa("sidx", function (b) {
	        f = Zf(c, e, d, b);
	      });b && g.parse(b);if (f) return f;throw new D(2, 3, 3004);
	    }
	    function Zf(b, c, d, e) {
	      var f = [];e.reader.M(4);var g = e.reader.G();if (0 == g) throw new D(2, 3, 3005);if (0 == e.version) {
	        var h = e.reader.G();var k = e.reader.G();
	      } else h = e.reader.Ab(), k = e.reader.Ab();e.reader.M(2);var l = e.reader.Rb();b = b + e.size + k;for (k = 0; k < l; k++) {
	        var m = e.reader.G(),
	            n = (m & 2147483648) >>> 31;m &= 2147483647;var p = e.reader.G();e.reader.M(4);if (1 == n) throw new D(2, 3, 3006);f.push(new S(f.length, h / g - c, (h + p) / g - c, function () {
	          return d;
	        }, b, b + m - 1));h += p;b += m;
	      }e.parser.stop();return f;
	    }function T(b) {
	      this.a = b;
	    }A("shaka.media.SegmentIndex", T);T.prototype.destroy = function () {
	      this.a = null;return Promise.resolve();
	    };T.prototype.destroy = T.prototype.destroy;T.prototype.find = function (b) {
	      for (var c = this.a.length - 1; 0 <= c; --c) {
	        var d = this.a[c];if (b >= d.startTime && b < d.endTime) return d.position;
	      }return this.a.length && b < this.a[0].startTime ? this.a[0].position : null;
	    };T.prototype.find = T.prototype.find;
	    T.prototype.get = function (b) {
	      if (0 == this.a.length) return null;b -= this.a[0].position;return 0 > b || b >= this.a.length ? null : this.a[b];
	    };T.prototype.get = T.prototype.get;T.prototype.offset = function (b) {
	      for (var c = 0; c < this.a.length; ++c) this.a[c].startTime += b, this.a[c].endTime += b;
	    };T.prototype.offset = T.prototype.offset;
	    T.prototype.Yc = function (b) {
	      for (var c = [], d = 0, e = 0; d < this.a.length && e < b.length;) {
	        var f = this.a[d],
	            g = b[e];f.startTime < g.startTime ? (c.push(f), d++) : (f.startTime > g.startTime ? 0 == d && c.push(g) : (.1 < Math.abs(f.endTime - g.endTime) ? c.push(new S(f.position, g.startTime, g.endTime, g.c, g.b, g.a)) : c.push(f), d++), e++);
	      }for (; d < this.a.length;) c.push(this.a[d++]);if (c.length) for (d = c[c.length - 1].position + 1; e < b.length;) f = b[e++], f = new S(d++, f.startTime, f.endTime, f.c, f.b, f.a), c.push(f);else c = b;this.a = c;
	    };T.prototype.merge = T.prototype.Yc;
	    T.prototype.Hc = function (b) {
	      for (var c = 0; c < this.a.length; ++c) if (this.a[c].endTime > b) {
	        this.a.splice(0, c);return;
	      }this.a = [];
	    };T.prototype.evict = T.prototype.Hc;function $f(b, c) {
	      for (; b.a.length;) if (b.a[b.a.length - 1].startTime >= c) b.a.pop();else break;for (; b.a.length;) if (0 >= b.a[0].endTime) b.a.shift();else break;if (0 != b.a.length) {
	        var d = b.a[b.a.length - 1];b.a[b.a.length - 1] = new S(d.position, d.startTime, c, d.c, d.b, d.a);
	      }
	    }function ag(b) {
	      this.b = b;this.a = new P(b, 0);bg || (bg = [new Uint8Array([255]), new Uint8Array([127, 255]), new Uint8Array([63, 255, 255]), new Uint8Array([31, 255, 255, 255]), new Uint8Array([15, 255, 255, 255, 255]), new Uint8Array([7, 255, 255, 255, 255, 255]), new Uint8Array([3, 255, 255, 255, 255, 255, 255]), new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255])]);
	    }var bg;ag.prototype.ta = function () {
	      return this.a.ta();
	    };
	    function cg(b) {
	      var c = dg(b);if (7 < c.length) throw new D(2, 3, 3002);for (var d = 0, e = 0; e < c.length; e++) d = 256 * d + c[e];c = d;d = dg(b);a: {
	        e = L.ya;for (var f = 0; f < bg.length; f++) if (e(d, bg[f])) {
	          e = !0;break a;
	        }e = !1;
	      }if (e) d = b.b.byteLength - b.a.ca();else {
	        if (8 == d.length && d[1] & 224) throw new D(2, 3, 3001);e = d[0] & (1 << 8 - d.length) - 1;for (f = 1; f < d.length; f++) e = 256 * e + d[f];d = e;
	      }d = b.a.ca() + d <= b.b.byteLength ? d : b.b.byteLength - b.a.ca();e = new DataView(b.b.buffer, b.b.byteOffset + b.a.ca(), d);b.a.M(d);return new eg(c, e);
	    }
	    function dg(b) {
	      var c = b.a.la(),
	          d;for (d = 1; 8 >= d && !(c & 1 << 8 - d); d++);if (8 < d) throw new D(2, 3, 3002);var e = new Uint8Array(d);e[0] = c;for (c = 1; c < d; c++) e[c] = b.a.la();return e;
	    }function eg(b, c) {
	      this.id = b;this.a = c;
	    }function fg(b) {
	      if (8 < b.a.byteLength) throw new D(2, 3, 3002);if (8 == b.a.byteLength && b.a.getUint8(0) & 224) throw new D(2, 3, 3001);for (var c = 0, d = 0; d < b.a.byteLength; d++) {
	        var e = b.a.getUint8(d);c = 256 * c + e;
	      }return c;
	    }function gg() {}
	    gg.prototype.parse = function (b, c, d, e) {
	      var f;c = new ag(new DataView(c));if (440786851 != cg(c).id) throw new D(2, 3, 3008);var g = cg(c);if (408125543 != g.id) throw new D(2, 3, 3009);c = g.a.byteOffset;g = new ag(g.a);for (f = null; g.ta();) {
	        var h = cg(g);if (357149030 == h.id) {
	          f = h;break;
	        }
	      }if (!f) throw new D(2, 3, 3010);g = new ag(f.a);f = 1E6;for (h = null; g.ta();) {
	        var k = cg(g);if (2807729 == k.id) f = fg(k);else if (17545 == k.id) if (h = k, 4 == h.a.byteLength) h = h.a.getFloat32(0);else if (8 == h.a.byteLength) h = h.a.getFloat64(0);else throw new D(2, 3, 3003);
	      }if (null == h) throw new D(2, 3, 3011);g = f / 1E9;f = h * g;b = cg(new ag(new DataView(b)));if (475249515 != b.id) throw new D(2, 3, 3007);return hg(b, c, g, f, d, e);
	    };function hg(b, c, d, e, f, g) {
	      function h() {
	        return f;
	      }var k = [];b = new ag(b.a);for (var l = null, m = null; b.ta();) {
	        var n = cg(b);if (187 == n.id) {
	          var p = ig(n);p && (n = d * p.kg, p = c + p.Hf, null != l && k.push(new S(k.length, l - g, n - g, h, m, p - 1)), l = n, m = p);
	        }
	      }null != l && k.push(new S(k.length, l - g, e - g, h, m, null));return k;
	    }
	    function ig(b) {
	      var c = new ag(b.a);b = cg(c);if (179 != b.id) throw new D(2, 3, 3013);b = fg(b);c = cg(c);if (183 != c.id) throw new D(2, 3, 3012);c = new ag(c.a);for (var d = 0; c.ta();) {
	        var e = cg(c);if (241 == e.id) {
	          d = fg(e);break;
	        }
	      }return { kg: b, Hf: d };
	    }function jg(b, c) {
	      var d = Uf(b, c, "Initialization");if (!d) return null;var e = b.B.pa,
	          f = d.getAttribute("sourceURL");f && (e = td(b.B.pa, [f]));f = 0;var g = null;if (d = R.I(d, "range", R.qc)) f = d.start, g = d.end;return new Xf(function () {
	        return e;
	      }, f, g);
	    }
	    function kg(b, c) {
	      var d = Number(Tf(b, lg, "presentationTimeOffset")) || 0,
	          e = Tf(b, lg, "timescale"),
	          f = 1;e && (f = R.pc(e) || 1);d = d / f || 0;e = jg(b, lg);var g = b.B.contentType;f = b.B.mimeType.split("/")[1];if ("text" != g && "mp4" != f && "webm" != f) throw new D(2, 4, 4006);if ("webm" == f && !e) throw new D(2, 4, 4005);g = Uf(b, lg, "RepresentationIndex");var h = Tf(b, lg, "indexRange"),
	          k = b.B.pa;h = R.qc(h || "");if (g) {
	        var l = g.getAttribute("sourceURL");l && (k = td(b.B.pa, [l]));h = R.I(g, "range", R.qc, h);
	      }if (!h) throw new D(2, 4, 4002);f = mg(b, c, e, k, h.start, h.end, f, d);return { createSegmentIndex: f.createSegmentIndex, findSegmentPosition: f.findSegmentPosition, getSegmentReference: f.getSegmentReference, initSegmentReference: e, ma: d };
	    }
	    function mg(b, c, d, e, f, g, h, k) {
	      var l = b.presentationTimeline,
	          m = !b.mb || !b.S.Vc,
	          n = b.S.start,
	          p = b.S.duration,
	          v = c,
	          x = null;return { createSegmentIndex: function () {
	          var b = [v(e, f, g), "webm" == h ? v(d.c(), d.b, d.a) : null];v = null;return Promise.all(b).then(function (b) {
	            var c = b[0];b = b[1] || null;c = "mp4" == h ? Yf(c, f, e, k) : new gg().parse(c, b, e, k);l.ub(c, n);x = new T(c);m && $f(x, p);
	          });
	        }, findSegmentPosition: function (b) {
	          return x.find(b);
	        }, getSegmentReference: function (b) {
	          return x.get(b);
	        } };
	    }function lg(b) {
	      return b.Sb;
	    }function ng(b, c) {
	      var d = jg(b, og);var e = pg(b);var f = Sf(b, og),
	          g = f.ab;0 == g && (g = 1);var h = 0;f.Z ? h = f.Z * (g - 1) : f.N && 0 < f.N.length && (h = f.N[0].start);e = { Z: f.Z, startTime: h, ab: g, ma: f.ma, N: f.N, sb: e };if (!e.Z && !e.N && 1 < e.sb.length) throw new D(2, 4, 4002);if (!e.Z && !b.S.duration && !e.N && 1 == e.sb.length) throw new D(2, 4, 4002);if (e.N && 0 == e.N.length) throw new D(2, 4, 4002);g = f = null;b.ka.id && b.B.id && (g = b.ka.id + "," + b.B.id, f = c[g]);h = qg(b.S.duration, e.ab, b.B.pa, e);f ? (f.Yc(h), g = b.presentationTimeline.Mb(), f.Hc(g - b.S.start)) : (b.presentationTimeline.ub(h, b.S.start), f = new T(h), g && b.mb && (c[g] = f));b.mb && b.S.Vc || $f(f, b.S.duration);return { createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: f.find.bind(f), getSegmentReference: f.get.bind(f), initSegmentReference: d, ma: e.ma };
	    }function og(b) {
	      return b.La;
	    }
	    function qg(b, c, d, e) {
	      var f = e.sb.length;e.N && e.N.length != e.sb.length && (f = Math.min(e.N.length, e.sb.length));for (var g = [], h = e.startTime, k = 0; k < f; k++) {
	        var l = e.sb[k],
	            m = td(d, [l.gf]),
	            n = void 0;n = null != e.Z ? h + e.Z : e.N ? e.N[k].end : h + b;g.push(new S(k + c, h, n, function (b) {
	          return b;
	        }.bind(null, m), l.start, l.end));h = n;
	      }return g;
	    }
	    function pg(b) {
	      return [b.B.La, b.aa.La, b.ka.La].filter(sd.Ia).map(function (b) {
	        return R.O(b, "SegmentURL");
	      }).reduce(function (b, d) {
	        return 0 < b.length ? b : d;
	      }).map(function (c) {
	        c.getAttribute("indexRange") && !b.Id && (b.Id = !0);var d = c.getAttribute("media");c = R.I(c, "mediaRange", R.qc, { start: 0, end: null });return { gf: d, start: c.start, end: c.end };
	      });
	    }function rg(b, c, d, e) {
	      var f = sg(b);var g = Sf(b, tg);var h = Tf(b, tg, "media"),
	          k = Tf(b, tg, "index");g = { Z: g.Z, timescale: g.timescale, ab: g.ab, ma: g.ma, yd: g.yd, N: g.N, Xc: h, Ob: k };h = g.Ob ? 1 : 0;h += g.N ? 1 : 0;h += g.Z ? 1 : 0;if (0 == h) throw new D(2, 4, 4002);1 != h && (g.Ob && (g.N = null), g.Z = null);if (!g.Ob && !g.Xc) throw new D(2, 4, 4002);if (g.Ob) {
	        d = b.B.mimeType.split("/")[1];if ("mp4" != d && "webm" != d) throw new D(2, 4, 4006);if ("webm" == d && !f) throw new D(2, 4, 4005);e = Rf(g.Ob, b.B.id, null, b.bandwidth || null, null);e = td(b.B.pa, [e]);b = mg(b, c, f, e, 0, null, d, g.ma);
	      } else g.Z ? (e || (b.presentationTimeline.$c(g.Z), b.presentationTimeline.ad(b.S.start)), b = ug(b, g)) : (h = c = null, b.ka.id && b.B.id && (h = b.ka.id + "," + b.B.id, c = d[h]), k = vg(b, g), e = !b.mb || !b.S.Vc, c ? (e && $f(new T(k), b.S.duration), c.Yc(k), d = b.presentationTimeline.Mb(), c.Hc(d - b.S.start)) : (b.presentationTimeline.ub(k, b.S.start), c = new T(k), h && b.mb && (d[h] = c)), e && $f(c, b.S.duration), b = { createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: c.find.bind(c), getSegmentReference: c.get.bind(c) });return { createSegmentIndex: b.createSegmentIndex,
	        findSegmentPosition: b.findSegmentPosition, getSegmentReference: b.getSegmentReference, initSegmentReference: f, ma: g.ma };
	    }function tg(b) {
	      return b.Ub;
	    }
	    function ug(b, c) {
	      var d = b.S.duration,
	          e = c.Z,
	          f = c.ab,
	          g = c.timescale,
	          h = c.Xc,
	          k = b.bandwidth || null,
	          l = b.B.id,
	          m = b.B.pa;return { createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function (b) {
	          return 0 > b || d && b >= d ? null : Math.floor(b / e);
	        }, getSegmentReference: function (b) {
	          var c = b * e,
	              n = c + e;d && (n = Math.min(n, d));return 0 > n || d && c >= d ? null : new S(b, c, n, function () {
	            var d = Rf(h, l, b + f, k, c * g);return td(m, [d]);
	          }, 0, null);
	        } };
	    }
	    function vg(b, c) {
	      for (var d = [], e = 0; e < c.N.length; e++) {
	        var f = e + c.ab;d.push(new S(f, c.N[e].start, c.N[e].end, function (b, c, d, e, f, n) {
	          b = Rf(b, c, f, d, n);return td(e, [b]).map(function (b) {
	            return b.toString();
	          });
	        }.bind(null, c.Xc, b.B.id, b.bandwidth || null, b.B.pa, f, c.N[e].jg + c.yd), 0, null));
	      }return d;
	    }function sg(b) {
	      var c = Tf(b, tg, "initialization");if (!c) return null;var d = b.B.id,
	          e = b.bandwidth || null,
	          f = b.B.pa;return new Xf(function () {
	        var b = Rf(c, d, null, e, null);return td(f, [b]);
	      }, 0, null);
	    }var U = { yb: {}, Qb: {}, kd: function (b, c) {
	        U.Qb[b] = c;
	      } };A("shaka.media.ManifestParser.registerParserByExtension", U.kd);U.Bb = function (b, c) {
	      U.yb[b] = c;
	    };A("shaka.media.ManifestParser.registerParserByMime", U.Bb);
	    U.Ef = function () {
	      var b = {};if (tc()) {
	        for (var c in U.yb) b[c] = !0;for (var d in U.Qb) b[d] = !0;
	      }c = { mpd: "application/dash+xml", m3u8: "application/x-mpegurl", ism: "application/vnd.ms-sstr+xml" };d = r(["application/dash+xml", "application/x-mpegurl", "application/vnd.apple.mpegurl", "application/vnd.ms-sstr+xml"]);for (var e = d.next(); !e.done; e = d.next()) e = e.value, b[e] = tc() ? !!U.yb[e] : uc(e);for (var f in c) b[f] = tc() ? !!U.Qb[f] : uc(c[f]);return b;
	    };
	    U.create = function (b, c, d, e) {
	      return t(function g() {
	        var h, k;return z(g, function (g) {
	          switch (g.j) {case 1:
	              return xa(g, 2), u(g, U.Ke(b, c, d, e), 4);case 4:
	              return h = g.o, g["return"](new h());case 2:
	              throw k = Ba(g), k.severity = 2, k;}
	        });
	      });
	    };
	    U.Ke = function (b, c, d, e) {
	      return t(function g() {
	        var h, k, l, m, n;return z(g, function (g) {
	          switch (g.j) {case 1:
	              h = U;if (e && (k = h.yb[e.toLowerCase()])) return g["return"](k);if (l = h.getExtension(b)) if (m = h.Qb[l]) return g["return"](m);if (e) {
	                g.A(2);break;
	              }return u(g, h.Se(b, c, d), 3);case 3:
	              if (e = g.o) if (n = U.yb[e]) return g["return"](n);case 2:
	              throw new D(2, 4, 4E3, b);}
	        });
	      });
	    };
	    U.Se = function (b, c, d) {
	      return t(function f() {
	        var g, h, k;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = Ub([b], d), g.method = "HEAD", u(f, c.request(0, g).promise, 2);case 2:
	              return h = f.o, k = h.headers["content-type"], f["return"](k ? k.toLowerCase().split(";").shift() : "");}
	        });
	      });
	    };U.getExtension = function (b) {
	      b = new ib(b).ja.split("/").pop().split(".");return 1 == b.length ? "" : b.pop().toLowerCase();
	    };U.isSupported = function (b, c) {
	      return tc() ? c in U.yb || U.getExtension(b) in U.Qb ? !0 : !1 : !1;
	    };function V(b, c, d) {
	      this.f = b;this.rc = c;this.h = this.g = Infinity;this.a = 1;this.b = this.c = null;this.l = 0;this.m = !0;this.i = 0;this.s = void 0 === d ? !0 : d;
	    }A("shaka.media.PresentationTimeline", V);V.prototype.Y = function () {
	      return this.g;
	    };V.prototype.getDuration = V.prototype.Y;V.prototype.Qe = function () {
	      return this.a;
	    };V.prototype.getMaxSegmentDuration = V.prototype.Qe;V.prototype.wa = function (b) {
	      this.g = b;
	    };V.prototype.setDuration = V.prototype.wa;V.prototype.Xe = function () {
	      return this.f;
	    };
	    V.prototype.getPresentationStartTime = V.prototype.Xe;V.prototype.ee = function (b) {
	      this.l = b;
	    };V.prototype.setClockOffset = V.prototype.ee;V.prototype.Vb = function (b) {
	      this.m = b;
	    };V.prototype.setStatic = V.prototype.Vb;V.prototype.sd = function (b) {
	      this.h = b;
	    };V.prototype.setSegmentAvailabilityDuration = V.prototype.sd;V.prototype.Vf = function (b) {
	      this.rc = b;
	    };V.prototype.setDelay = V.prototype.Vf;V.prototype.Ie = function () {
	      return this.rc;
	    };V.prototype.getDelay = V.prototype.Ie;
	    V.prototype.ub = function (b, c) {
	      if (0 != b.length) {
	        var d = b[b.length - 1].endTime + c;this.ad(b[0].startTime + c);this.a = b.reduce(function (b, c) {
	          return Math.max(b, c.endTime - c.startTime);
	        }, this.a);this.b = Math.max(this.b, d);null != this.f && this.s && (this.f = (Date.now() + this.l) / 1E3 - this.b - this.a);
	      }
	    };V.prototype.notifySegments = V.prototype.ub;V.prototype.ad = function (b) {
	      this.c = null == this.c ? b : Math.min(this.c, b);
	    };V.prototype.notifyMinSegmentStartTime = V.prototype.ad;V.prototype.$c = function (b) {
	      this.a = Math.max(this.a, b);
	    };
	    V.prototype.notifyMaxSegmentDuration = V.prototype.$c;V.prototype.offset = function (b) {
	      null != this.c && (this.c += b);null != this.b && (this.b += b);
	    };V.prototype.offset = V.prototype.offset;V.prototype.V = function () {
	      return Infinity == this.g && !this.m;
	    };V.prototype.isLive = V.prototype.V;V.prototype.Xa = function () {
	      return Infinity != this.g && !this.m;
	    };V.prototype.isInProgress = V.prototype.Xa;V.prototype.Mb = function () {
	      if (Infinity == this.h) return this.i;var b = this.pb() - this.h;return Math.max(this.i, b);
	    };
	    V.prototype.getSegmentAvailabilityStart = V.prototype.Mb;V.prototype.fe = function (b) {
	      this.i = b;
	    };V.prototype.setUserSeekStart = V.prototype.fe;V.prototype.pb = function () {
	      return this.V() || this.Xa() ? Math.min(Math.max(0, (Date.now() + this.l) / 1E3 - this.a - this.f), this.g) : this.g;
	    };V.prototype.getSegmentAvailabilityEnd = V.prototype.pb;V.prototype.Lb = function (b) {
	      var c = Math.max(this.c, this.i);if (Infinity == this.h) return c;var d = this.pb() - this.h;b = Math.min(d + b, this.Ba());return Math.max(c, b);
	    };
	    V.prototype.getSafeSeekRangeStart = V.prototype.Lb;V.prototype.ob = function () {
	      return this.Lb(0);
	    };V.prototype.getSeekRangeStart = V.prototype.ob;V.prototype.Ba = function () {
	      var b = this.V() || this.Xa() ? this.rc : 0;return Math.max(0, this.pb() - b);
	    };V.prototype.getSeekRangeEnd = V.prototype.Ba;V.prototype.je = function () {
	      return null == this.f || null != this.b ? !1 : !0;
	    };V.prototype.usingPresentationStartTime = V.prototype.je;function wg(b, c, d, e) {
	      b = Ub(b, e);if (0 != c || null != d) b.headers.Range = d ? "bytes=" + c + "-" + d : "bytes=" + c + "-";return b;
	    }function xg() {
	      var b = this;this.b = this.a = null;this.f = [];this.c = null;this.l = [];this.h = 1;this.m = {};this.s = 0;this.v = new Xa(5);this.i = new C(function () {
	        yg(b);
	      });this.g = new Qb();
	    }A("shaka.dash.DashParser", xg);q = xg.prototype;q.configure = function (b) {
	      this.a = b;
	    };q.start = function (b, c) {
	      var d = this;return t(function f() {
	        var g;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return d.f = [b], d.b = c, u(f, zg(d), 2);case 2:
	              g = f.o;d.b && Ag(d, g);if (!d.b) throw new D(2, 7, 7001);return f["return"](d.c);}
	        });
	      });
	    };
	    q.stop = function () {
	      this.a = this.b = null;this.f = [];this.c = null;this.l = [];this.m = {};null != this.i && (this.i.stop(), this.i = null);return this.g.destroy();
	    };q.update = function () {
	      zg(this)["catch"](function (b) {
	        if (this.b) this.b.onError(b);
	      }.bind(this));
	    };q.onExpirationUpdated = function () {};
	    function zg(b) {
	      var c = Date.now(),
	          d = b.b.networkingEngine.request(0, Ub(b.f, b.a.retryParameters));Rb(b.g, d);return d.promise.then(function (c) {
	        if (b.b) return c.uri && !b.f.includes(c.uri) && b.f.unshift(c.uri), Bg(b, c.data, c.uri);
	      }).then(function () {
	        var d = (Date.now() - c) / 1E3;Ya(b.v, 1, d);return d;
	      });
	    }function Bg(b, c, d) {
	      c = R.Vd(c, "MPD");if (!c) throw new D(2, 4, 4001, d);c = Wf(c, b.a.retryParameters, b.a.dash.xlinkFailGracefully, d, b.b.networkingEngine);Rb(b.g, c);return c.promise.then(function (c) {
	        return Cg(b, c, d);
	      });
	    }
	    function Cg(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n, p, v, x, B, y, E, H, W, aa, fa, Ta, Ia, Z, wa, na, Ua, Aa, eb, Va, fb, gb;return z(f, function (f) {
	          switch (f.j) {case 1:
	              l = sd;m = R;n = [d];p = m.O(c, "Location").map(m.fc).filter(l.Ia);0 < p.length && (v = td(n, p), n = b.f = v);x = m.O(c, "BaseURL").map(m.fc);B = td(n, x);y = b.a.dash.ignoreMinBufferTime;E = 0;y || (E = m.I(c, "minBufferTime", m.Da));b.s = m.I(c, "minimumUpdatePeriod", m.Da, -1);H = m.I(c, "availabilityStartTime", m.zf);W = m.I(c, "timeShiftBufferDepth", m.Da);aa = m.I(c, "maxSegmentDuration", m.Da);
	              fa = c.getAttribute("type") || "static";Ta = b.a.dash.ignoreSuggestedPresentationDelay;Ia = null;Ta || (Ia = m.I(c, "suggestedPresentationDelay", m.Da));b.c ? Z = b.c.presentationTimeline : (wa = Math.max(b.a.dash.defaultPresentationDelay, 1.5 * E), na = null != Ia ? Ia : wa, Z = new V(H, na, b.a.dash.autoCorrectDrift));Ua = { mb: "static" != fa, presentationTimeline: Z, ka: null, S: null, aa: null, B: null, bandwidth: 0, Id: !1 };for (var hb = Ua, vd = B, tb = R.I(c, "mediaPresentationDuration", R.Da), Cb = [], Ja = 0, xc = R.O(c, "Period"), Wa = 0; Wa < xc.length; Wa++) {
	                var Db = xc[Wa];
	                Ja = R.I(Db, "start", R.Da, Ja);var wd = R.I(Db, "duration", R.Da),
	                    ub = null;if (Wa != xc.length - 1) {
	                  var Rh = R.I(xc[Wa + 1], "start", R.Da);null != Rh && (ub = Rh - Ja);
	                } else null != tb && (ub = tb - Ja);null == ub && (ub = wd);Db = Dg(b, hb, vd, { start: Ja, duration: ub, node: Db, Vc: null == ub || Wa == xc.length - 1 });Cb.push(Db);wd = hb.ka.id;b.l.includes(wd) || (b.l.push(wd), b.c && (b.b.filterNewPeriod(Db), b.c.periods.push(Db)));if (null == ub) {
	                  Ja = null;break;
	                }Ja += ub;
	              }null == b.c && b.b.filterAllPeriods(Cb);null != tb ? (g = Cb, h = tb, k = !1) : (g = Cb, h = Ja, k = !0);Aa = h;eb = g;Z.Vb("static" == fa);"static" != fa && k || Z.wa(Aa || Infinity);(Va = Z.V()) && !isNaN(b.a.availabilityWindowOverride) && (W = b.a.availabilityWindowOverride);null == W && (W = Infinity);Z.sd(W);Z.$c(aa || 1);if (b.c) {
	                f.A(0);break;
	              }b.c = { presentationTimeline: Z, periods: eb, offlineSessionIds: [], minBufferTime: E || 0 };if (!Z.je()) {
	                f.A(0);break;
	              }fb = m.O(c, "UTCTiming");return u(f, Eg(b, B, fb), 4);case 4:
	              gb = f.o;if (!b.b) return f["return"]();Z.ee(gb);w(f);}
	        });
	      });
	    }
	    function Dg(b, c, d, e) {
	      c.ka = Fg(e.node, null, d);c.S = e;c.ka.id || (c.ka.id = "__shaka_period_" + e.start);R.O(e.node, "EventStream").forEach(b.Af.bind(b, e.start, e.duration));d = R.O(e.node, "AdaptationSet").map(b.yf.bind(b, c)).filter(sd.Ia);if (c.mb) {
	        c = [];for (var f = r(d), g = f.next(); !g.done; g = f.next()) {
	          g = r(g.value.Kf);for (var h = g.next(); !h.done; h = g.next()) c.push(h.value);
	        }if (c.length != new Set(c).size) throw new D(2, 4, 4018);
	      }var k = d.filter(function (b) {
	        return !b.wd;
	      });d.filter(function (b) {
	        return b.wd;
	      }).forEach(function (b) {
	        var c = b.streams[0],
	            d = b.wd;k.forEach(function (b) {
	          b.id == d && b.streams.forEach(function (b) {
	            b.trickModeVideo = c;
	          });
	        });
	      });c = Gg(k, "video");f = Gg(k, "audio");if (!c.length && !f.length) throw new D(2, 4, 4004);d = b.a.disableAudio;if (!f.length || d) f = [null];d = b.a.disableVideo;if (!c.length || d) c = [null];d = [];for (g = 0; g < f.length; g++) for (h = 0; h < c.length; h++) Hg(b, f[g], c[h], d);c = [];if (!b.a.disableText) for (b = Gg(k, "text"), f = 0; f < b.length; f++) c.push.apply(c, b[f].streams);return { startTime: e.start, textStreams: c, variants: d };
	    }
	    function Gg(b, c) {
	      return b.filter(function (b) {
	        return b.contentType == c;
	      });
	    }
	    function Hg(b, c, d, e) {
	      if (c || d) if (c && d) {
	        var f = c.drmInfos;var g = d.drmInfos;if (f.length && g.length ? 0 < ld(f, g).length : 1) {
	          g = ld(c.drmInfos, d.drmInfos);for (var h = 0; h < c.streams.length; h++) for (var k = 0; k < d.streams.length; k++) f = (d.streams[k].bandwidth || 0) + (c.streams[h].bandwidth || 0), f = { id: b.h++, language: c.language, primary: c.Wc || d.Wc, audio: c.streams[h], video: d.streams[k], bandwidth: f, drmInfos: g, allowedByApplication: !0, allowedByKeySystem: !0 }, e.push(f);
	        }
	      } else for (g = c || d, h = 0; h < g.streams.length; h++) f = g.streams[h].bandwidth || 0, f = { id: b.h++, language: g.language || "und", primary: g.Wc, audio: c ? g.streams[h] : null, video: d ? g.streams[h] : null, bandwidth: f, drmInfos: g.drmInfos, allowedByApplication: !0, allowedByKeySystem: !0 }, e.push(f);
	    }
	    q.yf = function (b, c) {
	      b.aa = Fg(c, b.ka, null);if ("image" == b.aa.contentType) return null;var d = !1,
	          e = R.O(c, "Role"),
	          f = e.map(function (b) {
	        return b.getAttribute("value");
	      }).filter(sd.Ia),
	          g = void 0,
	          h = "text" == b.aa.contentType;h && (g = "subtitle");for (var k = 0; k < e.length; k++) {
	        var l = e[k].getAttribute("schemeIdUri");if (null == l || "urn:mpeg:dash:role:2011" == l) switch (l = e[k].getAttribute("value"), l) {case "main":
	            d = !0;break;case "caption":case "subtitle":
	            g = l;}
	      }var m = null,
	          n = !1;R.O(c, "EssentialProperty").forEach(function (b) {
	        "http://dashif.org/guidelines/trickmode" == b.getAttribute("schemeIdUri") ? m = b.getAttribute("value") : n = !0;
	      });k = R.O(c, "Accessibility");var p = new Map();e = {};k = r(k);for (l = k.next(); !l.done; e = { Hb: e.Hb }, l = k.next()) {
	        var v = l.value;l = v.getAttribute("schemeIdUri");v = v.getAttribute("value");"urn:scte:dash:cc:cea-608:2015" == l || "urn:scte:dash:cc:cea-708:2015" == l ? (e.Hb = 1, null != v ? v.split(";").forEach(function (b) {
	          return function (c) {
	            if (c.includes("=")) {
	              c = c.split("=");var d = c[0].startsWith("CC") ? c[0] : "CC" + c[0];c = c[1].split(",")[0].split(":").pop();
	            } else d = "CC" + b.Hb, b.Hb += 2;p.set(d, M(c));
	          };
	        }(e)) : p.set("CC1", "und")) : "urn:mpeg:dash:role:2011" == l && null != v && (f.push(v), "captions" == v && (g = "caption"));
	      }if (n) return null;e = R.O(c, "ContentProtection");var x = Jf(e, this.a.dash.customScheme, this.a.dash.ignoreDrmInfo);e = M(c.getAttribute("lang") || "und");k = c.getAttribute("label");(l = R.O(c, "Label")) && l.length && (l = l[0], l.textContent && (k = l.textContent));l = R.O(c, "Representation");f = l.map(this.Bf.bind(this, b, x, g, e, k, d, f, p)).filter(function (b) {
	        return !!b;
	      });if (0 == f.length) {
	        if (h) return null;
	        throw new D(2, 4, 4003);
	      }b.aa.contentType && "application" != b.aa.contentType || (b.aa.contentType = Ig(f[0].mimeType, f[0].codecs), f.forEach(function (c) {
	        c.type = b.aa.contentType;
	      }));f.forEach(function (b) {
	        x.drmInfos.forEach(function (c) {
	          b.keyId && c.keyIds.push(b.keyId);
	        });
	      });h = l.map(function (b) {
	        return b.getAttribute("id");
	      }).filter(sd.Ia);return { id: b.aa.id || "__fake__" + this.h++, contentType: b.aa.contentType, language: e, Wc: d, streams: f, drmInfos: x.drmInfos, wd: m, Kf: h };
	    };
	    q.Bf = function (b, c, d, e, f, g, h, k, l) {
	      b.B = Fg(l, b.aa, null);if (!Jg(b.B)) return null;b.bandwidth = R.I(l, "bandwidth", R.pc) || 0;var m = b.B.contentType;m = "text" == m || "application" == m;try {
	        var n = this.Lf.bind(this);if (b.B.Sb) var p = kg(b, n);else if (b.B.La) p = ng(b, this.m);else if (b.B.Ub) p = rg(b, n, this.m, !!this.c);else {
	          var v = b.B.pa,
	              x = b.S.duration || 0;p = { createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function (b) {
	              return 0 <= b && b < x ? 1 : null;
	            }, getSegmentReference: function (b) {
	              return 1 != b ? null : new S(1, 0, x, function () {
	                return v;
	              }, 0, null);
	            }, initSegmentReference: null, ma: 0 };
	        }
	      } catch (B) {
	        if (m && 4002 == B.code) return null;throw B;
	      }l = R.O(l, "ContentProtection");l = Mf(l, this.a.dash.customScheme, c, this.a.dash.ignoreDrmInfo);return { id: this.h++, originalId: b.B.id, createSegmentIndex: p.createSegmentIndex, findSegmentPosition: p.findSegmentPosition, getSegmentReference: p.getSegmentReference, initSegmentReference: p.initSegmentReference, presentationTimeOffset: p.ma, mimeType: b.B.mimeType, codecs: b.B.codecs, frameRate: b.B.frameRate, bandwidth: b.bandwidth, width: b.B.width,
	        height: b.B.height, kind: d, encrypted: 0 < c.drmInfos.length, keyId: l, language: e, label: f, type: b.aa.contentType, primary: g, trickModeVideo: null, emsgSchemeIdUris: b.B.emsgSchemeIdUris, roles: h, channelsCount: b.B.bd, audioSamplingRate: b.B.audioSamplingRate, closedCaptions: k };
	    };
	    function yg(b) {
	      t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = 0, xa(d, 2), u(d, zg(b), 4);case 4:
	              e = d.o;za(d, 3);break;case 2:
	              f = Ba(d), b.b && (f.severity = 1, b.b.onError(f));case 3:
	              if (!b.b) return d["return"]();Ag(b, e);w(d);}
	        });
	      });
	    }function Ag(b, c) {
	      0 > b.s || b.i.P(Math.max(3, b.s - c, Za(b.v)));
	    }
	    function Fg(b, c, d) {
	      c = c || { contentType: "", mimeType: "", codecs: "", emsgSchemeIdUris: [], frameRate: void 0, bd: null, audioSamplingRate: null };d = d || c.pa;var e = R.xb,
	          f = R.Ce,
	          g = R.O(b, "BaseURL").map(R.fc),
	          h = b.getAttribute("contentType") || c.contentType,
	          k = b.getAttribute("mimeType") || c.mimeType,
	          l = b.getAttribute("codecs") || c.codecs;f = R.I(b, "frameRate", f) || c.frameRate;var m = R.O(b, "InbandEventStream"),
	          n = c.emsgSchemeIdUris.slice();m = r(m);for (var p = m.next(); !p.done; p = m.next()) p = p.value.getAttribute("schemeIdUri"), n.includes(p) || n.push(p);m = R.O(b, "AudioChannelConfiguration");m = Kg(m) || c.bd;p = R.I(b, "audioSamplingRate", e) || c.audioSamplingRate;h || (h = Ig(k, l));return { pa: td(d, g), Sb: R.dc(b, "SegmentBase") || c.Sb, La: R.dc(b, "SegmentList") || c.La, Ub: R.dc(b, "SegmentTemplate") || c.Ub, width: R.I(b, "width", e) || c.width, height: R.I(b, "height", e) || c.height, contentType: h, mimeType: k, codecs: l, frameRate: f, emsgSchemeIdUris: n, id: b.getAttribute("id"), bd: m, audioSamplingRate: p };
	    }
	    function Kg(b) {
	      for (var c = 0; c < b.length; ++c) {
	        var d = b[c],
	            e = d.getAttribute("schemeIdUri");if (e && (d = d.getAttribute("value"))) switch (e) {case "urn:mpeg:dash:outputChannelPositionList:2012":
	            return d.trim().split(/ +/).length;case "urn:mpeg:dash:23003:3:audio_channel_configuration:2011":case "urn:dts:dash:audio_channel_configuration:2012":
	            e = parseInt(d, 10);if (!e) continue;return e;case "tag:dolby.com,2014:dash:audio_channel_configuration:2011":case "urn:dolby:dash:audio_channel_configuration:2011":
	            if (e = parseInt(d, 16)) {
	              for (b = 0; e;) e & 1 && ++b, e >>= 1;return b;
	            }}
	      }return null;
	    }function Jg(b) {
	      var c = b.Sb ? 1 : 0;c += b.La ? 1 : 0;c += b.Ub ? 1 : 0;if (0 == c) return "text" == b.contentType || "application" == b.contentType ? !0 : !1;1 != c && (b.Sb && (b.La = null), b.Ub = null);return !0;
	    }
	    function Lg(b, c, d, e) {
	      c = td(c, [d]);c = Ub(c, b.a.retryParameters);c.method = e;c = b.b.networkingEngine.request(4, c);Rb(b.g, c);return c.promise.then(function (b) {
	        if ("HEAD" == e) {
	          if (!b.headers || !b.headers.date) return 0;b = b.headers.date;
	        } else b = Ac(b.data);b = Date.parse(b);return isNaN(b) ? 0 : b - Date.now();
	      });
	    }
	    function Eg(b, c, d) {
	      d = d.map(function (b) {
	        return { scheme: b.getAttribute("schemeIdUri"), value: b.getAttribute("value") };
	      });var e = b.a.dash.clockSyncUri;!d.length && e && d.push({ scheme: "urn:mpeg:dash:utc:http-head:2014", value: e });return sd.Ae(d, function (b) {
	        var d = b.scheme;b = b.value;switch (d) {case "urn:mpeg:dash:utc:http-head:2014":case "urn:mpeg:dash:utc:http-head:2012":
	            return Lg(this, c, b, "HEAD");case "urn:mpeg:dash:utc:http-xsdate:2014":case "urn:mpeg:dash:utc:http-iso:2014":case "urn:mpeg:dash:utc:http-xsdate:2012":case "urn:mpeg:dash:utc:http-iso:2012":
	            return Lg(this, c, b, "GET");case "urn:mpeg:dash:utc:direct:2014":case "urn:mpeg:dash:utc:direct:2012":
	            return d = Date.parse(b), isNaN(d) ? 0 : d - Date.now();case "urn:mpeg:dash:utc:http-ntp:2014":case "urn:mpeg:dash:utc:ntp:2014":case "urn:mpeg:dash:utc:sntp:2014":
	            return bb("NTP UTCTiming scheme is not supported"), Promise.reject();default:
	            return bb("Unrecognized scheme in UTCTiming element", d), Promise.reject();}
	      }.bind(b))["catch"](function () {
	        bb("A UTCTiming element should always be given in live manifests! This content may not play on clients with bad clocks!");
	        return 0;
	      });
	    }q.Af = function (b, c, d) {
	      var e = R.xb,
	          f = d.getAttribute("schemeIdUri") || "",
	          g = d.getAttribute("value") || "",
	          h = R.I(d, "timescale", e) || 1;R.O(d, "Event").forEach(function (d) {
	        var k = R.I(d, "presentationTime", e) || 0,
	            m = R.I(d, "duration", e) || 0;k = k / h + b;m = k + m / h;null != c && (k = Math.min(k, b + c), m = Math.min(m, b + c));d = { schemeIdUri: f, value: g, startTime: k, endTime: m, id: d.getAttribute("id") || "", eventElement: d };this.b.onTimelineRegionAdded(d);
	      }.bind(this));
	    };
	    q.Lf = function (b, c, d) {
	      b = wg(b, c, d, this.a.retryParameters);b = this.b.networkingEngine.request(1, b);Rb(this.g, b);return b.promise.then(function (b) {
	        return b.data;
	      });
	    };function Ig(b, c) {
	      return Wd(pc(b, c)) ? "text" : b.split("/")[0];
	    }U.kd("mpd", xg);U.Bb("application/dash+xml", xg);U.Bb("video/vnd.mpeg.dash.mpd", xg);function Mg(b, c, d, e) {
	      this.b = b;this.type = c;this.a = d;this.segments = e || null;
	    }function Ng(b, c, d, e) {
	      this.id = b;this.name = c;this.a = d;this.value = void 0 === e ? null : e;
	    }Ng.prototype.toString = function () {
	      function b(b) {
	        return b.name + "=" + (isNaN(Number(b.value)) ? '"' + b.value + '"' : b.value);
	      }var c = "#" + this.name,
	          d = this.a ? this.a.map(b) : [];this.value && d.unshift(this.value);0 < d.length && (c += ":" + d.join(","));return c;
	    };function Og(b, c) {
	      this.name = b;this.value = c;
	    }
	    Ng.prototype.getAttribute = function (b) {
	      var c = this.a.filter(function (c) {
	        return c.name == b;
	      });return c.length ? c[0] : null;
	    };function Pg(b, c, d) {
	      return (b = b.getAttribute(c)) ? b.value : d || null;
	    }function Qg(b, c) {
	      this.b = c;this.a = b;
	    }var Rg = { nb: function (b, c) {
	        return b.filter(function (b) {
	          return b.name == c;
	        });
	      }, Ta: function (b, c) {
	        var d = Rg.nb(b, c);return d.length ? d[0] : null;
	      }, Lc: function (b, c, d) {
	        return b.filter(function (b) {
	          var e = b.getAttribute("TYPE");b = b.getAttribute("GROUP-ID");return e.value == c && b.value == d;
	        });
	      }, Dc: function (b, c) {
	        return td([b], [c])[0];
	      }, Uc: function (b) {
	        return (/^#(?!EXT)/m.test(b)
	        );
	      } };function Sg(b) {
	      this.b = b;this.a = 0;
	    }function Tg(b) {
	      Ug(b, /[ \t]+/gm);
	    }function Ug(b, c) {
	      c.lastIndex = b.a;var d = c.exec(b.b);d = null == d ? null : { position: d.index, length: d[0].length, Nf: d };if (b.a == b.b.length || null == d || d.position != b.a) return null;b.a += d.length;return d.Nf;
	    }function Vg(b) {
	      return b.a == b.b.length ? null : (b = Ug(b, /[^ \t\n]*/gm)) ? b[0] : null;
	    }function Wg() {
	      this.a = 0;
	    }
	    function Xg(b, c, d) {
	      c = Ac(c);c = c.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n").trim();var e = c.split(/\n+/m);if (!/^#EXTM3U($|[ \t\n])/m.test(e[0])) throw new D(2, 4, 4015);c = 0;for (var f = 1; f < e.length; f++) if (!Rg.Uc(e[f])) {
	        var g = Yg(b, e[f]);--b.a;if (Zg.includes(g.name)) {
	          c = 1;break;
	        } else "EXT-X-STREAM-INF" == g.name && (f += 1);
	      }f = [];for (g = 1; g < e.length;) if (Rg.Uc(e[g])) g += 1;else {
	        var h = Yg(b, e[g]);if ($g.includes(h.name)) {
	          if (1 != c) throw new D(2, 4, 4017);e = e.splice(g, e.length - g);b = ah(b, d, e, f);return new Mg(d, c, f, b);
	        }f.push(h);g += 1;"EXT-X-STREAM-INF" == h.name && (h.a.push(new Og("URI", e[g])), g += 1);
	      }return new Mg(d, c, f);
	    }function ah(b, c, d, e) {
	      var f = [],
	          g = [];d.forEach(function (d) {
	        if (/^(#EXT)/.test(d)) d = Yg(b, d), Zg.includes(d.name) ? e.push(d) : g.push(d);else {
	          if (Rg.Uc(d)) return [];d = Rg.Dc(c, d.trim());f.push(new Qg(d, g));g = [];
	        }
	      });return f;
	    }
	    function Yg(b, c) {
	      var d = b.a++,
	          e = c.match(/^#(EXT[^:]*)(?::(.*))?$/);if (!e) throw new D(2, 4, 4016, c);var f = e[1],
	          g = e[2];e = [];var h;if (g) {
	        g = new Sg(g);var k;(k = Ug(g, /^([^,=]+)(?:,|$)/g)) && (h = k[1]);for (var l = /([^=]+)=(?:"([^"]*)"|([^",]*))(?:,|$)/g; k = Ug(g, l);) e.push(new Og(k[1], k[2] || k[3]));
	      }return new Ng(d, f, e, h);
	    }var Zg = "EXT-X-TARGETDURATION EXT-X-MEDIA-SEQUENCE EXT-X-DISCONTINUITY-SEQUENCE EXT-X-PLAYLIST-TYPE EXT-X-MAP EXT-X-I-FRAMES-ONLY EXT-X-ENDLIST".split(" "),
	        $g = "EXTINF EXT-X-BYTERANGE EXT-X-DISCONTINUITY EXT-X-PROGRAM-DATE-TIME EXT-X-KEY EXT-X-DATERANGE".split(" ");function bh(b) {
	      try {
	        var c = bh.parse(b);return Fb({ uri: b, fd: b, data: c.data, headers: { "content-type": c.contentType } });
	      } catch (d) {
	        return Bb(d);
	      }
	    }A("shaka.net.DataUriPlugin", bh);
	    bh.parse = function (b) {
	      var c = b.split(":");if (2 > c.length || "data" != c[0]) throw new D(2, 1, 1004, b);c = c.slice(1).join(":").split(",");if (2 > c.length) throw new D(2, 1, 1004, b);var d = c[0];c = window.decodeURIComponent(c.slice(1).join(","));d = d.split(";");var e = null;1 < d.length && (e = d[1]);if ("base64" == e) b = L.Aa(c).buffer;else {
	        if (e) throw new D(2, 1, 1005, b);b = Dc(c);
	      }return { data: b, contentType: d[0] };
	    };Tb("data", bh);function ch() {
	      var b = this;this.a = this.g = null;this.$ = 1;this.D = new Map();this.T = new Set();this.b = new Map();this.c = null;this.v = "";this.s = new Wg();this.R = 0;this.h = new C(function () {
	        dh(b);
	      });this.f = eh;this.m = null;this.C = 0;this.F = Infinity;this.i = new Qb();this.L = [];this.l = new Map();this.W = !1;
	    }A("shaka.hls.HlsParser", ch);q = ch.prototype;q.configure = function (b) {
	      this.a = b;
	    };
	    q.start = function (b, c) {
	      var d = this;return t(function f() {
	        var g, h;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return d.g = c, u(f, fh(d, Ub([b], d.a.retryParameters), 0), 2);case 2:
	              return g = f.o, d.v = g.uri, u(f, gh(d, g.data), 3);case 3:
	              return h = d.R, 0 < h && d.h.P(h), f["return"](d.m);}
	        });
	      });
	    };q.stop = function () {
	      this.h && (this.h.stop(), this.h = null);var b = [];this.i && (b.push(this.i.destroy()), this.i = null);this.a = this.g = null;this.D.clear();this.T.clear();this.b.clear();this.m = null;return Promise.all(b);
	    };
	    q.update = function () {
	      if (this.f != hh.Qa) {
	        for (var b = [], c = r(this.b.values()), d = c.next(); !d.done; d = c.next()) b.push(ih(this, d.value));return Promise.all(b);
	      }
	    };
	    function ih(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n, p, v, x, B;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = Rg, g = hh, h = c.re, u(e, fh(b, Ub([h], b.a.retryParameters), 0), 2);case 2:
	              k = e.o;l = Xg(b.s, k.data, k.uri);if (1 != l.type) throw new D(2, 4, 4017);n = (m = f.Ta(l.a, "EXT-X-MEDIA-SEQUENCE")) ? Number(m.value) : 0;p = c.stream;return u(e, jh(b, c.xc, l, n, p.mimeType, p.codecs), 3);case 3:
	              v = e.o;c.Tb.a = v;x = v[v.length - 1];if (B = f.Ta(l.a, "EXT-X-ENDLIST")) kh(b, g.Qa), b.c.wa(x.endTime);w(e);}
	        });
	      });
	    }q.onExpirationUpdated = function () {};
	    function gh(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n, p, v, x, B;return z(e, function (e) {
	          switch (e.j) {case 1:
	              f = Xg(b.s, c, b.v);if (0 != f.type) throw new D(2, 4, 4022);return u(e, lh(b, f), 2);case 2:
	              g = e.o;if (!b.g) throw new D(2, 7, 7001);if (b.W && 0 == g.variants.length) throw new D(2, 4, 4034);b.g.filterAllPeriods([g]);h = Infinity;k = 0;l = Infinity;for (var E = r(b.b.values()), y = E.next(); !y.done; y = E.next()) m = y.value, h = Math.min(h, m.Zc), k = Math.max(k, m.Zc), "text" != m.stream.type && (l = Math.min(l, m.duration));b.f != hh.Qa ? (b.c = new V(0, 3 * b.C), b.c.Vb(!1)) : (b.c = new V(null, 0), b.c.Vb(!0));mh(b);if (b.f != hh.Qa) {
	                b.R = b.F;n = hh;b.f == n.zd && (p = b.c.rc, isNaN(b.a.availabilityWindowOverride) || (p = b.a.availabilityWindowOverride), b.c.sd(p));for (v = 0; 95443.7176888889 <= k;) v += 95443.7176888889, k -= 95443.7176888889;if (v) for (E = r(b.b.values()), y = E.next(); !y.done; y = E.next()) x = y.value, 95443.7176888889 > x.Zc && (x.stream.presentationTimeOffset = -v, x.Tb.offset(v));
	              } else for (b.c.wa(l), b.c.offset(-h), E = r(b.b.values()), y = E.next(); !y.done; y = E.next()) B = y.value, B.stream.presentationTimeOffset = h, B.Tb.offset(-h), $f(B.Tb, l);b.m = { presentationTimeline: b.c, periods: [g], offlineSessionIds: [], minBufferTime: 0 };w(e);}
	        });
	      });
	    }
	    function lh(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n, p, v, x, B, y;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = Rg, g = sd, h = c.a, k = f.nb(c.a, "EXT-X-MEDIA"), l = k.filter(function (b) {
	                return "SUBTITLES" == nh(b, "TYPE");
	              }.bind(b)), m = l.map(function (b) {
	                var c = this;return t(function fa() {
	                  var e;return z(fa, function (f) {
	                    switch (f.j) {case 1:
	                        if (c.a.disableText) return f["return"](null);xa(f, 2);return u(f, oh(c, b), 4);case 4:
	                        return f["return"](f.o);case 2:
	                        e = Ba(f);if (c.a.hls.ignoreTextStreamFailures) return f["return"](null);
	                        throw e;}
	                  });
	                });
	              }.bind(b)), n = k.filter(function (b) {
	                return "CLOSED-CAPTIONS" == nh(b, "TYPE");
	              }), ph(b, n), u(e, Promise.all(m), 2);case 2:
	              return p = e.o, v = f.nb(h, "EXT-X-STREAM-INF"), x = v.map(function (b) {
	                return qh(this, b, c);
	              }.bind(b)), u(e, Promise.all(x), 3);case 3:
	              return B = e.o, y = B.reduce(g.Cc, []), y = y.filter(function (b) {
	                return null != b;
	              }), e["return"]({ startTime: 0, variants: y, textStreams: p.filter(function (b) {
	                  return null != b;
	                }) });}
	        });
	      });
	    }
	    function qh(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n, p, v, x, B, y, E, H, W, aa, fa, Ta, Ia, Z, wa, na, Ua, Aa, eb, Va, fb, gb;return z(f, function (f) {
	          switch (f.j) {case 1:
	              g = xd;h = Rg;k = Pg(c, "CODECS", "avc1.42E01E,mp4a.40.2");l = rh(k.split(/\s*,\s*/));m = c.getAttribute("RESOLUTION");p = n = null;v = Pg(c, "FRAME-RATE");x = Number(nh(c, "BANDWIDTH"));m && (B = m.value.split("x"), n = B[0], p = B[1]);y = h.nb(d.a, "EXT-X-MEDIA");y = y.filter(function (b) {
	                return "CLOSED-CAPTIONS" != nh(b, "TYPE");
	              });y = y.filter(function (b) {
	                var c = Pg(b, "URI") || "";return "SUBTITLES" == (Pg(b, "TYPE") || "") || "" != c;
	              });E = Pg(c, "AUDIO");H = Pg(c, "VIDEO");E ? y = h.Lc(y, "AUDIO", E) : H && (y = h.Lc(y, "VIDEO", H));if (W = sh(g.qa, l)) {
	                if (aa = Pg(c, "SUBTITLES")) if (fa = h.Lc(y, "SUBTITLES", aa), fa.length && (Ta = b.D.get(fa[0].id))) Ta.stream.codecs = W;Nb(l, W);
	              }Ia = y.map(function (b) {
	                return th(this, b, l);
	              }.bind(b));Z = [];wa = [];return u(f, Promise.all(Ia), 2);case 2:
	              Ua = f.o;Ua = Ua.filter(function (b) {
	                return null != b;
	              });E ? Z = Ua : H && (wa = Ua);eb = !1;Z.length || wa.length ? Z.length ? (fb = nh(c, "URI"), gb = Z[0].xc, fb == gb ? (Aa = g.Db, eb = !0) : Aa = g.Pa) : Aa = g.Db : 1 == l.length ? (Va = sh(g.Pa, l), Aa = m || v || Va ? g.Pa : g.Db) : (Aa = g.Pa, l = [l.join(",")]);if (eb) {
	                f.A(3);break;
	              }return u(f, uh(b, c, l, Aa), 4);case 4:
	              na = f.o;case 3:
	              if (na) na.stream.type == g.Db ? Z = [na] : wa = [na];else if (null === na) return f["return"]([]);wa && vh(wa);Z && vh(Z);return f["return"](wh(b, Z, wa, x, n, p, v));}
	        });
	      });
	    }function vh(b) {
	      b.forEach(function (b) {
	        var c = b.stream.codecs.split(",");c = c.filter(function (b) {
	          return "mp4a.40.34" != b;
	        });b.stream.codecs = c.join(",");
	      });
	    }
	    function wh(b, c, d, e, f, g, h) {
	      d.forEach(function (b) {
	        if (b = b.stream) b.width = Number(f) || void 0, b.height = Number(g) || void 0, b.frameRate = Number(h) || void 0;
	      }.bind(b));var k = b.a ? b.a.disableAudio : !1;if (!c.length || k) c = [null];k = b.a ? b.a.disableVideo : !1;if (!d.length || k) d = [null];k = [];c = r(c);for (var l = c.next(); !l.done; l = c.next()) {
	        l = l.value;for (var m = r(d), n = m.next(); !n.done; n = m.next()) {
	          var p = n.value;n = l ? l.stream : null;var v = p ? p.stream : null,
	              x = l ? l.drmInfos : null,
	              B = p ? p.drmInfos : null;p = (p ? p.xc : "") + " - " + (l ? l.xc : "");var y = void 0;if (n && v) {
	            if (x.length && B.length ? 0 < ld(x, B).length : 1) y = ld(x, B);else continue;
	          } else n ? y = x : v && (y = B);b.T.has(p) || (n = xh(b, n, v, e, y), k.push(n), b.T.add(p));
	        }
	      }return k;
	    }function xh(b, c, d, e, f) {
	      return { id: b.$++, language: c ? c.language : "und", primary: !!c && c.primary || !!d && d.primary, audio: c, video: d, bandwidth: e, drmInfos: f, allowedByApplication: !0, allowedByKeySystem: !0 };
	    }
	    function oh(b, c) {
	      return t(function e() {
	        var f;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return nh(c, "TYPE"), u(e, th(b, c, []), 2);case 2:
	              return f = e.o, e["return"](f.stream);}
	        });
	      });
	    }function ph(b, c) {
	      for (var d = r(c), e = d.next(); !e.done; e = d.next()) {
	        e = e.value;nh(e, "TYPE");var f = Pg(e, "LANGUAGE") || "und";f = M(f);var g = nh(e, "GROUP-ID");e = nh(e, "INSTREAM-ID");b.l.get(g) || b.l.set(g, new Map());b.l.get(g).set(e, f);
	      }
	    }
	    function th(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n, p, v, x, B, y;return z(f, function (f) {
	          switch (f.j) {case 1:
	              g = nh(c, "URI");if (b.b.has(g)) return f["return"](b.b.get(g));h = nh(c, "TYPE").toLowerCase();k = xd;"subtitles" == h && (h = k.qa);l = M(Pg(c, "LANGUAGE", "und"));m = Pg(c, "NAME");n = c.getAttribute("DEFAULT");p = c.getAttribute("AUTOSELECT");v = Pg(c, "CHANNELS");if ("audio" == h) {
	                if (v) {
	                  var E = v.split("/")[0];E = parseInt(E, 10);
	                } else E = null;
	              } else E = null;x = E;B = !!n || !!p;return u(f, yh(b, g, d, h, l, B, m, x, null), 2);case 2:
	              y = f.o;if (null == y) return f["return"](null);if (b.b.has(g)) return f["return"](b.b.get(g));b.D.set(c.id, y);b.b.set(g, y);return f["return"](y);}
	        });
	      });
	    }
	    function uh(b, c, d, e) {
	      return t(function g() {
	        var h, k, l, m, n;return z(g, function (g) {
	          switch (g.j) {case 1:
	              h = xd;k = nh(c, "URI");if (b.b.has(k)) return g["return"](b.b.get(k));l = Pg(c, "CLOSED-CAPTIONS");m = null;e == h.Pa && l && "NONE" != l && (m = b.l.get(l));return u(g, yh(b, k, d, e, "und", !1, null, null, m), 2);case 2:
	              n = g.o;if (null == n) return g["return"](null);if (b.b.has(k)) return g["return"](b.b.get(k));b.b.set(k, n);return g["return"](n);}
	        });
	      });
	    }
	    function yh(b, c, d, e, f, g, h, k, l) {
	      return t(function n() {
	        var p, v, x, B, y, E, H, W, aa, fa, Ta, Ia, Z, wa, na, Ua, Aa, eb, Va, fb, gb, vd, hb, Qh, tb, Cb;return z(n, function (n) {
	          switch (n.j) {case 1:
	              return p = Rg, v = p.Dc(b.v, c), B = "", u(n, fh(b, Ub([v], b.a.retryParameters), 0), 2);case 2:
	              E = n.o;v = E.uri;x = Xg(b.s, E.data, v);if (1 != x.type) throw new D(2, 4, 4017);H = [];x.segments.forEach(function (b) {
	                b = p.nb(b.b, "EXT-X-KEY");H.push.apply(H, b);
	              });W = !1;aa = [];fa = null;for (var Ja = r(H), Wa = Ja.next(); !Wa.done; Wa = Ja.next()) if (Ta = Wa.value, Ia = nh(Ta, "METHOD"), "NONE" != Ia) {
	                W = !0;if ("AES-128" == Ia) return b.W = !0, n["return"](null);Z = nh(Ta, "KEYFORMAT");if (na = (wa = zh[Z]) ? wa(Ta) : null) na.keyIds.length && (fa = na.keyIds[0]), aa.push(na);
	              }if (W && !aa.length) throw new D(2, 4, 4026);Ah(b, x);B = Bh(e, d);return u(n, Ch(b, e, B, x), 3);case 3:
	              return y = Ua = n.o, eb = (Aa = p.Ta(x.a, "EXT-X-MEDIA-SEQUENCE")) ? Number(Aa.value) : 0, u(n, jh(b, c, x, eb, y, B), 4);case 4:
	              return Va = n.o, fb = Va[0].startTime, gb = Va[Va.length - 1].endTime, vd = gb - fb, hb = new T(Va), Qh = Dh(x), tb = void 0, "text" == e && (tb = "subtitle"), Cb = { id: b.$++,
	                originalId: h, createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: hb.find.bind(hb), getSegmentReference: hb.get.bind(hb), initSegmentReference: Qh, presentationTimeOffset: 0, mimeType: y, codecs: B, kind: tb, encrypted: W, keyId: fa, language: f, label: h, type: e, primary: g, trickModeVideo: null, emsgSchemeIdUris: null, frameRate: void 0, width: void 0, height: void 0, bandwidth: void 0, roles: [], channelsCount: k, audioSamplingRate: null, closedCaptions: l }, n["return"]({ stream: Cb, Tb: hb, drmInfos: aa, xc: c, re: v, Zc: fb, vg: gb,
	                duration: vd });}
	        });
	      });
	    }function Ah(b, c) {
	      var d = hh,
	          e = Rg.Ta(c.a, "EXT-X-PLAYLIST-TYPE"),
	          f = Rg.Ta(c.a, "EXT-X-ENDLIST");f = e && "VOD" == e.value || f;e = e && "EVENT" == e.value && !f;e = !f && !e;f ? kh(b, d.Qa) : (e ? kh(b, d.zd) : kh(b, d.me), d = Eh(c.a, "EXT-X-TARGETDURATION"), d = Number(d.value), b.C = Math.max(d, b.C), b.F = Math.min(d, b.F));
	    }
	    function Dh(b) {
	      var c = Rg.nb(b.a, "EXT-X-MAP");if (!c.length) return null;if (1 < c.length) throw new D(2, 4, 4020);c = c[0];var d = nh(c, "URI"),
	          e = Rg.Dc(b.b, d);b = 0;d = null;if (c = Pg(c, "BYTERANGE")) b = c.split("@"), c = Number(b[0]), b = Number(b[1]), d = b + c - 1;return new Xf(function () {
	        return [e];
	      }, b, d);
	    }
	    function Fh(b, c, d, e) {
	      var f = c.b,
	          g = c.a;c = Eh(f, "EXTINF").value.split(",");c = e + Number(c[0]);var h = 0,
	          k = null;if (f = Rg.Ta(f, "EXT-X-BYTERANGE")) h = f.value.split("@"), f = Number(h[0]), h = h[1] ? Number(h[1]) : b.a + 1, k = h + f - 1;return new S(d, e, c, function () {
	        return [g];
	      }, h, k);
	    }function mh(b) {
	      b.c && (b.L.forEach(function (c) {
	        b.c.ub(c, 0);
	      }), b.L = []);
	    }
	    function jh(b, c, d, e, f, g) {
	      return t(function k() {
	        var l, m, n, p, v, x, B, y, E, H, W;return z(k, function (k) {
	          switch (k.j) {case 1:
	              return l = d.segments, m = [], n = l[0].a, p = Fh(null, l[0], e, 0), v = Dh(d), u(k, Gh(b, c, v, p, f, g), 2);case 2:
	              x = k.o;n.split("/").pop();for (var aa = 0; aa < l.length; ++aa) B = l[aa], y = m[m.length - 1], E = 0 == aa ? x : y.endTime, H = e + aa, W = Fh(y, B, H, E), m.push(W);b.L.push(m);mh(b);return k["return"](m);}
	        });
	      });
	    }
	    function Hh(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = 1, g = wg(c.c(), c.b, c.b + 2048 - 1, b.a.retryParameters), h = wg(c.c(), c.b, c.a, b.a.retryParameters), xa(e, 2), u(e, fh(b, g, f), 4);case 4:
	              return k = e.o, e["return"](k);case 2:
	              l = Ba(e);if (7001 == l.code) throw l;bb("Unable to fetch a partial HLS segment! Falling back to a full segment request, which is expensive!  Your server should support Range requests and CORS preflights.", g.uris[0]);return u(e, fh(b, h, f), 5);case 5:
	              return m = e.o, e["return"](m);}
	        });
	      });
	    }
	    function Gh(b, c, d, e, f, g) {
	      return t(function k() {
	        var l, m, n, p, v, x, B, y, E;return z(k, function (k) {
	          switch (k.j) {case 1:
	              if (b.m && (l = b.b.get(c), m = l.Tb, n = m.get(e.position))) return k["return"](n.startTime);if ("audio/mpeg" == f) return k["return"](0);if ("video/mp4" != f && "audio/mp4" != f) {
	                k.A(2);break;
	              }p = [Hh(b, e)];d && p.push(Hh(b, d));return u(k, Promise.all(p), 3);case 3:
	              return v = k.o, x = v[0], B = v[1] || v[0], k["return"](Ih(x.data, B.data));case 2:
	              if ("video/mp2t" != f) {
	                k.A(4);break;
	              }return u(k, Hh(b, e), 5);case 5:
	              return y = k.o, k["return"](Jh(y.data));
	            case 4:
	              if ("application/mp4" != f && !f.startsWith("text/")) {
	                k.A(6);break;
	              }return u(k, Hh(b, e), 7);case 7:
	              return E = k.o, k["return"](Kh(f, g, E.data));case 6:
	              if ("video/webm" == f) return k["return"](null);throw new D(2, 4, 4030);}
	        });
	      });
	    }
	    function Ih(b, c) {
	      var d = 0;new Q().H("moov", Cf).H("trak", Cf).H("mdia", Cf).fa("mdhd", function (b) {
	        b.reader.M(0 == b.version ? 8 : 16);d = b.reader.G();b.parser.stop();
	      }).parse(c, !0);if (!d) throw new D(2, 4, 4030);var e = 0,
	          f = !1;new Q().H("moof", Cf).H("traf", Cf).fa("tfdt", function (b) {
	        e = (0 == b.version ? b.reader.G() : b.reader.Ab()) / d;f = !0;b.parser.stop();
	      }).parse(b, !0);if (!f) throw new D(2, 4, 4030);return e;
	    }
	    function Jh(b) {
	      function c() {
	        throw new D(2, 4, 4030);
	      }b = new P(new DataView(b), 0);for (var d = 0, e = 0;;) if (d = b.ca(), e = b.la(), 71 != e && c(), b.Rb() & 16384 || c(), e = (b.la() & 48) >> 4, 0 != e && 2 != e || c(), 3 == e && (e = b.la(), b.M(e)), 1 != b.G() >> 8) b.seek(d + 188), e = b.la(), 71 != e && (b.seek(d + 192), e = b.la()), 71 != e && (b.seek(d + 204), e = b.la()), 71 != e && c(), b.be(1);else return b.M(3), d = b.la() >> 6, 0 != d && 1 != d || c(), 0 == b.la() && c(), d = b.la(), e = b.Rb(), b = b.Rb(), (1073741824 * ((d & 14) >> 1) + ((e & 65534) << 14 | (b & 65534) >> 1)) / 9E4;
	    }
	    function Kh(b, c, d) {
	      b = pc(b, c);if (!Wd(b)) return 0;c = new Ud(null);Xd(c, b);return c.Rc(d);
	    }function rh(b) {
	      var c = new Set(),
	          d = [];b = r(b);for (var e = b.next(); !e.done; e = b.next()) {
	        e = e.value;var f = sc(e)[0];c.has(f) || (d.push(e), c.add(f));
	      }return d;
	    }function sh(b, c) {
	      for (var d = Lh[b], e = 0; e < d.length; e++) for (var f = 0; f < c.length; f++) if (d[e].test(c[f].trim())) return c[f].trim();return "text" == b ? "" : null;
	    }function Bh(b, c) {
	      if (1 == c.length) return c[0];var d = sh(b, c);if (null != d) return d;throw new D(2, 4, 4025, c);
	    }
	    function Ch(b, c, d, e) {
	      return t(function g() {
	        var h, k, l, m, n, p, v, x, B;return z(g, function (g) {
	          switch (g.j) {case 1:
	              h = xd;k = e.segments[0].a;l = new ib(k);m = l.ja.split(".").pop();n = Mh[c];if (p = n[m]) return g["return"](p);if (c == h.qa) return d && "vtt" != d ? g["return"]("application/mp4") : g["return"]("text/vtt");v = Ub([k], b.a.retryParameters);v.method = "HEAD";return u(g, fh(b, v, 1), 2);case 2:
	              x = g.o;B = x.headers["content-type"];if (!B) throw new D(2, 4, 4021, m);return g["return"](B.split(";")[0]);}
	        });
	      });
	    }
	    function nh(b, c) {
	      var d = b.getAttribute(c);if (!d) throw new D(2, 4, 4023, c);return d.value;
	    }function Eh(b, c) {
	      var d = Rg.Ta(b, c);if (!d) throw new D(2, 4, 4024, c);return d;
	    }
	    var Lh = { audio: [/^vorbis$/, /^opus$/, /^flac$/, /^mp4a/, /^[ae]c-3$/], video: [/^avc/, /^hev/, /^hvc/, /^vp0?[89]/, /^av1$/], text: [/^vtt$/, /^wvtt/, /^stpp/] },
	        Mh = { audio: { mp4: "audio/mp4", m4s: "audio/mp4", m4i: "audio/mp4", m4a: "audio/mp4", ts: "video/mp2t" }, video: { mp4: "video/mp4", m4s: "video/mp4", m4i: "video/mp4", m4v: "video/mp4", ts: "video/mp2t" }, text: { mp4: "application/mp4", m4s: "application/mp4", m4i: "application/mp4", vtt: "text/vtt", ttml: "application/ttml+xml" } };
	    function dh(b) {
	      t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (!b.g) return d["return"]();xa(d, 2);return u(d, b.update(), 4);case 4:
	              e = b.R;b.h.P(e);za(d, 0);break;case 2:
	              f = Ba(d), f.severity = 1, b.g.onError(f), b.h.P(.1), w(d);}
	        });
	      });
	    }function kh(b, c) {
	      b.f = c;b.c && b.c.Vb(b.f == hh.Qa);b.f != hh.Qa || b.h.stop();
	    }function fh(b, c, d) {
	      if (!b.i) throw new D(2, 7, 7001);c = b.g.networkingEngine.request(d, c);Rb(b.i, c);return c.promise;
	    }
	    var zh = { "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed": function (b) {
	        var c = nh(b, "METHOD");Le("HLS SAMPLE-AES-CENC", "SAMPLE-AES-CENC will no longer be supported, see Issue #1227");if (!["SAMPLE-AES", "SAMPLE-AES-CTR", "SAMPLE-AES-CENC"].includes(c)) return null;c = nh(b, "URI");c = bh.parse(c);c = new Uint8Array(c.data);c = ud("com.widevine.alpha", [{ initDataType: "cenc", initData: c }]);if (b = Pg(b, "KEYID")) c.keyIds = [b.substr(2).toLowerCase()];return c;
	      } },
	        eh = "VOD",
	        hh = { Qa: eh, me: "EVENT", zd: "LIVE" };U.kd("m3u8", ch);
	    U.Bb("application/x-mpegurl", ch);U.Bb("application/vnd.apple.mpegurl", ch);function Nh() {
	      this.a = new Map();
	    }function Oh(b, c, d) {
	      Ph(b, c).text = d;
	    }function Ph(b, c) {
	      b.a.has(c) || b.a.set(c, new Sh());return b.a.get(c);
	    }function Sh() {
	      this.text = this.variant = null;
	    }function Th(b, c) {
	      this.a = b;this.b = new Set([b]);c = c || [];for (var d = r(c), e = d.next(); !e.done; e = d.next()) this.add(e.value);
	    }Th.prototype.add = function (b) {
	      return Uh(this.a, b) ? (this.b.add(b), !0) : !1;
	    };function Uh(b, c) {
	      var d;if (!(d = !!b.audio != !!c.audio || !!b.video != !!c.video || b.language != c.language) && (d = b.audio && c.audio)) {
	        d = b.audio;var e = c.audio;d = !(d.channelsCount == e.channelsCount && Vh(d, e) && Wh(d.roles, e.roles));
	      }!d && (d = b.video && c.video) && (d = b.video, e = c.video, d = !(Vh(d, e) && Wh(d.roles, e.roles)));return d ? !1 : !0;
	    }
	    Th.prototype.values = function () {
	      return this.b.values();
	    };function Vh(b, c) {
	      if (b.mimeType != c.mimeType) return !1;var d = b.codecs.split(",").map(function (b) {
	        return sc(b)[0];
	      }),
	          e = c.codecs.split(",").map(function (b) {
	        return sc(b)[0];
	      });if (d.length != e.length) return !1;d.sort();e.sort();for (var f = 0; f < d.length; f++) if (d[f] != e[f]) return !1;return !0;
	    }
	    function Wh(b, c) {
	      var d = new Set(b),
	          e = new Set(c);d["delete"]("main");e["delete"]("main");if (d.size != e.size) return !1;d = r(d);for (var f = d.next(); !f.done; f = d.next()) if (!e.has(f.value)) return !1;return !0;
	    }function Xh(b) {
	      this.a = b;this.b = new Yh(b.language, "", b.audio && b.audio.channelsCount ? b.audio.channelsCount : 0, "");
	    }Xh.prototype.create = function (b) {
	      var c = this,
	          d = b.filter(function (b) {
	        return Uh(c.a, b);
	      });return d.length ? new Th(d[0], d) : this.b.create(b);
	    };function Yh(b, c, d, e) {
	      this.f = b;this.c = c;this.a = d;this.b = void 0 === e ? "" : e;
	    }
	    Yh.prototype.create = function (b) {
	      var c = [];c = Zh(b, this.f);var d = b.filter(function (b) {
	        return b.primary;
	      });c = c.length ? c : d.length ? d : b;this.c && (b = $h(c, this.c), b.length && (c = b));this.a && (b = Ee(c, this.a), b.length && (c = b));this.b && (b = ai(c, this.b), b.length && (c = b));b = new Th(c[0]);c = r(c);for (d = c.next(); !d.done; d = c.next()) d = d.value, Uh(b.a, d) && b.add(d);return b;
	    };function Zh(b, c) {
	      var d = M(c),
	          e = se(d, b.map(function (b) {
	        return re(b);
	      }));return e ? b.filter(function (b) {
	        return e == re(b);
	      }) : [];
	    }
	    function $h(b, c) {
	      return b.filter(function (b) {
	        var d = b.audio;b = b.video;return d && 0 <= d.roles.indexOf(c) || b && 0 <= b.roles.indexOf(c);
	      });
	    }function ai(b, c) {
	      return b.filter(function (b) {
	        return b.audio ? b.audio.label.toLowerCase() == c.toLowerCase() : !1;
	      });
	    }function bi() {
	      this.a = ci;this.b = new Map().set(ci, 2).set(di, 1);
	    }function ei(b, c, d) {
	      b.b.set(ci, d).set(di, c);
	    }var di = 0,
	        ci = 1;function fi(b, c) {
	      this.g = b;this.h = gi(b);this.a = b.a.currentTime;this.f = Date.now() / 1E3;this.b = !1;this.i = c;this.c = function () {};
	    }fi.prototype.release = function () {
	      this.g = null;this.c = function () {};
	    };function hi(b, c) {
	      b.c = c;
	    }function ii(b) {
	      this.a = b;
	    }function gi(b) {
	      if (b.a.paused || 0 == b.a.playbackRate || null == b.a.buffered) var c = !1;else a: {
	        c = b.a.buffered;b = b.a.currentTime;for (var d = 0; d < c.length; d++) {
	          var e = c.start(d),
	              f = c.end(d);if (!(b < e || b > f - .5)) {
	            c = !0;break a;
	          }
	        }c = !1;
	      }return c;
	    }function ji(b, c, d, e, f) {
	      var g = this;this.a = b;this.v = c;this.s = d;this.l = f;this.f = new K();this.i = !1;this.m = b.readyState;this.c = !1;this.b = e;this.h = !1;this.f.w(b, "waiting", function () {
	        return ki(g);
	      });this.g = new C(function () {
	        ki(g);
	      }).Na(.25);
	    }ji.prototype.release = function () {
	      this.f && (this.f.release(), this.f = null);null != this.g && (this.g.stop(), this.g = null);this.b && (this.b.release(), this.b = null);this.a = this.v = this.l = null;
	    };ji.prototype.dd = function () {
	      this.h = !0;ki(this);
	    };
	    function ki(b) {
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
	              b = b.b;e = b.g;d = gi(e);f = e.a.currentTime;g = Date.now() / 1E3;if (b.a != f || b.h != d) b.f = g, b.a = f, b.h = d, b.b = !1;f = g - b.f;f >= b.i && d && !b.b && (b.c(b.a, f), b.b = !0, b.a = e.a.currentTime);
	            }
	          } else if (0 != f || b.h) {
	            g = e.start(f);var h = b.v.Ba();if (!(g >= h)) {
	              h = g - d;c = h <= c;var k = !1;.001 > h || (c || b.c || (b.c = !0, d = new I("largegap", { currentTime: d, gapSize: h }), d.cancelable = !0, b.l(d), b.s.jumpLargeGaps && !d.defaultPrevented && (k = !0)), !c && !k) || (0 != f && e.end(f - 1), b.a.currentTime = g);
	            }
	          }
	        }
	      }
	    }function li(b) {
	      var c = this;this.c = b;this.a = new Set();this.b = new C(function () {
	        mi(c, !1);
	      }).Na(.25);
	    }li.prototype.release = function () {
	      this.b.stop();for (var b = r(this.a), c = b.next(); !c.done; c = b.next()) c.value.release();this.a.clear();
	    };function mi(b, c) {
	      for (var d = r(b.a), e = d.next(); !e.done; e = d.next()) e.value.g(b.c.currentTime, c);
	    }function ni(b) {
	      var c = [];b = r(b);for (var d = b.next(); !d.done; d = b.next()) {
	        d = r(d.value.variants);for (var e = d.next(); !e.done; e = d.next()) c.push(e.value);
	      }return c;
	    }function oi(b, c) {
	      for (var d = null, e = r(b), f = e.next(); !f.done; f = e.next()) f = f.value, c >= f.startTime && (d = f);return d;
	    }function pi(b) {
	      this.c = b;this.a = null;this.b = function () {};
	    }pi.prototype.release = function () {
	      this.a = this.c = null;this.b = function () {};
	    };pi.prototype.g = function (b) {
	      var c = this.a,
	          d = this.c.periods;b = oi(d, b) || d[0];c != b && this.b(b);this.a = b;
	    };function qi(b, c) {
	      b.b = c;
	    }function ri(b) {
	      var c = this;this.a = b;this.f = !1;this.c = this.a.gc();this.b = new C(function () {
	        c.a.Ld(.25 * c.c);
	      });
	    }ri.prototype.release = function () {
	      this.b && (this.b.stop(), this.b = null);this.a = null;
	    };ri.prototype.set = function (b) {
	      this.c = b;si(this);
	    };function si(b) {
	      b.b.stop();var c = b.f ? 0 : b.c;if (0 <= c) try {
	        b.a.gc() != c && b.a.rd(c);return;
	      } catch (d) {}b.b.Na(.25);0 != b.a.gc() && b.a.rd(0);
	    }function ti(b, c, d) {
	      this.a = b;this.f = c;this.g = d;this.h = !1;this.b = new K();this.c = new ui(b);0 < b.readyState ? vi(this, d) : wi(this, d);
	    }ti.prototype.release = function () {
	      this.b && (this.b.release(), this.b = null);null != this.c && (this.c.release(), this.c = null);this.f = function () {};this.a = null;
	    };function xi(b) {
	      return b.h ? b.a.currentTime : b.g;
	    }function wi(b, c) {
	      b.g = c;b.b.ea(b.a, "loadedmetadata");b.b.da(b.a, "loadedmetadata", function () {
	        vi(b, c);
	      });
	    }
	    function vi(b, c) {
	      .001 > Math.abs(b.a.currentTime - c) ? yi(b) : (b.b.da(b.a, "seeking", function () {
	        yi(b);
	      }), zi(b.c, 0 == b.a.currentTime ? c : b.a.currentTime));
	    }function yi(b) {
	      b.h = !0;b.b.w(b.a, "seeking", function () {
	        return b.f();
	      });
	    }function ui(b) {
	      var c = this;this.b = b;this.h = 10;this.g = this.f = this.c = 0;this.a = new C(function () {
	        0 >= c.c ? c.a.stop() : c.b.currentTime != c.f ? c.a.stop() : (c.b.currentTime = c.g, c.c--);
	      });
	    }ui.prototype.release = function () {
	      this.a && (this.a.stop(), this.a = null);this.b = null;
	    };
	    function zi(b, c) {
	      b.f = b.b.currentTime;b.g = c;b.c = b.h;b.b.currentTime = c;b.a.Na(.1);
	    }function Ai(b) {
	      function c() {
	        null == d.c ? d.f = !0 : (d.b.da(d.a, "seeking", function () {
	          d.f = !0;
	        }), d.a.currentTime = d.c);
	      }var d = this;this.a = b;this.f = !1;this.c = null;this.b = new K();0 == this.a.readyState ? this.b.da(this.a, "loadedmetadata", c) : c();
	    }Ai.prototype.release = function () {
	      this.b && (this.b.release(), this.b = null);this.a = null;
	    };Ai.prototype.m = function (b) {
	      this.c = this.f ? this.c : b;
	    };Ai.prototype.h = function () {
	      return (this.f ? this.a.currentTime : this.c) || 0;
	    };Ai.prototype.s = function () {};
	    function Bi(b, c, d, e, f, g) {
	      var h = this;this.b = b;this.a = c.presentationTimeline;this.C = c.minBufferTime || 0;this.g = d;this.v = f;this.l = null;this.f = new ji(b, c.presentationTimeline, d, Ci(b, d), g);this.c = new ti(b, function () {
	        a: {
	          var b = h.f;b.i = !0;b.h = !1;b.c = !1;var c = xi(h.c);b = Di(h, c);if (.001 < Math.abs(b - c) && (c = new Date().getTime() / 1E3, !h.l || h.l < c - 1)) {
	            h.l = c;c = h.c;0 < c.a.readyState ? zi(c.c, b) : wi(c, b);b = void 0;break a;
	          }h.v();b = void 0;
	        }return b;
	      }, Ei(this, e));this.i = new C(function () {
	        if (0 != h.b.readyState && !h.b.paused) {
	          var b = h.b.currentTime,
	              c = h.a.ob(),
	              d = h.a.Ba();3 > d - c && (c = d - 3);b < c && (b = Di(h, b), h.b.currentTime = b);
	        }
	      }).Na(.25);
	    }Bi.prototype.release = function () {
	      this.c && (this.c.release(), this.c = null);this.f && (this.f.release(), this.f = null);this.i && (this.i.stop(), this.i = null);this.b = this.c = this.a = this.g = null;this.v = function () {};
	    };Bi.prototype.m = function (b) {
	      var c = this.c;0 < c.a.readyState ? zi(c.c, b) : wi(c, b);
	    };Bi.prototype.h = function () {
	      var b = xi(this.c);return 0 < this.b.readyState && !this.b.paused ? Fi(this, b) : b;
	    };
	    function Ei(b, c) {
	      null == c ? c = Infinity > b.a.Y() ? b.a.ob() : b.a.Ba() : 0 > c && (c = b.a.Ba() + c);return Gi(b, Fi(b, c));
	    }Bi.prototype.s = function () {
	      this.f.dd();
	    };function Gi(b, c) {
	      var d = b.a.Y();return c >= d ? d - b.g.durationBackoff : c;
	    }function Di(b, c) {
	      var d = pd.bind(null, b.b.buffered),
	          e = Math.max(b.C, b.g.rebufferingGoal),
	          f = b.g.safeSeekOffset,
	          g = b.a.ob(),
	          h = b.a.Ba(),
	          k = b.a.Y();3 > h - g && (g = h - 3);var l = b.a.Lb(e),
	          m = b.a.Lb(f);e = b.a.Lb(e + f);return c >= k ? Gi(b, c) : c > h ? h : c < g ? d(m) ? m : e : c >= l || d(c) ? c : e;
	    }
	    function Fi(b, c) {
	      var d = b.a.ob();if (c < d) return d;d = b.a.Ba();return c > d ? d : c;
	    }function Ci(b, c) {
	      if (!c.stallEnabled) return null;var d = c.stallSkip,
	          e = new fi(new ii(b), c.stallThreshold);hi(e, function () {
	        b.currentTime += d;
	      });return e;
	    }function Hi() {
	      this.b = function () {};this.a = new Set();
	    }Hi.prototype.release = function () {
	      this.b = function () {};this.a.clear();
	    };function Ii(b, c) {
	      b.b = c;
	    }function Ji(b) {
	      var c = this;this.h = b;this.f = new Map();this.a = function () {};this.b = function () {};this.c = function () {};this.i = [{ eb: null, cb: Ki, Wa: function (b, e) {
	          return c.a(b, e);
	        } }, { eb: Li, cb: Ki, Wa: function (b, e) {
	          return c.a(b, e);
	        } }, { eb: Mi, cb: Ki, Wa: function (b, e) {
	          return c.a(b, e);
	        } }, { eb: Ki, cb: Li, Wa: function (b, e) {
	          return c.b(b, e);
	        } }, { eb: Ki, cb: Mi, Wa: function (b, e) {
	          return c.b(b, e);
	        } }, { eb: Li, cb: Mi, Wa: function (b, e) {
	          return c.c(b, e);
	        } }, { eb: Mi, cb: Li, Wa: function (b, e) {
	          return c.c(b, e);
	        } }];
	    }
	    Ji.prototype.release = function () {
	      this.h = null;this.f.clear();this.a = function () {};this.b = function () {};this.c = function () {};
	    };Ji.prototype.g = function (b, c) {
	      for (var d = r(this.h.a), e = d.next(); !e.done; e = d.next()) {
	        e = e.value;var f = this.f.get(e),
	            g = b < e.startTime ? Li : b > e.endTime ? Mi : Ki;this.f.set(e, g);for (var h = r(this.i), k = h.next(); !k.done; k = h.next()) k = k.value, k.eb == f && k.cb == g && k.Wa(e, c);
	      }
	    };function Ni(b, c, d, e) {
	      b.a = c;b.b = d;b.c = e;
	    }var Li = 1,
	        Ki = 2,
	        Mi = 3;function Oi(b, c) {
	      this.a = c;this.c = b;this.g = null;this.l = 1;this.v = Promise.resolve();this.h = [];this.i = new Map();this.b = new Map();this.s = !1;this.F = null;this.D = this.f = this.m = !1;this.C = 0;
	    }Oi.prototype.destroy = function () {
	      for (var b = r(this.b.values()), c = b.next(); !c.done; c = b.next()) Pi(c.value);this.b.clear();this.i.clear();this.g = this.h = this.v = this.c = this.a = null;this.f = !0;return Promise.resolve();
	    };
	    Oi.prototype.configure = function (b) {
	      this.g = b;this.F = new yb({ maxAttempts: Math.max(b.retryParameters.maxAttempts, 2), baseDelay: b.retryParameters.baseDelay, backoffFactor: b.retryParameters.backoffFactor, fuzzFactor: b.retryParameters.fuzzFactor, timeout: 0 }, !0);
	    };
	    Oi.prototype.start = function () {
	      var b = this;return t(function d() {
	        var e, f, g;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = b.a.Ua(), f = Qi(b, e), g = b.a.Od(b.c.periods[f]), g.variant || g.text ? u(d, Ri(b, g.variant ? g.variant.audio : null, g.variant ? g.variant.video : null, g.text, e), 2) : d["return"](new D(2, 5, 5005));case 2:
	              if (b.f) return d["return"]();b.a && b.a.lf && b.a.lf();w(d);}
	        });
	      });
	    };function Si(b) {
	      return Ti(b, "audio");
	    }function Ui(b) {
	      return Ti(b, "video");
	    }
	    function Ti(b, c) {
	      var d = b.b.get(c);return d ? d.Ka || d.stream : null;
	    }
	    function Vi(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n, p, v, x;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = xd, u(e, ke(b.a.K, f.qa), 2);case 2:
	              return b.C++, b.D = !1, g = b.C, h = b.a.K, k = new Map(), l = new Set(), k.set(f.qa, c), l.add(c), u(e, h.init(k, !1), 3);case 3:
	              return b.f ? e["return"]() : u(e, Wi(b, l), 4);case 4:
	              if (b.f) return e["return"]();n = (m = b.a.K.g.isTextVisible()) || b.g.alwaysStreamText;b.C != g || b.b.has(f.qa) || b.D || !n || (p = b.a.Ua(), v = Qi(b, p), x = Xi(c, v, 0), b.b.set(f.qa, x), Yi(b, x, 0));w(e);}
	        });
	      });
	    }
	    function Zi(b, c) {
	      var d = b.b.get("video");if (d) {
	        var e = d.stream;if (e) if (c) {
	          var f = e.trickModeVideo;f && !d.Ka && ($i(b, f, !1, 0, !1), d.Ka = e);
	        } else if (e = d.Ka) d.Ka = null, $i(b, e, !0, 0, !1);
	      }
	    }function aj(b, c, d, e) {
	      c.video && $i(b, c.video, d, e, !1);c.audio && $i(b, c.audio, d, e, !1);
	    }
	    function $i(b, c, d, e, f) {
	      var g = b.b.get(c.type);if (!g && "text" == c.type && b.g.ignoreTextStreamFailures) Vi(b, c);else if (g) {
	        var h = bj(b, c),
	            k = Array.from(b.b.values()).every(function (b) {
	          return b.ia == g.ia;
	        });d && h != g.ia && k ? b.b.forEach(function (c) {
	          cj(b, c);
	        }) : (g.Ka && (c.trickModeVideo ? (g.Ka = c, c = c.trickModeVideo) : g.Ka = null), (k = b.h[h]) && k.Cb && (k = b.i.get(c.id)) && k.Cb && (g.stream != c || f) && ("text" == c.type && ce(b.a.K, pc(c.mimeType, c.codecs)), g.stream = c, g.jc = !0, dj(b, g, h) && g.Pb.abort(), d && (g.Ra ? g.yc = !0 : g.Ja ? (g.Oa = !0, g.bc = e, g.yc = !0) : (Pi(g), ej(b, g, !0, e)["catch"](function (c) {
	          if (b.a) b.a.onError(c);
	        })))));
	      }
	    }function dj(b, c, d) {
	      if (!c.Pb) return !1;var e = b.a.Ua(),
	          f = ge(b.a.K, c.type);d = (d = fj(b, c, e, f, d)) ? d.a ? d.a - d.b : null : null;if (null == d) return !1;var g = c.stream.initSegmentReference;g && (d += (g.a ? g.a - g.b : null) || 0);g = b.a.getBandwidthEstimate();return 8 * d / g < f - e - Math.max(b.c.minBufferTime || 0, b.g.rebufferingGoal) || c.Pb.b.a > d ? !0 : !1;
	    }
	    function gj(b) {
	      function c(c) {
	        var f = b.a.K;"text" == c ? (c = f.a, c = null == c.a || null == c.b ? !1 : d >= c.a && d < c.b) : (c = fe(f, c), c = pd(c, d, e));return c;
	      }var d = b.a.Ua(),
	          e = b.g.smallGapLimit,
	          f = Qi(b, d);if (mc(b.b.values(), function (b) {
	        return b.ia == f;
	      })) for (var g = r(b.b.keys()), h = g.next(); !h.done; h = g.next()) h = h.value, c(h) || cj(b, b.b.get(h));else mc(b.b.keys(), c) || b.b.forEach(function (c) {
	        cj(b, c);
	      });
	    }
	    function cj(b, c) {
	      c.Ra || c.Oa || (c.Ja ? (c.Oa = !0, c.bc = 0) : null == ee(b.a.K, c.type) ? null == c.Fa && Yi(b, c, 0) : (Pi(c), ej(b, c, !1, 0)["catch"](function (c) {
	        if (b.a) b.a.onError(c);
	      })));
	    }
	    function Ri(b, c, d, e, f) {
	      return t(function h() {
	        var k, l, m, n, p, v, x;return z(h, function (h) {
	          switch (h.j) {case 1:
	              return k = b.a.Ua(), l = Qi(b, k), m = xd, n = new Map(), p = new Set(), c && (n.set(m.Db, c), p.add(c)), d && (n.set(m.Pa, d), p.add(d)), e && (n.set(m.qa, e), p.add(e)), v = b.a.K, x = b.g.forceTransmuxTS, u(h, v.init(n, x), 2);case 2:
	              if (b.f) return h["return"]();hj(b);return u(h, Wi(b, p), 3);case 3:
	              if (b.f) return h["return"]();n.forEach(function (c, d) {
	                if (!b.b.has(d)) {
	                  var e = Xi(c, l, f);b.b.set(d, e);Yi(b, e, 0);
	                }
	              });w(h);}
	        });
	      });
	    }
	    function Xi(b, c, d) {
	      return { stream: b, type: b.type, rb: null, Ca: null, Ka: null, jc: !0, ia: c, endOfStream: !1, Ja: !1, Fa: null, Oa: !1, bc: 0, yc: !1, Ra: !1, jd: !1, Nb: !1, md: d || 0, Pb: null };
	    }
	    function ij(b, c) {
	      var d = b.h[c];if (d) return d.promise;d = { promise: new F(), Cb: !1 };b.h[c] = d;for (var e = new Set(), f = r(b.c.periods[c].variants), g = f.next(); !g.done; g = f.next()) g = g.value, g.video && e.add(g.video), g.video && g.video.trickModeVideo && e.add(g.video.trickModeVideo), g.audio && e.add(g.audio);f = r(b.c.periods[c].textStreams);for (g = f.next(); !g.done; g = f.next()) e.add(g.value);b.v = b.v.then(function () {
	        if (!this.f) return Wi(this, e);
	      }.bind(b)).then(function () {
	        this.f || (this.h[c].promise.resolve(), this.h[c].Cb = !0);
	      }.bind(b))["catch"](function (b) {
	        this.f || (this.h[c].promise["catch"](function () {}), this.h[c].promise.reject(), delete this.h[c], this.a.onError(b));
	      }.bind(b));return d.promise;
	    }
	    function Wi(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m, n;return z(e, function (e) {
	          switch (e.j) {case 1:
	              f = [];for (var p = r(c), x = p.next(); !x.done; x = p.next()) g = x.value, (h = b.i.get(g.id)) ? f.push(h.promise) : (b.i.set(g.id, { promise: new F(), Cb: !1 }), f.push(g.createSegmentIndex()));xa(e, 2);return u(e, Promise.all(f), 4);case 4:
	              if (b.f) return e["return"]();za(e, 3);break;case 2:
	              k = Ba(e);if (b.f) return e["return"]();e = r(c);for (x = e.next(); !x.done; x = e.next()) l = x.value, b.i.get(l.id).promise["catch"](function () {}), b.i.get(l.id).promise.reject(), b.i["delete"](l.id);throw k;case 3:
	              p = r(c);for (x = p.next(); !x.done; x = p.next()) m = x.value, n = b.i.get(m.id), n.Cb || (n.promise.resolve(), n.Cb = !0);w(e);}
	        });
	      });
	    }function hj(b) {
	      var c = b.c.presentationTimeline.Y();Infinity > c ? b.a.K.wa(c) : b.a.K.wa(Math.pow(2, 32));
	    }
	    function jj(b, c) {
	      if (!b.f && !c.Ja && null != c.Fa && !c.Ra) if (c.Fa = null, c.Oa) ej(b, c, c.yc, c.bc);else {
	        try {
	          var d = kj(b, c);null != d && (Yi(b, c, d), c.Nb = !1);
	        } catch (e) {
	          lj(b, e);return;
	        }d = Array.from(b.b.values());mj(b, c);b.s && d.every(function (b) {
	          return b.endOfStream;
	        }) && b.a.K.endOfStream().then(function () {
	          if (!this.f) {
	            var b = this.a.K.Y();0 != b && b < this.c.presentationTimeline.Y() && this.c.presentationTimeline.wa(b);
	          }
	        }.bind(b));
	      }
	    }
	    function kj(b, c) {
	      if (nj(c)) return b.a.K.tc(c.stream.originalId || ""), null;var d = b.a.Ua(),
	          e = oj(b, c, d),
	          f = bj(b, c.stream),
	          g = Qi(b, e),
	          h = he(b.a.K, c.type, d),
	          k = Math.max(b.c.minBufferTime || 0, b.g.rebufferingGoal, b.g.bufferingGoal) * b.l;if (e >= b.c.presentationTimeline.Y()) return c.endOfStream = !0, "video" == c.type && (e = b.b.get("text")) && "application/cea-608" == e.stream.mimeType && (e.endOfStream = !0), null;c.endOfStream = !1;c.ia = g;if (g != f) return null;if (h >= k) return .5;g = ge(b.a.K, c.type);g = fj(b, c, d, g, f);if (!g) return 1;var l = Infinity;Array.from(b.b.values()).forEach(function (c) {
	        nj(c) || (c = oj(b, c, d), l = Math.min(l, c));
	      });if (e >= l + b.c.presentationTimeline.a) return 1;c.md = 0;pj(b, c, d, f, g);return null;
	    }function oj(b, c, d) {
	      if (!c.rb || !c.Ca) return Math.max(d, c.md);d = bj(b, c.rb);return b.c.periods[d].startTime + c.Ca.endTime;
	    }
	    function fj(b, c, d, e, f) {
	      if (c.Ca && c.stream == c.rb) return qj(b, c, f, c.Ca.position + 1);c.Ca ? (d = bj(b, c.rb), d = c.stream.findSegmentPosition(Math.max(0, b.c.periods[d].startTime + c.Ca.endTime - b.c.periods[f].startTime))) : d = c.stream.findSegmentPosition(Math.max(0, (e || d) - b.c.periods[f].startTime));if (null == d) return null;var g = null;null == e && (g = qj(b, c, f, Math.max(0, d - 1)));return g || qj(b, c, f, d);
	    }
	    function qj(b, c, d, e) {
	      d = b.c.periods[d];c = c.stream.getSegmentReference(e);if (!c) return null;e = b.c.presentationTimeline;b = e.Mb();e = e.pb();return d.startTime + c.endTime < b || d.startTime + c.startTime > e ? null : c;
	    }
	    function pj(b, c, d, e, f) {
	      var g = b.c.periods[e],
	          h = c.stream,
	          k = b.c.presentationTimeline.Y(),
	          l = b.c.periods[e + 1];e = rj(b, c, e, Math.max(0, g.startTime - .1), l ? l.startTime + .01 : k);c.Ja = !0;c.jc = !1;k = sj(b, c, f);Promise.all([e, k]).then(function (b) {
	        if (!this.f && !this.m) return tj(this, c, d, g, h, f, b[1]);
	      }.bind(b)).then(function () {
	        this.f || this.m || (c.Ja = !1, c.jd = !1, c.Oa || this.a.dd(), Yi(this, c, 0), uj(this, h));
	      }.bind(b))["catch"](function (b) {
	        this.f || this.m || (c.Ja = !1, "text" == c.type && this.g.ignoreTextStreamFailures ? this.b["delete"]("text") : 7001 == b.code ? (c.Ja = !1, c.Fa = null, Yi(this, c, 0)) : 3017 == b.code ? vj(this, c, b) : (c.Nb = !0, b.severity = 2, lj(this, b)));
	      }.bind(b));
	    }function vj(b, c, d) {
	      if (!Array.from(b.b.values()).some(function (b) {
	        return b != c && b.jd;
	      })) {
	        var e = Math.round(100 * b.l);if (20 < e) b.l -= .2;else if (4 < e) b.l -= .04;else {
	          c.Nb = !0;b.m = !0;b.a.onError(d);return;
	        }c.jd = !0;
	      }Yi(b, c, 4);
	    }
	    function rj(b, c, d, e, f) {
	      if (!c.jc) return Promise.resolve();d = le(b.a.K, c.type, b.c.periods[d].startTime - c.stream.presentationTimeOffset, e, f);if (!c.stream.initSegmentReference) return d;b = sj(b, c, c.stream.initSegmentReference).then(function (b) {
	        if (!this.f) return ie(this.a.K, c.type, b, null, null, c.stream.closedCaptions && 0 < c.stream.closedCaptions.size);
	      }.bind(b))["catch"](function (b) {
	        c.jc = !0;return Promise.reject(b);
	      });return Promise.all([d, b]);
	    }
	    function tj(b, c, d, e, f, g, h) {
	      var k = f.closedCaptions && 0 < f.closedCaptions.size;null != f.emsgSchemeIdUris && 0 < f.emsgSchemeIdUris.length && new Q().fa("emsg", b.L.bind(b, e, g, f.emsgSchemeIdUris)).parse(h);return wj(b, c, d).then(function () {
	        if (!this.f) return ie(this.a.K, c.type, h, g.startTime + e.startTime, g.endTime + e.startTime, k);
	      }.bind(b)).then(function () {
	        if (!this.f) return c.rb = f, c.Ca = g, Promise.resolve();
	      }.bind(b));
	    }
	    Oi.prototype.L = function (b, c, d, e) {
	      var f = e.reader.gd(),
	          g = e.reader.gd(),
	          h = e.reader.G(),
	          k = e.reader.G(),
	          l = e.reader.G(),
	          m = e.reader.G();e = e.reader.Za(e.reader.J.byteLength - e.reader.ca());b = b.startTime + c.startTime + k / h;if (d.includes(f)) if ("urn:mpeg:dash:event:2012" == f) this.a.mf();else this.a.onEvent(new I("emsg", { detail: { startTime: b, endTime: b + l / h, schemeIdUri: f, value: g, timescale: h, presentationTimeDelta: k, eventDuration: l, id: m, messageData: e } }));
	    };
	    function wj(b, c, d) {
	      var e = Math.max(b.g.bufferBehind, b.c.presentationTimeline.a),
	          f = ee(b.a.K, c.type);if (null == f) return Promise.resolve();d = d - f - e;return 0 >= d ? Promise.resolve() : b.a.K.remove(c.type, f, f + d).then(function () {}.bind(b));
	    }
	    function uj(b, c) {
	      if (!b.s) {
	        var d = Array.from(b.b.values());if (1 != d.length || "text" != d[0].type) b.s = d.every(function (b) {
	          return "text" == b.type ? !0 : !b.Oa && !b.Ra && b.Ca;
	        });if (b.s) {
	          d = bj(b, c);b.h[d] || ij(b, d).then(function () {
	            this.f || this.a.Nd();
	          }.bind(b))["catch"](sd.kc);for (d = 0; d < b.c.periods.length; ++d) ij(b, d)["catch"](sd.kc);b.a.wf && b.a.wf();
	        }
	      }
	    }
	    function mj(b, c) {
	      var d = bj(b, c.stream);if (c.ia != d) {
	        var e = c.ia,
	            f = Array.from(b.b.values());f.every(function (b) {
	          return b.ia == e || nj(b);
	        }) && f.every(xj) && ij(b, e).then(function () {
	          if (!this.f && f.every(function (b) {
	            var c = xj(b),
	                d = bj(this, b.stream);return nj(b) ? !0 : c && b.ia == e && d != e;
	          }.bind(this))) {
	            var b = this.c.periods[e],
	                c = this.a.Od(b),
	                d = new Map();c.variant && c.variant.video && d.set("video", c.variant.video);c.variant && c.variant.audio && d.set("audio", c.variant.audio);c.text && d.set("text", c.text);c = r(this.b.keys());for (var l = c.next(); !l.done; l = c.next()) if (l = l.value, !d.has(l) && "text" != l) {
	              this.a.onError(new D(2, 5, 5005));return;
	            }c = r(Array.from(d.keys()));for (l = c.next(); !l.done; l = c.next()) if (l = l.value, !this.b.has(l)) if ("text" == l) Ri(this, null, null, d.get("text"), b.startTime), d["delete"](l);else {
	              this.a.onError(new D(2, 5, 5005));return;
	            }c = r(Array.from(this.b.keys()));for (l = c.next(); !l.done; l = c.next()) {
	              l = l.value;var m = this.b.get(l),
	                  n = d.get(l);if (n) {
	                var p = nj(m);p && (m.ia = e, m.md = b.startTime);$i(this, n, !1, 0, !1);p && nj(m) || Yi(this, this.b.get(l), 0);
	              } else this.b["delete"](l);
	            }this.a.Nd();
	          }
	        }.bind(b))["catch"](sd.kc);
	      }
	    }function nj(b) {
	      return b && "text" == b.type && "application/cea-608" == b.stream.mimeType;
	    }function xj(b) {
	      return !b.Ja && null == b.Fa && !b.Oa && !b.Ra;
	    }function Qi(b, c) {
	      var d = oi(b.c.periods, c + yd);return d ? b.c.periods.indexOf(d) : 0;
	    }
	    function bj(b, c) {
	      for (var d = b.c.periods, e = 0; e < d.length; e++) {
	        for (var f = d[e], g = new Set(), h = r(f.variants), k = h.next(); !k.done; k = h.next()) k = k.value, k.audio && g.add(k.audio), k.video && g.add(k.video), k.video && k.video.trickModeVideo && g.add(k.video.trickModeVideo);f = r(f.textStreams);for (h = f.next(); !h.done; h = f.next()) g.add(h.value);if (g.has(c)) return e;
	      }return -1;
	    }function sj(b, c, d) {
	      d = wg(d.c(), d.b, d.a, b.g.retryParameters);b = b.a.tb.request(1, d);c.Pb = b;return b.promise.then(function (b) {
	        c.Pb = null;return b.data;
	      });
	    }
	    function ej(b, c, d, e) {
	      return t(function g() {
	        var h, k, l;return z(g, function (g) {
	          switch (g.j) {case 1:
	              return c.Oa = !1, c.yc = !1, c.bc = 0, c.Ra = !0, e ? (k = b.a.Ua(), l = b.a.K.Y(), h = b.a.K.remove(c.type, k + e, l)) : h = ke(b.a.K, c.type).then(function () {
	                if (!this.f && d) return this.a.K.flush(c.type);
	              }.bind(b)), u(g, h, 2);case 2:
	              if (b.f) return g["return"]();c.rb = null;c.Ca = null;c.Ra = !1;c.endOfStream = !1;Yi(b, c, 0);w(g);}
	        });
	      });
	    }
	    function Yi(b, c, d) {
	      c.Fa = new xb(function () {
	        return t(function f() {
	          var d;return z(f, function (f) {
	            switch (f.j) {case 1:
	                return xa(f, 2), u(f, jj(b, c), 4);case 4:
	                za(f, 0);break;case 2:
	                d = Ba(f);if (b.a) b.a.onError(d);w(f);}
	          });
	        });
	      }).P(d);
	    }function Pi(b) {
	      null != b.Fa && (b.Fa.stop(), b.Fa = null);
	    }function lj(b, c) {
	      Ab(b.F).then(function () {
	        this.f || (this.a.onError(c), c.handled || this.g.failureCallback(c));
	      }.bind(b));
	    }function yj(b, c, d, e, f, g) {
	      if (200 <= d && 299 >= d && 202 != d) return { uri: f || e, fd: e, data: c, headers: b, fromCache: !!b["x-shaka-from-cache"] };f = null;try {
	        f = Cc(c);
	      } catch (h) {}throw new D(401 == d || 403 == d ? 2 : 1, 1, 1001, e, d, f, b, g);
	    }function zj(b, c, d, e) {
	      var f = new zj.b();nc(c.headers).forEach(function (b, c) {
	        f.append(c, b);
	      });var g = new zj.a(),
	          h = { Ad: !1, ie: !1 };b = zj.l(b, d, { body: c.body || void 0, headers: f, method: c.method, signal: g.signal, credentials: c.allowCrossSiteCredentials ? "include" : void 0 }, h, e);b = new G(b, function () {
	        h.Ad = !0;g.abort();return Promise.resolve();
	      });if (c = c.retryParameters.timeout) {
	        var k = new C(function () {
	          h.ie = !0;g.abort();
	        });k.P(c / 1E3);b["finally"](function () {
	          k.stop();
	        });
	      }return b;
	    }A("shaka.net.HttpFetchPlugin", zj);
	    zj.l = function (b, c, d, e, f) {
	      return t(function h() {
	        var k, l, m, n, p, v, x, B, y, E, H, W, aa, fa;return z(h, function (h) {
	          switch (h.j) {case 1:
	              return k = zj.g, l = zj.c, v = p = 0, x = Date.now(), xa(h, 2), u(h, k(b, d), 4);case 4:
	              return m = h.o, B = m.clone().body.getReader(), E = (y = m.headers.get("Content-Length")) ? parseInt(y, 10) : 0, H = function (b) {
	                function c() {
	                  return t(function na() {
	                    var d, e;return z(na, function (h) {
	                      switch (h.j) {case 1:
	                          return xa(h, 2), u(h, B.read(), 4);case 4:
	                          d = h.o;za(h, 3);break;case 2:
	                          return Ba(h), h["return"]();case 3:
	                          d.done || (p += d.value.byteLength);e = Date.now();if (100 < e - x || d.done) f(e - x, p - v, E - p), v = p, x = e;d.done ? b.close() : (b.enqueue(d.value), c());w(h);}
	                    });
	                  });
	                }c();
	              }, new l({ start: H }), u(h, m.arrayBuffer(), 5);case 5:
	              n = h.o;za(h, 3);break;case 2:
	              W = Ba(h);if (e.Ad) throw new D(1, 1, 7001, b, c);if (e.ie) throw new D(1, 1, 1003, b, c);throw new D(1, 1, 1002, b, W, c);case 3:
	              return aa = {}, fa = m.headers, fa.forEach(function (b, c) {
	                aa[c.trim()] = b;
	              }), h["return"](yj(aa, n, m.status, b, m.url, c));}
	        });
	      });
	    };
	    zj.isSupported = function () {
	      if (window.ReadableStream) try {
	        new ReadableStream({});
	      } catch (b) {
	        return !1;
	      } else return !1;return !(!window.fetch || !window.AbortController);
	    };zj.isSupported = zj.isSupported;zj.g = window.fetch;zj.a = window.AbortController;zj.c = window.ReadableStream;zj.b = window.Headers;zj.isSupported() && (Tb("http", zj, 2), Tb("https", zj, 2));function Aj(b, c, d, e) {
	      var f = new Aj.f(),
	          g = Date.now(),
	          h = 0,
	          k = new Promise(function (k, m) {
	        f.open(c.method, b, !0);f.responseType = "arraybuffer";f.timeout = c.retryParameters.timeout;f.withCredentials = c.allowCrossSiteCredentials;f.onabort = function () {
	          m(new D(1, 1, 7001, b, d));
	        };f.onload = function (c) {
	          c = c.target;var e = c.getAllResponseHeaders().trim().split("\r\n"),
	              f = {};e = r(e);for (var g = e.next(); !g.done; g = e.next()) g = g.value.split(": "), f[g[0].toLowerCase()] = g.slice(1).join(": ");try {
	            var h = yj(f, c.response, c.status, b, c.responseURL, d);k(h);
	          } catch (E) {
	            m(E);
	          }
	        };f.onerror = function (c) {
	          m(new D(1, 1, 1002, b, c, d));
	        };f.ontimeout = function () {
	          m(new D(1, 1, 1003, b, d));
	        };f.onprogress = function (b) {
	          var c = Date.now();if (100 < c - g || b.lengthComputable && b.loaded == b.total) e(c - g, b.loaded - h, b.total - b.loaded), h = b.loaded, g = c;
	        };for (var l in c.headers) f.setRequestHeader(l.toLowerCase(), c.headers[l]);f.send(c.body);
	      });return new G(k, function () {
	        f.abort();return Promise.resolve();
	      });
	    }A("shaka.net.HttpXHRPlugin", Aj);Aj.f = window.XMLHttpRequest;Tb("http", Aj, 1);
	    Tb("https", Aj, 1);function Bj() {
	      this.a = this.f = this.b = 0;this.c = new Map();this.g = 0;
	    }function Cj(b, c) {
	      b.b += c;var d = b.g;b.g++;b.c.set(d, c);return d;
	    }Bj.prototype.close = function (b, c) {
	      if (this.c.has(b)) {
	        var d = this.c.get(b);this.c["delete"](b);this.f += d;this.a += c;
	      }
	    };function Dj(b, c, d) {
	      this.h = b;this.b = new Map();this.c = !1;this.g = c;this.f = d;this.a = new Bj();
	    }Dj.prototype.destroy = function () {
	      this.c = !0;return Promise.all(this.b.values()).then(function () {}, function () {});
	    };
	    function Ej(b, c, d, e, f, g) {
	      var h = Cj(b.a, e);e = b.b.get(c) || Promise.resolve();b.b.set(c, e.then(function () {
	        return t(function l() {
	          var c, e, p, v;return z(l, function (l) {
	            switch (l.j) {case 1:
	                return u(l, Fj(b, d), 2);case 2:
	                c = l.o;if (b.c) throw new D(2, 9, 7001);if (f) {
	                  e = new Uint8Array(c);p = new Gf(e);for (var m = r(p.data), n = m.next(); !n.done; n = m.next()) v = n.value, b.f(v);
	                }b.a.close(h, c.byteLength);m = b.a;b.g(0 == m.b ? 0 : m.f / m.b, b.a.a);return l["return"](g(c));}
	          });
	        });
	      }));
	    }
	    function Gj(b) {
	      return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              return u(d, Promise.all(b.b.values()), 2);case 2:
	              return d["return"](b.a.a);}
	        });
	      });
	    }function Fj(b, c) {
	      return t(function e() {
	        var f, g;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = b.h.request(1, c), u(e, f.promise, 2);case 2:
	              return g = e.o, e["return"](g.data);}
	        });
	      });
	    }function Hj(b, c) {
	      var d = this;this.c = b;this.b = b.objectStore(c);this.a = new F();b.onabort = function (b) {
	        b.preventDefault();d.a.reject();
	      };b.onerror = function (b) {
	        b.preventDefault();d.a.reject();
	      };b.oncomplete = function () {
	        d.a.resolve();
	      };
	    }Hj.prototype.abort = function () {
	      try {
	        this.c.abort();
	      } catch (b) {}return this.a["catch"](function () {});
	    };
	    function Ij(b, c) {
	      return new Promise(function (d, e) {
	        var f = b.b.openCursor();f.onerror = e;f.onsuccess = function (b) {
	          b = b.target.result;if (!b) return d();c(b.key, b.value, b);b["continue"]();
	        };
	      });
	    }Hj.prototype.store = function () {
	      return this.b;
	    };Hj.prototype.promise = function () {
	      return this.a;
	    };function Jj(b) {
	      this.b = b;this.a = [];
	    }Jj.prototype.destroy = function () {
	      return Promise.all(this.a.map(function (b) {
	        return b.abort();
	      }));
	    };function Kj(b, c) {
	      return Lj(b, c, "readonly");
	    }function Mj(b, c) {
	      return Lj(b, c, "readwrite");
	    }function Lj(b, c, d) {
	      d = b.b.transaction([c], d);var e = new Hj(d, c);b.a.push(e);e.promise().then(function () {
	        Nb(b.a, e);
	      }, function () {
	        Nb(b.a, e);
	      });return e;
	    }function Nj(b) {
	      this.a = new Jj(b);
	    }Nj.prototype.destroy = function () {
	      return this.a.destroy();
	    };Nj.prototype.getAll = function () {
	      var b = this;return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = Kj(b.a, "session-ids"), f = [], u(d, Ij(e, function (b, d) {
	                f.push(d);
	              }), 2);case 2:
	              return u(d, e.promise(), 3);case 3:
	              return d["return"](f);}
	        });
	      });
	    };Nj.prototype.add = function (b) {
	      var c = Mj(this.a, "session-ids"),
	          d = c.store();b = r(b);for (var e = b.next(); !e.done; e = b.next()) d.add(e.value);return c.promise();
	    };
	    Nj.prototype.remove = function (b) {
	      var c = this;return t(function e() {
	        var f;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = Mj(c.a, "session-ids"), u(e, Ij(f, function (c, e, f) {
	                0 <= b.indexOf(e.sessionId) && f["delete"]();
	              }), 2);case 2:
	              return u(e, f.promise(), 0);}
	        });
	      });
	    };function Oj() {
	      this.a = new Map();
	    }Oj.prototype.destroy = function () {
	      for (var b = [], c = r(this.a.values()), d = c.next(); !d.done; d = c.next()) b.push(d.value.destroy());this.a.clear();return Promise.all(b);
	    };Oj.prototype.init = function () {
	      var b = this;Pj.forEach(function (c, d) {
	        var e = c();e && b.a.set(d, e);
	      });for (var c = [], d = r(this.a.values()), e = d.next(); !e.done; e = d.next()) c.push(e.value.init());return Promise.all(c);
	    };
	    function Qj(b) {
	      var c = null;b.a.forEach(function (b, e) {
	        b.getCells().forEach(function (b, d) {
	          b.hasFixedKeySpace() || c || (c = { path: { va: e, ba: d }, ba: b });
	        });
	      });if (c) return c;throw new D(2, 9, 9013, "Could not find a cell that supports add-operations");
	    }function Rj(b, c) {
	      b.a.forEach(function (b, e) {
	        b.getCells().forEach(function (b, d) {
	          c({ va: e, ba: d }, b);
	        });
	      });
	    }
	    function Sj(b, c, d) {
	      b = b.a.get(c);if (!b) throw new D(2, 9, 9013, "Could not find mechanism with name " + c);c = b.getCells().get(d);if (!c) throw new D(2, 9, 9013, "Could not find cell with name " + d);return c;
	    }function Tj(b, c) {
	      b.a.forEach(function (b) {
	        c(b.getEmeSessionCell());
	      });
	    }function Uj(b) {
	      var c = Array.from(b.a.keys());if (!c.length) throw new D(2, 9, 9E3, "No supported storage mechanisms found");return b.a.get(c[0]).getEmeSessionCell();
	    }
	    Oj.prototype.erase = function () {
	      var b = this;return t(function d() {
	        var e, f, g;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = Array.from(b.a.values()), f = 0 < e.length, f || (g = Pj, g.forEach(function (b) {
	                (b = b()) && e.push(b);
	              })), u(d, Promise.all(e.map(function (b) {
	                return b.erase();
	              })), 2);case 2:
	              if (f) d.A(0);else return u(d, Promise.all(e.map(function (b) {
	                return b.destroy();
	              })), 0);}
	        });
	      });
	    };function Vj(b, c) {
	      Pj.set(b, c);
	    }A("shaka.offline.StorageMuxer.register", Vj);A("shaka.offline.StorageMuxer.unregister", function (b) {
	      Pj["delete"](b);
	    });
	    var Pj = new Map();function Wj(b) {
	      this.a = new Jj(b);
	    }q = Wj.prototype;q.destroy = function () {
	      return this.a.destroy();
	    };q.hasFixedKeySpace = function () {
	      return !0;
	    };q.addSegments = function () {
	      return Xj("segment");
	    };q.removeSegments = function (b, c) {
	      return Yj(this, "segment", b, c);
	    };q.getSegments = function (b) {
	      return Zj(this, "segment", b).then(function (b) {
	        return b.map(ak);
	      });
	    };q.addManifests = function () {
	      return Xj("manifest");
	    };
	    q.updateManifestExpiration = function (b, c) {
	      var d = Mj(this.a, "manifest"),
	          e = d.store(),
	          f = new F();e.get(b).onsuccess = function (d) {
	        (d = d.target.result) ? (d.expiration = c, e.put(d), f.resolve()) : f.reject(new D(2, 9, 9012, "Could not find values for " + b));
	      };return d.promise().then(function () {
	        return f;
	      });
	    };q.removeManifests = function (b, c) {
	      return Yj(this, "manifest", b, c);
	    };q.getManifests = function (b) {
	      return Zj(this, "manifest", b).then(function (b) {
	        return b.map(bk);
	      });
	    };
	    q.getAllManifests = function () {
	      var b = this;return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = Kj(b.a, "manifest"), f = new Map(), u(d, Ij(e, function (b, d) {
	                f.set(b, bk(d));
	              }), 2);case 2:
	              return u(d, e.promise(), 3);case 3:
	              return d["return"](f);}
	        });
	      });
	    };function Xj(b) {
	      return Promise.reject(new D(2, 9, 9011, "Cannot add new value to " + b));
	    }function Yj(b, c, d, e) {
	      b = Mj(b.a, c);var f = b.store();d.forEach(function (b) {
	        f["delete"](b).onsuccess = function () {
	          return e(b);
	        };
	      });return b.promise();
	    }
	    function Zj(b, c, d) {
	      b = Kj(b.a, c);var e = b.store(),
	          f = {},
	          g = [];d.forEach(function (b) {
	        e.get(b).onsuccess = function (c) {
	          c = c.target.result;void 0 == c && g.push(b);f[b] = c;
	        };
	      });return b.promise().then(function () {
	        return g.length ? Promise.reject(new D(2, 9, 9012, "Could not find values for " + g)) : d.map(function (b) {
	          return f[b];
	        });
	      });
	    }
	    function bk(b) {
	      return { originalManifestUri: b.originalManifestUri, duration: b.duration, size: b.size, expiration: null == b.expiration ? Infinity : b.expiration, periods: b.periods.map(ck), sessionIds: b.sessionIds, drmInfo: b.drmInfo, appMetadata: b.appMetadata };
	    }function ck(b) {
	      dk(b);b.streams.forEach(function () {});return { startTime: b.startTime, streams: b.streams.map(ek) };
	    }
	    function ek(b) {
	      var c = b.df ? fk(b.df) : null;return { id: b.id, originalId: null, primary: b.primary, presentationTimeOffset: b.presentationTimeOffset, contentType: b.contentType, mimeType: b.mimeType, codecs: b.codecs, frameRate: b.frameRate, kind: b.kind, language: b.language, label: b.label, width: b.width, height: b.height, initSegmentKey: c, encrypted: b.encrypted, keyId: b.keyId, segments: b.segments.map(gk), variantIds: b.variantIds };
	    }function gk(b) {
	      var c = fk(b.uri);return { startTime: b.startTime, endTime: b.endTime, dataKey: c };
	    }
	    function ak(b) {
	      return { data: b.data };
	    }function fk(b) {
	      var c;if ((c = /^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(b)) || (c = /^offline:segment\/([0-9]+)$/.exec(b))) return Number(c[1]);throw new D(2, 9, 9004, "Could not parse uri " + b);
	    }
	    function dk(b) {
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
	    }function hk(b, c, d, e) {
	      this.a = new Jj(b);this.c = c;this.b = d;this.f = e;
	    }q = hk.prototype;q.destroy = function () {
	      return this.a.destroy();
	    };q.hasFixedKeySpace = function () {
	      return this.f;
	    };q.addSegments = function (b) {
	      return ik(this, this.c, b);
	    };q.removeSegments = function (b, c) {
	      return jk(this, this.c, b, c);
	    };q.getSegments = function (b) {
	      return kk(this, this.c, b);
	    };q.addManifests = function (b) {
	      return ik(this, this.b, b);
	    };
	    q.updateManifestExpiration = function (b, c) {
	      var d = Mj(this.a, this.b),
	          e = d.store();e.get(b).onsuccess = function (d) {
	        if (d = d.target.result) d.expiration = c, e.put(d, b);
	      };return d.promise();
	    };q.removeManifests = function (b, c) {
	      return jk(this, this.b, b, c);
	    };q.getManifests = function (b) {
	      return kk(this, this.b, b);
	    };
	    q.getAllManifests = function () {
	      var b = this;return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return e = Kj(b.a, b.b), f = new Map(), u(d, Ij(e, function (b, d) {
	                f.set(b, d);
	              }), 2);case 2:
	              return u(d, e.promise(), 3);case 3:
	              return d["return"](f);}
	        });
	      });
	    };
	    function ik(b, c, d) {
	      if (b.f) return Promise.reject(new D(1, 9, 9011, "Cannot add new value to " + c));b = Mj(b.a, c);var e = b.store(),
	          f = [];d.forEach(function (b) {
	        e.add(b).onsuccess = function (b) {
	          f.push(b.target.result);
	        };
	      });return b.promise().then(function () {
	        return f;
	      });
	    }function jk(b, c, d, e) {
	      b = Mj(b.a, c);var f = b.store();d.forEach(function (b) {
	        f["delete"](b).onsuccess = function () {
	          return e(b);
	        };
	      });return b.promise();
	    }
	    function kk(b, c, d) {
	      b = Kj(b.a, c);var e = b.store(),
	          f = {},
	          g = [];d.forEach(function (b) {
	        var c = e.get(b);c.onsuccess = function () {
	          void 0 == c.result && g.push(b);f[b] = c.result;
	        };
	      });return b.promise().then(function () {
	        return g.length ? Promise.reject(new D(1, 9, 9012, "Could not find values for " + g)) : d.map(function (b) {
	          return f[b];
	        });
	      });
	    }function lk() {
	      this.g = this.c = this.b = this.a = this.f = null;
	    }q = lk.prototype;
	    q.init = function () {
	      var b = this,
	          c = new F(),
	          d = window.indexedDB.open("shaka_offline_db", 4);d.onsuccess = function (d) {
	        d = d.target.result;b.f = d;var e = d.objectStoreNames;e = e.contains("manifest") && e.contains("segment") ? new Wj(d) : null;b.a = e;e = d.objectStoreNames;e = e.contains("manifest-v2") && e.contains("segment-v2") ? new hk(d, "segment-v2", "manifest-v2", !0) : null;b.b = e;e = d.objectStoreNames;e = e.contains("manifest-v3") && e.contains("segment-v3") ? new hk(d, "segment-v3", "manifest-v3", !1) : null;b.c = e;d = d.objectStoreNames.contains("session-ids") ? new Nj(d) : null;b.g = d;c.resolve();
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
	              return b.f && b.f.close(), u(d, mk(), 8);case 8:
	              return b.f = null, b.a = null, b.b = null, b.c = null, u(d, b.init(), 0);}
	        });
	      });
	    };
	    function mk() {
	      var b = new F(),
	          c = window.indexedDB.deleteDatabase("shaka_offline_db");c.onblocked = function () {};c.onsuccess = function () {
	        b.resolve();
	      };c.onerror = function (d) {
	        b.reject(new D(2, 9, 9001, c.error));d.preventDefault();
	      };return b;
	    }Vj("idb", function () {
	      return window.indexedDB ? new lk() : null;
	    });function nk(b, c, d, e) {
	      this.a = b;this.g = c;this.f = d;this.c = e;this.b = ["offline:", b, "/", c, "/", d, "/", e].join("");
	    }nk.prototype.va = function () {
	      return this.g;
	    };nk.prototype.ba = function () {
	      return this.f;
	    };nk.prototype.key = function () {
	      return this.c;
	    };nk.prototype.toString = function () {
	      return this.b;
	    };
	    function ok(b) {
	      b = /^offline:([a-z]+)\/([^/]+)\/([^/]+)\/([0-9]+)$/.exec(b);if (null == b) return null;var c = b[1];if ("manifest" != c && "segment" != c) return null;var d = b[2];if (!d) return null;var e = b[3];return e && null != c ? new nk(c, d, e, Number(b[4])) : null;
	    }function pk(b, c) {
	      this.b = b;this.a = c;
	    }function qk(b, c) {
	      var d = new V(null, 0);d.wa(c.duration);var e = c.periods.map(function (c) {
	        return rk(b, c, d);
	      }),
	          f = c.drmInfo ? [c.drmInfo] : [];c.drmInfo && e.forEach(function (b) {
	        b.variants.forEach(function (b) {
	          b.drmInfos = f;
	        });
	      });return { presentationTimeline: d, minBufferTime: 2, offlineSessionIds: c.sessionIds, periods: e };
	    }
	    function rk(b, c, d) {
	      var e = c.streams.filter(function (b) {
	        return "audio" == b.contentType;
	      }),
	          f = c.streams.filter(function (b) {
	        return "video" == b.contentType;
	      });e = sk(b, e, f);f = c.streams.filter(function (b) {
	        return "text" == b.contentType;
	      }).map(function (c) {
	        return tk(b, c);
	      });c.streams.forEach(function (e) {
	        e = e.segments.map(function (c, d) {
	          return uk(b, d, c);
	        });d.ub(e, c.startTime);
	      });return { startTime: c.startTime, variants: Array.from(e.values()), textStreams: f };
	    }
	    function sk(b, c, d) {
	      for (var e = new Set(), f = r(c), g = f.next(); !g.done; g = f.next()) {
	        var h = r(g.value.variantIds);for (g = h.next(); !g.done; g = h.next()) e.add(g.value);
	      }f = r(d);for (g = f.next(); !g.done; g = f.next()) for (h = r(g.value.variantIds), g = h.next(); !g.done; g = h.next()) e.add(g.value);f = new Map();e = r(e);for (g = e.next(); !g.done; g = e.next()) g = g.value, f.set(g, { id: g, language: "", primary: !1, audio: null, video: null, bandwidth: 0, drmInfos: [], allowedByApplication: !0, allowedByKeySystem: !0 });c = r(c);for (e = c.next(); !e.done; e = c.next()) for (e = e.value, g = tk(b, e), h = r(e.variantIds), e = h.next(); !e.done; e = h.next()) e = f.get(e.value), e.language = g.language, e.primary = e.primary || g.primary, e.audio = g;d = r(d);for (c = d.next(); !c.done; c = d.next()) for (e = c.value, c = tk(b, e), g = r(e.variantIds), e = g.next(); !e.done; e = g.next()) e = f.get(e.value), e.primary = e.primary || c.primary, e.video = c;return f;
	    }
	    function tk(b, c) {
	      var d = c.segments.map(function (c, d) {
	        return uk(b, d, c);
	      }),
	          e = new T(d);d = { id: c.id, originalId: c.originalId, createSegmentIndex: function () {
	          return Promise.resolve();
	        }, findSegmentPosition: function (b) {
	          return e.find(b);
	        }, getSegmentReference: function (b) {
	          return e.get(b);
	        }, initSegmentReference: null, presentationTimeOffset: c.presentationTimeOffset, mimeType: c.mimeType, codecs: c.codecs, width: c.width || void 0, height: c.height || void 0, frameRate: c.frameRate || void 0, kind: c.kind, encrypted: c.encrypted, keyId: c.keyId,
	        language: c.language, label: c.label || null, type: c.contentType, primary: c.primary, trickModeVideo: null, emsgSchemeIdUris: null, roles: [], channelsCount: null, audioSamplingRate: null, closedCaptions: null };null != c.initSegmentKey && (d.initSegmentReference = vk(b, c.initSegmentKey));return d;
	    }function uk(b, c, d) {
	      var e = new nk("segment", b.b, b.a, d.dataKey);return new S(c, d.startTime, d.endTime, function () {
	        return [e.toString()];
	      }, 0, null);
	    }
	    function vk(b, c) {
	      var d = new nk("segment", b.b, b.a, c);return new Xf(function () {
	        return [d.toString()];
	      }, 0, null);
	    }function wk() {
	      this.a = null;
	    }q = wk.prototype;q.configure = function () {};
	    q.start = function (b) {
	      var c = this;return t(function e() {
	        var f, g, h, k, l, m;return z(e, function (e) {
	          switch (e.j) {case 1:
	              f = ok(b);c.a = f;if (null == f || "manifest" != f.a) return e["return"](Promise.reject(new D(2, 1, 9004, f)));g = new Oj();ya(e, 2);return u(e, g.init(), 4);case 4:
	              return u(e, Sj(g, f.va(), f.ba()), 5);case 5:
	              return h = e.o, u(e, h.getManifests([f.key()]), 6);case 6:
	              return k = e.o, l = k[0], m = new pk(f.va(), f.ba()), e["return"](qk(m, l));case 2:
	              return Ca(e), u(e, g.destroy(), 7);case 7:
	              Da(e, 0);}
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
	              return g = d.a, h = new Oj(), xa(f, 2, 3), u(f, h.init(), 5);case 5:
	              return u(f, Sj(h, g.va(), g.ba()), 6);case 6:
	              return k = f.o, u(f, k.getManifests([g.key()]), 7);case 7:
	              l = f.o;m = l[0];n = m.sessionIds.includes(b);p = void 0 == m.expiration || m.expiration > c;if (!n || !p) {
	                f.A(3);break;
	              }return u(f, k.updateManifestExpiration(g.key(), c), 3);case 3:
	              return Ca(f), u(f, h.destroy(), 10);case 10:
	              Da(f, 0);break;case 2:
	              Ba(f), f.A(3);}
	        });
	      });
	    };U.Bb("application/x-offline-manifest", wk);function xk(b) {
	      var c = ok(b);return c && "manifest" == c.a ? xk.h(b) : c && "segment" == c.a ? xk.i(c.key(), c) : Bb(new D(2, 1, 9004, b));
	    }A("shaka.offline.OfflineScheme", xk);xk.h = function (b) {
	      b = { uri: b, fd: b, data: new ArrayBuffer(0), headers: { "content-type": "application/x-offline-manifest" } };return Fb(b);
	    };xk.i = function (b, c) {
	      var d = new Oj();return Fb(void 0).U(function () {
	        return d.init();
	      }).U(function () {
	        return Sj(d, c.va(), c.ba());
	      }).U(function (b) {
	        return b.getSegments([c.key()]);
	      }).U(function (b) {
	        return { uri: c, fd: c, data: b[0].data, headers: {} };
	      })["finally"](function () {
	        return d.destroy();
	      });
	    };
	    Tb("offline", xk);function yk(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n;return z(f, function (f) {
	          switch (f.j) {case 1:
	              g = [];for (var p = [], x = r(d), B = x.next(); !B.done; B = x.next()) {
	                B = B.value;for (var y = !1, E = r(p), H = E.next(); !H.done; H = E.next()) if (H = H.value, zk(H.info, B)) {
	                  H.sessionIds.push(B.sessionId);y = !0;break;
	                }y || p.push({ info: B, sessionIds: [B.sessionId] });
	              }h = r(p);k = h.next();case 2:
	              if (k.done) {
	                f.A(4);break;
	              }l = k.value;m = Ak(b, c, l);return u(f, m, 5);case 5:
	              n = f.o;g = g.concat(n);k = h.next();f.A(2);break;case 4:
	              return f["return"](g);}
	        });
	      });
	    }
	    function Ak(b, c, d) {
	      return t(function f() {
	        var g, h;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = new Fc({ tb: c, onError: function () {}, mc: function () {}, onExpirationUpdated: function () {}, onEvent: function () {} }), xa(f, 2), g.configure(b), u(f, Mc(g, d.info.keySystem, d.info.licenseUri, d.info.serverCertificate, d.info.audioCapabilities, d.info.videoCapabilities), 4);case 4:
	              za(f, 3);break;case 2:
	              return Ba(f), u(f, g.destroy(), 5);case 5:
	              return f["return"]([]);case 3:
	              return xa(f, 6), u(f, Tc(g), 8);case 8:
	              za(f, 7);break;case 6:
	              return Ba(f), u(f, g.destroy(), 9);case 9:
	              return f["return"]([]);case 7:
	              return h = [], u(f, Promise.all(d.sessionIds.map(function (b) {
	                return t(function n() {
	                  return z(n, function (c) {
	                    switch (c.j) {case 1:
	                        return xa(c, 2), u(c, Wc(g, b), 4);case 4:
	                        h.push(b);za(c, 0);break;case 2:
	                        Ba(c), w(c);}
	                  });
	                });
	              })), 10);case 10:
	              return u(f, g.destroy(), 11);case 11:
	              return f["return"](h);}
	        });
	      });
	    }
	    function zk(b, c) {
	      function d(b, c) {
	        return b.robustness == c.robustness && b.contentType == c.contentType;
	      }return b.keySystem == c.keySystem && b.licenseUri == c.licenseUri && Pb(b.audioCapabilities, c.audioCapabilities, d) && Pb(b.videoCapabilities, c.videoCapabilities, d);
	    }function Bk(b, c) {
	      var d = Ck(),
	          e = this;this.g = c;this.c = b;this.i = d;this.h = null;this.f = [];this.b = this.a = null;this.l = !0;this.m = Promise.resolve().then(function () {
	        return Dk(e);
	      });
	    }Bk.prototype.destroy = function () {
	      var b = this;return t(function d() {
	        var e;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.l = !1, b.b && b.b.abort(), Ek(b), u(d, b.m, 2);case 2:
	              b.a && b.a.ua.Ya();for (var f = r(b.f), h = f.next(); !h.done; h = f.next()) e = h.value, e.ua.Ya();b.a = null;b.f = [];b.g = null;w(d);}
	        });
	      });
	    };
	    function Fk(b, c) {
	      var d = { vb: function () {}, lc: function () {}, Ya: function () {}, onError: function () {}, nc: function () {}, xg: function () {} };b.f.push({ create: c, ua: d });b.b && b.b.abort();Ek(b);return d;
	    }
	    function Dk(b) {
	      return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (b.l) {
	                if (0 == b.f.length || b.a && !b.a.Va) var e = !1;else {
	                  b.a && (b.a.ua.Ya(), b.a = null);e = b.f.shift();var g = e.create(b.i);g ? (e.ua.vb(), b.a = { node: g.node, payload: g.payload, Va: g.Va, ua: e.ua }) : e.ua.nc();e = !0;
	                }e ? e = Promise.resolve() : b.a ? e = Gk(b) : (b.g.kf(b.c), b.h = new F(), e = b.h);return u(d, e, 1);
	              }d.A(0);}
	        });
	      });
	    }
	    function Gk(b) {
	      return t(function d() {
	        var e, f;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.c = b.g.Te(b.c, b.i, b.a.node, b.a.payload), xa(d, 2), b.b = b.g.Be(b.c, b.i, b.a.payload), u(d, b.b.promise, 4);case 4:
	              b.b = null;b.c == b.a.node && (b.a.ua.lc(), b.a = null);za(d, 0);break;case 2:
	              e = Ba(d);if (7001 == e.code) b.a.ua.Ya();else b.a.ua.onError(e);b.a = null;b.b = null;f = b;return u(d, b.g.handleError(b.i, e), 5);case 5:
	              f.c = d.o, w(d);}
	        });
	      });
	    }function Ek(b) {
	      b.h && (b.h.resolve(), b.h = null);
	    }function Hk(b) {
	      this.a = null;for (var c = 0; c < b.textTracks.length; ++c) {
	        var d = b.textTracks[c];d.mode = "disabled";"Shaka Player TextTrack" == d.label && (this.a = d);
	      }this.a || (this.a = b.addTextTrack("subtitles", "Shaka Player TextTrack"));this.a.mode = "hidden";
	    }A("shaka.text.SimpleTextDisplayer", Hk);Hk.prototype.remove = function (b, c) {
	      if (!this.a) return !1;Ik(this.a, function (d) {
	        return d.startTime < c && d.endTime > b;
	      });return !0;
	    };Hk.prototype.remove = Hk.prototype.remove;
	    Hk.prototype.append = function (b) {
	      for (var c = Jk, d = [], e = 0; e < b.length; e++) {
	        var f = c(b[e]);f && d.push(f);
	      }d.slice().sort(function (b, c) {
	        return b.startTime != c.startTime ? b.startTime - c.startTime : b.endTime != c.endTime ? b.endTime - c.startTime : d.indexOf(c) - d.indexOf(b);
	      }).forEach(function (b) {
	        this.a.addCue(b);
	      }.bind(this));
	    };Hk.prototype.append = Hk.prototype.append;Hk.prototype.destroy = function () {
	      this.a && Ik(this.a, function () {
	        return !0;
	      });this.a = null;return Promise.resolve();
	    };Hk.prototype.destroy = Hk.prototype.destroy;
	    Hk.prototype.isTextVisible = function () {
	      return "showing" == this.a.mode;
	    };Hk.prototype.isTextVisible = Hk.prototype.isTextVisible;Hk.prototype.setTextVisibility = function (b) {
	      this.a.mode = b ? "showing" : "hidden";
	    };Hk.prototype.setTextVisibility = Hk.prototype.setTextVisibility;
	    function Jk(b) {
	      if (b.startTime >= b.endTime) return null;var c = new VTTCue(b.startTime, b.endTime, b.payload);c.lineAlign = b.lineAlign;c.positionAlign = b.positionAlign;c.size = b.size;try {
	        c.align = b.textAlign;
	      } catch (d) {}"center" == b.textAlign && "center" != c.align && (c.align = "middle");"vertical-lr" == b.writingMode ? c.vertical = "lr" : "vertical-rl" == b.writingMode && (c.vertical = "rl");1 == b.lineInterpretation && (c.snapToLines = !1);null != b.line && (c.line = b.line);null != b.position && (c.position = b.position);return c;
	    }
	    function Ik(b, c) {
	      var d = b.mode;b.mode = "showing" == d ? "showing" : "hidden";for (var e = b.cues, f = e.length - 1; 0 <= f; f--) {
	        var g = e[f];g && c(g) && b.removeCue(g);
	      }b.mode = d;
	    }function Kk(b, c, d, e, f) {
	      var g = f in e,
	          h = !0,
	          k;for (k in c) {
	        var l = f + "." + k,
	            m = g ? e[f] : d[k];g || k in d ? void 0 === c[k] ? void 0 === m || g ? delete b[k] : b[k] = Lb(m) : m.constructor == Object && c[k] && c[k].constructor == Object ? (b[k] || (b[k] = Lb(m)), l = Kk(b[k], c[k], m, e, l), h = h && l) : typeof c[k] != typeof m || null == c[k] || c[k].constructor != m.constructor ? h = !1 : b[k] = c[k] : h = !1;
	      }return h;
	    }A("shaka.util.ConfigUtils.mergeConfigObjects", Kk);
	    function Lk(b, c) {
	      for (var d = {}, e = d, f = 0, g = 0;;) {
	        f = b.indexOf(".", f);if (0 > f) break;if (0 == f || "\\" != b[f - 1]) g = b.substring(g, f).replace(/\\\./g, "."), e[g] = {}, e = e[g], g = f + 1;f += 1;
	      }e[b.substring(g).replace(/\\\./g, ".")] = c;return d;
	    }A("shaka.util.ConfigUtils.convertToConfigObject", Lk);function Mk() {}A("shaka.util.PlayerConfiguration", Mk);
	    function Nk() {
	      var b = 5E5,
	          c = Infinity;navigator.connection && (b = 1E6 * navigator.connection.downlink, navigator.connection.saveData && (c = 360));var d = { retryParameters: zb(), servers: {}, clearKeys: {}, advanced: {}, delayLicenseRequestUntilPlayed: !1, initDataTransform: dd, fairPlayTransform: !0 },
	          e = { retryParameters: zb(), availabilityWindowOverride: NaN, disableAudio: !1, disableVideo: !1, disableText: !1, dash: { customScheme: function (b) {
	            if (b) return null;
	          }, clockSyncUri: "", ignoreDrmInfo: !1, xlinkFailGracefully: !1, defaultPresentationDelay: 10,
	          ignoreMinBufferTime: !1, autoCorrectDrift: !0, ignoreSuggestedPresentationDelay: !1 }, hls: { ignoreTextStreamFailures: !1 } },
	          f = { retryParameters: zb(), failureCallback: function () {}, rebufferingGoal: 2, bufferingGoal: 10, bufferBehind: 30, ignoreTextStreamFailures: !1, alwaysStreamText: !1, startAtSegmentBoundary: !1, smallGapLimit: .5, jumpLargeGaps: !1, durationBackoff: 1, forceTransmuxTS: !1, safeSeekOffset: 5, stallEnabled: !0, stallThreshold: 1, stallSkip: .1, useNativeHlsOnSafari: !0 };wc("Web0S") && (f.stallEnabled = !1);var g = { trackSelectionCallback: function (b) {
	          return b;
	        },
	        progressCallback: function () {}, usePersistentLicense: !0 },
	          h = { drm: d, manifest: e, streaming: f, offline: g, abrFactory: N, abr: { enabled: !0, defaultBandwidthEstimate: b, switchInterval: 8, bandwidthUpgradeTarget: .85, bandwidthDowngradeTarget: .95, restrictions: { minWidth: 0, maxWidth: Infinity, minHeight: 0, maxHeight: c, minPixels: 0, maxPixels: Infinity, minBandwidth: 0, maxBandwidth: Infinity } }, preferredAudioLanguage: "", preferredTextLanguage: "", preferredVariantRole: "", preferredTextRole: "", preferredAudioChannelCount: 2, restrictions: { minWidth: 0,
	          maxWidth: Infinity, minHeight: 0, maxHeight: Infinity, minPixels: 0, maxPixels: Infinity, minBandwidth: 0, maxBandwidth: Infinity }, playRangeStart: 0, playRangeEnd: Infinity, textDisplayFactory: function () {
	          return null;
	        } };g.trackSelectionCallback = function (b) {
	        return Ok(b, h.preferredAudioLanguage);
	      };return h;
	    }
	    function Pk(b, c, d) {
	      var e = { ".drm.servers": "", ".drm.clearKeys": "", ".drm.advanced": { distinctiveIdentifierRequired: !1, persistentStateRequired: !1, videoRobustness: "", audioRobustness: "", serverCertificate: new Uint8Array(0), individualizationServer: "" } };return Kk(b, c, d || Nk(), e, "");
	    }Mk.mergeConfigObjects = Pk;
	    function Ok(b, c) {
	      var d = b.filter(function (b) {
	        return "variant" == b.type;
	      }),
	          e = [],
	          f = se(c, d.map(function (b) {
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
	    }function Qk() {
	      this.a = null;this.b = [];
	    }function Rk(b, c) {
	      if (null == b.a) b.a = { timestamp: Date.now() / 1E3, state: c, duration: 0 };else {
	        var d = Date.now() / 1E3;b.a.duration = d - b.a.timestamp;b.a.state != c && (b.b.push(b.a), b.a = { timestamp: d, state: c, duration: 0 });
	      }
	    }function Sk(b, c) {
	      var d = 0;b.a && b.a.state == c && (d += b.a.duration);for (var e = r(b.b), f = e.next(); !f.done; f = e.next()) f = f.value, d += f.state == c ? f.duration : 0;return d;
	    }
	    function Tk(b) {
	      function c(b) {
	        return { timestamp: b.timestamp, state: b.state, duration: b.duration };
	      }for (var d = [], e = r(b.b), f = e.next(); !f.done; f = e.next()) d.push(c(f.value));b.a && d.push(c(b.a));return d;
	    }function Uk() {
	      this.b = this.c = null;this.a = [];
	    }function Vk() {
	      this.f = this.l = this.b = this.h = this.i = this.g = this.m = NaN;this.a = new Qk();this.c = new Uk();
	    }function X(b, c) {
	      var d = this;Kb.call(this);this.h = Wk;this.a = null;this.gb = !1;this.g = new K();this.zc = this.l = this.Eb = this.b = this.s = this.f = this.Wb = this.C = this.Xb = this.W = this.ib = this.m = this.F = this.i = this.L = null;this.Kd = 1E9;this.Zb = new Set();this.kb = !0;this.Ga = null;this.Hd = !1;this.Fd = 0;this.oa = null;this.$ = new Nh();this.c = Xk(this);this.$b = { width: Infinity, height: Infinity };this.v = null;this.Fb = new Yh(this.c.preferredAudioLanguage, this.c.preferredVariantRole, this.c.preferredAudioChannelCount);this.na = this.c.preferredTextLanguage;
	      this.fb = this.c.preferredTextRole;c && c(this);this.L = Yk(this);this.g.w(window, "online", function () {
	        d.nd();
	      });this.D = { name: "detach" };this.R = { name: "attach" };this.Ha = { name: "unload" };this.Ic = { name: "manifest-parser" };this.Gc = { name: "manifest" };this.hb = { name: "media-source" };this.Ac = { name: "drm-engine" };this.T = { name: "load" };this.Nc = { name: "src-equals-drm-engine" };this.jb = { name: "src-equals" };var e = new Map();e.set(this.R, function (b, c) {
	        return Gb(Zk(d, b, c));
	      });e.set(this.D, function (b) {
	        b.u && (d.g.ea(b.u, "error"), b.u = null);
	        d.a = null;b = Promise.resolve();return Gb(b);
	      });e.set(this.Ha, function (b) {
	        return Gb($k(d, b));
	      });e.set(this.hb, function (b) {
	        b = al(d, b);return Gb(b);
	      });e.set(this.Ic, function (b, c) {
	        var e = bl(d, b, c);return Gb(e);
	      });e.set(this.Gc, function (b) {
	        return cl(d, b);
	      });e.set(this.Ac, function () {
	        var b = dl(d);return Gb(b);
	      });e.set(this.T, function (b, c) {
	        return Gb(el(d, b, c));
	      });e.set(this.Nc, function (b) {
	        b = fl(d, b);return Gb(b);
	      });e.set(this.jb, function (b, c) {
	        return gl(d, b, c);
	      });this.lb = new Bk(this.D, { Te: function (b, c, e, k) {
	          var f = null;b == d.D && (f = e == d.D ? d.D : d.R);b == d.R && (f = e == d.D || c.u != k.u ? d.D : e == d.R ? d.R : e == d.hb || e == d.T ? d.hb : e == d.jb ? d.Nc : null);b == d.hb && (f = e == d.T && c.u == k.u ? d.Ic : d.Ha);b == d.Ic && (f = hl(d.T, d.Gc, d.Ha, e, c, k));b == d.Gc && (f = hl(d.T, d.Ac, d.Ha, e, c, k));b == d.Ac && (f = hl(d.T, d.T, d.Ha, e, c, k));b == d.Nc && (f = e == d.jb && c.u == k.u ? d.jb : d.Ha);if (b == d.T || b == d.jb) f = d.Ha;b == d.Ha && (f = k.u && c.u == k.u ? d.R : d.D);return f;
	        }, Be: function (b, c, h) {
	          d.dispatchEvent(new I("onstatechange", { state: b.name }));return e.get(b)(c, h);
	        }, handleError: function (b) {
	          return t(function h() {
	            return z(h, function (c) {
	              switch (c.j) {case 1:
	                  return u(c, $k(d, b), 2);case 2:
	                  return c["return"](b.u ? d.R : d.D);}
	            });
	          });
	        }, kf: function (b) {
	          d.dispatchEvent(new I("onstateidle", { state: b.name }));
	        } });b && this.Gb(b, !0);
	    }Sa(X, Kb);A("shaka.Player", X);
	    X.prototype.destroy = function () {
	      var b = this;return t(function d() {
	        var e;return z(d, function (d) {
	          switch (d.j) {case 1:
	              if (b.h == il) return d["return"]();b.h = il;e = Fk(b.lb, function () {
	                return { node: b.D, payload: Ck(), Va: !1 };
	              });return u(d, new Promise(function (b) {
	                e.vb = function () {};e.lc = function () {
	                  b();
	                };e.Ya = function () {
	                  b();
	                };e.onError = function () {
	                  b();
	                };e.nc = function () {
	                  b();
	                };
	              }), 2);case 2:
	              return u(d, b.lb.destroy(), 3);case 3:
	              b.g && (b.g.release(), b.g = null);b.zc = null;b.l = null;b.c = null;if (!b.L) {
	                d.A(0);break;
	              }return u(d, b.L.destroy(), 5);case 5:
	              b.L = null, w(d);}
	        });
	      });
	    };X.prototype.destroy = X.prototype.destroy;X.version = "v2.5.7";var jl = ["2", "5"];Me = new function (b) {
	      this.a = b;this.c = Ne;this.b = Oe;
	    }(new Ke(Number(jl[0]), Number(jl[1])));var kl = ["output-restricted", "internal-error"],
	        ll = {};X.registerSupportPlugin = function (b, c) {
	      ll[b] = c;
	    };
	    X.isBrowserSupported = function () {
	      return window.Promise && window.Uint8Array && Array.prototype.forEach && window.MediaKeys && window.navigator && window.navigator.requestMediaKeySystemAccess && window.MediaKeySystemAccess && window.MediaKeySystemAccess.prototype.getConfiguration ? tc() ? !0 : uc("application/x-mpegurl") : !1;
	    };
	    X.probeSupport = function () {
	      return jd().then(function (b) {
	        for (var c = U.Ef(), d = {}, e = r('video/mp4; codecs="avc1.42E01E",video/mp4; codecs="avc3.42E01E",video/mp4; codecs="hev1.1.6.L93.90",video/mp4; codecs="hvc1.1.6.L93.90",video/mp4; codecs="hev1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="hvc1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="vp9",video/mp4; codecs="vp09.00.10.08",video/mp4; codecs="av01.0.01M.08",audio/mp4; codecs="mp4a.40.2",audio/mp4; codecs="ac-3",audio/mp4; codecs="ec-3",audio/mp4; codecs="opus",audio/mp4; codecs="flac",video/webm; codecs="vp8",video/webm; codecs="vp9",video/webm; codecs="vp09.00.10.08",audio/webm; codecs="vorbis",audio/webm; codecs="opus",video/mp2t; codecs="avc1.42E01E",video/mp2t; codecs="avc3.42E01E",video/mp2t; codecs="hvc1.1.6.L93.90",video/mp2t; codecs="mp4a.40.2",video/mp2t; codecs="ac-3",video/mp2t; codecs="ec-3",text/vtt,application/mp4; codecs="wvtt",application/ttml+xml,application/mp4; codecs="stpp"'.split(",")), f = e.next(); !f.done; f = e.next()) {
	          f = f.value;d[f] = tc() ? Wd(f) ? !0 : MediaSource.isTypeSupported(f) || Ad(f) : uc(f);var g = f.split(";")[0];d[g] = d[g] || d[f];
	        }b = { manifest: c, media: d, drm: b };for (var h in ll) b[h] = ll[h]();return b;
	      });
	    };X.prototype.Gb = function (b, c) {
	      c = void 0 === c ? !0 : c;if (this.h == il) return Promise.reject(ml());var d = Ck();d.u = b;tc() || (c = !1);var e = c ? this.hb : this.R,
	          f = Fk(this.lb, function () {
	        return { node: e, payload: d, Va: !1 };
	      });f.vb = function () {};return nl(f);
	    };X.prototype.attach = X.prototype.Gb;
	    X.prototype.detach = function () {
	      var b = this;if (this.h == il) return Promise.reject(ml());var c = Fk(this.lb, function () {
	        return { node: b.D, payload: Ck(), Va: !1 };
	      });c.vb = function () {};return nl(c);
	    };X.prototype.detach = X.prototype.detach;X.prototype.xd = function (b) {
	      var c = this;b = void 0 === b ? !0 : b;if (this.h == il) return Promise.reject(ml());tc() || (b = !1);var d = Ck(),
	          e = Fk(this.lb, function (e) {
	        var f = e.u && b ? c.hb : e.u ? c.R : c.D;d.u = e.u;return { node: f, payload: d, Va: !1 };
	      });e.vb = function () {};return nl(e);
	    };X.prototype.unload = X.prototype.xd;
	    X.prototype.load = function (b, c, d) {
	      if (this.h == il) return Promise.reject(ml());this.dispatchEvent(new I("loading"));var e = Ck();e.uri = b;e.ud = Date.now() / 1E3;d && "string" != typeof d && (Le("Loading with a manifest parser factory", "Please register a manifest parser and for the mime-type."), e.za = function () {
	        return new d();
	      });d && "string" == typeof d && (e.mimeType = d);void 0 !== c && (e.startTime = c);var f = ol(this, e) ? this.jb : this.T,
	          g = Fk(this.lb, function (b) {
	        if (null == b.u) return null;e.u = b.u;return { node: f, payload: e, Va: !0 };
	      });g.vb = function () {};return new Promise(function (b, c) {
	        g.nc = function () {
	          return c(new D(2, 7, 7002));
	        };g.lc = function () {
	          return b();
	        };g.Ya = function () {
	          return c(ml());
	        };g.onError = function (b) {
	          return c(b);
	        };
	      });
	    };X.prototype.load = X.prototype.load;
	    function ol(b, c) {
	      if (c.za) return !1;if (!tc()) return !0;var d = c.mimeType,
	          e = c.uri || "";d || (d = { mp4: "video/mp4", m4v: "video/mp4", m4a: "audio/mp4", webm: "video/webm", weba: "audio/webm", mkv: "video/webm", ts: "video/mp2t", ogv: "video/ogg", ogg: "audio/ogg", mpg: "video/mpeg", mpeg: "video/mpeg", m3u8: "application/x-mpegurl", mp3: "audio/mpeg", aac: "audio/aac", flac: "audio/flac", wav: "audio/wav" }[U.getExtension(e)]);return d ? uc(d) ? U.isSupported(e, d) ? !!navigator.vendor && navigator.vendor.includes("Apple") && b.c.streaming.useNativeHlsOnSafari : !0 : !1 : !1;
	    }function Zk(b, c, d) {
	      null == c.u && (c.u = d.u, b.g.w(c.u, "error", function () {
	        var c = pl(b);c && b.Ma(c);
	      }));b.a = c.u;return Promise.resolve();
	    }
	    function $k(b, c) {
	      return t(function e() {
	        return z(e, function (e) {
	          switch (e.j) {case 1:
	              b.h != il && (b.h = Wk);b.dispatchEvent(new I("unloading"));c.za = null;c.mimeType = null;c.startTime = null;c.uri = null;c.u && (b.g.ea(c.u, "loadeddata"), b.g.ea(c.u, "playing"), b.g.ea(c.u, "pause"), b.g.ea(c.u, "ended"), b.g.ea(c.u, "ratechange"));b.ib && (b.ib.release(), b.ib = null);b.Xb && (b.Xb.stop(), b.Xb = null);if (!b.s) {
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
	              b.m && (b.m.release(), b.m = null);if (!b.F) {
	                e.A(8);break;
	              }return u(e, b.F.destroy(), 9);case 9:
	              b.F = null;case 8:
	              if (!c.u || !c.u.src) {
	                e.A(10);break;
	              }return u(e, new Promise(function (b) {
	                return new C(b).P(.1);
	              }), 11);case 11:
	              c.u.removeAttribute("src"), c.u.load();case 10:
	              if (!b.i) {
	                e.A(12);break;
	              }return u(e, b.i.destroy(), 13);case 13:
	              b.i = null;case 12:
	              b.$.a.clear(), b.Eb = null, b.C = null, b.Zb.clear(), b.b = null, b.v = null, b.Bc = null, b.kb = !0, ql(b), w(e);}
	        });
	      });
	    }
	    function al(b, c) {
	      return t(function e() {
	        var f, g, h, k;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = window.muxjs ? new md() : new nd(), g = b.c.textDisplayFactory, h = new g(), b.Bc = g, k = new $d(c.u, f, h), u(e, k.s, 2);case 2:
	              b.F = k, w(e);}
	        });
	      });
	    }
	    function bl(b, c, d) {
	      return t(function f() {
	        var g, h, k;return z(f, function (f) {
	          switch (f.j) {case 1:
	              c.za = d.za;c.mimeType = d.mimeType;c.uri = d.uri;g = c.uri;h = b.L;b.Eb = g;if (c.za) {
	                b.s = c.za();f.A(2);break;
	              }k = b;return u(f, U.create(g, h, b.c.manifest.retryParameters, c.mimeType), 3);case 3:
	              k.s = f.o;case 2:
	              b.s.configure(b.c.manifest), w(f);}
	        });
	      });
	    }
	    function cl(b, c) {
	      var d = c.uri,
	          e = b.L;b.Wb = new Hi();Ii(b.Wb, function (c) {
	        rl(b, "timelineregionadded", c);
	      });var f = { networkingEngine: e, filterNewPeriod: function (c) {
	          return b.Jc(c);
	        }, filterAllPeriods: function (c) {
	          return sl(b, c);
	        }, onTimelineRegionAdded: function (c) {
	          var d = b.Wb;a: {
	            var e = r(d.a);for (var f = e.next(); !f.done; f = e.next()) if (f = f.value, f.schemeIdUri == c.schemeIdUri && f.id == c.id && f.startTime == c.startTime && f.endTime == c.endTime) {
	              e = f;break a;
	            }e = null;
	          }null == e && (d.a.add(c), d.b(c));
	        }, onEvent: function (c) {
	          return b.dispatchEvent(c);
	        },
	        onError: function (c) {
	          return b.Ma(c);
	        } };return new G(Promise.resolve().then(function () {
	        return t(function h() {
	          var c;return z(h, function (e) {
	            switch (e.j) {case 1:
	                return c = b, u(e, b.s.start(d, f), 2);case 2:
	                c.b = e.o;b.dispatchEvent(new I("manifestparsed"));if (0 == b.b.periods.length) throw new D(2, 4, 4014);tl(b.b.periods);w(e);}
	          });
	        });
	      }), function () {
	        return b.s.stop();
	      });
	    }
	    function dl(b) {
	      return t(function d() {
	        return z(d, function (d) {
	          switch (d.j) {case 1:
	              return b.i = new Fc({ tb: b.L, onError: function (d) {
	                  b.Ma(d);
	                }, mc: function (d) {
	                  ul(b, d);
	                }, onExpirationUpdated: function (d, e) {
	                  vl(b, d, e);
	                }, onEvent: function (d) {
	                  b.dispatchEvent(d);
	                } }), b.i.configure(b.c.drm), u(d, Lc(b.i, ni(b.b.periods), b.b.offlineSessionIds), 2);case 2:
	              sl(b, b.b.periods), w(d);}
	        });
	      });
	    }
	    function el(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n, p, v, x;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return c.startTime = d.startTime, g = c.u, h = c.uri, b.Eb = h, b.v = new Vk(), k = function () {
	                return wl(b);
	              }, l = function () {
	                var c = b.a.playbackRate;0 != c && b.W.set(c);
	              }, b.g.w(g, "playing", k), b.g.w(g, "pause", k), b.g.w(g, "ended", k), b.g.w(g, "ratechange", l), m = b.c.abrFactory, b.l && b.zc == m || (b.zc = m, b.l = new m(), b.l.configure(b.c.abr)), xl(b, b.b.periods), b.Fb = new Yh(b.c.preferredAudioLanguage, b.c.preferredVariantRole, b.c.preferredAudioChannelCount), b.na = b.c.preferredTextLanguage, yl(b.b.presentationTimeline, b.c.playRangeStart, b.c.playRangeEnd), u(f, b.i.Gb(g), 2);case 2:
	              return b.l.init(function (c, d, f) {
	                d = void 0 === d ? !1 : d;f = void 0 === f ? 0 : f;a: {
	                  var g = r(b.b.periods);for (var h = g.next(); !h.done; h = g.next()) if (h = h.value, h.variants.includes(c)) {
	                    g = h;break a;
	                  }g = null;
	                }zl(b, g, c, !0);b.f && (aj(b.f, c, d, f), Al(b));
	              }), b.m = Bl(b, c.startTime), b.ib = Cl(b), b.W = new ri({ gc: function () {
	                  return c.u.playbackRate;
	                }, rd: function (b) {
	                  c.u.playbackRate = b;
	                }, Ld: function (b) {
	                  c.u.currentTime += b;
	                } }), n = Math.max(b.b.minBufferTime, b.c.streaming.rebufferingGoal), Dl(b, n), b.f = El(b), b.f.configure(b.c.streaming), Fl(b), b.h = Gl, b.dispatchEvent(new I("streaming")), u(f, b.f.start(), 3);case 3:
	              b.c.streaming.startAtSegmentBoundary && (p = b.m.h(), v = Hl(b, p), b.m.m(v)), b.b.periods.forEach(b.Jc.bind(b)), Il(b), Al(b), x = Jl(b) || b.b.periods[0], x.variants.some(function (b) {
	                return b.primary;
	              }), Kl(b, x.variants), b.g.da(g, "loadeddata", function () {
	                b.v.b = Date.now() / 1E3 - d.ud;
	              }), w(f);}
	        });
	      });
	    }
	    function fl(b, c) {
	      return t(function e() {
	        var f, g;return z(e, function (e) {
	          switch (e.j) {case 1:
	              return f = xd, b.i = new Fc({ tb: b.L, onError: function (c) {
	                  b.Ma(c);
	                }, mc: function (c) {
	                  ul(b, c);
	                }, onExpirationUpdated: function (c, e) {
	                  vl(b, c, e);
	                }, onEvent: function (c) {
	                  b.dispatchEvent(c);
	                } }), b.i.configure(b.c.drm), g = { id: 0, language: "und", primary: !1, audio: null, video: { id: 0, originalId: null, createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function () {
	                    return null;
	                  }, getSegmentReference: function () {
	                    return null;
	                  }, initSegmentReference: null,
	                  presentationTimeOffset: 0, mimeType: "video/mp4", codecs: "", encrypted: !0, keyId: null, language: "und", label: null, type: f.Pa, primary: !1, trickModeVideo: null, emsgSchemeIdUris: null, roles: [], channelsCount: null, audioSamplingRate: null, closedCaptions: null }, bandwidth: 100, drmInfos: [], allowedByApplication: !0, allowedByKeySystem: !0 }, u(e, Lc(b.i, [g], []), 2);case 2:
	              return u(e, b.i.Gb(c.u), 0);}
	        });
	      });
	    }
	    function gl(b, c, d) {
	      function e() {
	        return wl(b);
	      }c.uri = d.uri;c.startTime = d.startTime;b.Eb = c.uri;b.v = new Vk();b.m = new Ai(c.u);null != c.startTime && b.m.m(c.startTime);b.W = new ri({ gc: function () {
	          return c.u.playbackRate;
	        }, rd: function (b) {
	          c.u.playbackRate = b;
	        }, Ld: function (b) {
	          c.u.currentTime += b;
	        } });Dl(b, b.c.streaming.rebufferingGoal);b.g.w(c.u, "playing", e);b.g.w(c.u, "pause", e);b.g.w(c.u, "ended", e);b.g.da(c.u, "loadeddata", function () {
	        b.v.b = Date.now() / 1E3 - d.ud;
	      });b.a.audioTracks && (b.g.w(b.a.audioTracks, "addtrack", function () {
	        return Il(b);
	      }), b.g.w(b.a.audioTracks, "removetrack", function () {
	        return Il(b);
	      }), b.g.w(b.a.audioTracks, "change", function () {
	        return Il(b);
	      }));if (b.a.textTracks) {
	        var f = b.a.textTracks;b.g.w(f, "addtrack", function () {
	          return Il(b);
	        });b.g.w(f, "removetrack", function () {
	          return Il(b);
	        });b.g.w(f, "change", function () {
	          return Il(b);
	        });
	      }c.u.src = c.uri;b.h = Ll;b.dispatchEvent(new I("streaming"));var g = new F();b.a.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ? g.resolve() : b.a.error ? g.reject(pl(b)) : (b.g.da(b.a, "loadeddata", function () {
	        g.resolve();
	      }), b.g.da(b.a, "error", function () {
	        g.reject(pl(b));
	      }));return new G(g, function () {
	        g.reject(new D(2, 7, 7001));return Promise.resolve();
	      });
	    }function tl(b) {
	      function c(b) {
	        return b.video && b.audio || b.video && b.video.codecs.includes(",");
	      }b.some(function (b) {
	        return b.variants.some(c);
	      }) && b.forEach(function (b) {
	        b.variants = b.variants.filter(c);
	      });
	    }
	    function Fl(b) {
	      function c(b) {
	        var c = "";b.video && (c = sc(b.video.codecs)[0]);var d = "";b.audio && (d = sc(b.audio.codecs)[0]);return c + "-" + d;
	      }var d = b.b.periods.reduce(function (b, c) {
	        return b.concat(c.variants);
	      }, []);d = Ee(d, b.c.preferredAudioChannelCount);var e = new Jb();d.forEach(function (b) {
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
	    }function Yk(b) {
	      return new J(function (c, d) {
	        b.l && b.l.segmentDownloaded(c, d);
	      });
	    }function Bl(b, c) {
	      return new Bi(b.a, b.b, b.c.streaming, c, function () {
	        b.ib && mi(b.ib, !0);b.f && gj(b.f);b.C && Ml(b);
	      }, function (c) {
	        return b.dispatchEvent(c);
	      });
	    }
	    function Cl(b) {
	      var c = new pi(b.b);qi(c, function () {
	        Il(b);
	      });var d = new Ji(b.Wb);Ni(d, function (c) {
	        rl(b, "timelineregionenter", c);
	      }, function (c) {
	        rl(b, "timelineregionexit", c);
	      }, function (c, d) {
	        d || (rl(b, "timelineregionenter", c), rl(b, "timelineregionexit", c));
	      });var e = new li(b.a);e.a.add(c);e.a.add(d);return e;
	    }function Dl(b, c) {
	      b.C = new bi();b.C.a = di;ei(b.C, c, Math.min(.5, c / 2));ql(b);b.Xb = new C(function () {
	        Ml(b);
	      }).Na(.25);
	    }
	    function Ml(b) {
	      switch (b.h) {case Ll:
	          var c = b.a.ended ? !0 : od(b.a.buffered) >= b.a.duration - 1;break;case Gl:
	          a: if (b.a.ended || de(b.F)) c = !0;else {
	            if (b.b.presentationTimeline.V()) {
	              var d = b.b.presentationTimeline.pb();if (od(b.a.buffered) >= d) {
	                c = !0;break a;
	              }
	            }c = !1;
	          }break;default:
	          c = !1;}var e = qd(b.a.buffered, b.a.currentTime);d = b.C;var f = c,
	          g = d.b.get(d.a);c = d.a;e = f || e >= g ? ci : di;d.a = e;c != e && ql(b);
	    }
	    function El(b) {
	      return new Oi(b.b, { Ua: function () {
	          return b.m.h();
	        }, getBandwidthEstimate: function () {
	          return b.l.getBandwidthEstimate();
	        }, K: b.F, tb: b.L, Od: b.hf.bind(b), Nd: b.ve.bind(b), onError: b.Ma.bind(b), onEvent: function (c) {
	          return b.dispatchEvent(c);
	        }, mf: b.nf.bind(b), dd: b.uf.bind(b) });
	    }X.prototype.configure = function (b, c) {
	      2 == arguments.length && "string" == typeof b && (b = Lk(b, c));var d = Pk(this.c, b, Xk(this));Nl(this);return d;
	    };X.prototype.configure = X.prototype.configure;
	    function Nl(b) {
	      b.s && b.s.configure(b.c.manifest);b.i && b.i.configure(b.c.drm);if (b.f) {
	        b.f.configure(b.c.streaming);try {
	          b.b.periods.forEach(b.Jc.bind(b));
	        } catch (g) {
	          b.Ma(g);
	        }var c = Si(b.f),
	            d = Ui(b.f),
	            e = Jl(b);c = He(c, d, e.variants);b.l && c && c.allowedByApplication && c.allowedByKeySystem ? Kl(b, e.variants) : Ol(b, e);
	      }if (b.F && (e = b.c.textDisplayFactory, b.Bc != e)) {
	        c = new e();d = b.F;var f = d.g;d.g = c;f && (c.setTextVisibility(f.isTextVisible()), f.destroy());d.a && (d.a.c = c);b.Bc = e;b.f && (e = b.f, (c = e.b.get("text")) && $i(e, c.stream, !0, 0, !0));
	      }b.l && (b.l.configure(b.c.abr), b.c.abr.enabled && !b.kb ? b.l.enable() : b.l.disable(), Pl(b));b.C && (e = b.c.streaming.rebufferingGoal, b.b && (e = Math.max(e, b.b.minBufferTime)), ei(b.C, e, Math.min(.5, e / 2)));
	    }X.prototype.getConfiguration = function () {
	      var b = Xk(this);Pk(b, this.c, Xk(this));return b;
	    };X.prototype.getConfiguration = X.prototype.getConfiguration;X.prototype.Mf = function () {
	      for (var b in this.c) delete this.c[b];Pk(this.c, Xk(this), Xk(this));Nl(this);
	    };X.prototype.resetConfiguration = X.prototype.Mf;
	    X.prototype.Me = function () {
	      return this.h;
	    };X.prototype.getLoadMode = X.prototype.Me;X.prototype.Re = function () {
	      return this.a;
	    };X.prototype.getMediaElement = X.prototype.Re;X.prototype.Kb = function () {
	      return this.L;
	    };X.prototype.getNetworkingEngine = X.prototype.Kb;X.prototype.ec = function () {
	      return this.Eb;
	    };X.prototype.getAssetUri = X.prototype.ec;X.prototype.Pe = function () {
	      Le("getManifestUri", 'Please use "getAssetUri" instead.');return this.ec();
	    };X.prototype.getManifestUri = X.prototype.Pe;
	    X.prototype.V = function () {
	      return this.b ? this.b.presentationTimeline.V() : this.a && this.a.src ? Infinity == this.a.duration : !1;
	    };X.prototype.isLive = X.prototype.V;X.prototype.Xa = function () {
	      return this.b ? this.b.presentationTimeline.Xa() : !1;
	    };X.prototype.isInProgress = X.prototype.Xa;
	    X.prototype.ef = function () {
	      if (this.b) {
	        if (!this.b.periods.length) return !1;var b = this.b.periods[0].variants;return b.length ? !b[0].video : !1;
	      }return this.a && this.a.src ? this.a.videoTracks ? 0 == this.a.videoTracks.length : 0 == this.a.videoHeight : !1;
	    };X.prototype.isAudioOnly = X.prototype.ef;X.prototype.Of = function () {
	      if (this.b) {
	        var b = this.b.presentationTimeline;return { start: b.ob(), end: b.Ba() };
	      }return this.a && this.a.src && (b = this.a.seekable, b.length) ? { start: b.start(0), end: b.end(b.length - 1) } : { start: 0, end: 0 };
	    };
	    X.prototype.seekRange = X.prototype.Of;X.prototype.keySystem = function () {
	      return Zc(this.drmInfo());
	    };X.prototype.keySystem = X.prototype.keySystem;X.prototype.drmInfo = function () {
	      return this.i ? this.i.a : null;
	    };X.prototype.drmInfo = X.prototype.drmInfo;X.prototype.Jb = function () {
	      return this.i ? this.i.Jb() : Infinity;
	    };X.prototype.getExpiration = X.prototype.Jb;X.prototype.Tc = function () {
	      return this.C ? this.C.a == di : !1;
	    };X.prototype.isBuffering = X.prototype.Tc;
	    X.prototype.Ue = function () {
	      if (this.W) {
	        var b = this.W;b = b.f ? 0 : b.c;
	      } else b = 0;return b;
	    };X.prototype.getPlaybackRate = X.prototype.Ue;X.prototype.gg = function (b) {
	      0 == b ? bb("A trick play rate of 0 is unsupported!") : (this.a.paused && this.a.play(), this.W.set(b), this.h == Gl && Zi(this.f, 1 < Math.abs(b)));
	    };X.prototype.trickPlay = X.prototype.gg;X.prototype.we = function () {
	      this.h == Ll && this.W.set(1);this.h == Gl && (this.W.set(1), Zi(this.f, !1));
	    };X.prototype.cancelTrickPlay = X.prototype.we;
	    X.prototype.Sc = function () {
	      if (this.b && this.m) {
	        for (var b = Ql(this), c = [], d = r(Rl(this)), e = d.next(); !e.done; e = d.next()) {
	          e = e.value;var f = xe(e);f.active = e == b;c.push(f);
	        }return c;
	      }return this.a && this.a.audioTracks ? Array.from(this.a.audioTracks).map(function (b) {
	        var c = Be(b);c.active = b.enabled;c.type = "variant";c.originalAudioId = b.id;"main" == b.kind ? (c.primary = !0, c.roles = ["main"], c.audioRoles = ["main"]) : c.audioRoles = [];return c;
	      }) : [];
	    };X.prototype.getVariantTracks = X.prototype.Sc;
	    X.prototype.qb = function () {
	      if (this.b && this.m) {
	        for (var b = Sl(this), c = [], d = r(Tl(this)), e = d.next(); !e.done; e = d.next()) {
	          e = e.value;var f = ye(e);f.active = e == b;c.push(f);
	        }return c;
	      }return this.a && this.a.src && this.a.textTracks ? Array.from(this.a.textTracks).map(function (b) {
	        var c = Be(b);c.active = "disabled" != b.mode;c.type = "text";c.originalTextId = b.id;"captions" == b.kind && (c.mimeType = "application/cea-608");return c;
	      }) : [];
	    };X.prototype.getTextTracks = X.prototype.qb;
	    X.prototype.od = function (b) {
	      if (this.b && this.f) {
	        var c = Jl(this),
	            d = c.textStreams.find(function (c) {
	          return c.id == b.id;
	        });d && (Ul(this, c, d, !1), Vl(this, d), this.na = d.language);
	      } else if (this.a && this.a.src && this.a.textTracks) {
	        c = Array.from(this.a.textTracks);c = r(c);for (d = c.next(); !d.done; d = c.next()) d = d.value, ze(d) == b.id ? d.mode = this.gb ? "showing" : "hidden" : d.mode = "disabled";Wl(this);
	      }
	    };X.prototype.selectTextTrack = X.prototype.od;
	    X.prototype.Qf = function () {
	      Le("selectEmbeddedTextTrack", "If closed captions are signaled in the manifest, a text stream will be created to represent them. Please use SelectTextTrack.");var b = this.qb().filter(function (b) {
	        return "application/cea-608" == b.mimeType;
	      });0 < b.length && this.od(b[0]);
	    };X.prototype.selectEmbeddedTextTrack = X.prototype.Qf;
	    X.prototype.lg = function () {
	      Le("usingEmbeddedTextTrack", "If closed captions are signaled in the manifest, a text stream will be created to represent them. There should be no reason to know if the player is playing embedded text.");var b = this.qb().filter(function (b) {
	        return b.active;
	      })[0];return b ? "application/cea-608" == b.mimeType : !1;
	    };X.prototype.usingEmbeddedTextTrack = X.prototype.lg;
	    X.prototype.Sf = function (b, c, d) {
	      d = void 0 === d ? 0 : d;if (this.b && this.f) {
	        var e = Jl(this);this.c.abr.enabled && bb("Changing tracks while abr manager is enabled will likely result in the selected track being overriden. Consider disabling abr before calling selectVariantTrack().");var f = e.variants.find(function (c) {
	          return c.id == b.id;
	        });f && Ce(f) && (zl(this, e, f, !1), Xl(this, f, c, d), this.Fb = new Xh(f), Kl(this, e.variants));
	      } else if (this.a && this.a.audioTracks) {
	        c = Array.from(this.a.audioTracks);c = r(c);for (d = c.next(); !d.done; d = c.next()) d = d.value, ze(d) == b.id && (d.enabled = !0);Yl(this);
	      }
	    };X.prototype.selectVariantTrack = X.prototype.Sf;X.prototype.He = function () {
	      return Zl(this.Sc());
	    };X.prototype.getAudioLanguagesAndRoles = X.prototype.He;X.prototype.af = function () {
	      return Zl(this.qb());
	    };X.prototype.getTextLanguagesAndRoles = X.prototype.af;X.prototype.Ge = function () {
	      return Array.from($l(this.Sc()));
	    };X.prototype.getAudioLanguages = X.prototype.Ge;X.prototype.$e = function () {
	      return Array.from($l(this.qb()));
	    };X.prototype.getTextLanguages = X.prototype.$e;
	    X.prototype.Pf = function (b, c) {
	      if (this.b && this.m) {
	        var d = Jl(this);this.Fb = new Yh(b, c || "", 0);am(this, d);
	      } else if (this.a && this.a.audioTracks) {
	        d = Array.from(this.a.audioTracks);d = r(d);for (var e = d.next(); !e.done; e = d.next()) e = e.value, e.language == b && (e.enabled = !0);Yl(this);
	      }
	    };X.prototype.selectAudioLanguage = X.prototype.Pf;
	    X.prototype.Rf = function (b, c) {
	      if (this.b && this.m) {
	        var d = Jl(this);this.na = b;this.fb = c || "";var e = Fe(d.textStreams, this.na, this.fb)[0] || null;e && (Ul(this, d, e, !1), (this.c.streaming.alwaysStreamText || this.ic()) && Vl(this, e));
	      } else (d = this.qb().filter(function (c) {
	        return c.language == b;
	      })[0]) && this.od(d);
	    };X.prototype.selectTextLanguage = X.prototype.Rf;
	    X.prototype.Tf = function (b) {
	      if (this.b && this.m) {
	        for (var c = Jl(this), d = null, e = r(Rl(this)), f = e.next(); !f.done; f = e.next()) if (f = f.value, f.audio.label == b) {
	          d = f;break;
	        }null != d && (this.Fb = new Yh(d.language, "", 0, b), am(this, c));
	      }
	    };X.prototype.selectVariantsByLabel = X.prototype.Tf;X.prototype.ic = function () {
	      var b = this.gb;return this.b ? this.F.g.isTextVisible() : this.a && this.a.src && this.a.textTracks ? Array.from(this.a.textTracks).some(function (b) {
	        return "showing" == b.mode;
	      }) : b;
	    };X.prototype.isTextTrackVisible = X.prototype.ic;
	    X.prototype.Wf = function (b) {
	      var c = this;return t(function e() {
	        var f, g, h, k, l, m;return z(e, function (e) {
	          switch (e.j) {case 1:
	              f = c.gb;g = b;if (f == g) return e["return"]();c.gb = g;if (c.h != Gl) {
	                if (c.a && c.a.src && c.a.textTracks) {
	                  h = Array.from(c.a.textTracks);for (var n = r(h), v = n.next(); !v.done; v = n.next()) k = v.value, "disabled" != k.mode && (k.mode = b ? "showing" : "hidden");
	                }e.A(2);break;
	              }c.F.g.setTextVisibility(b);if (c.c.streaming.alwaysStreamText) {
	                e.A(2);break;
	              }if (!b) {
	                n = c.f;n.D = !0;if (v = n.b.get("text")) Pi(v), n.b["delete"]("text");
	                e.A(2);break;
	              }l = Jl(c);m = Fe(l.textStreams, c.na, c.fb);if (!(0 < m.length)) {
	                e.A(2);break;
	              }return u(e, Vi(c.f, m[0]), 2);case 2:
	              bm(c), w(e);}
	        });
	      });
	    };X.prototype.setTextTrackVisibility = X.prototype.Wf;X.prototype.We = function () {
	      if (!this.V()) return null;if (this.b) return new Date(1E3 * (this.b.presentationTimeline.f + this.a.currentTime));if (this.a && this.a.getStartDate) {
	        var b = this.a.getStartDate();return isNaN(b.getTime()) ? null : new Date(b.getTime() + 1E3 * this.a.currentTime);
	      }return null;
	    };X.prototype.getPlayheadTimeAsDate = X.prototype.We;
	    X.prototype.Ye = function () {
	      if (!this.V()) return null;if (this.b) return new Date(1E3 * this.b.presentationTimeline.f);if (this.a && this.a.getStartDate) {
	        var b = this.a.getStartDate();return isNaN(b.getTime()) ? null : b;
	      }return null;
	    };X.prototype.getPresentationStartTimeAsDate = X.prototype.Ye;X.prototype.Oc = function () {
	      var b = { total: [], audio: [], video: [], text: [] };this.h == Ll && (b.total = rd(this.a.buffered));this.h == Gl && this.F.Oc(b);return b;
	    };X.prototype.getBufferedInfo = X.prototype.Oc;
	    X.prototype.getStats = function () {
	      if (this.h != Gl && this.h != Ll) return { width: NaN, height: NaN, streamBandwidth: NaN, decodedFrames: NaN, droppedFrames: NaN, estimatedBandwidth: NaN, loadLatency: NaN, playTime: NaN, pauseTime: NaN, bufferingTime: NaN, switchHistory: [], stateHistory: [] };wl(this);var b = this.a;if (b.getVideoPlaybackQuality) {
	        b = b.getVideoPlaybackQuality();var c = this.v,
	            d = Number(b.totalVideoFrames);c.i = Number(b.droppedVideoFrames);c.h = d;
	      }if (this.h == Gl) {
	        if (b = Ql(this)) this.v.l = b.bandwidth;b && b.video && (c = this.v, d = b.video.height || NaN, c.m = b.video.width || NaN, c.g = d);b = this.l.getBandwidthEstimate();this.v.f = b;
	      }var e = this.v;b = e.m;c = e.g;d = e.l;var f = e.h,
	          g = e.i,
	          h = e.f,
	          k = e.b,
	          l = Sk(e.a, "playing"),
	          m = Sk(e.a, "paused"),
	          n = Sk(e.a, "buffering"),
	          p = Tk(e.a),
	          v = [];e = r(e.c.a);for (var x = e.next(); !x.done; x = e.next()) x = x.value, v.push({ timestamp: x.timestamp, id: x.id, type: x.type, fromAdaptation: x.fromAdaptation, bandwidth: x.bandwidth });return { width: b, height: c, streamBandwidth: d, decodedFrames: f, droppedFrames: g, estimatedBandwidth: h, loadLatency: k, playTime: l, pauseTime: m,
	        bufferingTime: n, stateHistory: p, switchHistory: v };
	    };X.prototype.getStats = X.prototype.getStats;
	    X.prototype.addTextTrack = function (b, c, d, e, f, g) {
	      var h = this;return t(function l() {
	        var m, n, p, v, x, B, y, E, H;return z(l, function (l) {
	          switch (l.j) {case 1:
	              if (h.h == Ll) throw Error("State error!");if (h.h != Gl) throw Error("State error!");m = Jl(h);n = xd;p = h.b.periods.indexOf(m);v = p + 1;x = v >= h.b.periods.length ? h.b.presentationTimeline.Y() : h.b.periods[v].startTime;B = x - m.startTime;if (Infinity == B) throw new D(1, 4, 4033);y = new S(1, 0, B, function () {
	                return [b];
	              }, 0, null);E = { id: h.Kd++, originalId: null, createSegmentIndex: Promise.resolve.bind(Promise),
	                findSegmentPosition: function () {
	                  return 1;
	                }, getSegmentReference: function (b) {
	                  return 1 == b ? y : null;
	                }, initSegmentReference: null, presentationTimeOffset: 0, mimeType: e, codecs: f || "", kind: d, encrypted: !1, keyId: null, language: c, label: g || null, type: n.qa, primary: !1, trickModeVideo: null, emsgSchemeIdUris: null, roles: [], channelsCount: null, audioSamplingRate: null, closedCaptions: null };h.Zb.add(E);m.textStreams.push(E);return u(l, Vi(h.f, E), 2);case 2:
	              return (H = Ti(h.f, "text")) && Oh(h.$, m, H), h.Zb["delete"](E), Ol(h, m), Il(h), l["return"](ye(E));}
	        });
	      });
	    };
	    X.prototype.addTextTrack = X.prototype.addTextTrack;X.prototype.qd = function (b, c) {
	      this.$b.width = b;this.$b.height = c;
	    };X.prototype.setMaxHardwareResolution = X.prototype.qd;X.prototype.nd = function () {
	      if (this.h == Gl) {
	        var b = this.f;if (b.f) b = !1;else if (b.m) b = !1;else {
	          for (var c = r(b.b.values()), d = c.next(); !d.done; d = c.next()) d = d.value, d.Nb && (d.Nb = !1, Yi(b, d, .1));b = !0;
	        }
	      } else b = !1;return b;
	    };X.prototype.retryStreaming = X.prototype.nd;X.prototype.Ne = function () {
	      return this.b;
	    };X.prototype.getManifest = X.prototype.Ne;
	    X.prototype.Oe = function () {
	      return this.s ? this.s.constructor : null;
	    };X.prototype.getManifestParserFactory = X.prototype.Oe;function zl(b, c, d, e) {
	      Ph(b.$, c).variant = d;b = b.v.c;b.c != d && (b.c = d, b.a.push({ timestamp: Date.now() / 1E3, id: d.id, type: "variant", fromAdaptation: e, bandwidth: d.bandwidth }));
	    }function Ul(b, c, d, e) {
	      Oh(b.$, c, d);b = b.v.c;b.b != d && (b.b = d, b.a.push({ timestamp: Date.now() / 1E3, id: d.id, type: "text", fromAdaptation: e, bandwidth: null }));
	    }
	    function Xk(b) {
	      var c = Nk();c.streaming.failureCallback = function (c) {
	        var d = [1001, 1002, 1003];b.V() && d.includes(c.code) && (c.severity = 1, b.nd());
	      };c.textDisplayFactory = function () {
	        return new Hk(b.a);
	      };return c;
	    }
	    function xl(b, c) {
	      for (var d = 0; d < c.length; d++) {
	        for (var e = c[d], f = new Map(), g = r(e.variants), h = g.next(); !h.done; h = g.next()) if (h = h.value, h.video && h.video.closedCaptions) {
	          h = h.video;for (var k = r(h.closedCaptions.keys()), l = k.next(); !l.done; l = k.next()) if (l = l.value, !f.has(l)) {
	            var m = { id: b.Kd++, originalId: l, createSegmentIndex: Promise.resolve.bind(Promise), findSegmentPosition: function () {
	                return null;
	              }, getSegmentReference: function () {
	                return null;
	              }, initSegmentReference: null, presentationTimeOffset: 0, mimeType: "application/cea-608",
	              codecs: "", kind: "caption", encrypted: !1, keyId: null, language: h.closedCaptions.get(l), label: null, type: "text", primary: !1, trickModeVideo: null, emsgSchemeIdUris: null, roles: h.roles, channelsCount: null, audioSamplingRate: null, closedCaptions: null };f.set(l, m);
	          }
	        }f = r(f.values());for (g = f.next(); !g.done; g = f.next()) e.textStreams.push(g.value);
	      }
	    }
	    function sl(b, c) {
	      var d = b.f ? Si(b.f) : null,
	          e = b.f ? Ui(b.f) : null;c.forEach(ve.bind(null, b.i, d, e));d = Ob(c, function (b) {
	        return b.variants.some(Ce);
	      });if (0 == d) throw new D(2, 4, 4032);if (d < c.length) throw new D(2, 4, 4011);c.forEach(function (b) {
	        ue(b.variants, this.c.restrictions, this.$b) && this.f && Jl(this) == b && Il(this);cm(this, b.variants);
	      }.bind(b));
	    }q = X.prototype;
	    q.Jc = function (b) {
	      var c = this.f ? Si(this.f) : null,
	          d = this.f ? Ui(this.f) : null;ve(this.i, c, d, b);c = b.variants;if (!c.some(Ce)) throw new D(2, 4, 4011);cm(this, b.variants);ue(c, this.c.restrictions, this.$b) && this.f && Jl(this) == b && Il(this);if (b = this.i ? this.i.a : null) for (c = r(c), d = c.next(); !d.done; d = c.next()) {
	        d = r(d.value.drmInfos);for (var e = d.next(); !e.done; e = d.next()) if (e = e.value, e.keySystem == b.keySystem) {
	          e = r(e.initData || []);for (var f = e.next(); !f.done; f = e.next()) f = f.value, Vc(this.i, f.initDataType, f.initData);
	        }
	      }
	    };
	    function Xl(b, c, d, e) {
	      d = void 0 === d ? !1 : d;e = void 0 === e ? 0 : e;b.kb ? (b.Ga = c, b.Hd = d, b.Fd = e) : (aj(b.f, c, d, e), Yl(b));
	    }function Vl(b, c) {
	      b.kb ? b.oa = c : ($i(b.f, c, !0, 0, !1), Wl(b));
	    }function Hl(b, c) {
	      function d(b, c) {
	        if (!b) return null;var d = b.findSegmentPosition(c - g.startTime);return null == d ? null : (d = b.getSegmentReference(d)) ? d.startTime + g.startTime : null;
	      }var e = Si(b.f),
	          f = Ui(b.f),
	          g = Jl(b);e = d(e, c);f = d(f, c);return null != f && null != e ? Math.max(f, e) : null != f ? f : null != e ? e : c;
	    }
	    function ql(b) {
	      var c = b.Tc();if (b.v && b.C && b.m) {
	        var d = b.W;d.f = c;si(d);wl(b);
	      }b.dispatchEvent(new I("buffering", { buffering: c }));
	    }function wl(b) {
	      if (b.v && b.C) {
	        var c = b.v.a;b.C.a == di ? Rk(c, "buffering") : b.a.paused ? Rk(c, "paused") : b.a.ended ? Rk(c, "ended") : Rk(c, "playing");
	      }
	    }function Kl(b, c) {
	      try {
	        cm(b, c);
	      } catch (e) {
	        return b.Ma(e), null;
	      }var d = c.filter(function (b) {
	        return Ce(b);
	      });d = b.Fb.create(d);b.l.setVariants(Array.from(d.values()));return b.l.chooseVariant();
	    }
	    function Ol(b, c) {
	      am(b, c, !1);var d = !1;d = void 0 === d ? !0 : d;var e = Fe(c.textStreams, b.na, b.fb)[0] || null;e && (b.c.streaming.alwaysStreamText || b.ic()) && (Ul(b, c, e, !0), Vl(b, e));d && Al(b);Al(b);
	    }function am(b, c, d) {
	      d = void 0 === d ? !0 : d;var e = Kl(b, c.variants);e && (zl(b, c, e, !0), Xl(b, e, !0));d && Al(b);
	    }
	    q.hf = function (b) {
	      try {
	        this.kb = !0;this.l.disable();Pl(this);var c = Kl(this, b.variants),
	            d = Fe(b.textStreams, this.na, this.fb)[0] || null;this.Ga && (b.variants.includes(this.Ga) && (c = this.Ga), this.Ga = null);this.oa && (b.textStreams.includes(this.oa) && (d = this.oa), this.oa = null);c && zl(this, b, c, !0);d && Ul(this, b, d, !0);var e = this.f,
	            f = e.b.get("video");if (f) var g = e.c.periods[f.ia];else {
	          var h = e.b.get("audio");g = h ? e.c.periods[h.ia] : null;
	        }var k = c ? c.audio : null;if (!g && d) {
	          var l;if (l = k) {
	            b = d;var m = M(this.c.preferredTextLanguage),
	                n = M(k.language),
	                p = M(b.language);l = oe(p, m) && !oe(n, p);
	          }l && (this.gb = !0);this.gb && this.F.g.setTextVisibility(!0);bm(this);
	        }return this.c.streaming.alwaysStreamText || this.ic() ? { variant: c, text: d } : { variant: c, text: null };
	      } catch (v) {
	        return this.Ma(v), { variant: null, text: null };
	      }
	    };q.ve = function () {
	      this.kb = !1;this.c.abr.enabled && (this.l.enable(), Pl(this));this.Ga && (aj(this.f, this.Ga, this.Hd, this.Fd), Yl(this), this.Ga = null);this.oa && ($i(this.f, this.oa, !0, 0, !1), Wl(this), this.oa = null);
	    };
	    q.nf = function () {
	      this.s && this.s.update && this.s.update();
	    };q.uf = function () {
	      this.m && this.m.s();
	    };function Al(b) {
	      dm(b, new I("adaptation"));
	    }function Il(b) {
	      dm(b, new I("trackschanged"));
	    }function Yl(b) {
	      dm(b, new I("variantchanged"));
	    }function Wl(b) {
	      dm(b, new I("textchanged"));
	    }function bm(b) {
	      dm(b, new I("texttrackvisibility"));
	    }function Pl(b) {
	      dm(b, new I("abrstatuschanged", { wg: b.c.abr.enabled }));
	    }q.Ma = function (b) {
	      if (this.h != il) {
	        var c = new I("error", { detail: b });this.dispatchEvent(c);c.defaultPrevented && (b.handled = !0);
	      }
	    };
	    function rl(b, c, d) {
	      b.dispatchEvent(new I(c, { detail: { schemeIdUri: d.schemeIdUri, value: d.value, startTime: d.startTime, endTime: d.endTime, id: d.id, eventElement: d.eventElement } }));
	    }function pl(b) {
	      if (!b.a.error) return null;var c = b.a.error.code;if (1 == c) return null;var d = b.a.error.msExtendedCode;d && (0 > d && (d += Math.pow(2, 32)), d = d.toString(16));return new D(2, 3, 3016, c, d, b.a.error.message);
	    }
	    function ul(b, c) {
	      if (b.f) {
	        var d = Jl(b),
	            e = !1,
	            f = Object.keys(c),
	            g = 1 == f.length && "00" == f[0];f.length && b.b.periods.forEach(function (b) {
	          b.variants.forEach(function (b) {
	            Ie(b).forEach(function (d) {
	              var f = b.allowedByKeySystem;d.keyId && (d = c[g ? "00" : d.keyId], b.allowedByKeySystem = !!d && !kl.includes(d));f != b.allowedByKeySystem && (e = !0);
	            });
	          });
	        });f = Si(b.f);var h = Ui(b.f);(f = He(f, h, d.variants)) && !f.allowedByKeySystem && am(b, d);e && (Il(b), Kl(b, d.variants));
	      }
	    }
	    function vl(b, c, d) {
	      if (b.s && b.s.onExpirationUpdated) b.s.onExpirationUpdated(c, d);b.dispatchEvent(new I("expirationupdated"));
	    }function yl(b, c, d) {
	      0 < c && (b.V() || b.fe(c));d < b.Y() && (b.V() || b.wa(d));
	    }
	    function cm(b, c) {
	      var d = b.i ? oc(b.i.T) : {},
	          e = Object.keys(d);e = e.length && "00" == e[0];for (var f = !1, g = !1, h = [], k = [], l = r(c), m = l.next(); !m.done; m = l.next()) {
	        m = m.value;var n = [];m.audio && n.push(m.audio);m.video && n.push(m.video);n = r(n);for (var p = n.next(); !p.done; p = n.next()) if (p = p.value, p.keyId) {
	          var v = d[e ? "00" : p.keyId];v ? kl.includes(v) && (k.includes(v) || k.push(v)) : h.includes(p.keyId) || h.push(p.keyId);
	        }m.allowedByApplication ? m.allowedByKeySystem && (f = !0) : g = !0;
	      }if (!f) throw new D(2, 4, 4012, { hasAppRestrictions: g, missingKeys: h,
	        restrictedKeyStatuses: k });
	    }function dm(b, c) {
	      t(function e() {
	        return z(e, function (e) {
	          switch (e.j) {case 1:
	              return u(e, Promise.resolve(), 2);case 2:
	              b.h != il && b.dispatchEvent(c), w(e);}
	        });
	      });
	    }function $l(b) {
	      var c = new Set();b = r(b);for (var d = b.next(); !d.done; d = b.next()) d = d.value, d.language ? c.add(M(d.language)) : c.add("und");return c;
	    }
	    function Zl(b) {
	      var c = new Map();b = r(b);for (var d = b.next(); !d.done; d = b.next()) {
	        var e = d.value;d = "und";var f = [];e.language && (d = M(e.language));"variant" == e.type ? f = e.audioRoles : f = e.roles;f && f.length || (f = [""]);c.has(d) || c.set(d, new Set());e = r(f);for (f = e.next(); !f.done; f = e.next()) f = f.value, c.get(d).add(f);
	      }var g = [];c.forEach(function (b, c) {
	        for (var d = r(b), e = d.next(); !e.done; e = d.next()) g.push({ language: c, role: e.value });
	      });return g;
	    }
	    function Rl(b) {
	      b = Jl(b);return null == b ? [] : b.variants.filter(function (b) {
	        return Ce(b);
	      });
	    }function Tl(b) {
	      var c = Jl(b);return null == c ? [] : c.textStreams.filter(function (c) {
	        return !b.Zb.has(c);
	      });
	    }function Jl(b) {
	      var c = b.m.h(),
	          d = null;b = r(b.b.periods);for (var e = b.next(); !e.done; e = b.next()) e = e.value, e.startTime <= c && (d = e);return d;
	    }function Ql(b) {
	      var c = Jl(b);return Ph(b.$, c).variant;
	    }
	    function Sl(b) {
	      var c = Jl(b);if (null == c) return null;if (!Ph(b.$, c).text) {
	        var d = Fe(c.textStreams, b.na, b.fb);d.length && Oh(b.$, c, d[0]);
	      }return Ph(b.$, c).text;
	    }function ml() {
	      return new D(2, 7, 7E3);
	    }function hl(b, c, d, e, f, g) {
	      return e == b && f.u == g.u && f.uri == g.uri && f.mimeType == g.mimeType && f.za == g.za ? c : d;
	    }function Ck() {
	      return { za: null, u: null, mimeType: null, startTime: null, ud: null, uri: null };
	    }
	    function nl(b) {
	      return new Promise(function (c, d) {
	        b.Ya = function () {
	          return d(ml());
	        };b.lc = function () {
	          return c();
	        };b.onError = function (b) {
	          return d(b);
	        };b.nc = function () {
	          return d(ml());
	        };
	      });
	    }var il = 0,
	        Wk = 1,
	        Gl = 2,
	        Ll = 3;X.LoadMode = { DESTROYED: il, NOT_LOADED: Wk, MEDIA_SOURCE: Gl, SRC_EQUALS: Ll };function em(b, c, d) {
	      var e = void 0 == c.expiration ? Infinity : c.expiration,
	          f = c.presentationTimeline.Y();c = fm(c.periods[0]);return { offlineUri: null, originalManifestUri: b, duration: f, size: 0, expiration: e, tracks: c, appMetadata: d };
	    }function gm(b, c) {
	      var d = rk(new pk(b.va(), b.ba()), c.periods[0], new V(null, 0)),
	          e = c.appMetadata || {};d = fm(d);return { offlineUri: b.toString(), originalManifestUri: c.originalManifestUri, duration: c.duration, size: c.size, expiration: c.expiration, tracks: d, appMetadata: e };
	    }
	    function fm(b) {
	      var c = [],
	          d = De(b.variants);d = r(d);for (var e = d.next(); !e.done; e = d.next()) c.push(xe(e.value));b = r(b.textStreams);for (d = b.next(); !d.done; d = b.next()) c.push(ye(d.value));return c;
	    }function hm() {
	      this.a = {};
	    }function im(b, c, d) {
	      d = d.endTime - d.startTime;return jm(b, c) * d;
	    }function jm(b, c) {
	      var d = b.a[c];null == d && (d = 0);return d;
	    }function km(b) {
	      this.a = !1;this.b = new F();this.c = b;
	    }km.prototype.destroy = function () {
	      var b = this;if (this.a) return this.b;this.a = !0;return this.c().then(function () {
	        b.b.resolve();
	      }, function () {
	        b.b.resolve();
	      });
	    };function lm(b, c) {
	      for (var d = { width: Infinity, height: Infinity }, e = r(b.periods), f = e.next(); !f.done; f = e.next()) f = f.value, f.variants = f.variants.filter(function (b) {
	        return te(b, c, d);
	      });
	    }function mm(b) {
	      b = r(b.periods);for (var c = b.next(); !c.done; c = b.next()) c = c.value, c.variants = c.variants.filter(function (b) {
	        var c = !0;b.audio && (c = c && be(b.audio));b.video && (c = c && be(b.video));return c;
	      });
	    }
	    function nm(b, c) {
	      for (var d = r(b.periods), e = d.next(); !e.done; e = d.next()) e = e.value, e.variants = e.variants.filter(function (b) {
	        return kd(c, b);
	      });
	    }function om(b) {
	      var c = new pm();b.periods.forEach(function (b, d) {
	        var e = qm(b.variants);if (0 == d) {
	          e = r(e.a);for (var f = e.next(); !f.done; f = e.next()) c.add(f.value);
	        } else rm(c, e);
	      });b = r(b.periods);for (var d = b.next(); !d.done; d = b.next()) d = d.value, d.variants = d.variants.filter(function (b) {
	        return sm(c, new tm(b));
	      });
	    }
	    function um(b, c) {
	      var d = new pm();b.periods.forEach(function (b, f) {
	        0 < f && (b.variants = b.variants.filter(function (b) {
	          return sm(d, new tm(b));
	        }));c(b);d = qm(b.variants);
	      });
	    }function tm(b) {
	      var c = b.audio;b = b.video;this.b = c ? c.mimeType : null;this.a = c ? c.codecs.split(".")[0] : null;this.f = b ? b.mimeType : null;this.c = b ? b.codecs.split(".")[0] : null;
	    }function pm() {
	      this.a = [];
	    }pm.prototype.add = function (b) {
	      sm(this, b) || this.a.push(b);
	    };function rm(b, c) {
	      b.a = b.a.filter(function (b) {
	        return sm(c, b);
	      });
	    }
	    function sm(b, c) {
	      return b.a.some(function (b) {
	        return c.b == b.b && c.a == b.a && c.f == b.f && c.c == b.c;
	      });
	    }function qm(b) {
	      var c = new pm();b = r(b);for (var d = b.next(); !d.done; d = b.next()) c.add(new tm(d.value));return c;
	    }function Y(b) {
	      var c = this;if (b && b.constructor != X) throw new D(2, 9, 9008);this.b = this.a = null;b ? (this.a = b.c, this.b = b.Kb()) : (this.a = Nk(), this.b = new J());this.f = !1;this.c = [];this.g = [];var d = !b;this.h = new km(function () {
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
	    }A("shaka.offline.Storage", Y);
	    function vm() {
	      if (tc()) a: {
	        var b = r(Pj.values());for (var c = b.next(); !c.done; c = b.next()) if (c = c.value, c = c()) {
	          c.destroy();b = !0;break a;
	        }b = !1;
	      } else b = !1;return b;
	    }Y.support = vm;Y.prototype.destroy = function () {
	      return this.h.destroy();
	    };Y.prototype.destroy = Y.prototype.destroy;
	    Y.prototype.configure = function (b, c) {
	      2 == arguments.length && "string" == typeof b && (b = Lk(b, c));var d = b,
	          e = !1;null != d.trackSelectionCallback && (e = !0, d.offline = d.offline || {}, d.offline.trackSelectionCallback = d.trackSelectionCallback, delete d.trackSelectionCallback);null != d.progressCallback && (e = !0, d.offline = d.offline || {}, d.offline.progressCallback = d.progressCallback, delete d.progressCallback);null != d.usePersistentLicense && (e = !0, d.offline = d.offline || {}, d.offline.usePersistentLicense = d.usePersistentLicense, delete d.usePersistentLicense);
	      e && Le("Storage.configure with OfflineConfig", "Please configure storage with a player configuration.");return Pk(this.a, b);
	    };Y.prototype.configure = Y.prototype.configure;Y.prototype.getConfiguration = function () {
	      var b = Nk();Pk(b, this.a, Nk());return b;
	    };Y.prototype.getConfiguration = Y.prototype.getConfiguration;Y.prototype.Kb = function () {
	      return this.b;
	    };Y.prototype.getNetworkingEngine = Y.prototype.Kb;
	    Y.prototype.store = function (b, c, d) {
	      var e = this;return wm(this, xm(this, b, c || {}, function () {
	        return t(function g() {
	          var c, k;return z(g, function (g) {
	            switch (g.j) {case 1:
	                return d && "string" != typeof d ? (Le("Storing with a manifest parser factory", "Please register a manifest parser and for the mime-type."), c = d, g["return"](new c())) : u(g, U.create(b, e.b, e.a.manifest.retryParameters, d), 2);case 2:
	                return k = g.o, g["return"](k);}
	          });
	        });
	      }));
	    };Y.prototype.store = Y.prototype.store;Y.prototype.Ze = function () {
	      return this.f;
	    };
	    Y.prototype.getStoreInProgress = Y.prototype.Ze;
	    function xm(b, c, d, e) {
	      return t(function g() {
	        var h, k, l, m, n, p, v, x, B, y;return z(g, function (g) {
	          switch (g.j) {case 1:
	              ym();if (b.f) return g["return"](Promise.reject(new D(2, 9, 9006)));b.f = !0;return u(g, zm(b, c, e), 2);case 2:
	              h = g.o;Am(b);k = !h.presentationTimeline.V() && !h.presentationTimeline.Xa();if (!k) throw new D(2, 9, 9005, c);l = null;m = new Oj();p = n = null;xa(g, 3, 4);return u(g, Bm(b, h, function (b) {
	                p = p || b;
	              }), 6);case 6:
	              l = g.o;Am(b);if (p) throw p;Cm(b, h, l);return u(g, m.init(), 7);case 7:
	              return Am(b), u(g, Qj(m), 8);case 8:
	              return n = g.o, Am(b), u(g, Dm(b, n.ba, l, h, c, d), 9);case 9:
	              v = g.o;Am(b);if (p) throw p;return u(g, n.ba.addManifests([v]), 10);case 10:
	              return x = g.o, Am(b), B = new nk("manifest", n.path.va, n.path.ba, x[0]), g["return"](gm(B, v));case 4:
	              return Ca(g), b.f = !1, b.c = [], u(g, m.destroy(), 11);case 11:
	              if (!l) {
	                g.A(12);break;
	              }return u(g, l.destroy(), 12);case 12:
	              Da(g, 0);break;case 3:
	              y = Ba(g);if (!n) {
	                g.A(14);break;
	              }return u(g, n.ba.removeSegments(b.c, function () {}), 14);case 14:
	              throw p || y;}
	        });
	      });
	    }
	    function Cm(b, c, d) {
	      lm(c, b.a.restrictions);mm(c);nm(c, d);om(c);um(c, function (c) {
	        for (var d = [], e = r(c.variants), h = e.next(); !h.done; h = e.next()) d.push(xe(h.value));e = r(c.textStreams);for (h = e.next(); !h.done; h = e.next()) d.push(ye(h.value));d = b.a.offline.trackSelectionCallback(d);var k = new Set(),
	            l = new Set();d = r(d);for (e = d.next(); !e.done; e = d.next()) e = e.value, "variant" == e.type && k.add(e.id), "text" == e.type && l.add(e.id);c.variants = c.variants.filter(function (b) {
	          return k.has(b.id);
	        });c.textStreams = c.textStreams.filter(function (b) {
	          return l.has(b.id);
	        });
	      });
	      Em(c);
	    }
	    function Dm(b, c, d, e, f, g) {
	      return t(function k() {
	        var l, m, n, p, v, x, B, y;return z(k, function (k) {
	          switch (k.j) {case 1:
	              return l = em(f, e, g), m = e.periods.some(function (b) {
	                return b.variants.some(function (b) {
	                  return b.drmInfos && b.drmInfos.length;
	                });
	              }), n = e.periods.some(function (b) {
	                return b.variants.some(function (b) {
	                  return b.drmInfos.some(function (b) {
	                    return b.initData && b.initData.length;
	                  });
	                });
	              }), p = m && !n, v = new Dj(b.b, function (c, d) {
	                l.size = d;b.a.offline.progressCallback(l, c);
	              }, function (c) {
	                p && b.a.offline.usePersistentLicense && Vc(d, "cenc", c);
	              }), ya(k, 2), B = x = Fm(b, v, c, d, e, f, g), u(k, Gj(v), 4);case 4:
	              B.size = k.o;x.expiration = d.Jb();y = ad(d);x.sessionIds = b.a.offline.usePersistentLicense ? y : [];if (m && b.a.offline.usePersistentLicense && !y.length) throw new D(2, 9, 9007);return k["return"](x);case 2:
	              return Ca(k), u(k, v.destroy(), 5);case 5:
	              Da(k, 0);}
	        });
	      });
	    }Y.prototype.remove = function (b) {
	      return wm(this, Gm(this, b));
	    };Y.prototype.remove = Y.prototype.remove;
	    function Gm(b, c) {
	      return t(function e() {
	        var f, g, h, k, l, m;return z(e, function (e) {
	          switch (e.j) {case 1:
	              ym();f = ok(c);if (null == f || "manifest" != f.a) return e["return"](Promise.reject(new D(2, 9, 9004, c)));g = f;h = new Oj();ya(e, 2);return u(e, h.init(), 4);case 4:
	              return u(e, Sj(h, g.va(), g.ba()), 5);case 5:
	              return k = e.o, u(e, k.getManifests([g.key()]), 6);case 6:
	              return l = e.o, m = l[0], u(e, Promise.all([Hm(b, m, h), Im(b, k, g, m)]), 2);case 2:
	              return Ca(e), u(e, h.destroy(), 8);case 8:
	              Da(e, 0);}
	        });
	      });
	    }
	    function Jm(b, c) {
	      for (var d = [], e = r(b.periods), f = e.next(); !f.done; f = e.next()) {
	        f = r(f.value.streams);for (var g = f.next(); !g.done; g = f.next()) g = g.value, c && "video" == g.contentType ? d.push({ contentType: pc(g.mimeType, g.codecs), robustness: b.drmInfo.videoRobustness }) : c || "audio" != g.contentType || d.push({ contentType: pc(g.mimeType, g.codecs), robustness: b.drmInfo.audioRobustness });
	      }return d;
	    }function Hm(b, c, d) {
	      return t(function f() {
	        return z(f, function (f) {
	          switch (f.j) {case 1:
	              return u(f, Km(b.b, b.a.drm, d, c), 0);}
	        });
	      });
	    }
	    function Im(b, c, d, e) {
	      function f() {
	        k += 1;b.a.offline.progressCallback(l, k / h);
	      }var g = Lm(e),
	          h = g.length + 1,
	          k = 0,
	          l = gm(d, e);return Promise.all([c.removeSegments(g, f), c.removeManifests([d.key()], f)]);
	    }Y.prototype.Jf = function () {
	      return wm(this, Mm(this));
	    };Y.prototype.removeEmeSessions = Y.prototype.Jf;
	    function Mm(b) {
	      return t(function d() {
	        var e, f, g, h, k, l, m, n, p;return z(d, function (d) {
	          switch (d.j) {case 1:
	              return ym(), e = b.b, f = b.a.drm, g = new Oj(), h = !1, ya(d, 2), u(d, g.init(), 4);case 4:
	              k = [];Tj(g, function (b) {
	                return k.push(b);
	              });l = Promise.resolve();m = {};n = r(k);for (p = n.next(); !p.done; m = { sc: m.sc }, p = n.next()) m.sc = p.value, l = l.then(function (b) {
	                return function () {
	                  return t(function y() {
	                    var d, g;return z(y, function (k) {
	                      switch (k.j) {case 1:
	                          return u(k, b.sc.getAll(), 2);case 2:
	                          return d = k.o, u(k, yk(f, e, d), 3);case 3:
	                          return g = k.o, u(k, b.sc.remove(g), 4);case 4:
	                          g.length != d.length && (h = !0), w(k);}
	                    });
	                  });
	                };
	              }(m));return u(d, l, 2);case 2:
	              return Ca(d), u(d, g.destroy(), 6);case 6:
	              Da(d, 3);break;case 3:
	              return d["return"](!h);}
	        });
	      });
	    }Y.prototype.list = function () {
	      return wm(this, Nm());
	    };Y.prototype.list = Y.prototype.list;
	    function Nm() {
	      return t(function c() {
	        var d, e, f;return z(c, function (c) {
	          switch (c.j) {case 1:
	              return ym(), d = [], e = new Oj(), ya(c, 2), u(c, e.init(), 4);case 4:
	              return f = Promise.resolve(), Rj(e, function (c, e) {
	                f = f.then(function () {
	                  return t(function m() {
	                    var f;return z(m, function (g) {
	                      switch (g.j) {case 1:
	                          return u(g, e.getAllManifests(), 2);case 2:
	                          f = g.o, f.forEach(function (e, f) {
	                            var g = gm(new nk("manifest", c.va, c.ba, f), e);d.push(g);
	                          }), w(g);}
	                    });
	                  });
	                });
	              }), u(c, f, 2);case 2:
	              return Ca(c), u(c, e.destroy(), 6);case 6:
	              Da(c, 3);break;case 3:
	              return c["return"](d);}
	        });
	      });
	    }
	    function zm(b, c, d) {
	      return t(function f() {
	        var g, h, k, l, m, n;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = null, h = b.b, k = { networkingEngine: h, filterAllPeriods: function () {}, filterNewPeriod: function () {}, onTimelineRegionAdded: function () {}, onEvent: function () {}, onError: function (b) {
	                  g = b;
	                } }, u(f, d(), 2);case 2:
	              return l = f.o, l.configure(b.a.manifest), Am(b), ya(f, 3), u(f, l.start(c, k), 5);case 5:
	              return m = f.o, Am(b), n = Om(m), u(f, Promise.all(Array.from(n).map(function (b) {
	                return b.createSegmentIndex();
	              })), 6);case 6:
	              Am(b);
	              if (g) throw g;return f["return"](m);case 3:
	              return Ca(f), u(f, l.stop(), 7);case 7:
	              Da(f, 0);}
	        });
	      });
	    }function Bm(b, c, d) {
	      return t(function f() {
	        var g, h, k;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return g = new Fc({ tb: b.b, onError: d, mc: function () {}, onExpirationUpdated: function () {}, onEvent: function () {} }), h = ni(c.periods), k = b.a, g.configure(k.drm), u(f, Jc(g, h, k.offline.usePersistentLicense), 2);case 2:
	              return u(f, Tc(g), 3);case 3:
	              return u(f, Uc(g), 4);case 4:
	              return f["return"](g);}
	        });
	      });
	    }
	    function Fm(b, c, d, e, f, g, h) {
	      var k = new hm(),
	          l = f.periods.map(function (e) {
	        return Pm(b, c, d, k, f, e);
	      }),
	          m = e.a,
	          n = b.a.offline.usePersistentLicense;m && n && (m.initData = []);return { originalManifestUri: g, duration: f.presentationTimeline.Y(), size: 0, expiration: e.Jb(), periods: l, sessionIds: n ? ad(e) : [], drmInfo: m, appMetadata: h };
	    }
	    function Pm(b, c, d, e, f, g) {
	      f.periods.forEach(function (b) {
	        b.variants.forEach(function (b) {
	          var c = b.audio,
	              d = b.video;c && !d && (e.a[c.id] = c.bandwidth || b.bandwidth);!c && d && (e.a[d.id] = d.bandwidth || b.bandwidth);if (c && d) {
	            var f = c.bandwidth || 393216,
	                g = d.bandwidth || b.bandwidth - f;0 >= g && (g = b.bandwidth);e.a[c.id] = f;e.a[d.id] = g;
	          }
	        });b.textStreams.forEach(function (b) {
	          e.a[b.id] = 52;
	        });
	      });var h = Om(f),
	          k = new Map();h = r(h);for (var l = h.next(); !l.done; l = h.next()) {
	        l = l.value;var m = Qm(b, c, d, e, f, l);k.set(l.id, m);
	      }g.variants.forEach(function (b) {
	        b.audio && k.get(b.audio.id).variantIds.push(b.id);b.video && k.get(b.video.id).variantIds.push(b.id);
	      });return { startTime: g.startTime, streams: Array.from(k.values()) };
	    }
	    function Qm(b, c, d, e, f, g) {
	      var h = { id: g.id, originalId: g.originalId, primary: g.primary, presentationTimeOffset: g.presentationTimeOffset || 0, contentType: g.type, mimeType: g.mimeType, codecs: g.codecs, frameRate: g.frameRate, kind: g.kind, language: g.language, label: g.label, width: g.width || null, height: g.height || null, initSegmentKey: null, encrypted: g.encrypted, keyId: g.keyId, segments: [], variantIds: [] };f = f.presentationTimeline.Mb();var k = g.id,
	          l = g.initSegmentReference;l && (l = wg(l.c(), l.b, l.a, b.a.streaming.retryParameters), Ej(c, k, l, .5 * jm(e, g.id), !0, function (c) {
	        return t(function p() {
	          var e;return z(p, function (f) {
	            switch (f.j) {case 1:
	                return u(f, d.addSegments([{ data: c }]), 2);case 2:
	                e = f.o, b.c.push(e[0]), h.initSegmentKey = e[0], w(f);}
	          });
	        });
	      }));Rm(g, f, function (f) {
	        var l = wg(f.c(), f.b, f.a, b.a.streaming.retryParameters);Ej(c, k, l, im(e, g.id, f), !1, function (c) {
	          return t(function x() {
	            var e;return z(x, function (g) {
	              switch (g.j) {case 1:
	                  return u(g, d.addSegments([{ data: c }]), 2);case 2:
	                  e = g.o, b.c.push(e[0]), h.segments.push({ startTime: f.startTime, endTime: f.endTime,
	                    dataKey: e[0] }), w(g);}
	            });
	          });
	        });
	      });return h;
	    }function Rm(b, c, d) {
	      c = b.findSegmentPosition(c);for (var e = null == c ? null : b.getSegmentReference(c); e;) d(e), e = b.getSegmentReference(++c);
	    }function Am(b) {
	      if (b.h.a) throw new D(2, 9, 7001);
	    }function ym() {
	      if (!vm()) throw new D(2, 9, 9E3);
	    }function wm(b, c) {
	      return t(function e() {
	        return z(e, function (e) {
	          switch (e.j) {case 1:
	              return b.g.push(c), ya(e, 2), u(e, c, 4);case 4:
	              return e["return"](e.o);case 2:
	              Ca(e), Nb(b.g, c), Da(e, 0);}
	        });
	      });
	    }
	    function Lm(b) {
	      var c = [];b.periods.forEach(function (b) {
	        b.streams.forEach(function (b) {
	          null != b.initSegmentKey && c.push(b.initSegmentKey);b.segments.forEach(function (b) {
	            c.push(b.dataKey);
	          });
	        });
	      });return c;
	    }Y.deleteAll = function () {
	      return t(function c() {
	        var d;return z(c, function (c) {
	          switch (c.j) {case 1:
	              return d = new Oj(), ya(c, 2), u(c, d.erase(), 2);case 2:
	              return Ca(c), u(c, d.destroy(), 5);case 5:
	              Da(c, 0);}
	        });
	      });
	    };
	    function Km(b, c, d, e) {
	      return t(function g() {
	        var h, k, l;return z(g, function (g) {
	          switch (g.j) {case 1:
	              if (!e.drmInfo) return g["return"]();h = Uj(d);k = e.sessionIds.map(function (b) {
	                return { sessionId: b, keySystem: e.drmInfo.keySystem, licenseUri: e.drmInfo.licenseServerUri, serverCertificate: e.drmInfo.serverCertificate, audioCapabilities: Jm(e, !1), videoCapabilities: Jm(e, !0) };
	              });return u(g, yk(c, b, k), 2);case 2:
	              return l = g.o, u(g, h.remove(l), 3);case 3:
	              return u(g, h.add(k.filter(function (b) {
	                return -1 == l.indexOf(b.sessionId);
	              })), 0);}
	        });
	      });
	    }function Om(b) {
	      var c = new Set();b = r(b.periods);for (var d = b.next(); !d.done; d = b.next()) {
	        d = d.value;for (var e = r(d.textStreams), f = e.next(); !f.done; f = e.next()) c.add(f.value);d = r(d.variants);for (e = d.next(); !e.done; e = d.next()) e = e.value, e.audio && c.add(e.audio), e.video && c.add(e.video);
	      }return c;
	    }function Em(b) {
	      if (0 == b.periods.length) throw new D(2, 4, 4014);b = r(b.periods);for (var c = b.next(); !c.done; c = b.next()) Sm(c.value);
	    }
	    function Sm(b) {
	      b.variants.map(function (b) {
	        return b.video;
	      });var c = new Set(b.variants.map(function (b) {
	        return b.audio;
	      }));b = b.textStreams;for (var d = r(c), e = d.next(); !e.done; e = d.next()) {
	        e = r(c);for (var f = e.next(); !f.done; f = e.next());
	      }c = r(b);for (d = c.next(); !d.done; d = c.next()) for (d = r(b), e = d.next(); !e.done; e = d.next());
	    }ll.offline = vm;A("shaka.polyfill.installAll", function () {
	      for (var b = 0; b < Tm.length; ++b) try {
	        Tm[b].te();
	      } catch (c) {
	        bb("Error installing polyfill!", c);
	      }
	    });var Tm = [];function Um(b, c) {
	      c = c || 0;for (var d = { priority: c, te: b }, e = 0; e < Tm.length; e++) if (Tm[e].priority < c) {
	        Tm.splice(e, 0, d);return;
	      }Tm.push(d);
	    }A("shaka.polyfill.register", Um);Um(function () {
	      Vm();
	    }, -1);function Wm(b) {
	      var c = b.type.replace(/^(webkit|moz|MS)/, "").toLowerCase();if ("function" === typeof Event) var d = new Event(c, b);else d = document.createEvent("Event"), d.initEvent(c, b.bubbles, b.cancelable);b.target.dispatchEvent(d);
	    }
	    Um(function () {
	      if (window.Document) {
	        var b = Element.prototype;b.requestFullscreen = b.requestFullscreen || b.mozRequestFullScreen || b.msRequestFullscreen || b.webkitRequestFullscreen;b = Document.prototype;b.exitFullscreen = b.exitFullscreen || b.mozCancelFullScreen || b.msExitFullscreen || b.webkitExitFullscreen;"fullscreenElement" in document || (Object.defineProperty(document, "fullscreenElement", { get: function () {
	            return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
	          } }), Object.defineProperty(document, "fullscreenEnabled", { get: function () {
	            return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled;
	          } }));document.addEventListener("webkitfullscreenchange", Wm);document.addEventListener("webkitfullscreenerror", Wm);document.addEventListener("mozfullscreenchange", Wm);document.addEventListener("mozfullscreenerror", Wm);document.addEventListener("MSFullscreenChange", Wm);document.addEventListener("MSFullscreenError", Wm);
	      }
	    });Um(function () {
	      var b = !1;if (wc("CrKey")) b = !0;else try {
	        window.indexedDB && (b = !1);
	      } catch (c) {
	        b = !0;
	      }b && delete window.indexedDB;
	    });function Xm(b, c, d) {
	      if ("input" == b) switch (this.type) {case "range":
	          b = "change";}HTMLInputElement.prototype.originalAddEventListener.call(this, b, c, d);
	    }Um(function () {
	      wc("Trident/") && !HTMLInputElement.prototype.originalAddEventListener && (HTMLInputElement.prototype.originalAddEventListener = HTMLInputElement.prototype.addEventListener, HTMLInputElement.prototype.addEventListener = Xm);
	    });Um(function () {
	      navigator.languages || Object.defineProperty(navigator, "languages", { get: function () {
	          return navigator.language ? [navigator.language] : ["en"];
	        } });
	    });Um(function () {});function Ym() {
	      var b = MediaSource.prototype.addSourceBuffer;MediaSource.prototype.addSourceBuffer = function (c) {
	        for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];d = b.apply(this, d);d.abort = function () {};return d;
	      };
	    }function Zm() {
	      var b = SourceBuffer.prototype.remove;SourceBuffer.prototype.remove = function (c, d) {
	        return b.call(this, c, d - .001);
	      };
	    }function $m() {
	      var b = MediaSource.isTypeSupported;MediaSource.isTypeSupported = function (c) {
	        return "mp2t" == c.split(/ *; */)[0].split("/")[1].toLowerCase() ? !1 : b(c);
	      };
	    }
	    function an() {
	      var b = MediaSource.isTypeSupported;MediaSource.isTypeSupported = function (c) {
	        return "opus" != sc(c)[0] && b(c);
	      };
	    }
	    function bn() {
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
	    Um(function () {
	      if (window.MediaSource) if (window.cast && cast.__platform__ && cast.__platform__.canDisplayType) bn();else if (navigator.vendor && navigator.vendor.includes("Apple")) {
	        var b = navigator.appVersion.match(/Version\/(\d+)/);b = parseInt(b[1], 10);$m();10 >= b ? window.MediaSource = null : 12 >= b ? (Ym(), Zm()) : Ym();
	      } else wc("Tizen") && an();
	    });function cn(b, c) {
	      try {
	        var d = new dn(b, c);return Promise.resolve(d);
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	    function dn(b, c) {
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
	    }dn.prototype.createMediaKeys = function () {
	      var b = new en(this.keySystem);return Promise.resolve(b);
	    };dn.prototype.getConfiguration = function () {
	      return this.a;
	    };function fn(b) {
	      var c = this.mediaKeys;c && c != b && gn(c, null);delete this.mediaKeys;return (this.mediaKeys = b) ? gn(b, this) : Promise.resolve();
	    }function en(b) {
	      this.b = new WebKitMediaKeys(b);this.a = new K();
	    }
	    en.prototype.createSession = function (b) {
	      b = b || "temporary";if ("temporary" != b) throw new TypeError("Session type " + b + " is unsupported on this platform.");return new hn(this.b, b);
	    };en.prototype.setServerCertificate = function (b) {
	return Promise.resolve(!0);
	    };
	    function gn(b, c) {
	      b.a.$a();if (!c) return Promise.resolve();b.a.w(c, "webkitneedkey", jn);try {
	        return 1 <= c.readyState ? c.webkitSetMediaKeys(b.b) : b.a.da(c, "loadedmetadata", function () {
	          c.webkitSetMediaKeys(b.b);
	        }), Promise.resolve();
	      } catch (d) {
	        return Promise.reject(d);
	      }
	    }function hn(b) {
	      Kb.call(this);this.b = null;this.g = b;this.c = this.a = null;this.f = new K();this.sessionId = "";this.expiration = NaN;this.closed = new F();this.keyStatuses = new kn();
	    }Sa(hn, Kb);q = hn.prototype;
	    q.generateRequest = function (b, c) {
	      this.a = new F();try {
	        this.b = this.g.createSession("video/mp4", new Uint8Array(c)), this.sessionId = this.b.sessionId || "", this.f.w(this.b, "webkitkeymessage", this.ag.bind(this)), this.f.w(this.b, "webkitkeyadded", this.Zf.bind(this)), this.f.w(this.b, "webkitkeyerror", this.$f.bind(this)), ln(this, "status-pending");
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
	    };function jn(b) {
	      var c = new Event("encrypted");c.initDataType = "cenc";c.initData = b.initData;this.dispatchEvent(c);
	    }
	    q.ag = function (b) {
	      this.a && (this.a.resolve(), this.a = null);this.dispatchEvent(new I("message", { messageType: void 0 == this.keyStatuses.a ? "license-request" : "license-renewal", message: b.message.buffer }));
	    };q.Zf = function () {
	      this.c && (ln(this, "usable"), this.c.resolve(), this.c = null);
	    };
	    q.$f = function () {
	      var b = Error("EME PatchedMediaKeysApple key error");b.errorCode = this.b.error;if (null != this.a) this.a.reject(b), this.a = null;else if (null != this.c) this.c.reject(b), this.c = null;else switch (this.b.error.code) {case WebKitMediaKeyError.MEDIA_KEYERR_OUTPUT:case WebKitMediaKeyError.MEDIA_KEYERR_HARDWARECHANGE:
	          ln(this, "output-not-allowed");break;default:
	          ln(this, "internal-error");}
	    };function ln(b, c) {
	      var d = b.keyStatuses;d.size = void 0 == c ? 0 : 1;d.a = c;b.dispatchEvent(new I("keystatuseschange"));
	    }
	    function kn() {
	      this.size = 0;this.a = void 0;
	    }var mn;q = kn.prototype;q.forEach = function (b) {
	      this.a && b(this.a, mn);
	    };q.get = function (b) {
	      if (this.has(b)) return this.a;
	    };q.has = function (b) {
	      var c = mn;return this.a && L.ya(new Uint8Array(b), new Uint8Array(c)) ? !0 : !1;
	    };q.entries = function () {};q.keys = function () {};q.values = function () {};
	    Um(function () {
	      window.HTMLVideoElement && window.WebKitMediaKeys && (mn = new Uint8Array([0]).buffer, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = fn, window.MediaKeys = en, window.MediaKeySystemAccess = dn, navigator.requestMediaKeySystemAccess = cn);
	    });function nn(b, c) {
	      try {
	        var d = new on(b, c);return Promise.resolve(d);
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }
	    function on(b, c) {
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
	    }on.prototype.createMediaKeys = function () {
	      var b = new pn(this.keySystem);return Promise.resolve(b);
	    };
	    on.prototype.getConfiguration = function () {
	      return this.a;
	    };function qn(b) {
	      var c = this.mediaKeys;c && c != b && rn(c, null);delete this.mediaKeys;return (this.mediaKeys = b) ? rn(b, this) : Promise.resolve();
	    }function pn(b) {
	      this.a = new MSMediaKeys(b);this.b = new K();
	    }pn.prototype.createSession = function (b) {
	      b = b || "temporary";if ("temporary" != b) throw new TypeError("Session type " + b + " is unsupported on this platform.");return new sn(this.a, b);
	    };pn.prototype.setServerCertificate = function () {
	      return Promise.resolve(!1);
	    };
	    function rn(b, c) {
	      function d() {
	        c.msSetMediaKeys(e.a);c.removeEventListener("loadedmetadata", d);
	      }b.b.$a();if (!c) return Promise.resolve();b.b.w(c, "msneedkey", tn);var e = b;try {
	        return 1 <= c.readyState ? c.msSetMediaKeys(b.a) : c.addEventListener("loadedmetadata", d), Promise.resolve();
	      } catch (f) {
	        return Promise.reject(f);
	      }
	    }function sn(b) {
	      Kb.call(this);this.c = null;this.g = b;this.b = this.a = null;this.f = new K();this.sessionId = "";this.expiration = NaN;this.closed = new F();this.keyStatuses = new un();
	    }Sa(sn, Kb);q = sn.prototype;
	    q.generateRequest = function (b, c) {
	      this.a = new F();try {
	        this.c = this.g.createSession("video/mp4", new Uint8Array(c), null), this.f.w(this.c, "mskeymessage", this.sf.bind(this)), this.f.w(this.c, "mskeyadded", this.qf.bind(this)), this.f.w(this.c, "mskeyerror", this.rf.bind(this)), vn(this, "status-pending");
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
	    };function tn(b) {
	      if (b.initData) {
	        var c = document.createEvent("CustomEvent");c.initCustomEvent("encrypted", !1, !1, null);c.initDataType = "cenc";c.initData = Hf(b.initData);this.dispatchEvent(c);
	      }
	    }
	    q.sf = function (b) {
	      this.a && (this.a.resolve(), this.a = null);this.dispatchEvent(new I("message", { messageType: void 0 == this.keyStatuses.a ? "license-request" : "license-renewal", message: b.message.buffer }));
	    };q.qf = function () {
	      this.a ? (vn(this, "usable"), this.a.resolve(), this.a = null) : this.b && (vn(this, "usable"), this.b.resolve(), this.b = null);
	    };
	    q.rf = function () {
	      var b = Error("EME PatchedMediaKeysMs key error");b.errorCode = this.c.error;if (null != this.a) this.a.reject(b), this.a = null;else if (null != this.b) this.b.reject(b), this.b = null;else switch (this.c.error.code) {case MSMediaKeyError.MS_MEDIA_KEYERR_OUTPUT:case MSMediaKeyError.MS_MEDIA_KEYERR_HARDWARECHANGE:
	          vn(this, "output-not-allowed");break;default:
	          vn(this, "internal-error");}
	    };function vn(b, c) {
	      var d = b.keyStatuses;d.size = void 0 == c ? 0 : 1;d.a = c;b.dispatchEvent(new I("keystatuseschange"));
	    }
	    function un() {
	      this.size = 0;this.a = void 0;
	    }var wn;q = un.prototype;q.forEach = function (b) {
	      this.a && b(this.a, wn);
	    };q.get = function (b) {
	      if (this.has(b)) return this.a;
	    };q.has = function (b) {
	      var c = wn;return this.a && L.ya(new Uint8Array(b), new Uint8Array(c)) ? !0 : !1;
	    };q.entries = function () {};q.keys = function () {};q.values = function () {};
	    Um(function () {
	      !window.HTMLVideoElement || !window.MSMediaKeys || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration || (wn = new Uint8Array([0]).buffer, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = qn, window.MediaKeys = pn, window.MediaKeySystemAccess = on, navigator.requestMediaKeySystemAccess = nn);
	    });function xn() {
	      return Promise.reject(Error("The key system specified is not supported."));
	    }function yn(b) {
	      return null == b ? Promise.resolve() : Promise.reject(Error("MediaKeys not supported."));
	    }function zn() {
	      throw new TypeError("Illegal constructor.");
	    }zn.prototype.createSession = function () {};zn.prototype.setServerCertificate = function () {};function An() {
	      throw new TypeError("Illegal constructor.");
	    }An.prototype.getConfiguration = function () {};An.prototype.createMediaKeys = function () {};
	    Um(function () {
	      !window.HTMLVideoElement || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration || (navigator.requestMediaKeySystemAccess = xn, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = yn, window.MediaKeys = zn, window.MediaKeySystemAccess = An);
	    }, -10);var Bn = "";function Cn(b) {
	      var c = Bn;return c ? c + b.charAt(0).toUpperCase() + b.slice(1) : b;
	    }function Dn(b, c) {
	      try {
	        var d = new En(b, c);return Promise.resolve(d);
	      } catch (e) {
	        return Promise.reject(e);
	      }
	    }function Fn(b) {
	      var c = this.mediaKeys;c && c != b && Gn(c, null);delete this.mediaKeys;(this.mediaKeys = b) && Gn(b, this);return Promise.resolve();
	    }
	    function En(b, c) {
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
	    }En.prototype.createMediaKeys = function () {
	      var b = new Hn(this.a);return Promise.resolve(b);
	    };En.prototype.getConfiguration = function () {
	      return this.b;
	    };function Hn(b) {
	      this.g = b;this.b = null;this.a = new K();this.c = [];this.f = {};
	    }
	    function Gn(b, c) {
	      b.b = c;b.a.$a();var d = Bn;c && (b.a.w(c, d + "needkey", b.xf.bind(b)), b.a.w(c, d + "keymessage", b.dg.bind(b)), b.a.w(c, d + "keyadded", b.bg.bind(b)), b.a.w(c, d + "keyerror", b.cg.bind(b)));
	    }q = Hn.prototype;q.createSession = function (b) {
	      b = b || "temporary";if ("temporary" != b && "persistent-license" != b) throw new TypeError("Session type " + b + " is unsupported on this platform.");var c = this.b || document.createElement("video");c.src || (c.src = "about:blank");b = new In(c, this.g, b);this.c.push(b);return b;
	    };
	    q.setServerCertificate = function () {
	      return Promise.resolve(!1);
	    };q.xf = function (b) {
	      var c = document.createEvent("CustomEvent");c.initCustomEvent("encrypted", !1, !1, null);c.initDataType = "webm";c.initData = b.initData;this.b.dispatchEvent(c);
	    };q.dg = function (b) {
	      var c = Jn(this, b.sessionId);c && (b = new I("message", { messageType: void 0 == c.keyStatuses.a ? "licenserequest" : "licenserenewal", message: b.message }), c.b && (c.b.resolve(), c.b = null), c.dispatchEvent(b));
	    };
	    q.bg = function (b) {
	      if (b = Jn(this, b.sessionId)) Kn(b, "usable"), b.a && b.a.resolve(), b.a = null;
	    };q.cg = function (b) {
	      var c = Jn(this, b.sessionId);c && c.handleError(b);
	    };function Jn(b, c) {
	      var d = b.f[c];return d ? d : (d = b.c.shift()) ? (d.sessionId = c, b.f[c] = d) : null;
	    }function In(b, c, d) {
	      Kb.call(this);this.f = b;this.h = !1;this.a = this.b = null;this.c = c;this.g = d;this.sessionId = "";this.expiration = NaN;this.closed = new F();this.keyStatuses = new Ln();
	    }Sa(In, Kb);q = In.prototype;
	    q.handleError = function (b) {
	      var c = Error("EME v0.1b key error");c.errorCode = b.errorCode;c.errorCode.systemCode = b.systemCode;!b.sessionId && this.b ? (c.method = "generateRequest", 45 == b.systemCode && (c.message = "Unsupported session type."), this.b.reject(c), this.b = null) : b.sessionId && this.a ? (c.method = "update", this.a.reject(c), this.a = null) : (c = b.systemCode, b.errorCode.code == MediaKeyError.MEDIA_KEYERR_OUTPUT ? Kn(this, "output-restricted") : 1 == c ? Kn(this, "expired") : Kn(this, "internal-error"));
	    };
	    function Mn(b, c, d) {
	      if (b.h) return Promise.reject(Error("The session is already initialized."));b.h = !0;try {
	        if ("persistent-license" == b.g) {
	          if (d) var e = new Uint8Array(Dc("LOAD_SESSION|" + d));else {
	            var f = Dc("PERSISTENT|"),
	                g = new Uint8Array(f.byteLength + c.byteLength);g.set(new Uint8Array(f), 0);g.set(new Uint8Array(c), f.byteLength);e = g;
	          }
	        } else e = new Uint8Array(c);
	      } catch (k) {
	        return Promise.reject(k);
	      }b.b = new F();var h = Cn("generateKeyRequest");try {
	        b.f[h](b.c, e);
	      } catch (k) {
	        if ("InvalidStateError" != k.name) return b.b = null, Promise.reject(k);
	        new C(function () {
	          try {
	            b.f[h](b.c, e);
	          } catch (l) {
	            b.b.reject(l), b.b = null;
	          }
	        }).P(.01);
	      }return b.b;
	    }
	    q.td = function (b, c) {
	      if (this.a) this.a.then(this.td.bind(this, b, c))["catch"](this.td.bind(this, b, c));else {
	        this.a = b;if ("webkit-org.w3.clearkey" == this.c) {
	          var d = Ac(c);var e = JSON.parse(d);"oct" != e.keys[0].kty && (this.a.reject(Error("Response is not a valid JSON Web Key Set.")), this.a = null);d = L.Aa(e.keys[0].k);e = L.Aa(e.keys[0].kid);
	        } else d = new Uint8Array(c), e = null;var f = Cn("addKey");try {
	          this.f[f](this.c, d, e, this.sessionId);
	        } catch (g) {
	          this.a.reject(g), this.a = null;
	        }
	      }
	    };
	    function Kn(b, c) {
	      var d = b.keyStatuses;d.size = void 0 == c ? 0 : 1;d.a = c;b.dispatchEvent(new I("keystatuseschange"));
	    }q.generateRequest = function (b, c) {
	      return Mn(this, c, null);
	    };q.load = function (b) {
	      return "persistent-license" == this.g ? Mn(this, null, b) : Promise.reject(Error("Not a persistent session."));
	    };q.update = function (b) {
	      var c = new F();this.td(c, b);return c;
	    };
	    q.close = function () {
	      if ("persistent-license" != this.g) {
	        if (!this.sessionId) return this.closed.reject(Error("The session is not callable.")), this.closed;var b = Cn("cancelKeyRequest");try {
	          this.f[b](this.c, this.sessionId);
	        } catch (c) {}
	      }this.closed.resolve();return this.closed;
	    };q.remove = function () {
	      return "persistent-license" != this.g ? Promise.reject(Error("Not a persistent session.")) : this.close();
	    };function Ln() {
	      this.size = 0;this.a = void 0;
	    }var Nn;q = Ln.prototype;q.forEach = function (b) {
	      this.a && b(this.a, Nn);
	    };q.get = function (b) {
	      if (this.has(b)) return this.a;
	    };
	    q.has = function (b) {
	      var c = Nn;return this.a && L.ya(new Uint8Array(b), new Uint8Array(c)) ? !0 : !1;
	    };q.entries = function () {};q.keys = function () {};q.values = function () {};
	    Um(function () {
	      if (!(!window.HTMLVideoElement || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration)) {
	        if (HTMLMediaElement.prototype.webkitGenerateKeyRequest) Bn = "webkit";else if (!HTMLMediaElement.prototype.generateKeyRequest) return;Nn = new Uint8Array([0]).buffer;navigator.requestMediaKeySystemAccess = Dn;delete HTMLMediaElement.prototype.mediaKeys;HTMLMediaElement.prototype.mediaKeys = null;HTMLMediaElement.prototype.setMediaKeys = Fn;window.MediaKeys = Hn;window.MediaKeySystemAccess = En;
	      }
	    });function On(b) {
	      b = b.target;if ("picture-in-picture" == b.webkitPresentationMode) {
	        document.pictureInPictureElement = b;var c = new Event("enterpictureinpicture");b.dispatchEvent(c);
	      } else document.pictureInPictureElement == b && (document.pictureInPictureElement = null), c = new Event("leavepictureinpicture"), b.dispatchEvent(c);
	    }
	    function Pn() {
	      return this.webkitSupportsPresentationMode("picture-in-picture") ? (this.webkitSetPresentationMode("picture-in-picture"), document.pictureInPictureElement = this, Promise.resolve()) : Promise.reject(Error("PiP not allowed by video element"));
	    }function Qn() {
	      var b = document.pictureInPictureElement;return b ? (b.webkitSetPresentationMode("inline"), document.pictureInPictureElement = null, Promise.resolve()) : Promise.reject(Error("No picture in picture element found"));
	    }
	    Um(function () {
	      if (window.HTMLVideoElement) {
	        var b = HTMLVideoElement.prototype;b.requestPictureInPicture && document.exitPictureInPicture || !b.webkitSupportsPresentationMode || (document.pictureInPictureEnabled = !0, document.pictureInPictureElement = null, b.requestPictureInPicture = Pn, document.exitPictureInPicture = Qn, document.addEventListener("webkitpresentationmodechanged", On, !0));
	      }
	    });Um(function () {
	      if (window.HTMLMediaElement) {
	        var b = HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play = function () {
	          var c = b.apply(this);c && c["catch"](function () {});return c;
	        };
	      }
	    });function Rn() {
	      return { droppedVideoFrames: this.webkitDroppedFrameCount, totalVideoFrames: this.webkitDecodedFrameCount, corruptedVideoFrames: 0, creationTime: NaN, totalFrameDelay: 0 };
	    }Um(function () {
	      if (window.HTMLVideoElement) {
	        var b = HTMLVideoElement.prototype;!b.getVideoPlaybackQuality && "webkitDroppedFrameCount" in b && (b.getVideoPlaybackQuality = Rn);
	      }
	    });function Sn(b, c, d) {
	      return new window.TextTrackCue(b, c, d);
	    }function Tn(b, c, d) {
	      return new window.TextTrackCue(b + "-" + c + "-" + d, b, c, d);
	    }Um(function () {
	      if (!window.VTTCue && window.TextTrackCue) {
	        var b = TextTrackCue.length;if (3 == b) window.VTTCue = Sn;else if (6 == b) window.VTTCue = Tn;else {
	          try {
	            var c = !!Sn(1, 2, "");
	          } catch (d) {
	            c = !1;
	          }c && (window.VTTCue = Sn);
	        }
	      }
	    });function Un() {}Un.prototype.parseInit = function () {};
	    Un.prototype.parseMedia = function (b, c) {
	      var d = Ac(b),
	          e = [],
	          f = new DOMParser(),
	          g = null;if ("" == d) return e;try {
	        g = f.parseFromString(d, "text/xml");
	      } catch (aa) {
	        throw new D(2, 2, 2005, "Failed to parse TTML.");
	      }if (g) {
	        if (d = g.getElementsByTagName("parsererror")[0]) throw new D(2, 2, 2005, d.textContent);if (f = g.getElementsByTagName("tt")[0]) {
	          var h = R.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "frameRate");var k = R.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "subFrameRate");var l = R.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "frameRateMultiplier");var m = R.getAttributeNS(f, "http://www.w3.org/ns/ttml#parameter", "tickRate");g = f.getAttribute("xml:space") || "default";d = f.getAttribute("tts:extent");
	        } else throw new D(2, 2, 2005, "TTML does not contain <tt> tag.");if ("default" != g && "preserve" != g) throw new D(2, 2, 2005, "Invalid xml:space value: " + g);g = "default" == g;h = new Vn(h, k, l, m);k = Wn(f.getElementsByTagName("metadata")[0]);l = Wn(f.getElementsByTagName("styling")[0]);m = Wn(f.getElementsByTagName("layout")[0]);for (var n = [], p = 0; p < m.length; p++) {
	          var v = m[p],
	              x = l,
	              B = d;var y = new Fd();var E = v.getAttribute("xml:id");if (E) {
	            y.id = E;E = null;B && (E = Xn.exec(B) || Yn.exec(B));B = E ? Number(E[1]) : null;E = E ? Number(E[2]) : null;var H, W;if (H = Zn(v, x, "extent")) H = (W = Xn.exec(H)) || Yn.exec(H), null != H && (y.width = null != B ? 100 * Number(H[1]) / B : Number(H[1]), y.height = null != E ? 100 * Number(H[2]) / E : Number(H[2]), y.widthUnits = W || null != B ? Sd : 0, y.heightUnits = W || null != E ? Sd : 0);if (v = Zn(v, x, "origin")) H = (W = Xn.exec(v)) || Yn.exec(v), null != H && (y.viewportAnchorX = null != E ? 100 * Number(H[1]) / E : Number(H[1]), y.viewportAnchorY = null != B ? 100 * Number(H[2]) / B : Number(H[2]), y.viewportAnchorUnits = W || null != B ? Sd : 0);
	          } else y = null;y && n.push(y);
	        }d = (d = f.getElementsByTagName("body")[0]) ? Array.from(d.querySelectorAll("[begin]")) : [];d = r(d);for (f = d.next(); !f.done; f = d.next()) (f = $n(f.value, c.periodStart, h, k, l, m, n, g, !1)) && e.push(f);
	      }return e;
	    };
	    var Xn = /^(\d{1,2}(?:\.\d+)?|100)% (\d{1,2}(?:\.\d+)?|100)%$/,
	        ao = /^(\d+px|\d+em)$/,
	        Yn = /^(\d+)px (\d+)px$/,
	        bo = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,
	        co = /^(?:(\d{2,}):)?(\d{2}):(\d{2})$/,
	        eo = /^(?:(\d{2,}):)?(\d{2}):(\d{2}\.\d{2,})$/,
	        fo = /^(\d*(?:\.\d*)?)f$/,
	        go = /^(\d*(?:\.\d*)?)t$/,
	        ho = /^(?:(\d*(?:\.\d*)?)h)?(?:(\d*(?:\.\d*)?)m)?(?:(\d*(?:\.\d*)?)s)?(?:(\d*(?:\.\d*)?)ms)?$/,
	        io = { left: Kd, center: "center", right: "end", start: Kd, end: "end" },
	        jo = { left: "line-left", center: "center", right: "line-right" };
	    function Wn(b) {
	      var c = [];if (!b) return c;for (var d = r(b.childNodes), e = d.next(); !e.done; e = d.next()) e = e.value, e.nodeType == Node.ELEMENT_NODE && "br" !== e.nodeName && (e = Wn(e), c = c.concat(e));c.length || c.push(b);return c;
	    }function ko(b, c) {
	      for (var d = "", e = r(b.childNodes), f = e.next(); !f.done; f = e.next()) f = f.value, "br" == f.nodeName && b.childNodes[0] !== f ? d += "\n" : f.childNodes && 0 < f.childNodes.length ? d += ko(f, c) : c ? (f = f.textContent.trim(), f = f.replace(/\s+/g, " "), d += f) : d += f.textContent;return d;
	    }
	    function $n(b, c, d, e, f, g, h, k, l) {
	      if (l && "br" == b.nodeName) return b = new Dd(0, 0, ""), b.spacer = !0, b;var m = /^[\s\n]*$/.test(b.textContent),
	          n = b.nodeType == Node.ELEMENT_NODE && !b.hasAttribute("begin") && !b.hasAttribute("end");if (b.nodeType != Node.ELEMENT_NODE || n && m || n && !l) return null;m = lo(b.getAttribute("begin"), d);n = lo(b.getAttribute("end"), d);var p = lo(b.getAttribute("dur"), d);null == n && null != p && (n = m + p);if (!l && (null == m || null == n)) throw new D(2, 2, 2001);m += c;n += c;p = "";l = [];if (Array.from(b.childNodes).find(function (b) {
	        return b.nodeType === Node.TEXT_NODE && /\w+/.test(b.textContent);
	      })) p = ko(b, k);else for (var v = r(b.childNodes), x = v.next(); !x.done; x = v.next()) (x = $n(x.value, c, d, e, f, g, h, k, !0)) && l.push(x);c = new Dd(m, n, p);c.nestedCues = l;if ((g = mo(b, "region", g, "")[0]) && g.getAttribute("xml:id")) {
	        var B = g.getAttribute("xml:id");c.region = h.filter(function (b) {
	          return b.id == B;
	        })[0];
	      }e = mo(b, "smpte:backgroundImage", e, "#")[0];no(c, b, g, e, f);return c;
	    }
	    function no(b, c, d, e, f) {
	      "rtl" == oo(c, d, f, "direction") && (b.direction = "rtl");var g = oo(c, d, f, "writingMode");"tb" == g || "tblr" == g ? b.writingMode = "vertical-lr" : "tbrl" == g ? b.writingMode = "vertical-rl" : "rltb" == g || "rl" == g ? b.direction = "rtl" : g && (b.direction = Ed);(g = oo(c, d, f, "textAlign")) ? (b.positionAlign = jo[g], b.lineAlign = io[g], b.textAlign = Od[g.toUpperCase()]) : b.textAlign = "start";if (g = oo(c, d, f, "displayAlign")) b.displayAlign = Pd[g.toUpperCase()];if (g = oo(c, d, f, "color")) b.color = g;if (g = oo(c, d, f, "backgroundColor")) b.backgroundColor = g;if (g = oo(c, d, f, "fontFamily")) b.fontFamily = g;(g = oo(c, d, f, "fontWeight")) && "bold" == g && (b.fontWeight = 700);(g = oo(c, d, f, "wrapOption")) && "noWrap" == g && (b.wrapLine = !1);(g = oo(c, d, f, "lineHeight")) && g.match(ao) && (b.lineHeight = g);(g = oo(c, d, f, "fontSize")) && g.match(ao) && (b.fontSize = g);if (g = oo(c, d, f, "fontStyle")) b.fontStyle = Rd[g.toUpperCase()];if (e) {
	        g = e.getAttribute("imagetype");var h = e.getAttribute("encoding");e = e.textContent.trim();"PNG" == g && "Base64" == h && e && (b.backgroundImage = "data:image/png;base64," + e);
	      }(d = Zn(d, f, "textDecoration")) && po(b, d);(c = qo(c, f, "textDecoration")) && po(b, c);
	    }
	    function po(b, c) {
	      for (var d = c.split(" "), e = 0; e < d.length; e++) switch (d[e]) {case "underline":
	          b.textDecoration.includes("underline") || b.textDecoration.push("underline");break;case "noUnderline":
	          b.textDecoration.includes("underline") && Nb(b.textDecoration, "underline");break;case "lineThrough":
	          b.textDecoration.includes("lineThrough") || b.textDecoration.push("lineThrough");break;case "noLineThrough":
	          b.textDecoration.includes("lineThrough") && Nb(b.textDecoration, "lineThrough");break;case "overline":
	          b.textDecoration.includes("overline") || b.textDecoration.push("overline");break;case "noOverline":
	          b.textDecoration.includes("overline") && Nb(b.textDecoration, "overline");}
	    }function oo(b, c, d, e) {
	      return (b = qo(b, d, e)) ? b : Zn(c, d, e);
	    }function Zn(b, c, d) {
	      for (var e = Wn(b), f = 0; f < e.length; f++) {
	        var g = R.getAttributeNS(e[f], "http://www.w3.org/ns/ttml#styling", d);if (g) return g;
	      }return (b = mo(b, "style", c, "")[0]) ? R.getAttributeNS(b, "http://www.w3.org/ns/ttml#styling", d) : null;
	    }
	    function qo(b, c, d) {
	      var e = R.getAttributeNS(b, "http://www.w3.org/ns/ttml#styling", d);if (e) return e;b = mo(b, "style", c, "");c = null;for (e = 0; e < b.length; e++) {
	        var f = R.getAttributeNS(b[e], "http://www.w3.org/ns/ttml#styling", d);f && (c = f);
	      }return c;
	    }
	    function mo(b, c, d, e) {
	      var f = [];if (!b || 1 > d.length) return f;var g = b;for (b = null; g && !(b = g.getAttribute(c)) && (g = g.parentNode, g instanceof Element););if (c = b) for (c = c.split(" "), c = r(c), b = c.next(); !b.done; b = c.next()) {
	        b = b.value;g = r(d);for (var h = g.next(); !h.done; h = g.next()) if (h = h.value, e + h.getAttribute("xml:id") == b) {
	          f.push(h);break;
	        }
	      }return f;
	    }
	    function lo(b, c) {
	      var d = null;if (bo.test(b)) {
	        d = bo.exec(b);var e = Number(d[1]),
	            f = Number(d[2]),
	            g = Number(d[3]),
	            h = Number(d[4]);h += (Number(d[5]) || 0) / c.b;g += h / c.frameRate;d = g + 60 * f + 3600 * e;
	      } else co.test(b) ? d = ro(co, b) : eo.test(b) ? d = ro(eo, b) : fo.test(b) ? (d = fo.exec(b), d = Number(d[1]) / c.frameRate) : go.test(b) ? (d = go.exec(b), d = Number(d[1]) / c.a) : ho.test(b) && (d = ro(ho, b));return d;
	    }
	    function ro(b, c) {
	      var d = b.exec(c);return null == d || "" == d[0] ? null : (Number(d[4]) || 0) / 1E3 + (Number(d[3]) || 0) + 60 * (Number(d[2]) || 0) + 3600 * (Number(d[1]) || 0);
	    }function Vn(b, c, d, e) {
	      this.frameRate = Number(b) || 30;this.b = Number(c) || 1;this.a = Number(e);0 == this.a && (this.a = b ? this.frameRate * this.b : 1);d && (b = /^(\d+) (\d+)$/g.exec(d)) && (this.frameRate *= Number(b[1]) / Number(b[2]));
	    }Vd["application/ttml+xml"] = Un;function so() {
	      this.a = new Un();
	    }so.prototype.parseInit = function (b) {
	      var c = !1;new Q().H("moov", Cf).H("trak", Cf).H("mdia", Cf).H("minf", Cf).H("stbl", Cf).fa("stsd", Df).H("stpp", function (b) {
	        c = !0;b.parser.stop();
	      }).parse(b);if (!c) throw new D(2, 2, 2007);
	    };so.prototype.parseMedia = function (b, c) {
	      var d = !1,
	          e = [];new Q().H("mdat", Ef(function (b) {
	        d = !0;e = e.concat(this.a.parseMedia(b, c));
	      }.bind(this))).parse(b);if (!d) throw new D(2, 2, 2007);return e;
	    };Vd['application/mp4; codecs="stpp"'] = so;
	    Vd['application/mp4; codecs="stpp.TTML.im1t"'] = so;function to() {}to.prototype.parseInit = function () {};
	    to.prototype.parseMedia = function (b, c) {
	      var d = Ac(b);d = d.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n");d = d.split(/\n{2,}/m);if (!/^WEBVTT($|[ \t\n])/m.test(d[0])) throw new D(2, 2, 2E3);var e = c.segmentStart;if (null == e && (e = 0, d[0].includes("X-TIMESTAMP-MAP"))) {
	        var f = d[0].match(/LOCAL:((?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3}))/m),
	            g = d[0].match(/MPEGTS:(\d+)/m);if (f && g) {
	          e = uo(new Sg(f[1]));if (null == e) throw new D(2, 2, 2E3);e = c.periodStart + (Number(g[1]) / 9E4 - e);
	        }
	      }g = [];var h = d[0].split("\n");for (f = 1; f < h.length; f++) if (/^Region:/.test(h[f])) {
	        var k = new Sg(h[f]),
	            l = new Fd();Vg(k);Tg(k);for (var m = Vg(k); m;) {
	          var n = l,
	              p = m;(m = /^id=(.*)$/.exec(p)) ? n.id = m[1] : (m = /^width=(\d{1,2}|100)%$/.exec(p)) ? n.width = Number(m[1]) : (m = /^lines=(\d+)$/.exec(p)) ? (n.height = Number(m[1]), n.heightUnits = 2) : (m = /^regionanchor=(\d{1,2}|100)%,(\d{1,2}|100)%$/.exec(p)) ? (n.regionAnchorX = Number(m[1]), n.regionAnchorY = Number(m[2])) : (m = /^viewportanchor=(\d{1,2}|100)%,(\d{1,2}|100)%$/.exec(p)) ? (n.viewportAnchorX = Number(m[1]), n.viewportAnchorY = Number(m[2])) : /^scroll=up$/.exec(p) && (n.scroll = "up");Tg(k);m = Vg(k);
	        }g.push(l);
	      }f = [];for (k = 1; k < d.length; k++) {
	        h = d[k].split("\n");m = h;p = e;h = g;if (1 == m.length && !m[0] || /^NOTE($|[ \t])/.test(m[0]) || "STYLE" == m[0]) h = null;else {
	          l = null;m[0].includes("--\x3e") || (l = m[0], m.splice(0, 1));n = new Sg(m[0]);var v = uo(n),
	              x = Ug(n, /[ \t]+--\x3e[ \t]+/g),
	              B = uo(n);if (null == v || null == x || null == B) throw new D(2, 2, 2001);m = new Dd(v + p, B + p, m.slice(1).join("\n").trim());Tg(n);for (p = Vg(n); p;) vo(m, p, h), Tg(n), p = Vg(n);null != l && (m.id = l);h = m;
	        }h && f.push(h);
	      }return f;
	    };
	    function vo(b, c, d) {
	      var e;if (e = /^align:(start|middle|center|end|left|right)$/.exec(c)) c = e[1], "middle" == c ? b.textAlign = Hd : b.textAlign = Od[c.toUpperCase()];else if (e = /^vertical:(lr|rl)$/.exec(c)) b.writingMode = "lr" == e[1] ? "vertical-lr" : "vertical-rl";else if (e = /^size:([\d.]+)%$/.exec(c)) b.size = Number(e[1]);else if (e = /^position:([\d.]+)%(?:,(line-left|line-right|center|start|end))?$/.exec(c)) b.position = Number(e[1]), e[2] && (c = e[2], b.positionAlign = "line-left" == c || "start" == c ? "line-left" : "line-right" == c || "end" == c ? "line-right" : "center");else if (e = /^region:(.*)$/.exec(c)) {
	        if (c = wo(d, e[1])) b.region = c;
	      } else if (d = /^line:([\d.]+)%(?:,(start|end|center))?$/.exec(c)) b.lineInterpretation = 1, b.line = Number(d[1]), d[2] && (b.lineAlign = Qd[d[2].toUpperCase()]);else if (d = /^line:(-?\d+)(?:,(start|end|center))?$/.exec(c)) b.lineInterpretation = Jd, b.line = Number(d[1]), d[2] && (b.lineAlign = Qd[d[2].toUpperCase()]);
	    }function wo(b, c) {
	      var d = b.filter(function (b) {
	        return b.id == c;
	      });return d.length ? d[0] : null;
	    }
	    function uo(b) {
	      b = Ug(b, /(?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3})/g);if (null == b) return null;var c = Number(b[2]),
	          d = Number(b[3]);return 59 < c || 59 < d ? null : Number(b[4]) / 1E3 + d + 60 * c + 3600 * (Number(b[1]) || 0);
	    }Vd["text/vtt"] = to;Vd['text/vtt; codecs="vtt"'] = to;function xo() {
	      this.a = null;
	    }xo.prototype.parseInit = function (b) {
	      var c = !1;new Q().H("moov", Cf).H("trak", Cf).H("mdia", Cf).fa("mdhd", function (b) {
	        0 == b.version ? (b.reader.M(4), b.reader.M(4), this.a = b.reader.G(), b.reader.M(4)) : (b.reader.M(8), b.reader.M(8), this.a = b.reader.G(), b.reader.M(8));b.reader.M(4);
	      }.bind(this)).H("minf", Cf).H("stbl", Cf).fa("stsd", Df).H("wvtt", function () {
	        c = !0;
	      }).parse(b);if (!this.a) throw new D(2, 2, 2008);if (!c) throw new D(2, 2, 2008);
	    };
	    xo.prototype.parseMedia = function (b, c) {
	      var d = this;if (!this.a) throw new D(2, 2, 2008);var e = 0,
	          f = [],
	          g,
	          h = [],
	          k = !1,
	          l = !1,
	          m = !1,
	          n = null;new Q().H("moof", Cf).H("traf", Cf).fa("tfdt", function (b) {
	        k = !0;e = 0 == b.version ? b.reader.G() : b.reader.Ab();
	      }).fa("tfhd", function (b) {
	        var c = b.flags;b = b.reader;b.M(4);c & 1 && b.M(8);c & 2 && b.M(4);n = c & 8 ? b.G() : null;
	      }).fa("trun", function (b) {
	        l = !0;var c = b.version,
	            d = b.flags;b = b.reader;var e = b.G();d & 1 && b.M(4);d & 4 && b.M(4);for (var g = [], h = 0; h < e; h++) {
	          var k = { duration: null, sampleSize: null, vd: null };d & 256 && (k.duration = b.G());d & 512 && (k.sampleSize = b.G());d & 1024 && b.M(4);d & 2048 && (k.vd = 0 == c ? b.G() : b.$d());g.push(k);
	        }f = g;
	      }).H("mdat", Ef(function (b) {
	        m = !0;g = b;
	      })).parse(b);if (!m && !k && !l) throw new D(2, 2, 2008);var p = e,
	          v = new DataView(g.buffer, g.byteOffset, g.byteLength),
	          x = new P(v, 0);f.forEach(function (b) {
	        var f = b.duration || n,
	            g = b.vd ? e + b.vd : p;p = g + (f || 0);var k = 0;do {
	          var l = x.G();k += l;var m = x.G(),
	              v = null;"vttc" == Ff(m) ? 8 < l && (v = x.Za(l - 8)) : x.M(l - 8);f && v && h.push(yo(v, c.periodStart + g / d.a, c.periodStart + p / d.a));
	        } while (b.sampleSize && k < b.sampleSize);
	      });return h.filter(sd.Ia);
	    };function yo(b, c, d) {
	      var e, f, g;new Q().H("payl", Ef(function (b) {
	        e = Ac(b);
	      })).H("iden", Ef(function (b) {
	        f = Ac(b);
	      })).H("sttg", Ef(function (b) {
	        g = Ac(b);
	      })).parse(b);return e ? zo(e, f, g, c, d) : null;
	    }function zo(b, c, d, e, f) {
	      b = new Dd(e, f, b);c && (b.id = c);if (d) for (c = new Sg(d), d = Vg(c); d;) vo(b, d, []), Tg(c), d = Vg(c);return b;
	    }Vd['application/mp4; codecs="wvtt"'] = xo;A("shaka.util.Dom.createHTMLElement", function (b) {
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
	    function Ao() {}var Bo;A("EmeEncryptionSchemePolyfill", Ao);function Vm() {
	      Bo ? console.debug("EmeEncryptionSchemePolyfill: Already installed.") : navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration ? (Bo = navigator.requestMediaKeySystemAccess, console.debug("EmeEncryptionSchemePolyfill: Waiting to detect encryptionScheme support."), navigator.requestMediaKeySystemAccess = Co) : console.debug("EmeEncryptionSchemePolyfill: EME not found");
	    }Ao.install = Vm;
	    function Co(b, c) {
	      var d = this;return t(function f() {
	        var g, h, k, l, m;return z(f, function (f) {
	          switch (f.j) {case 1:
	              return console.assert(d == navigator, 'bad "this" for requestMediaKeySystemAccess'), u(f, Bo.call(d, b, c), 2);case 2:
	              g = f.o;h = g.getConfiguration();k = h.videoCapabilities && h.videoCapabilities[0];l = h.audioCapabilities && h.audioCapabilities[0];m = k || l;if (void 0 !== m.encryptionScheme) return console.debug("EmeEncryptionSchemePolyfill: Native encryptionScheme support found."), navigator.requestMediaKeySystemAccess = Bo, f["return"](g);console.debug("EmeEncryptionSchemePolyfill: No native encryptionScheme support found. Patching encryptionScheme support.");navigator.requestMediaKeySystemAccess = Do;return f["return"](Do.call(d, b, c));}
	        });
	      });
	    }
	    function Do(b, c) {
	      var d = this;return t(function f() {
	        var g, h, k, l, m, n, p, v;return z(f, function (f) {
	          switch (f.j) {case 1:
	              console.assert(d == navigator, 'bad "this" for requestMediaKeySystemAccess');b.startsWith("com.widevine") || b.startsWith("com.microsoft") || b.startsWith("com.adobe") || b.startsWith("org.w3") ? g = "cenc" : b.startsWith("com.apple") ? g = "cbcs-1-9" : (console.warn("EmeEncryptionSchemePolyfill: Unknown key system:", b, "Please contribute!"), g = null);h = [];for (var x = r(c), y = x.next(); !y.done; y = x.next()) k = y.value, l = Eo(k.videoCapabilities, g), m = Eo(k.audioCapabilities, g), k.videoCapabilities && k.videoCapabilities.length && !l.length || k.audioCapabilities && k.audioCapabilities.length && !m.length || (n = Object.assign({}, k), n.videoCapabilities = l, n.audioCapabilities = m, h.push(n));if (!h.length) throw p = Error("Unsupported keySystem or supportedConfigurations."), p.name = "NotSupportedError", p.code = DOMException.NOT_SUPPORTED_ERR, p;return u(f, Bo.call(d, b, h), 2);case 2:
	              return v = f.o, f["return"](new Fo(v, g));}
	        });
	      });
	    }
	    function Eo(b, c) {
	      return b ? b.filter(function (b) {
	        return !b.encryptionScheme || b.encryptionScheme == c;
	      }) : b;
	    }function Fo(b, c) {
	      this.b = b;this.a = c;this.keySystem = b.keySystem;
	    }Fo.prototype.getConfiguration = function () {
	      var b = this.b.getConfiguration();if (b.videoCapabilities) for (var c = r(b.videoCapabilities), d = c.next(); !d.done; d = c.next()) d.value.encryptionScheme = this.a;if (b.audioCapabilities) for (c = r(b.audioCapabilities), d = c.next(); !d.done; d = c.next()) d.value.encryptionScheme = this.a;return b;
	    };
	    Fo.prototype.createMediaKeys = function () {
	      return this.b.createMediaKeys();
	    }; module.De && (module.De = Ao);
	  }).call(exportTo, innerGlobal, innerGlobal);for (var k in exportTo.shaka) exports[k] = exportTo.shaka[k];
	})();

	//# sourceMappingURL=shaka-player.compiled.map
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
