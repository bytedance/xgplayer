'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webworkerify = require('webworkerify');

var _webworkerify2 = _interopRequireDefault(_webworkerify);

var _workerCommands = require('xgplayer-utils/constants/workerCommands');

var _workerCommands2 = _interopRequireDefault(_workerCommands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WorkerWrapper {
  constructor(Wrapped) {
    if (!Wrapped) {
      throw new Error('No Worker Provided');
    }
    this._worker = (0, _webworkerify2.default)(Wrapped);
    this._worker.addEventListener('message', this.handleWorkerMessage);
    this.commandMap = {
      [_workerCommands2.default.EMIT]: this.handleCommandEmit.bind(this),
      [_workerCommands2.default.ON]: this.handleCommandOn.bind(this),
      [_workerCommands2.default.ONCE]: this.handleCommandOnce.bind(this),
      [_workerCommands2.default.OFF]: this.handleCommandOff.bind(this)
    };

    this.bindedListeners = {};
  }

  handleWorkerMessage(e) {
    const command = e.data.command;
    const messageName = e.data.messageName;
    const data = e.data.data;

    const commandHandler = this.commandMap[command];

    if (commandHandler) {
      commandHandler(messageName, data);
    }
  }

  _sendToWorker(messageName, data) {
    this._worker.postMessage({
      messageName,
      data
    });
  }

  handleCommandEmit(messageName, data) {
    this.emit(messageName, data);
  }

  handleCommandOn(messageName) {
    this.bindedListeners[`_on_${messageName}`] = this._sendToWorker.bind(messageName);
    this.on(messageName, this.bindedListeners[`_on_${messageName}`]);
  }

  handleCommandOnce(messageName) {
    this.bindedListeners[`_once_${messageName}`] = this._sendToWorker.bind(messageName);
    this.once(messageName, this.bindedListeners[`_once_${messageName}`]);
  }

  handleCommandOff(messageName) {
    const listener = this.bindedListeners[`_on_${messageName}`];

    if (listener) {
      this.off(messageName, listener);
      delete this.bindedListeners[`_on_${messageName}`];
    }
  }

  destroy() {
    this._sendToWorker(_workerCommands2.default.DESTROY);
    this._worker = null;
    this.commandMap = null;
    this.bindedListeners = null;
  }
}

exports.default = WorkerWrapper;