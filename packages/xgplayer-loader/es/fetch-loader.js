var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { EVENTS } from 'xgplayer-utils';

var LOADER_EVENTS = EVENTS.LOADER_EVENTS;
var READ_STREAM = 0;
var READ_TEXT = 1;
var READ_JSON = 2;
var READ_BUFFER = 3;

var FetchLoader = function () {
  function FetchLoader(configs) {
    _classCallCheck(this, FetchLoader);

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

  _createClass(FetchLoader, [{
    key: 'init',
    value: function init() {
      this.on(LOADER_EVENTS.LADER_START, this.load.bind(this));
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
        _this.emit(LOADER_EVENTS.LOADER_ERROR, _this.TAG, new Error('invalid response.'));
      }).catch(function (error) {
        _this.loading = false;
        _this.emit(LOADER_EVENTS.LOADER_ERROR, _this.TAG, error);
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
                  _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
                } else {
                  _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
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
                  _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
                } else {
                  _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
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
                  _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
                } else {
                  _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
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
          _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
          return;
        }

        buffer.push(val.value);
        _this.emit(LOADER_EVENTS.LOADER_DATALOADED, buffer);
        return _this._onReader(reader, taskno);
      }).catch(function (error) {
        _this.loading = false;
        _this.emit(LOADER_EVENTS.LOADER_ERROR, _this.TAG, error);
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
      };if (_typeof(this.configs.headers) === 'object') {
        var configHeaders = this.configs.headers;
        for (var key in configHeaders) {
          if (configHeaders.hasOwnProperty(key)) {
            headers.append(key, configHeaders[key]);
          }
        }
      }

      if (_typeof(options.headers) === 'object') {
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

export default FetchLoader;