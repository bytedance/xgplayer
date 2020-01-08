'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MSE = function () {
  function MSE(configs) {
    _classCallCheck(this, MSE);

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
          if (!sourceBuffer.updating) {
            var source = sources.sources[type];
            if (source && !source.inited) {
              // console.log('append initial segment')
              sourceBuffer.appendBuffer(source.init.buffer.buffer);
              source.inited = true;
            } else if (source) {
              var data = source.data.shift();
              if (data) {
                sourceBuffer.appendBuffer(data.buffer.buffer);
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
    key: 'removeBuffers',
    value: function removeBuffers() {
      var _this = this;

      var taskList = [];

      var _loop = function _loop(i) {
        var buffer = _this.sourceBuffers[Object.keys(_this.sourceBuffers)[i]];
        buffer.removeEventListener('updateend', _this.onUpdateEnd);

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
    key: 'destroy',
    value: function destroy() {
      var _this2 = this;

      return this.removeBuffers().then(function () {
        for (var i = 0; i < Object.keys(_this2.sourceBuffers).length; i++) {
          var _buffer = _this2.sourceBuffers[Object.keys(_this2.sourceBuffers)[i]];
          _this2.mediaSource.removeSourceBuffer(_buffer);
          delete _this2.sourceBuffers[Object.keys(_this2.sourceBuffers)[i]];
        }

        _this2.container.removeEventListener('timeupdate', _this2.onTimeUpdate);
        _this2.container.removeEventListener('waiting', _this2.onWaiting);
        _this2.mediaSource.removeEventListener('sourceopen', _this2.onSourceOpen);

        _this2.endOfStream();
        window.URL.revokeObjectURL(_this2.url);

        _this2.url = null;
        _this2.configs = {};
        _this2.container = null;
        _this2.mediaSource = null;
        _this2.sourceBuffers = {};
        _this2.preloadTime = 1;
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

exports.default = MSE;