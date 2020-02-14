'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var util = {};

util.createDom = function () {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var tpl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var cname = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  var dom = document.createElement(el);
  dom.className = cname;
  dom.innerHTML = tpl;
  Object.keys(attrs).forEach(function (item) {
    var key = item;
    var value = attrs[item];
    if (el === 'video' || el === 'audio' || el === 'mobile-video') {
      if (value) {
        dom.setAttribute(key, value);
      }
    } else {
      dom.setAttribute(key, value);
    }
  });
  return dom;
};

util.hasClass = function (el, className) {
  if (!el) {
    return false;
  }

  if (el.classList) {
    return Array.prototype.some.call(el.classList, function (item) {
      return item === className;
    });
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
};

util.addClass = function (el, className) {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(function (item) {
      item && el.classList.add(item);
    });
  } else if (!util.hasClass(el, className)) {
    el.className += ' ' + className;
  }
};

util.removeClass = function (el, className) {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.split(/\s+/g).forEach(function (item) {
      el.classList.remove(item);
    });
  } else if (util.hasClass(el, className)) {
    className.split(/\s+/g).forEach(function (item) {
      var reg = new RegExp('(\\s|^)' + item + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    });
  }
};

util.toggleClass = function (el, className) {
  if (!el) {
    return;
  }

  className.split(/\s+/g).forEach(function (item) {
    if (util.hasClass(el, item)) {
      util.removeClass(el, item);
    } else {
      util.addClass(el, item);
    }
  });
};

util.findDom = function () {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var sel = arguments[1];

  var dom = void 0;
  // fix querySelector IDs that start with a digit
  // https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
  try {
    dom = el.querySelector(sel);
  } catch (e) {
    if (sel.indexOf('#') === 0) {
      dom = el.getElementById(sel.slice(1));
    }
  }
  return dom;
};

util.padStart = function (str, length, pad) {
  var charstr = String(pad);
  var len = length >> 0;
  var maxlen = Math.ceil(len / charstr.length);
  var chars = [];
  var r = String(str);
  while (maxlen--) {
    chars.push(charstr);
  }
  return chars.join('').substring(0, len - r.length) + r;
};

util.format = function (time) {
  if (window.isNaN(time)) {
    return '';
  }
  var hour = util.padStart(Math.floor(time / 3600), 2, 0);
  var minute = util.padStart(Math.floor((time - hour * 3600) / 60), 2, 0);
  var second = util.padStart(Math.floor(time - hour * 3600 - minute * 60), 2, 0);
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':');
};

util.event = function (e) {
  if (e.touches) {
    var touch = e.touches[0] || e.changedTouches[0];
    e.clientX = touch.clientX || 0;
    e.clientY = touch.clientY || 0;
    e.offsetX = touch.pageX - touch.target.offsetLeft;
    e.offsetY = touch.pageY - touch.target.offsetTop;
  }
  e._target = e.target || e.srcElement;
};

util.typeOf = function (obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0];
};

util.deepCopy = function (dst, src) {
  if (util.typeOf(src) === 'Object' && util.typeOf(dst) === 'Object') {
    Object.keys(src).forEach(function (key) {
      // eslint-disable-next-line no-undef
      if (util.typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (dst[key] === undefined) {
          dst[key] = src[key];
        } else {
          util.deepCopy(dst[key], src[key]);
        }
      } else if (util.typeOf(src[key]) === 'Array') {
        dst[key] = util.typeOf(dst[key]) === 'Array' ? dst[key].concat(src[key]) : src[key];
      } else {
        dst[key] = src[key];
      }
    });
    return dst;
  }
};
util.getBgImage = function (el) {
  // fix: return current page url when url is none
  var url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage;
  if (!url || url === 'none') {
    return '';
  }
  var a = document.createElement('a');
  a.href = url.replace(/url\("|"\)/g, '');
  return a.href;
};

util.copyDom = function (dom) {
  if (dom && dom.nodeType === 1) {
    var back = document.createElement(dom.tagName);
    Array.prototype.forEach.call(dom.attributes, function (node) {
      back.setAttribute(node.name, node.value);
    });
    if (dom.innerHTML) {
      back.innerHTML = dom.innerHTML;
    }
    return back;
  } else {
    return '';
  }
};

util.setInterval = function (context, eventName, intervalFunc, frequency) {
  if (!context._interval[eventName]) {
    context._interval[eventName] = setInterval(intervalFunc.bind(context), frequency);
  }
};

util.clearInterval = function (context, eventName) {
  clearInterval(context._interval[eventName]);
  context._interval[eventName] = null;
};

util.createImgBtn = function (name, imgUrl, width, height) {
  var btn = util.createDom('xg-' + name, '', {}, 'xgplayer-' + name + '-img');
  btn.style.backgroundImage = 'url("' + imgUrl + '")';
  if (width && height) {
    var w = void 0,
        h = void 0,
        unit = void 0;
    ['px', 'rem', 'em', 'pt', 'dp', 'vw', 'vh', 'vm', '%'].every(function (item) {
      if (width.indexOf(item) > -1 && height.indexOf(item) > -1) {
        w = parseFloat(width.slice(0, width.indexOf(item)).trim());
        h = parseFloat(height.slice(0, height.indexOf(item)).trim());
        unit = item;
        return false;
      } else {
        return true;
      }
    });
    btn.style.width = '' + w + unit;
    btn.style.height = '' + h + unit;
    btn.style.backgroundSize = '' + w + unit + ' ' + h + unit;
    if (name === 'start') {
      btn.style.margin = '-' + h / 2 + unit + ' auto auto -' + w / 2 + unit;
    } else {
      btn.style.margin = 'auto 5px auto 5px';
    }
  }
  return btn;
};

util.Hex2RGBA = function (hex, alpha) {
  var rgb = []; // 定义rgb数组
  // eslint-disable-next-line no-useless-escape
  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
    var sixHex = '#';
    hex.replace(/[0-9A-F]/ig, function (kw) {
      sixHex += kw + kw;
    });
    hex = sixHex;
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    hex.replace(/[0-9A-F]{2}/ig, function (kw) {
      // eslint-disable-next-line no-eval
      rgb.push(eval('0x' + kw));
    });
    return 'rgba(' + rgb.join(',') + ', ' + alpha + ')';
  } else {
    return 'rgba(255, 255, 255, 0.1)';
  }
};

util.getFullScreenEl = function () {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
};

util.checkIsFunction = function (fun) {
  return typeof fun === 'function';
};

util.checkIsObject = function (obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};
exports.default = util;