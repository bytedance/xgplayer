var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MSE = function () {
  function MSE(configs, context) {
    _classCallCheck(this, MSE);

    if (context) {
      this._context = context;
      this.emit = context._emitter.emit.bind(context._emitter);
    }

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

  _createClass(MSE, [{
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
    key: 'resetContext',
    value: function resetContext(newCtx) {
      this._context = newCtx;
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
          var source = sources.sources[type];
          if (source && !source.inited) {
            try {
              sourceBuffer.appendBuffer(source.init.buffer.buffer);
              source.inited = true;
            } catch (e) {
              // DO NOTHING
            }
          } else if (source) {
            var data = source.data.shift();
            if (data) {
              try {
                sourceBuffer.appendBuffer(data.buffer.buffer);
              } catch (e) {
                source.data.unshift(data);
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
    key: 'cleanBuffers',
    value: function cleanBuffers() {
      var _this = this;

      var taskList = [];

      var _loop = function _loop(i) {
        var buffer = _this.sourceBuffers[Object.keys(_this.sourceBuffers)[i]];

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
    key: 'removeBuffers',
    value: function removeBuffers() {
      var _this2 = this;

      var taskList = [];

      var _loop2 = function _loop2(i) {
        var buffer = _this2.sourceBuffers[Object.keys(_this2.sourceBuffers)[i]];
        buffer.removeEventListener('updateend', _this2.onUpdateEnd);

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
        _loop2(i);
      }

      return Promise.all(taskList);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      return this.removeBuffers().then(function () {
        for (var i = 0; i < Object.keys(_this3.sourceBuffers).length; i++) {
          var _buffer = _this3.sourceBuffers[Object.keys(_this3.sourceBuffers)[i]];
          _this3.mediaSource.removeSourceBuffer(_buffer);
          delete _this3.sourceBuffers[Object.keys(_this3.sourceBuffers)[i]];
        }

        _this3.container.removeEventListener('timeupdate', _this3.onTimeUpdate);
        _this3.container.removeEventListener('waiting', _this3.onWaiting);
        _this3.mediaSource.removeEventListener('sourceopen', _this3.onSourceOpen);

        _this3.endOfStream();
        window.URL.revokeObjectURL(_this3.url);

        _this3.url = null;
        _this3.configs = {};
        _this3.container = null;
        _this3.mediaSource = null;
        _this3.sourceBuffers = {};
        _this3.preloadTime = 1;
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

export default MSE;