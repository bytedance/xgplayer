(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  (function () {
    var n = window.Document.prototype.createElement,
        p = window.Document.prototype.createElementNS,
        aa = window.Document.prototype.importNode,
        ba = window.Document.prototype.prepend,
        ca = window.Document.prototype.append,
        da = window.DocumentFragment.prototype.prepend,
        ea = window.DocumentFragment.prototype.append,
        q = window.Node.prototype.cloneNode,
        r = window.Node.prototype.appendChild,
        t = window.Node.prototype.insertBefore,
        u = window.Node.prototype.removeChild,
        v = window.Node.prototype.replaceChild,
        x = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
        y = window.Element.prototype.attachShadow,
        z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        A = window.Element.prototype.getAttribute,
        B = window.Element.prototype.setAttribute,
        C = window.Element.prototype.removeAttribute,
        D = window.Element.prototype.getAttributeNS,
        E = window.Element.prototype.setAttributeNS,
        F = window.Element.prototype.removeAttributeNS,
        G = window.Element.prototype.insertAdjacentElement,
        fa = window.Element.prototype.insertAdjacentHTML,
        ha = window.Element.prototype.prepend,
        ia = window.Element.prototype.append,
        ja = window.Element.prototype.before,
        ka = window.Element.prototype.after,
        la = window.Element.prototype.replaceWith,
        ma = window.Element.prototype.remove,
        na = window.HTMLElement,
        H = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        oa = window.HTMLElement.prototype.insertAdjacentElement,
        pa = window.HTMLElement.prototype.insertAdjacentHTML;var qa = new Set();"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function (a) {
      return qa.add(a);
    });function ra(a) {
      var b = qa.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
    }var sa = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
    function I(a) {
      var b = a.isConnected;if (void 0 !== b) return b;if (sa(a)) return !0;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) {
        a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
      }return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }function J(a) {
      var b = a.children;if (b) return Array.prototype.slice.call(b);b = [];for (a = a.firstChild; a; a = a.nextSibling) {
        a.nodeType === Node.ELEMENT_NODE && b.push(a);
      }return b;
    }
    function K(a, b) {
      for (; b && b !== a && !b.nextSibling;) {
        b = b.parentNode;
      }return b && b !== a ? b.nextSibling : null;
    }
    function L(a, b, c) {
      for (var f = a; f;) {
        if (f.nodeType === Node.ELEMENT_NODE) {
          var d = f;b(d);var e = d.localName;if ("link" === e && "import" === d.getAttribute("rel")) {
            f = d.import;void 0 === c && (c = new Set());if (f instanceof Node && !c.has(f)) for (c.add(f), f = f.firstChild; f; f = f.nextSibling) {
              L(f, b, c);
            }f = K(a, d);continue;
          } else if ("template" === e) {
            f = K(a, d);continue;
          }if (d = d.__CE_shadowRoot) for (d = d.firstChild; d; d = d.nextSibling) {
            L(d, b, c);
          }
        }f = f.firstChild ? f.firstChild : K(a, f);
      }
    }function M(a, b, c) {
      a[b] = c;
    }function ta(a) {
      var b = document;this.c = a;this.a = b;this.b = void 0;N(this.c, this.a);"loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: !0, subtree: !0 }));
    }function ua(a) {
      a.b && a.b.disconnect();
    }ta.prototype.f = function (a) {
      var b = this.a.readyState;"interactive" !== b && "complete" !== b || ua(this);for (b = 0; b < a.length; b++) {
        for (var c = a[b].addedNodes, f = 0; f < c.length; f++) {
          N(this.c, c[f]);
        }
      }
    };function va() {
      var a = this;this.b = this.a = void 0;this.c = new Promise(function (b) {
        a.b = b;a.a && b(a.a);
      });
    }function wa(a) {
      if (a.a) throw Error("Already resolved.");a.a = void 0;a.b && a.b(void 0);
    }function O(a) {
      this.f = new Map();this.g = new Map();this.l = new Map();this.i = !1;this.b = a;this.j = new Map();this.c = function (b) {
        return b();
      };this.a = !1;this.h = [];this.m = a.f ? new ta(a) : void 0;
    }O.prototype.o = function (a, b) {
      var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");xa(this, a);this.f.set(a, b);this.h.push(a);this.a || (this.a = !0, this.c(function () {
        return ya(c);
      }));
    };
    O.prototype.define = function (a, b) {
      var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");xa(this, a);za(this, a, b);this.h.push(a);this.a || (this.a = !0, this.c(function () {
        return ya(c);
      }));
    };function xa(a, b) {
      if (!ra(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");if (P(a, b)) throw Error("A custom element with name '" + b + "' has already been defined.");if (a.i) throw Error("A custom element is already being defined.");
    }
    function za(a, b, c) {
      a.i = !0;var f;try {
        var d = function d(m) {
          var w = e[m];if (void 0 !== w && !(w instanceof Function)) throw Error("The '" + m + "' callback must be a function.");return w;
        },
            e = c.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");var g = d("connectedCallback");var h = d("disconnectedCallback");var k = d("adoptedCallback");var l = (f = d("attributeChangedCallback")) && c.observedAttributes || [];
      } catch (m) {
        throw m;
      } finally {
        a.i = !1;
      }c = { localName: b, constructorFunction: c,
        connectedCallback: g, disconnectedCallback: h, adoptedCallback: k, attributeChangedCallback: f, observedAttributes: l, constructionStack: [] };a.g.set(b, c);a.l.set(c.constructorFunction, c);return c;
    }O.prototype.upgrade = function (a) {
      N(this.b, a);
    };
    function ya(a) {
      if (!1 !== a.a) {
        a.a = !1;for (var b = [], c = a.h, f = new Map(), d = 0; d < c.length; d++) {
          f.set(c[d], []);
        }N(a.b, document, { upgrade: function upgrade(k) {
            if (void 0 === k.__CE_state) {
              var l = k.localName,
                  m = f.get(l);m ? m.push(k) : a.g.has(l) && b.push(k);
            }
          } });for (d = 0; d < b.length; d++) {
          Q(a.b, b[d]);
        }for (d = 0; d < c.length; d++) {
          for (var e = c[d], g = f.get(e), h = 0; h < g.length; h++) {
            Q(a.b, g[h]);
          }(e = a.j.get(e)) && wa(e);
        }c.length = 0;
      }
    }O.prototype.get = function (a) {
      if (a = P(this, a)) return a.constructorFunction;
    };
    O.prototype.whenDefined = function (a) {
      if (!ra(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.j.get(a);if (b) return b.c;b = new va();this.j.set(a, b);var c = this.g.has(a) || this.f.has(a);a = -1 === this.h.indexOf(a);c && a && wa(b);return b.c;
    };O.prototype.polyfillWrapFlushCallback = function (a) {
      this.m && ua(this.m);var b = this.c;this.c = function (c) {
        return a(function () {
          return b(c);
        });
      };
    };
    function P(a, b) {
      var c = a.g.get(b);if (c) return c;if (c = a.f.get(b)) {
        a.f.delete(b);try {
          return za(a, b, c());
        } catch (f) {
          R(f);
        }
      }
    }window.CustomElementRegistry = O;O.prototype.define = O.prototype.define;O.prototype.upgrade = O.prototype.upgrade;O.prototype.get = O.prototype.get;O.prototype.whenDefined = O.prototype.whenDefined;O.prototype.polyfillDefineLazy = O.prototype.o;O.prototype.polyfillWrapFlushCallback = O.prototype.polyfillWrapFlushCallback;function S() {
      var a = T && T.noDocumentConstructionObserver,
          b = T && T.shadyDomFastWalk;this.b = [];this.c = [];this.a = !1;this.shadyDomFastWalk = b;this.f = !a;
    }function U(a, b, c, f) {
      var d = window.ShadyDOM;if (a.shadyDomFastWalk && d && d.inUse) {
        if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll) for (a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++) {
          c(a[b]);
        }
      } else L(b, c, f);
    }function Aa(a, b) {
      a.a = !0;a.b.push(b);
    }function Ba(a, b) {
      a.a = !0;a.c.push(b);
    }function V(a, b) {
      a.a && U(a, b, function (c) {
        return W(a, c);
      });
    }
    function W(a, b) {
      if (a.a && !b.__CE_patched) {
        b.__CE_patched = !0;for (var c = 0; c < a.b.length; c++) {
          a.b[c](b);
        }for (c = 0; c < a.c.length; c++) {
          a.c[c](b);
        }
      }
    }function X(a, b) {
      var c = [];U(a, b, function (d) {
        return c.push(d);
      });for (b = 0; b < c.length; b++) {
        var f = c[b];1 === f.__CE_state ? a.connectedCallback(f) : Q(a, f);
      }
    }function Y(a, b) {
      var c = [];U(a, b, function (d) {
        return c.push(d);
      });for (b = 0; b < c.length; b++) {
        var f = c[b];1 === f.__CE_state && a.disconnectedCallback(f);
      }
    }
    function N(a, b, c) {
      c = void 0 === c ? {} : c;var f = c.s,
          d = c.upgrade || function (g) {
        return Q(a, g);
      },
          e = [];U(a, b, function (g) {
        a.a && W(a, g);if ("link" === g.localName && "import" === g.getAttribute("rel")) {
          var h = g.import;h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", function () {
            var k = g.import;if (!k.__CE_documentLoadHandled) {
              k.__CE_documentLoadHandled = !0;var l = new Set();f && (f.forEach(function (m) {
                return l.add(m);
              }), l.delete(k));N(a, k, { s: l, upgrade: d });
            }
          });
        } else e.push(g);
      }, f);for (b = 0; b < e.length; b++) {
        d(e[b]);
      }
    }
    function Q(a, b) {
      try {
        var c = b.ownerDocument,
            f = c.__CE_registry;var d = f && (c.defaultView || c.__CE_isImportDocument) ? P(f, b.localName) : void 0;if (d && void 0 === b.__CE_state) {
          d.constructionStack.push(b);try {
            try {
              if (new d.constructorFunction() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
            } finally {
              d.constructionStack.pop();
            }
          } catch (k) {
            throw b.__CE_state = 2, k;
          }b.__CE_state = 1;b.__CE_definition = d;if (d.attributeChangedCallback && b.hasAttributes()) {
            var e = d.observedAttributes;
            for (d = 0; d < e.length; d++) {
              var g = e[d],
                  h = b.getAttribute(g);null !== h && a.attributeChangedCallback(b, g, null, h, null);
            }
          }I(b) && a.connectedCallback(b);
        }
      } catch (k) {
        R(k);
      }
    }S.prototype.connectedCallback = function (a) {
      var b = a.__CE_definition;if (b.connectedCallback) try {
        b.connectedCallback.call(a);
      } catch (c) {
        R(c);
      }
    };S.prototype.disconnectedCallback = function (a) {
      var b = a.__CE_definition;if (b.disconnectedCallback) try {
        b.disconnectedCallback.call(a);
      } catch (c) {
        R(c);
      }
    };
    S.prototype.attributeChangedCallback = function (a, b, c, f, d) {
      var e = a.__CE_definition;if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
        e.attributeChangedCallback.call(a, b, c, f, d);
      } catch (g) {
        R(g);
      }
    };
    function Ca(a, b, c, f) {
      var d = b.__CE_registry;if (d && (null === f || "http://www.w3.org/1999/xhtml" === f) && (d = P(d, c))) try {
        var e = new d.constructorFunction();if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");if (e.hasAttributes()) throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");if (null !== e.firstChild) throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");if (null !== e.parentNode) throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");if (e.ownerDocument !== b) throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");if (e.localName !== c) throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
        return e;
      } catch (g) {
        return R(g), b = null === f ? n.call(b, c) : p.call(b, f, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, W(a, b), b;
      }b = null === f ? n.call(b, c) : p.call(b, f, c);W(a, b);return b;
    }
    function R(a) {
      var b = a.message,
          c = a.sourceURL || a.fileName || "",
          f = a.line || a.lineNumber || 0,
          d = a.column || a.columnNumber || 0,
          e = void 0;void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", { cancelable: !0, message: b, filename: c, lineno: f, colno: d, error: a }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", !1, !0, b, c, f), e.preventDefault = function () {
        Object.defineProperty(this, "defaultPrevented", { configurable: !0, get: function get() {
            return !0;
          } });
      });void 0 === e.error && Object.defineProperty(e, "error", { configurable: !0, enumerable: !0, get: function get() {
          return a;
        } });window.dispatchEvent(e);e.defaultPrevented || console.error(a);
    }var Da = new function () {}();function Ea(a) {
      window.HTMLElement = function () {
        function b() {
          var c = this.constructor;var f = document.__CE_registry.l.get(c);if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var d = f.constructionStack;if (0 === d.length) return d = n.call(document, f.localName), Object.setPrototypeOf(d, c.prototype), d.__CE_state = 1, d.__CE_definition = f, W(a, d), d;var e = d.length - 1,
              g = d[e];if (g === Da) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
          d[e] = Da;Object.setPrototypeOf(g, c.prototype);W(a, g);return g;
        }b.prototype = na.prototype;Object.defineProperty(b.prototype, "constructor", { writable: !0, configurable: !0, enumerable: !1, value: b });return b;
      }();
    }function Z(a, b, c) {
      function f(d) {
        return function (e) {
          for (var g = [], h = 0; h < arguments.length; ++h) {
            g[h] = arguments[h];
          }h = [];for (var k = [], l = 0; l < g.length; l++) {
            var m = g[l];m instanceof Element && I(m) && k.push(m);if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) {
              h.push(m);
            } else h.push(m);
          }d.apply(this, g);for (g = 0; g < k.length; g++) {
            Y(a, k[g]);
          }if (I(this)) for (g = 0; g < h.length; g++) {
            k = h[g], k instanceof Element && X(a, k);
          }
        };
      }void 0 !== c.prepend && M(b, "prepend", f(c.prepend));void 0 !== c.append && M(b, "append", f(c.append));
    }
  function Fa(a) {
      M(Document.prototype, "createElement", function (b) {
        return Ca(a, this, b, null);
      });M(Document.prototype, "importNode", function (b, c) {
        b = aa.call(this, b, !!c);this.__CE_registry ? N(a, b) : V(a, b);return b;
      });M(Document.prototype, "createElementNS", function (b, c) {
        return Ca(a, this, c, b);
      });Z(a, Document.prototype, { prepend: ba, append: ca });
    }function Ga(a) {
      function b(c, f) {
        Object.defineProperty(c, "textContent", { enumerable: f.enumerable, configurable: !0, get: f.get, set: function set(d) {
            if (this.nodeType === Node.TEXT_NODE) f.set.call(this, d);else {
              var e = void 0;if (this.firstChild) {
                var g = this.childNodes,
                    h = g.length;if (0 < h && I(this)) {
                  e = Array(h);for (var k = 0; k < h; k++) {
                    e[k] = g[k];
                  }
                }
              }f.set.call(this, d);if (e) for (d = 0; d < e.length; d++) {
                Y(a, e[d]);
              }
            }
          } });
      }M(Node.prototype, "insertBefore", function (c, f) {
        if (c instanceof DocumentFragment) {
          var d = J(c);c = t.call(this, c, f);if (I(this)) for (f = 0; f < d.length; f++) {
            X(a, d[f]);
          }return c;
        }d = c instanceof Element && I(c);f = t.call(this, c, f);d && Y(a, c);I(this) && X(a, c);return f;
      });M(Node.prototype, "appendChild", function (c) {
        if (c instanceof DocumentFragment) {
          var f = J(c);c = r.call(this, c);if (I(this)) for (var d = 0; d < f.length; d++) {
            X(a, f[d]);
          }return c;
        }f = c instanceof Element && I(c);d = r.call(this, c);f && Y(a, c);I(this) && X(a, c);return d;
      });M(Node.prototype, "cloneNode", function (c) {
        c = q.call(this, !!c);this.ownerDocument.__CE_registry ? N(a, c) : V(a, c);return c;
      });M(Node.prototype, "removeChild", function (c) {
        var f = c instanceof Element && I(c),
            d = u.call(this, c);f && Y(a, c);return d;
      });M(Node.prototype, "replaceChild", function (c, f) {
        if (c instanceof DocumentFragment) {
          var d = J(c);c = v.call(this, c, f);if (I(this)) for (Y(a, f), f = 0; f < d.length; f++) {
            X(a, d[f]);
          }return c;
        }d = c instanceof Element && I(c);var e = v.call(this, c, f),
            g = I(this);g && Y(a, f);d && Y(a, c);g && X(a, c);return e;
      });x && x.get ? b(Node.prototype, x) : Aa(a, function (c) {
        b(c, { enumerable: !0, configurable: !0, get: function get() {
            for (var f = [], d = this.firstChild; d; d = d.nextSibling) {
              d.nodeType !== Node.COMMENT_NODE && f.push(d.textContent);
            }return f.join("");
          }, set: function set(f) {
            for (; this.firstChild;) {
              u.call(this, this.firstChild);
            }null != f && "" !== f && r.call(this, document.createTextNode(f));
          } });
      });
    }function Ha(a) {
      function b(f) {
        return function (d) {
          for (var e = [], g = 0; g < arguments.length; ++g) {
            e[g] = arguments[g];
          }g = [];for (var h = [], k = 0; k < e.length; k++) {
            var l = e[k];l instanceof Element && I(l) && h.push(l);if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) {
              g.push(l);
            } else g.push(l);
          }f.apply(this, e);for (e = 0; e < h.length; e++) {
            Y(a, h[e]);
          }if (I(this)) for (e = 0; e < g.length; e++) {
            h = g[e], h instanceof Element && X(a, h);
          }
        };
      }var c = Element.prototype;void 0 !== ja && M(c, "before", b(ja));void 0 !== ka && M(c, "after", b(ka));void 0 !== la && M(c, "replaceWith", function (f) {
        for (var d = [], e = 0; e < arguments.length; ++e) {
          d[e] = arguments[e];
        }e = [];for (var g = [], h = 0; h < d.length; h++) {
          var k = d[h];k instanceof Element && I(k) && g.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) {
            e.push(k);
          } else e.push(k);
        }h = I(this);la.apply(this, d);for (d = 0; d < g.length; d++) {
          Y(a, g[d]);
        }if (h) for (Y(a, this), d = 0; d < e.length; d++) {
          g = e[d], g instanceof Element && X(a, g);
        }
      });void 0 !== ma && M(c, "remove", function () {
        var f = I(this);ma.call(this);f && Y(a, this);
      });
    }function Ia(a) {
      function b(d, e) {
        Object.defineProperty(d, "innerHTML", { enumerable: e.enumerable, configurable: !0, get: e.get, set: function set(g) {
            var h = this,
                k = void 0;I(this) && (k = [], U(a, this, function (w) {
              w !== h && k.push(w);
            }));e.set.call(this, g);if (k) for (var l = 0; l < k.length; l++) {
              var m = k[l];1 === m.__CE_state && a.disconnectedCallback(m);
            }this.ownerDocument.__CE_registry ? N(a, this) : V(a, this);return g;
          } });
      }function c(d, e) {
        M(d, "insertAdjacentElement", function (g, h) {
          var k = I(h);g = e.call(this, g, h);k && Y(a, h);I(g) && X(a, h);return g;
        });
      }
      function f(d, e) {
        function g(h, k) {
          for (var l = []; h !== k; h = h.nextSibling) {
            l.push(h);
          }for (k = 0; k < l.length; k++) {
            N(a, l[k]);
          }
        }M(d, "insertAdjacentHTML", function (h, k) {
          h = h.toLowerCase();if ("beforebegin" === h) {
            var l = this.previousSibling;e.call(this, h, k);g(l || this.parentNode.firstChild, this);
          } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);else if ("beforeend" === h) l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);else if ("afterend" === h) l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
        });
      }y && M(Element.prototype, "attachShadow", function (d) {
        d = y.call(this, d);if (a.a && !d.__CE_patched) {
          d.__CE_patched = !0;for (var e = 0; e < a.b.length; e++) {
            a.b[e](d);
          }
        }return this.__CE_shadowRoot = d;
      });z && z.get ? b(Element.prototype, z) : H && H.get ? b(HTMLElement.prototype, H) : Ba(a, function (d) {
        b(d, { enumerable: !0, configurable: !0, get: function get() {
            return q.call(this, !0).innerHTML;
          }, set: function set(e) {
            var g = "template" === this.localName,
                h = g ? this.content : this,
                k = p.call(document, this.namespaceURI, this.localName);for (k.innerHTML = e; 0 < h.childNodes.length;) {
              u.call(h, h.childNodes[0]);
            }for (e = g ? k.content : k; 0 < e.childNodes.length;) {
              r.call(h, e.childNodes[0]);
            }
          } });
      });M(Element.prototype, "setAttribute", function (d, e) {
        if (1 !== this.__CE_state) return B.call(this, d, e);var g = A.call(this, d);B.call(this, d, e);e = A.call(this, d);a.attributeChangedCallback(this, d, g, e, null);
      });M(Element.prototype, "setAttributeNS", function (d, e, g) {
        if (1 !== this.__CE_state) return E.call(this, d, e, g);var h = D.call(this, d, e);E.call(this, d, e, g);g = D.call(this, d, e);a.attributeChangedCallback(this, e, h, g, d);
      });M(Element.prototype, "removeAttribute", function (d) {
        if (1 !== this.__CE_state) return C.call(this, d);var e = A.call(this, d);C.call(this, d);null !== e && a.attributeChangedCallback(this, d, e, null, null);
      });M(Element.prototype, "removeAttributeNS", function (d, e) {
        if (1 !== this.__CE_state) return F.call(this, d, e);var g = D.call(this, d, e);F.call(this, d, e);var h = D.call(this, d, e);g !== h && a.attributeChangedCallback(this, e, g, h, d);
      });oa ? c(HTMLElement.prototype, oa) : G && c(Element.prototype, G);pa ? f(HTMLElement.prototype, pa) : fa && f(Element.prototype, fa);Z(a, Element.prototype, { prepend: ha, append: ia });Ha(a);
    }var T = window.customElements;function Ja() {
      var a = new S();Ea(a);Fa(a);Z(a, DocumentFragment.prototype, { prepend: da, append: ea });Ga(a);Ia(a);a = new O(a);document.__CE_registry = a;Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: a });
    }T && !T.forcePolyfill && "function" == typeof T.define && "function" == typeof T.get || Ja();window.__CE_installPolyfill = Ja;
  }).call(self);

  //# sourceMappingURL=custom-elements.min.js.map

  /**
   * @license
   * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */

  /**
   * This shim allows elements written in, or compiled to, ES5 to work on native
   * implementations of Custom Elements v1. It sets new.target to the value of
   * this.constructor so that the native HTMLElement constructor can access the
   * current under-construction element's definition.
   */
  (function () {
    if (
    // No Reflect, no classes, no need for shim because native custom elements
    // require ES2015 classes or Reflect.
    window.Reflect === undefined || window.customElements === undefined ||
    // The webcomponentsjs custom elements polyfill doesn't require
    // ES2015-compatible construction (`super()` or `Reflect.construct`).
    window.customElements.polyfillWrapFlushCallback) {
      return;
    }
    var BuiltInHTMLElement = HTMLElement;
    /**
     * With jscompiler's RECOMMENDED_FLAGS the function name will be optimized away.
     * However, if we declare the function as a property on an object literal, and
     * use quotes for the property name, then closure will leave that much intact,
     * which is enough for the JS VM to correctly set Function.prototype.name.
     */
    var wrapperForTheName = {
      'HTMLElement': /** @this {!Object} */function HTMLElement() {
        return Reflect.construct(BuiltInHTMLElement, [], /** @type {!Function} */this.constructor);
      }
    };
    window.HTMLElement = wrapperForTheName['HTMLElement'];
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
  })();

  var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /**
   * @author fuyuhao@bytedance.com
   */

  var Ticker = function () {
    function Ticker(options) {
      _classCallCheck(this, Ticker);

      this.options = Object.assign({}, options || {}, {
        interval: 16
      });

      this.callbacks = [];
    }

    _createClass(Ticker, [{
      key: "start",
      value: function start() {
        for (var _len = arguments.length, callbacks = Array(_len), _key = 0; _key < _len; _key++) {
          callbacks[_key] = arguments[_key];
        }

        this.callbacks = callbacks;
      }
    }, {
      key: "onTick",
      value: function onTick() {
        for (var i = 0, len = this.callbacks.length; i < len; i++) {
          var callback = this.callbacks[i];
          callback();
        }
      }
    }, {
      key: "setInterval",
      value: function setInterval(interval) {
        this.options.interval = interval;
        return this;
      }
    }]);

    return Ticker;
  }();

  /**
   * ticker use requestAnimationFrame
   */


  var RafTicker = function (_Ticker) {
    _inherits(RafTicker, _Ticker);

    function RafTicker(props) {
      _classCallCheck(this, RafTicker);

      var _this = _possibleConstructorReturn(this, (RafTicker.__proto__ || Object.getPrototypeOf(RafTicker)).call(this, props));

      _this.prev = null;
      _this.timerId = null;
      _this._subTimerId = null;

      _this._tickFunc = RafTicker.getTickFunc();
      _this.tick = _this.tick.bind(_this);
      return _this;
    }

    _createClass(RafTicker, [{
      key: "start",
      value: function start() {
        var _get2;

        for (var _len2 = arguments.length, callbacks = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          callbacks[_key2] = arguments[_key2];
        }

        (_get2 = _get(RafTicker.prototype.__proto__ || Object.getPrototypeOf(RafTicker.prototype), "start", this)).call.apply(_get2, [this].concat(callbacks));
        this.tick();
      }
    }, {
      key: "tick",
      value: function tick() {
        this.nextTick();
        this.onTick();
      }
    }, {
      key: "nextTick",
      value: function nextTick() {
        var _tickFunc = this._tickFunc;

        this.timerId = _tickFunc(this.tick);
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.timerId) {
          var cancelFunc = RafTicker.getCancelFunc();

          cancelFunc(this.timerId);
        }
      }
    }, {
      key: "resume",
      value: function resume() {
        this.nextTick();
      }
    }], [{
      key: "getTickFunc",
      value: function getTickFunc() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      }
    }, {
      key: "getCancelFunc",
      value: function getCancelFunc() {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
      }
    }, {
      key: "isSupported",
      value: function isSupported() {
        return RafTicker.getTickFunc() !== undefined;
      }
    }]);

    return RafTicker;
  }(Ticker);

  /**
   * use setTimeout for browsers without raf support
   */


  var TimeoutTicker = function (_Ticker2) {
    _inherits(TimeoutTicker, _Ticker2);

    function TimeoutTicker(config) {
      _classCallCheck(this, TimeoutTicker);

      var _this2 = _possibleConstructorReturn(this, (TimeoutTicker.__proto__ || Object.getPrototypeOf(TimeoutTicker)).call(this, config));

      _this2.timeoutId = null;
      return _this2;
    }

    _createClass(TimeoutTicker, [{
      key: "start",
      value: function start() {
        var _get3,
            _this3 = this;

        for (var _len3 = arguments.length, callbacks = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          callbacks[_key3] = arguments[_key3];
        }

        (_get3 = _get(TimeoutTicker.prototype.__proto__ || Object.getPrototypeOf(TimeoutTicker.prototype), "nextTick", this)).call.apply(_get3, [this].concat(callbacks));
        this.timeoutId = window.setInterval(function () {
          _this3.onTick();
        }, this.options.interval || 16);
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.timeoutId) {
          window.clearInterval(this.timeoutId);
        }
      }
    }]);

    return TimeoutTicker;
  }(Ticker);

  /**
   * 返回Ticker构造函数
   * @returns {Ticker}
   */


  var getTicker = function getTicker() {
    if (RafTicker.isSupported()) {
      return RafTicker;
    } else {
      return TimeoutTicker;
    }
  };

  var TARGET = typeof Symbol === 'undefined' ? '__target' : Symbol(),
      SCRIPT_TYPE = 'application/javascript',
      BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
      URL = window.URL || window.webkitURL,
      Worker = window.Worker;

  /**
   * Returns a wrapper around Web Worker code that is constructible.
   *
   * @function shimWorker
   *
   * @param { String }    filename    The name of the file
   * @param { Function }  fn          Function wrapping the code of the worker
   */
  function shimWorker (filename, fn) {
      return function ShimWorker (forceFallback) {
          var o = this;

          if (!fn) {
              return new Worker(filename);
          }
          else if (Worker && !forceFallback) {
              // Convert the function's inner code to a string to construct the worker
              var source = `${ fn }`.replace(/^function.+?{/, '').slice(0, -1),
                  objURL = createSourceObject(source);

              this[TARGET] = new Worker(objURL);
              URL.revokeObjectURL(objURL);
              return this[TARGET];
          }
          else {
              var selfShim = {
                      postMessage: m => {
                          if (o.onmessage) {
                              setTimeout(() => o.onmessage({ data: m, target: selfShim }));
                          }
                      }
                  };

              fn.call(selfShim);
              this.postMessage = m => {
                  setTimeout(() => selfShim.onmessage({ data: m, target: o }));
              };
              this.isThisThread = true;
          }
      };
  }
  // Test Worker capabilities
  if (Worker) {
      var testWorker,
          objURL = createSourceObject('self.onmessage = function () {}'),
          testArray = new Uint8Array(1);

      try {
          // No workers via blobs in Edge 12 and IE 11 and lower :(
          if (/(?:Trident|Edge)\/(?:[567]|12)/i.test(navigator.userAgent)) {
              throw new Error('Not available');
          }
          testWorker = new Worker(objURL);

          // Native browser on some Samsung devices throws for transferables, let's detect it
          testWorker.postMessage(testArray, [testArray.buffer]);
      }
      catch (e) {
          Worker = null;
      }
      finally {
          URL.revokeObjectURL(objURL);
          if (testWorker) {
              testWorker.terminate();
          }
      }
  }

  function createSourceObject(str) {
      try {
          return URL.createObjectURL(new Blob([str], { type: SCRIPT_TYPE }));
      }
      catch (e) {
          var blob = new BlobBuilder();
          blob.append(str);
          return URL.createObjectURL(blob.getBlob(type));
      }
  }

  var VideoWorker = new shimWorker("./worker.js", function (window, document) {
    var self = this;
    var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
    var Decoder = function Decoder(self) {
      this.inited = false;
      this.self = self;
      this.meta = this.self.meta;
      this.infolist = {};
      self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
      self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
    };

    Decoder.prototype.toU8Array = function (ptr, length) {
      return this.self.HEAPU8.subarray(ptr, ptr + length);
    };

    Decoder.prototype.init = function () {
      Module._broadwayInit();
      this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
    };

    Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid) {
      var info = Object.assign({}, this.infolist[infoid]);
      var yRowcount = height;
      var uvRowcount = height / 2;
      if (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422) {
        uvRowcount = height;
      }
      var data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
      this.infolist[infoid] = null;
      var datetemp = new Uint8Array(data.length);
      datetemp.set(data);
      var buffer = datetemp.buffer;
      this.self.postMessage({
        msg: 'DECODED',
        width: width,
        height: height,
        yLinesize: yLinesize,
        uvLinesize: uvLinesize,
        info: info,
        buffer: buffer
      }, [buffer]);
    };

    Decoder.prototype.broadwayOnBroadwayInited = function () {
      this.inited = true;
      this.self.postMessage({ msg: 'DECODER_READY' });
    };

    Decoder.prototype.decode = function (data, info) {
      var time = parseInt(new Date().getTime());
      var infoid = time - Math.floor(time / 10e8) * 10e8;
      this.infolist[infoid] = info;
      this.streamBuffer.set(data);
      Module._broadwayPlayStream(data.length, infoid);
    };

    Decoder.prototype.destroy = function () {
      Module._broadwayExit();
    };

    var decoder;

    function onPostRun() {
      decoder = new Decoder(this);
      decoder.init();
    }

    function init(meta) {
      self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder.js');
      addOnPostRun(onPostRun.bind(self));
    }

    self.addEventListener('message', function (e) {
      var data = e.data;
      if (!data.msg) {
        self.postMessage({
          msg: 'ERROR:invalid message'
        });
      } else {
        switch (data.msg) {
          case 'init':
            console.log(data);
            self.meta = data.meta;
            init();
            break;
          case 'decode':
            decoder.decode(data.data, data.info);
            break;
          case 'destory':
            decoder.destroy();
            break;
        }
      }
    }, false);
  });

  var _createClass$1 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Stream = function () {
    function Stream(buffer) {
      _classCallCheck$1(this, Stream);

      if (buffer instanceof ArrayBuffer) {
        this.buffer = buffer;
        this.dataview = new DataView(buffer);
        this.dataview.position = 0;
      } else {
        throw new Error('data is invalid');
      }
    }

    _createClass$1(Stream, [{
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

  var Golomb = function () {
    function Golomb(uint8array) {
      _classCallCheck$2(this, Golomb);

      this.TAG = 'Golomb';
      this._buffer = uint8array;
      this._bufferIndex = 0;
      this._totalBytes = uint8array.byteLength;
      this._totalBits = uint8array.byteLength * 8;
      this._currentWord = 0;
      this._currentWordBitsLeft = 0;
    }

    _createClass$2(Golomb, [{
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

  var SPSParser = function () {
    function SPSParser() {
      _classCallCheck$3(this, SPSParser);
    }

    _createClass$3(SPSParser, null, [{
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
        var lastScale = 8;
        var nextScale = 8;
        var deltaScale = 0;
        for (var i = 0; i < count; i++) {
          if (nextScale !== 0) {
            deltaScale = gb.readSEG();
            nextScale = (lastScale + deltaScale + 256) % 256;
          }
          lastScale = nextScale === 0 ? lastScale : nextScale;
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
        return meta;
      }
    }]);

    return SPSParser;
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

  var RBSP = function () {
    function RBSP() {
      _classCallCheck$4(this, RBSP);
    }

    _createClass$4(RBSP, null, [{
      key: "EBSP2RBSP",

      /**
       * convert EBSP to RBSP
       * @param data {Uint8Array}
       * @returns {Uint8Array}
       * @constructor
       */
      value: function EBSP2RBSP(data) {
        return data.filter(function (el, idx) {
          if (idx < 2) {
            return true;
          } else {
            return !(data[idx - 2] === 0 && data[idx - 1] === 0 && el === 3);
          }
        });
      }

      /**
       * @param data {Uint8Array}
       * @constructor
       */

    }, {
      key: "EBSP2SODB",
      value: function EBSP2SODB(data) {
        var lastByte = data[data.byteLength - 1];
        if (lastByte && lastByte === 128) {
          return data.slice(0, data.byteLength - 1);
        }

        return data;
      }
    }]);

    return RBSP;
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

  var u8aToString = function u8aToString(data) {
    var result = '';
    for (var i = 0; i < data.byteLength; i++) {
      result += String.fromCharCode(data[i]);
    }
    return result;
  };

  var SEIParser = function () {
    function SEIParser() {
      _classCallCheck$5(this, SEIParser);
    }

    _createClass$5(SEIParser, null, [{
      key: '_resolveNalu',
      value: function _resolveNalu(data) {
        if (data.length >= 1) {
          return RBSP.EBSP2SODB(RBSP.EBSP2RBSP(data.slice(1)));
        }
        return null;
      }
      /**
       *
       * @param data {Uint8Array}
       */

    }, {
      key: 'parse',
      value: function parse(data) {
        var sodb = SEIParser._resolveNalu(data);

        var _SEIParser$switchPayl = SEIParser.switchPayloadType(sodb),
            payloadType = _SEIParser$switchPayl.payloadType,
            offset = _SEIParser$switchPayl.offset;

        var content = sodb.slice(offset);

        switch (payloadType) {
          case 5:
            return SEIParser.user_data_unregistered(content);
          default:
            return {};
        }
      }

      /**
       *
       * @param data
       * @returns {{payloadType: number, offset: number}}
       */

    }, {
      key: 'switchPayloadType',
      value: function switchPayloadType(data) {
        var dv = new DataView(data.buffer);
        var payloadType = 0;
        var offset = 0;
        while (dv.getUint8(offset) === 255) {
          offset++;
          payloadType += 255;
        }
        payloadType += dv.getUint8(offset++);

        return {
          payloadType: payloadType,
          offset: offset
        };
      }

      /**
       *
       * @param data {Uint8Array}
       * @return {{ payloadLength: number, offset: number }}
       */

    }, {
      key: 'getPayloadLength',
      value: function getPayloadLength(data) {
        var dv = new DataView(data.buffer);

        var payloadLength = 0;
        var offset = 0;
        while (dv.getUint8(offset) === 255) {
          offset++;
          payloadLength += 255;
        }
        payloadLength += dv.getUint8(offset++);

        return {
          payloadLength: payloadLength,
          offset: offset
        };
      }

      /**
       * resolve 0x05 user data unregistered
       * @param data {Uint8Array}
       */
      // eslint-disable-next-line camelcase

    }, {
      key: 'user_data_unregistered',
      value: function user_data_unregistered(data) {
        var _SEIParser$getPayload = SEIParser.getPayloadLength(data),
            payloadLength = _SEIParser$getPayload.payloadLength,
            offset = _SEIParser$getPayload.offset;

        if (payloadLength < 16) {
          return {
            uuid: '',
            content: null
          };
        }
        var payload = data.slice(offset);

        var uuid = u8aToString(payload.slice(0, 16));
        var content = u8aToString(payload.slice(16, payloadLength));

        return {
          uuid: uuid,
          content: content
        };
      }
    }]);

    return SEIParser;
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

  var Nalunit = function () {
    function Nalunit() {
      _classCallCheck$6(this, Nalunit);
    }

    _createClass$6(Nalunit, null, [{
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
          if (unit.type <= 9 && unit.type !== 0) {
            nals.push(unit);
          }
          buffer.skip(end - buffer.position);
          start = end;
        }
        return nals;
      }
    }, {
      key: 'getAvccNals',
      value: function getAvccNals(buffer) {
        // buffer.buffer = RBSP.EBSP2RBSP(new Uint8Array(buffer.buffer)).buffer;
        // buffer.dataview = new DataView(buffer.buffer)
        // buffer.dataview.position = 0;
        var nals = [];
        while (buffer.position < buffer.length - 4) {
          var length = buffer.dataview.getInt32(buffer.dataview.position);
          if (buffer.length - buffer.position >= length) {
            var header = buffer.buffer.slice(buffer.position, buffer.position + 4);
            buffer.skip(4);
            var body = new Uint8Array(buffer.buffer.slice(buffer.position, buffer.position + length));
            buffer.skip(length);
            var unit = { header: header, body: body };
            Nalunit.analyseNal(unit);
            if (unit.type <= 9 && unit.type !== 0) {
              nals.push(unit);
            }
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
        unit.type = type;
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
            unit.sei = SEIParser.parse(unit.body);
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

  var NalUnit = Nalunit;

  var _createClass$7 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var GLUtil = function () {
    function GLUtil() {
      _classCallCheck$7(this, GLUtil);
    }

    _createClass$7(GLUtil, null, [{
      key: "createTexture",
      value: function createTexture(gl, filter, data, width, height) {
        var textureRef = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        if (data instanceof Uint8Array) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        } else if (data instanceof HTMLVideoElement) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
        } else if (data instanceof HTMLImageElement) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
        } else if (data instanceof ImageData) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        return textureRef;
      }
    }, {
      key: "createBuffer",
      value: function createBuffer(gl, data) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        return buffer;
      }
    }, {
      key: "createShader",
      value: function createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);

        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(shader));
        }

        return shader;
      }
    }, {
      key: "createProgram",
      value: function createProgram(gl, vertexSource, fragmentSource) {
        var program = gl.createProgram();

        var vertexShader = GLUtil.createShader(gl, gl.VERTEX_SHADER, vertexSource);
        var fragmentShader = GLUtil.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program));
        }

        var wrapper = { program: program };

        var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < numAttributes; i++) {
          var attribute = gl.getActiveAttrib(program, i);
          wrapper[attribute.name] = gl.getAttribLocation(program, attribute.name);
        }
        var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (var i$1 = 0; i$1 < numUniforms; i$1++) {
          var uniform = gl.getActiveUniform(program, i$1);
          wrapper[uniform.name] = gl.getUniformLocation(program, uniform.name);
        }

        return wrapper;
      }
    }, {
      key: "bindAttribute",
      value: function bindAttribute(gl, buffer, attribute, numComponents) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(attribute);
        gl.vertexAttribPointer(attribute, numComponents, gl.FLOAT, false, 0, 0);
      }
    }]);

    return GLUtil;
  }();

  function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Filter = function Filter() {
    _classCallCheck$8(this, Filter);

    this.inputTextures = [];
  };

  var _createClass$8 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Basic = function (_Filter) {
    _inherits$1(Basic, _Filter);

    function Basic(config) {
      _classCallCheck$9(this, Basic);

      var _this = _possibleConstructorReturn$1(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).call(this));

      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform highp float opacity;', 'uniform sampler2D sampler;', 'uniform highp float flipx;', 'uniform highp float flipy;', 'void main(void) {', '  float cordx = textureCoord.x;', '  if(flipx > 0.5) {', '     cordx = 1.0 - textureCoord.x;', '  }', '  float cordy = 1.0 - textureCoord.y;', '  if(flipy > 0.5) {', '    cordy = textureCoord.y;', '  }', '  vec4 color = texture2D(sampler,vec2(cordx, cordy));', '  gl_FragColor = vec4(color[0],color[1],color[2],opacity);', '}'].join('\n');

      _this.opacity = config.opacity === undefined ? 1 : config.opacity;
      _this.flip = config.flip;
      return _this;
    }

    _createClass$8(Basic, [{
      key: 'init',
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program);

        // vertexPos
        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

        // texturePos
        var texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, texturePosBuffer, this.pw.texturePos, 2);

        GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);

        gl.uniform1f(this.pw.opacity, this.opacity);

        var flipx = 0;
        var flipy = 0;

        if (this.flip === 'x' || this.flip === 'xy') {
          flipx = 1;
        }

        if (this.flip === 'y' || this.flip === 'xy') {
          flipy = 1;
        }

        gl.uniform1f(this.pw.flipx, flipx);
        gl.uniform1f(this.pw.flipy, flipy);
      }
    }, {
      key: 'setFlip',
      value: function setFlip(flip) {
        var flipx = 0;
        var flipy = 0;
        this.flip = flip;
        if (this.flip === 'x' || this.flip === 'xy') {
          flipx = 1;
        }

        if (this.flip === 'y' || this.flip === 'xy') {
          flipy = 1;
        }

        this.gl.uniform1f(this.pw.flipx, flipx);
        this.gl.uniform1f(this.pw.flipy, flipy);
      }
    }, {
      key: 'render',
      value: function render(texture, width, height) {
        var gl = this.gl;
        var program = this.program;
        gl.useProgram(program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }]);

    return Basic;
  }(Filter);

  var _createClass$9 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Yuyv422 = function (_Filter) {
    _inherits$2(Yuyv422, _Filter);

    function Yuyv422(config) {
      _classCallCheck$a(this, Yuyv422);

      var _this = _possibleConstructorReturn$2(this, (Yuyv422.__proto__ || Object.getPrototypeOf(Yuyv422)).call(this));

      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  float cx = 1.0 / outerSize.x;', '  float odd = floor(mod(textureCoord.x * outerSize.x, 2.0));', '  float x = textureCoord.x + 0.5 * cx - odd * cx;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  float ydata = odd < 0.5?color[0]:color[2];', '  float udata = color[1];', '  float vdata = color[3];', '  gl_FragColor = vec4(ydata, udata, vdata, 1) * yuv2rgb;', '}'].join('\n');
      return _this;
    }

    _createClass$9(Yuyv422, [{
      key: 'init',
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program);
        // vertexPos
        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

        // texturePos
        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);

        this.inputTextures.push(textureRef);

        var yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
        gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
      }
    }, {
      key: 'render',
      value: function render(data, width, height) {
        data = data[0];
        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];

        if (this.width !== width || this.height !== height) {
          this.width = width;
          this.height = height;
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        if (!this.outputTexuture) {
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);

        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        gl.uniform2fv(this.pw.outerSize, [width, height]);

        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        return {
          texture: this.outputTexuture,
          width: width,
          height: height
        };
      }
    }]);

    return Yuyv422;
  }(Filter);

  var _createClass$a = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Rgb32 = function (_Filter) {
    _inherits$3(Rgb32, _Filter);

    function Rgb32(config) {
      _classCallCheck$b(this, Rgb32);

      var _this = _possibleConstructorReturn$3(this, (Rgb32.__proto__ || Object.getPrototypeOf(Rgb32)).call(this));

      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'void main(void) {', '  vec4 color = texture2D(sampler, textureCoord);', '  gl_FragColor = vec4(color[2],color[1],color[0],color[3]);', '}'].join('\n');
      return _this;
    }

    _createClass$a(Rgb32, [{
      key: 'init',
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;

        gl.useProgram(this.program);
        // vertexPos
        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

        // texturePos
        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);

        this.inputTextures.push(textureRef);
      }
    }, {
      key: 'render',
      value: function render(data, width, height) {
        data = data[0];
        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];

        if (this.width !== width || this.height !== height) {
          this.width = width;
          this.height = height;
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        if (!this.outputTexuture) {
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);

        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        return {
          texture: this.outputTexuture,
          width: width,
          height: height
        };
      }
    }]);

    return Rgb32;
  }(Filter);

  var _createClass$b = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Rgb24 = function (_Filter) {
    _inherits$4(Rgb24, _Filter);

    function Rgb24(config) {
      _classCallCheck$c(this, Rgb24);

      var _this = _possibleConstructorReturn$4(this, (Rgb24.__proto__ || Object.getPrototypeOf(Rgb24)).call(this));

      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  float my = floor(mod(textureCoord.y * outerSize.y, 4.0));', '  float cy = 1.0 / outerSize.y;', '  float mx = floor(mod(outerSize.x, 4.0));', '  float cx = 1.0 / outerSize.x;', '  float width =  outerSize.x + mx;', '  float x = textureCoord.x + (mx * cx * textureCoord.y * outerSize.y);', '  x = cx * mod(x * outerSize.x, width);', '  float bdata, gdata, rdata;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  rdata = color[0];', '  gdata = color[1];', '  bdata = color[2];', '  gl_FragColor = vec4(bdata, gdata, rdata, 1);', '}'].join('\n');
      return _this;
    }

    _createClass$b(Rgb24, [{
      key: 'init',
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program);
        // vertexPos
        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

        // texturePos
        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);
        this.inputTextures.push(textureRef);
      }
    }, {
      key: 'render',
      value: function render(data, width, height) {
        data = data[0];
        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];

        if (this.width !== width || this.height !== height) {
          this.width = width;
          this.height = height;
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        if (!this.outputTexuture) {
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);

        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        var outerSizeRef = gl.getUniformLocation(program, 'outerSize');
        gl.uniform2fv(outerSizeRef, [width, height]);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        var inputx = width - width % 4;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, inputx, height, 0, gl.RGB, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        return {
          texture: this.outputTexuture,
          width: width,
          height: height
        };
      }
    }]);

    return Rgb24;
  }(Filter);

  var _createClass$c = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Nv12 = function (_Filter) {
    _inherits$5(Nv12, _Filter);

    function Nv12(config) {
      _classCallCheck$d(this, Nv12);

      var _this = _possibleConstructorReturn$5(this, (Nv12.__proto__ || Object.getPrototypeOf(Nv12)).call(this));

      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 yTexturePos;', 'attribute vec2 uvTexturePos;', 'varying vec2 yTextureCoord;', 'varying vec2 uvTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  yTextureCoord = yTexturePos;', '  uvTextureCoord = uvTexturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 yTextureCoord;', 'varying highp vec2 uvTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uvSampler;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  vec4 colory = texture2D(ySampler, yTextureCoord);', '  vec4 coloruv = texture2D(uvSampler, vec2(yTextureCoord.x / 2.0, yTextureCoord.y));', '  gl_FragColor = vec4(colory[0], coloruv[0], coloruv[1], 1) * yuv2rgb;', '}'].join('\n');
      return _this;
    }

    _createClass$c(Nv12, [{
      key: 'init',
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program);
        // vertexPos
        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

        // texturePos
        var yTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, yTexturePosBuffer, this.pw.yTexturePos, 2);

        var uvTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, uvTexturePosBuffer, this.pw.uvTexturePos, 2);

        var yTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.ySampler, 0);

        this.inputTextures.push(yTextureRef);

        var uvTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.uvSampler, 1);

        this.inputTextures.push(uvTextureRef);

        var yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
        gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
      }
    }, {
      key: 'render',
      value: function render(data, width, height) {
        var ydata = data[0];
        var uvdata = data[1];
        var gl = this.gl;
        var program = this.program;
        var yTextureRef = this.inputTextures[0];
        var uvTextureRef = this.inputTextures[1];

        if (this.width !== width || this.height !== height) {
          this.width = width;
          this.height = height;
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        if (!this.outputTexuture) {
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);

        gl.useProgram(program);

        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, ydata);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, uvTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width / 2, height / 4, 0, gl.RGBA, gl.UNSIGNED_BYTE, uvdata);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        return {
          texture: this.outputTexuture,
          width: width,
          height: height
        };
      }
    }]);

    return Nv12;
  }(Filter);

  var _createClass$d = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Yuv420 = function (_Filter) {
    _inherits$6(Yuv420, _Filter);

    function Yuv420(render, config) {
      _classCallCheck$e(this, Yuv420);

      var _this = _possibleConstructorReturn$6(this, (Yuv420.__proto__ || Object.getPrototypeOf(Yuv420)).call(this));

      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 yTexturePos;', 'attribute vec2 uTexturePos;', 'attribute vec2 vTexturePos;', 'varying vec2 yTextureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  yTextureCoord = yTexturePos;', '  uTextureCoord = uTexturePos;', '  vTextureCoord = vTexturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 yTextureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 yuv2rgb;', 'void main(void) {', '  highp float y = texture2D(ySampler,  yTextureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * yuv2rgb;', '}'].join('\n');
      return _this;
    }

    _createClass$d(Yuv420, [{
      key: 'init',
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program);
        // vertexPos
        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

        // texturePos
        var yTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, yTexturePosBuffer, this.pw.yTexturePos, 2);

        var uTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, uTexturePosBuffer, this.pw.uTexturePos, 2);

        var vTexturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, vTexturePosBuffer, this.pw.vTexturePos, 2);

        var yTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.ySampler, 0);

        this.inputTextures.push(yTextureRef);

        var uTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.uSampler, 1);

        this.inputTextures.push(uTextureRef);

        var vTextureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.vSampler, 2);

        this.inputTextures.push(vTextureRef);

        var yuv2rgb = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
        gl.uniformMatrix4fv(this.pw.yuv2rgb, false, yuv2rgb);
      }
    }, {
      key: 'render',
      value: function render(data, width, height) {
        var ydata = data[0];
        var udata = data[1];
        var vdata = data[2];
        var gl = this.gl;
        var program = this.program;
        var yTextureRef = this.inputTextures[0];
        var uTextureRef = this.inputTextures[1];
        var vTextureRef = this.inputTextures[2];

        if (this.width !== width || this.height !== height) {
          this.width = width;
          this.height = height;
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        if (!this.outputTexuture) {
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);

        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, ydata);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width / 2, height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, udata);

        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width / 2, height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vdata);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        return {
          texture: this.outputTexuture,
          width: width,
          height: height
        };
      }
    }]);

    return Yuv420;
  }(Filter);

  var _createClass$e = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$f(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Rgba = function (_Filter) {
    _inherits$7(Rgba, _Filter);

    function Rgba(config) {
      _classCallCheck$f(this, Rgba);

      var _this = _possibleConstructorReturn$7(this, (Rgba.__proto__ || Object.getPrototypeOf(Rgba)).call(this));

      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'void main(void) {', '  vec4 color = texture2D(sampler, textureCoord);', '  gl_FragColor = vec4(color[0],color[1],color[2],color[3]);', '}'].join('\n');
      return _this;
    }

    _createClass$e(Rgba, [{
      key: 'init',
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;

        gl.useProgram(this.program);
        // vertexPos
        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

        // texturePos
        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);

        this.inputTextures.push(textureRef);
      }
    }, {
      key: 'render',
      value: function render(data, width, height) {
        if (data instanceof ImageData) {
          data = data.data;
        } else {
          data = data[0];
        }

        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];

        if (this.width !== width || this.height !== height) {
          this.width = width;
          this.height = height;
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        if (!this.outputTexuture) {
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);

        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        return {
          texture: this.outputTexuture,
          width: width,
          height: height
        };
      }
    }]);

    return Rgba;
  }(Filter);

  var _createClass$f = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$g(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Rgb = function (_Filter) {
    _inherits$8(Rgb, _Filter);

    function Rgb(config) {
      _classCallCheck$g(this, Rgb);

      var _this = _possibleConstructorReturn$8(this, (Rgb.__proto__ || Object.getPrototypeOf(Rgb)).call(this));

      _this.vShader = ['attribute vec4 vertexPos;', 'attribute vec2 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos;', '}'].join('\n');
      _this.fShader = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform vec2 outerSize;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  float my = floor(mod(textureCoord.y * outerSize.y, 4.0));', '  float cy = 1.0 / outerSize.y;', '  float mx = floor(mod(outerSize.x, 4.0));', '  float cx = 1.0 / outerSize.x;', '  float width =  outerSize.x + mx;', '  float x = textureCoord.x + (mx * cx * textureCoord.y * outerSize.y);', '  x = cx * mod(x * outerSize.x, width);', '  float bdata, gdata, rdata;', '  vec4 color = texture2D(sampler, vec2(x, textureCoord.y));', '  rdata = color[0];', '  gdata = color[1];', '  bdata = color[2];', '  gl_FragColor = vec4(rdata, gdata, bdata, 1);', '}'].join('\n');
      return _this;
    }

    _createClass$f(Rgb, [{
      key: 'init',
      value: function init(render) {
        this.rend = render;
        this.canvas = render.canvas;
        var gl = this.gl = render.gl;
        this.pw = GLUtil.createProgram(gl, this.vShader, this.fShader);
        this.program = this.pw.program;
        gl.useProgram(this.program);
        // vertexPos
        var vertexPosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]));
        GLUtil.bindAttribute(gl, vertexPosBuffer, this.pw.vertexPos, 2);

        // texturePos
        this.texturePosBuffer = GLUtil.createBuffer(gl, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]));
        GLUtil.bindAttribute(gl, this.texturePosBuffer, this.pw.texturePos, 2);

        var textureRef = GLUtil.createTexture(gl, gl.LINEAR);
        gl.uniform1i(this.pw.sampler, 0);
        this.inputTextures.push(textureRef);
      }
    }, {
      key: 'render',
      value: function render(data, width, height) {
        data = data[0];
        var gl = this.gl;
        var program = this.program;
        var textureRef = this.inputTextures[0];

        if (this.width !== width || this.height !== height) {
          this.width = width;
          this.height = height;
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        if (!this.outputTexuture) {
          this.outputTexuture = GLUtil.createTexture(gl, gl.LINEAR, new Uint8Array(width * height * 4), width, height);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.rend.fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.outputTexuture, 0);

        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        var outerSizeRef = gl.getUniformLocation(program, 'outerSize');
        gl.uniform2fv(outerSizeRef, [width, height]);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        var inputx = width - width % 4;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, inputx, height, 0, gl.RGB, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        return {
          texture: this.outputTexuture,
          width: width,
          height: height
        };
      }
    }]);

    return Rgb;
  }(Filter);

  var _createClass$g = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$h(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Render = function () {
    function Render(config) {
      _classCallCheck$h(this, Render);

      this.canvas = config.canvas;
      // input
      if (config.video) {
        this.video = config.video;
        config.flip = 'y';
      } else if (config.image) {
        this.image = config.image;
      } else {
        this._initFmt(config);
      }

      this.filters = [];

      this.basicFilter = new Basic({
        opacity: config.opacity !== undefined ? config.opacity : 1,
        flip: config.flip || undefined
      });

      if (config.filters) {
        for (var i = 0; i < config.filters.length; i++) {
          this.filters.push(config.filters[i]);
        }
      }
      this._init();
    }

    _createClass$g(Render, [{
      key: '_initFmt',
      value: function _initFmt(config) {
        switch (config.format) {
          case 'YUY2':
            this.fmt = new Yuyv422(this);
            break;
          case 'RGBA':
            this.fmt = new Rgba(this);
            break;
          case 'RGB':
            this.fmt = new Rgb(this);
            break;
          case 'RGB32':
            this.fmt = new Rgb32(this);
            break;
          case 'RGB24':
            this.fmt = new Rgb24(this);
            break;
          case 'NV12':
            this.fmt = new Nv12(this);
            break;
          case 'YUV420':
            this.fmt = new Yuv420(this);
            break;
        }
      }
    }, {
      key: '_initImage',
      value: function _initImage() {}
    }, {
      key: '_init',
      value: function _init() {
        this._initContextGL();

        if (!this.gl) {
          throw new Error('fail to init gl');
        }

        var gl = this.gl;
        this.fb = gl.createFramebuffer();

        if (this.fmt) {
          this.fmt.init(this);
        } else if (this.video) {
          var width = this.video.videoWidth;
          var height = this.video.videoHeight;
          var emptyPixels = new Uint8Array(width * height * 4);
          this.videoTexture = GLUtil.createTexture(gl, gl.LINEAR, emptyPixels, width, height);
        }
        this.basicFilter.init(this);

        for (var i = 0; i < this.filters.length; i++) {
          var filter = this.filters[i];
          filter.init(this);
        }
      }
    }, {
      key: '_initContextGL',
      value: function _initContextGL() {
        var canvas = this.canvas;
        var gl = null;

        var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
        var nameIndex = 0;

        while (!gl && nameIndex < validContextNames.length) {
          var contextName = validContextNames[nameIndex];

          try {
            gl = canvas.getContext(contextName);
          } catch (e) {
            gl = null;
          }

          if (!gl || typeof gl.getParameter !== 'function') {
            gl = null;
          }

          ++nameIndex;
        }
        this.gl = gl;
      }
    }, {
      key: '_drawPicture',
      value: function _drawPicture(data, iWidth, iHeight) {
        var _fmt$render = this.fmt.render(data, iWidth, iHeight),
            texture = _fmt$render.texture,
            width = _fmt$render.width,
            height = _fmt$render.height;

        this._applyFilters(texture, width, height);
      }
    }, {
      key: '_drawVideo',
      value: function _drawVideo() {
        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);
        this._applyFilters(this.videoTexture, this.video.videoWidth, this.video.videoHeight);
      }
    }, {
      key: '_applyFilters',
      value: function _applyFilters(texture, width, height) {
        var gl = this.gl;

        for (var i = 0; i < this.filters.length; i++) {
          var filter = this.filters[i];
          var data = filter.render(texture, width, height);
          texture = data.texture;
          width = data.width;
          height = data.height;
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (this.width !== width || this.height !== height) {
          this.width = this.canvas.width = width;
          this.height = this.canvas.height = height;
        }
        this.basicFilter.render(texture, width, height);
      }
    }, {
      key: 'render',
      value: function render(data, width, height) {
        if (this.fmt) {
          if (this.width !== width || this.height !== height) {
            this.width = this.canvas.width = width;
            this.height = this.canvas.height = height;
          }

          this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
          this._drawPicture(data, width, height);
        } else if (this.video) {
          this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
          this._drawVideo();
        }
      }
    }]);

    return Render;
  }();

  var _createClass$h = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$i(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var SourceBuffer = function () {
    function SourceBuffer(config) {
      _classCallCheck$i(this, SourceBuffer);

      this.config = Object.assign({}, config);
      this.type = this.config.type;
      this.buffer = [];
      this.currentGop = undefined;
      this._lastGet = undefined;
    }

    _createClass$h(SourceBuffer, [{
      key: 'push',
      value: function push(frame) {
        if (this.type === 'video') {
          if (frame.isKeyframe) {
            var currentGop = {
              samples: [],
              start: frame.dts,
              end: frame.dts,
              nextGop: undefined
            };
            if (this.currentGop) {
              this.currentGop.nextGop = currentGop;
            }
            this.currentGop = currentGop;
            this.buffer.push(this.currentGop);
          }

          if (this.currentGop) {
            this.currentGop.samples.push(frame);

            if (frame.dts < this.currentGop.start) {
              this.currentGop.start = frame.dts;
            }

            if (frame.dts > this.currentGop.end) {
              this.currentGop.end = frame.dts;
            }
          }
        }
      }
    }, {
      key: 'get',
      value: function get(time) {
        if (this.type === 'video') {
          if (this.buffer.length < 1) {
            return;
          }

          if (time === undefined) {
            var sample = this._getNext();
            return sample;
          }
        }
      }
    }, {
      key: '_getNext',
      value: function _getNext() {
        if (!this._lastGet) {
          var gop = this.buffer[0];
          if (gop.samples.length < 1) {
            return;
          }

          this._lastGet = {
            gop: gop,
            index: 0
          };
          return gop.samples[0];
        } else {
          var _gop = this._lastGet.gop;
          var sample = _gop.samples[this._lastGet.index + 1];
          if (sample) {
            this._lastGet.index = this._lastGet.index + 1;
            return sample;
          } else {
            _gop = _gop.nextGop;
            if (!_gop || _gop.samples.length < 1) {
              return;
            }
            sample = _gop.samples[0];
            this._lastGet = {
              gop: _gop,
              index: 0
            };
            return sample;
          }
        }
      }
    }, {
      key: 'remove',
      value: function remove(start, end) {
        if (this.buffer.length < 0) {
          return;
        }

        var i = 0;
        var gop = this.buffer[0];
        while (gop) {
          if (gop.end < end && gop.start >= start) {
            this.buffer.splice(i, 1);
            gop = this.buffer[i];
          } else {
            i += 1;
            gop = this.buffer[i];
          }
        }
      }
    }]);

    return SourceBuffer;
  }();

  var _createClass$i = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$j(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var TimeRanges = function () {
    function TimeRanges(ranges) {
      _classCallCheck$j(this, TimeRanges);

      this.ranges = ranges || [];
    }

    _createClass$i(TimeRanges, [{
      key: "start",
      value: function start(idx) {
        return this.ranges[idx] ? this.ranges[idx].start : 0;
      }
    }, {
      key: "end",
      value: function end(idx) {
        return this.ranges[idx] ? this.ranges[idx].end : 0;
      }
    }, {
      key: "add",
      value: function add(range) {
        this.ranges.push(range);
      }
    }, {
      key: "length",
      get: function get() {
        return this.ranges.length;
      }
    }]);

    return TimeRanges;
  }();

  var _createClass$j = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$k(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var VideoCanvas = function () {
    function VideoCanvas(config) {
      _classCallCheck$k(this, VideoCanvas);

      this.config = Object.assign({}, config);
      this.canvas = this.config.canvas ? this.config.canvas : document.createElement('canvas');
      this.source = new SourceBuffer({ type: 'video' });
      this.preloadTime = this.config.preloadTime || 3;
      this.oncanplay = undefined;
      this.onFirstFrame = undefined;
      this.meta = undefined;
      this.readyStatus = 0;
      this.paused = true;
      this.count = 0;
      this.currentTime = 0;
      this.lastPlayed = 0;

      this._decoderInited = false;
      this._avccpushed = false;
      this._decodedFrames = {};
      this._lastSampleDts = undefined;
      this._baseDts = undefined;
      this._lastRenderTime = null;
      this.playFinish = null;

      this.canvas.style.maxWidth = '100%';
      this.canvas.style.maxHeight = '100%';
      this.canvas.style.top = 0;
      this.canvas.style.bottom = 0;
      this.canvas.style.left = 0;
      this.canvas.style.right = 0;
      this.canvas.style.margin = 'auto';
      this.canvas.style.position = 'absolute';
    }

    _createClass$j(VideoCanvas, [{
      key: 'pause',
      value: function pause() {
        this.paused = true;
      }
    }, {
      key: 'initWasmWorker',
      value: function initWasmWorker() {
        var _this2 = this;

        var _this = this;
        // eslint-disable-next-line no-undef
        this.wasmworker = new VideoWorker();
        this.wasmworker.postMessage({
          msg: 'init',
          meta: this.meta
        });
        this.wasmworker.addEventListener('message', function (msg) {
          switch (msg.data.msg) {
            case 'DECODER_READY':
              _this._decoderInited = true;
              break;
            case 'DECODED':
              _this2._onDecoded(msg.data);
              break;
          }
        });
      }
    }, {
      key: 'setVideoMetaData',
      value: function setVideoMetaData(meta) {
        this.meta = meta;
        if (!this._decoderInited) {
          this.initWasmWorker();
          return;
        }
        this._avccpushed = true;
        var data = new Uint8Array(meta.sps.byteLength + 4);
        data.set([0, 0, 0, 1]);
        data.set(meta.sps, 4);
        this.wasmworker.postMessage({
          msg: 'decode',
          data: data
        });

        data = new Uint8Array(meta.pps.byteLength + 4);
        data.set([0, 0, 0, 1]);
        data.set(meta.pps, 4);
        this.wasmworker.postMessage({
          msg: 'decode',
          data: data
        });

        if (!this.yuvCanvas) {
          var format = 'YUV420';
          if (meta.chromaFormat === 422) {
            format = 'YUV422P';
          }
          var config = Object.assign({ format: format, canvas: this.canvas }, this.config);
          this.yuvCanvas = new Render(config);
        }
        this.readyStatus = 1;
      }
    }, {
      key: 'decodeVideo',
      value: function decodeVideo(videoTrack) {
        if (!this._decoderInited) {
          return;
        }

        if (!this._avccpushed) {
          this.setVideoMetaData(this.meta);
        }
        var samples = videoTrack.samples;

        var sample = samples.shift();

        while (sample) {
          if (!this._baseDts) {
            this._baseDts = sample.dts;
          }
          this.source.push(sample);
          sample = samples.shift();
        }

        this._preload();
      }
    }, {
      key: '_preload',
      value: function _preload() {
        if (!this._lastSampleDts || this._lastSampleDts - this._baseDts < this.currentTime + this.preloadTime * 1000) {
          var sample = this.source.get();
          if (sample) {
            this._lastSampleDts = sample.dts;
            this._analyseNal(sample);
          }

          while (sample && this._lastSampleDts - this._baseDts < this.currentTime + this.preloadTime * 1000) {
            sample = this.source.get();
            if (sample) {
              this._analyseNal(sample);
              this._lastSampleDts = sample.dts;
            }
          }
        }
      }
    }, {
      key: '_analyseNal',
      value: function _analyseNal(sample) {
        var nals = NalUnit.getAvccNals(new Stream(sample.data.buffer));

        var length = 0;
        for (var i = 0; i < nals.length; i++) {
          var nal = nals[i];
          length += nal.body.byteLength + 4;
        }
        var offset = 0;
        var data = new Uint8Array(length);
        for (var _i = 0; _i < nals.length; _i++) {
          var _nal = nals[_i];
          data.set([0, 0, 0, 1], offset);
          offset += 4;
          data.set(new Uint8Array(_nal.body), offset);
          offset += _nal.body.byteLength;
        }
        this.wasmworker.postMessage({
          msg: 'decode',
          data: data,
          info: {
            dts: sample.dts,
            pts: sample.pts ? sample.pts : sample.dts + sample.cts,
            key: sample.isKeyframe
          }
        });
      }
    }, {
      key: '_onDecoded',
      value: function _onDecoded(data) {
        var dts = data.info.dts;

        this._decodedFrames[dts] = data;
        if (Object.keys(this._decodedFrames).length > 10) {
          if (this.playFinish) {
            this.playFinish();
          }
          if (this.oncanplay) {
            this.oncanplay();
          }
        }
      }
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        this.paused = false;
        return new Promise(function (resolve) {
          _this3.playFinish = resolve;
        }).then(function () {
          _this3.playFinish = null;
        });
      }
    }, {
      key: '_onTimer',
      value: function _onTimer(currentTime) {
        if (this.paused) {
          return;
        }

        if (this.meta) {
          if (this.meta.frameRate && this.meta.frameRate.fixed && this.meta.frameRate.fps) ;
          var frameTimes = Object.keys(this._decodedFrames);
          if (frameTimes.length > 0) {
            this.currentTime = currentTime;
            var frameTime = -1;
            for (var i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) - this._baseDts <= this.currentTime; i++) {
              frameTime = Number.parseInt(frameTimes[i - 1]);
            }

            var frame = this._decodedFrames[frameTime];
            if (frame) {
              var buf = [];
              if (this.meta.chromaFormat === 420) {

                var buf0 = frame.buffer.slice(0, frame.yLinesize * frame.height);
                var buf1 = frame.buffer.slice(frame.yLinesize * frame.height, frame.yLinesize * frame.height * 1.25);
                var buf2 = frame.buffer.slice(frame.yLinesize * frame.height * 1.25, frame.yLinesize * frame.height * 1.5);
                buf = [new Uint8Array(buf0), new Uint8Array(buf1), new Uint8Array(buf2)];
              }
              this.yuvCanvas.render(buf, frame.yLinesize, frame.height);
            }
            for (var _i2 = 0; _i2 < frameTimes.length; _i2++) {
              if (Number.parseInt(frameTimes[_i2]) < frameTime) {
                delete this._decodedFrames[frameTimes[_i2]];
              }
            }
          }
        }
        this._lastRenderTime = Date.now();
      }
    }, {
      key: 'cleanBuffer',
      value: function cleanBuffer() {
        if (this.currentTime > 1) {
          this.source.remove(0, this.currentTime - 1);
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.wasmworker.postMessage({ msg: 'destroy' });
        this.wasmworker = null;
        this.canvas = null;
        this.source = null;
        this._decoderInited = false;
      }
    }, {
      key: 'buffered',
      get: function get() {
        var ranges = [];
        var currentRange = {
          start: null,
          end: null
        };
        for (var i = 0; i < this.source.buffer.length; i++) {
          var _source$buffer$i = this.source.buffer[i],
              start = _source$buffer$i.start,
              end = _source$buffer$i.end;

          if (!currentRange.start) {
            currentRange.start = start;
          }
          if (!currentRange.end) {
            currentRange.end = end;
          }

          if (start - currentRange.end > 1000) {
            currentRange.start = currentRange.start / 1000;
            currentRange.end = currentRange.end / 1000;
            currentRange = {
              start: start,
              end: end
            };
          } else {
            currentRange.end = end;
          }
        }

        if (currentRange.start !== null && currentRange.end !== null) {
          currentRange.start = currentRange.start / 1000;
          currentRange.end = currentRange.end / 1000;
          ranges.push(currentRange);
        }

        return new TimeRanges(ranges);
      }
    }]);

    return VideoCanvas;
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

  var _createClass$k = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$l(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$9(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var AudioCtx = function (_EventEmitter) {
    _inherits$9(AudioCtx, _EventEmitter);

    function AudioCtx(config) {
      _classCallCheck$l(this, AudioCtx);

      var _this2 = _possibleConstructorReturn$9(this, (AudioCtx.__proto__ || Object.getPrototypeOf(AudioCtx)).call(this));

      _this2.config = Object.assign({}, config);
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      _this2.context = new AudioContext();
      _this2.gainNode = _this2.context.createGain();
      _this2.gainNode.connect(_this2.context.destination);
      _this2.meta = undefined;
      _this2.samples = [];
      _this2.preloadTime = _this2.config.preloadTime || 3;
      _this2.duration = 0;

      _this2._currentBuffer = undefined;
      _this2._nextBuffer = undefined;
      _this2._lastpts = undefined;
      _this2._preDecode = [];
      _this2._currentTime = 0;
      _this2._decoding = false;
      _this2._volume = _this2.config.volume || 0.6;
      // 记录外部传输的状态
      _this2._played = false;
      _this2.playFinish = null; // pending play task
      _this2.waitNextID = null; // audio source end and next source not loaded
      return _this2;
    }

    _createClass$k(AudioCtx, [{
      key: 'decodeAudio',
      value: function decodeAudio(audioTrack) {
        var samples = audioTrack.samples,
            meta = audioTrack.meta;

        var data = samples;
        audioTrack.samples = [];
        if (meta) {
          this.setAudioData(data);
        }
      }
    }, {
      key: 'setAudioData',
      value: function setAudioData(data) {
        for (var i = 0; i < data.length; i++) {
          data[i].pts = data[i].pts === undefined ? data[i].dts : data[i].pts;
          this._preDecode.push(data[i]);
        }
        if (this._preDecode.length > 0) {
          if (this._lastpts === undefined) {
            this._lastpts = this._preDecode[0].pts;
          }
          if ((this._preDecode[this._preDecode.length - 1].pts - this._lastpts) / 1000 > this.preloadTime) {
            this.decodeAAC();
          }
        }
      }
    }, {
      key: 'decodeAAC',
      value: function decodeAAC() {
        if (this._decoding) {
          return;
        }
        this._decoding = true;
        var data = this._preDecode;
        var samples = [];
        var _this = this;
        var sample = data.shift();
        while (sample) {
          var sampleData = AudioCtx.getAACData(this.meta, sample);
          samples.push(sampleData);
          this._lastpts = sample.pts;
          sample = data.shift();
        }
        var buffer = AudioCtx.combileData(samples);
        try {
          this.context.decodeAudioData(buffer.buffer, function (buffer) {
            var audioSource = _this.context.createBufferSource();
            audioSource.buffer = buffer;
            // audioSource.onended = _this.onSourceEnded.bind(_this);
            _this.samples.push({
              time: _this.duration,
              duration: buffer.duration,
              data: audioSource
            });

            _this.duration += buffer.duration;

            if (!_this._currentBuffer) {
              _this._currentBuffer = _this.getTimeBuffer(_this.currentTime);
            }

            if (!_this._nextBuffer && _this._currentBuffer) {
              _this._nextBuffer = _this.getTimeBuffer(_this.currentTime + _this._currentBuffer.duration);
            }
            _this._decoding = false;

            if ((_this._preDecode.length > 0 && _this._preDecode[_this._preDecode.length - 1].pts - _this._lastpts) / 1000 >= _this.preloadTime) {
              _this.decodeAAC();
            }

            if (_this.playFinish) {
              _this.playFinish();
            }
          }, function (e) {
            console.error(e);
          });
        } catch (err) {
          console.error(err);
        }
      }
    }, {
      key: 'onSourceEnded',
      value: function onSourceEnded() {
        var _this3 = this;

        if (!this._nextBuffer || !this._played) {
          this.waitNextID = setTimeout(function () {
            _this3.onSourceEnded();
          }, 200);
          return;
        }
        var audioSource = this._nextBuffer.data;
        audioSource.start();
        audioSource.connect(this.gainNode);
        var _this = this;
        setTimeout(function () {
          _this.onSourceEnded.call(_this3);
        }, audioSource.buffer.duration * 1000 - 10);
        this._currentBuffer = this._nextBuffer;
        this._currentTime = this._currentBuffer.time;
        this._nextBuffer = this.getTimeBuffer(this.currentTime);
        if (this._currentBuffer) {
          this._nextBuffer = this.getTimeBuffer(this.currentTime + this._currentBuffer.duration);
        }
        this.emit('AUDIO_SOURCE_END');
      }
    }, {
      key: 'play',
      value: function play() {
        var _this4 = this;

        if (this.playFinish) {
          return;
        }
        this._played = true;
        if (this.context.state === 'suspended') {
          this.context.resume();
        }
        var _this = this;
        var playStart = function playStart() {
          var audioSource = _this4._currentBuffer.data;
          audioSource.connect(_this4.gainNode);
          audioSource.start();
          setTimeout(function () {
            _this.onSourceEnded.call(_this4);
          }, audioSource.buffer.duration * 1000 - 10);
        };

        if (!this._currentBuffer) {
          return new Promise(function (resolve) {
            _this4.playFinish = resolve;
          }).then(function () {
            _this4.playFinish = null;
            playStart();
          });
        } else {
          playStart();
          return Promise.resolve();
        }
      }
    }, {
      key: 'pause',
      value: function pause() {
        var audioCtx = this.context;
        if (audioCtx.state === 'running') {
          audioCtx.suspend();
        }
      }
    }, {
      key: 'getTimeBuffer',
      value: function getTimeBuffer(time) {
        var ret = void 0;
        for (var i = 0; i < this.samples.length; i++) {
          var sample = this.samples[i];
          if (sample.time <= time && sample.time + sample.duration > time) {
            ret = sample;
            break;
          }
        }
        return ret;
      }
    }, {
      key: 'setAudioMetaData',
      value: function setAudioMetaData(meta) {
        this.meta = meta;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        if (this.waitNextID) {
          window.clearTimeout(this.waitNextID);
        }
        this.context.close();
      }
    }, {
      key: 'currentTime',
      get: function get() {
        return this._currentTime;
      }
    }, {
      key: 'muted',
      set: function set(val) {
        if (val) {
          this.gainNode.gain.value = 0;
        } else {
          this.gainNode.gain.value = this._volume;
        }
      }
    }, {
      key: 'volume',
      get: function get() {
        return this._volume;
      },
      set: function set(val) {
        if (val < 0) {
          this._volume = 0;
          this.gainNode.gain.value = 0;
          return;
        } else if (val > 1) {
          this._volume = 1;
          this.gainNode.gain.value = 1;
          return;
        }

        this._volume = val;
        this.gainNode.gain.value = val;
      }
    }], [{
      key: 'getAACData',
      value: function getAACData(meta, sample) {
        var buffer = new Uint8Array(sample.data.byteLength + 7);
        var adts = AudioCtx.getAdts(meta, sample.data);
        buffer.set(adts);
        buffer.set(sample.data, 7);
        return buffer;
      }
    }, {
      key: 'combileData',
      value: function combileData(samples) {
        // get length
        var length = 0;
        for (var i = 0, k = samples.length; i < k; i++) {
          length += samples[i].byteLength;
        }

        var ret = new Uint8Array(length);
        var offset = 0;
        // combile data;
        for (var _i = 0, _k = samples.length; _i < _k; _i++) {
          ret.set(samples[_i], offset);
          offset += samples[_i].byteLength;
        }
        return ret;
      }
    }, {
      key: 'getAdts',
      value: function getAdts(meta, data) {
        var adts = new Uint8Array(7);

        // 设置同步位 0xfff 12bit
        adts[0] = 0xff;
        adts[1] = 0xf0;

        // Object data (没什么人用MPEG-2了，HLS和FLV也全是MPEG-4，这里直接0)  1bit
        // Level always 00 2bit
        // CRC always 1 1bit
        adts[1] = adts[1] | 0x01;

        // profile 2bit
        adts[2] = 0xc0 & meta.objectType - 1 << 6;

        // sampleFrequencyIndex
        adts[2] = adts[2] | 0x3c & meta.sampleRateIndex << 2;

        // private bit 0 1bit
        // chanel configuration 3bit
        adts[2] = adts[2] | 0x01 & meta.channelCount >> 2;
        adts[3] = 0xc0 & meta.channelCount << 6;

        // original_copy: 0 1bit
        // home: 0 1bit

        // adts_variable_header()
        // copyrighted_id_bit 0 1bit
        // copyrighted_id_start 0 1bit

        // aac_frame_length 13bit;
        var aacframelength = data.byteLength + 7;

        adts[3] = adts[3] | 0x03 & aacframelength >> 11;
        adts[4] = 0xff & aacframelength >> 3;
        adts[5] = 0xe0 & aacframelength << 5;

        // adts_buffer_fullness 0x7ff 11bit
        adts[5] = adts[5] | 0x1f;
        adts[6] = 0xfc;

        // number_of_raw_data_blocks_in_frame 0 2bit;
        return adts;
      }
    }]);

    return AudioCtx;
  }(EventEmitter);

  var _createClass$l = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$m(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /**
   * 音画同步调和器
   */
  var AVReconciler = function () {
    function AVReconciler(props) {
      _classCallCheck$m(this, AVReconciler);

      this.aCtx = props.aCtx;
      this.vCtx = props.vCtx;
      this.video = props.video;
      this.timeoutId = null;
      this.start = null;
    }

    _createClass$l(AVReconciler, [{
      key: "doReconcile",
      value: function doReconcile() {
        var _this = this;

        var vCurTime = this.vCtx.currentTime || 0;
        var aCurTime = (this.aCtx.currentTime || 0) * 1000;

        var gap = vCurTime - aCurTime;
        if (this.timeoutId) {
          return;
        }
        if (gap > 200) {
          // audio delayed for more than 100ms
          this.video.start += gap;
          this.vCtx.pause();
          this.timeoutId = setTimeout(function () {
            _this.vCtx.play();
            _this.timeoutId = null;
          }, gap);
        } else if (gap < -120) {
          this.video.start += gap;
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.start = null;
        this.aCtx = null;
        this.vCtx = null;
      }
    }]);

    return AVReconciler;
  }();

  var _createClass$m = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$n(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$a(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  // eslint-disable-next-line no-undef

  var MobileVideo = function (_HTMLElement) {
    _inherits$a(MobileVideo, _HTMLElement);

    _createClass$m(MobileVideo, null, [{
      key: 'resolveVideoGOP',

      /**
       * 保证当前播放的视频以gop为单位
       * @param videoTrack
       */
      value: function resolveVideoGOP(videoTrack) {
        var samples = videoTrack.samples;

        if (!samples.length) {
          return;
        }

        var firstIframeIdx = null;
        var lastIframeIdx = null;

        if (videoTrack.tempSamples && videoTrack.tempSamples.length) {
          // 将缓存帧放置到队列的头部
          samples.unshift.apply(samples, videoTrack.tempSamples);
        }

        // 寻找第一个I帧
        for (var i = 0, len = samples.length; i < len; i++) {
          var current = samples[i];
          if (current.isKeyframe) {
            firstIframeIdx = i;
            break;
          }
        }

        // 寻找最后一个I帧
        for (var _i = samples.length - 1; _i > 0; _i++) {
          var _current = samples[_i];

          if (_current.isKeyframe) {
            lastIframeIdx = _i;
            break;
          }
        }

        if (firstIframeIdx !== 0) {
          samples.splice(0, firstIframeIdx - 1);
        }

        videoTrack.samples = samples.slice(0, lastIframeIdx);
        var rest = samples.slice(lastIframeIdx);
        if (videoTrack.tempSamples) {
          videoTrack.tempSamples.push.apply(videoTrack.tempSamples, rest);
        } else {
          // 将剩下的帧缓存，等待一个完整的gop
          videoTrack.tempSamples = rest;
        }
      }
    }]);

    function MobileVideo() {
      _classCallCheck$n(this, MobileVideo);

      var _this = _possibleConstructorReturn$a(this, (MobileVideo.__proto__ || Object.getPrototypeOf(MobileVideo)).call(this));

      _this._canvas = document.createElement('canvas');
      _this.handleAudioSourceEnd = _this.handleAudioSourceEnd.bind(_this);
      _this.played = false;
      _this.pendingPlayTask = null;
      _this._paused = true;
      _this.videoMetaInited = false;
      _this.audioMetaInited = false;
      _this.init();
      return _this;
    }

    _createClass$m(MobileVideo, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        this.vCtx = new VideoCanvas(Object.assign({
          canvas: this._canvas
        }, { style: { width: this.width, height: this.height } }));
        this.aCtx = new AudioCtx({});
        this.ticker = new (getTicker())();
        this.reconciler = new AVReconciler({
          vCtx: this.vCtx,
          aCtx: this.aCtx,
          video: this
        });

        this.dispatchEvent(new Event('waiting'));
        this.vCtx.oncanplay = function () {
          if (!_this2.played) {
            _this2.appendChild(_this2._canvas);
          }
          _this2.dispatchEvent(new Event('canplay'));
        };

        this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
      }
    }, {
      key: 'handleAudioSourceEnd',
      value: function handleAudioSourceEnd() {
        this.reconciler.doReconcile();
        this.vCtx.cleanBuffer();
      }
    }, {
      key: '_cleanBuffer',
      value: function _cleanBuffer() {
        this.vCtx.cleanBuffer();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.videoMetaInited = false;
        this.audioMetaInited = false;

        this.aCtx.destroy();
        this.vCtx.destroy();
        this.ticker.stop();
        this.start = null;
        this.reconciler.destroy();
        this.aCtx = null;
        this.vCtx = null;
        this.ticker = null;
      }
    }, {
      key: 'onDemuxComplete',
      value: function onDemuxComplete(videoTrack, audioTrack) {
        // MobileVideo.resolveVideoGOP(videoTrack)
        this.aCtx.decodeAudio(audioTrack);
        this.vCtx.decodeVideo(videoTrack);
      }
    }, {
      key: 'setAudioMeta',
      value: function setAudioMeta(meta) {
        if (this.audioMetaInited) {
          this.aCtx.destroy();
          this.aCtx = new AudioCtx({});
        }
        this.aCtx.setAudioMetaData(meta);
        this.audioMetaInited = true;
      }
    }, {
      key: 'setVideoMeta',
      value: function setVideoMeta(meta) {
        if (this.videoMetaInited) {
          this.vCtx.destroy();
          this.vCtx = new VideoCanvas(Object.assign({
            canvas: this._canvas
          }, { style: { width: this.width, height: this.height } }));
        }
        this.vCtx.setVideoMetaData(meta);
        this.videoMetaInited = true;
      }
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        if (this.pendingPlayTask) {
          return;
        }

        if (this.played) {
          this.destroy();
          this.init();
        }
        this.pendingPlayTask = Promise.all([this.vCtx.play(), this.aCtx.play().then(function () {
          _this3.aCtx.muted = true;
        })]).then(function () {
          _this3.aCtx.muted = false;
          _this3.ticker.start(function () {
            if (!_this3.start) {
              _this3.start = Date.now();
            }
            _this3._currentTime = Date.now() - _this3.start;
            _this3.vCtx._onTimer(_this3._currentTime);
          });

          _this3.pendingPlayTask = null;
          _this3.played = true;
          _this3.dispatchEvent(new Event('playing'));
          _this3.dispatchEvent(new Event('play'));
          _this3._paused = false;
        });
      }
    }, {
      key: 'pause',
      value: function pause() {
        this._paused = true;
        this.aCtx.pause();
        this.vCtx.pause();

        this.dispatchEvent(new Event('pause'));
      }
    }, {
      key: 'width',
      get: function get() {
        return this.getAttribute('width') || this.videoWidth;
      },
      set: function set(val) {
        this.style.display = 'inline-block';
        var pxVal = typeof val === 'number' ? val + 'px' : val;
        this.setAttribute('width', pxVal);
        this.style.width = pxVal;
        this._canvas.width = val;
      }
    }, {
      key: 'height',
      get: function get() {
        return this.getAttribute('height');
      },
      set: function set(val) {
        this.style.display = 'inline-block';
        var pxVal = typeof val === 'number' ? val + 'px' : val;
        this.setAttribute('height', pxVal);
        this.style.height = pxVal;
        this._canvas.height = val;
      }
    }, {
      key: 'videoWidth',
      get: function get() {
        if (this.vCtx && this.vCtx.videoWidth) {
          return this.vCtx.videoWidth;
        }
        return 0;
      }
    }, {
      key: 'videoHeight',
      get: function get() {
        if (this.vCtx && this.vCtx.videoHeight) {
          return this.vCtx.videoHeight;
        }
        return 0;
      }
    }, {
      key: 'src',
      get: function get() {
        return this.getAttribute('src');
      },
      set: function set(val) {
        this.setAttribute('src', val);
      }
    }, {
      key: 'readyState',
      get: function get() {
        return this.videoMetaInited ? this.vCtx.readyState : 0;
      }
    }, {
      key: 'seeking',
      get: function get() {
        return this.videoMetaInited ? this.vCtx.seeking : false;
      }
    }, {
      key: 'currentTime',
      get: function get() {
        return this.videoMetaInited ? this.vCtx.currentTime / 1000 : 0;
      }
    }, {
      key: 'duration',
      get: function get() {
        return this.audioMetaInited ? this.aCtx.duration : 0;
      }
    }, {
      key: 'paused',
      get: function get() {
        return this._paused;
      }
    }, {
      key: 'playbackRate',
      get: function get() {
        if (this.hasAttribute('playbackRate')) {
          return this.getAttribute('playbackRate');
        } else {
          return 1.0;
        }
      },
      set: function set(val) {
        this.setAttribute('playbackrate', val);
        this.aCtx.playbackRate = val;
        this.vCtx.playbackRate = val;

        this.dispatchEvent(new Event('ratechange'));
      }
    }, {
      key: 'ended',
      get: function get() {
        if (this.audioMetaInited) {
          return this.aCtx.ended;
        }
        return false;
      }
    }, {
      key: 'autoplay',
      get: function get() {
        if (this.hasAttribute('autoplay')) {
          return this.getAttribute('autoplay');
        } else {
          return false;
        }
      },
      set: function set(value) {
        this.setAttribute('autoplay', value);
      }
    }, {
      key: 'volume',
      get: function get() {
        return this.aCtx.volume;
      },
      set: function set(vol) {
        this.setAttribute('volume', vol);
        this.aCtx.volume = vol;
      }
    }, {
      key: 'muted',
      get: function get() {
        var attrMuted = this.getAttribute('muted') === 'true';
        if (attrMuted !== undefined) {
          return attrMuted;
        } else if (this.getAttribute('volume')) {
          return Number.parseInt(this.getAttribute('volume')) === 0;
        } else {
          return false;
        }
      },
      set: function set(val) {
        this.setAttribute('muted', val);
        if (!val) {
          this.aCtx.muted = false;
        } else {
          this.aCtx.muted = true;
        }
      }
    }, {
      key: 'error',
      get: function get() {
        return this.vCtx.error || this.aCtx.error;
      }
    }, {
      key: 'buffered',
      get: function get() {
        return this.vCtx.buffered;
      }
    }]);

    return MobileVideo;
  }(HTMLElement);
  // eslint-disable-next-line no-undef


  customElements.define('mobile-video', MobileVideo);

})));
//# sourceMappingURL=index.js.map
