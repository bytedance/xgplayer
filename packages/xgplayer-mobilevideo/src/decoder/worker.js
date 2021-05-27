/* eslint-disable no-undef */

function shimImportScripts (src) {
  return fetch(src)
    .then((res) => res.text())
    .then((text) => {
      eval(text);
      self.Module = Module;
      self.addOnPostRun = addOnPostRun;
    });
}

const MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
let initTs = 0;

var Decoder = function (self) {
  this.inited = false;
  this.self = self;
  this.meta = self.meta;
  this.infolist = [];
  self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
  self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
};

Decoder.prototype.toU8Array = function (ptr, length) {
  return Module.HEAPU8.subarray(ptr, ptr + length);
};

Decoder.prototype.init = function () {
  Module._broadwayInit();
  this.streamBuffer = this.toU8Array(
    Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH, 0), // 0: 关闭 ffmpeg log,
    MAX_STREAM_BUFFER_LENGTH
  );
};

Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid, keyFrame) {
  let firstFrame = this.infolist[0];
  if (firstFrame && firstFrame.firstInGop && !keyFrame) return;

  let info = Object.assign({}, this.infolist.shift());
  let yRowcount = height;
  let uvRowcount = height / 2;
  if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
    uvRowcount = height;
  }
  let data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
  let datetemp = new Uint8Array(data.length);
  datetemp.set(data);
  let buffer = datetemp.buffer;

  this.self.postMessage(
    {
      msg: 'DECODED',
      width,
      height,
      yLinesize,
      uvLinesize,
      info,
      buffer
    },
    [buffer]
  );
};

Decoder.prototype.broadwayOnBroadwayInited = function () {
  this.inited = true;
  this.self.postMessage({
    msg: 'LOG',
    log: 'decoder inited'
  });
  let cost = 0;
  if (initTs) {
    cost = performance.now() - initTs;
  }
  this.self.postMessage({ msg: 'DECODER_READY', cost });
};

Decoder.prototype.decode = function (data, info) {
  if (info) {
    this.infolist.push(info);
  }
  if (info && info.firstInGop) {
    this.infolist = [info];
  }
  this.streamBuffer.set(data);
  Module._broadwayPlayStream(data.length, 0);
};

Decoder.prototype.destroy = function () {
  Module._broadwayExit();
};

Decoder.prototype.updateMeta = function (meta) {
  this.meta = meta;
};

var decoder;

function onPostRun () {
  self.postMessage({
    msg: 'LOG',
    log: 'do post run'
  });

  decoder = new Decoder(this);
  decoder.init();
}

let WASM_CDN_PATH_PREFIX = '';

function init (url) {
  WASM_CDN_PATH_PREFIX = url.split('/').slice(0, -1).join('/');
  initTs = performance.now();
  let isDegrade = /asm/.test(url);
  if (!decoder) {
    let task;
    if (!self.importScripts) {
      task = shimImportScripts(url);
    } else {
      task = new Promise((resolve, reject) => {
        if (!self.console) {
          self.console = {
            log: function () {},
            warn: function () {},
            info: function () {},
            error: function () {}
          };
        }
        try {
          self.importScripts(url);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }

    task
      .then(() => {
        if (isDegrade) {
          console.log('auto instance Decoder!');
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              try {
                onPostRun.call(self);
                resolve();
              } catch (e) {
                reject(e);
              }
            });
          });
        }

        return self
          .m({
            locateFile: (suffix) => {
              if (/\.wasm$/.test(suffix)) {
                return `${WASM_CDN_PATH_PREFIX}/decoder.wasm`;
              }
            }
          })
          .then((Mod) => {
            self.Module = Mod;
            onPostRun.call(self);
          });
      })
      .catch((e) => {
        self.postMessage({
          msg: 'INIT_FAILED',
          log: e.message
        });
      });
  }
}

self.onmessage = function (e) {
  var data = e.data;
  if (!data.msg) {
    self.postMessage({
      msg: 'ERROR:invalid message'
    });
  } else {
    if (data.msg !== 'init' && !decoder) return;
    switch (data.msg) {
      case 'init':
        self.meta = data.meta;
        self.postMessage({
          msg: 'LOG',
          log: 'worker inited'
        });
        init(data.url);
        break;
      case 'updatemeta':
        self.meta = data.meta;
        decoder.updateMeta(data.meta);
        break;
      case 'initDecoder':
        decoder.decode(data.data);
        break;
      case 'decode':
        decoder.decode(data.data, data.info);
        break;
      case 'finish_flag':
        self.postMessage({
          msg: 'BATCH_FINISH_FLAG'
        });
        break;
      case 'destory':
        decoder.destroy();
        break;
      default:
        break;
    }
  }
};
