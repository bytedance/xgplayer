import EVENTS from 'xgplayer-transmuxer-constant-events';

var LOADER_EVENTS = EVENTS.LOADER_EVENTS;
var READ_STREAM = 0;
var READ_TEXT = 1;
var READ_JSON = 2;
var READ_BUFFER = 3;

var FetchLoader = function () {
  function FetchLoader(configs) {
    babelHelpers.classCallCheck(this, FetchLoader);

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

  babelHelpers.createClass(FetchLoader, [{
    key: 'init',
    value: function init() {
      this.on(LOADER_EVENTS.LADER_START, this.load.bind(this));
    }
  }, {
    key: 'load',
    value: function load(url, opts) {
      var _this2 = this;

      this.url = url;

      this._canceled = false;

      // TODO: Add Ranges
      var params = this.getParams(opts);
      this.loading = true;
      return fetch(this.url, params).then(function (response) {
        if (response.ok) {
          _this2.status = response.status;
          Promise.resolve().then(function () {
            _this2._onFetchResponse(response);
          });

          return Promise.resolve(response);
        }
        _this2.loading = false;
        _this2.emit(LOADER_EVENTS.LOADER_ERROR, _this2.TAG, new Error(response.status + ' (' + response.statusText + ')'));
      }).catch(function (error) {
        _this2.loading = false;
        _this2.emit(LOADER_EVENTS.LOADER_ERROR, _this2.TAG, error);
        throw error;
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
      var _this3 = this;

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

      // reader read function returns a Promise. get data when callback and has value.done when disconnected.
      // read方法返回一个Promise. 回调中可以获取到数据。当value.done存在时，说明链接断开。
      this._reader && this._reader.read().then(function (val) {
        if (_this3._canceled || _this3._destroyed) {
          if (_this3._reader) {
            try {
              _this3._reader.cancel();
            } catch (e) {
              // DO NOTHING
            }
          }
          return;
        }
        if (val.done) {
          _this3.loading = false;
          _this3.status = 0;
          Promise.resolve().then(function () {
            _this3.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
          });
          return;
        }

        buffer.push(val.value);
        Promise.resolve().then(function () {
          _this3.emit(LOADER_EVENTS.LOADER_DATALOADED, buffer);
        });
        return _this3._onReader(reader, taskno);
      }).catch(function (error) {
        _this3.loading = false;
        _this3.emit(LOADER_EVENTS.LOADER_ERROR, _this3.TAG, error);
        throw error;
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
      };if (babelHelpers.typeof(this.configs.headers) === 'object') {
        var configHeaders = this.configs.headers;
        for (var key in configHeaders) {
          if (configHeaders.hasOwnProperty(key)) {
            headers.append(key, configHeaders[key]);
          }
        }
      }

      if (babelHelpers.typeof(options.headers) === 'object') {
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