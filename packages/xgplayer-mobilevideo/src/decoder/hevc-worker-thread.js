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

const MAX_STREAM_BUFFER_LENGTH = 1024 * 1024 * 5; // 分配 5M 空间存储帧数据
const BATCH_DECODE_SIZE = 10; // 一次处理的帧数量
let initTs = 0;

var Decoder = function (self) {
  this.inited = false;
  this.infoId = 0;
  this.self = self;
  this.meta = self.meta;
  this.ts = 0;
  this.infolist = [];
  self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
  self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
};

Decoder.prototype.toU8Array = function (ptr, length) {
  return Module.HEAPU8.subarray(ptr, ptr + length);
};

Decoder.prototype.init = function () {
  Module._broadwayInit();

  // 存储帧数据的buffer开始位置
  this.streamBufferPtr = Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH);
  this.streamBuffer = this.toU8Array(this.streamBufferPtr, MAX_STREAM_BUFFER_LENGTH);
  // 用来存储每帧size的数据的开始位置
  this.bufferSizesPtr = Module._malloc(4 * BATCH_DECODE_SIZE);
  this.bufferSizes = this.toU8Array(this.bufferSizesPtr, 4 * BATCH_DECODE_SIZE);
  this.streamBufferOffset = 0;
  this.frameLensOffset = 0;
  this.frameLensBuffer = new Uint32Array(BATCH_DECODE_SIZE);
};

Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height) {
  let info = this.infolist.shift();
  let yRowcount = height;
  let uvRowcount = height / 2;
  let yLinesize = width;
  let uvLinesize = width / 2;
  if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
    uvRowcount = height;
  }
  let data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
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

Decoder.prototype.storeBuffer = function (data, fInfo) {
  if (fInfo && fInfo.isGop) {
    this.flush();
  }
  this.infolist.push(fInfo);
  this.streamBuffer.set(data, this.streamBufferOffset);
  this.frameLensBuffer[this.frameLensOffset] = data.length;
  this.streamBufferOffset += data.length;
  this.frameLensOffset += 1;
  this.batchDecode();
};

Decoder.prototype.batchDecode = function (flush) {
  // 攒10帧处理一次 或者 强制解码
  let todo = this.frameLensOffset >= 10 || (flush && this.frameLensOffset);
  if (todo) {
    this.bufferSizes.set(new Uint8Array(this.frameLensBuffer.buffer), 0);
    Module._broadwayPlayStream1(this.bufferSizesPtr, this.frameLensOffset);
    this.frameLensOffset = 0;
    this.streamBufferOffset = 0;
  }
};

Decoder.prototype.decode = function (data) {
  this.streamBuffer.set(data);
  Module._broadwayPlayStream(data.length, 0);
};

Decoder.prototype.flush = function () {
  this.batchDecode(true);
  Module._broadwayFlushStream();
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
        return fetch(`${WASM_CDN_PATH_PREFIX}/decoder.worker.js`)
          .then((res) => res.blob())
          .then((blob) => {
            return self.m({
              locateFile: (suffix) => {
                if (/\.worker\.js$/.test(suffix)) {
                  return URL.createObjectURL(blob);
                }
                if (/\.wasm$/.test(suffix)) {
                  return `${WASM_CDN_PATH_PREFIX}/decoder.wasm`;
                }
                if (/\.mem$/.test(suffix)) {
                  return `${WASM_CDN_PATH_PREFIX}/decoder.js.mem`;
                }
              },
              mainScriptUrlOrBlob: `${WASM_CDN_PATH_PREFIX}/decoder.js`
            });
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
        if (decoder.frameLensOffset) {
          decoder.batchDecode(true);
        }
        decoder.decode(data.data);
        break;
      case 'decode':
        decoder.storeBuffer(data.data, data.info);
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
