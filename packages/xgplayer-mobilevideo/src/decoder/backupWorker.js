const ASM_H264_DECODER_URL = 'https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h264/decoder_asm_1589261792455.js';

function shimImportScripts(src) {
  return fetch(src)
    .then((res) => res.text())
    .then((text) => {
      eval(text);
      self.Module = Module;
      self.addOnPostRun = addOnPostRun;
    });
}

var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;

var Decoder = function (self) {
  this.inited = false;
  this.self = self;
  this.meta = this.self.meta;
  this.infolist = {};
  self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
  self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);

}

Decoder.prototype.toU8Array = function (ptr, length) {
  return Module.HEAPU8.subarray(ptr, ptr + length);
}

Decoder.prototype.init = function () {
  Module._broadwayInit();
  this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
}

Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid) {
  let info = Object.assign({}, this.infolist[infoid]);
  let yRowcount = height;
  let uvRowcount = height / 2;
  if (!uvLinesize) {
    uvLinesize = yLinesize / 2;
  }
  if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
    uvRowcount = height;
  }
  let data = this.toU8Array(offset, (yLinesize * yRowcount) + 2 * (uvLinesize * uvRowcount));
  this.infolist[infoid] = null;
  let datetemp = new Uint8Array(data.length);
  datetemp.set(data);
  let buffer = datetemp.buffer;
  if (info) {
    this.self.postMessage({
      msg: 'LOG',
      log: `sample ${info.dts} decoded startAt${info.decodeTime} cost: ${ Date.now() - info.decodeTime}`
    })
  }

  this.self.postMessage({
    msg: 'DECODED',
    width,
    height,
    yLinesize,
    uvLinesize,
    info,
    buffer
  }, [buffer]);
}

Decoder.prototype.broadwayOnBroadwayInited = function () {
  this.inited = true;
  this.self.postMessage({
    msg: 'LOG',
    log: 'backup decoder inited'
  })
  this.self.postMessage({msg: 'DECODER_READY'});
}

Decoder.prototype.decode = function (data, info) {
  let time = parseInt(new Date().getTime());
  let infoid = time - (Math.floor(time / 10e8) * 10e8);
  this.infolist[infoid] = info;
  this.streamBuffer.set(data);
  Module._broadwayPlayStream(data.length, infoid);
}

Decoder.prototype.destroy = function () {
  Module._broadwayExit();
}

Decoder.prototype.updateMeta = function(meta){
  this.meta = meta
}

var decoder;

function onPostRun () {
  decoder = new Decoder(this);
  decoder.init();
  self.postMessage({
    msg: 'LOG',
    log: 'decoder inited'
  })
  decoder.broadwayOnBroadwayInited();
}

function init (meta) {
  if (!decoder) {
    if (!self.importScripts) {
      shimImportScripts(ASM_H264_DECODER_URL).then(() => {
        self.postMessage({
          msg: 'LOG',
          log: Module
        })
        onPostRun.call(self)
      })
    } else {
      try {
        if (!self.console) {
          self.console = {
            log: function () {},
            warn: function () {},
            info: function () {},
            error: function () {}
          }
        }
        self.importScripts(ASM_H264_DECODER_URL);
      } catch (e) {
        self.postMessage({
          msg: 'INIT_FAILED'
        })
        self.postMessage({
          msg: 'LOG',
          log: e.message
        })
        return;
      }
      self.postMessage({
        msg: 'LOG',
        log: 'backup script import done' + Module
      })
      onPostRun.call(self)
    }
  }
}

self.onmessage = function (e) {
  var data = e.data;
  if (!data.msg) {
    self.postMessage({
      msg: 'ERROR:invalid message'
    })
  } else {
    switch (data.msg) {
      case 'init':
        self.meta = data.meta;
        self.postMessage({
          msg: 'LOG',
          log: 'backup worker inited'
        })
        init()
        break;
      case 'updatemeta':
        self.meta = data.meta;
        decoder.updateMeta(data.meta)
        break;
      case 'decode':
        decoder.decode(data.data, data.info);
        break;
      case 'destory':
        decoder.destroy();
        break
      default:
        break;
    }
  }
}
