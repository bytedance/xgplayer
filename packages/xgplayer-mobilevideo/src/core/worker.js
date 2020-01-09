const MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
var Decoder = function (self) {
  this.inited = false;
  this.self = self;
  this.meta = this.self.meta;
  this.infolist = {};
  self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
  self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
}

Decoder.prototype.toU8Array = function (ptr, length) {
  return this.self.HEAPU8.subarray(ptr, ptr + length);
}

Decoder.prototype.init = function () {
  Module._broadwayInit();
  this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
}

Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid) {
  let info = Object.assign({}, this.infolist[infoid]);
  let yRowcount = height;
  let uvRowcount = height / 2;
  if (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422) {
    uvRowcount = height;
  }
  let data = this.toU8Array(offset, (yLinesize * yRowcount) + 2 * (uvLinesize * uvRowcount));
  this.infolist[infoid] = null;
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

var decoder;

function onPostRun () {
  decoder = new Decoder(this);
  decoder.init();
}

function init (meta) {
  self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder.js');
  addOnPostRun(onPostRun.bind(self));
}

self.addEventListener('message', function (e) {
  var data = e.data;
  if (!data.msg) {
    self.postMessage({
      msg: 'ERROR:invalid message'
    })
  } else {
    switch (data.msg) {
      case 'init':
        console.log(data);
        self.meta = data.meta;
        init()
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
}, false);
