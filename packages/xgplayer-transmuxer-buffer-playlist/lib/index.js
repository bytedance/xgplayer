'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Playlist = function () {
  function Playlist(configs) {
    _classCallCheck(this, Playlist);

    this._baseURL = '';
    this._list = {};
    this._ts = {};
    this.version = 0;
    this.sequence = -1;
    this.targetduration = 0;
    this.duration = 0;
    this.fragLength = 0;
    this._lastget = undefined;
    this._audoclear = configs.autoclear || false;
    this.downloadedUrls = [];
  }

  _createClass(Playlist, [{
    key: 'push',
    value: function push(ts, duration, discontinue) {
      if (!this._ts[ts]) {
        this._ts[ts] = { duration: duration,
          downloaded: false,
          downloading: false,
          start: this.duration,
          discontinue: !!discontinue
        };
        this._list[this.duration] = ts;
        this.duration += duration;
        this.fragLength += 1;
      }
    }
  }, {
    key: 'deleteFrag',
    value: function deleteFrag(url) {
      if (this._ts[url]) {
        if (this._ts[url].start > this._lastget.time) {
          this._lastget = {
            duration: this._ts[url].duration,
            time: this._ts[url].start,
            downloaded: false,
            downloading: false,
            url: url
          };
        }
        delete this._list[this._ts[url].start];
        delete this._ts[url];
        this.fragLength -= 1;
      }
    }
  }, {
    key: 'pushM3U8',
    value: function pushM3U8(data, deletepre) {
      // 常规信息替换
      if (!data) {
        throw new Error('No m3u8 data received.');
      }
      this.version = data.version;
      this.targetduration = data.targetduration;
      if (data.encrypt && !this.encrypt) {
        this.encrypt = data.encrypt;
      }

      if (!data.sequence) {
        data.sequence = 0;
      }

      // 新分片信息
      if (data.sequence > this.sequence) {
        this.sequence = data.sequence;
        var newfraglist = [];
        for (var i = 0; i < data.frags.length; i++) {
          var frag = data.frags[i];
          if (!this._ts[frag.url] && this.downloadedUrls.indexOf(frag.url) < 0) {
            newfraglist.push(frag.url);
            this.push(frag.url, frag.duration, frag.discontinue);
          }
        }

        if (newfraglist.length < 1) {
          throw new Error('Can not read ts file list.');
        }

        if (deletepre) {
          var tslist = this.getTsList();
          for (var _i = 0; _i < tslist.length; _i++) {
            if (newfraglist.indexOf(tslist[_i]) < 0) {
              this.deleteFrag(tslist[_i]);
            }
          }
        }
      } else {
        throw new Error('Old m3u8 file received, ' + data.sequence);
      }
    }
  }, {
    key: 'getTsList',
    value: function getTsList() {
      return Object.keys(this._ts);
    }
  }, {
    key: 'downloaded',
    value: function downloaded(tsname, isloaded) {
      var ts = this._ts[tsname];
      if (ts) {
        ts.downloaded = isloaded;
      }
    }
  }, {
    key: 'downloading',
    value: function downloading(tsname, loading) {
      var ts = this._ts[tsname];
      if (ts) {
        ts.downloading = loading;
      }
    }
  }, {
    key: 'getTsByName',
    value: function getTsByName(name) {
      return this._ts[name];
    }
  }, {
    key: 'getTs',
    value: function getTs(time) {
      var timelist = Object.keys(this._list);
      var ts = void 0;

      if (time === undefined) {
        if (this._lastget) {
          time = this._lastget.time + this._lastget.duration;
        } else {
          time = 0;
        }
      }

      if (timelist.length < 1 || time >= this.duration) {
        return undefined;
      }
      timelist = timelist.sort(function (a, b) {
        return parseFloat(a) - parseFloat(b);
      });
      for (var i = 0; i < timelist.length; i++) {
        if (time >= parseInt(timelist[i])) {
          var url = this._list[timelist[i]];
          var downloaded = this._ts[url].downloaded;
          var downloading = this._ts[url].downloading;
          ts = { url: url, downloaded: downloaded, downloading: downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration) };
          if (this.autoclear) {
            delete this._ts[this._lastget.url];
            delete this._list[this._lastget.time];
          }
          this._lastget = ts;
        } else {
          break;
        }
      }

      this.downloadedUrls.push(ts.url);
      return ts;
    }
  }, {
    key: 'getLastDownloadedTs',
    value: function getLastDownloadedTs() {
      var timelist = Object.keys(this._list);
      var found = void 0;
      for (var i = 0; i < timelist.length; i++) {
        var url = this._list[timelist[i]];
        var downloaded = this._ts[url].downloaded;
        var downloading = this._ts[url].downloading;
        if (downloaded) {
          found = { url: url, downloaded: downloaded, downloading: downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration) };
        } else {
          break;
        }
      }

      return found;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._baseURL = '';
      this._list = {};
      this._ts = {};
      this.version = 0;
      this.sequence = -1;
      this.targetduration = 0;
      this.duration = 0;
    }
  }, {
    key: 'clearDownloaded',
    value: function clearDownloaded() {
      for (var i = 0, l = Object.keys(this._ts).length; i < l; i++) {
        var ts = this._ts[Object.keys(this._ts)[i]];
        ts.downloaded = false;
        ts.downloading = false;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._baseURL = '';
      this._list = {};
      this._ts = {};
      this.version = 0;
      this.sequence = -1;
      this.targetduration = 0;
      this.duration = 0;
      this.fragLength = 0;
      this._lastget = undefined;
      this._audoclear = false;
    }
  }, {
    key: 'list',
    get: function get() {
      return this._list;
    }
  }, {
    key: 'baseURL',
    set: function set(baseURL) {
      if (this.baseURL !== baseURL) {
        this.clear();
        this._baseURL = baseURL;
      }
    },
    get: function get() {
      return this._baseURL;
    }
  }]);

  return Playlist;
}();

exports.default = Playlist;