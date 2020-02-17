var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint-disable */
var _extends = Object.assign || function (e) {
  for (var r = 1; r < arguments.length; r++) {
    var n = arguments[r];for (var t in n) {
      if (Object.prototype.hasOwnProperty.call(n, t)) {
        e[t] = n[t];
      }
    }
  }return e;
};function _classCallCheck(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}var undef = undefined;var Env = function e() {
  var A = this;_classCallCheck(this, e);this.set = function (e, r) {
    var n = e;var t = r;if (t === null) {
      return false;
    }var i = "";if (n.indexOf(".") > -1) {
      var s = n.split(".");i = s[0];n = s[1];
    }if (n === "os_version") {
      t = "" + t;
    }if (i) {
      if (i === "user" || i === "header") {
        A.envInfo[i][n] = t;
      } else if (i === "headers") {
        A.envInfo.header.headers[n] = t;
      } else {
        A.envInfo.header.headers.custom[n] = t;
      }
    } else if (A.envInfo.user.hasOwnProperty(n)) {
      if (["user_type", "device_id", "ip_addr_id"].indexOf(n) > -1) {
        A.envInfo.user[n] = Number(t);
      } else if (["user_id", "web_id", "user_unique_id", "ssid"].indexOf(n) > -1) {
        A.envInfo.user[n] = String(t);
      } else if (["user_is_auth", "user_is_login"].indexOf(n) > -1) {
        A.envInfo.user[n] = Boolean(t);
      }
    } else if (A.envInfo.header.hasOwnProperty(n)) {
      A.envInfo.header[n] = t;
    } else if (A.envInfo.header.headers.hasOwnProperty(n)) {
      A.envInfo.header.headers[n] = t;
    } else {
      A.envInfo.header.headers.custom[n] = t;
    }
  };this.get = function () {
    var e = { user: {}, header: { headers: { custom: {} } } };var r = A.envInfo;var n = r.user;var t = Object.keys(n);for (var i = t, s = Array.isArray(i), o = 0, i = s ? i : i[Symbol.iterator]();;) {
      var a;if (s) {
        if (o >= i.length) break;a = i[o++];
      } else {
        o = i.next();if (o.done) break;a = o.value;
      }var u = a;if (n[u] !== undef) {
        e.user[u] = n[u];
      }
    }var f = r.header;var c = Object.keys(f);for (var d = c, l = Array.isArray(d), _ = 0, d = l ? d : d[Symbol.iterator]();;) {
      var v;if (l) {
        if (_ >= d.length) break;v = d[_++];
      } else {
        _ = d.next();if (_.done) break;v = _.value;
      }var h = v;if (f[h] !== undef && h !== "headers") {
        e.header[h] = f[h];
      }
    }var p = r.header.headers;var g = Object.keys(p);for (var b = g, y = Array.isArray(b), m = 0, b = y ? b : b[Symbol.iterator]();;) {
      var w;if (y) {
        if (m >= b.length) break;w = b[m++];
      } else {
        m = b.next();if (m.done) break;w = m.value;
      }var O = w;if (O !== "custom" && p[O] !== undef) {
        e.header.headers[O] = p[O];
      }
    }var k = r.header.headers.custom;var C = Object.keys(k);if (C.length) {
      for (var S = C, E = Array.isArray(S), R = 0, S = E ? S : S[Symbol.iterator]();;) {
        var x;if (E) {
          if (R >= S.length) break;x = S[R++];
        } else {
          R = S.next();if (R.done) break;x = R.value;
        }var z = x;e.header.headers.custom[z] = k[z];
      }
    }var T = { user: e.user, header: _extends({}, e.header, { headers: e.header.headers }) };return T;
  };this.envInfo = { user: { user_unique_id: undef, user_type: undef, user_id: undef, user_is_auth: undef, user_is_login: undef, device_id: undef, web_id: undef, ip_addr_id: undef, ssid: undef }, header: { app_id: undef, app_name: undef, app_install_id: undef, app_package: undef, app_channel: undef, app_version: undef, os_name: undef, os_version: undef, device_model: undef, ab_client: undef, ab_version: undef, traffic_type: undef, utm_source: undef, utm_medium: undef, utm_campaign: undef, client_ip: undef, device_brand: undef, os_api: undef, access: undef, language: undef, region: undef, app_language: undef, app_region: undef, creative_id: undef, ad_id: undef, campaign_id: undef, log_type: undef, rnd: undef, platform: undef, sdk_version: undef, province: undef, city: undef, timezone: undef, tz_offset: undef, tz_name: undef, sim_region: undef, carrier: undef, resolution: undef, browser: undef, browser_version: undef, referrer: undef, referrer_host: undef, headers: { utm_term: undef, utm_content: undef, custom: {} } } };
};var parseURL = function e(r) {
  var n = document.createElement("a");n.href = r;return n;
};var parseUrlQuery = function e(r) {
  var n = parseURL(r).search;n = n.slice(1);var i = {};n.split("&").forEach(function (e) {
    var r = e.split("="),
        n = r[0],
        t = r[1];i[n] = decodeURIComponent(typeof t === "undefined" ? "" : t);
  });return i;
};var undef$1 = "";var screen_width = screen.width || 0;var screen_height = screen.height || 0;var screen_size = screen_width + " x " + screen_height;var appVersion = navigator.appVersion;var userAgent = navigator.userAgent;var language = navigator.language;var referrer = document.referrer;var referrer_host = parseURL(referrer).hostname;var urlQueryObj = parseUrlQuery(location.href);var os_name = undef$1;var os_version = undef$1;var browser = "";var browser_version = "" + parseFloat(appVersion);var versionOffset = void 0;var semiIndex = void 0;if ((versionOffset = userAgent.indexOf("Opera")) !== -1) {
  browser = "Opera";browser_version = userAgent.substring(versionOffset + 6);if ((versionOffset = userAgent.indexOf("Version")) !== -1) {
    browser_version = userAgent.substring(versionOffset + 8);
  }
}if ((versionOffset = userAgent.indexOf("Edge")) !== -1) {
  browser = "Microsoft Edge";browser_version = userAgent.substring(versionOffset + 5);
} else if ((versionOffset = userAgent.indexOf("MSIE")) !== -1) {
  browser = "Microsoft Internet Explorer";browser_version = userAgent.substring(versionOffset + 5);
} else if ((versionOffset = userAgent.indexOf("Chrome")) !== -1) {
  browser = "Chrome";browser_version = userAgent.substring(versionOffset + 7);
} else if ((versionOffset = userAgent.indexOf("Safari")) !== -1) {
  browser = "Safari";browser_version = userAgent.substring(versionOffset + 7);if ((versionOffset = userAgent.indexOf("Version")) !== -1) {
    browser_version = userAgent.substring(versionOffset + 8);
  }
} else if ((versionOffset = userAgent.indexOf("Firefox")) !== -1) {
  browser = "Firefox";browser_version = userAgent.substring(versionOffset + 8);
}if ((semiIndex = browser_version.indexOf(";")) !== -1) {
  browser_version = browser_version.substring(0, semiIndex);
}if ((semiIndex = browser_version.indexOf(" ")) !== -1) {
  browser_version = browser_version.substring(0, semiIndex);
}if ((semiIndex = browser_version.indexOf(")")) !== -1) {
  browser_version = browser_version.substring(0, semiIndex);
}var platform = /Mobile|htc|mini|Android|iP(ad|od|hone)/.test(appVersion) ? "wap" : "web";var clientOpts = [{ s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ }, { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ }, { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ }, { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ }, { s: "Android", r: /Android/ }, { s: "Sun OS", r: /SunOS/ }, { s: "Linux", r: /(Linux|X11)/ }, { s: "iOS", r: /(iPhone|iPad|iPod)/ }, { s: "Mac OS X", r: /Mac OS X/ }, { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ }];for (var i = 0; i < clientOpts.length; i++) {
  var cs = clientOpts[i];if (cs.r.test(userAgent)) {
    os_name = cs.s;break;
  }
}function getVersion(e, r) {
  var n = e.exec(r);if (n && n[1]) {
    return n[1];
  }return "";
}if (/Windows/.test(os_name)) {
  os_version = getVersion(/Windows (.*)/, os_name);os_name = "windows";
}function getAndroidVersion(e) {
  var r = getVersion(/Android ([\.\_\d]+)/, e);if (!r) {
    r = getVersion(/Android\/([\.\_\d]+)/, e);
  }return r;
}switch (os_name) {case "Mac OS X":
    os_version = getVersion(/Mac OS X (10[\.\_\d]+)/, userAgent);os_name = "mac";break;case "Android":
    os_version = getAndroidVersion(userAgent);os_name = "android";break;case "iOS":
    os_version = /OS (\d+)_(\d+)_?(\d+)?/.exec(appVersion);if (!os_version) {
      os_version = "";
    } else {
      os_version = os_version[1] + "." + os_version[2] + "." + (os_version[3] | 0);
    }os_name = "ios";break;}var browser$1 = { screen_size: screen_size, browser: browser, browser_version: browser_version, platform: platform, os_name: os_name, os_version: os_version, userAgent: userAgent, screen_width: screen_width, screen_height: screen_height, device_model: os_name, language: language, referrer: referrer, referrer_host: referrer_host, utm_source: urlQueryObj.utm_source, utm_medium: urlQueryObj.utm_medium, utm_campaign: urlQueryObj.utm_campaign, utm_term: urlQueryObj.utm_term, utm_content: urlQueryObj.utm_content };var StorageCache = { get: function e(r) {
    var n = 'no localStorage';if (localStorage && localStorage.getItem) {
      n = localStorage.getItem(r);
    }var t = n;try {
      if (n && typeof n === "string") {
        t = JSON.parse(n);
      }
    } catch (e) {}return t;
  }, set: function e(r, n) {
    try {
      var t = typeof n === "string" ? n : JSON.stringify(n);if (localStorage && localStorage.setItem) {
        localStorage.setItem(r, t);
      }
    } catch (e) {}
  } };var TEA_CACHE_PREFIX = "__tea_cache_";var TEA_LOGGER_PREFIX = "[tea-sdk]";var ERROR_CODE = { NO_URL_PREFIX: 4001, IMG_ON_ERROR: 4e3, IMG_CATCH_ERROR: 4002, BEACON_STATUS_FALSE: 4003, XHR_ON_ERROR: 500, RESPONSE_DATA_ERROR: 5001 };var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof2(e);
} : function (e) {
  return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
};function _classCallCheck$1(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}var Logger = function e() {
  var s = this;var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";_classCallCheck$1(this, e);this.init = function (e) {
    s.isLog = e;
  };this.info = function (e) {
    for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
      n[t - 1] = arguments[t];
    }if (s.isLog) {
      var i;(i = console).log.apply(i, [s.prefix + e].concat(n));
    }
  };this.warn = function (e) {
    for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
      n[t - 1] = arguments[t];
    }if (s.isLog) {
      var i;(i = console).warn.apply(i, [s.prefix + e].concat(n));
    }
  };this.error = function (e) {
    for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
      n[t - 1] = arguments[t];
    }if (s.isLog) {
      var i;(i = console).error.apply(i, [s.prefix + e].concat(n));
    }
  };this.dir = function () {
    if (s.isLog) {
      var e;(e = console).dir.apply(e, arguments);
    }
  };this.table = function (e) {
    if (s.isLog) {
      console.table(e);
    }
  };this.logJSON = function (e) {
    if ((typeof e === "undefined" ? "undefined" : _typeof(e)) === "object" && s.isLog) {
      s.info("", JSON.stringify(e, null, 2));
    }
  };this.deprecated = function (e) {
    for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
      n[t - 1] = arguments[t];
    }s.warn.apply(s, ["[DEPRECATED]" + e].concat(n));
  };this.throw = function (e) {
    s.error(s.prefix);throw new Error(e);
  };var n = r ? "[" + r + "]" : "";this.prefix = TEA_LOGGER_PREFIX + n;
};var logger = new Logger();var fetchTokens = function e(r, n, t, i) {
  var s = new XMLHttpRequest();s.open("POST", r, true);s.setRequestHeader("Content-Type", "application/json; charset=utf-8");s.onload = function () {
    try {
      var e = JSON.parse(s.responseText);if (t) {
        t(e);
      }
    } catch (e) {
      if (i) {
        i();
      }
    }
  };s.onerror = function () {
    if (i) {
      i();
    }
  };s.send(JSON.stringify(n));
};function _classCallCheck$2(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}function _possibleConstructorReturn(e, r) {
  if (!e) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return r && ((typeof r === "undefined" ? "undefined" : _typeof2(r)) === "object" || typeof r === "function") ? r : e;
}function _inherits(e, r) {
  if (typeof r !== "function" && r !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof r === "undefined" ? "undefined" : _typeof2(r)));
  }e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } });if (r) Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r;
}var date = new Date();var timeZoneMin = date.getTimezoneOffset();var timezone = parseInt(-timeZoneMin / 60, 10);var tz_offset = timeZoneMin * 60;var sdk_version = void 0;try {
  sdk_version = "3.2.7";
} catch (e) {
  sdk_version = "2.x";
}var ClientEnv = function (r) {
  _inherits(n, r);function n() {
    _classCallCheck$2(this, n);var e = _possibleConstructorReturn(this, r.call(this));e.initClientEnv = function () {
      e.set("os_name", browser$1.os_name);e.set("os_version", browser$1.os_version);e.set("device_model", browser$1.device_model);e.set("platform", browser$1.platform);e.set("sdk_version", sdk_version);e.set("browser", browser$1.browser);e.set("browser_version", browser$1.browser_version);e.set("language", browser$1.language);e.set("timezone", timezone);e.set("tz_offset", tz_offset);e.set("resolution", browser$1.screen_width + "x" + browser$1.screen_height);e.set("screen_width", browser$1.screen_width);e.set("screen_height", browser$1.screen_height);e.set("referrer", browser$1.referrer);e.set("referrer_host", browser$1.referrer_host);e.set("utm_source", browser$1.utm_source);e.set("utm_medium", browser$1.utm_medium);e.set("utm_campaign", browser$1.utm_campaign);e.set("utm_term", browser$1.utm_term);e.set("utm_content", browser$1.utm_content);
    };e.initClientEnv();return e;
  }return n;
}(Env);var clientEnvManager = new ClientEnv();function _classCallCheck$3(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}var Type = function () {
  function e() {
    _classCallCheck$3(this, e);
  }e.prototype.isString = function e(r) {
    return Object.prototype.toString.call(r).slice(8, -1) === "String";
  };e.prototype.isNumber = function e(r) {
    return Object.prototype.toString.call(r).slice(8, -1) === "Number";
  };e.prototype.isBoolean = function e(r) {
    return Object.prototype.toString.call(r).slice(8, -1) === "Boolean";
  };e.prototype.isFunction = function e(r) {
    return Object.prototype.toString.call(r).slice(8, -1) === "Function";
  };e.prototype.isNull = function e(r) {
    return Object.prototype.toString.call(r).slice(8, -1) === "Null";
  };e.prototype.isUndefined = function e(r) {
    return Object.prototype.toString.call(r).slice(8, -1) === "Undefined";
  };e.prototype.isObj = function e(r) {
    return Object.prototype.toString.call(r).slice(8, -1) === "Object";
  };e.prototype.isArray = function e(r) {
    return Object.prototype.toString.call(r).slice(8, -1) === "Array";
  };e.prototype.isFalse = function e(r) {
    if (r === "" || r === undefined || r === null || r === "null" || r === "undefined" || r === 0 || r === false || r === NaN) return true;return false;
  };e.prototype.isTrue = function e(r) {
    return !this.isFalse(r);
  };e.prototype.isLowIE = function e() {
    return window.XDomainRequest;
  };return e;
}();var types = new Type();function decrypto(e, r, n) {
  if (typeof e !== "string" || typeof r !== "number" || typeof n !== "number") {
    return;
  }var t = [];var i = [];n = n <= 25 ? n : n % 25;var s = String.fromCharCode(n + 97);t = e.split(s);for (var o = 0; o < t.length; o++) {
    var a = parseInt(t[o], n);a = a * 1 ^ r;var u = String.fromCharCode(a);i.push(u);
  }var f = i.join("");return f;
}var decodeXXX = function e(r) {
  return decrypto(r, 64, 25);
};function b(e) {
  return e ? (e ^ Math.random() * 16 >> e / 4).toString(10) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
}var webid = function e() {
  return b().replace(/-/g, "").slice(0, 19);
};var _extends$1 = Object.assign || function (e) {
  for (var r = 1; r < arguments.length; r++) {
    var n = arguments[r];for (var t in n) {
      if (Object.prototype.hasOwnProperty.call(n, t)) {
        e[t] = n[t];
      }
    }
  }return e;
};function _classCallCheck$4(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}function _possibleConstructorReturn$1(e, r) {
  if (!e) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return r && ((typeof r === "undefined" ? "undefined" : _typeof2(r)) === "object" || typeof r === "function") ? r : e;
}function _inherits$1(e, r) {
  if (typeof r !== "function" && r !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof r === "undefined" ? "undefined" : _typeof2(r)));
  }e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } });if (r) Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r;
}var urlPrefix = { cn: "1fz22z22z1nz21z4mz4bz4bz1kz1az21z4az21z1lz21z21z1bz1iz4az1az1mz1k", sg: "1fz22z22z1nz21z4mz4bz4bz21z1ez18z1jz1gz49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k", va: "1fz22z22z1nz21z4mz4bz4bz1kz18z1jz1gz24z18z49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k" };var getCookie = function e(r) {
  try {
    var n = document.cookie.match(new RegExp("(?:^|;)\\s*" + r + "=([^;]+)"));return decodeURIComponent(n ? n[1] : "");
  } catch (e) {
    return "";
  }
};var AppChannelEnv = function (e) {
  _inherits$1(r, e);function r() {
    _classCallCheck$4(this, r);var f = _possibleConstructorReturn$1(this, e.call(this));f.init = function (e) {
      var r = e.app_id,
          n = e.channel,
          t = e.log,
          i = e.channel_domain,
          s = e.name;if (typeof r !== "number") {
        throw new Error("app_id 必须是一个数字，注意检查是否是以`string`的方式传入的？");
      }f.logger = new Logger(s);f.logger.init(t);f.initConfigs(e);f.initUrls(n, i);f.setEnv("app_id", r);
    };f.initConfigs = function (e) {
      var r = e.app_id,
          n = e.disable_ssid,
          t = e.disable_webid,
          i = e.disable_sdk_monitor;f.app_id = r;f.evtDataCacheKey = TEA_CACHE_PREFIX + "events_" + r;if (n) {
        f.logger.info("ssid已禁用，设置user_unique_id不会请求ssid接口。");f.isSsidDisabled = true;
      }if (t) {
        f.logger.info("webid服务已禁用，ssid同时被禁用。将本地生成webid。");f.isWebidDisabled = true;f.isSsidDisabled = true;
      }if (i) {
        f.logger.info("SDK监控已禁用。");f.isSdkMonitorDisabled = true;
      }
    };f.initUrls = function (e, r) {
      if (e === "internal") {
        f.logger.warn("channel 的值 internal 已被废弃，已自动改为 cn。");e = "cn";
      }if (!r && !urlPrefix[e]) {
        throw new Error("channel 变量只能是 `cn`, `sg`,`va`");
      }var n = r || decodeXXX(urlPrefix[e]);n = n.replace(/\/+$/, "");f.reportUrl = n + "/v1/list";f.userTokensPrefix = "" + n;
    };f.setEnv = function (e, r) {
      if (e === "app_id") {
        f.checkUserToken(r);
      }if (e === "user_unique_id") {
        if (f.blackUuid.some(function (e) {
          return e === String(r);
        })) {
          f.logger.warn('设置了无效的值 {user_unique_id："%s"}。该操作已忽略。', r);return;
        }f.verifyTokens(r);
      }if (e === "web_id") {
        if (!r) {
          return;
        }if (!f.envInfo.user.user_unique_id || f.envInfo.user.user_unique_id && f.envInfo.user.user_unique_id === f.envInfo.user.web_id) {
          f.set("user_unique_id", r);
        }
      }f.set(e, r);
    };f.transferFromCookie = function () {
      var e = f.tokensCacheKey;var r = "tt_webid";var n = "__tea_sdk__ssid";var t = "__tea_sdk__user_unique_id";var i = getCookie(r);var s = getCookie(n);var o = getCookie(t);if (types.isLowIE()) {
        if (i) {
          var a = { web_id: i, ssid: i, user_unique_id: i };StorageCache.set(e, JSON.stringify(a));
        }return false;
      }if (i && s && o) {
        var u = { web_id: i, ssid: s, user_unique_id: o };StorageCache.set(e, JSON.stringify(u));
      }
    };f.purifyBlackUuid = function () {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};if (f.blackUuid.some(function (e) {
        return e === r.user_unique_id;
      })) {
        var e = {};f.setUserTokens(e);f.logger.warn('检测到无效的用户标识，已重置用户状态。{user_unique_id: "%s"}', r.user_unique_id);return e;
      }return r;
    };f.getUserTokens = function () {
      return StorageCache.get(f.tokensCacheKey) || {};
    };f.setUserTokens = function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return StorageCache.set(f.tokensCacheKey, e);
    };f.checkUserToken = function (e) {
      var r = TEA_CACHE_PREFIX + "tokens_" + e;f.tokensCacheKey = r;f.transferFromCookie();var n = f.purifyBlackUuid(f.getUserTokens());if (n.user_unique_id && n.web_id) {
        f.envInfo.user.user_unique_id = n.user_unique_id;f.envInfo.user.web_id = n.web_id;f.envInfo.user.ssid = n.ssid || "";f.logger.info("初始化已经检测到了 webid user_unique_id，一般情况下不需要再次验证 id 了");f.unlock();
      } else {
        f.requestWebId(e);
      }
    };f.saveTokenToStorage = function (e) {
      var r = e.web_id,
          n = e.ssid,
          t = e.user_unique_id;f.setUserTokens({ web_id: r, ssid: n, user_unique_id: t });
    };f.requestWebId = function () {
      f.isRequestWebId = true;var n = function e(r) {
        var n = f.envInfo.user.web_id || r.web_id;var t = r.ssid;f.isRequestWebId = false;f.envInfo.user.ssid = t;f.envInfo.user.web_id = n;f.envInfo.user.user_unique_id = n;f.saveTokenToStorage({ web_id: n, ssid: t, user_unique_id: n });if (f.waitForVerifyTokens) {
          f.lock();f.verifyTokens(f.realUuid);
        } else {
          f.unlock();if (f.callback) {
            f.callback();
          }
        }
      };var e = function e() {
        n({ web_id: webid(), ssid: "" });
      };var r = function e() {
        var r = f.userTokensPrefix + "/v1/user/webid";fetchTokens(r, { app_id: f.app_id, url: location.href, user_agent: browser$1.userAgent, referer: browser$1.referrer, user_unique_id: "" }, function (e) {
          if (e.e !== 0) {
            f.logger.error("请求 webid 失败。请联系管理员。");
          } else {
            n(e);
          }
        }, function () {
          f.isRequestWebId = false;f.logger.error("获取 webid 失败，数据将不会被上报");
        });
      };if (f.isWebidDisabled) {
        e();
      } else {
        r();
      }
    };f.verifyTokens = function (e) {
      var r = f.tokensCacheKey;f.waitForVerifyTokens = false;f.realUuid = "" + e;if (f.isRequestWebId) {
        f.waitForVerifyTokens = true;f.logger.info("正在请求 webid，requestSsid 将会在前者请求完毕之后被调用");return false;
      }var n = f.getUserTokens();if (n.user_unique_id === f.realUuid && n.ssid && n.web_id) {
        f.logger.info("传入的 user_id/user_unique_id 与 缓存中的完全一致，无需再次请求");f.unlock();
      } else {
        f.lock();f.envInfo.user.user_unique_id = f.realUuid;var t = _extends$1({}, f.getUserTokens(), { user_unique_id: f.realUuid });StorageCache.set(r, JSON.stringify(t));if (types.isLowIE()) {
          f.unlock();return false;
        }if (f.isSsidDisabled) {
          f.unlock();if (f.callback) {
            f.callback();
          }
        } else {
          f.requestSsid();
        }
      }
    };f.requestSsid = function () {
      var n = f.getUserTokens();var e = f.userTokensPrefix + "/v1/user/ssid";fetchTokens(e, { app_id: f.app_id, web_id: n.web_id, user_unique_id: "" + n.user_unique_id }, function (e) {
        f.unlock();if (e.e !== 0) {
          f.logger.error("请求 ssid 失败~");
        } else {
          f.envInfo.user.ssid = e.ssid;var r = _extends$1({}, n, { ssid: e.ssid });f.setUserTokens(r);f.logger.info("根据 user_unique_id 更新 ssid 成功！注意：在这之前不应该有数据被发出去");if (f.callback) {
            f.callback();
          }
        }
      }, function () {
        f.unlock();f.logger.error("根据 user_unique_id 获取新 ssid 失败");
      });
    };f.setEvtParams = function (e) {
      var r = _extends$1({}, e);Object.keys(r).forEach(function (e) {
        f.evtParams[e] = r[e];
      });
    };f.mergeEnvToEvents = function (e) {
      var r = f.mergeEnv();var n = [];var t = 0;var i = void 0;e.forEach(function (e) {
        var r = !!e.params.__disable_storage__;if (typeof i === "undefined") {
          i = r;
        } else if (r !== i || n[t].length >= 5) {
          t += 1;i = !i;
        }n[t] = n[t] || [];n[t].push(e);
      });var s = n.map(function (e) {
        return { events: e.map(function (e) {
            var r = _extends$1({}, f.evtParams, e.params);delete r.__disable_storage__;return _extends$1({}, e, { params: JSON.stringify(r) });
          }), user: r.user, header: r.header, verbose: f.debugMode ? 1 : undefined, __disable_storage__: e[0].params.__disable_storage__ };
      });return s;
    };f.mergeEnv = function () {
      var e = f.get();var r = clientEnvManager.get();var n = _extends$1({}, e.user);var t = _extends$1({}, r.header.headers.custom, e.header.headers.custom);var i = _extends$1({}, r.header.headers, e.header.headers, { custom: t });var s = _extends$1({}, r.header, e.header);var o = { user: n, header: _extends$1({}, s, { headers: JSON.stringify(i) }) };return o;
    };f.evtParams = {};f.reportUrl = "";f.userTokensPrefix = "";f.isSsidDisabled = false;f.isWebidDisabled = false;f.isSdkMonitorDisabled = false;f.debugMode = false;f.blackUuid = ["null", "undefined", "0", "", "None"];f.logger = function () {};return f;
  }r.prototype.lock = function e() {
    this.isUserTokensReady = false;
  };r.prototype.unlock = function e() {
    this.isUserTokensReady = true;
  };r.prototype.enableDebugMode = function e(r) {
    this.debugMode = r;
  };return r;
}(Env);function _classCallCheck$5(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}var MemoryCache = function e() {
  var n = this;_classCallCheck$5(this, e);this.set = function (e, r) {
    n.cache[e] = r;
  };this.get = function (e) {
    return n.cache[e];
  };this.clean = function (e) {
    n.cache[e] = undefined;
  };this.cache = {};
};var memoryCacheManager = new MemoryCache();function _classCallCheck$6(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}var EventStorageManager = function () {
  function t(e) {
    var r = e.disable_storage,
        n = r === undefined ? false : r;_classCallCheck$6(this, t);this._isPersistent = !n;this._storage = this._isPersistent ? StorageCache : new MemoryCache();this._storageKey = "";this._data = undefined;
  }t.prototype.setStorageKey = function e(r) {
    this._storageKey = r;
  };t.prototype.getAllEvents = function e() {
    var n = this.getData();Object.keys(n).reduce(function (e, r) {
      return e.concat(n[r] || []);
    }, []);
  };t.prototype.getData = function e() {
    this._checkIsDataInit();return this._data;
  };t.prototype.add = function e(r) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];this._checkIsDataInit();if (n.length !== 0) {
      this._data[r] = n;this._save();
    }
  };t.prototype.delete = function e(r) {
    this._checkIsDataInit();if (this._data[r]) {
      delete this._data[r];this._save();
    }
  };t.prototype._checkIsDataInit = function e() {
    if (typeof this._data === "undefined") {
      try {
        var r = this._getDataFromStorage();if (types.isArray(r)) {
          var n;this._data = (n = {}, n[webid()] = r, n);this._save();
        } else {
          this._data = r;
        }
      } catch (e) {
        this._data = {};
      }
    }
  };t.prototype._checkStorageKey = function e() {
    if (!this._storageKey) {
      throw new Error("must call setStorageKey('xxx') first");
    }
  };t.prototype._getDataFromStorage = function e() {
    this._checkStorageKey();return this._storage.get(this._storageKey) || {};
  };t.prototype._save = function e() {
    this._checkStorageKey();this._storage.set(this._storageKey, this._data);
  };return t;
}();var encodePayload = function e(r) {
  var n = "";for (var t in r) {
    if (r.hasOwnProperty(t)) {
      n += "&" + t + "=" + encodeURIComponent(JSON.stringify(r[t]));
    }
  }n = n[0] === "&" ? n.slice(1) : n;return n;
};var sendByImg = function e(r, n) {
  try {
    var t = r.split("v1")[0];n.forEach(function (e) {
      var r = encodePayload(e);var n = new Image(1, 1);n.onload = function () {
        n = null;
      };n.onerror = function () {
        n = null;
      };n.src = t + "/v1/gif?" + r;
    });
  } catch (e) {}
};var postSdkLog = function e(r, n) {
  if (window.XDomainRequest) {
    return sendByImg(r, n);
  }var t = new XMLHttpRequest();t.open("POST", r + "?rdn=" + Math.random(), true);t.onload = function () {};t.onerror = function () {
    t.abort();
  };t.send(JSON.stringify(n));
};var encodePayload$1 = function e(r) {
  var n = "";for (var t in r) {
    if (r.hasOwnProperty(t)) {
      n += "&" + t + "=" + encodeURIComponent(JSON.stringify(r[t]));
    }
  }n = n[0] === "&" ? n.slice(1) : n;return n;
};var sendByImg$1 = function e(t, i, s, o) {
  try {
    var a = t.split("v1")[0];if (!a) {
      o(t, i, ERROR_CODE.NO_URL_PREFIX);return;
    }i.forEach(function (e) {
      var r = encodePayload$1(e);var n = new Image(1, 1);n.onload = function () {
        n = null;s();
      };n.onerror = function () {
        n = null;o(t, i, ERROR_CODE.IMG_ON_ERROR);
      };n.src = a + "/v1/gif?" + r;
    });
  } catch (e) {
    o(t, i, ERROR_CODE.IMG_CATCH_ERROR, e.message);
  }
};var request = function e(r) {
  var n = r.url,
      t = r.data,
      i = r.success,
      s = r.fail,
      o = r.notSure,
      a = r.isUnload;var u = t;if (window.XDomainRequest) {
    sendByImg$1(n, u, i, s);return;
  }if (a) {
    if (window.navigator && window.navigator.sendBeacon) {
      o();var f = window.navigator.sendBeacon(n, JSON.stringify(u));if (f) {
        i();
      } else {
        s(n, t, ERROR_CODE.BEACON_STATUS_FALSE);
      }return;
    }sendByImg$1(n, u, i, s);return;
  }var c = new XMLHttpRequest();c.open("POST", n + "?rdn=" + Math.random(), true);c.onload = function () {
    i(n, u, c.responseText);
  };c.onerror = function () {
    c.abort();s(n, u, ERROR_CODE.XHR_ON_ERROR);
  };c.send(JSON.stringify(u));
};function _classCallCheck$7(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}var EventSender = function e(r) {
  var c = this;_classCallCheck$7(this, e);this.send = function (e) {
    var r = e.url,
        n = e.data,
        a = e.success,
        i = e.fail,
        u = e.eventError,
        t = e.notSure,
        s = e.isUnload;request({ url: r, data: n, success: function e(r, n, t) {
        a();try {
          var i = JSON.parse(t);var s = i.e;if (s !== 0) {
            var o = "未知错误";if (s === -2) {
              o = "事件格式错误！请检查字段类型是否正确。";
            }c.logger.error("数据上报失败！", "错误码：" + s + "。错误信息：" + o);u(n, s);sdkMonitorOnError(r, n, s);
          }
        } catch (e) {
          sdkMonitorOnError(r, n, ERROR_CODE.RESPONSE_DATA_ERROR);
        }
      }, fail: function e(r, n, t) {
        c.logger.error("数据上报失败！", "错误码：" + t);i(n, t);sdkMonitorOnError(r, n, t);
      }, notSure: t, isUnload: s });if (!c.isSdkMonitorDisabled && !c.isSdkOnLoadEventReady) {
      c.isSdkOnLoadEventReady = true;try {
        var o = n[0].header;var f = n[0].user;sdkMonitorOnload(r, { app_id: o.app_id, app_name: o.app_name, sdk_version: o.sdk_version, web_id: f.web_id });
      } catch (e) {}
    }
  };this.logger = r.logger || logger;this.isSdkOnLoadEventReady = false;this.isSdkMonitorDisabled = false;
};var sdkMonitorOnload = function e(r, n) {
  try {
    var t = { event: "onload", params: JSON.stringify({ app_id: n.app_id, app_name: n.app_name || "", sdk_version: n.sdk_version }), local_time_ms: Date.now() };var i = { events: [t], user: { user_unique_id: n.web_id }, header: { app_id: 1338 } };setTimeout(function () {
      postSdkLog(r, [i]);
    }, 16);
  } catch (e) {}
};var sdkMonitorOnError = function e(r, n, t) {
  try {
    var i = n[0].user;var s = n[0].header;var o = [];n.forEach(function (e) {
      e.events.forEach(function (e) {
        o.push(e);
      });
    });var a = o.map(function (e) {
      return { event: "on_error", params: JSON.stringify({ error_code: t, app_id: s.app_id, app_name: s.app_name || "", error_event: e.event, local_time_ms: e.local_time_ms, tea_event_index: Date.now(), params: e.params, header: JSON.stringify(s), user: JSON.stringify(i) }), local_time_ms: Date.now() };
    });var u = { events: a, user: { user_unique_id: i.user_unique_id }, header: { app_id: 1338 } };setTimeout(function () {
      postSdkLog(r, [u]);
    }, 16);
  } catch (e) {}
};function _classCallCheck$8(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}function _possibleConstructorReturn$2(e, r) {
  if (!e) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return r && ((typeof r === "undefined" ? "undefined" : _typeof2(r)) === "object" || typeof r === "function") ? r : e;
}function _inherits$2(e, r) {
  if (typeof r !== "function" && r !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof r === "undefined" ? "undefined" : _typeof2(r)));
  }e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } });if (r) Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r;
}var AppChannel = function (u) {
  _inherits$2(f, u);function f(e) {
    _classCallCheck$8(this, f);var o = _possibleConstructorReturn$2(this, u.call(this));o.addListener = function () {
      window.addEventListener("unload", function () {
        o.report(true);
      }, false);window.addEventListener("beforeunload", function () {
        o.report(true);
      }, false);document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "hidden") {
          o.report(true);
        }
      }, false);
    };o.setReady = function (e) {
      o.isReady = e;o.eventSender.isSdkMonitorDisabled = o.isSdkMonitorDisabled;o.checkAndSendCachedStorageEvents();o.report();
    };o.eventReportTimer = null;o.event = function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var n = memoryCacheManager.get(o.evtDataCacheKey) || [];var t = r ? [].concat(e, n) : [].concat(n, e);memoryCacheManager.set(o.evtDataCacheKey, t);if (t.length >= 5) {
        o.report();
      } else {
        if (o.eventReportTimer) {
          clearTimeout(o.eventReportTimer);
        }o.eventReportTimer = setTimeout(function () {
          o.report();o.eventReportTimer = null;
        }, o.waitForBatchTime);
      }
    };o.report = function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;if (!o.isUserTokensReady) {
        return false;
      }if (!o.isReady) {
        return false;
      }var r = memoryCacheManager.get(o.evtDataCacheKey) || [];memoryCacheManager.clean(o.evtDataCacheKey);var n = o.mergeEnvToEvents(r);o.sendData(n, e);
    };o.sendData = function (e, n) {
      var t = [];var i = 0;var s = void 0;e.forEach(function (e) {
        var r = !!e.__disable_storage__;if (typeof s === "undefined") {
          s = r;
        } else if (r !== s || t[i].length >= 5) {
          i += 1;s = !s;
        }t[i] = t[i] || [];t[i].push(e);
      });t.forEach(function (e) {
        var r = webid();if (!e[0].__disable_storage__) {
          o.eventStorage.add(r, e);
        }o._sendData(r, e, n);
      });
    };o.checkAndSendCachedStorageEvents = function () {
      var r = o.eventStorage.getData();var e = Object.keys(r);if (e.length > 0) {
        e.forEach(function (e) {
          o._sendData(e, r[e]);
        });
      }
    };o._sendData = function (r, e, n) {
      o.isReporting = true;var t = function e() {
        o.isReporting = false;
      };o.eventSender.send({ url: o.reportUrl, data: e, success: function e() {
          t();o.sendDataSuccess(r);
        }, fail: function e(r, n) {
          t();o.reportErrorCallback(r, n);setTimeout(function () {
            o.report();
          }, 3e3);
        }, eventError: function e(r, n) {
          o.reportErrorCallback(r, n);
        }, notSure: t, isUnload: n });
    };o.sendDataSuccess = function (e) {
      o.eventStorage.delete(e);o.report();
    };var r = e.log,
        n = e.disable_storage,
        t = e.max_batch_num,
        i = t === undefined ? 5 : t,
        s = e.batch_time,
        a = s === undefined ? 30 : s;o.init(e);o.maxBatchNum = i;o.waitForBatchTime = a;o.isReady = false;o.addListener();o.enableDebugMode(!!r);o.eventStorage = new EventStorageManager({ disable_storage: n });o.eventStorage.setStorageKey(o.evtDataCacheKey);o.eventSender = new EventSender({ logger: o.logger });o.reportErrorCallback = function () {};return o;
  }return f;
}(AppChannelEnv);var _extends$2 = Object.assign || function (e) {
  for (var r = 1; r < arguments.length; r++) {
    var n = arguments[r];for (var t in n) {
      if (Object.prototype.hasOwnProperty.call(n, t)) {
        e[t] = n[t];
      }
    }
  }return e;
};function _classCallCheck$9(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}var getEventIndex = function () {
  var e = +Date.now() + Number(("" + Math.random()).slice(2, 8));return function () {
    e += 1;return e;
  };
}();var preprocessEvent = function e(r, n) {
  var t = /^event\./;var i = r;if (t.test(r)) {
    i = r.slice(6);
  }var s = n;if (!types.isObj(s)) {
    s = {};
  }s.event_index = getEventIndex();var o = { event: i, params: s, local_time_ms: +new Date() };return o;
};var Collector = function e(r) {
  var u = this;_classCallCheck$9(this, e);this.init = function (e) {
    if (!types.isObj(e)) {
      throw new Error("init 的参数必须是Object类型");
    }u.logger.init(e.log);u.channel = new AppChannel(_extends$2({}, e, { name: u.name }));u.channel.callback = function () {
      if (u.callbackSend) {
        u.start();
      }
    };
  };this.config = function (e) {
    if (!types.isObj(e)) {
      u.logger.throw("config 参数必须是 {} 的格式");
    }if (e.log) {
      u.logger.init(true);u.channel.enableDebugMode(true);e.log = null;
    }var r = Object.keys(e);if (!r.length) {
      return false;
    }for (var n = r, t = Array.isArray(n), i = 0, n = t ? n : n[Symbol.iterator]();;) {
      var s;if (t) {
        if (i >= n.length) break;s = n[i++];
      } else {
        i = n.next();if (i.done) break;s = i.value;
      }var o = s;var a = e[o];switch (o) {case "evtParams":
          u.channel.setEvtParams(a);break;case "disable_ssid":
          u.logger.deprecated("(disable_ssid)请通过init函数来设置。");if (a) {
            u.logger.info("ssid已禁用，设置user_unique_id不会请求ssid接口。");u.channel.isSsidDisabled = a;
          }break;case "disable_auto_pv":
          if (a) {
            u.logger.info("已禁止默认上报predefine_pageview事件，需手动上报。");u._autoSendPV = false;
          }break;case "_staging_flag":
          if ("" + a === "1") {
            u.logger.info("根据_staging_flag设置，数据将会上报到stag 表。");
          }u.channel.setEvtParams({ _staging_flag: Number(a) });break;case "reportErrorCallback":
          if (typeof a === "function") {
            u.channel.reportErrorCallback = a;
          }break;default:
          u.channel.setEnv(o, a);}
    }
  };this.send = function () {
    u.start();
  };this.start = function () {
    if (u.channel.isUserTokensReady) {
      if (u._isSendFuncCalled) {
        return;
      }u._isSendFuncCalled = true;u.logger.info("看到本提示，意味着用户信息已完全就绪，上报通道打开。用户标识如下：");u.logger.logJSON(u.channel.get().user);if (u._autoSendPV) {
        u.predefinePageView();
      }u.channel.setReady(true);
    } else {
      u.callbackSend = true;
    }
  };this.predefinePageView = function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var r = { title: document.title || location.pathname, url: location.href, url_path: location.pathname };var n = _extends$2({}, r, e);u.event("predefine_pageview", n, true);
  };this.event = function () {
    for (var e = arguments.length, r = Array(e), n = 0; n < e; n++) {
      r[n] = arguments[n];
    }var t = types.isBoolean(r[r.length - 1]);var i = t ? r[r.length - 1] : false;var s = t ? r.slice(0, r.length - 1) : r;var o = s[0];var a = [];if (!types.isArray(o)) {
      a[0] = s;
    } else {
      a = s;
    }a = a.map(function (e) {
      return preprocessEvent.apply(undefined, e);
    });u.channel.event(a, i);
  };this._isSendFuncCalled = false;this._autoSendPV = true;this.name = r;this.logger = new Logger(r);
};Collector.exportMethods = ["init", "config", "send", "start", "predefinePageView"];function _classCallCheck$a(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}var CollectorAsync = function e(r) {
  var o = this;_classCallCheck$a(this, e);this._exportCollect = function () {
    for (var e = arguments.length, r = Array(e), n = 0; n < e; n++) {
      r[n] = arguments[n];
    }if (o._isQueueProcessed) {
      o._executeCmd.apply(o, r);return;
    }o.cmdQueue.push(r);o._processCmdQueue();
  };this._processCmdQueue = function () {
    if (o.cmdQueue.length === 0) {
      return;
    }var e = function e(r, t, i) {
      var s = -1;r.forEach(function (e, r) {
        var n = typeof i !== "undefined" ? e[i] : e;if (n === t) {
          s = r;
        }
      });return s;
    };var n = e(o.cmdQueue, "init", "0");if (n !== -1) {
      o._isQueueProcessed = true;o._executeCmd.apply(o, o.cmdQueue[n]);o.cmdQueue.forEach(function (e, r) {
        if (r !== n) {
          o._executeCmd.apply(o, e);
        }
      });o.cmdQueue = [];
    }
  };this._executeCmd = function () {
    for (var e = arguments.length, r = Array(e), n = 0; n < e; n++) {
      r[n] = arguments[n];
    }var t = r[0];if (Collector.exportMethods.indexOf(t) > -1) {
      var i;(i = o.colloctor)[t].apply(i, r.slice(1));
    } else {
      var s;(s = o.colloctor).event.apply(s, r);
    }
  };this.name = r || "Collector" + +new Date();this.cmdQueue = [];this.colloctor = new Collector(this.name);this._isQueueProcessed = false;this._processCmdQueue();this._exportCollect.init = this._exportCollect.bind(this, "init");this._exportCollect.config = this._exportCollect.bind(this, "config");this._exportCollect.send = this._exportCollect.bind(this, "send");this._exportCollect.start = this._exportCollect.bind(this, "start");this._exportCollect.predefinePageView = this._exportCollect.bind(this, "predefinePageView");return this._exportCollect;
};export default CollectorAsync;