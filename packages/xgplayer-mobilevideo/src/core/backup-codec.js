import DecoderWorker from 'worker!./Decoder.worker.js';

export default class BackUpCodec {
  constructor () {
    // super();
    this.messageCallBack = null;

    this._decode = (parData, parInfo = {}) => {
      var copyU8 = new Uint8Array(parData.length);
      copyU8.set(parData, 0, parData.length);
      this.worker.postMessage({buf: copyU8.buffer, offset: 0, length: parData.length, info: parInfo}, [copyU8.buffer]); // Send data to our worker.
    };

    this._destroy = () => {
      delete this.worker;
    };
    // 一个id不会真的作为时间戳
    this.frameCount = 1;
    this.fakeDTS = 40;
  }

  init () {
    try {
      this.worker = new DecoderWorker();
    } catch (e) {
      const scriptUrl = `${location.protocol}//tosv.byted.org/obj/media-site/Decoder.js`;
      let blob = new Blob(['importScripts(\'' + scriptUrl + '\');'], {'type': 'application/javascript'});
      let blobUrl = URL.createObjectURL(blob);
      this.worker = new Worker(blobUrl);
    }

    let worker = this.worker;

    worker.addEventListener('message', (e) => {
      var data = e.data;
      if (data.consoleLog) {
        console.log(data.consoleLog);
        return;
      }
      ;

      // onPictureDecoded.call(self, new Uint8Array(data.buf, 0, data.length), data.width, data.height, data.infos);
      this.messageCallBack({
        data: {
          msg: 'DECODED',
          info: {
            dts: this.frameCount * this.fakeDTS,
          },
          buffer: data.buf,
          width: data.width,
          height: data.height,
          yLinesize: data.width,
          uvLinesize: data.width / 2
        }
      });

      {
        this.frameCount++;
      }

    }, false);
    worker.postMessage({
      type: 'Broadway.js - Worker init', options: {
        rgb: false,
        memsize: this.memsize,
        reuseMemory: false
      }
    });
    // 通知外部初始化好了
    this.messageCallBack({
      data: {
        msg: 'DECODER_READY',
        info: {
          dts: null,
        }
      }
    });
  }

  set onmessage (fn) {
    this.messageCallBack = fn;
  }

  postMessage (msg) {
    const type = msg.msg;
    switch (type) {
      case 'decode':
        this._decode(msg.data);
        break;
      case 'updatemeta':
        break;
      case 'destroy':
        this._destroy();
        break;
    }
  }
}
