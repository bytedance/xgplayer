/* eslint-disable no-undef */
// 目前仅支持yuv420

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
  this.infoId = 0;
  this.self = self;
  this.meta = this.self.meta;
  this.ts = 0;
  this.infolist = [];
  self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(
    this
  );
  self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(
    this
  );
};

Decoder.prototype.toU8Array = function (ptr, length) {
  return Module.HEAPU8.subarray(ptr, ptr + length);
};

Decoder.prototype.init = function () {
  Module._broadwayInit();
  this.offset = Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH);
};

Decoder.prototype.broadwayOnPictureDecoded = function (
  offset,
  width,
  height,
  infoid,
  sliceType
) {
  if (this.infolist[0] && this.infolist[0].isGop && sliceType !== 2) {
    this.self.postMessage({
      msg: 'LOG',
      log: `drop sample`
    });
    return;
  }

  let info = this.infolist.shift();
  let yRowcount = height;
  let uvRowcount = height / 2;
  let yLinesize = width;
  let uvLinesize = width / 2;
  if (
    this.meta &&
    (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)
  ) {
    uvRowcount = height;
  }
  let data = this.toU8Array(
    offset,
    yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount)
  );
  // this.infolist[infoid] = null;
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
  if (this.inited) {
    return;
  }
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
  let time = parseInt(new Date().getTime());
  let infoid = time - Math.floor(time / 10e8) * 10e8;
  this.infolist.push(info);
  if (info && info.isGop) {
    this.infolist = [info];
    Module._broadwayFlushStream(infoid);
  }
  Module.HEAPU8.set(data, this.offset);
  Module._broadwayPlayStream(data.length, this.infoId);
};

Decoder.prototype.flush = function () {
  Module._broadwayFlushStream();
}

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

function init (url) {
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

        return new Promise((resolve, reject) => {
          addOnPostRun(onPostRun.bind(self));

          Module.onRuntimeInitialized = () => {
            resolve();
          }

          Module.onAbort = (e) => {
            reject(e && e.message ? e : new Error('wasm init error'));
          }

          setTimeout(() => {
            reject(new Error('wasm load timeout'))
          }, 6000)
        })
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
      case 'flush':
        decoder.flush();
        break;
      case 'finish_flag':
        self.postMessage({
          msg: 'BATCH_FINISH_FLAG'
        })
        break;
      case 'destory':
        decoder.destroy();
        break;
      default:
        break;
    }
  }
};
