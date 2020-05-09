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

  var DEFAULT_FPS = 30;

  function validateFPS(fps) {
    if (fps < 20 || fps > 80) {
      return false;
    }
    return true;
  }

  var Ticker = function () {
    function Ticker(options) {
      _classCallCheck(this, Ticker);

      this.options = Object.assign({}, options || {});
      if (!this.options.interval || !validateFPS(1000 / this.options.interval)) {
        this.options.interval = 1000 / 30;
      }
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
        if (!validateFPS(1000 / interval)) {
          interval = 1000 / 30;
        }
        this.options.interval = interval;
        return this;
      }
    }]);

    return Ticker;
  }();
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
        var _get3;

        for (var _len3 = arguments.length, callbacks = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          callbacks[_key3] = arguments[_key3];
        }

        (_get3 = _get(TimeoutTicker.prototype.__proto__ || Object.getPrototypeOf(TimeoutTicker.prototype), "start", this)).call.apply(_get3, [this].concat(callbacks));
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
        var _this3 = this;

        this.timeoutId = window.setTimeout(function () {
          _this3.stop();
          _this3.tick();
        }, this.options.interval);
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.timeoutId) {
          window.clearTimeout(this.timeoutId);
        }
      }
    }]);

    return TimeoutTicker;
  }(Ticker);

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
  function shimWorker(filename, fn) {
      return function ShimWorker(forceFallback) {
          var o = this;

          if (!fn) {
              return new Worker(filename);
          } else if (Worker && !forceFallback) {
              // Convert the function's inner code to a string to construct the worker
              var source = `${fn}`.replace(/^function.+?{/, '').slice(0, -1),
                  objURL = createSourceObject(source);

              this[TARGET] = new Worker(objURL);
              URL.revokeObjectURL(objURL);
              return this[TARGET];
          } else {
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
      } catch (e) {
          Worker = null;
      } finally {
          URL.revokeObjectURL(objURL);
          if (testWorker) {
              testWorker.terminate();
          }
      }
  }

  function createSourceObject(str) {
      try {
          return URL.createObjectURL(new Blob([str], { type: SCRIPT_TYPE }));
      } catch (e) {
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
      self.postMessage({
        msg: 'LOG',
        log: 'init decoder'
      });
      Module._broadwayInit();
      this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
    };

    Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid) {
      var info = Object.assign({}, this.infolist[infoid]);
      var yRowcount = height;
      var uvRowcount = height / 2;
      if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
        uvRowcount = height;
      }
      var data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
      this.infolist[infoid] = null;
      var datetemp = new Uint8Array(data.length);
      datetemp.set(data);
      var buffer = datetemp.buffer;
      if (info) {
        self.postMessage({
          msg: 'LOG',
          log: 'sample ' + info.dts + ' decoded startAt' + info.decodeTime + ' cost: ' + (Date.now() - info.decodeTime)
        });
      }

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
      self.postMessage({
        msg: 'LOG',
        log: 'decoder inited'
      });
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

    Decoder.prototype.updateMeta = function (meta) {
      this.meta = meta;
    };

    var decoder;

    function onPostRun() {
      self.postMessage({
        msg: 'LOG',
        log: 'decoder script ' + Decoder
      });
      decoder = new Decoder(this);
      decoder.init();
    }

    function init(meta) {
      if (!decoder) {
        self.postMessage({
          msg: 'LOG',
          log: 'decoder script import' + self.importScripts
        });
        self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder_1583333072684.js');
      }
      addOnPostRun(onPostRun.bind(self));
    }

    self.onmessage = function (e) {
      var data = e.data;
      if (!data.msg) {
        self.postMessage({
          msg: 'ERROR:invalid message'
        });
      } else {
        switch (data.msg) {
          case 'init':
            self.meta = data.meta;
            self.postMessage({
              msg: 'LOG',
              log: 'worker inited'
            });
            init();
            break;
          case 'updatemeta':
            self.meta = data.meta;
            decoder.updateMeta(data.meta);
            break;
          case 'decode':
            decoder.decode(data.data, data.info);
            break;
          case 'destory':
            decoder.destroy();
            break;
        }
      }
    };
  });

  var BackupVideoWorker = new shimWorker("./backupWorker.js", function (window, document) {
    var self = this;
    var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
    var Decoder = function Decoder(self) {
      this.inited = false;
      this.self = self;
      this.meta = this.self.meta;
      this.infolist = [];
      self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
      self.par_broadwayOnHeadersDecoded = function () {};
    };

    Decoder.prototype.toU8Array = function (ptr, length) {
      return this.self.HEAPU8.subarray(ptr, ptr + length);
    };

    Decoder.prototype.init = function () {
      self.postMessage({
        msg: 'LOG',
        log: 'init decoder'
      });
      Module._broadwayInit();
      this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
      this.broadwayOnBroadwayInited();
    };

    Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height) {
      var info = this.infolist.shift();
      var yRowcount = height;
      var uvRowcount = height / 2;
      var yLinesize = width;
      var uvLinesize = width / 2;
      if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
        uvRowcount = height;
      }
      var data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
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
      self.postMessage({
        msg: 'LOG',
        log: 'decoder inited'
      });
      this.self.postMessage({ msg: 'DECODER_READY' });
    };

    Decoder.prototype.decode = function (data, info) {
      this.infolist.push(info);
      this.streamBuffer.set(data);
      Module._broadwayPlayStream(data.length);
    };

    Decoder.prototype.destroy = function () {
      Module._broadwayExit();
    };

    Decoder.prototype.updateMeta = function (meta) {
      this.meta = meta;
    };

    var decoder;

    function onPostRun() {
      decoder = new Decoder(this);
      decoder.init();
    }

    function init(meta) {
      if (!decoder) {
        self.postMessage({
          msg: 'LOG',
          log: 'decoder script import' + self.importScripts
        });
        self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/media-site/decoder3.js');
        addOnPostRun(onPostRun.bind(self));
      }
    }

    self.onmessage = function (e) {
      var data = e.data;
      if (!data.msg) {
        self.postMessage({
          msg: 'ERROR:invalid message'
        });
      } else {
        switch (data.msg) {
          case 'init':
            self.meta = data.meta;
            self.postMessage({
              msg: 'LOG',
              log: 'worker inited'
            });
            init();
            break;
          case 'updatemeta':
            self.meta = data.meta;
            decoder.updateMeta(data.meta);
            break;
          case 'decode':
            decoder.decode(data.data, data.info);
            break;
          case 'destory':
            decoder.destroy();
            break;
        }
      }
    };
  });

  var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var YUVCanvas = function () {
    function YUVCanvas(configs) {
      _classCallCheck$1(this, YUVCanvas);

      this.configs = Object.assign({}, configs);
      this.canvas = this.configs.canvas;
      this.meta = Object.assign({}, this.configs.meta);
      this._initMeta();
      // this.canvas.style.width = configs.style.width;
      // this.canvas.style.height = configs.style.height;
      this._initContextGL();
      if (this.contextGL) {
        this._initProgram();
        this._initBuffers();
        this._initTextures();
      }  }

    _createClass$1(YUVCanvas, [{
      key: '_initMeta',
      value: function _initMeta() {
        this.chroma = this.meta.chromaFormat;
        this.height = this.meta.presentHeight;
        this.width = this.meta.presentWidth;
        this.canvas.width = this.meta.presentWidth;
        this.canvas.height = this.meta.presentHeight;
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
            if (this.contextOptions) {
              gl = canvas.getContext(contextName, this.contextOptions);
            } else {
              gl = canvas.getContext(contextName);
            };
          } catch (e) {
            gl = null;
          }

          if (!gl || typeof gl.getParameter !== 'function') {
            gl = null;
          }

          ++nameIndex;
        }
        this.contextGL = gl;
      }
    }, {
      key: '_initProgram',
      value: function _initProgram() {
        var gl = this.contextGL;

        // vertex shader is the same for all types
        var vertexShaderScript;
        var fragmentShaderScript;
        vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'attribute vec4 uTexturePos;', 'attribute vec4 vTexturePos;', 'varying vec2 textureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos.xy;', '  uTextureCoord = uTexturePos.xy;', '  vTextureCoord = vTexturePos.xy;', '}'].join('\n');

        fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float y = texture2D(ySampler,  textureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;', '}'].join('\n');

        var YUV2RGB = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderScript);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
          console.log('Vertex shader failed to compile: ' + gl.getShaderInfoLog(vertexShader));
        }

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderScript);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
          console.log('Fragment shader failed to compile: ' + gl.getShaderInfoLog(fragmentShader));
        }

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.log('Program failed to compile: ' + gl.getProgramInfoLog(program));
        }

        gl.useProgram(program);

        var YUV2RGBRef = gl.getUniformLocation(program, 'YUV2RGB');
        gl.uniformMatrix4fv(YUV2RGBRef, false, YUV2RGB);

        this.shaderProgram = program;
      }
    }, {
      key: '_initBuffers',
      value: function _initBuffers() {
        var gl = this.contextGL;
        var program = this.shaderProgram;

        var vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);

        var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
        gl.enableVertexAttribArray(vertexPosRef);
        gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);

        var texturePosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

        var texturePosRef = gl.getAttribLocation(program, 'texturePos');
        gl.enableVertexAttribArray(texturePosRef);
        gl.vertexAttribPointer(texturePosRef, 2, gl.FLOAT, false, 0, 0);

        this.texturePosBuffer = texturePosBuffer;

        var uTexturePosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

        var uTexturePosRef = gl.getAttribLocation(program, 'uTexturePos');
        gl.enableVertexAttribArray(uTexturePosRef);
        gl.vertexAttribPointer(uTexturePosRef, 2, gl.FLOAT, false, 0, 0);

        this.uTexturePosBuffer = uTexturePosBuffer;

        var vTexturePosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

        var vTexturePosRef = gl.getAttribLocation(program, 'vTexturePos');
        gl.enableVertexAttribArray(vTexturePosRef);
        gl.vertexAttribPointer(vTexturePosRef, 2, gl.FLOAT, false, 0, 0);

        this.vTexturePosBuffer = vTexturePosBuffer;
      }
    }, {
      key: '_initTextures',
      value: function _initTextures() {
        var gl = this.contextGL;
        var program = this.shaderProgram;
        var yTextureRef = this._initTexture();
        var ySamplerRef = gl.getUniformLocation(program, 'ySampler');
        gl.uniform1i(ySamplerRef, 0);
        this.yTextureRef = yTextureRef;

        var uTextureRef = this._initTexture();
        var uSamplerRef = gl.getUniformLocation(program, 'uSampler');
        gl.uniform1i(uSamplerRef, 1);
        this.uTextureRef = uTextureRef;

        var vTextureRef = this._initTexture();
        var vSamplerRef = gl.getUniformLocation(program, 'vSampler');
        gl.uniform1i(vSamplerRef, 2);
        this.vTextureRef = vTextureRef;
      }
    }, {
      key: '_initTexture',
      value: function _initTexture() {
        var gl = this.contextGL;

        var textureRef = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);

        return textureRef;
      }
    }, {
      key: '_drawPictureGL',
      value: function _drawPictureGL(data, width, height, yLinesize, uvLinesize) {
        var ylen = yLinesize * height;
        var uvlen = uvLinesize * height / 2;
        if (this.chroma === 444 || this.chroma === 422) {
          uvlen *= 2;
        }
        data = new Uint8Array(data);
        var renderData = {
          yData: data.subarray(0, ylen),
          uData: data.subarray(ylen, ylen + uvlen),
          vData: data.subarray(ylen + uvlen, ylen + uvlen + uvlen)
        };
        this._drawPictureGL420(renderData, width, height, yLinesize, uvLinesize);
      }
    }, {
      key: '_drawPictureGL420',
      value: function _drawPictureGL420(data, width, height, yLinesize, uvLinesize) {
        var gl = this.contextGL;
        var texturePosBuffer = this.texturePosBuffer;
        var uTexturePosBuffer = this.uTexturePosBuffer;
        var vTexturePosBuffer = this.vTexturePosBuffer;

        var yTextureRef = this.yTextureRef;
        var uTextureRef = this.uTextureRef;
        var vTextureRef = this.vTextureRef;

        var yData = data.yData;
        var uData = data.uData;
        var vData = data.vData;

        var yDataPerRow = yLinesize;
        var yRowCnt = height;

        var uDataPerRow = uvLinesize;
        var uRowCnt = height / 2;

        if (this.chroma === 422 || this.chroma === 444) {
          uRowCnt = height;
        }

        var vDataPerRow = uvLinesize;
        var vRowCnt = uRowCnt;

        var ratiow = this.canvas.width / this.width;
        var ratioh = this.canvas.height / this.height;
        var left = 0;
        var top = 0;
        var w = this.canvas.width;
        var h = this.canvas.height;
        if (ratiow < ratioh) {
          h = this.height * this.canvas.width / this.width;
          top = parseInt((this.canvas.height - this.height * this.canvas.width / this.width) / 2);
        } else {
          w = this.width * this.canvas.height / this.height;
          left = parseInt((this.canvas.width - this.width * this.canvas.height / this.height) / 2);
        }
        gl.viewport(left, top, w, h);

        var texturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);

        var uTexturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uTexturePosValues, gl.DYNAMIC_DRAW);

        var vTexturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vTexturePosValues, gl.DYNAMIC_DRAW);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, yDataPerRow, yRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, yData);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, uDataPerRow, uRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uData);

        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, vDataPerRow, vRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vData);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }, {
      key: '_drawPictureRGB',
      value: function _drawPictureRGB(data) {}
    }, {
      key: 'render',
      value: function render(data, width, height, yLinesize, uvLinesize) {
        var gl = this.contextGL;
        // console.log(data, width, height, yLinesize, uvLinesize)
        if (gl) {
          this._drawPictureGL(data, width, height, yLinesize, uvLinesize);
        } else {
          this._drawPictureRGB(data);
        }
      }
    }, {
      key: 'resetMeta',
      value: function resetMeta(meta) {
        this.meta = Object.assign({}, meta);
        this._initMeta();
      }
    }]);

    return YUVCanvas;
  }();

  var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var SourceBuffer = function () {
    function SourceBuffer(config) {
      _classCallCheck$2(this, SourceBuffer);

      this.config = Object.assign({}, config);
      this.type = this.config.type;
      this.reset();
    }

    _createClass$2(SourceBuffer, [{
      key: "reset",
      value: function reset() {
        this.buffer = [];
        this.currentGop = undefined;
        this._lastGet = undefined;
      }
    }, {
      key: "push",
      value: function push(frame) {
        // if (this.type === 'video') {
        //   if (frame.isKeyframe) {
        //     let currentGop = {
        //       samples: [],
        //       start: frame.dts,
        //       end: frame.dts,
        //       nextGop: undefined
        //     };
        //     if (this.currentGop) {
        //       this.currentGop.nextGop = currentGop;
        //     }
        //     this.currentGop = currentGop;
        //     this.buffer.push(this.currentGop);
        //   }
        //
        //   if (this.currentGop) {
        //     this.currentGop.samples.push(frame);
        //
        //     if (frame.dts < this.currentGop.start) {
        //       this.currentGop.start = frame.dts;
        //     }
        //
        //     if (frame.dts > this.currentGop.end) {
        //       this.currentGop.end = frame.dts;
        //     }
        //   }
        // }
        this.buffer.push(frame);
      }
    }, {
      key: "get",
      value: function get(time) {
        return this.buffer.shift();
      }
    }, {
      key: "_getNext",
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
      key: "remove",
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

  var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var TimeRanges = function () {
    function TimeRanges(ranges) {
      _classCallCheck$3(this, TimeRanges);

      this.ranges = ranges || [];
    }

    _createClass$3(TimeRanges, [{
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
      if (domain.active ) ;
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

  var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var HAVE_NOTHING = 0;
  var HAVE_METADATA = 1;
  var HAVE_CURRENT_DATA = 2;
  var HAVE_FUTURE_DATA = 3;
  var HAVE_ENOUGH_DATA = 4;

  var NOT_SEEK = 1;
  var SEEKING = 2;
  var SEEKED = 4;

  var VIDEO_CANVAS_EVENTS = {
    VIDEO_EVENTS: 'VIDEO_EVENTS'
  };

  var VideoCanvas = function (_EventEmitter) {
    _inherits$1(VideoCanvas, _EventEmitter);

    function VideoCanvas(config) {
      _classCallCheck$4(this, VideoCanvas);

      var _this = _possibleConstructorReturn$1(this, (VideoCanvas.__proto__ || Object.getPrototypeOf(VideoCanvas)).call(this));

      _this.config = Object.assign({}, config);
      _this.canvas = _this.config.canvas ? _this.config.canvas : document.createElement('canvas');
      _this.source = new SourceBuffer({ type: 'video' });
      _this.onFirstFrame = undefined;
      _this.oncanplay = undefined;
      _this.initParameters();
      _this.canvas.style.maxWidth = '100%';
      _this.canvas.style.maxHeight = '100%';
      _this.canvas.style.top = 0;
      _this.canvas.style.bottom = 0;
      _this.canvas.style.left = 0;
      _this.canvas.style.right = 0;
      _this.canvas.style.margin = 'auto';
      _this.canvas.style.position = 'absolute';
      _this.handleMessage = _this.handleMessage.bind(_this);
      _this.useBackupTimer = null;
      return _this;
    }

    _createClass$4(VideoCanvas, [{
      key: 'initParameters',
      value: function initParameters() {
        this.meta = undefined;
        this.readyStatus = HAVE_NOTHING;
        this.paused = true;
        this.currentTime = 0;
        this._seekState = NOT_SEEK;
        this._avccpushed = false;
        this._decodedFrames = {};
        this._lastSampleDts = undefined;
        this._baseDts = undefined;
        this._lastRenderTime = null;
        this.playFinish = null;
        this._seekState = NOT_SEEK;
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.initParameters();
        this.source.reset();
      }
    }, {
      key: 'pause',
      value: function pause() {
        this.paused = true;
      }
    }, {
      key: 'initWasmWorker',
      value: function initWasmWorker() {
        // eslint-disable-next-line no-undef
        this.wasmworker = new VideoWorker();
        // this.wasmworker = new Worker('./worker.js');
        this.wasmworker.onmessage = this.handleMessage;
        this.wasmworker.onerror = function (event) {
          this.emit('error', new Error('wasm worker init failed'));
          throw new Error(event.message + ' (' + event.filename + ':' + event.lineno + ')');
        };
        this.wasmworker.postMessage({
          msg: 'init',
          meta: this.meta
        });
        this.setBackUpWorker();
      }
    }, {
      key: 'setBackUpWorker',
      value: function setBackUpWorker() {
        var _this2 = this;

        if (this.useBackupTimer) {
          return;
        }
        this.useBackupTimer = setTimeout(function () {
          window.clearTimeout(_this2.useBackupTimer);
          _this2.useBackupTimer = null;
          if (_this2._decoderInited) {
            return;
          } else if (_this2.meta.profile !== 'Baseline') {
            _this2.emit('error', new Error('wasm worker init timeout'));
            return;
          }

          _this2.destroyWorker();
          _this2.wasmworker = new BackupVideoWorker();
          _this2.wasmworker.onmessage = _this2.handleMessage;
          _this2.wasmworker.onerror = function (event) {
            this.emit('error', new Error('wasm worker init failed'));
            throw new Error(event.message + ' (' + event.filename + ':' + event.lineno + ')');
          };
          _this2.wasmworker.postMessage({
            msg: 'init',
            meta: _this2.meta
          });
        }, 10000);
      }
    }, {
      key: 'setVideoMetaData',
      value: function setVideoMetaData(meta) {
        this.meta = meta;
        if (!this._decoderInited) {
          this.initWasmWorker();
          return;
        }
        this.wasmworker.postMessage({
          msg: 'updatemeta',
          meta: this.meta
        });
        this.pushAvcc(meta);
      }
    }, {
      key: 'pushAvcc',
      value: function pushAvcc(meta) {
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
          var config = Object.assign({ meta: meta, canvas: this.canvas }, this.config);
          this.yuvCanvas = new YUVCanvas(config);
        } else {
          this.yuvCanvas.resetMeta(meta);
        }
        this.readyStatus = HAVE_METADATA;
      }
    }, {
      key: 'decodeVideo',
      value: function decodeVideo(videoTrack) {
        if (!this._decoderInited) {
          return;
        }
        if (!this._avccpushed) {
          this.pushAvcc(this.meta);
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

        this.preload();
      }
    }, {
      key: 'preload',
      value: function preload() {
        if (!this._lastSampleDts || this._lastSampleDts - this._baseDts < this.currentTime + this.config.preloadTime * 1000) {
          var sample = this.source.get();
          if (sample) {
            this._lastSampleDts = sample.dts;
            this._analyseNal(sample);
          }

          while (sample && this._lastSampleDts - this._baseDts < this.currentTime + this.config.preloadTime * 2000) {
            sample = this.source.get();
            // console.log(sample)
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
        // console.log('送入解码', sample.dts,data)
        this.wasmworker.postMessage({
          msg: 'decode',
          data: sample.data,
          info: {
            decodeTime: Date.now(),
            dts: sample.dts,
            pts: sample.pts ? sample.pts : sample.dts + sample.cts,
            key: sample.isKeyframe
          }
        });
      }
    }, {
      key: 'decodeVideoBuffer',
      value: function decodeVideoBuffer(buffer) {
        if (!this._decoderInited) {
          this.initWasmWorker();
          return;
        }
        this.wasmworker.postMessage({
          msg: 'decode',
          data: buffer
        });
      }
    }, {
      key: '_onDecoded',
      value: function _onDecoded(data) {
        if (!data.info) {
          return;
        }
        var dts = data.info.dts;

        this._decodedFrames[dts] = data;
        var decodedFrameLen = Object.keys(this._decodedFrames).length;
        if (this.readyStatus == HAVE_METADATA && decodedFrameLen > 0) {
          this.readyStatus = HAVE_CURRENT_DATA;
          this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'loadeddata');
        }
        if (this._seekState == SEEKED) {
          this.readyStatus = HAVE_CURRENT_DATA;
          this._seekState = NOT_SEEK;
        }
        if (decodedFrameLen > 10) {
          if (this.playFinish) {
            this.playFinish();
          }
          if (this.readyStatus == HAVE_CURRENT_DATA) {
            this.readyStatus = HAVE_FUTURE_DATA;
            this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'canplay');
          }
          if (this.oncanplay) {
            this.oncanplay();
          }
          // 2s的时间
          if (this.readyStatus == HAVE_FUTURE_DATA && decodedFrameLen > 2 * (this.meta.frameRate.fps || 60)) {
            this.readyStatus = HAVE_ENOUGH_DATA;
            this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'canplaythrough');
          }
        } else {
          this.readyStatus = HAVE_CURRENT_DATA;
        }
      }
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        this.paused = false;
        if (!this.paused) {
          return Promise.resolve();
        }
        return new Promise(function (resolve) {
          _this3.playFinish = resolve;
        }).then(function () {
          _this3.playFinish = null;
        });
      }
    }, {
      key: '_onTimer',
      value: function _onTimer(currentTime) {
        var _this4 = this;

        // console.log(currentTime)
        if (this.paused) {
          return false;
        }

        if (this.meta) {
          var frameTimes = Object.keys(this._decodedFrames);
          // console.log(frameTimes)
          if (frameTimes.length > 0) {
            this.currentTime = currentTime;
            var frameTime = -1;
            for (var i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) - this._baseDts <= this.currentTime; i++) {
              frameTime = Number.parseInt(frameTimes[Math.max(i - 1, 0)]);
            }
            var frame = this._decodedFrames[frameTime];
            // console.log('source', this.source)
            // console.log('frametime,', frameTime)
            if (frame) {
              // console.log('render frame ', frameTime, Date.now())
              // let buf = []
              // if (this.meta.chromaFormat === 420) {
              //
              //   let buf0 = frame.buffer.slice(0, frame.yLinesize * frame.height);
              //   let buf1 = frame.buffer.slice(frame.yLinesize * frame.height, frame.yLinesize * frame.height * 1.25);
              //   let buf2 = frame.buffer.slice(frame.yLinesize * frame.height * 1.25, frame.yLinesize * frame.height * 1.5);
              //   buf = [new Uint8Array(buf0), new Uint8Array(buf1), new Uint8Array(buf2)];
              // }
              if (this._seekState == SEEKING) {
                this._seekState = SEEKED;
                this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'seeked');
              }
              frameTimes.forEach(function (time) {
                if (Number.parseInt(time) <= frameTime) {
                  delete _this4._decodedFrames[time];
                }
              });
              this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);

              return true;
            } else {
              if (frameTimes.length && Number(frameTimes[0]) > currentTime) {
                return true;
              }
              return false;
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
        var frameTimes = Object.keys(this._decodedFrames);

        for (var i = 0; i < frameTimes.length; i++) {
          if (Number.parseInt(frameTimes[i]) < this.currentTime) {
            delete this._decodedFrames[frameTimes[i]];
          }
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.destroyWorker();
        this.canvas = null;
        this._decodedFrames = {};
        this.source = null;
        this._decoderInited = false;
        this._isSeeking = false;
      }
    }, {
      key: 'destroyWorker',
      value: function destroyWorker() {
        if (this.wasmworker) {
          this.wasmworker.removeEventListener('message', this.handleMessage);
          this.wasmworker.postMessage({ msg: 'destroy' });
        }
        this.wasmworker = null;
      }
    }, {
      key: 'handleMessage',
      value: function handleMessage(msg) {
        switch (msg.data.msg) {
          case 'DECODER_READY':
            // console.log('wasm worker ready')
            this._decoderInited = true;
            this.pushAvcc(this.meta);
            break;
          case 'DECODED':
            this._onDecoded(msg.data);
            break;
          case 'LOG':
            // console.log(msg.data.log);
            break;
          default:
            console.error('invalid messaeg', msg);
        }
      }
    }, {
      key: 'setVideoSeeking',
      value: function setVideoSeeking() {
        this._seekState = SEEKING;
        this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'seeking');
      }
    }, {
      key: 'buffered',
      get: function get() {
        var ranges = [];
        var currentRange = {
          start: null,
          end: null
        };
        var decodedTimes = Object.keys(this._decodedFrames);
        if (decodedTimes.length) {
          currentRange.start = Number.parseInt(decodedTimes[0]);
          currentRange.end = Number.parseInt(decodedTimes[decodedTimes.length - 1]);
        }

        if (currentRange.start !== null && currentRange.end !== null) {
          currentRange.start = (currentRange.start - this._baseDts) / 1000;
          currentRange.end = (currentRange.end - this._baseDts) / 1000;
          ranges.push(currentRange);
        }

        return new TimeRanges(ranges);
      }
    }, {
      key: 'videoWidth',
      get: function get() {
        return this.canvas.width;
      }
    }, {
      key: 'videoHeight',
      get: function get() {
        return this.canvas.height;
      }
    }, {
      key: 'seeking',
      get: function get() {
        return this._seekState == SEEKING;
      }
    }, {
      key: 'readyState',
      get: function get() {
        return this.readyStatus;
      }
    }]);

    return VideoCanvas;
  }(EventEmitter);

  var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var AudioCtx = function (_EventEmitter) {
    _inherits$2(AudioCtx, _EventEmitter);

    function AudioCtx(config) {
      _classCallCheck$5(this, AudioCtx);

      var _this2 = _possibleConstructorReturn$2(this, (AudioCtx.__proto__ || Object.getPrototypeOf(AudioCtx)).call(this));

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
      _this2._volume = Number.parseFloat(_this2.config.volume) === _this2.config.volume ? _this2.config.volume : 0.6;
      _this2.gainNode.gain.value = _this2._volume;
      // 记录外部传输的状态
      _this2._played = false;
      _this2.paused = true;
      _this2.loadFinish = null; // pending play task
      _this2.waitNextID = null; // audio source end and next source not loaded
      _this2.destroyed = false;
      return _this2;
    }

    _createClass$5(AudioCtx, [{
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
        this.preload();
      }
    }, {
      key: 'preload',
      value: function preload() {
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

            if (_this.loadFinish) {
              _this.loadFinish();
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

        if (this.destroyed) {
          return;
        }
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
        }, audioSource.buffer.duration * 1000 - 3);
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

        if (this.loadFinish) {
          return;
        }

        this._played = true;

        var _this = this;
        var playStart = function playStart() {
          var audioSource = _this4._currentBuffer.data;
          try {
            audioSource.start();
          } catch (e) {
            // NOTHING
          }
          audioSource.connect(_this4.gainNode);
          _this4.paused = false;
          if (_this4.context.state !== 'running' && _this4.playFailed) {
            _this4.context.resume().then(function () {
              if (_this4.context.state === 'running' && _this4.playFinish) {
                _this4.playFinish();
              }
            });
            setTimeout(function () {
              _this4.playFailed(new Error('audio context suspended'));
            });
          } else if (_this4.playFinish) {
            _this4.playFinish();
          }
          setTimeout(function () {
            _this.onSourceEnded.call(_this4);
          }, audioSource.buffer.duration * 1000 - 10);
        };

        if (!this._currentBuffer) {
          return new Promise(function (resolve, reject) {
            _this4.loadFinish = playStart;
            _this4.playFinish = resolve;
            _this4.playFailed = reject;
          }).then(function () {
            _this4.loadFinish = null;
            _this4.playFinish = null;
            _this4.playFailed = null;
            playStart();
          });
        } else {
          return new Promise(function (resolve, reject) {
            _this4.playFinish = resolve;
            _this4.playFailed = reject;
            playStart();
          });
        }
      }
    }, {
      key: 'pause',
      value: function pause() {
        var audioCtx = this.context;
        if (audioCtx.state === 'running') {
          audioCtx.suspend();
        }
        this._currentBuffer = undefined;
        this._nextBuffer = undefined;
        this._lastpts = undefined;
        // this.duration = 0;
        this.samples = [];
        this.paused = true;
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
        this._preDecode = [];
        this.paused = true;
        this.context.close();
        this.destroyed = true;
      }
    }, {
      key: 'mute',
      value: function mute() {
        this.gainNode.gain.value = 0;
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
        if (this.context.state === 'suspended' && !this.paused) {
          this.context.resume();
        }
      }
    }, {
      key: 'volume',
      get: function get() {
        if (this.context.state === 'suspended' || this.muted) {
          return 0;
        }
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

  var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /**
   * 音画同步调和器
   */
  var AVReconciler = function () {
    function AVReconciler(props) {
      _classCallCheck$6(this, AVReconciler);

      this.aCtx = props.aCtx;
      this.vCtx = props.vCtx;
      this.video = props.video;
      this.timeoutId = null;
      this.start = null;
    }

    _createClass$6(AVReconciler, [{
      key: "doReconcile",
      value: function doReconcile() {
        var _this = this;

        var vCurTime = this.vCtx.currentTime || 0;
        var aCurTime = void 0;
        if (this.video.noAudio) {
          aCurTime = vCurTime;
        } else {
          aCurTime = this.aCtx.currentTime * 1000 || 0;
        }

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
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
      }
    }]);

    return AVReconciler;
  }();

  var Worker$1 = new shimWorker("./tickworker.js", function (window, document) {
      var self = this;

      var interval;
      self.addEventListener('message', function (e) {
          var msg = e.data.msg;
          switch (msg) {
              case 'start':
                  clearInterval(interval);
                  interval = setInterval(function () {
                      self.postMessage('tick');
                  }, e.data.interval);
                  break;
              case 'stop':
                  clearInterval(interval);
                  break;
          }    }, false);
  });

  var _createClass$7 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _get$1 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var WorkerTicker = function (_Ticker) {
    _inherits$3(WorkerTicker, _Ticker);

    function WorkerTicker(config) {
      _classCallCheck$7(this, WorkerTicker);

      var _this = _possibleConstructorReturn$3(this, (WorkerTicker.__proto__ || Object.getPrototypeOf(WorkerTicker)).call(this, config));

      _this.timeoutId = null;
      _this.worker = new Worker$1();
      _this.handleMessage = _this.handleMessage.bind(_this);
      _this.worker.addEventListener('message', _this.handleMessage);
      return _this;
    }

    _createClass$7(WorkerTicker, [{
      key: 'handleMessage',
      value: function handleMessage() {
        this.onTick();
      }
    }, {
      key: 'start',
      value: function start() {
        var _get2;

        for (var _len = arguments.length, callbacks = Array(_len), _key = 0; _key < _len; _key++) {
          callbacks[_key] = arguments[_key];
        }

        (_get2 = _get$1(WorkerTicker.prototype.__proto__ || Object.getPrototypeOf(WorkerTicker.prototype), 'start', this)).call.apply(_get2, [this].concat(callbacks));
        this.onTick();
        this.worker.postMessage({
          msg: 'start',
          interval: this.options.interval
        });
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.worker.postMessage({
          msg: 'stop'
        });
        this.worker.removeEventListener('message', this.handleMessage);
        this.worker = null;
        this.handleMessage = function () {};
        this.callbacks = [];
      }
    }, {
      key: 'setInterval',
      value: function setInterval(interval) {
        _get$1(WorkerTicker.prototype.__proto__ || Object.getPrototypeOf(WorkerTicker.prototype), 'setInterval', this).call(this, interval);
        this.onTick();
        this.worker.postMessage({
          msg: 'start',
          interval: this.config.interval
        });
      }
    }]);

    return WorkerTicker;
  }(Ticker);

  var _createClass$8 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  // eslint-disable-next-line no-undef

  var MobileVideo = function (_HTMLElement) {
    _inherits$4(MobileVideo, _HTMLElement);

    function MobileVideo() {
      _classCallCheck$8(this, MobileVideo);

      var _this = _possibleConstructorReturn$4(this, (MobileVideo.__proto__ || Object.getPrototypeOf(MobileVideo)).call(this));

      _this._canvas = document.createElement('canvas');
      _this.handleAudioSourceEnd = _this.handleAudioSourceEnd.bind(_this);
      _this.played = false;
      _this.pendingPlayTask = null;
      _this._waiting = false;
      _this._paused = true;
      _this.videoMetaInited = false;
      _this.audioMetaInited = false;
      _this.handleVCtxInnerEvent = _this.handleVCtxInnerEvent.bind(_this);
      _this._err = null;
      _this._lastTimeupdateStamp = 0;
      _this._volumeEventStamp = 0;
      _this._hasDispatch = false;
      _this._fps = DEFAULT_FPS;
      return _this;
    }

    _createClass$8(MobileVideo, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        this._destroyed = false;
        if (this.vCtx) {
          this.vCtx.destroy();
        }
        this.vCtx = new VideoCanvas(Object.assign({
          canvas: this._canvas,
          preloadTime: this.preloadTime
        }, { style: { width: this.width, height: this.height } }));

        // this._innerDispatchEvent('waiting')
        this.vCtx.oncanplay = function () {
          if (!_this2.played) {
            if (!_this2.contains(_this2._canvas)) {
              _this2.appendChild(_this2._canvas);
              // if (this.autoplay) {
              //   this._innerDispatchEvent('play')
              // }
            }
          }
        };
        this.vCtx.on(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, this.handleVCtxInnerEvent);
      }
    }, {
      key: '_initAudio',
      value: function _initAudio() {
        var attrVolume = this.getAttribute('volume');
        var volume = this.muted ? 0 : Number.parseFloat(attrVolume);
        if (!this.noAudio) {
          this.aCtx = new AudioCtx({
            volume: volume
          });
        }
        this.ticker = new WorkerTicker({ interval: 1000 / this._fps });
        // this.ticker = new (getTicker({interval: 1000 / this._fps}))()
        this.reconciler = new AVReconciler({
          vCtx: this.vCtx,
          aCtx: this.aCtx,
          video: this
        });
        if (!this.noAudio) {
          this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
        }
      }
    }, {
      key: 'handleVCtxInnerEvent',
      value: function handleVCtxInnerEvent(eventName) {
        this._innerDispatchEvent(eventName);
      }
    }, {
      key: 'handleAudioSourceEnd',
      value: function handleAudioSourceEnd() {
        this.reconciler.doReconcile();
        this.vCtx.cleanBuffer();
        this.aCtx.preload();
        this.vCtx.preload();
      }
    }, {
      key: '_cleanBuffer',
      value: function _cleanBuffer() {
        this.vCtx.cleanBuffer();
      }
    }, {
      key: '_destroyAudio',
      value: function _destroyAudio() {
        this.audioMetaInited = false;
        if (!this.noAudio && this.aCtx) {
          this.aCtx.removeListener('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
          this.aCtx.destroy();
        }
        this.start = null;
        this.aCtx = null;
        this.ticker.stop();
        this.ticker = null;
        this.pendingPlayTask = null;
        this.played = false;
        this._hasDispatch = false;
      }
    }, {
      key: '_destroyVideo',
      value: function _destroyVideo() {
        this.videoMetaInited = false;
        this.vCtx.removeAllListeners();
        this.vCtx.destroy();
        this.vCtx = null;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        if (this._destroyed) {
          return;
        }

        this.reconciler.destroy();
        this._destroyed = true;
        this._destroyVideo();
        this._destroyAudio();
      }
    }, {
      key: 'onDemuxComplete',
      value: function onDemuxComplete(videoTrack, audioTrack) {
        if (!this.noAudio) {
          this.aCtx.decodeAudio(audioTrack);
        }
        this.vCtx.decodeVideo(videoTrack);
      }
    }, {
      key: 'decodeVideoBuffer',
      value: function decodeVideoBuffer(buffer) {
        this.vCtx.decodeVideoBuffer(buffer);
      }
    }, {
      key: 'setAudioMeta',
      value: function setAudioMeta(meta) {
        if (this.noAudio) {
          return;
        }
        this.aCtx.setAudioMetaData(meta);
        this.audioMetaInited = true;
      }
    }, {
      key: 'setVideoMeta',
      value: function setVideoMeta(meta) {
        this.vCtx.setVideoMetaData(meta);
        this.videoMetaInited = true;
      }
    }, {
      key: 'handleMediaInfo',
      value: function handleMediaInfo() {
        this._innerDispatchEvent('durationchange');
        this._innerDispatchEvent('loadedmetadata');
        this._innerDispatchEvent('seeking');
        this._innerDispatchEvent('seeked');
      }
    }, {
      key: 'handleEnded',
      value: function handleEnded() {
        this._innerDispatchEvent('ended');
      }
    }, {
      key: 'handleErr',
      value: function handleErr(code, message) {
        this._err = {};
        this._err.code = code;
        this._err.message = message;
        this._innerDispatchEvent('error');
      }
    }, {
      key: '_innerDispatchEvent',
      value: function _innerDispatchEvent(type) {
        this.dispatchEvent(new Event(type));
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        this.destroy();
      }
    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        // console.log('connected callback', this.noAudio)
        this._currentTime = 0;
        this.start = undefined;
        this.init();
        this._initAudio();
        this.vCtx.reset();
      }
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        if (this.pendingPlayTask) {
          return;
        }

        if (this.played) {
          this.connectedCallback();
        }

        if (!this.autoplay && !this._hasDispatch) {
          this._innerDispatchEvent('waiting');
          this._hasDispatch = true;
          this._waiting = true;
        }

        this._paused = false;
        this._innerDispatchEvent('play');
        var audioPlayTask = null;

        if (this.noAudio) {
          audioPlayTask = Promise.resolve();
        } else {
          audioPlayTask = this.aCtx.play();
        }
        this.pendingPlayTask = Promise.all([this.vCtx.play(), audioPlayTask.then(function () {
          if (_this3.aCtx) {
            _this3.aCtx.muted = true;
          }
        })]).then(function () {
          if (_this3.aCtx) {
            _this3.aCtx.muted = false;
          }
          _this3.ticker.start(function () {
            _this3.vCtx.preload();
            if (!_this3.start) {
              _this3.start = Date.now();
              _this3._lastTimeupdateStamp = _this3.start;
            }
            var prevTime = _this3._currentTime;

            _this3._currentTime = Date.now() - _this3.start;

            // console.log(this._currentTime, ' ', this.start)
            var rendered = _this3.vCtx._onTimer(_this3._currentTime);
            if (rendered) {
              if (_this3._waiting) {
                _this3._innerDispatchEvent('playing');
                _this3._waiting = false;
              }
              var now = Date.now();
              if (now - _this3._lastTimeupdateStamp >= 250) {
                // debounce
                _this3._lastTimeupdateStamp = now;
                _this3._innerDispatchEvent('timeupdate');
              }
            } else {
              _this3._currentTime = prevTime;
              _this3.start += Date.now() - _this3.start - prevTime;
              if (!_this3._waiting && !_this3.paused) {
                _this3._waiting = true;
                _this3._innerDispatchEvent('waiting');
              }
            }
          });
          _this3.pendingPlayTask = null;
          _this3.played = true;
          // this._innerDispatchEvent('playing')
        }).catch(function (e) {
          _this3.pendingPlayTask = null;
          _this3._paused = true;
          console.error(e);
          throw e;
        });
        return this.pendingPlayTask;
      }
    }, {
      key: 'pause',
      value: function pause() {
        var _this4 = this;

        this._paused = true;
        if (!this.noAudio) {
          this.aCtx.pause();
          this.aCtx.destroy();
        }

        this.vCtx.pause();

        this.ticker.stop();

        Promise.resolve().then(function () {
          _this4._innerDispatchEvent('pause');
        });
      }
    }, {
      key: 'load',
      value: function load() {
        // no-op for now
      }
    }, {
      key: 'onValueChange',
      value: function onValueChange() {
        var now = Date.now();
        if (now - this._volumeEventStamp < 200) {
          return;
        }
        this._volumeEventStamp = now;
        this._innerDispatchEvent('volumechange');
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
      },
      set: function set(val) {
        var nVal = Number.parseFloat(val);
        if (!isNaN(nVal)) {
          if (this.start && this.currentTime) {
            this.vCtx.setVideoSeeking();
            var gap = this.currentTime - nVal;
            this.start += gap * 1000;
          }
        }
        return nVal;
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
        if (!this.noAudio) {
          this.aCtx.playbackRate = val;
        }
        this.vCtx.playbackRate = val;

        this._innerDispatchEvent('ratechange');
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
          return this.getAttribute('autoplay') == 'true';
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
        if (this.noAudio) {
          return 0;
        }
        return this.aCtx ? this.aCtx.volume : 0;
      },
      set: function set(vol) {
        if (this.noAudio) {
          return;
        }
        this.setAttribute('volume', vol);
        this.aCtx.volume = vol;
        if (vol > 0 && this.muted) {
          this.aCtx.mute();
        }
        this.onValueChange();
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
        if (this.noAudio) {
          return;
        }
        this.setAttribute('muted', val);
        if (!val) {
          this.aCtx.muted = false;
        } else {
          this.aCtx.muted = true;
        }
        this.onValueChange();
      }
    }, {
      key: 'error',
      get: function get() {
        return this._err || this.vCtx.error || (this.noAudio ? null : this.aCtx.error);
      }
    }, {
      key: 'buffered',
      get: function get() {
        return this.vCtx.buffered;
      }
    }, {
      key: 'noAudio',
      get: function get() {
        return this.getAttribute('noaudio') === 'true';
      }
    }, {
      key: 'networkState',
      get: function get() {
        return 0;
      }
    }, {
      key: 'fps',
      get: function get() {
        return this._fps;
      },
      set: function set(val) {
        if (!validateFPS(val)) {
          val = DEFAULT_FPS;
        }
        this._fps = val;
        if (this.ticker) {
          this.ticker.setInterval(1000 / val);
        }
      }
    }, {
      key: 'preloadTime',
      get: function get() {
        var attrPreloadTime = this.getAttribute('preloadtime');
        if (attrPreloadTime) {
          var preloadTime = Number.parseFloat(attrPreloadTime);
          if (preloadTime > 0 && !Number.isNaN(preloadTime)) {
            return preloadTime;
          }
        }
        return Infinity;
      },
      set: function set(val) {
        if (val && Number(val) > 0) {
          this.setAttribute('preloadtime', val);
          this.vCtx.config.preloadTime = this.preloadTime;
        }
      }
    }]);

    return MobileVideo;
  }(HTMLElement);
  // eslint-disable-next-line no-undef


  customElements.define('mobile-video', MobileVideo);

})));
//# sourceMappingURL=index.js.map
