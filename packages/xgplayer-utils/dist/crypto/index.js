'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('../constants/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

const CRYTO_EVENTS = _events2.default.CRYTO_EVENTS;

let Crypto = function () {
    function Crypto(config) {
        _classCallCheck(this, Crypto);

        this.inputBuffer = config.inputbuffer;
        this.outputBuffer = config.outputbuffer;
        this.key = config.key;
        this.iv = config.iv;
        this.method = config.method;

        this.crypto = window.crypto || window.msCrypto;
    }

    _createClass(Crypto, [{
        key: 'init',
        value: function init() {
            this.on(CRYTO_EVENTS.START_DECRYPT, this.decript.bind(this));
        }
    }, {
        key: 'decript',
        value: function decript() {
            if (!this.aeskey) {
                let sbkey = this.crypto.subtle.importKey('raw', this.key.buffer, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
                sbkey.then(key => {
                    this.aeskey = key;
                    this.decriptData();
                });
            } else {
                this.decriptData();
            }
        }
    }, {
        key: 'decriptData',
        value: function decriptData() {
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
    }]);

    return Crypto;
}();

exports.default = Crypto;