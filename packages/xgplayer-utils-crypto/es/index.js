import EVENTS from 'xgplayer-transmuxer-constant-events';
var CRYTO_EVENTS = EVENTS.CRYTO_EVENTS;

var Crypto = function () {
  function Crypto(config) {
    babelHelpers.classCallCheck(this, Crypto);

    this.inputBuffer = config.inputbuffer;
    this.outputBuffer = config.outputbuffer;
    this.key = config.key;
    this.iv = config.iv;
    this.method = config.method;

    this.crypto = window.crypto || window.msCrypto;
  }

  babelHelpers.createClass(Crypto, [{
    key: 'init',
    value: function init() {
      this.on(CRYTO_EVENTS.START_DECRYPT, this.decript.bind(this));
    }
  }, {
    key: 'decript',
    value: function decript() {
      var _this = this;

      if (!this.aeskey) {
        var sbkey = this.crypto.subtle.importKey('raw', this.key.buffer, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
        sbkey.then(function (key) {
          _this.aeskey = key;
          _this.decriptData();
        });
      } else {
        this.decriptData();
      }
    }
  }, {
    key: 'decriptData',
    value: function decriptData() {
      var _this2 = this;

      var inputbuffer = this._context.getInstance(this.inputBuffer);
      var outputbuffer = this._context.getInstance(this.outputBuffer);
      var data = inputbuffer.shift();
      if (data) {
        this.crypto.subtle.decrypt({ name: 'AES-CBC', iv: this.iv.buffer }, this.aeskey, data).then(function (res) {
          outputbuffer.push(new Uint8Array(res));
          _this2.emit(CRYTO_EVENTS.DECRYPTED);
          _this2.decriptData(data);
        });
      }
    }
  }]);
  return Crypto;
}();

export default Crypto;