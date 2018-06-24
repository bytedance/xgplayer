import Log from '../../utils/Log';
import emitter from '../../utils/EventEmitter';
export default class Demuxer {
    constructor (store) {
        if (store) {
            this._store = store;
        }

        this._emitter = emitter;
        this.on = emitter.on.bind(emitter);
        this.emit = emitter.emit.bind(emitter);
    }

    dispatch (type, ...payload) {
        const prefix = 'demuxer_';
        this._emitter.emit(`${prefix}${type}`, ...payload);
    }
    error (message) {
        const { CLASS_NAME = 'Demuxer' } = this;
        Log.error(`[${CLASS_NAME} error] `, message);
    }

    info (message) {
        const { CLASS_NAME = 'Demuxer' } = this;
        Log.info(`[${CLASS_NAME} info] `, message);
    }

    log (message) {
        const { CLASS_NAME = 'Demuxer' } = this;
        Log.log(`[${CLASS_NAME} log] `, message);
    }

    warn (message) {
        const { CLASS_NAME = 'Demuxer' } = this;
        Log.warn(`[${CLASS_NAME} warn] `, message);
    }
}