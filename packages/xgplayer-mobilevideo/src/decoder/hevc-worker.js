// 目前仅支持yuv420

// const H265_DECODER_URL =
//   "https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h265/decoder_1592202936266.js";

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
  this.self.postMessage({ msg: 'DECODER_READY' });
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
        addOnPostRun(onPostRun.bind(self));
        // setTimeout(() => {
        //   if (!decoder || !decoder.inited) {
        //     console.log('auto instance Decoder!');
        //     onPostRun.call(self);
        //   }
        // }, 5000);
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
        self.postMessage({
          msg:'DECODE_FINISH',
          dts: data.info ? data.info.dts:0
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
