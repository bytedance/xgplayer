var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
var Decoder = function Decoder(self) {
  this.inited = false;
  this.self = self;
  this.meta = this.self.meta;
  this.infolist = {};
  self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
  self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
};

Decoder.prototype.toU8Array = function (ptr, length) {
  return this.self.HEAPU8.subarray(ptr, ptr + length);
};

Decoder.prototype.init = function () {
  self.postMessage({
    msg: 'LOG',
    log: 'init decoder'
  });
  Module._broadwayInit();
  this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
};

Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid) {
  var info = Object.assign({}, this.infolist[infoid]);
  var yRowcount = height;
  var uvRowcount = height / 2;
  if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
    uvRowcount = height;
  }
  var data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
  this.infolist[infoid] = null;
  var datetemp = new Uint8Array(data.length);
  datetemp.set(data);
  var buffer = datetemp.buffer;
  if (info) {
    self.postMessage({
      msg: 'LOG',
      log: 'sample ' + info.dts + ' decoded startAt' + info.decodeTime + ' cost: ' + (Date.now() - info.decodeTime)
    });
  }

  this.self.postMessage({
    msg: 'DECODED',
    width: width,
    height: height,
    yLinesize: yLinesize,
    uvLinesize: uvLinesize,
    info: info,
    buffer: buffer
  }, [buffer]);
};

Decoder.prototype.broadwayOnBroadwayInited = function () {
  this.inited = true;
  self.postMessage({
    msg: 'LOG',
    log: 'decoder inited'
  });
  this.self.postMessage({ msg: 'DECODER_READY' });
};

Decoder.prototype.decode = function (data, info) {
  var time = parseInt(new Date().getTime());
  var infoid = time - Math.floor(time / 10e8) * 10e8;
  this.infolist[infoid] = info;
  this.streamBuffer.set(data);
  if (info) {
    // self.postMessage({
    //   msg: 'LOG',
    //   log: 'decode sample ' + info.dts + ' cost ' + Date.now()
    // })
  }
  Module._broadwayPlayStream(data.length, infoid);
};

Decoder.prototype.destroy = function () {
  Module._broadwayExit();
};

Decoder.prototype.updateMeta = function (meta) {
  this.meta = meta;
};

var decoder;

function onPostRun() {
  self.postMessage({
    msg: 'LOG',
    log: 'decoder script ' + Decoder
  });
  decoder = new Decoder(this);
  decoder.init();
}

function init(meta) {
  if (!decoder) {
    self.postMessage({
      msg: 'LOG',
      log: 'decoder script import' + self.importScripts
    });
    self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder_1583333072684.js');
  }
  addOnPostRun(onPostRun.bind(self));
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
        init();
        break;
      case 'updatemeta':
        self.meta = data.meta;
        decoder.updateMeta(data.meta);
        break;
      case 'decode':
        decoder.decode(data.data, data.info);
        break;
      case 'destory':
        decoder.destroy();
        break;
      default:
        break;
    }
  }
};