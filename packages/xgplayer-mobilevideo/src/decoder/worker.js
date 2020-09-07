// const H264_DECODER_URL =
//   "https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder_1583333072684.js";


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

var Decoder = function (self) {
  this.inited = false;
  this.self = self;
  this.meta = this.self.meta;
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
  this.broadwayOnBroadwayInited();
  this.streamBuffer = this.toU8Array(
    Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH),
    MAX_STREAM_BUFFER_LENGTH
  );
};

Decoder.prototype.broadwayOnPictureDecoded = function (
  offset,
  width,
  height,
  yLinesize,
  uvLinesize,
  infoid,
  keyFrame
) {
  let firstFrame = this.infolist[0];

  if (firstFrame && firstFrame.isGop && !keyFrame) return;

  let info = Object.assign({}, this.infolist.shift());
  let yRowcount = height;
  let uvRowcount = height / 2;
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
  this.self.postMessage({ msg: 'DECODER_READY' });
};

Decoder.prototype.decode = function (data, info) {

  this.infolist.push(info);
  if (info && info.isGop) {
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

function init (url) {
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
          setTimeout(() => {
            onPostRun.call(self);
          })
        } else {
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
        }
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
      case 'decode':
        decoder.decode(data.data, data.info);
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
