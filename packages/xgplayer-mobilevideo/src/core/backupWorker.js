const MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
var Decoder = function (self) {
  this.inited = false;
  this.self = self;
  this.meta = this.self.meta;
  this.infolist = [];
  self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
  self.par_broadwayOnHeadersDecoded = () => {};
}

Decoder.prototype.toU8Array = function (ptr, length) {
  return this.self.HEAPU8.subarray(ptr, ptr + length);
}

Decoder.prototype.init = function () {
  self.postMessage({
    msg: 'LOG',
    log: 'init decoder'
  })
  Module._broadwayInit();
  this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
  this.broadwayOnBroadwayInited();
}

Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height) {
  let info = this.infolist.shift();
  let yRowcount = height;
  let uvRowcount = height / 2;
  let yLinesize = width;
  let uvLinesize = width / 2;
  if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
    uvRowcount = height;
  }
  let data = this.toU8Array(offset, (yLinesize * yRowcount) + 2 * (uvLinesize * uvRowcount));
  let datetemp = new Uint8Array(data.length);
  datetemp.set(data);
  let buffer = datetemp.buffer;

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
  self.postMessage({
    msg: 'LOG',
    log: 'decoder inited'
  })
  this.self.postMessage({msg: 'DECODER_READY'});
}

Decoder.prototype.decode = function (data, info) {
  this.infolist.push(info);
  this.streamBuffer.set(data);
  if (info) {
    // self.postMessage({
    //   msg: 'LOG',
    //   log: 'decode sample ' + info.dts + ' cost ' + Date.now()
    // })
  }
  Module._broadwayPlayStream(data.length);
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
}

function init (meta) {
  if (!decoder) {
    self.postMessage({
      msg: 'LOG',
      log: 'decoder script import' + self.importScripts
    })
    self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/media-site/decoder3.js');
    addOnPostRun(onPostRun.bind(self));
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
          log: 'worker inited'
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
