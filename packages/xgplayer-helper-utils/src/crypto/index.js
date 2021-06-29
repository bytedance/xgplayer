import EVENTS from '../events'

const CRYPTO_EVENTS = EVENTS.CRYPTO_EVENTS
class Crypto {
  constructor (config) {
    this.inputBuffer = config.inputbuffer
    this.outputBuffer = config.outputbuffer
    this.key = config.key
    this.iv = config.iv
    this.method = config.method

    this.crypto = window.crypto || window.msCrypto
  }

  init () {
    this.on(CRYPTO_EVENTS.START_DECRYPTO, this.decrypto.bind(this))
  }

  decrypto () {
    if (!this.aeskey) {
      let sbkey = this.crypto.subtle.importKey('raw', this.key.buffer, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt'])
      sbkey.then(key => {
        this.aeskey = key
        this.decryptoData()
      })
    } else {
      this.decryptoData()
    }
  }

  decryptoData () {
    let inputbuffer = this._context.getInstance(this.inputBuffer)
    let outputbuffer = this._context.getInstance(this.outputBuffer)
    let data = inputbuffer.shift()
    if (data) {
      this.crypto.subtle.decrypt({ name: 'AES-CBC', iv: this.iv.buffer }, this.aeskey, data).then(res => {
        outputbuffer.push(new Uint8Array(res))
        this.emit(CRYPTO_EVENTS.DECRYPTED)
        this.decryptoData(data)
      })
    }
  }
}
export default Crypto
