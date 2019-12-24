import EVENTS from 'xgplayer-transmuxer-constant-events';
const CRYTO_EVENTS = EVENTS.CRYTO_EVENTS
class Crypto {
  constructor (config) {
    this.inputBuffer = config.inputbuffer;
    this.outputBuffer = config.outputbuffer;
    this.key = config.key;
    this.iv = config.iv;
    this.method = config.method;

    this.crypto = window.crypto || window.msCrypto
  }

  init () {
    this.on(CRYTO_EVENTS.START_DECRYPT, this.decript.bind(this));
  }

  decript () {
    if (!this.aeskey) {
      let sbkey = this.crypto.subtle.importKey('raw', this.key.buffer, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
      sbkey.then(key => {
        this.aeskey = key;
        this.decriptData();
      })
    } else {
      this.decriptData();
    }
  }

  decriptData () {
    let inputbuffer = this._context.getInstance(this.inputBuffer);
    let outputbuffer = this._context.getInstance(this.outputBuffer);
    let data = inputbuffer.shift();
    if (data) {
      this.crypto.subtle.decrypt({ name: 'AES-CBC', iv: this.iv.buffer }, this.aeskey, data).then(res => {
        outputbuffer.push(new Uint8Array(res));
        this.emit(CRYTO_EVENTS.DECRYPTED);
        this.decriptData(data);
      });
    }
  }
}
export default Crypto;
